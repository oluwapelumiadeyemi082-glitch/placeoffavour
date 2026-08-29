import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllEventSlugs, getEventBySlug, getEvents } from "@/lib/data/content";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { CoverImage } from "@/components/ui/cover-image";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { formatEventDate } from "@/lib/format";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllEventSlugs();
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.description,
    openGraph: {
      type: "article",
      title: event.title,
      description: event.description,
      url: `${site.url}/events/${event.slug}`,
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const all = await getEvents();
  const others = all.filter((e) => e.slug !== slug).slice(0, 2);

  return (
    <article>
      <section className="relative overflow-hidden bg-brand-950 py-16 text-white sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_85%_0%,rgba(204,155,47,0.2),transparent_60%)]"
        />
        <Container className="relative">
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            <Icon name="calendar" className="h-4 w-4" />
            Event
          </p>
          <h1 className="font-display max-w-3xl text-3xl font-medium leading-tight tracking-tight text-balance sm:text-5xl">
            {event.title}
          </h1>
          <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <Icon name="calendar" className="h-4 w-4 text-gold-400" />
              {formatEventDate(event.date)}
              {event.endDate ? <> – {formatEventDate(event.endDate)}</> : null}
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="clock" className="h-4 w-4 text-gold-400" />
              {event.time}
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="mapPin" className="h-4 w-4 text-gold-400" />
              {event.location}
            </span>
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CoverImage
              src={event.image}
              alt={`${event.title} — event artwork`}
              className="aspect-[16/9] rounded-3xl"
              sizes="(min-width: 1024px) 66vw, 100vw"
              fallbackIcon="sparkles"
            />
            <h2 className="mt-10 font-display text-2xl font-semibold text-brand-950">
              About this event
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">{event.description}</p>

            <div className="mt-8 rounded-2xl border border-gold-200 bg-gold-50 p-6">
              <p className="flex items-center gap-2 font-semibold text-brand-950">
                <Icon name="mapPin" className="h-5 w-5 text-gold-700" />
                Venue
              </p>
              <p className="mt-2 text-sm text-gold-800">
                {event.location} — {event.time}, {formatEventDate(event.date)}.
                Directions and registration details will be shared here.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-brand-950/[0.06] bg-white p-6 shadow-soft">
              <h2 className="font-display text-lg font-semibold text-brand-950">
                Other events
              </h2>
              <ul className="mt-4 space-y-4">
                {others.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/events/${item.slug}`}
                      className="group flex gap-4 rounded-xl p-2 transition-colors hover:bg-cream-100"
                    >
                      <CoverImage
                        src={item.image}
                        alt=""
                        className="aspect-square w-16 shrink-0 rounded-lg"
                        sizes="64px"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-brand-950 group-hover:text-gold-700">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-ink-500">
                          {formatEventDate(item.date)} · {item.time}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Button href="/events" variant="dark" className="mt-6 w-full">
              All Events
              <Icon name="arrowRight" className="h-4 w-4" />
            </Button>
          </aside>
        </Container>
      </section>
    </article>
  );
}