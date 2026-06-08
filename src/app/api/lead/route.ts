import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { leadSchema, attributionSchema } from "@/lib/lead-schema";
import { classifyIcp, isPersonalEmail } from "@/lib/icp";
import { forwardToWhatsApp, type LeadNotification } from "@/lib/evolution";
import { forwardToSheets } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const ok = (extra: Record<string, unknown> = {}) =>
  NextResponse.json({ ok: true, ...extra });

/**
 * Diagnóstico de configuração — diz quais destinos estão prontos, sem expor
 * nenhum valor secreto (só os NOMES das envs que faltam). Útil pra checar o deploy.
 */
export function GET() {
  const missing = (keys: string[]) => keys.filter((k) => !process.env[k]);
  const whatsapp = missing([
    "EVOLUTION_API_URL",
    "EVOLUTION_INSTANCE",
    "EVOLUTION_API_KEY",
    "LEAD_WHATSAPP_TO",
  ]);
  const sheets = missing(["SHEETS_WEBAPP_URL"]);
  const n8n = missing(["N8N_WEBHOOK_URL"]);
  return NextResponse.json({
    ok: true,
    ambiente: process.env.VERCEL_ENV ?? "development",
    destinos: {
      whatsapp: { configurado: whatsapp.length === 0, faltando: whatsapp },
      sheets: { configurado: sheets.length === 0, faltando: sheets },
      n8n: { configurado: n8n.length === 0, faltando: n8n },
    },
  });
}

function getIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return (xff?.split(",")[0] ?? "0.0.0.0").trim();
}

function hashIp(ip: string): string {
  return crypto
    .createHash("sha256")
    .update(ip + (process.env.IP_SALT ?? ""))
    .digest("hex")
    .slice(0, 16);
}

function originAllowed(req: Request): boolean {
  const allowed = process.env.NEXT_PUBLIC_SITE_URL;
  const origin = req.headers.get("origin");
  if (!allowed || !origin) return true; // dev/local ou fetch same-origin sem header
  try {
    return new URL(origin).host === new URL(allowed).host;
  } catch {
    return false;
  }
}

async function verifyTurnstile(
  token: unknown,
  ip: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // sem secret (placeholder/dev) → não bloqueia
  if (typeof token !== "string" || token.length < 10) return false;
  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

// Rate-limit Upstash (instanciado só se as envs existirem)
let ratelimit: { limit: (k: string) => Promise<{ success: boolean }> } | null =
  null;
async function checkRateLimit(ip: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return true; // sem upstash → não limita (dev)
  if (!ratelimit) {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");
    ratelimit = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "lead",
    });
  }
  const { success } = await ratelimit.limit(ip);
  return success;
}

async function forwardToN8n(payload: object, id: string): Promise<boolean> {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) {
    console.warn(`[lead] N8N_WEBHOOK_URL ausente — lead ${id} não encaminhado`);
    return false;
  }
  const secret = process.env.N8N_WEBHOOK_SECRET;
  const bodyStr = JSON.stringify(payload);
  const timestamp = Date.now().toString();
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "x-lone-timestamp": timestamp,
  };
  if (secret) {
    const sig = crypto
      .createHmac("sha256", secret)
      .update(`${timestamp}.${bodyStr}`)
      .digest("hex");
    headers["x-lone-signature"] = `sha256=${sig}`;
  }
  const delays = [0, 500, 1500];
  for (const delay of delays) {
    if (delay) await sleep(delay);
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: bodyStr,
        signal: ctrl.signal,
      });
      clearTimeout(t);
      if (res.ok) return true;
      if (res.status < 500) return false; // 4xx: não adianta retry
    } catch {
      // rede/timeout → tenta de novo
    }
  }
  return false;
}

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  if (req.headers.get("content-type")?.includes("application/json") !== true) {
    return NextResponse.json({ ok: false }, { status: 415 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // Anti-spam barato ANTES de trabalho caro → 200 falso (não revela bloqueio)
  if (typeof raw._gotcha === "string" && raw._gotcha.length > 0) return ok();
  const ts = Number(raw._ts);
  if (Number.isFinite(ts) && Date.now() - ts < 2500) return ok();

  const ip = getIp(req);
  if (!(await checkRateLimit(ip))) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }
  if (!(await verifyTurnstile(raw.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, error: "captcha" }, { status: 403 });
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fields[key]) fields[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "validation", fields },
      { status: 422 },
    );
  }

  const lead = parsed.data;
  const attribution =
    attributionSchema.safeParse(raw.attribution ?? {}).data ?? {};

  const emailPessoal = isPersonalEmail(lead.emailCorporativo);
  const qualificacao = classifyIcp({
    faturamento: lead.faturamento,
    emailPessoal,
    maiorDesafio: lead.maiorDesafio,
    utmMedium: attribution.utm_medium,
    gclid: attribution.gclid,
    fbclid: attribution.fbclid,
  });

  const whatsappE164 = `+55${lead.whatsapp}`;
  const dayUTC = new Date().toISOString().slice(0, 10);
  const id = crypto
    .createHash("sha256")
    .update(`${lead.emailCorporativo}|${whatsappE164}|${dayUTC}`)
    .digest("hex");

  const payload = {
    id,
    schemaVersion: "1.0",
    submittedAt: new Date().toISOString(),
    lead: {
      nomeCompleto: lead.nomeCompleto,
      whatsappE164,
      whatsappDisplay: lead.whatsapp,
      emailCorporativo: lead.emailCorporativo,
      emailPessoal,
      empresa: lead.empresa,
      segmento: lead.segmento,
      faturamento: lead.faturamento,
      maiorDesafio: lead.maiorDesafio,
    },
    qualificacao,
    consent: {
      aceito: true,
      versao: process.env.CONSENT_VERSION ?? "1.0",
      timestamp: new Date().toISOString(),
      ip: hashIp(ip),
      userAgent: (req.headers.get("user-agent") ?? "").slice(0, 180),
    },
    atribuicao: attribution,
    meta: {
      fonte: "landing-lone-midia",
      ambiente: process.env.VERCEL_ENV ?? "development",
    },
  };

  const notification: LeadNotification = {
    id,
    submittedAt: payload.submittedAt,
    lead: payload.lead,
    qualificacao,
    atribuicao: attribution,
  };

  // Destinos em paralelo: WhatsApp (Evolution), planilha (Sheets) e n8n (opcional).
  // O lead só é "degraded" se NENHUM destino confirmou entrega.
  const [whatsappOk, sheetsOk, n8nOk] = await Promise.all([
    forwardToWhatsApp(notification),
    forwardToSheets(notification),
    forwardToN8n(payload, id),
  ]);

  return ok({ id, degraded: !(whatsappOk || sheetsOk || n8nOk) });
}
