import type { Metadata } from "next";
import { getLeaders } from "@/lib/data/content";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { CoverImage } from "@/components/ui/cover-image";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the leadership of RCCG Place of Favour Area Headquarters — the pastors and workers shepherding the house.",
};

export default async function LeadershipPage() {
  const leaders = await getLeaders();

  return (
    <>
      <PageHero
        eyebrow="Servant Leaders"
        title="Our leadership"
        description="Godly men and women who serve the house with dedication, humility and love."
        crumb="Leadership"
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((leader) => (
              <article
                key={leader.id}
                className="group overflow-hidden rounded-2xl border border-brand-950/[0.06] bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative">
                  <CoverImage
                    src={leader.image}
                    alt={`Portrait of ${leader.name}`}
                    className="aspect-[4/5]"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/80 to-transparent p-5 pt-12" />
                  <h2 className="font-display text-lg font-semibold text-white">
                    {leader.name}
                  </h2>
                  <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.14em] text-gold-300">
                    {leader.position}
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-ink-500">{leader.bio}</p>
                  <div className="mt-5 flex items-center gap-2 border-t border-brand-950/[0.06] pt-4">
                    {(["facebook", "twitter"] as const).map((social) => (
                      <a
                        key={social}
                        href={leader.socials?.[social] ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${leader.name} on ${social}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-950/10 text-ink-500 transition-colors hover:border-gold-400 hover:text-gold-700"
                      >
                        <Icon name={social} className="h-3.5 w-3.5" />
                      </a>
                    ))}
                    <span className="ml-auto text-xs text-ink-400">Leadership team</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/contact" variant="dark" size="lg">
              Reach Our Office
              <Icon name="arrowRight" className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}