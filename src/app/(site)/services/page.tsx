import type { Metadata } from "next";
import { getServices } from "@/lib/data/content";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { CoverImage } from "@/components/ui/cover-image";
import { Icon } from "@/components/ui/icon";
import { PlanYourVisit } from "@/components/plan-your-visit";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Service Times",
  description:
    "Service times for Sunday School, Sunday worship, Bible study, prayer meetings and special services at Place of Favour.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Join Us"
        title="Service times"
        description="There is a place prepared for you in the presence of God. Come and encounter Him with us."
        crumb="Services"
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Weekly programmes"
            title="When we gather"
            description="All services and locations are manageable from the admin dashboard."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="group overflow-hidden rounded-2xl border border-brand-950/[0.06] bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative">
                  <CoverImage
                    src={service.image}
                    alt={`${service.title} at Place of Favour`}
                    className="aspect-[16/9]"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-gold-400 px-3 py-1.5 text-xs font-bold text-brand-950 shadow-gold">
                    {service.day}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-semibold text-brand-950">
                    {service.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{service.description}</p>
                  <dl className="mt-5 space-y-2 border-t border-brand-950/[0.06] pt-4 text-sm text-ink-600">
                    <div className="flex items-center gap-2.5">
                      <dt className="sr-only">Time</dt>
                      <Icon name="clock" className="h-4 w-4 shrink-0 text-gold-600" />
                      <dd>{service.time}</dd>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <dt className="sr-only">Location</dt>
                      <Icon name="mapPin" className="h-4 w-4 shrink-0 text-gold-600" />
                      <dd>{service.location}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <PlanYourVisit />
      <FinalCta />
    </>
  );
}