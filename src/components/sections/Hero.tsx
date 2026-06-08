import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { HeroBackdrop } from "./HeroBackdrop";
import { ClientLogos } from "./ClientLogos";
import { STATS } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[86vh] flex-col overflow-hidden bg-night"
    >
      {/* Imagem composta (fundadores + glow + gráfico) com parallax no scroll */}
      <HeroBackdrop />
      {/* Scrims p/ legibilidade do texto à esquerda */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-night via-night/85 to-night/20" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-night via-transparent to-night/60" />
      {/* Spotlight azul */}
      <GlowBlob breathe className="left-[-8%] top-[10%] h-[520px] w-[520px]" />

      <Container className="relative z-10 flex flex-1 flex-col justify-center pt-16 pb-10 sm:pt-20">
        <Stagger className="max-w-2xl">
          <StaggerItem>
            <h1 className="font-display text-[clamp(2.25rem,6vw,4.4rem)] font-bold leading-[1.03] tracking-[-0.03em]">
              <span className="block font-medium text-ink-soft">
                Receita{" "}
                <span className="bg-linear-to-r from-cyan to-brand-hi bg-clip-text font-bold text-transparent">
                  previsível
                </span>{" "}
                todo mês,
              </span>
              <span className="block text-ink">
                sem depender de sorte no anúncio.
              </span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Mais de 40 empresas já usam o método{" "}
              <strong className="font-semibold text-ink">Lone Growth</strong>{" "}
              pra parar de gastar com anúncio que não vende. Tráfego pago
              segmentado + comercial organizado, operando como uma engrenagem só.
            </p>
          </StaggerItem>

          <StaggerItem className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#diagnostico" variant="primary" size="lg">
              Quero meu diagnóstico gratuito
            </Button>
            <Button href="#metodologia" variant="ghost" size="lg">
              Ver como funciona
            </Button>
          </StaggerItem>
        </Stagger>

        {/* Stats */}
        <Stagger className="mt-14">
          <dl className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {STATS.map((s) => (
              <StaggerItem key={s.value} className="glass rounded-xl px-5 py-4">
                <dt className="font-display text-3xl font-bold tracking-tight text-ink">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-ink-mute">
                  {s.label}
                </dd>
              </StaggerItem>
            ))}
          </dl>
        </Stagger>
      </Container>

      {/* Faixa de logos */}
      <Container className="relative z-10 pb-10">
        <p className="eyebrow mb-4">Quem já confia na Lone Mídia</p>
        <ClientLogos />
      </Container>
    </section>
  );
}
