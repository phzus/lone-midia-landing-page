# Projeto — Escopo & estrutura (vivo)

> Mapa do que existe no código. Atualizar a cada mudança de escopo/estrutura.
> Base: frame Figma 83:2 + extração de copy/tokens. **Status:** implementado e rodando.

## Como rodar (Bun — ver ADR 0003)
```bash
bun install
bun run dev     # http://localhost:3000
bun run build   # build de produção
bun run lint
```
Variáveis: copie `.env.example` → `.env.local`. Sem elas, integrações (n8n/Pixel/Turnstile) ficam inertes (degradam).

## Páginas
- `/` — landing single-page (âncoras: `#home`, `#metodologia`, `#solucoes`, `#resultados`, `#diagnostico`)
- `/politica-de-privacidade` — LGPD
- `/api/lead` — route handler (POST) de captura
- `/sitemap.xml`, `/robots.txt` — SEO

## Estrutura da landing (ordem) → componente
| # | Seção | Arquivo |
|---|-------|---------|
| 1 | Faixa ICP | `src/components/sections/TopBar.tsx` |
| 2 | Navbar (glass + menu mobile) | `src/components/sections/Navbar.tsx` |
| 3 | Hero (bg composto + headline + stats + logos) | `src/components/sections/Hero.tsx` + `ClientLogos.tsx` |
| 4 | Método Lone Growth (4 pilares 01–04) | `src/components/sections/LoneGrowth.tsx` |
| 5 | Momento cinematográfico ("ESCALA PREVISÍVEL") | `src/components/sections/CinematicDisplay.tsx` |
| 6 | Depoimentos (⚠️ placeholder) | `src/components/sections/Testimonials.tsx` |
| 7 | Value-stack (preço escondido) | `src/components/sections/ValueStack.tsx` |
| 8 | CTA de urgência | `src/components/sections/FinalCta.tsx` |
| 9 | Formulário | `src/components/sections/LeadFormSection.tsx` + `LeadForm.tsx` |
| 10 | Footer (logotipo gigante) | `src/components/sections/Footer.tsx` |

## Mapa de arquivos
```
src/
├── app/
│   ├── layout.tsx              # metadata/SEO, JSON-LD, grain global
│   ├── page.tsx                # monta as seções + MetaPixel + ConsentBanner
│   ├── globals.css             # design system (@theme, grain, glass, glow, marquee)
│   ├── sitemap.ts · robots.ts  # SEO
│   ├── api/lead/route.ts       # captura (Zod, anti-spam, HMAC, n8n, ICP)
│   └── politica-de-privacidade/page.tsx
├── components/
│   ├── sections/               # as 10 seções acima
│   ├── ui/                     # Container, Section, Eyebrow, Button, GlassCard, GlowBlob, Reveal, BrandIcons
│   ├── LeadForm.tsx            # RHF + Zod + Turnstile + máscara
│   ├── MetaPixel.tsx           # pixel gated por consentimento
│   └── ConsentBanner.tsx       # banner LGPD
└── lib/
    ├── site.ts                 # config (URL, WhatsApp, nav)
    ├── content.ts              # copy estruturada (pilares, value-stack, stats, opções de form)
    ├── lead-schema.ts          # Zod (client+server)
    ├── icp.ts                  # classificação de lead
    ├── consent.ts · pixel.ts   # LGPD/tracking helpers
    └── cn.ts
public/                         # brand/, hero/, team/, icons/, logos/ (assets reais do Figma/Drive)
```

## Campos do formulário (qualificação)
Nome*, WhatsApp* (máscara), Email corporativo*, Empresa*, Segmento* (select), Faturamento mensal* (faixas),
Maior desafio* (textarea), Consentimento LGPD* (checkbox). Lógica de ICP em `src/lib/icp.ts`.

## Decisões de escopo
- Single-page com âncoras. Preço escondido ("valor no diagnóstico"). Depoimentos/logos = placeholder honesto até conteúdo real.
- Detalhe de copy em [COPY.md](COPY.md), design em [DESIGN.md](DESIGN.md), integrações em [INTEGRACOES.md](INTEGRACOES.md).

## Próximas etapas
1. **Correções do cliente** (Pedro vai passar) — ajustes de visual/copy.
2. **Animações GSAP** scroll-driven (pin/parallax no cinematográfico, spotlight no hero, count-up) — ver [DESIGN.md](DESIGN.md#animação-libs).
3. Conteúdo real (fontes Helvetica Now, depoimentos, logos) + envs de produção.
