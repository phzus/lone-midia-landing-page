# Progresso — Landing Page (Lone Mídia)

## 2026-06-05 — Landing construída, buildando e rodando ✅
- **Stack confirmado:** Next.js 16.2.7 (App Router, Turbopack) + React 19 + Tailwind v4 + **Bun** (ADR 0003).
  Libs: framer-motion 12, gsap 3.15, zod **v4**, react-hook-form 7, @marsidev/react-turnstile, @upstash/ratelimit, lucide-react v1.
- **Assets reais** integrados (Drive `.../Página de Captura 1.0`): logo + símbolo, `bg-hero-desk.png` (fundadores+glow),
  ícones dos 4 pilares (SVG), 21 logos de clientes, fotos lucas/roberto → `public/`.
- **Design system** em `globals.css` (@theme): tokens noir + grain + vinheta + glow + glass + marquee. Helvetica Now
  Display via fallback (`.woff2` pendentes do Drive).
- **Seções implementadas:** TopBar (ICP), Navbar (glass + mobile), Hero (bg composto + headline split + stats + logos),
  LoneGrowth (4 pilares 01–04), CinematicDisplay (display gigante), Testimonials (placeholder honesto), ValueStack
  (preço escondido → "valor no diagnóstico"), FinalCta, LeadFormSection, Footer (logotipo gigante).
- **Captura:** `LeadForm` (RHF + Zod) → `/api/lead` (validação server, honeypot/time-trap/rate-limit/Turnstile,
  HMAC, idempotência, retry, classificação ICP) → n8n (degrada sem credenciais). Meta Pixel gated por consentimento
  + ConsentBanner + `/politica-de-privacidade`. SEO: metadata/OG, sitemap, robots, JSON-LD. Headers de segurança (CSP etc.).
- **`bun run build` passou limpo**; dev server OK em http://localhost:3000 (home e privacidade 200).
- **Fixes:** ícones de marca (lucide v1 removeu brand icons) → SVGs próprios; CSP dev com `unsafe-eval`; `suppressHydrationWarning` (extensão ColorZilla).
- **Pendente:** animações GSAP scroll-driven; assets de fonte; depoimentos/logos reais; envs de produção (n8n, Pixel, Turnstile, domínio).

## 2026-06-05 — Decisões aprovadas + início da construção
- **Direção visual aprovada** (noir cinematográfico; azul só pra ação).
- **Preço:** decisão = manter value-stack mas **esconder o número** → "valor apresentado no diagnóstico"
  (resolve OPEN-QUESTION #1; CTA de orçamento vira CTA de diagnóstico).
- **Prova social:** placeholder honesto por ora — depoimentos e logos ficam pendentes (OQ #2/#3).
- **Decisão de fluxo:** Claude vai **construir a landing** a partir do PRD (não passar pra outro agente agora).
- Scaffold Next.js (App Router + TS + Tailwind) iniciado.

## 2026-06-05 — Análise consolidada + PRD fechado
- **Workflow de análise concluído** (3 agentes, ~164k tokens). Resultados consolidados nas docs:
  - [DESIGN.md](DESIGN.md): direção visual "noir cinematográfico premium" — paleta de 15 tokens
    (azul só p/ ação), Helvetica Now Display via `next/font/local`, 9 efeitos (grain/vinheta/spotlight/
    glow/glass), tratamento das 8 seções, motion e riscos perf/a11y.
  - [COPY.md](COPY.md): reescrita seção a seção (mse-copy/Anti-AI) — headline de resultado, método
    com 4 pilares 01–04, faixas de faturamento, aviso LGPD honesto; typos corrigidos; placeholders
    marcados (preço, depoimentos).
  - [INTEGRACOES.md](INTEGRACOES.md) + [adr/0002](adr/0002-captura-leads-n8n.md): captura
    Route Handler → n8n (HMAC, idempotência, retry/fallback) → Sheets + WhatsApp + Meta CAPI;
    anti-spam (honeypot/time-trap/rate-limit/Turnstile); LGPD (consentimento, base legal, política pública).
  - [PRD.md](PRD.md): **fechado p/ handoff** — escopo, arquitetura, NFRs, critérios de aceite, fora de escopo.
- **Referência confirmada:** evolução estética inspirada em otusmedia.com, mantendo azul #0040FF + near-black.
- Pendências atualizadas em [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md) (15 itens; 4 de alta prioridade).

## 2026-06-05 — Briefing + extração do Figma + análise
- **Briefing respondido** e registrado em [BRIEFING-CLIENTE.md](BRIEFING-CLIENTE.md): cliente = a própria
  Lone Mídia (tráfego pago + assessoria de vendas); objetivo = form de qualificação → reunião (ICP);
  lead → n8n (byvot) → planilha + WhatsApp; Meta Pixel; LGPD sim.
- **ICP definido:** empresas faturando **> R$100 mil/mês** (faixa-topo do design).
- **Figma acessado** via API REST (token em `Programação/.figma-credentials`). Landing = frame 83:2.
  Extraída paleta, fontes e **copy completa** (122 blocos) → `C:/tmp/figma/landing_extract.md`.
  Tokens baseline em [DESIGN.md](DESIGN.md); estrutura/seções em [PROJETO.md](PROJETO.md).
- **Achados:** depoimentos e preço são placeholder; typos no design ("Metologia", "Lone Gowth");
  duplicação do bloco de método; fonte intencional (Helvetica Now Display) ≠ Figma (Inter).
- **Referência estética:** cliente quer pegada "sinistra/cinematográfica" tipo otusmedia.com.
- **Workflow de análise** (ultracode) disparado: 3 agentes paralelos (direção visual, copy de
  conversão, integrações/segurança). Resultados alimentam DESIGN/COPY/INTEGRACOES/PRD.
- Pendências priorizadas em [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md) (preço, depoimentos, logos, fonte, domínio, n8n).

## 2026-06-05 — Setup do "segundo cérebro" + skills
- **Estrutura de docs-vivos** criada (padrão adaptado do seo-ballsnbrains, com camada de
  marketing): `PRD`, `BRIEFING-CLIENTE`, `PROJETO`, `DESIGN`, `COPY`, `INTEGRACOES`,
  `PROGRESSO`, `OPEN-QUESTIONS` e `adr/`.
- **CLAUDE.md** escrito com as regras de auto-atualização, uso das skills e **baseline de
  segurança & boas práticas** (foco do projeto).
- **Skills instaladas** em `.claude/skills/`: `ui-ux-pro-max` (design) e `mse-copy` (copy de
  conversão). Framework de apoio `mse-funnel-labs` copiado para `.claude/mse-funnel-labs/`
  (paths que o mse-copy referencia). `mse-copy` adaptado para PT-BR / contexto deste projeto.
- **Decisão de stack** registrada em [adr/0001-stack-nextjs-tailwind-vercel.md](adr/0001-stack-nextjs-tailwind-vercel.md): Next.js (App Router) + Tailwind + Vercel.

## Status atual
**Fase:** Briefing & planejamento (PRD ainda em rascunho)
**Próximo:** preencher [BRIEFING-CLIENTE.md](BRIEFING-CLIENTE.md) → finalizar [PRD.md](PRD.md) para handoff.
