"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Imagem de fundo do hero com parallax sutil no scroll (transform-only, 60fps).
 *  Sempre levemente "overscan" (scale ≥ 1.1) p/ nunca abrir borda ao deslocar. */
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
      <Image
        src="/hero/bg-hero-desk.png"
        alt="Fundadores da Lone Mídia"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_center]"
      />
    </motion.div>
  );
}
