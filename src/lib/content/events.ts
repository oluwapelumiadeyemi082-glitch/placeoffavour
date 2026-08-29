import type { ChurchEvent } from "@/types/content";

/**
 * PLACEHOLDER CONTENT (Phase 1) — see src/lib/content/services.ts for notes.
 */

export const events: ChurchEvent[] = [
  {
    id: "evt-holyghost",
    slug: "holy-ghost-service",
    title: "Holy Ghost Service",
    date: "2026-09-04",
    time: "6:00 PM",
    location: "Main Auditorium",
    description:
      "A night of worship, prayer and divine encounter. Come expecting God to move powerfully in your life.",
    image: "/images/hero-silhouette.svg",
  },
  {
    id: "evt-annual-conv",
    slug: "annual-convention",
    title: "Annual Convention",
    date: "2026-10-18",
    time: "9:00 AM",
    location: "Church Grounds",
    description:
      "Three days of teaching, worship and impartation with ministers from across the region.",
    image: "/images/gathering-1.svg",
    endDate: "2026-10-20",
  },
  {
    id: "evt-outreach",
    slug: "community-outreach",
    title: "Community Outreach",
    date: "2026-11-14",
    time: "8:00 AM",
    location: "City Centre",
    description:
      "Practical service and evangelism in our local community. Volunteers and partners are warmly welcome.",
    image: "/images/worship-2.svg",
  },
  {
    id: "evt-night-worship",
    slug: "night-of-worship-and-prayer",
    title: "Night of Worship & Prayer",
    date: "2026-09-25",
    time: "7:00 PM",
    location: "Main Auditorium",
    description:
      "An evening of extended praise, intercession and personal ministry. Come and lay every burden at the altar.",
    image: "/images/worship-1.svg",
  },
  {
    id: "evt-carols",
    slug: "christmas-carol-service",
    title: "Christmas Carol Service",
    date: "2026-12-13",
    time: "5:00 PM",
    location: "Main Auditorium",
    description:
      "Celebrate the birth of our Saviour with songs, scripture and candlelight — a joyful evening for the whole family.",
    image: "/images/hero-silhouette.svg",
  },
];