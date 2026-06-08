"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { leadSchema, type Attribution } from "@/lib/lead-schema";
import { SEGMENTOS, FATURAMENTO_FAIXAS } from "@/lib/content";
import { trackLead } from "@/lib/pixel";
import { cn } from "@/lib/cn";

type FormValues = z.input<typeof leadSchema>;

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-ink placeholder:text-ink-mute/70 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30";
const labelCls = "mb-1.5 block text-sm font-semibold text-ink";
const errCls = "mt-1 text-xs text-strike";

function maskPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7, 11)}`;
}

export function LeadForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { consentimentoLGPD: false },
    mode: "onTouched",
  });

  const [done, setDone] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const renderedAt = useRef<number>(0);
  const attribution = useRef<Attribution>({});
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    renderedAt.current = Date.now();
    const p = new URLSearchParams(window.location.search);
    const get = (k: string) => p.get(k) ?? undefined;
    const cookie = (n: string) =>
      document.cookie
        .split("; ")
        .find((c) => c.startsWith(`${n}=`))
        ?.split("=")[1];
    attribution.current = {
      utm_source: get("utm_source"),
      utm_medium: get("utm_medium"),
      utm_campaign: get("utm_campaign"),
      utm_term: get("utm_term"),
      utm_content: get("utm_content"),
      gclid: get("gclid"),
      fbclid: get("fbclid"),
      fbp: cookie("_fbp"),
      fbc: cookie("_fbc"),
      referrer: document.referrer || undefined,
      landingPath: window.location.pathname,
    };
  }, []);

  const onSubmit = async (data: FormValues) => {
    setFormError(null);
    if (siteKey && !token) {
      setFormError("Confirme que você não é um robô.");
      return;
    }
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          _gotcha: "",
          _ts: renderedAt.current,
          turnstileToken: token,
          attribution: attribution.current,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        id?: string;
        error?: string;
        fields?: Record<string, string>;
      };

      if (res.ok && json.ok) {
        trackLead(json.id ?? "lead", data.segmento);
        setDone(true);
        return;
      }
      if (res.status === 422 && json.fields) {
        for (const [key, message] of Object.entries(json.fields)) {
          setError(key as keyof FormValues, { message });
        }
        return;
      }
      if (res.status === 429) {
        setFormError("Muitas tentativas. Tente novamente em alguns minutos.");
        return;
      }
      setFormError("Não foi possível enviar agora. Tente novamente.");
    } catch {
      setFormError("Falha de conexão. Verifique sua internet e tente de novo.");
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-success/30 bg-success/5 px-6 py-14 text-center">
        <CheckCircle2 className="h-14 w-14 text-success" aria-hidden="true" />
        <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">
          Recebemos seu pedido!
        </h3>
        <p className="mt-3 max-w-sm text-ink-soft">
          Um especialista vai analisar seu cenário e te chamar em até 48h pelo
          WhatsApp. Fica de olho.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot — invisível para humanos */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label>
          Não preencha
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            name="website"
          />
        </label>
      </div>

      <div>
        <label htmlFor="nomeCompleto" className={labelCls}>
          Nome completo *
        </label>
        <input
          id="nomeCompleto"
          autoComplete="name"
          placeholder="Como podemos te chamar?"
          className={cn(inputCls, errors.nomeCompleto && "border-strike/60")}
          {...register("nomeCompleto")}
        />
        {errors.nomeCompleto && (
          <p className={errCls}>{errors.nomeCompleto.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="whatsapp" className={labelCls}>
            WhatsApp *
          </label>
          <input
            id="whatsapp"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(99) 9 9999-9999"
            className={cn(inputCls, errors.whatsapp && "border-strike/60")}
            {...register("whatsapp", {
              onChange: (e) => {
                e.target.value = maskPhone(e.target.value);
              },
            })}
          />
          {errors.whatsapp && (
            <p className={errCls}>{errors.whatsapp.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="empresa" className={labelCls}>
            Empresa *
          </label>
          <input
            id="empresa"
            autoComplete="organization"
            placeholder="Nome da sua empresa"
            className={cn(inputCls, errors.empresa && "border-strike/60")}
            {...register("empresa")}
          />
          {errors.empresa && <p className={errCls}>{errors.empresa.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="emailCorporativo" className={labelCls}>
          Email corporativo *
        </label>
        <input
          id="emailCorporativo"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="voce@suaempresa.com.br"
          className={cn(inputCls, errors.emailCorporativo && "border-strike/60")}
          {...register("emailCorporativo")}
        />
        {errors.emailCorporativo && (
          <p className={errCls}>{errors.emailCorporativo.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="segmento" className={labelCls}>
            Qual o seu segmento? *
          </label>
          <select
            id="segmento"
            defaultValue=""
            className={cn(inputCls, errors.segmento && "border-strike/60")}
            {...register("segmento")}
          >
            <option value="" disabled>
              Seu mercado de atuação
            </option>
            {SEGMENTOS.map((s) => (
              <option key={s} value={s} className="bg-coal">
                {s}
              </option>
            ))}
          </select>
          {errors.segmento && (
            <p className={errCls}>{errors.segmento.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="faturamento" className={labelCls}>
            Faturamento mensal *
          </label>
          <select
            id="faturamento"
            defaultValue=""
            className={cn(inputCls, errors.faturamento && "border-strike/60")}
            {...register("faturamento")}
          >
            <option value="" disabled>
              Selecione a faixa
            </option>
            {FATURAMENTO_FAIXAS.map((f) => (
              <option key={f.value} value={f.value} className="bg-coal">
                {f.label}
              </option>
            ))}
          </select>
          {errors.faturamento && (
            <p className={errCls}>{errors.faturamento.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="maiorDesafio" className={labelCls}>
          Qual é o seu maior desafio hoje? *
        </label>
        <textarea
          id="maiorDesafio"
          rows={3}
          placeholder="Ex.: leads chegam mas não fecham pelo WhatsApp"
          className={cn(inputCls, "resize-none", errors.maiorDesafio && "border-strike/60")}
          {...register("maiorDesafio")}
        />
        {errors.maiorDesafio && (
          <p className={errCls}>{errors.maiorDesafio.message}</p>
        )}
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 accent-brand"
          {...register("consentimentoLGPD")}
        />
        <span>
          Li e concordo com a{" "}
          <Link
            href="/politica-de-privacidade"
            target="_blank"
            className="text-brand underline underline-offset-2"
          >
            Política de Privacidade
          </Link>{" "}
          e autorizo o contato da Lone Mídia por WhatsApp, e-mail e telefone
          sobre este diagnóstico.
        </span>
      </label>
      {errors.consentimentoLGPD && (
        <p className={errCls}>{errors.consentimentoLGPD.message}</p>
      )}

      {siteKey && (
        <Turnstile
          siteKey={siteKey}
          onSuccess={setToken}
          onExpire={() => setToken(null)}
          options={{ theme: "dark" }}
        />
      )}

      {formError && (
        <p className="rounded-lg border border-strike/30 bg-strike/10 px-4 py-2.5 text-sm text-strike">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border-b-2 border-brand-deep bg-linear-to-b from-brand-hi to-brand px-7 py-4 text-base font-semibold text-white shadow-[0_8px_30px_-4px_rgba(0,64,255,0.5)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-hi focus-visible:ring-offset-2 focus-visible:ring-offset-coal disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Enviando…
          </>
        ) : (
          "Agendar meu diagnóstico gratuito"
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-ink-mute">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
        Resposta em até 48h. Sem custo e sem compromisso.
      </p>
    </form>
  );
}
