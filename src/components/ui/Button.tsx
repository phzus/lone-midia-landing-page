import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-hi focus-visible:ring-offset-2 focus-visible:ring-offset-night disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "btn-sheen text-white bg-linear-to-b from-brand-hi to-brand border-b-2 border-brand-deep shadow-[0_8px_30px_-4px_rgba(0,64,255,0.5)] hover:shadow-[0_10px_38px_-2px_rgba(0,64,255,0.65)] hover:brightness-110",
  ghost:
    "text-ink border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/25",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;

type AsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if (props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props as AsLink;
    const extraProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <a href={href} className={classes} {...extraProps} {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as AsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
