# Integrações & Segurança

> Captura de leads da landing. Toda mudança aqui respeita o baseline de segurança do [CLAUDE.md](../CLAUDE.md).
> Decisão de arquitetura: [adr/0002-captura-leads-n8n.md](adr/0002-captura-leads-n8n.md).

## Arquitetura (server-to-server, n8n nunca exposto ao browser)
```
Browser (LeadForm: RHF + Zod + Turnstile)
   └─ POST same-origin ─▶ Next.js Route Handler  /api/lead  (runtime = nodejs)
                              │  (Turnstile + honeypot + time-trap + rate-limit + Zod + classifica ICP + HMAC)
                              └─ POST assinado ─▶ n8n self-hosted (webhook)
                                                    ├─▶ Google Sheets (append)
                                                    ├─▶ WhatsApp (notifica time se ICP)
                                                    └─▶ Meta Conversions API (evento Lead, dedupe c/ Pixel)
```
**Por que o Route Handler no meio:** chamar o n8n direto do client exporia URL/secret do webhook, permitiria flood e burlaria o Turnstile/rate-limit. O Route Handler é o único ponto que fala com o n8n.

## Campos do formulário (schema único Zod — `src/lib/lead-schema.ts`, reusado client + server)
| Campo | Tipo | Validação (resumo) | Obrig. |
|---|---|---|---|
| nomeCompleto | text | `min(3).max(120)`, ≥2 palavras | ✅ |
| whatsapp | tel (máscara) | normaliza p/ dígitos → `regex ^\d{10,11}$`; deriva E.164 `+55…`; celular 3º díg=9 | ✅ |
| emailCorporativo | email | `email().max(180)`; domínios free/descartáveis **não bloqueiam**, marcam `emailPessoal=true` (degrada score) | ✅ |
| empresa | text | `min(2).max(120)` | ✅ |
| segmento | enum (select) | lista fechada (sem texto livre); opção "outro" → campo condicional | ✅ |
| **faturamentoMensal** | enum (faixas) | chave de qualificação ICP; **rótulo "Faturamento mensal"** (não "MRR") | ✅ |
| maiorDesafio | textarea | `min(10).max(1000)`, sanitizar (sem HTML) | ✅ |
| consentimentoLGPD | checkbox | `literal(true)`, **não pré-marcado**; grava `consentVersion`+`consentTimestamp` | ✅ |
| _gotcha (honeypot) | hidden | invisível; se preenchido → 200 falso + descarte | — |
| _ts (time-trap) | number | submit < 2.5s do render → bot → descarte silencioso | — |
| utm/atribuição | meta | utm_*, gclid, fbclid, _fbp, _fbc, referrer, landingPath (melhora match da CAPI) | — |
| turnstileToken | string | obrigatório; validado server-side via siteverify | ✅ |

## Fluxo do Route Handler `/api/lead` (POST)
1. Checar método POST + `content-type: application/json` + **Origin/Referer == domínio de produção** (anti-CSRF leve). Limitar body (~16KB).
2. Anti-spam **antes** de trabalho caro: honeypot/time-trap → 200 falso; rate-limit por IP; verificar Turnstile (siteverify).
3. `leadSchema.safeParse` → inválido = 422 com erros genéricos (sem stack/internals).
4. Normalizar + **classificar ICP** (`src/lib/icp.ts`) → `{icp, temperatura, score}`.
5. `idempotencyKey = sha256(email + '|' + whatsappE164 + '|' + dia-UTC)` (anti-duplicidade).
6. Montar payload → **HMAC-SHA256** do corpo cru (`X-Lone-Signature`) + `X-Lone-Timestamp`.
7. POST p/ `N8N_WEBHOOK_URL` com timeout (8s) + **retry backoff** (3×, só p/ rede/5xx/timeout).
8. Sucesso → 200 `{ok:true}` (client dispara Pixel `Lead`). Falha após retries → **fallback durável** (fila Upstash) + 200 `{ok:true, degraded:true}` (não perder o lead).

## Segurança do webhook n8n
- URL com path aleatório (UUID) em `N8N_WEBHOOK_URL` (env server, **nunca** `NEXT_PUBLIC_`).
- **HMAC + timestamp anti-replay:** 1º nó do n8n recalcula o HMAC sobre o body cru, compara em tempo constante, rejeita se diverge ou timestamp > 5min (401).
- **Idempotência:** nó checa se `id` já existe (coluna chave na Sheet/KV) antes de inserir/notificar.

