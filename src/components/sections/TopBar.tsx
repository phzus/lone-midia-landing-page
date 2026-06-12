"use client";

import { useEffect, useRef } from "react";
import { Lock } from "lucide-react";
import { ICP_BANNER } from "@/lib/content";

/** Faixa-topo de qualificação ICP — único bloco 100% azul da página.
 *  Mede a própria altura em `--announce-h` p/ o hero ocupar 100vh − faixa. */
export function TopBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () =>
      document.documentElement.style.setProperty(
        "--announce-h",
        `${el.offsetHeight}px`,
      );
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-40 bg-brand text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center">
        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] sm:text-xs">
          {ICP_BANNER}
        </p>
      </div>
    </div>
  );
}
