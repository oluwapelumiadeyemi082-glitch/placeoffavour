import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "font-display text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl",
          tone === "light" ? "text-brand-950" : "text-white",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-pretty",
            tone === "light" ? "text-ink-500" : "text-white/70",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}