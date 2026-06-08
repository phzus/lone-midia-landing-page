# 0002 — Captura de leads via Route Handler + n8n (server-to-server)

**Status:** Aceito
**Data:** 2026-06-05

## Contexto
A landing precisa capturar e qualificar leads e distribuí-los para **planilha Google + WhatsApp**, usando o
**n8n self-hosted da byvot**, com Meta Pixel e conformidade LGPD. Foco do projeto: segurança e boas práticas.

## Opções consideradas
- **Form → n8n direto do browser:** simples, mas expõe URL/secret do webhook, permite flood e burla anti-spam. ❌
- **Form → Next.js Route Handler → n8n (assinado):** o servidor é o único a falar com o n8n; permite Turnstile,
  rate-limit, validação server-side, HMAC e idempotência. ✅
- **Server Action vs Route Handler:** Route Handler `/api/lead` (runtime nodejs) — precisa de `crypto` (HMAC) e
  controle fino de headers/erros; mais explícito que Server Action para um endpoint de integração.

## Decisão
Form (RHF + Zod + Turnstile) → **Route Handler `/api/lead` (nodejs)** que valida, classifica ICP, assina (HMAC-SHA256)
e faz POST idempotente ao webhook do n8n. O n8n distribui para Google Sheets + WhatsApp + Meta CAPI. Detalhes em
[../INTEGRACOES.md](../INTEGRACOES.md).

## Consequências
- Segredos (n8n secret/URL, CAPI/WhatsApp tokens, service account) nunca chegam ao client.
- Resiliência: retry + fallback durável (fila Upstash) → não perde lead quente se o n8n cair.
- Dedupe Pixel+CAPI via `event_id = idempotencyKey`.
- Custo: depende de Upstash (rate-limit/fila — free tier) e de um secret HMAC compartilhado com o n8n.
- Requer página pública de Política de Privacidade + ConsentBanner antes do go-live.
