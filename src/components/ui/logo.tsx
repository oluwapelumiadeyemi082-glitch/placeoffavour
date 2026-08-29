import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { mark: "h-9 w-9", title: "text-lg", sub: "text-[0.55rem]" },
  md: { mark: "h-10 w-10", title: "text-xl", sub: "text-[0.6rem]" },
  lg: { mark: "h-12 w-12", title: "text-2xl", sub: "text-[0.65rem]" },
};

/**
 * Placeholder crest mark for the church. Swap `markViewBox`/`markPath` with the
 * official church logo once provided — it is defined in one place.
 */
const Mark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} role="img" aria-label={`${site.name} crest`}>
    <defs>
      <linearGradient id="pof-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e6c66c" />
        <stop offset="55%" stopColor="#cc9b2f" />
        <stop offset="100%" stopColor="#8a5e1e" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" stroke="url(#pof-gold)" strokeWidth="1.5" fill="none" opacity="0.9" />
    <path
      d="M23.6 10.4c3.6 6.5 8.6 10.2 8.6 15.6a8.6 8.6 0 1 1-17.2 0c0-5.4 5-9.1 8.6-15.6z"
      fill="url(#pof-gold)"
    />
    <path
      d="M24 19.8c1.3 2.4 3.2 3.8 3.2 5.8a3.2 3.2 0 1 1-6.4 0c0-2 1.9-3.4 3.2-5.8z"
      fill="#0b1830"
    />
    <path d="M24 12v-4" stroke="url(#pof-gold)" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="24" cy="6" r="1.6" fill="url(#pof-gold)" />
  </svg>
);

export function Logo({ variant = "dark", size = "md", className }: LogoProps) {
  const s = sizes[size];
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Mark className={s.mark} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-semibold tracking-tight",
            s.title,
            variant === "dark" ? "text-brand-950" : "text-white",
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            "mt-1 font-bold uppercase tracking-[0.28em]",
            s.sub,
            variant === "dark" ? "text-gold-700" : "text-gold-300",
          )}
        >
          RCCG Area HQ
        </span>
      </span>
    </span>
  );
}