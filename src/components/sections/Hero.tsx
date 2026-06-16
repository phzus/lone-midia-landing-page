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
      className="relative isolate flex min-h-[calc(100svh-var(--announce-h))] flex-col overflow-hidden bg-night"
    >
      {/* Imagem de fundo (fundadores + glow + gráfico) com parallax no scroll */}
      <HeroBackdrop />
      {/* Spotlight azul */}
      <GlowBlob breathe className="left-[-8%] top-[10%] h-[520px] w-[520px]" />

      {/* Cards de resultado flutuando empilhados à direita (desktop) */}
      <div className="pointer-events-none absolute inset-y-0 right-6 z-10 hidden flex-col justify-end gap-4 pb-20 lg:flex xl:right-12">
        {STATS.slice(0, 2).map((s, i) => (
          <div
            key={s.value}
            className="flex max-w-sm items-center gap-2 rounded-2xl border border-white/10 px-3 py-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
            style={{
              WebkitBackdropFilter: "blur(8px)",
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(14,14,18,0.5)",
              backgroundImage:
                "linear-gradient(to left, rgba(45,91,255,0.2), transparent 70%)",
              transform: `translateX(${i % 2 === 0 ? 0 : -32}px)`,
            }}
          >
            <span className="font-display text-2xl font-bold tracking-tight text-ink xl:text-3xl">
              {s.value}
            </span>
            <span className="max-w-[24ch] text-xs leading-[1.2] text-[#d9d9d9]">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center pt-[90vw] pb-0 sm:pt-32 sm:pb-14">
        <Stagger className="max-w-2xl">
          <StaggerItem>
            <h1 className="max-w-lg font-display text-[clamp(2.6rem,4.6vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              <span className="block font-medium text-ink-soft">
                Receita{" "}
                <span className="bg-linear-to-r from-cyan to-brand-hi bg-clip-text font-bold text-transparent">
                  previsível
                </span>
                ,
              </span>
              <span className="block text-ink">
                sem depender de sorte no anúncio.
              </span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-6 md:w-lg text-sm leading-relaxed text-ink-soft sm:text-lg">
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

          {/* Faixa de logos — inline no desktop; no mobile vai p/ <MobileProof> */}
          <StaggerItem className="mt-10 hidden max-w-md lg:block">
            <ClientLogos />
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
