# 0001 — Stack: Next.js (App Router) + Tailwind + Vercel

**Status:** Aceito
**Data:** 2026-06-05

## Contexto
Reconstrução do zero de uma landing page de cliente da Lone Mídia, com foco forte em SEO,
performance e conversão. O desenvolvedor (Pedro) já usa Next.js + Tailwind em outros projetos
(4life-ecom, diamond-site-crm), o que favorece consistência e velocidade.

## Opções consideradas
- **Next.js (App Router) + Tailwind + Vercel** — SSR/SSG, ótimo SEO, server actions para
  formulários, `next/image` e `next/font` para performance, deploy trivial na Vercel.
- **Astro + Tailwind** — mais leve para página majoritariamente estática, Core Web Vitals
  excelentes; porém menos familiar e menos integrado a forms/dinâmica.

## Decisão
Next.js (App Router) + TypeScript + Tailwind CSS, deploy na Vercel.

## Consequências
- Consistência com o restante do ecossistema do Pedro.
- Acesso a server actions/API routes para formulário com validação server-side (alinhado ao
  baseline de segurança).
- Custo: bundle um pouco maior que Astro para uma página estática — mitigado com SSG/ISR e
  otimização de assets.
