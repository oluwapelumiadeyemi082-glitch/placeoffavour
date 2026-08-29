import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Support the work of RCCG Place of Favour Area Headquarters — tithes, offerings, building project, missions and welfare.",
};

const categories = [
  {
    icon: "heart" as const,
    title: "Tithes & Offerings",
    description:
      "Honour God with the firstfruits of all He has given you.",
  },
  {
    icon: "globe" as const,
    title: "Building Project",
    description:
      "Partner with us as we expand the house of God for a growing family.",
  },
  {
    icon: "sparkles" as const,
    title: "Missions & Outreach",
    description:
      "Extend the gospel to our community and the nations with us.",
  },
  {
    icon: "flame" as const,
    title: "Welfare Support",
    description:
      "Help us care for the sick, the needy and the grieving among us.",
  },
];

/** Placeholder giving channels; production payment providers are integrated later. */
const methods = [
  { name: "Paystack", note: "Card & bank transfer — integration pending" },
  { name: "Bank Transfer", note: "Church account details (to be published when confirmed)" },
  { name: "At the Church", note: "Tithe & offering boxes are available at every service" },
];

export default function GivePage() {
  return (
    <>
      <PageHero
        eyebrow="Give"
        title="Support the work of God"
        description="Your giving keeps the ministry going — teaching, outreach, worship and care for those in need."
        crumb="Give"
      />

      <section className="py-20 sm:py-24">
        <Container className="max-w-4xl">
          <div className="rounded-2xl border border-gold-200 bg-gold-50 p-6">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-gold-800">
              <Icon name="sparkles" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
              <span>
                <strong>Online giving is being set up.</strong> No payment is
                processed on this page. In the meantime, please give during any of
                our services or through the channels listed below once they are
                published.
              </span>
            </p>
          </div>

          <SectionHeader
            eyebrow="Ways to give"
            title="Where your giving goes"
            className="mt-16"
          />

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {categories.map((category) => (
              <div
                key={category.title}
                className="rounded-2xl border border-brand-950/[0.06] bg-white p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-950 text-gold-300">
                  <Icon name={category.icon} className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold text-brand-950">
                  {category.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          <SectionHeader
            eyebrow="Channels"
            title="Giving methods"
            className="mt-16"
          />

          <ul className="mt-10 space-y-4">
            {methods.map((method) => (
              <li
                key={method.name}
                className="flex items-center gap-4 rounded-2xl border border-brand-950/[0.06] bg-white p-6 shadow-soft"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-brand-950">{method.name}</h3>
                  <p className="text-sm text-ink-500">{method.note}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-center text-sm text-ink-500">
            Questions about giving?{" "}
            <a href="/contact" className="font-semibold text-gold-700 underline-offset-4 hover:underline">
              Contact our office
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}