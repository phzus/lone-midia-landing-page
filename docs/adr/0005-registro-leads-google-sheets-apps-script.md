# 0005 — Registro durável de leads no Google Sheets via Apps Script

**Status:** Aceito
**Data:** 2026-06-08
**Relaciona:** complementa [0004](0004-leads-whatsapp-evolution-direto.md) (resolve a pendência de persistência durável).

## Contexto
O ADR 0004 passou a notificar leads no WhatsApp, mas deixou explícito que **não havia persistência durável**: se a
Evolution caísse, o lead não ficava registrado. O cliente (Pedro) já tinha uma **planilha Google** com um **Apps
Script Web App** pronto (`doPost` que lê `e.parameter` e dá append na aba "Leads"). Decidimos usá-lo como registro
durável, em paralelo ao WhatsApp.

## Decisão
O Route Handler `/api/lead` passa a chamar também **`forwardToSheets`** ([src/lib/sheets.ts](../../src/lib/sheets.ts)),
que faz `POST {SHEETS_WEBAPP_URL}` em **`application/x-www-form-urlencoded`** (o Apps Script lê `e.parameter`, não
JSON). Mapeamento landing → chaves do script:

| Coluna da planilha | Chave enviada | Origem |
|---|---|---|
| Nome completo | `nome` | `lead.nomeCompleto` |
| WhatsApp | `whatsapp` | `lead.whatsappE164` (script normaliza p/ dígitos) |
| Email corporativo | `email` | `lead.emailCorporativo` |
| Empresa | `empresa` | `lead.empresa` |
| Segmento | `segmento` | `lead.segmento` |
| Receita Mensal (MRR) | `mrr` | rótulo legível da faixa de faturamento |
| Maior desafio | `desafio` | `lead.maiorDesafio` |
| Timestamp | — | gerado pelo próprio Apps Script (TZ America/Sao_Paulo) |

WhatsApp + Sheets + n8n (opcional) rodam em paralelo (`Promise.all`); `degraded` só se **nenhum** confirmar entrega.

## Consequências
- Persistência durável garantida pela planilha (resolve a pendência do 0004). WhatsApp continua para notificação rápida.
- `SHEETS_WEBAPP_URL` é server-only (env Vercel / `.env.local`). O Web App está implantado como "qualquer pessoa";
  a URL `/exec` é o segredo de acesso — não expor no client (por isso fica server-side).
- **Limitação:** o Apps Script captura erros internos e responde **HTTP 200** mesmo em falha, então o app só confirma
  "entregue ao Web App", não "linha realmente gravada". Aceitável dado que o WhatsApp é a notificação primária.
- O código do `doPost` vive na planilha (fora do repo). Mudança de colunas/IDs exige ajustar o mapeamento em `sheets.ts`.
- Sem ICP/score/UTM na planilha (o script só tem 8 colunas fixas) — essa qualificação vai na mensagem do WhatsApp.
