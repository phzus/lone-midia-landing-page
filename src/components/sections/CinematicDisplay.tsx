import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Reveal } from "@/components/ui/Reveal";
import { CinematicHeadline } from "./CinematicHeadline";

/** Momento cinematográfico: tipografia display gigante + glow + parallax no scroll. */
export function CinematicDisplay() {
  return (
    <Section bg="void" className="vignette py-28 sm:py-36">
      <GlowBlob breathe className="left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-25" />
      <Container className="relative text-center">
        <Reveal>
          <p className="eyebrow mb-6 justify-center text-center">
            Tráfego que vira caixa — não vaidade
          </p>
        </Reveal>
        <CinematicHeadline lines={["Escala", "Previsível"]} />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
            Você aumenta o investimento sabendo quanto retorna. Crescer deixa de
            ser aposta e vira processo.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
