import Link from "next/link";
import type { Ministry } from "@/types/content";
import { homeContent } from "@/lib/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { CoverImage } from "@/components/ui/cover-image";
import { Icon } from "@/components/ui/icon";

export function MinistriesPreview({ ministries }: { ministries: Ministry[] }) {
  return (
    <section className="bg-cream-50 py-20 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow={homeContent.ministriesEyebrow}
          title={homeContent.ministriesTitle}
          description="Whatever your season or gift, there is a place for you to serve, grow and belong in the family."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry) => (
            <Link
              key={ministry.id}
              href="/ministries"
              className="group relative overflow-hidden rounded-2xl shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <CoverImage
                src={ministry.image}
                alt={`${ministry.name} ministry`}
                className="aspect-[4/3]"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-xl font-semibold text-white">
                  {ministry.name}
                </h3>
                <p className="mt-1 text-sm text-white/70">{ministry.tagline}</p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-300">
                  Learn more
                  <Icon
                    name="arrowUpRight"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={homeContent.ministriesCta.href}
            className="inline-flex items-center gap-2 font-semibold text-gold-700 underline-offset-4 hover:underline"
          >
            {homeContent.ministriesCta.label}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}