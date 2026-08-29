import type { Metadata } from "next";
import Link from "next/link";
import { getAboutContent, getLeaders } from "@/lib/data/content";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { CoverImage } from "@/components/ui/cover-image";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the history, vision, mission and core values of RCCG Place of Favour Area Headquarters.",
};

const valueIcons = ["bookOpen", "flame", "sparkles", "heart"] as const;

export default async function AboutPage() {
  const [aboutContent, leaders] = await Promise.all([getAboutContent(), getLeaders()]);

  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About Place of Favour"
        description="Discover who we are, what we believe and where we are headed as a family of God."
        crumb="About"
      />

      <section className="py-20 sm:py-24">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <CoverImage
            src="/images/worship-2.svg"
            alt="View of the church family at worship"
            className="aspect-[4/5] rounded-3xl"
            sizes="(min-width: 1024px) 50vw, 100vw"
            fallbackIcon="cross"
          />
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-balance text-brand-950 sm:text-4xl">
              {aboutContent.welcome}
            </h2>
            {aboutContent.history.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-5 text-base leading-relaxed text-ink-500">
                {paragraph}
              </p>
            ))}
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-gold-700 underline-offset-4 hover:underline"
            >
              Visit us in person
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-950 py-20 text-white sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_100%_0%,rgba(74,119,164,0.22),transparent_60%)]"
        />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300">
                <Icon name="sparkles" className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold">Our Vision</h2>
              <p className="mt-3 leading-relaxed text-white/70">{aboutContent.vision}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300">
                <Icon name="flame" className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold">Our Mission</h2>
              <p className="mt-3 leading-relaxed text-white/70">{aboutContent.mission}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="What we stand for"
            title="Our core values"
            description="The convictions that shape everything we do as a church family."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutContent.values.map((value, i) => (
              <div
                key={value.id}
                className="rounded-2xl border border-brand-950/[0.06] bg-white p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-950 text-gold-300">
                  <Icon name={valueIcons[i % valueIcons.length]} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-950">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Our journey"
            title="Milestones along the way"
            description="Every chapter of our story is a testimony of God's faithfulness."
          />
          <ol className="mx-auto mt-14 max-w-3xl space-y-8 border-l-2 border-gold-200 pl-8 sm:pl-10">
            {aboutContent.milestones.map((milestone) => (
              <li key={milestone.year + milestone.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.6rem] top-1.5 h-5 w-5 rounded-full border-2 border-gold-400 bg-white sm:-left-[3.1rem]"
                />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-600">
                  {milestone.year}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-brand-950">
                  {milestone.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{milestone.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow={aboutContent.leadersIntro}
            title="Our leadership"
            description=""
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.slice(0, 4).map((leader) => (
              <div key={leader.id} className="overflow-hidden rounded-2xl bg-white shadow-soft">
                <CoverImage
                  src={leader.image}
                  alt={`Portrait of ${leader.name}`}
                  className="aspect-[4/5]"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-brand-950">{leader.name}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-gold-700">
                    {leader.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/leadership" variant="dark" size="lg">
              Meet All Our Leaders
              <Icon name="arrowRight" className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}