## Fluxo interno n8n
`Webhook → Code(HMAC+idempotência) → Set(formata) →` **A)** Google Sheets (append aba "Leads") · **B)** `IF icp==true →` WhatsApp (Cloud API **ou** Evolution API) notifica o time · `ELSE →` tag "nurture" · **C)** HTTP → Meta CAPI (email/phone SHA256, fbp/fbc, `event_id=idempotencyKey`). `Error Trigger` global → alerta admin.

## Qualificação por ICP (`src/lib/icp.ts`) — corte de negócio: R$100k/mês
| Faixa | icp | temperatura | rota |
|---|---|---|---|
| até R$100k | ❌ | frio | **NURTURE** (não aciona WhatsApp do time) |
| R$100k–300k | ✅ | morno | fila normal de agendamento |
| R$300k–1mi | ✅ | quente | WhatsApp ao time |
| acima R$1mi | ✅ | quente | WhatsApp **prioritário** 🔥 |
- **Score 0–100** (desempate): faixa de faturamento (peso dominante) + email corporativo (+15) + desafio com intenção (+10) + atribuição paga (+10).
- Lead fora do ICP: site **agradece igual** (não revelar rejeição); entra em nutrição.

## Meta Pixel (`src/components/MetaPixel.tsx` + `src/lib/pixel.ts`)
- **PageView** via `next/script` `afterInteractive`, **só após consentimento** (Consent Mode: `revoke` → `grant`). `NEXT_PUBLIC_META_PIXEL_ID` (público; ID real a definir).
- **Lead** no callback de sucesso do POST (nunca antes): `fbq('track','Lead',{currency:'BRL',content_name:'Diagnostico Gratuito'},{eventID: idempotencyKey})`.
- **CAPI** no n8n (branch C) com `event_id` = mesma `idempotencyKey` → **dedupe** Pixel+CAPI. Token CAPI **só no n8n**.

## LGPD
- **Aviso reescrito** (o "100% seguros / não compartilhamos / política sob solicitação" atual é enganoso e ilegal): ver texto em [COPY.md](COPY.md#7-formulário).
- **Checkbox de consentimento** obrigatório, não pré-marcado, com link à política.
- **Base legal:** (a) procedimentos preliminares a contrato a pedido do titular (art. 7º, V) p/ o contato do diagnóstico; (b) **consentimento** (art. 7º, I) só p/ tracking (Pixel/CAPI), revogável via banner. O lead é contatado mesmo sem consentir analytics; Pixel/CAPI só com consentimento.
- **Prova de consentimento:** gravar versão + timestamp + IP (hash/trunc) + UA (trunc).
- **Minimização:** faixa de faturamento (não valor exato); sem CPF/CNPJ no form.
- **Página `/politica-de-privacidade`** (pública, no form e no footer): controlador + DPO, finalidades, bases legais, operadores (Google/Meta/n8n), direitos, retenção (12–24 meses, confirmar), transferência internacional (EUA). **Deve existir antes do go-live.**
- **ConsentBanner** obrigatório (cookies `_fbp/_fbc`): opt-in p/ tracking; necessários dispensam consentimento.

## Headers de segurança (`next.config.ts`)
- **CSP** (idealmente com nonce em vez de `unsafe-inline`): `script-src 'self' https://connect.facebook.net https://challenges.cloudflare.com`; `connect-src 'self' https://www.facebook.com https://challenges.cloudflare.com`; `frame-src https://challenges.cloudflare.com`; `frame-ancestors 'none'`; `form-action 'self'`; `base-uri 'self'`; `upgrade-insecure-requests`.
- `Strict-Transport-Security` (HSTS preload), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

## Variáveis de ambiente
| Público (`NEXT_PUBLIC_`) | Server-only (env Vercel / `.env.local` no .gitignore) | Só no n8n |
|---|---|---|
| `META_PIXEL_ID`, `TURNSTILE_SITE_KEY`, `WHATSAPP_NUMBER` (contato) | `N8N_WEBHOOK_URL`, `N8N_WEBHOOK_SECRET`, `TURNSTILE_SECRET_KEY`, `UPSTASH_REDIS_*` | Meta CAPI token, WhatsApp API token, Google service account |
- Validar presença das envs no boot (`env.ts` com Zod) — falhar cedo.

## Dependências sugeridas
`zod`, `react-hook-form`, `@hookform/resolvers`, `@upstash/ratelimit`, `@upstash/redis`, `react-turnstile` (ou script oficial). `npm audit` antes do deploy.

## Pendências (ver OPEN-QUESTIONS)
n8n base URL + secret · ID da planilha Google · método WhatsApp (Cloud API vs Evolution) + número de origem · Meta Pixel ID (+ usar CAPI?) · opções exatas de segmento · limites exatos das faixas de faturamento · dados do controlador/DPO p/ a política · prazo de retenção.
