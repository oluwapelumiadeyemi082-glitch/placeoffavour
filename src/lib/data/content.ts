/**
 * Data-access layer (Phase 3).
 * ----------------------------------
 * Every public-content query runs through this module. When the database is
 * configured (`DATABASE_URL`) and reachable, data is read from Postgres (Neon).
 * Otherwise — or when a table is empty/erroring — the static placeholder
 * content in `src/lib/content` is returned, so the site is fully usable before
 * the database and seed are connected.
 */

import type {
  ChurchService,
  Sermon,
  ChurchEvent,
  Ministry,
  Leader,
  Testimonial,
  GalleryAlbum,
  GalleryImage,
  AboutContent,
} from "@/types/content";

import type {
  ChurchService as ChurchServiceRow,
  Sermon as SermonRow,
  ChurchEvent as ChurchEventRow,
  Ministry as MinistryRow,
  Leader as LeaderRow,
  Testimonial as TestimonialRow,
  GalleryAlbum as GalleryAlbumRow,
  GalleryImage as GalleryImageRow,
} from "@prisma/client";

import { getDb, withDb } from "@/lib/db";

import { services } from "@/lib/content/services";
import { sermons } from "@/lib/content/sermons";
import { events } from "@/lib/content/events";
import { ministries } from "@/lib/content/ministries";
import { leaders } from "@/lib/content/leaders";
import { testimonies } from "@/lib/content/testimonies";
import { galleryAlbums, galleryImages } from "@/lib/content/gallery";
import { aboutContent } from "@/lib/content/about";

/** Converts a UTC Date column to the "YYYY-MM-DD" string used across the site. */
export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/* ------------------------------------------------------------------ */
/* Row -> content type mappers                                         */
/* ------------------------------------------------------------------ */

function toChurchService(row: ChurchServiceRow): ChurchService {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    day: row.day,
    time: row.time,
    location: row.location,
    image: row.image,
    order: row.order,
  };
}

function toSermon(row: SermonRow): Sermon {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    preacher: row.preacher,
    date: toIsoDate(row.date),
    description: row.description,
    scripture: row.scripture,
    image: row.image,
    audioUrl: row.audioUrl,
    videoUrl: row.videoUrl,
  };
}

function toChurchEvent(row: ChurchEventRow): ChurchEvent {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: toIsoDate(row.date),
    time: row.time,
    location: row.location,
    description: row.description,
    image: row.image,
    endDate: row.endDate ? toIsoDate(row.endDate) : null,
  };
}

function toMinistry(row: MinistryRow): Ministry {
  return {
    id: row.id,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    leader: row.leader,
    image: row.image,
    contact: row.contact,
  };
}

function toLeader(row: LeaderRow): Leader {
  return {
    id: row.id,
    name: row.name,
    position: row.position,
    bio: row.bio,
    image: row.image,
    socials: (row.socials as Record<string, string> | undefined) ?? undefined,
  };
}

function toTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    isApproved: row.isApproved,
  };
}

function toGalleryAlbum(row: GalleryAlbumRow): GalleryAlbum {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    cover: row.cover,
  };
}

function toGalleryImage(
  row: GalleryImageRow & { album: GalleryAlbumRow },
): GalleryImage {
  return {
    id: row.id,
    albumSlug: row.album.slug,
    src: row.src,
    alt: row.alt,
    caption: row.caption ?? undefined,
  };
}

/* ------------------------------------------------------------------ */
/* Public queries                                                      */
/* ------------------------------------------------------------------ */

export async function getServices(): Promise<ChurchService[]> {
  return withDb(async (client) => {
    const rows = await client.churchService.findMany({
      orderBy: [{ order: "asc" }, { id: "asc" }],
    });
    return rows.map(toChurchService);
  }, services);
}

/** All sermons, newest first. */
export async function getSermons(): Promise<Sermon[]> {
  return withDb(async (client) => {
    const rows = await client.sermon.findMany({
      orderBy: [{ date: "desc" }, { id: "asc" }],
    });
    return rows.map(toSermon);
  }, sermons);
}

export async function getLatestSermons(count: number): Promise<Sermon[]> {
  return (await getSermons()).slice(0, count);
}

export async function getSermonBySlug(slug: string): Promise<Sermon | null> {
  const client = getDb();
  if (client) {
    try {
      const row = await client.sermon.findUnique({ where: { slug } });
      if (row) return toSermon(row);
    } catch (error) {
      console.error("[db] getSermonBySlug failed, falling back:", error);
    }
  }
  return sermons.find((s) => s.slug === slug) ?? null;
}

