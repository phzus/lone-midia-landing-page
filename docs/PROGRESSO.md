# Progresso — Landing Page (Lone Mídia)

## 2026-06-12 — Hero full-bleed + Meta Pixel ativo ✅
- **Hero ocupa a viewport:** altura agora `calc(100svh − var(--announce-h))` — sobra exatamente a faixa azul de ICP no topo.
  `TopBar` e `Navbar` medem a própria altura (`ResizeObserver`) e publicam `--announce-h`/`--navbar-h` em `:root` (fallback em
  [globals.css](../src/app/globals.css) p/ evitar layout shift no SSR). A navbar passa a **sobrepor** o hero via
  `margin-bottom: calc(var(--navbar-h) * -1)` no `<header>` sticky, então a imagem cobre a tela toda atrás dela.
- **Overlay removido:** saíram os dois scrims (`from-night…`) sobre a imagem — pedido do Pedro. Restou só o `GlowBlob` azul.
- **Posição da imagem:** `object-top` no mobile (topo colado no topo da tela) → `md:object-center` no desktop. Parallax mantido.
- **Layout do hero (ref. do Pedro):** stats viraram **cards flutuantes empilhados à direita** (`absolute`, `lg+`, leve
  stagger horizontal por `translateX`); no mobile/tablet caem no fluxo (`lg:hidden`). Carrossel de logos saiu do container
  próprio e foi pra **dentro do bloco de texto** (`max-w-2xl`), logo abaixo dos CTAs — tudo concentrado em 100vh.
- **Meta Pixel ligado:** `NEXT_PUBLIC_META_PIXEL_ID=1486183085339158` no `.env.local` (componente já existia, carregava só
  pós-consentimento). Falta cadastrar a var na Vercel. Detalhes em [INTEGRACOES.md](INTEGRACOES.md#meta-pixel).
- **Preço "secreto" no ValueStack:** no lugar de "O investimento é apresentado…" entra o componente
  [ScramblePrice](../src/components/ui/ScramblePrice.tsx) — `R$ ??,??` embaralhando **só números + caracteres especiais**,
  sem nunca parar num valor (efeito teaser; valor real só no diagnóstico). SSR determinístico (`?`) p/ não quebrar
  hidratação, slots de largura fixa p/ não tremer, `aria-hidden` + `sr-only` p/ a11y, respeita `prefers-reduced-motion`.
- `bun run build` limpo.

## 2026-06-08 — Animações cinematográficas (Framer Motion) ✅
- **Decisão de lib:** só **Framer Motion**, sem GSAP ([ADR 0006](adr/0006-animacoes-framer-motion.md)) — um sistema
  só, React-first, `useReducedMotion` integrado. `gsap` vira dep não usada (pode remover depois).
- **Primitivos:** `Stagger`/`StaggerItem` ([ui/Stagger.tsx](../src/components/ui/Stagger.tsx)) — cascata coesa por
  grupo, substituindo o `delay={i*0.08}` manual. `Reveal` mantido p/ blocos isolados.
- **Hero:** fundo com parallax no scroll ([HeroBackdrop.tsx](../src/components/sections/HeroBackdrop.tsx)) +
  headline/copy/CTAs/stats em cascata.
- **CinematicDisplay:** display gigante sobe e cresce ao atravessar a viewport
  ([CinematicHeadline.tsx](../src/components/sections/CinematicHeadline.tsx)) — usa o hook `data-cinematic`.
- **LoneGrowth / Testimonials:** grids migrados p/ `Stagger`. **CTA primário:** sheen no hover (puro CSS).
- Tudo `transform`/`opacity` (60fps), com fallback `prefers-reduced-motion`. `bun run build` limpo; lint sem novos
  problemas (só o baseline pré-existente); `/api/lead` testado pós-mudança (segue `degraded:false`).

## 2026-06-08 — Repo no GitHub + leads entregues no WhatsApp (Evolution API) ✅
- **Versionamento:** projeto inicializado em git e publicado em `github.com/phzus/lone-midia-landing-page`
  (branch `main`). `.claude/` (skills locais) ficou **fora** do repo; `.env*` segue ignorado — nenhum segredo subiu.
- **Destino dos leads resolvido:** antes o lead caía só em `console.warn` e se perdia (n8n sem credenciais).
  Decisão do Pedro = notificar **direto no WhatsApp** via Evolution API self-hosted (`evo.lonemidia.com`,
  instância `agent-prospec` / 5522981816966 → destino **5522981530700**). Ver [ADR 0004](adr/0004-leads-whatsapp-evolution-direto.md).
- **Implementação:** `src/lib/evolution.ts` (`forwardToWhatsApp` + mensagem formatada com ICP/score/UTM/link wa.me);
  `/api/lead` agora dispara WhatsApp **e** n8n (opcional) em paralelo; `degraded` só se nenhum destino confirmar.
- **Registro durável no Google Sheets** ([ADR 0005](adr/0005-registro-leads-google-sheets-apps-script.md)):
  `src/lib/sheets.ts` (`forwardToSheets`) faz POST `form-urlencoded` ao Apps Script Web App da planilha do Pedro
  (lê `e.parameter` → append na aba "Leads"). Agora `/api/lead` dispara WhatsApp + Sheets + n8n (opcional) em paralelo.
- **Testado end-to-end:** Evolution direto (HTTP 201), Apps Script ("Requisição recebida com sucesso!") e POST real
  em `/api/lead` → `degraded:false` com WhatsApp + Sheets entregues. `bun run build` limpo.
  (⚠️ ficaram 3 linhas de teste na planilha — apagar.)
- **Pendente:** cadastrar `EVOLUTION_*`, `LEAD_WHATSAPP_TO` e `SHEETS_WEBAPP_URL` na Vercel antes do deploy.

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
