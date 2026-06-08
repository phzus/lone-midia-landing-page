// Conteúdo estruturado da landing (copy aprovada em docs/COPY.md).
// Centralizado aqui pra facilitar ajuste sem mexer nos componentes.

export const STATS = [
  { value: "+R$10 mi", label: "em receita gerada para nossos clientes" },
  { value: "+100%", label: "de crescimento médio nos cases que acompanhamos" },
  { value: "+40", label: "negócios escalados com o método Lone Growth" },
] as const;

export const PILLARS = [
  {
    n: "01",
    title: "Captação Segmentada",
    desc: "Anúncios mirados em quem tem perfil e bolso pra comprar de você, não em curioso que infla métrica.",
  },
  {
    n: "02",
    title: "Qualificação Estratégica",
    desc: "Filtramos o lead antes de chegar no seu vendedor, pra ele só falar com quem tem real intenção de fechar.",
  },
  {
    n: "03",
    title: "Conversão Otimizada",
    desc: "Script, copy e automação no WhatsApp pra encurtar o caminho entre o clique e o caixa.",
  },
  {
    n: "04",
    title: "Escala Previsível",
    desc: "Com os três girando, a gente aumenta o investimento sabendo quanto retorna — crescer deixa de ser aposta.",
  },
] as const;

export const VALUE_STACK = [
  { label: "Auditoria completa dos seus anúncios atuais", price: 3000 },
  { label: "Estratégia de tráfego pago montada pro seu segmento", price: 3000 },
  { label: "Consultoria comercial + diagnóstico do seu funil de vendas", price: 1800 },
  { label: "Script de vendas e atendimento pelo WhatsApp", price: 1000 },
  { label: "Análise de concorrência e posicionamento", price: 1600 },
  { label: "Plano de ação dos próximos 90 dias", price: 2000 },
  { label: "Criativos iniciais prontos pra rodar", price: 3000 },
  { label: "Funil de conteúdo para o Instagram", price: 1000 },
  { label: "Reformulação visual do perfil do Instagram", price: 1500 },
  { label: "Suporte consultivo direto com o time", price: 1500 },
] as const;

export const VALUE_STACK_TOTAL = VALUE_STACK.reduce((s, i) => s + i.price, 0); // 19.400

// Depoimentos: PLACEHOLDER honesto (conteúdo real pendente — OPEN-QUESTIONS #2).
export const TESTIMONIALS_PLACEHOLDER = [
  { result: "Resultado em destaque", quote: "Depoimento real a ser preenchido com case do cliente (antes → depois → como).", name: "Nome do cliente", role: "Cargo · Empresa", handle: "@empresa" },
  { result: "Resultado em destaque", quote: "Depoimento real a ser preenchido com case do cliente (antes → depois → como).", name: "Nome do cliente", role: "Cargo · Empresa", handle: "@empresa" },
  { result: "Resultado em destaque", quote: "Depoimento real a ser preenchido com case do cliente (antes → depois → como).", name: "Nome do cliente", role: "Cargo · Empresa", handle: "@empresa" },
] as const;

// Faixa-topo ICP
export const ICP_BANNER = "EXCLUSIVO PARA EMPRESAS QUE JÁ FATURAM ACIMA DE R$ 100 MIL POR MÊS";

// Logos de clientes: PLACEHOLDER (arquivos/permissão pendentes — OPEN-QUESTIONS #3).
export const CLIENT_LOGOS_PLACEHOLDER = [
  "Inovar", "Ponto Auto", "Império dos Pisos", "Grupo Elo", "Cliente", "Cliente",
] as const;

// ---- Opções do formulário (compartilhadas com lead-schema.ts) ----
export const SEGMENTOS = [
  "E-commerce",
  "Serviços",
  "Saúde & Estética",
  "Educação",
  "Imobiliário",
  "Financeiro",
  "Indústria",
  "Varejo físico",
  "Infoproduto",
  "Outro",
] as const;

export const FATURAMENTO_VALUES = [
  "ate_100k",
  "100k_300k",
  "300k_500k",
  "500k_1mi",
  "acima_1mi",
] as const;

export const FATURAMENTO_FAIXAS: ReadonlyArray<{
  value: (typeof FATURAMENTO_VALUES)[number];
  label: string;
}> = [
  { value: "ate_100k", label: "Abaixo de R$ 100 mil/mês" },
  { value: "100k_300k", label: "R$ 100 mil a R$ 300 mil" },
  { value: "300k_500k", label: "R$ 300 mil a R$ 500 mil" },
  { value: "500k_1mi", label: "R$ 500 mil a R$ 1 mi" },
  { value: "acima_1mi", label: "Acima de R$ 1 mi" },
];

export type FaturamentoValue = (typeof FATURAMENTO_VALUES)[number];
