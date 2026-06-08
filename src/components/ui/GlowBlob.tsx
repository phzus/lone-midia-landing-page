import { cn } from "@/lib/cn";

/** Glow azul ambiente (blob borrado). Decorativo — aria-hidden. */
export function GlowBlob({
  className,
  breathe = false,
}: {
  className?: string;
  breathe?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("glow-blob", breathe && "animate-breathe", className)}
    />
  );
}
