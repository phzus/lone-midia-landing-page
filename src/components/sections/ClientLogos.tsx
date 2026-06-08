import Image from "next/image";

// Logos de clientes (PNG exportados do Figma). Renderizados como silhueta branca
// uniforme (brightness-0 invert) p/ consistência sobre fundo escuro — estilo otus.
const LOGOS = Array.from(
  { length: 12 },
  (_, i) => `/logos/${String(i + 1).padStart(2, "0")}.png`,
);

export function ClientLogos() {
  const items = [...LOGOS, ...LOGOS]; // duplicado p/ loop contínuo
  return (
    <div
      className="marquee mask-x w-full overflow-hidden"
      aria-label="Marcas que confiam na Lone Mídia"
    >
      <div
        className="marquee-track items-center gap-10 py-1 sm:gap-14"
        style={{ "--marquee-duration": "45s" } as React.CSSProperties}
      >
        {items.map((src, i) => (
          <div
            key={i}
            className="relative h-7 w-24 shrink-0 opacity-50 transition-opacity duration-300 hover:opacity-90 sm:h-8 sm:w-28"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="112px"
              className="object-contain brightness-0 invert"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
