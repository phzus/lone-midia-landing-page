import { cn } from "@/lib/cn";

export function GlassCard({
  className,
  hover = false,
  hairline = false,
  children,
}: {
  className?: string;
  hover?: boolean;
  hairline?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "glass rounded-2xl",
        hover && "glass-hover",
        hairline && "hairline-top",
        className,
      )}
    >
      {children}
    </div>
  );
}
