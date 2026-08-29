import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function FindUs() {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 text-white sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_0%_100%,rgba(74,119,164,0.22),transparent_60%)]"
      />
      <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-gold-300">
            <Icon name="mapPin" className="h-4 w-4" />
            Find Us
          </p>
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
            Come and worship with us
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-pretty text-white/70">
            We would be honoured to have you join our family. Check our address,
            reach out to the office, or simply walk in on a Sunday — there is a
            place for you.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
                <Icon name="mapPin" className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Address</p>
                <p className="text-sm text-white/60">
                  {site.address.line1}, {site.address.line2}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
                <Icon name="phone" className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Phone</p>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="text-sm text-white/60 transition-colors hover:text-gold-300"
                >
                  {site.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
                <Icon name="mail" className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-white/60 transition-colors hover:text-gold-300"
                >
                  {site.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
                <Icon name="clock" className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Service times</p>
                <p className="text-sm text-white/60">
                  Sunday School 8:30 AM · Celebration Service 10:00 AM
                  <br />
                  Midweek Bible Study Wed 6:30 PM · Holy Ghost Service First Friday
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/contact" size="lg">
              Contact Us
              <Icon name="arrowRight" className="h-4 w-4" />
            </Button>
            <Button href="/services" size="lg" variant="ghostLight">
              View Service Times
            </Button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#0a1a36]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_40%,rgba(204,155,47,0.28),transparent_60%)]" />
          <div className="relative flex flex-col items-center gap-3 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
              <Icon name="mapPin" className="h-7 w-7" />
            </span>
            <p className="max-w-xs font-display text-lg font-semibold text-white">
              {site.address.line1}, {site.address.line2}
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              Interactive map loads once the address is confirmed
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}