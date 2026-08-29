import Link from "next/link";
import type { Sermon } from "@/types/content";
import { homeContent } from "@/lib/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { CoverImage } from "@/components/ui/cover-image";
import { Icon } from "@/components/ui/icon";
import { formatShortDate } from "@/lib/format";

export function LatestSermons({ sermons }: { sermons: Sermon[] }) {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 text-white sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_0%_0%,rgba(74,119,164,0.22),transparent_60%)]"
      />
      <Container className="relative">
        <SectionHeader
          eyebrow={homeContent.sermonsEyebrow}
          title={homeContent.sermonsTitle}
          description="Recent messages from God's word to encourage, strengthen and sharpen you for the week."
          tone="dark"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sermons.map((sermon) => (
            <Link
              key={sermon.id}
              href={`/sermons/${sermon.slug}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40"
            >
              <div className="relative">
                <CoverImage
                  src={sermon.image}
                  alt={`${sermon.title} — sermon artwork`}
                  className="aspect-[16/10]"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-brand-950/30 opacity-90 transition-opacity group-hover:opacity-100">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-brand-950/40 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                    <Icon name="play" className="h-6 w-6" />
                  </span>
                </span>
              </div>
              <div className="p-6">
                <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-gold-300">
                  <span>{sermon.preacher}</span>
                  <span className="text-white/45">{formatShortDate(sermon.date)}</span>
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-white transition-colors group-hover:text-gold-200">
                  {sermon.title}
                </h3>
                <p className="mt-2.5 flex items-center gap-2 text-sm text-white/60">
                  <Icon name="bookOpen" className="h-4 w-4 text-gold-400" />
                  {sermon.scripture}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={homeContent.sermonsCta.href}
            className="inline-flex items-center gap-2 font-semibold text-gold-300 underline-offset-4 hover:underline"
          >
            {homeContent.sermonsCta.label}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}