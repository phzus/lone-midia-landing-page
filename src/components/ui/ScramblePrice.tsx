"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Conjunto embaralhado: só números + caracteres especiais (sem letras). */
const CHARSET = "0123456789#%&*?!/+=$@";

const randomChar = () => CHARSET[Math.floor(Math.random() * CHARSET.length)];

/** Posições marcadas com `#` no template giram p/ sempre; o resto é literal. */
const scramble = (template: string) =>
  Array.from(template, (ch) => (ch === "#" ? randomChar() : ch));

const placeholder = (template: string) =>
  Array.from(template, (ch) => (ch === "#" ? "?" : ch));

type Props = {
  /** `#` = caractere que gira; qualquer outro caractere é mantido (ex.: "R$ ##,##"). */
  template?: string;
  /** Intervalo entre trocas, em ms. */
  intervalMs?: number;
  /** Texto real lido por leitores de tela (o efeito visual fica oculto p/ a11y). */
  srLabel?: string;
  className?: string;
};

/** Preço "secreto" que embaralha números e caracteres especiais sem nunca parar —
 *  o valor real é revelado só no diagnóstico. Respeita `prefers-reduced-motion`. */
export function ScramblePrice({
  template = "R$ ##,##",
  intervalMs = 110,
  srLabel,
  className,
}: Props) {
  const reduce = useReducedMotion();
  // SSR/primeiro paint determinístico ("?") → sem mismatch de hidratação.
  const [chars, setChars] = useState(() => placeholder(template));

  useEffect(() => {
    if (reduce) {
      setChars(placeholder(template));
      return;
    }
    setChars(scramble(template));
    const id = setInterval(() => setChars(scramble(template)), intervalMs);
    return () => clearInterval(id);
  }, [template, intervalMs, reduce]);

  return (
    <span className={className}>
      {srLabel ? <span className="sr-only">{srLabel}</span> : null}
      <span aria-hidden="true" suppressHydrationWarning>
        {chars.map((c, i) =>
          template[i] === "#" ? (
            <span key={i} className="inline-block w-[0.64em] text-center tabular-nums">
              {c}
            </span>
          ) : (
            <span key={i}>{c}</span>
          ),
        )}
      </span>
    </span>
  );
}
