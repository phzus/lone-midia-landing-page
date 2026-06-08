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
  className,
  children,
}: {
  id?: string;
  bg?: Bg;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-24 sm:py-28 lg:py-32",
        bgMap[bg],
        className,
      )}
    >
      {children}
    </section>
  );
}
