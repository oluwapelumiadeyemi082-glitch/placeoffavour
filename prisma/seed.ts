/**
 * Database seed (Phase 3).
 * ----------------------------------
 * Loads the same placeholder content the site ships with into Postgres so the
 * live pages, once the database is connected, serve real rows. Run with:
 *   npm run db:seed
 *
 * Contents mirror `src/lib/content/*` and use the same stable IDs/slugs so the
 * thin data-access layer returns identical data whether it reads static content
 * or the database.
 */

import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";
import { services } from "../src/lib/content/services";
import { sermons } from "../src/lib/content/sermons";
import { events } from "../src/lib/content/events";
import { ministries } from "../src/lib/content/ministries";
import { leaders } from "../src/lib/content/leaders";
import { testimonies } from "../src/lib/content/testimonies";
import { galleryAlbums, galleryImages } from "../src/lib/content/gallery";
import { aboutContent } from "../src/lib/content/about";

const prisma = new PrismaClient();

function isoDate(iso: string): Date {
  return new Date(`${iso}T00:00:00.000Z`);
}

async function main() {
  console.log("Seeding database…");

  // Admin account -------------------------------------------------------------
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@placeoffavour.org").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Favour@2024";
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: "SUPER_ADMIN",
      passwordHash: hashPassword(adminPassword),
      updatedAt: new Date(),
    },
    create: {
      email: adminEmail,
      name: "Site Administrator",
      role: "SUPER_ADMIN",
      passwordHash: hashPassword(adminPassword),
    },
  });
  console.log(`  admin user: ${adminEmail}`);

  // Services ---------------------------------------------------------------
  for (const service of services) {
    await prisma.churchService.upsert({
      where: { id: service.id },
      update: { ...service },
      create: { ...service },
    });
  }
  console.log(`  services: ${services.length}`);

  // Sermons ----------------------------------------------------------------
  for (const sermon of sermons) {
    const data = {
      slug: sermon.slug,
      title: sermon.title,
      preacher: sermon.preacher,
      date: isoDate(sermon.date),
      description: sermon.description,
      scripture: sermon.scripture,
      image: sermon.image,
      audioUrl: sermon.audioUrl,
      videoUrl: sermon.videoUrl,
    };
    await prisma.sermon.upsert({ where: { id: sermon.id }, update: data, create: { id: sermon.id, ...data } });
  }
  console.log(`  sermons: ${sermons.length}`);

  // Events -----------------------------------------------------------------
  for (const event of events) {
    const data = {
      slug: event.slug,
      title: event.title,
      date: isoDate(event.date),
      time: event.time,
      location: event.location,
      description: event.description,
      image: event.image,
      endDate: event.endDate ? isoDate(event.endDate) : null,
    };
    await prisma.churchEvent.upsert({ where: { id: event.id }, update: data, create: { id: event.id, ...data } });
  }
  console.log(`  events: ${events.length}`);

  // Ministries -------------------------------------------------------------
  for (const [i, ministry] of ministries.entries()) {
    const data = {
      name: ministry.name,
      tagline: ministry.tagline,
      description: ministry.description,
      leader: ministry.leader,
      image: ministry.image,
      contact: ministry.contact,
      order: i + 1,
    };
    await prisma.ministry.upsert({ where: { id: ministry.id }, update: data, create: { id: ministry.id, ...data } });
  }
  console.log(`  ministries: ${ministries.length}`);

  // Leaders ----------------------------------------------------------------
  for (const [i, leader] of leaders.entries()) {
    const data = {
      name: leader.name,
      position: leader.position,
      bio: leader.bio,
      image: leader.image,
      socials: leader.socials,
      order: i + 1,
    };
    await prisma.leader.upsert({ where: { id: leader.id }, update: data, create: { id: leader.id, ...data } });
  }
  console.log(`  leaders: ${leaders.length}`);

  // Testimonies ------------------------------------------------------------
  for (const [i, testimony] of testimonies.entries()) {
    const data = {
      name: testimony.name,
      message: testimony.message,
      isApproved: testimony.isApproved,
      order: i + 1,
    };
    await prisma.testimonial.upsert({
      where: { id: testimony.id },
      update: data,
      create: { id: testimony.id, ...data },
    });
  }
  console.log(`  testimonies: ${testimonies.length}`);

  // Gallery ----------------------------------------------------------------
  for (const [i, album] of galleryAlbums.entries()) {
    const data = {
      slug: album.slug,
      name: album.name,
      description: album.description,
      cover: album.cover,
      order: i + 1,
    };
    await prisma.galleryAlbum.upsert({ where: { id: album.id }, update: data, create: { id: album.id, ...data } });
  }
  for (const image of galleryImages) {
    const album = galleryAlbums.find((a) => a.slug === image.albumSlug);
    if (!album) continue;
    const data = {
      albumId: album.id,
      src: image.src,
      alt: image.alt,
      caption: image.caption,
    };
    await prisma.galleryImage.upsert({ where: { id: image.id }, update: data, create: { id: image.id, ...data } });
  }
  console.log(`  galleryAlbums: ${galleryAlbums.length}, galleryImages: ${galleryImages.length}`);

  // About content ----------------------------------------------------------
  await prisma.aboutContent.upsert({
    where: { id: "default" },
    update: {
      history: aboutContent.history,
      vision: aboutContent.vision,
      mission: aboutContent.mission,
      leadersIntro: aboutContent.leadersIntro,
      welcome: aboutContent.welcome,
    },
    create: {
      id: "default",
      history: aboutContent.history,
      vision: aboutContent.vision,
      mission: aboutContent.mission,
      leadersIntro: aboutContent.leadersIntro,
      welcome: aboutContent.welcome,
    },
  });
  for (const [i, value] of aboutContent.values.entries()) {
    const data = { title: value.title, description: value.description, order: i + 1 };
    await prisma.coreValue.upsert({ where: { id: value.id }, update: data, create: { id: value.id, ...data } });
  }
  for (const [i, milestone] of aboutContent.milestones.entries()) {
    const data = { year: milestone.year, title: milestone.title, description: milestone.description, order: i + 1 };
    await prisma.milestone.upsert({
      where: { id: `ms-${i + 1}` },
      update: data,
      create: { id: `ms-${i + 1}`, ...data },
    });
  }
  console.log("  about content + values + milestones");

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });