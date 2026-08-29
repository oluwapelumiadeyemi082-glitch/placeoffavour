import Link from "next/link";
import type { Leader } from "@/types/content";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { CoverImage } from "@/components/ui/cover-image";
import { Icon } from "@/components/ui/icon";

export function LeadershipPreview({ leaders }: { leaders: Leader[] }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow="Our Shepherds"
          title="A leadership that serves"
          description="Godly men and women who lead the house with humility, prayer and dedication."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((leader) => (
            <article
              key={leader.id}
              className="group relative overflow-hidden rounded-2xl shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <CoverImage
                src={leader.image}
                alt={`Portrait of ${leader.name}`}
                className="aspect-[4/5]"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-lg font-semibold text-white">
                  {leader.name}
                </h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-gold-300">
                  {leader.position}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/leadership"
            className="inline-flex items-center gap-2 font-semibold text-gold-700 underline-offset-4 hover:underline"
          >
            Meet All Our Leaders
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}