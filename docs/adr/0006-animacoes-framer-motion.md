# 0006 — Animações com Framer Motion (não GSAP)

**Status:** Aceito
**Data:** 2026-06-08

## Contexto
A landing precisa do "scroll cinematográfico" da referência ([REFERENCIA-OTUS](../REFERENCIA-OTUS.md)): reveals em
cascata, parallax e tipografia display que reage ao scroll. O projeto tinha **as duas libs instaladas** (`framer-motion`
e `gsap`) e o CLAUDE.md citava "animações GSAP" como fase seguinte. O `Reveal` (fade-up on-scroll) já usava
framer-motion; havia um hook `data-cinematic` planejado para um futuro `ScrollFx` em GSAP que nunca foi escrito.

O Pedro deixou a escolha da lib a meu critério ("se achar melhor pode usar framer motion").

## Decisão
Usar **somente Framer Motion**. Não introduzir GSAP.

Motivos:
- **Um sistema só** = bundle menor e consistência; evita duas libs de animação concorrendo.
- Framer Motion é **React-first** (declarativo, integra com o ciclo de render) e já era o primitivo do projeto.
- `useReducedMotion` integrado → acessibilidade (`prefers-reduced-motion`) trivial em todos os efeitos.
- `useScroll`/`useTransform` cobrem parallax e scroll-linked sem o peso/imperatividade do ScrollTrigger.

## Implementação
- **Primitivos** ([src/components/ui/Stagger.tsx](../../src/components/ui/Stagger.tsx)): `Stagger` + `StaggerItem`
  (cascata coesa por grupo, via variants) — substituem o padrão manual `delay={i*0.08}` nos grids.
  `Reveal` continua para fade-up de blocos isolados.
- **Hero** ([HeroBackdrop.tsx](../../src/components/sections/HeroBackdrop.tsx)): fundo com parallax no scroll
  (`useScroll`+`useTransform`, scale ≥ 1.1 p/ nunca abrir borda); texto/CTAs/stats entram em cascata.
- **CinematicDisplay** ([CinematicHeadline.tsx](../../src/components/sections/CinematicHeadline.tsx)): a display
  gigante sobe e cresce conforme a seção atravessa a viewport (usa o hook `data-cinematic`).
- **LoneGrowth / Testimonials:** grids migrados para `Stagger`/`StaggerItem`.
- **CTA primário:** "sheen" (brilho diagonal que cruza no hover/focus) — **puro CSS** (`.btn-sheen` em globals.css),
  sem transformar o `Button` em client component.
- Tudo via `transform`/`opacity` (60fps). Todos os efeitos têm fallback em `prefers-reduced-motion` (JS via
  `useReducedMotion`, CSS via media query).

## Consequências
- `gsap` fica como **dependência não usada** no `package.json`. Não está em nenhum import → não entra no bundle.
  Pode ser removido (`bun remove gsap`) numa limpeza; mantido por ora caso se queira um efeito específico de GSAP.
- Novos efeitos de scroll seguem o mesmo padrão de ilhas client (`"use client"`) importadas por seções server.
- O hook `data-cinematic` agora tem dono (CinematicHeadline); o `ScrollFx` em GSAP planejado foi descartado.
