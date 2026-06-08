# Open Questions

> Pendências sem resposta, por prioridade. Resolver → mover a info pro doc correto e remover daqui.

## Status (2026-06-05)
Landing **construída e rodando** (`bun run build` limpo; dev http://localhost:3000). **Fase atual:**
1. ⏳ **Correções do cliente** — Pedro vai passar ajustes de visual/copy (registrar aqui quando chegarem).
2. ⏳ **Animações GSAP** scroll-driven (pin/parallax no cinematográfico, spotlight no hero, count-up dos números).

## Conteúdo (dependência de go-live)
- **Fonte Helvetica Now Display** — enviar os `.woff2` (Drive `.../site/fontes`) e confirmar **licença web** (Monotype). Build usa fallback Helvetica até lá.
- **Depoimentos reais** — 4–8: resultado/número, texto (antes→depois→como), foto, nome, cargo+empresa+@. Hoje placeholder honesto.
- **Logos de clientes** — os 21 já rodam no carrossel (silhueta branca); confirmar permissão de uso e quais manter.

## Integrações / produção (preencher `.env.local`)
- **Domínio** + acesso ao DNS (apontar Vercel) → setar `NEXT_PUBLIC_SITE_URL`.
- ~~**WhatsApp: Cloud API vs Evolution** + número de origem~~ → **RESOLVIDO (2026-06-08, ADR 0004):** Evolution API (`evo.lonemidia.com`, instância `agent-prospec` / 5522981816966), lead vai p/ 5522981530700. Falta cadastrar `EVOLUTION_*` + `LEAD_WHATSAPP_TO` na Vercel.
- ~~planilha Google (ID/aba)~~ → **RESOLVIDO (2026-06-08, ADR 0005):** registro via Apps Script Web App (`SHEETS_WEBAPP_URL`), aba "Leads". Falta cadastrar a env na Vercel.
- **n8n (opcional)** — `N8N_WEBHOOK_URL` + `N8N_WEBHOOK_SECRET`. Só se quiser Meta CAPI/fila durável além de WhatsApp + Sheets.
- **Meta Pixel** — `NEXT_PUBLIC_META_PIXEL_ID`; usar CAPI? valor do evento Lead?
- **Turnstile** — `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` (anti-spam).
- **Upstash** — `UPSTASH_REDIS_REST_URL/TOKEN` (rate-limit em produção).

## Conteúdo do formulário (confirmar)
- **Opções de "Segmento"** — lista atual em `src/lib/content.ts` (E-commerce, Serviços, Saúde & Estética, Educação, Imobiliário, Financeiro, Indústria, Varejo físico, Infoproduto, Outro).
- **Faixas de "Faturamento mensal"** — atuais: <100k / 100–300k / 300–500k / 500k–1mi / >1mi.

## LGPD / jurídico (antes do go-live)
- **Dados do controlador** — razão social/CNPJ da Lone Mídia, contato do encarregado (DPO) → completar `/politica-de-privacidade`.
- **Prazo de retenção** de leads (sugerido 12–24 meses).

## Resolvidas (2026-06-05)
- ~~Preço da oferta~~ → escondido; "valor apresentado no diagnóstico" (âncora R$ 19.400 riscada).
- ~~Fotos dos fundadores / hero~~ → `lucas.png`, `roberto.png`, `bg-hero-desk.png` integrados.
- ~~CTA "Ver como funciona"~~ → leva à âncora do método (`#metodologia`).
- ~~Navbar "Soluções/Sobre"~~ → âncoras: Início/Metodologia/Soluções/Resultados.
- ~~MVP vs completo~~ → construído completo de uma vez.
- ~~Stack/toolchain~~ → Next 16 + Tailwind v4 + Bun (ADRs 0001/0003).
