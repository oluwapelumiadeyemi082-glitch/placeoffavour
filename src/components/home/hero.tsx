import { site } from "@/lib/site";
import { homeContent } from "@/lib/content/home";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/ui/cover-image";
import { Icon } from "@/components/ui/icon";

export function Hero() {
  const { hero } = homeContent;
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      <CoverImage
        src="/images/hero-silhouette.svg"
        alt="Worshippers silhouetted during an evening service at Place of Favour"
        className="absolute inset-0"
        sizes="100vw"
        priority
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-brand-950/85 via-brand-950/70 to-brand-950/90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_80%_5%,rgba(204,155,47,0.25),transparent_60%)]"
      />

      <Container className="relative grid grid-cols-1 items-center gap-12 py-24 sm:py-28 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-7">
          <p
            className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-gold-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-gold-200"
            style={{ animationDelay: "0ms" }}
          >
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            {hero.eyebrow} {site.name}
          </p>
          <h1
            className="animate-fade-up font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            {hero.title}
            <span className="mt-3 block text-gold-300">{hero.titleAccent}</span>
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/75 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {hero.welcome}
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Button href={hero.ctaPrimary.href} size="lg">
              {hero.ctaPrimary.label}
              <Icon name="arrowRight" className="h-4 w-4" />
            </Button>
            <Button href={hero.ctaSecondary.href} size="lg" variant="ghostLight" icon={<Icon name="play" className="h-4 w-4" />}>
              {hero.ctaSecondary.label}
            </Button>
          </div>
          <p
            className="animate-fade-up mt-8 flex items-center gap-2 text-sm text-white/55"
            style={{ animationDelay: "320ms" }}
          >
            <Icon name="clock" className="h-4 w-4 text-gold-400" />
            Join us in person this Sunday — doors open from 8:30 AM.
          </p>
        </div>

        <div
          className="animate-fade-up hidden flex-col gap-4 lg:col-span-5 lg:flex"
          style={{ animationDelay: "320ms" }}
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
                <Icon name="heart" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
                  This Sunday
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  Celebration Service · 10:00 AM
                </p>
              </div>
            </div>
            <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-white/65">
              Sunday School 8:30 AM · Midweek Bible Study Wed 6:30 PM · Holy
              Ghost Service First Friday
            </p>
          </div>
          <figure className="rounded-2xl border border-white/10 bg-brand-900/70 p-6 backdrop-blur-sm">
            <blockquote>
              <p className="font-display text-lg font-medium leading-snug text-white/90">
                “{hero.verse.text}”
              </p>
            </blockquote>
            <figcaption className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-gold-300">
              {hero.verse.reference}
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}