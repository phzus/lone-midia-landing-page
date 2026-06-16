import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <Section bg="void" className="vignette py-24">
      <GlowBlob breathe className="left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 opacity-20" />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
            O mercado não espera. Seu concorrente também não.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-lg">
            Enquanto você decide, o lead que era seu está respondendo o anúncio
            de outro. Comece pelo diagnóstico — é gratuito e mostra exatamente
            onde sua receita está vazando.
          </p>
          <div className="mt-9 flex justify-center">
            <Button href="#diagnostico" variant="primary" size="lg">
              Quero meu diagnóstico gratuito
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
