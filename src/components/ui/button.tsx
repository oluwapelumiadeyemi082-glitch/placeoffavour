import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "light" | "ghostLight";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold-400 text-brand-950 shadow-gold hover:bg-gold-300 focus-visible:outline-gold-500",
  dark: "bg-brand-900 text-white shadow-soft hover:bg-brand-800",
  outline:
    "border border-brand-900/20 bg-transparent text-brand-900 hover:border-brand-900/50 hover:bg-brand-900/[0.04]",
  light: "bg-white text-brand-900 shadow-soft hover:bg-cream-100",
  ghostLight: "border border-white/25 text-white/90 hover:bg-white/10 hover:text-white",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-[0.95rem]",
};

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  icon,
  iconRight,
  disabled,
  onClick,
  target,
  rel,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200",
    "hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        prefetch={false}
      >
        {icon}
        {children}
        {iconRight}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}