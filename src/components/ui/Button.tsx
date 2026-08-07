import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outlineLight";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 disabled:opacity-60 disabled:pointer-events-none " +
  "whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-700 text-white hover:bg-navy-800 shadow-[0_1px_2px_rgb(20_32_58/0.10),0_10px_24px_-10px_rgb(37_69_154/0.55)] hover:shadow-[0_2px_4px_rgb(20_32_58/0.12),0_16px_32px_-12px_rgb(37_69_154/0.65)] hover:-translate-y-0.5",
  secondary:
    "bg-white text-navy-800 border border-sand-dark hover:border-navy-300 hover:bg-navy-50 hover:-translate-y-0.5 shadow-soft",
  ghost: "text-navy-700 hover:bg-navy-50",
  light:
    "bg-white text-navy-800 hover:bg-navy-50 shadow-[0_8px_28px_-10px_rgb(0_0_0/0.45)] hover:-translate-y-0.5",
  outlineLight:
    "border border-white/60 text-white hover:bg-white/12 hover:border-white backdrop-blur-sm",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-[0.9375rem] px-6 py-3",
  lg: "text-base px-8 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<ComponentProps<typeof Link>, "href">) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

/** Phone links get their own component so the tel: href is never mistyped. */
export function CallButton({
  phone,
  phoneHref,
  label,
  variant = "secondary",
  size = "md",
  className = "",
}: {
  phone: string;
  phoneHref: string;
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <a href={phoneHref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      <PhoneIcon className="size-4 shrink-0" />
      {label ?? phone}
    </a>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6.6 2.5a1.5 1.5 0 0 1 1.4.9l1.2 2.8a1.5 1.5 0 0 1-.35 1.7l-1.1 1a12.6 12.6 0 0 0 5.35 5.35l1-1.1a1.5 1.5 0 0 1 1.7-.35l2.8 1.2a1.5 1.5 0 0 1 .9 1.4v2.3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 2.5 4.7a2 2 0 0 1 2-2.2h2.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
