import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { Check } from "lucide-react";

const BULLETS = [
  "Análise dos seus anúncios, funil e comercial",
  "Diagnóstico 100% gratuito e sem compromisso",
  "Resposta de um especialista em até 48h",
];

export function LeadFormSection() {
  return (
    <Section id="diagnostico" bg="coal">
      <GlowBlob className="right-[-5%] top-[10%] h-[480px] w-[480px] opacity-20" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Lado esquerdo — argumento */}
          <Reveal className="lg:pt-6">
            <Eyebrow>Diagnóstico gratuito</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink">
              Descubra onde sua receita está vazando
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft sm:text-lg">
              Em até 48h, um especialista analisa seus anúncios, seu funil e seu
              comercial e te mostra exatamente o que mudar pra vender mais — sem
              discurso pronto. Se você fatura acima de R$ 100 mil/mês, agendamos
              uma conversa.
            </p>
            <ul className="mt-8 space-y-3">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-center gap-3 text-ink-soft">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 ring-1 ring-brand/30">
                    <Check className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Lado direito — formulário */}
          <Reveal delay={0.1}>
            <GlassCard hairline className="p-6 sm:p-8">
              <LeadForm />
            </GlassCard>
            <p className="mt-4 px-1 text-xs leading-relaxed text-ink-mute">
              Seus dados ficam só com a gente — não vendemos nem compartilhamos
              com terceiros. Tratamos tudo conforme a LGPD; veja nossa{" "}
              <Link
                href="/politica-de-privacidade"
                className="text-ink-soft underline underline-offset-2 hover:text-ink"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
