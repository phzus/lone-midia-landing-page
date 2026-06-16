import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialCarousel } from "./TestimonialCarousel";

export function Testimonials() {
  return (
    <Section id="resultados" bg="coal">
      {/* Texto com o respiro lateral padrão (Container) */}
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Resultados, não promessas</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink">
            O que muda quando tráfego e comercial param de brigar
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            Quem aplicou o método Lone Growth contando, no próprio depoimento, o
            que mudou na operação.
          </p>
        </Reveal>
      </Container>

      {/* Carrossel full-bleed (sem Container) — sangra até a borda */}
      <Reveal delay={0.1} className="mt-12">
        <TestimonialCarousel />
      </Reveal>
    </Section>
  );
}
