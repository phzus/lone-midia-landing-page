import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  number,
  className,
}: {
  children: React.ReactNode;
  number?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {number && (
        <span className="font-display text-sm font-medium tracking-[0.18em] text-brand">
          {number}
        </span>
      )}
      <span className="eyebrow">{children}</span>
    </div>
  );
}
