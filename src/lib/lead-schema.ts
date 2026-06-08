import { z } from "zod";
import { SEGMENTOS, FATURAMENTO_VALUES } from "@/lib/content";

// Schema único — reusado no client (RHF) e revalidado no server (route handler).
export const leadSchema = z.object({
  nomeCompleto: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo")
    .max(120, "Nome muito longo"),
  whatsapp: z
    .string()
    .trim()
    .transform((s) => s.replace(/\D/g, ""))
    .pipe(z.string().regex(/^\d{10,11}$/, "WhatsApp inválido")),
  emailCorporativo: z
    .string()
    .trim()
    .toLowerCase()
    .max(180, "Email muito longo")
    .pipe(z.email("Email inválido")),
  empresa: z
    .string()
    .trim()
    .min(2, "Informe o nome da empresa")
    .max(120, "Nome muito longo"),
  segmento: z.enum(SEGMENTOS, { message: "Selecione um segmento" }),
  faturamento: z.enum(FATURAMENTO_VALUES, { message: "Selecione a faixa" }),
  maiorDesafio: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais sobre seu desafio")
    .max(1000, "Texto muito longo"),
  consentimentoLGPD: z
    .boolean()
    .refine((v) => v === true, "É necessário aceitar para continuar"),
});

export type LeadInput = z.infer<typeof leadSchema>;

// Metadados de atribuição (opcionais, não-PII sensível).
export const attributionSchema = z
  .object({
    utm_source: z.string().max(255).optional(),
    utm_medium: z.string().max(255).optional(),
    utm_campaign: z.string().max(255).optional(),
    utm_term: z.string().max(255).optional(),
    utm_content: z.string().max(255).optional(),
    gclid: z.string().max(255).optional(),
    fbclid: z.string().max(255).optional(),
    fbp: z.string().max(255).optional(),
    fbc: z.string().max(255).optional(),
    referrer: z.string().max(500).optional(),
    landingPath: z.string().max(255).optional(),
  })
  .partial();

export type Attribution = z.infer<typeof attributionSchema>;
