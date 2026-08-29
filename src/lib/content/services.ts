import type { ChurchService } from "@/types/content";

/**
 * PLACEHOLDER CONTENT (Phase 1)
 * ----------------------------------
 * These values are temporary and will be replaced by database records served
 * through Prisma/Neon in Phase 3. Every item is editable from the admin
 * dashboard once the CMS layer is connected. Do not treat anything here as
 * official church information.
 */

export const services: ChurchService[] = [
  {
    id: "srv-sunday-school",
    title: "Sunday School",
    description:
      "A time of in-depth study in God's word that prepares every believer for the week ahead.",
    day: "Sunday",
    time: "8:30 AM",
    location: "Main Auditorium",
    image: "/images/worship-1.svg",
    order: 1,
  },
  {
    id: "srv-sunday-service",
    title: "Sunday Celebration Service",
    description:
      "Our main weekly celebration — vibrant praise, heartfelt worship and the undiluted word of God.",
    day: "Sunday",
    time: "10:00 AM",
    location: "Main Auditorium",
    image: "/images/worship-2.svg",
    order: 2,
  },
  {
    id: "srv-digging-deep",
    title: "Digging Deep",
    description:
      "A focused teaching session that helps believers build a strong personal devotional life.",
    day: "Tuesday",
    time: "6:30 PM",
    location: "Main Auditorium",
    image: "/images/gathering-1.svg",
    order: 3,
  },
  {
    id: "srv-bible-study",
    title: "Midweek Bible Study",
    description:
      "Verse-by-verse study of scripture for growth, understanding and practical daily living.",
    day: "Wednesday",
    time: "6:30 PM",
    location: "Main Auditorium",
    image: "/images/worship-1.svg",
    order: 4,
  },
  {
    id: "srv-prayer-meeting",
    title: "Prayer Meeting",
    description:
      "A gathering devoted to intercession, thanksgiving and standing on the promises of God.",
    day: "Friday",
    time: "6:00 PM",
    location: "Prayer Ground",
    image: "/images/gathering-1.svg",
    order: 5,
  },
  {
    id: "srv-holy-ghost-service",
    title: "Holy Ghost Service",
    description:
      "A special monthly programme of worship, prayer and divine encounter led by the Holy Spirit.",
    day: "First Friday",
    time: "6:00 PM",
    location: "Main Auditorium",
    image: "/images/hero-silhouette.svg",
    order: 6,
  },
];