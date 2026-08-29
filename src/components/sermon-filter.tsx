"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Sermon } from "@/types/content";
import { CoverImage } from "@/components/ui/cover-image";
import { Icon } from "@/components/ui/icon";
import { formatShortDate } from "@/lib/format";

interface SermonFilterProps {
  sermons: Sermon[];
}

export function SermonFilter({ sermons }: SermonFilterProps) {
  const [query, setQuery] = useState("");
  const [preacher, setPreacher] = useState("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const preachers = useMemo(
    () => Array.from(new Set(sermons.map((s) => s.preacher))),
    [sermons],
  );

  const filtered = useMemo(() => {
    let items = sermons.filter((s) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        s.title.toLowerCase().includes(q) ||
        s.scripture.toLowerCase().includes(q);
      const matchesPreacher = preacher === "all" || s.preacher === preacher;
      return matchesQuery && matchesPreacher;
    });
    items = [...items].sort((a, b) => {
      const diff = a.date.localeCompare(b.date);
      return sort === "newest" ? -diff : diff;
    });
    return items;
  }, [sermons, query, preacher, sort]);

  return (
    <div>
      <div className="mx-auto max-w-3xl space-y-3 sm:flex sm:items-center sm:gap-3">
        <label className="relative flex-1">
          <span className="sr-only">Search sermons</span>
          <Icon
            name="search"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or scripture…"
            className="h-12 w-full rounded-full border border-brand-950/10 bg-white pl-11 pr-4 text-sm text-brand-950 placeholder:text-ink-400 focus:border-gold-500 focus:outline-none"
          />
        </label>
        <label className="relative block sm:w-52">
          <span className="sr-only">Filter by preacher</span>
          <select
            value={preacher}
            onChange={(e) => setPreacher(e.target.value)}
            className="h-12 w-full appearance-none rounded-full border border-brand-950/10 bg-white pl-4 pr-9 text-sm text-brand-950 focus:border-gold-500 focus:outline-none"
          >
            <option value="all">All preachers</option>
            {preachers.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <Icon
            name="chevronDown"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
          />
        </label>
        <label className="relative block sm:w-44">
          <span className="sr-only">Sort sermons</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
            className="h-12 w-full appearance-none rounded-full border border-brand-950/10 bg-white pl-4 pr-9 text-sm text-brand-950 focus:border-gold-500 focus:outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
          <Icon
            name="chevronDown"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-14 flex flex-col items-center gap-3 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-950 text-gold-300">
            <Icon name="search" className="h-6 w-6" />
          </span>
          <p className="font-display text-lg font-semibold text-brand-950">
            No sermons found
          </p>
          <p className="text-sm text-ink-500">Try a different search term or filter.</p>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((sermon) => (
            <Link
              key={sermon.id}
              href={`/sermons/${sermon.slug}`}
              className="group overflow-hidden rounded-2xl border border-brand-950/[0.06] bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative">
                <CoverImage
                  src={sermon.image}
                  alt={`${sermon.title} — sermon artwork`}
                  className="aspect-[16/10]"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-brand-950/25 opacity-90 transition-opacity group-hover:opacity-100">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-brand-950/40 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                    <Icon name="play" className="h-6 w-6" />
                  </span>
                </span>
              </div>
              <div className="p-6">
                <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
                  <span>{sermon.preacher}</span>
                  <span className="text-ink-400">{formatShortDate(sermon.date)}</span>
                </p>
                <h2 className="mt-3 font-display text-xl font-semibold text-brand-950 transition-colors group-hover:text-gold-700">
                  {sermon.title}
                </h2>
                <p className="mt-2.5 flex items-center gap-2 text-sm text-ink-500">
                  <Icon name="bookOpen" className="h-4 w-4 text-gold-600" />
                  {sermon.scripture}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}