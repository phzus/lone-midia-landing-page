import type { FaturamentoValue } from "@/lib/content";

export type Temperatura = "quente" | "morno" | "frio";

export type IcpResult = {
  icp: boolean;
  temperatura: Temperatura;
  score: number; // 0–100
  regra: string;
};

const BASE_SCORE: Record<FaturamentoValue, number> = {
  ate_100k: 0,
  "100k_300k": 40,
  "300k_500k": 70,
  "500k_1mi": 85,
  acima_1mi: 100,
};

const INTENT_KEYWORDS =
  /(convers[aã]o|vendas?|tr[aá]fego|escala|whatsapp|lead|faturamento|roi)/i;

/** Classifica o lead por ICP (corte de negócio: faturamento > R$100k/mês). */
export function classifyIcp(input: {
  faturamento: FaturamentoValue;
  emailPessoal: boolean;
  maiorDesafio: string;
  utmMedium?: string;
  gclid?: string;
  fbclid?: string;
}): IcpResult {
  const icp = input.faturamento !== "ate_100k";

  let score = BASE_SCORE[input.faturamento];
  if (!input.emailPessoal) score += 15;
  if (INTENT_KEYWORDS.test(input.maiorDesafio)) score += 10;
  const paid =
    input.utmMedium === "cpc" ||
    input.utmMedium === "paid" ||
    Boolean(input.gclid) ||
    Boolean(input.fbclid);
  if (paid) score += 10;
  score = Math.max(0, Math.min(100, score));

  let temperatura: Temperatura;
  if (!icp) temperatura = "frio";
  else if (score >= 70) temperatura = "quente";
  else if (score >= 40) temperatura = "morno";
  else temperatura = "frio";

  return { icp, temperatura, score, regra: "faturamento > R$100k/mês" };
}

// Provedores de email pessoais/free (não bloqueiam, só degradam score).
const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "yahoo.com",
  "yahoo.com.br",
  "icloud.com",
  "bol.com.br",
  "uol.com.br",
  "terra.com.br",
  "globo.com",
]);

export function isPersonalEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return PERSONAL_EMAIL_DOMAINS.has(domain);
}
