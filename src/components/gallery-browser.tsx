"use client";

import { useState } from "react";
import type { GalleryAlbum, GalleryImage } from "@/types/content";
import { CoverImage } from "@/components/ui/cover-image";
import { cn } from "@/lib/utils";

interface GalleryBrowserProps {
  albums: GalleryAlbum[];
  images: GalleryImage[];
}

export function GalleryBrowser({ albums, images }: GalleryBrowserProps) {
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all" ? images : images.filter((img) => img.albumSlug === active);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter gallery by album"
        className="flex flex-wrap items-center justify-center gap-2"
      >
        <button
          type="button"
          onClick={() => setActive("all")}
          aria-pressed={active === "all"}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
            active === "all"
              ? "bg-brand-950 text-gold-300"
              : "border border-brand-950/10 bg-white text-ink-600 hover:border-brand-950/30",
          )}
        >
          All
        </button>
        {albums.map((album) => (
          <button
            key={album.id}
            type="button"
            onClick={() => setActive(album.slug)}
            aria-pressed={active === album.slug}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              active === album.slug
                ? "bg-brand-950 text-gold-300"
                : "border border-brand-950/10 bg-white text-ink-600 hover:border-brand-950/30",
            )}
          >
            {album.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-sm text-ink-500">
          No images in this album yet.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {filtered.map((image) => (
            <figure
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-soft transition-shadow hover:shadow-lift"
            >
              <CoverImage
                src={image.src}
                alt={image.alt}
                className="aspect-[4/3]"
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/80 to-transparent p-4 pt-10">
                <p className="text-sm font-semibold text-white">{image.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}