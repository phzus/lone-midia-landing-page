import { FATURAMENTO_FAIXAS, type FaturamentoValue } from "@/lib/content";
import type { IcpResult } from "@/lib/icp";
import type { Attribution } from "@/lib/lead-schema";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const TEMP_BADGE: Record<IcpResult["temperatura"], string> = {
  quente: "🔥 LEAD QUENTE",
  morno: "🌡️ LEAD MORNO",
  frio: "🧊 LEAD FRIO",
};

function faturamentoLabel(value: FaturamentoValue): string {
  return FATURAMENTO_FAIXAS.find((f) => f.value === value)?.label ?? value;
}

function formatBR(iso: string): string {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "America/Sao_Paulo",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export type LeadNotification = {
  id: string;
  submittedAt: string;
  lead: {
    nomeCompleto: string;
    whatsappE164: string;
    whatsappDisplay: string;
    emailCorporativo: string;
    emailPessoal: boolean;
    empresa: string;
    segmento: string;
    faturamento: FaturamentoValue;
    maiorDesafio: string;
  };
  qualificacao: IcpResult;
  atribuicao: Attribution;
};

/** Monta a mensagem de WhatsApp (markdown do WhatsApp: *negrito*). */
export function buildLeadMessage(p: LeadNotification): string {
  const { lead, qualificacao, atribuicao } = p;
  const badge = TEMP_BADGE[qualificacao.temperatura];
  const icp = qualificacao.icp ? "✅ dentro do ICP" : "⚠️ fora do ICP (nutrir)";
  const waDigits = lead.whatsappE164.replace(/\D/g, "");

  const origem =
    [atribuicao.utm_source, atribuicao.utm_medium, atribuicao.utm_campaign]
      .filter(Boolean)
      .join(" / ") || "direto / orgânico";

  const linhas = [
    `${badge} · score ${qualificacao.score}/100`,
    `_${icp}_`,
    "",
    `👤 *Nome:* ${lead.nomeCompleto}`,
    `🏢 *Empresa:* ${lead.empresa}`,
    `🏷️ *Segmento:* ${lead.segmento}`,
    `💰 *Faturamento:* ${faturamentoLabel(lead.faturamento)}`,
    `📱 *WhatsApp:* ${lead.whatsappDisplay}`,
    `✉️ *Email:* ${lead.emailCorporativo}${lead.emailPessoal ? " _(pessoal)_" : ""}`,
    "",
    `🎯 *Maior desafio:*`,
    lead.maiorDesafio,
    "",
    `📊 *Origem:* ${origem}`,
    `🕒 ${formatBR(p.submittedAt)}`,
    "",
    `➡️ Responder: https://wa.me/${waDigits}`,
  ];

  return linhas.join("\n");
}

/**
 * Envia a notificação do lead para o WhatsApp do time via Evolution API.
 * Server-only — credenciais nunca vão ao client. Retry com backoff em rede/5xx.
 * Retorna false (sem throw) se não configurado ou se falhar após retries.
 */
export async function forwardToWhatsApp(
  p: LeadNotification,
): Promise<boolean> {
  const base = process.env.EVOLUTION_API_URL;
  const instance = process.env.EVOLUTION_INSTANCE;
  const apiKey = process.env.EVOLUTION_API_KEY;
  const to = process.env.LEAD_WHATSAPP_TO;

  if (!base || !instance || !apiKey || !to) {
    console.warn(
      `[lead] Evolution API não configurada — lead ${p.id} não notificado no WhatsApp`,
    );
    return false;
  }

  const url = `${base.replace(/\/$/, "")}/message/sendText/${instance}`;
  const body = JSON.stringify({ number: to, text: buildLeadMessage(p) });

  const delays = [0, 600, 1800];
  for (const delay of delays) {
    if (delay) await sleep(delay);
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json", apikey: apiKey },
        body,
        signal: ctrl.signal,
      });
      clearTimeout(t);
      if (res.ok) return true;
      if (res.status < 500) {
        console.error(
          `[lead] Evolution recusou lead ${p.id}: HTTP ${res.status}`,
        );
        return false; // 4xx: não adianta retry
      }
    } catch {
      // rede/timeout → tenta de novo
    }
  }
  console.error(`[lead] Evolution indisponível — lead ${p.id} não entregue`);
  return false;
}