export async function getAllSermonSlugs(): Promise<{ slug: string }[]> {
  const client = getDb();
  if (client) {
    try {
      const rows = await client.sermon.findMany({
        select: { slug: true },
        orderBy: { date: "desc" },
      });
      if (rows.length > 0) return rows;
    } catch (error) {
      console.error("[db] getAllSermonSlugs failed, falling back:", error);
    }
  }
  return sermons.map((s) => ({ slug: s.slug }));
}

/** All events, soonest first. */
export async function getEvents(): Promise<ChurchEvent[]> {
  return withDb(async (client) => {
    const rows = await client.churchEvent.findMany({
      orderBy: [{ date: "asc" }, { id: "asc" }],
    });
    return rows.map(toChurchEvent);
  }, events);
}

export async function getUpcomingEvents(count: number): Promise<ChurchEvent[]> {
  return (await getEvents()).slice(0, count);
}

export async function getEventBySlug(slug: string): Promise<ChurchEvent | null> {
  const client = getDb();
  if (client) {
    try {
      const row = await client.churchEvent.findUnique({ where: { slug } });
      if (row) return toChurchEvent(row);
    } catch (error) {
      console.error("[db] getEventBySlug failed, falling back:", error);
    }
  }
  return events.find((e) => e.slug === slug) ?? null;
}

export async function getAllEventSlugs(): Promise<{ slug: string }[]> {
  const client = getDb();
  if (client) {
    try {
      const rows = await client.churchEvent.findMany({
        select: { slug: true },
        orderBy: { date: "asc" },
      });
      if (rows.length > 0) return rows;
    } catch (error) {
      console.error("[db] getAllEventSlugs failed, falling back:", error);
    }
  }
  return events.map((e) => ({ slug: e.slug }));
}

export async function getMinistries(): Promise<Ministry[]> {
  return withDb(async (client) => {
    const rows = await client.ministry.findMany({
      orderBy: [{ order: "asc" }, { id: "asc" }],
    });
    return rows.map(toMinistry);
  }, ministries);
}

export async function getFeaturedMinistries(count: number): Promise<Ministry[]> {
  return (await getMinistries()).slice(0, count);
}

export async function getLeaders(): Promise<Leader[]> {
  return withDb(async (client) => {
    const rows = await client.leader.findMany({
      orderBy: [{ order: "asc" }, { id: "asc" }],
    });
    return rows.map(toLeader);
  }, leaders);
}

export async function getFeaturedLeaders(count: number): Promise<Leader[]> {
  return (await getLeaders()).slice(0, count);
}

/** Only approved testimonies are shown publicly. */
export async function getApprovedTestimonies(): Promise<Testimonial[]> {
  return withDb(async (client) => {
    const rows = await client.testimonial.findMany({
      where: { isApproved: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return rows.map(toTestimonial);
  }, testimonies.filter((t) => t.isApproved));
}

export async function getFeaturedTestimonies(count: number): Promise<Testimonial[]> {
  return (await getApprovedTestimonies()).slice(0, count);
}

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  return withDb(async (client) => {
    const rows = await client.galleryAlbum.findMany({
      orderBy: [{ order: "asc" }, { id: "asc" }],
    });
    return rows.map(toGalleryAlbum);
  }, galleryAlbums);
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return withDb(async (client) => {
    const rows = await client.galleryImage.findMany({
      include: { album: true },
    });
    return rows.map(toGalleryImage);
  }, galleryImages);
}

export async function getFeaturedGalleryImages(count: number): Promise<GalleryImage[]> {
  return (await getGalleryImages()).slice(0, count);
}

export async function getAboutContent(): Promise<AboutContent> {
  const client = getDb();
  if (client) {
    try {
      const row = await client.aboutContent.findUnique({ where: { id: "default" } });
      const values = await client.coreValue.findMany({
        orderBy: [{ order: "asc" }, { id: "asc" }],
      });
      const milestones = await client.milestone.findMany({
        orderBy: [{ order: "asc" }, { id: "asc" }],
      });
      if (row) {
        return {
          history: row.history,
          vision: row.vision,
          mission: row.mission,
          leadersIntro: row.leadersIntro,
          welcome: row.welcome,
          values,
          milestones: milestones.map((m) => ({
            year: m.year,
            title: m.title,
            description: m.description,
          })),
        };
      }
    } catch (error) {
      console.error("[db] getAboutContent failed, falling back:", error);
    }
  }
  return aboutContent;
}