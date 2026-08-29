/**
 * PLACEHOLDER CONTENT (Phase 1) — see src/lib/content/services.ts for notes.
 */

export const homeContent = {
  hero: {
    eyebrow: "Welcome to",
    title: "RCCG Place of Favour",
    titleAccent: "Area Headquarters",
    welcome:
      "A family of believers where the word of God is honoured, lives are transformed and favour is made available to all.",
    ctaPrimary: { label: "Plan Your Visit", href: "/services" },
    ctaSecondary: { label: "Latest Sermons", href: "/sermons" },
    verse: {
      text: "Thou art my hiding place; thou shalt preserve me from trouble; thou shalt compass me about with songs of deliverance.",
      reference: "Psalm 32:7",
    },
  },
  serviceTimesNote:
    "Join us this week for one of our services. There is a place reserved for you.",
  welcome: {
    eyebrow: "Who We Are",
    title: "A place to belong, to grow and to worship",
    paragraphs: [
      "RCCG Place of Favour Area Headquarters is a welcoming church family where everyone is valued and loved. From your very first visit, you will find a place to belong.",
      "We are committed to clear bible teaching, heartfelt worship and serving our community — so that every person can discover God's purpose for their life.",
    ],
  },
  welcomeCta: { label: "Discover Our Story", href: "/about" },
  eventsEyebrow: "What's On",
  eventsTitle: "Upcoming events",
  eventsCta: { label: "View All Events", href: "/events" },
  sermonsEyebrow: "The Word",
  sermonsTitle: "Latest sermons",
  sermonsCta: { label: "Browse All Sermons", href: "/sermons" },
  ministriesEyebrow: "Ways to Serve",
  ministriesTitle: "Go deeper with a ministry",
  ministriesCta: { label: "Explore Ministries", href: "/ministries" },
  testimoniesEyebrow: "His Goodness",
  testimoniesTitle: "Stories of grace",
  testimoniesCta: { label: "Read More Testimonies", href: "/testimonies" },
  galleryEyebrow: "Moments",
  galleryTitle: "Glimpses of the family",
  galleryCta: { label: "View Full Gallery", href: "/gallery" },
  finalCta: {
    title: "Your story of favour begins here",
    paragraph:
      "We can't wait to welcome you. Come as you are — you belong here.",
    primary: { label: "Join Us This Sunday", href: "/services" },
    secondary: { label: "Give Online", href: "/give" },
  },
} as const;