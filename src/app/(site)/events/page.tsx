import type { Metadata } from "next";
import Link from "next/link";
import { getEvents } from "@/lib/data/content";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { CoverImage } from "@/components/ui/cover-image";
import { Icon } from "@/components/ui/icon";
import { FinalCta } from "@/components/home/final-cta";
import { formatEventDate, sortByDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events at Place of Favour — conventions, outreach, conferences and special programmes.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHero
        eyebrow="Mark Your Calendar"
        title="Upcoming events"
        description="Come and be part of what God is doing. Events are manageable from the admin dashboard."
        crumb="Events"
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortByDate(events).map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group overflow-hidden rounded-2xl border border-brand-950/[0.06] bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative">
                  <CoverImage
                    src={event.image}
                    alt={`${event.title} — event artwork`}
                    className="aspect-[16/10]"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-gold-400 px-3 py-1.5 text-xs font-bold text-brand-950 shadow-gold">
                    {formatEventDate(event.date)}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-semibold text-brand-950 group-hover:text-gold-700 transition-colors">
                    {event.title}
                  </h2>
                  <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="clock" className="h-4 w-4 text-gold-600" />
                      {event.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="mapPin" className="h-4 w-4 text-gold-600" />
                      {event.location}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}