import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  crumb?: string;
}

export function PageHero({ eyebrow, title, description, crumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-950 pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_10%,rgba(204,155,47,0.18),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_0%_100%,rgba(74,119,164,0.25),transparent_60%)]"
      />
      <Container className="relative">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs font-medium text-white/50">
          <Link href="/" className="transition-colors hover:text-gold-300">
            Home
          </Link>
          <Icon name="chevronRight" className="h-3.5 w-3.5" />
          <span aria-current="page" className="text-gold-300">
            {crumb ?? title}
          </span>
        </nav>
        {eyebrow ? (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-gold-300">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight text-balance text-white sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-white/70 sm:text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}