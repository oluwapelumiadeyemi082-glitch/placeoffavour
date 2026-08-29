export const siteName = "Place of Favour";

export const site = {
  name: siteName,
  fullName: "RCCG Place of Favour Area Headquarters",
  tagline: "A place where God's favour is made available to all",
  description:
    "Official website of RCCG Place of Favour Area Headquarters. Join us as we worship, grow in God's word and serve our community.",
  // URL is overridable via environment variable (set NEXT_PUBLIC_SITE_URL on Vercel).
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://placeoffavour.org").replace(/\/+$/, ""),
  // All contact details below are placeholders until confirmed by the church office.
  email: "info@placeoffavour.org",
  phone: "+234 000 000 0000",
  phoneHref: "+2340000000000",
  address: {
    line1: "[Church Address, Street]",
    line2: "[City], [State], Nigeria",
  },
  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    twitter: "https://x.com/",
    whatsapp: "https://wa.me/2340000000000",
  },
  adminPath: "/admin",
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Ministries", href: "/ministries" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonies", href: "/testimonies" },
  { label: "Contact", href: "/contact" },
];