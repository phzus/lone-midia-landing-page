import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { Quote, User } from "lucide-react";
import { TESTIMONIALS_PLACEHOLDER } from "@/lib/content";

export function Testimonials() {
  return (
    <Section id="resultados" bg="coal">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Resultados, não promessas</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink">
            O que muda quando tráfego e comercial param de brigar
          </h2>
          <p className="mt-4 text-sm text-ink-mute">
            {/* PLACEHOLDER honesto — depoimentos reais em finalização (ver docs/OPEN-QUESTIONS) */}
            Cases reais de clientes em finalização. Abaixo, a estrutura que vai
            no ar.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS_PLACEHOLDER.map((t, i) => (
            <StaggerItem key={i} className="h-full">
              <GlassCard hairline className="flex h-full flex-col p-6">
                <Quote className="h-7 w-7 text-brand" aria-hidden="true" />
                <p className="mt-4 font-display text-lg font-bold tracking-tight text-ink">
                  {t.result}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 ring-1 ring-brand/30">
                    <User className="h-5 w-5 text-ink-mute" aria-hidden="true" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-ink-mute">{t.role}</p>
                    <p className="text-xs text-brand">{t.handle}</p>
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
