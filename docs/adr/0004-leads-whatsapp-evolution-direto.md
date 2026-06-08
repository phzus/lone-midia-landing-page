# 0004 — Entrega de leads direto no WhatsApp via Evolution API

**Status:** Aceito
**Data:** 2026-06-08
**Relaciona:** complementa [0002](0002-captura-leads-n8n.md) (n8n passa de obrigatório a opcional).

## Contexto
O ADR 0002 desenhou o n8n self-hosted como hub de distribuição (Sheets + WhatsApp + CAPI). Na prática o n8n
**ainda não está configurado**, então todo lead submetido caía só em `console.warn` e **se perdia** (a env
`N8N_WEBHOOK_URL` estava ausente). O cliente (Pedro) decidiu o caminho mais curto para começar a receber leads
**hoje**: notificação direta no WhatsApp comercial, sem depender do n8n.

A Lone já tem uma **Evolution API** (Baileys) self-hosted na VPS em `https://evo.lonemidia.com`, com a instância
`agent-prospec` conectada ao número **5522981816966** ("Comercia - Lone Midia", status `open`).

## Decisão
O Route Handler `/api/lead` passa a chamar **`forwardToWhatsApp`** ([src/lib/evolution.ts](../../src/lib/evolution.ts)),
que faz `POST {EVOLUTION_API_URL}/message/sendText/{EVOLUTION_INSTANCE}` (header `apikey`, body `{number, text}`)
com a notificação do lead já formatada e qualificada por ICP. Destino: **5522981530700** (+55 22 98153-0700).

- WhatsApp e n8n rodam **em paralelo** (`Promise.all`); o n8n continua suportado mas **opcional** (só dispara se
  `N8N_WEBHOOK_URL` existir). O lead só é marcado `degraded` se **nenhum** destino confirmar entrega.
- Toda a camada anti-abuso do 0002 é preservada (origin check, honeypot, time-trap, rate-limit, Turnstile, Zod, ICP).
- Retry com backoff (3×) + timeout 8s no envio à Evolution; falha não derruba a resposta ao usuário.

## Consequências
- Leads passam a ser entregues sem depender do n8n → resolve a pendência "método WhatsApp" do 0002.
- Credenciais da Evolution (`EVOLUTION_API_KEY` = token da instância) são **server-only**, nunca no client.
- Persistência durável: **resolvida no [ADR 0005](0005-registro-leads-google-sheets-apps-script.md)** (registro no
  Google Sheets via Apps Script, em paralelo ao WhatsApp). CAPI/fila Upstash seguem como melhoria futura.
- A instância usa Baileys (WhatsApp não-oficial): risco de desconexão/bloqueio inerente; monitorar `connectionStatus`.

## Variáveis de ambiente (novas)
`EVOLUTION_API_URL`, `EVOLUTION_INSTANCE`, `EVOLUTION_API_KEY`, `LEAD_WHATSAPP_TO` — todas server-only
(env Vercel / `.env.local`). Cadastrar na Vercel antes do deploy.
