"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Imagem de fundo do hero com parallax sutil no scroll (transform-only, 60fps).
 *  Art-direction: imagem dedicada no mobile (<picture> baixa só a versão certa).
 *  Sempre "overscan" (scale ≥ 1.1) p/ nunca abrir borda ao deslocar. */
export function HeroBackdrop() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 130]);
  const scale = useTransform(scrollY, [0, 700], [1.1, 1.22]);

  return (
    <motion.div
      className="absolute inset-0 -z-10 will-change-transform"
      style={reduce ? { scale: 1.1 } : { y, scale }}
    >
      <picture>
        <source media="(min-width: 768px)" srcSet="/hero/bg-hero-desk.png" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/bg-hero-mob.png"
          alt="Fundadores da Lone Mídia"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full translate-y-[15px] object-cover object-top md:translate-y-0"
        />
      </picture>
    </motion.div>
  );
}
