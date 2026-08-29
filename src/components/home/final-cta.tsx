import { homeContent } from "@/lib/content/home";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function FinalCta() {
  const { finalCta } = homeContent;
  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 text-white sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_50%_-10%,rgba(204,155,47,0.25),transparent_60%)]"
      />
      <Container className="relative flex flex-col items-center text-center">
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold-300/30 bg-gold-300/10 text-gold-300">
          <Icon name="sparkles" className="h-6 w-6" />
        </span>
        <h2 className="font-display max-w-2xl text-3xl font-medium leading-tight tracking-tight text-balance sm:text-5xl">
          {finalCta.title}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-white/70 sm:text-lg">
          {finalCta.paragraph}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href={finalCta.primary.href} size="lg">
            {finalCta.primary.label}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Button>
          <Button href={finalCta.secondary.href} size="lg" variant="ghostLight" icon={<Icon name="heart" className="h-4 w-4" />}>
            {finalCta.secondary.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}