import { cn } from "@/lib/cn";

type Bg = "night" | "coal" | "void";

const bgMap: Record<Bg, string> = {
  night: "bg-night",
  coal: "bg-coal",
  void: "bg-void",
};

export function Section({
  id,
  bg = "night",
  overflow = "hidden",
  className,
  children,
}: {
  id?: string;
  bg?: Bg;
  /** "visible" deixa o glow vazar p/ fora da seção (e a eleva acima da vizinha). */
  overflow?: "hidden" | "visible";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 sm:py-28 lg:py-32",
        overflow === "visible"
          ? "z-10 overflow-x-clip overflow-y-visible"
          : "overflow-hidden",
        bgMap[bg],
        className,
      )}
    >
      {children}
    </section>
  );
}
