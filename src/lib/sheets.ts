import { FATURAMENTO_FAIXAS, type FaturamentoValue } from "@/lib/content";
import type { LeadNotification } from "@/lib/evolution";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function faturamentoLabel(value: FaturamentoValue): string {
  return FATURAMENTO_FAIXAS.find((f) => f.value === value)?.label ?? value;
}

/**
 * Registra o lead na planilha Google via Web App do Apps Script.
 * O script lê `e.parameter` → enviamos `application/x-www-form-urlencoded`
 * com as chaves que o doPost espera (nome/email/whatsapp/empresa/segmento/mrr/desafio).
 * O timestamp é gerado pelo próprio script. Server-only; retry com backoff.
 */
export async function forwardToSheets(p: LeadNotification): Promise<boolean> {
  const url = process.env.SHEETS_WEBAPP_URL;
  if (!url) {
    console.warn(
      `[lead] SHEETS_WEBAPP_URL ausente — lead ${p.id} não registrado na planilha`,
    );
    return false;
  }

  const body = new URLSearchParams({
    nome: p.lead.nomeCompleto,
    email: p.lead.emailCorporativo,
    whatsapp: p.lead.whatsappE164,
    empresa: p.lead.empresa,
    segmento: p.lead.segmento,
    mrr: faturamentoLabel(p.lead.faturamento),
    desafio: p.lead.maiorDesafio,
  }).toString();

  const delays = [0, 600, 1800];
  for (const delay of delays) {
    if (delay) await sleep(delay);
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body,
        redirect: "follow",
        signal: ctrl.signal,
      });
      clearTimeout(t);
      if (res.ok) return true;
      if (res.status < 500) {
        console.error(`[lead] Sheets recusou lead ${p.id}: HTTP ${res.status}`);
        return false;
      }
    } catch {
      // rede/timeout → tenta de novo
    }
  }
  console.error(`[lead] Sheets indisponível — lead ${p.id} não registrado`);
  return false;
}
