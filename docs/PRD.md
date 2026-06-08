# PRD — Landing Page Lone Mídia

> **Documento de handoff para o agente executor.** Fonte da verdade do escopo. Sempre ler junto:
> [DESIGN.md](DESIGN.md), [COPY.md](COPY.md), [INTEGRACOES.md](INTEGRACOES.md), [PROJETO.md](PROJETO.md),
> [BRIEFING-CLIENTE.md](BRIEFING-CLIENTE.md) e os ADRs. Itens `(a definir)` estão em [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md) —
> **não inventar**: implementar com placeholder claro e sinalizar.

## 1. Visão geral
- **Cliente:** Lone Mídia (agência — tráfego pago + assessoria de vendas). Método proprietário: **Lone Growth**.
- **Problema:** site anterior saiu do ar (sem backup) → reconstrução do zero.
- **Objetivo:** captar e **qualificar** leads via formulário; ICP → agendar reunião ("Diagnóstico Gratuito").
- **Ação principal de conversão:** envio do formulário de qualificação. CTA secundário: WhatsApp.

## 2. Público / ICP
- Donos/gestores de **empresas que faturam > R$100 mil/mês**. Awareness: Solution → Product Aware (comparando fornecedor).
- Qualificação no form por **segmento + faixa de faturamento + maior desafio**. Lógica de ICP em [INTEGRACOES.md](INTEGRACOES.md).

## 3. Escopo
- **1 landing single-page** (com âncoras) + **`/politica-de-privacidade`** (pública, LGPD).
- Estrutura (8 seções) e componentes: [PROJETO.md](PROJETO.md).
- Copy aprovada por seção: [COPY.md](COPY.md). Design/tokens/efeitos: [DESIGN.md](DESIGN.md).
- **Consolidar** a duplicação do bloco de método (hoje 2–3×) em UMA seção "Lone Growth 01–04".

## 4. Arquitetura técnica
- **Next.js (App Router) + TypeScript + Tailwind**, deploy **Vercel** (ADR 0001).
- Páginas = Server Components; `'use client'` só nas folhas interativas (form, pixel, motion).
- Fonte **Helvetica Now Display** via `next/font/local` (ver DESIGN.md).
- Imagens via `next/image` (WebP/AVIF; `priority` só no hero); logos em SVG.
- Motion: Framer Motion pontual, respeitando `prefers-reduced-motion`.

## 5. Captura de leads & integrações
- Form → **Route Handler `/api/lead` (nodejs)** → **n8n self-hosted** → **Google Sheets + WhatsApp + Meta CAPI** (ADR 0002).
- Especificação completa (schema, validação, anti-spam, HMAC, idempotência, retry/fallback, qualificação): [INTEGRACOES.md](INTEGRACOES.md).
- **Meta Pixel** (PageView + Lead) gated por consentimento; dedupe com CAPI via `event_id`.

## 6. Requisitos não-funcionais
- **Performance:** LCP < 2.5s, CLS < 0.1, INP < 200ms. Cuidado com `backdrop-blur`/blobs (ver DESIGN.md).
- **SEO:** metadata + Open Graph, `sitemap`/`robots`, JSON-LD (Organization/LocalBusiness), HTML semântico, headings corretos.
- **Acessibilidade:** contraste ≥ 4.5:1 (tokens já ajustados), foco visível, alt text, touch 44×44, cor nunca como único sinal.
- **Segurança:** baseline obrigatório do [CLAUDE.md](../CLAUDE.md) + spec de [INTEGRACOES.md](INTEGRACOES.md) (validação server-side, anti-spam, HMAC, headers/CSP, segredos só no server).
- **LGPD:** checkbox de consentimento + Política de Privacidade pública + ConsentBanner antes do go-live.

## 7. Critérios de aceite
- [ ] Todas as 8 seções implementadas conforme PROJETO/DESIGN/COPY; método consolidado; 4 pilares; typos corrigidos.
- [ ] Sem lorem ipsum no ar (depoimentos reais **ou** fallback de "resultados em números" aprovado).
- [ ] Formulário: validação client+server (Zod), máscara WhatsApp, anti-spam (honeypot+time-trap+rate-limit+Turnstile), envio ao n8n assinado (HMAC) e idempotente, estado de loading + sucesso/erro.
- [ ] Lead chega na planilha + (se ICP) dispara WhatsApp; Pixel `Lead` no sucesso; dedupe CAPI ok.
- [ ] Página `/politica-de-privacidade` publicada + ConsentBanner funcionando; aviso do form reescrito.
- [ ] Headers de segurança/CSP ativos; nenhum segredo no client; `npm audit` limpo.
- [ ] Core Web Vitals dentro das metas (mobile mid-range); responsivo 375/768/1440.
- [ ] SEO: metadata/OG/sitemap/robots/JSON-LD presentes.
- [ ] Nenhum dado inventado: placeholders sinalizados para preço, depoimentos, IDs/credenciais.

## 8. Fora de escopo (por ora)
- Blog/conteúdo dinâmico, área logada, CMS, multi-idioma, checkout/pagamento online.
- Automação de nutrição além do roteamento de tags no n8n (sequência de e-mail é responsabilidade do n8n/marketing).

## 9. Dependências / pré-requisitos (do cliente)
Ver [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md): preço da oferta, depoimentos reais, logos de clientes, arquivos da fonte
Helvetica Now Display (Drive), domínio/DNS, credenciais (n8n, Sheets, WhatsApp, Pixel), dados do controlador/DPO p/ a política.
