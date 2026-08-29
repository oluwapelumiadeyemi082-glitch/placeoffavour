import Link from "next/link";
import type { Testimonial } from "@/types/content";
import { homeContent } from "@/lib/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Icon } from "@/components/ui/icon";

export function TestimoniesPreview({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow={homeContent.testimoniesEyebrow}
          title={homeContent.testimoniesTitle}
          description="Real stories from our family — to God be the glory for all He has done."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimony) => (
            <figure
              key={testimony.id}
              className="flex flex-col rounded-2xl border border-brand-950/[0.06] bg-cream-50 p-6"
            >
              <span className="font-display text-5xl leading-none text-gold-300">
                “
              </span>
              <blockquote className="-mt-3 flex-1">
                <p className="text-[0.95rem] leading-relaxed text-ink-600">
                  {testimony.message}
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-950/[0.06] pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-950 font-display text-sm font-semibold text-gold-300">
                  {testimony.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-brand-950">{testimony.name}</p>
                  <p className="flex items-center gap-1.5 text-gold-600">
                    <Icon name="checkCircle" className="h-3.5 w-3.5" />
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em]">
                      Approved
                    </span>
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={homeContent.testimoniesCta.href}
            className="inline-flex items-center gap-2 font-semibold text-gold-700 underline-offset-4 hover:underline"
          >
            {homeContent.testimoniesCta.label}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}