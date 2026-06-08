import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { PILLARS } from "@/lib/content";

export function LoneGrowth() {
  return (
    <Section id="metodologia" bg="coal">
      <GlowBlob className="right-[-10%] top-[-5%] h-[460px] w-[460px] opacity-15" />
      <Container className="relative">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>O método Lone Growth</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink">
              A metodologia que transforma seu marketing de centro de custo em{" "}
              <span className="text-brand">máquina de vendas previsível</span>.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                Seu concorrente impulsiona post e reza pra dar venda. A Lone faz
                o contrário: cada anúncio entra com objetivo de receita, e cada
                lead que clica cai num comercial organizado que sabe exatamente
                o que falar. Tráfego pago e vendas deixam de ser duas áreas que
                se culpam e viram um sistema só.
              </p>
              <p>
                Funis que dão lucro, copy escrita com intenção e automação que
                responde o lead antes do concorrente. São{" "}
                <strong className="font-semibold text-ink">
                  métricas que mostram lucro, não vaidade
                </strong>{" "}
                — é assim que o digital para de queimar verba e começa a
                entregar caixa todo mês.
              </p>
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <StaggerItem key={p.n} className="h-full">
              <GlassCard hover hairline className="h-full p-6">
                <div className="flex items-center justify-between">
                  <Image
                    src={`/icons/pilar-${p.n}.svg`}
                    alt=""
                    width={52}
                    height={52}
                    unoptimized
                    className="rounded-xl"
                  />
                  <span className="font-display text-2xl font-bold tracking-tight text-ink-mute">
                    {p.n}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {p.desc}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-16 max-w-2xl text-center font-display text-2xl font-light italic tracking-tight text-ink-soft sm:text-3xl">
            Cada anúncio tem um propósito. Cada palavra, uma função.
          </p>
          <div className="mt-10 flex justify-center">
            <Button href="#diagnostico" variant="primary" size="lg">
              Quero aplicar o Lone Growth na minha empresa
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
