"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Momento "scroll cinematográfico": a tipografia display gigante sobe e cresce
 *  conforme a seção atravessa a viewport (assinatura otus, traduzida pra Lone). */
export function CinematicHeadline({ lines }: { lines: [string, string] }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.03, 1.1]);

  const base =
    "block bg-linear-to-b from-ink to-ink/10 bg-clip-text text-transparent";

  return (
    <motion.h2
      ref={ref}
      data-cinematic
      className="font-display font-bold uppercase leading-[0.86] tracking-[-0.04em] will-change-transform"
      style={reduce ? undefined : { y, scale }}
    >
      <span className={`${base} text-[clamp(3rem,15vw,11rem)]`}>{lines[0]}</span>
      <span className={`${base} text-[clamp(2.75rem,13vw,10rem)]`}>
        {lines[1]}
      </span>
    </motion.h2>
  );
}
