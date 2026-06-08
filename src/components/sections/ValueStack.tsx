import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "lucide-react";
import { VALUE_STACK, VALUE_STACK_TOTAL } from "@/lib/content";

const brl = (n: number) => `R$ ${n.toLocaleString("pt-BR")}`;

export function ValueStack() {
  return (
    <Section id="solucoes" bg="night">
      <GlowBlob className="bottom-[-10%] left-1/2 h-[520px] w-[520px] -translate-x-1/2 opacity-20" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">
            Suas primeiras 4 semanas com a Lone
          </Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink">
            Tudo o que entregamos antes mesmo de você ver o primeiro resultado de
            venda
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl">
          <GlassCard hairline className="p-6 sm:p-9">
            <ul className="divide-y divide-white/8">
              {VALUE_STACK.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-4 py-3.5"
                >
                  <span className="flex items-center gap-3 text-sm text-ink-soft sm:text-base">
                    <Check
                      className="h-5 w-5 shrink-0 text-success"
                      aria-hidden="true"
                    />
                    {item.label}
                  </span>
                  <span className="shrink-0 font-display text-sm font-bold text-strike line-through sm:text-base">
                    {brl(item.price)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-white/10 pt-7 text-center">
              <p className="text-base text-ink-soft">
                Valor real da entrega:{" "}
                <span className="font-display font-bold text-strike line-through">
                  {brl(VALUE_STACK_TOTAL)}
                </span>
              </p>
              <p className="mx-auto mt-5 max-w-lg font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
                O investimento é apresentado no seu diagnóstico gratuito.
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-mute">
                Cada empresa recebe um plano sob medida — o valor depende do seu
                cenário, e a gente mostra na conversa.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="#diagnostico" variant="primary" size="lg">
                  Quero meu diagnóstico gratuito
                </Button>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </Container>
    </Section>
  );
}
