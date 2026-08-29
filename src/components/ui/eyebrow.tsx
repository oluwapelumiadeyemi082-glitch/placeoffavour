import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}

export function Eyebrow({ children, className, tone = "light" }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em]",
        tone === "light" ? "text-gold-600" : "text-gold-300",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8",
          tone === "light" ? "bg-gold-500/70" : "bg-gold-300/70",
        )}
      />
      {children}
    </span>
  );
}