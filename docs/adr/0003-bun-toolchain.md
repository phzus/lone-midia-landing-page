# 0003 — Bun como toolchain (package manager + runtime de scripts)

**Status:** Aceito
**Data:** 2026-06-05

## Contexto
Preferência do desenvolvedor (Pedro) por **Bun** pela velocidade de instalação e execução. O scaffold inicial
foi criado com create-next-app (npm), mas o gerenciador de pacotes/runner foi migrado para Bun.

## Decisão
Usar **Bun** (`bun install`, `bun add`, `bun run`) como gerenciador de pacotes e runner de scripts.
Lockfile: `bun.lock`. Removidos `package-lock.json` e o `node_modules` do npm.

## Consequências
- Instalação/CI mais rápidos.
- **Next.js continua usando seu próprio compilador** (SWC/Turbopack) para dev/build — o Bun aqui é o
  gerenciador/runner (`bun run dev` → `next dev`), não substitui o bundler do Next.
- Deploy na **Vercel**: a Vercel detecta `bun.lock` e usa Bun no install automaticamente.
- `.gitignore` já ignora `node_modules`; versionar `bun.lock`.
