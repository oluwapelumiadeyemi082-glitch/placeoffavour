import Link from "next/link";
import type { ChurchEvent } from "@/types/content";
import { homeContent } from "@/lib/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { CoverImage } from "@/components/ui/cover-image";
import { Icon } from "@/components/ui/icon";
import { formatEventDate } from "@/lib/format";

export function UpcomingEvents({ events }: { events: ChurchEvent[] }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow={homeContent.eventsEyebrow}
          title={homeContent.eventsTitle}
          description="Be part of what God is doing among us — there is always something to look forward to."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const dateLabel = formatEventDate(event.date);
            return (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group overflow-hidden rounded-2xl border border-brand-950/[0.06] bg-cream-50 transition-shadow hover:shadow-lift"
              >
                <div className="relative">
                  <CoverImage
                    src={event.image}
                    alt={`${event.title} — event artwork`}
                    className="aspect-[16/10]"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1.5 text-xs font-bold text-brand-950 shadow-gold">
                    <Icon name="calendar" className="h-3.5 w-3.5" />
                    {dateLabel}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-brand-950 group-hover:text-gold-700 transition-colors">
                    {event.title}
                  </h3>
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
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={homeContent.eventsCta.href}
            className="inline-flex items-center gap-2 font-semibold text-gold-700 underline-offset-4 hover:underline"
          >
            {homeContent.eventsCta.label}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}