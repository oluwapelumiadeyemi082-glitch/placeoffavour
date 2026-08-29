import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface VerseBandProps {
  className?: string;
  verse?: string;
  reference?: string;
  tone?: "light" | "dark";
}

export function VerseBand({
  className,
  verse,
  reference,
  tone = "dark",
}: VerseBandProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-14 sm:py-16",
        tone === "dark"
          ? "bg-brand-900/40"
          : "bg-brand-950",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(204,155,47,0.16),transparent_60%)]"
      />
      <Container className="relative text-center">
        <span
          aria-hidden="true"
          className="font-display text-6xl leading-none text-gold-400/40 sm:text-7xl"
        >
          “
        </span>
        <blockquote className="mx-auto -mt-4 max-w-3xl">
          <p
            className={cn(
              "font-display text-2xl font-medium leading-snug text-balance sm:text-3xl",
              tone === "dark" ? "text-brand-950" : "text-white",
            )}
          >
            {verse ?? "Thy word is a lamp unto my feet, and a light unto my path."}
          </p>
          <footer
            className={cn(
              "mt-4 text-xs font-bold uppercase tracking-[0.28em]",
              tone === "dark" ? "text-gold-700" : "text-gold-300",
            )}
          >
            {reference ?? "Psalm 119:105"}
          </footer>
        </blockquote>
      </Container>
    </section>
  );
}