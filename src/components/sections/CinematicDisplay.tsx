import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Reveal } from "@/components/ui/Reveal";

/** Momento cinematográfico: tipografia display gigante + glow.
 *  data-cinematic marca o alvo p/ o parallax do GSAP (ver ScrollFx). */
export function CinematicDisplay() {
  return (
    <Section bg="void" className="vignette py-28 sm:py-36">
      <GlowBlob breathe className="left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-25" />
      <Container className="relative text-center">
        <Reveal>
          <p className="eyebrow mb-6 justify-center text-center">
            Tráfego que vira caixa — não vaidade
          </p>
          <h2
            data-cinematic
            className="font-display font-bold uppercase leading-[0.86] tracking-[-0.04em]"
          >
            <span className="block bg-linear-to-b from-ink to-ink/10 bg-clip-text text-[clamp(3rem,15vw,11rem)] text-transparent">
              Escala
            </span>
            <span className="block bg-linear-to-b from-ink to-ink/10 bg-clip-text text-[clamp(2.75rem,13vw,10rem)] text-transparent">
              Previsível
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
            Você aumenta o investimento sabendo quanto retorna. Crescer deixa de
            ser aposta e vira processo.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
