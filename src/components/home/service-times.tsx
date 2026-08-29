import Link from "next/link";
import type { ChurchService } from "@/types/content";
import { homeContent } from "@/lib/content/home";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

const featuredIds = ["srv-sunday-service", "srv-bible-study", "srv-prayer-meeting"];

export function ServiceTimes({ services }: { services: ChurchService[] }) {
  const featured = services.filter((s) => featuredIds.includes(s.id));
  return (
    <section className="relative z-10 -mt-16 sm:-mt-20">
      <Container>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {featured.map((service, i) => (
            <Link
              key={service.id}
              href="/services"
              className="group rounded-2xl border border-brand-950/[0.06] bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-950 text-gold-300 transition-colors group-hover:bg-gold-400 group-hover:text-brand-950">
                  <Icon name={i === 0 ? "heart" : i === 1 ? "bookOpen" : "flame"} className="h-5 w-5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">
                  {service.day}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-brand-950">
                {service.title}
              </h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-ink-500">
                <Icon name="clock" className="h-4 w-4 text-gold-600" />
                {service.time}
                <span aria-hidden="true" className="text-ink-300">
                  ·
                </span>
                <Icon name="mapPin" className="h-4 w-4 text-gold-600" />
                {service.location}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-500">
          <Icon name="sparkles" className="h-4 w-4 text-gold-600" />
          {homeContent.serviceTimesNote}
          <Link href="/services" className="font-semibold text-gold-700 underline-offset-4 hover:underline">
            See all services
          </Link>
        </p>
      </Container>
    </section>
  );
}