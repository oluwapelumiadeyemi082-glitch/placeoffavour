import type { Metadata } from "next";
import { getApprovedTestimonies } from "@/lib/data/content";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { Icon } from "@/components/ui/icon";
import { TestimonialForm } from "@/components/testimonial-form";

export const metadata: Metadata = {
  title: "Testimonies",
  description:
    "Read testimonies of God's goodness at Place of Favour, and share the story of what God has done in your life.",
};

export default async function TestimoniesPage() {
  const approved = await getApprovedTestimonies();

  return (
    <>
      <PageHero
        eyebrow="His Goodness"
        title="Testimonies"
        description="Glory to God, who is always faithful. Read what He has done, and share your own story."
        crumb="Testimonies"
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Approved and shared"
            title="Stories of grace"
            description="Every testimony is a trophy of God's faithfulness in the life of His people."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {approved.map((testimony) => (
              <figure
                key={testimony.id}
                className="flex flex-col rounded-2xl border border-brand-950/[0.06] bg-white p-6 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl leading-none text-gold-300">“</span>
                  <Icon name="heart" className="h-5 w-5 text-gold-400" />
                </div>
                <blockquote className="-mt-4 flex-1">
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
                        Approved testimony
                      </span>
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeader
            eyebrow="Share your story"
            title="We would love to hear from you"
            description="Fill in the form below. With your consent, your testimony will be reviewed and published to inspire others."
          />
          <div className="mt-10">
            <TestimonialForm />
          </div>
        </Container>
      </section>
    </>
  );
}