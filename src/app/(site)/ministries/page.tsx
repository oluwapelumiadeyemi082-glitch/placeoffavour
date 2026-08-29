import type { Metadata } from "next";
import { getMinistries } from "@/lib/data/content";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { CoverImage } from "@/components/ui/cover-image";
import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Explore the ministries at Place of Favour — men, women, youth, children, choir, evangelism, welfare, media and ushering.",
};

export default async function MinistriesPage() {
  const ministries = await getMinistries();

  return (
    <>
      <PageHero
        eyebrow="Ways to Serve"
        title="Ministries"
        description="There is a place for you. Find a ministry where your gifts can flourish and lives can be touched."
        crumb="Ministries"
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Serve & grow"
            title="Find your place in the family"
            description="Every ministry below is led, taught and open to new members."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ministries.map((ministry) => (
              <article
                key={ministry.id}
                className="group overflow-hidden rounded-2xl border border-brand-950/[0.06] bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative">
                  <CoverImage
                    src={ministry.image}
                    alt={`${ministry.name} ministry`}
                    className="aspect-[16/10]"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent" />
                  <h2 className="absolute inset-x-0 bottom-0 p-5 font-display text-xl font-semibold text-white">
                    {ministry.name}
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">
                    {ministry.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{ministry.description}</p>
                  <dl className="mt-5 space-y-2 border-t border-brand-950/[0.06] pt-4 text-sm text-ink-600">
                    {ministry.leader ? (
                      <div className="flex items-center gap-2.5">
                        <dt className="sr-only">Leader</dt>
                        <Icon name="users" className="h-4 w-4 shrink-0 text-gold-600" />
                        <dd>{ministry.leader}</dd>
                      </div>
                    ) : null}
                    {ministry.contact ? (
                      <div className="flex items-center gap-2.5">
                        <dt className="sr-only">Contact</dt>
                        <Icon name="mail" className="h-4 w-4 shrink-0 text-gold-600" />
                        <dd>{ministry.contact}</dd>
                      </div>
                    ) : null}
                  </dl>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-ink-500">
              Not sure where to serve? Come to church and ask any of our leaders — we will help you find your place.
            </p>
            <Button href="/contact" variant="dark" size="lg">
              Talk to Us
              <Icon name="arrowRight" className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}