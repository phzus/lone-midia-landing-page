// Configuração central do site. Valores sensíveis vêm de env (ver .env.example).

export const SITE = {
  name: "Lone Mídia",
  shortName: "Lone Mídia",
  // URL de produção (ajustar quando o domínio for definido — OPEN-QUESTIONS #5)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lonemidia.com.br",
  description:
    "Agência de tráfego pago e assessoria de vendas. O método Lone Growth transforma seu marketing em uma máquina de vendas previsível. Diagnóstico gratuito para empresas que faturam acima de R$ 100 mil/mês.",
  locale: "pt_BR",
  email: "lonemidiamkt@gmail.com",
  // Número de contato (E.164 sem +), público. Placeholder até confirmação (OPEN-QUESTIONS #6).
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5500000000000",
  whatsappMessage:
    "Olá! Vim pelo site da Lone Mídia e quero meu diagnóstico gratuito.",
} as const;

export function whatsappHref(
  message: string = SITE.whatsappMessage,
  number: string = SITE.whatsappNumber,
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "Início", href: "#home" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Resultados", href: "#resultados" },
] as const;
