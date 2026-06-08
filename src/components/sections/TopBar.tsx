import { Lock } from "lucide-react";
import { ICP_BANNER } from "@/lib/content";

/** Faixa-topo de qualificação ICP — único bloco 100% azul da página. */
export function TopBar() {
  return (
    <div className="relative z-40 bg-brand text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)]">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center">
        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] sm:text-xs">
          {ICP_BANNER}
        </p>
      </div>
    </div>
  );
}
