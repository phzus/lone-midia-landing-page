import { Container } from "@/components/ui/Container";
import { ClientLogos } from "./ClientLogos";
import { STATS } from "@/lib/content";

/** Prova social no mobile (logos + cards de resultado), separada do hero p/ não
 *  esticar a foto de fundo. Só aparece < lg — no desktop isso vive dentro do hero. */
export function MobileProof() {
  return (
    <section className="bg-night lg:hidden">
      <Container className="py-12">
        <div className="max-w-md">
          <ClientLogos />
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {STATS.map((s) => (
            <div
              key={s.value}
              className="glass flex items-center gap-3 rounded-xl px-4 py-3"
            >
              <span className="font-display text-2xl font-bold tracking-tight text-ink">
                {s.value}
              </span>
              <span className="text-xs leading-[1.2] text-[#d9d9d9]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
