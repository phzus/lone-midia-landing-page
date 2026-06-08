# Lone Mídia — Landing Page (cliente a definir no briefing)

Landing page de um cliente da **Lone Mídia**. O site anterior do cliente **saiu do ar** e
esta é uma reconstrução **do zero**, com foco em **SEO, performance, conversão, segurança e
boas práticas**. O design já existe (fonte a registrar em [docs/DESIGN.md](docs/DESIGN.md)).

> ✅ Estado: **landing construída e rodando** (`bun run build` limpo; dev em http://localhost:3000).
> Briefing + PRD fechados. **Fase atual:** aguardando correções do cliente (Pedro) → depois animações GSAP.
> Escopo em [docs/PRD.md](docs/PRD.md) · estrutura/arquivos em [docs/PROJETO.md](docs/PROJETO.md) · pendências em [docs/OPEN-QUESTIONS.md](docs/OPEN-QUESTIONS.md).

---

## Docs vivos — regra principal (segundo cérebro)

**Claude mantém `docs/` atualizada automaticamente conforme o projeto evolui. Pedro não precisa pedir.**

Quando atualizar:
- **Decisão técnica ou de design relevante** → criar ADR numerado em [docs/adr/](docs/adr/) seguindo o formato dos existentes.
- **Bloco de trabalho significativo concluído** → entrada datada `YYYY-MM-DD` no **topo** do log em [docs/PROGRESSO.md](docs/PROGRESSO.md).
- **Resposta nova do cliente / briefing** → registrar em [docs/BRIEFING-CLIENTE.md](docs/BRIEFING-CLIENTE.md) (fonte da verdade do "porquê").
- **Mudança de escopo, páginas ou componentes** → atualizar [docs/PROJETO.md](docs/PROJETO.md) e, se afetar o handoff, [docs/PRD.md](docs/PRD.md).
- **Mudança de design (tokens, paleta, tipografia, assets)** → atualizar [docs/DESIGN.md](docs/DESIGN.md).
- **Copy nova/reescrita** → registrar por seção em [docs/COPY.md](docs/COPY.md).
- **Tracking, formulário, WhatsApp, analytics ou LGPD** → atualizar [docs/INTEGRACOES.md](docs/INTEGRACOES.md).
- **Dúvida ou pendência sem resposta** → registrar em [docs/OPEN-QUESTIONS.md](docs/OPEN-QUESTIONS.md).

**Regra de ouro:** se algo foi resolvido, decidido ou produzido e não foi registrado em `docs/`, **é bug**.
Conhecimento que mora só na conversa se perde na próxima sessão.

**Minimalismo:** preencher um arquivo só quando há conteúdo real. Stub honesto se vazio — não inventar.

---

## Skills disponíveis (.claude/skills)

### ui-ux-pro-max — inteligência de design
Use ao **planejar, construir, revisar ou otimizar** UI/UX. Base de 67 estilos, 96 paletas,
57 pares de fontes, guidelines de UX e padrões de performance. Tem CSVs específicos por stack
em `data/stacks/` — usar **`nextjs.csv`** e `landing.csv` neste projeto. Scripts Python em `scripts/`.

### mse-copy — copywriter de conversão (@claudinho) + Anti-AI
Use sempre que **escrever ou reescrever copy** voltada ao cliente: headline, hero, benefícios,
comparativos/prós-e-contras, FAQ, microcopy de CTA, garantia, reviews, popups, ads.
Antes de escrever, ler o protocolo Anti-AI em `.claude/mse-funnel-labs/.claude/rules/anti-ai-protocol.md`
e puxar frameworks de `.claude/mse-funnel-labs/core/data/` (copy-frameworks, hook-headline-formulas,
objection-handler-playbook). Voz/marca vêm do briefing — **nunca inventar**. PT-BR: acentuação obrigatória.

---

## Stack

- **Next.js (App Router)** + **TypeScript**
- **Tailwind CSS**
- Deploy na **Vercel**
- Imagens otimizadas (`next/image`, WebP/AVIF), fontes via `next/font`

**Toolchain: Bun** (não npm) — ver [adr/0003-bun-toolchain.md](docs/adr/0003-bun-toolchain.md).
```bash
bun install      # instalar dependências
bun add <pkg>    # adicionar dependência
bun run dev      # dev server (next dev)
bun run build    # build de produção (next build)
bun run lint     # checagem de lint
```

---

## Segurança & boas práticas (baseline obrigatório)

Foco explícito do projeto. O agente executor **deve** seguir:

- **Segredos:** nada de chave/token no repo. Variáveis sensíveis só em `.env.local` (no `.gitignore`)
  e em env vars da Vercel. Nunca expor segredo no client; prefixo `NEXT_PUBLIC_` só para o que é público de fato.
- **Formulários:** validação **server-side** (ex: Zod) além da client-side; sanitização de input;
  honeypot + rate-limiting no endpoint; mensagens de erro que não vazam detalhes internos.
- **Headers de segurança** em `next.config`: CSP, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, `X-Frame-Options`/`frame-ancestors`, HSTS. HTTPS sempre.
- **XSS:** evitar `dangerouslySetInnerHTML`; se inevitável, sanitizar. Nunca renderizar input do usuário sem escape.
- **API routes / server actions:** validar payload, checar método/origem, sem CORS aberto desnecessário.
- **LGPD:** coletar o mínimo necessário; política de privacidade + consentimento de cookies quando houver tracking;
  registrar decisões em [docs/INTEGRACOES.md](docs/INTEGRACOES.md).
- **Dependências:** preferir libs estáveis e mínimas; `npm audit` antes de entregar; sem libs abandonadas.
- **Acessibilidade & SEO** contam como boas práticas: HTML semântico, `alt` em imagens, metadata,
  Open Graph, `sitemap`/`robots`, JSON-LD (schema.org), Core Web Vitals saudáveis.

---

## Regras de desenvolvimento

- Tailwind utility-first; CSS custom só quando necessário.
- Mobile-first (375 → 768 → 1440). Componentização limpa, sem código morto.
- Sem comentários óbvios. Nomes claros, código que parece o resto do código.
- **Não inventar** conteúdo, oferta, preço, depoimento ou dado do cliente — tudo vem do briefing.
- Registrar decisões, fontes e erros corrigidos nas `docs/` — info crítica não pode se perder entre sessões.

---

## Stakeholders

| Pessoa | Papel |
|--------|-------|
| Pedro Moraes | Desenvolvedor / Lone Mídia |
| Cliente | A definir no briefing |
