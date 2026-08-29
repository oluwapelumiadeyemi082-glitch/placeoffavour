"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks, site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-[#0a1a36] text-[0.8rem] text-white/70 md:block">
        <Container className="flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <Icon name="mapPin" className="h-3.5 w-3.5 text-gold-400" />
              {site.address.line1}, {site.address.line2}
            </span>
            <a
              href={`tel:${site.phoneHref}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-gold-300"
            >
              <Icon name="phone" className="h-3.5 w-3.5 text-gold-400" />
              {site.phone}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <Icon name="clock" className="h-3.5 w-3.5 text-gold-400" />
              Sundays · 10:00 AM
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-3">
              {(["facebook", "instagram", "youtube", "twitter"] as const).map((s) => (
                <a
                  key={s}
                  href={site.socials[s]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${s}`}
                  className="text-white/60 transition-colors hover:text-gold-300"
                >
                  <Icon name={s} className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <div className="border-b border-brand-950/5 bg-white/90 backdrop-blur-md">
        <Container className="flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            onClick={() => setOpen(false)}
            className="shrink-0"
          >
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[0.83rem] font-semibold tracking-wide transition-colors",
                  isActive(pathname, link.href)
                    ? "text-gold-700"
                    : "text-ink-600 hover:text-brand-900",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button href="/give" size="sm" className="hidden sm:inline-flex">
              Give
              <Icon name="heart" className="h-4 w-4" />
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-950/10 text-brand-950 transition-colors hover:bg-brand-50 xl:hidden"
            >
              <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </Container>

        {open ? (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-brand-950/5 bg-white xl:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold",
                    isActive(pathname, link.href)
                      ? "bg-gold-50 text-gold-800"
                      : "text-ink-700 hover:bg-cream-100",
                  )}
                >
                  {link.label}
                  <Icon name="arrowUpRight" className="h-4 w-4 opacity-40" />
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-3 border-t border-brand-950/5 pt-4">
                <Button href="/give" size="sm" className="flex-1">
                  Give Online
                </Button>
                <a
                  href={`tel:${site.phoneHref}`}
                  aria-label="Call the church office"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-950/15 text-brand-900"
                >
                  <Icon name="phone" className="h-4 w-4" />
                </a>
              </div>
            </Container>
          </nav>
        ) : null}
      </div>
    </header>
  );
}