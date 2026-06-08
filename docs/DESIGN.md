# Design

> Tokens, paleta, tipografia e direção visual. Atualizar a cada mudança de design.
> **Baseline** = extraído do Figma atual. **Direção visual** = evolução aprovada (pegada "noir cinematográfico premium", inspirada em otusmedia.com, mantendo a marca).

## Fonte do design
- Figma: [Lone Mídia — frame 83:2](https://www.figma.com/design/ovlhLYlM69mYNRncC3B2gZ/Lone-M%C3%ADdia?node-id=83-2) (1920×4230, página "Site").
- Guia de marca: página "Marca" (símbolo preto+azul, logos azul/branco/preto, versões com slogan).
- Extração de copy/tokens: `C:/tmp/figma/landing_extract.md`.

> Adaptação detalhada da referência estética: [REFERENCIA-OTUS.md](REFERENCIA-OTUS.md).

## Conceito da direção visual
Evoluir o dark+azul atual para um **noir cinematográfico premium**, sem perder a identidade. Regra-mestra:
**o azul `#0040FF` deixa de pintar tudo e vira sinal EXCLUSIVO de ação** (faixa ICP, CTAs, foco de input,
glow do hero). O resto é monocromático escuro com vidro — o olho é puxado pro formulário. A "pegada sinistra"
da Otus vem de 4 alavancas: (1) fundo quase puro com vinheta radial pesada; (2) grain/noise sutil global;
(3) tipografia display gigante com tracking negativo + numeração 01–04; (4) glassmorphism real (não azul sólido).

## Paleta (direção) — tokens
| Token | Hex | Uso |
|-------|-----|-----|
| `bg-base` | `#08080A` | Fundo global (mais neutro/escuro que o #0D0D0D atual; pegada noir) |
| `bg-elevated` | `#0E0E12` | Seções alternadas e base dos cards de vidro |
| `bg-sunken` | `#050507` | Divisores/respiro e fundo do footer; ponto mais escuro da vinheta |
| `brand-blue` | `#0040FF` | **Accent — só ação:** faixa ICP, CTAs, borda ativa, glow do hero. Não pintar cards inteiros |
| `brand-blue-hi` | `#2D5BFF` | Hover/topo de gradiente do CTA e glow |
| `brand-blue-deep` | `#001451` | Base de gradientes azul→preto, borda inferior de botões |
| `cyan-glow` | `#00ABEB` | **Parcimônia** — só na ponta de 1 gradiente de destaque (palavra grifada do hero) |
| `text-primary` | `#F4F5F7` | Títulos e texto principal (off-white, ~17:1 sobre bg-base) |
| `text-secondary` | `#A9ADB8` | Subtítulos/parágrafos (~7:1) — substitui #CCCCCC |
| `text-muted` | `#6B6F7B` | Labels, captions, copyright (~4.6:1) — **nunca usar #666 em texto pequeno** |
| `border-hairline` | `rgba(255,255,255,.08)` | Bordas de vidro, divisores |
| `border-active` | `#0040FF` | Borda de input em foco / card ativo (+ glow azul) |
| `glass-fill` | `#12131A` (~50–60% + blur) | Preenchimento base do card de vidro |
| `danger-strike` | `#F45454` | **Só** preços riscados na value-stack |
| `success-soft` | `#3DD68C` | Sucesso do form + checkmarks da value-stack |

## Tipografia
**Decisão:** **Helvetica Now Display** como fonte de marca (display + UI). Inter sai (era placeholder do Figma —
e tem cara "tech genérica" que mata o premium). Helvetica Now **não** está no Google Fonts (licença Monotype paga).
- Implementar via **`next/font/local`** servindo os `.woff2` da licença do cliente (self-hosted, zero CLS, sem request externo). Carregar só **400 / 500 / 700** (+ 800/900 se a licença incluir, p/ o headline gigante). `display:'swap'`, `variable:'--font-display'`.
- **Fallback** (staging / licença atrasada): `"Helvetica Neue", Arial, "Inter", system-ui, sans-serif` com `size-adjust` p/ evitar CLS.

**Escala (fluid com clamp):**
| Token | Uso | Tamanho | Peso | Tracking | LH |
|---|---|---|---|---|---|
| display-hero | H1 hero | clamp(40px, 6vw, 76px) | 700 | -0.03em | 1.02 |
| display-xl | Preço gigante / números | clamp(64px, 12vw, 160px) | 700 | -0.04em | 0.95 |
| h2 | Título de seção | clamp(32px, 4vw, 44px) | 700 | -0.02em | 1.08 |
| h3 | Card/pilar | 22–26px | 700 | -0.01em | 1.2 |
| section-no | Numeração 01–04 | 14px | 500 | 0.18em (upper) | 1 |
| body-lg | Subtítulo/parágrafo | 18–20px | 400 | 0 | 1.6 |
| body | Texto padrão | 16px | 400 | 0 | 1.65 |
| label | Labels/eyebrow | 14px | 500/600 | 0.06em | 1.4 |
| micro | LGPD/copyright | 12–13px | 400 | 0 | 1.5 |

Regras: títulos sempre tracking **negativo** (ar display premium); eyebrows/numeração sempre **uppercase + tracking positivo** (assinatura Otus); body mínimo 16px no mobile; parágrafos ≤ ~65ch.

## Efeitos (Tailwind + CSS puro, sem libs pesadas)
1. **Grain/noise global** — `<div>` fixo, `pointer-events-none`, `mix-blend-overlay`, `opacity .04–.06`, fonte = SVG `feTurbulence` inline em data-URI (~1KB).
2. **Vinheta radial noir** — `radial-gradient(120% 120% at 50% 0%, transparent 55%, rgba(0,0,0,.85))`; no hero, 70%.
3. **Spotlight no hero** — `radial-gradient(60% 50% at 50% 30%, rgba(0,64,255,.22), rgba(0,20,81,.10) 35%, transparent 70%)`; opcional seguir o mouse (`useMotionValue`, só desktop).
4. **Glow ambient** — blobs `absolute` `bg-[#0040FF]/20 blur-[120px]` no hero, atrás do form e do preço (opacidade ≤25%).
5. **Glassmorphism real nos cards** — `bg-white/[.04] backdrop-blur-xl border border-white/[.08] rounded-2xl` + `shadow-[inset_0_1px_0_0_rgba(255,255,255,.06)]`; hover → `border-[#0040FF]/40` + glow. **Substitui os cards azuis-sólidos atuais.**
6. **Hairline gradient borders** — borda com gradiente (luz caindo) no card de destaque do método e no card do form.
7. **CTA com glow + profundidade** — `bg-gradient-to-b from-[#2D5BFF] to-[#0040FF]`, borda inferior `#001451`, `shadow-[0_8px_30px_-4px_rgba(0,64,255,.5)]`, foco `ring-2 ring-[#2D5BFF]`.
8. **Faixa ICP "spotlight bar"** — único bloco 100% azul, com grain e inset de luz no topo.
9. **Carrosséis** (logos/depoimentos) — scroll infinito CSS `@keyframes translateX` (sem JS), `mask-image` fade lateral, pausa no hover.

## Animação (libs) — aprovado usar GSAP e/ou Framer Motion
- **GSAP + ScrollTrigger** = primário pros momentos **scroll-driven cinematográficos** (pin/sticky, parallax, clip-mask reveal estilo otus, count-up). É a ferramenta que entrega a vibe da referência.
- **CSS `@keyframes`** pros tickers (logos/depoimentos) e glow "respirando" — sem JS, mais barato.
- **Framer Motion** opcional pra reveals/hover de componentes (entrada `opacity/y`, stagger).
- **Perf:** carregar GSAP via `dynamic import`/lazy (não bloquear o LCP do hero); animar só `transform`/`opacity`; `will-change` pontual.
- **A11y:** tudo atrás de `prefers-reduced-motion` (desliga pin/parallax/count-up/glow pulsante; conteúdo legível estático).

## Tratamento seção a seção (resumo)
1. **Faixa ICP** — barra fina full-width azul-sólida, texto off-white 14/700 uppercase, ícone cadeado/diamante.
2. **Navbar** — flutuante `top-4`, glass arredondada (`rounded-full`), CTA "Entrar em contato" = outline glass.
3. **Hero** — palco: spotlight azul + grain + vinheta; 2 colunas (H1 com 1 palavra grifada gradiente azul→cyan + 2 CTAs / foto dos fundadores com duotone azul nas sombras + scrim preto na base); badges +10mi/+100% como pills de vidro; faixa de logos dessaturada (cor no hover).
4. **Lone Growth (CONSOLIDADO 01–04)** — eyebrow + H2 + 4 cards de vidro numerados; mote como frase de respiro (peso 200/itálico); UM CTA.
5. **Depoimentos** — parede/carrossel de cards de vidro (foto + nome + @ + cargo), aspas azuis. ⚠️ Conteúdo real pendente.
6. **Value-stack** — 10 itens com checkmark + preço riscado; preço final em display-xl com glow azul atrás.
7. **Form** — destino de conversão: card de vidro com hairline gradient border + glow; inputs `bg-white/[.03]`, foco azul + glow; botão full-width azul-glow com loading; aviso LGPD micro.
8. **Footer** — `bg-sunken`, logo, social (44×44), mote, copyright, voltar ao topo; vinheta fechando em preto.

## Melhorias estruturais (achados a aplicar)
- **Consolidar a duplicação do método** — hoje há 2–3 blocos repetidos de "Lone Growth"; unificar em UMA seção 01–04 + um recap curto perto do form. Encurta ~1 tela até a conversão.
- **Padronizar 4 pilares** em todo lugar (o bloco de baixo perde "Escala Previsível").
- **Hierarquia de cor** — azul saturado só em ação (ver regra-mestra); cards/seções monocromáticos escuros.
- **Eliminar lorem ipsum** dos depoimentos antes do go-live (maior dano de credibilidade).
- **Containers** — `max-w-7xl` global + spacing consistente (`py-24`/`py-32`).

## Performance & acessibilidade (riscos e mitigação)
- `backdrop-blur` é caro: limitar a navbar + cards; testar em mobile mid. Blobs `blur` com `will-change:opacity` só onde anima.
- `next/image` (WebP/AVIF, `priority` só na foto do hero = LCP, width/height p/ CLS); logos em SVG; grain via data-URI (sem request).
- Framer Motion pontual; páginas Server Components, `'use client'` só nas folhas interativas.
- Contraste: todos os tokens de texto ≥ 4.5:1; texto sobre foto/glow exige scrim preto. Faixa ICP off-white sobre azul ~5.3:1 (AA).
- `prefers-reduced-motion`: desligar spotlight interativo, count-up, glow pulsante; foco visível em tudo; cor nunca como único sinal; touch targets 44×44.
