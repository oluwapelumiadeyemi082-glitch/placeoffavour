import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { Icon } from "@/components/ui/icon";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with RCCG Place of Favour Area Headquarters — visit us, call us, or send a message through the contact form.",
};

const cards = [
  {
    icon: "mapPin" as const,
    title: "Visit Us",
    lines: [site.address.line1, site.address.line2],
  },
  {
    icon: "phone" as const,
    title: "Call Us",
    lines: [site.phone, "Sunday · 10:00 AM service (placeholder)"],
  },
  {
    icon: "mail" as const,
    title: "Email Us",
    lines: [site.email, "We respond within a few days"],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="We'd love to hear from you"
        title="Contact us"
        description="Questions, prayer requests, counselling or just a hello — reach out and our team will respond."
        crumb="Contact"
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-brand-950/[0.06] bg-white p-6 shadow-soft"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-950 text-gold-300">
                  <Icon name={card.icon} className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold text-brand-950">
                  {card.title}
                </h2>
                {card.lines.map((line) => (
                  <p key={line} className="mt-1 text-sm text-ink-500">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Send a message"
                title="We would love to connect"
                description="Fill in the form and our office will get back to you."
                align="left"
              />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div
                aria-label="Map placeholder"
                className="relative flex min-h-64 flex-1 items-center justify-center overflow-hidden rounded-3xl bg-brand-950"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_40%,rgba(204,155,47,0.3),transparent_60%)]"
                />
                <div className="relative flex flex-col items-center gap-3 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
                    <Icon name="mapPin" className="h-7 w-7" />
                  </span>
                  <p className="max-w-xs font-display text-lg font-semibold text-white">
                    {site.address.line1}, {site.address.line2}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                    Interactive map comes with address confirmation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}