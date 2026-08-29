import Link from "next/link";
import { type NavLink, navLinks, site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";

const footerLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Ministries", href: "/ministries" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonies", href: "/testimonies" },
  { label: "Leadership", href: "/leadership" },
  { label: "Give", href: "/give" },
  { label: "Contact", href: "/contact" },
];

const visitLinks: NavLink[] = [
  { label: "Sunday School — 8:30 AM", href: "/services" },
  { label: "Sunday Worship — 10:00 AM", href: "/services" },
  { label: "Wednesday Bible Study — 6:30 PM", href: "/services" },
  { label: "Friday Holy Ghost Service — 6:00 PM", href: "/services" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1a36] text-white/70">
      <div className="h-1 w-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {site.fullName} — a family of believers where the word is upheld,
              lives are transformed and God&apos;s favour is made available to
              all.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {(["facebook", "instagram", "youtube", "twitter", "whatsapp"] as const).map(
                (s) => (
                  <a
                    key={s}
                    href={site.socials[s]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${s}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-gold-400 hover:text-gold-300"
                  >
                    <Icon name={s} className="h-4 w-4" />
                  </a>
                ),
              )}
            </div>
          </div>

          <nav aria-label="Footer — Explore" className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold-300">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — More" className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold-300">
              More
            </h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.slice(5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold-300">
              Visit Us
            </h3>
            <ul className="mt-5 space-y-3">
              {visitLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-2.5 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>
                  {site.address.line1}, {site.address.line2}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="phone" className="h-4 w-4 shrink-0 text-gold-400" />
                <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-gold-300">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-gold-400" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold-300">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} {site.fullName}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span>Come and be blessed.</span>
            <Link
              href={site.adminPath}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 transition-colors hover:border-gold-400/50 hover:text-gold-300"
            >
              Admin
              <Icon name="external" className="h-3 w-3" />
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}

export { navLinks };