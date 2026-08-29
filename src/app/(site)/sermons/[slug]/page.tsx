import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSermonSlugs, getSermonBySlug, getSermons } from "@/lib/data/content";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { CoverImage } from "@/components/ui/cover-image";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { formatShortDate } from "@/lib/format";

interface SermonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSermonSlugs();
}

export async function generateMetadata({
  params,
}: SermonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sermon = await getSermonBySlug(slug);
  if (!sermon) return { title: "Sermon not found" };
  return {
    title: sermon.title,
    description: sermon.description,
    openGraph: {
      type: "article",
      title: sermon.title,
      description: sermon.description,
      url: `${site.url}/sermons/${sermon.slug}`,
    },
  };
}

export default async function SermonPage({ params }: SermonPageProps) {
  const { slug } = await params;
  const sermon = await getSermonBySlug(slug);
  if (!sermon) notFound();

  const all = await getSermons();
  const more = all.filter((s) => s.slug !== sermon.slug).slice(0, 2);

  return (
    <article>
      <section className="relative overflow-hidden bg-brand-950 py-16 text-white sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_85%_0%,rgba(204,155,47,0.2),transparent_60%)]"
        />
        <Container className="relative">
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            <Icon name="bookOpen" className="h-4 w-4" />
            Sermon
          </p>
          <h1 className="font-display max-w-3xl text-3xl font-medium leading-tight tracking-tight text-balance sm:text-5xl">
            {sermon.title}
          </h1>
          <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <Icon name="users" className="h-4 w-4 text-gold-400" />
              {sermon.preacher}
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="calendar" className="h-4 w-4 text-gold-400" />
              {formatShortDate(sermon.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="bookOpen" className="h-4 w-4 text-gold-400" />
              {sermon.scripture}
            </span>
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CoverImage
              src={sermon.image}
              alt={`${sermon.title} — sermon artwork`}
              className="aspect-[16/9] rounded-3xl"
              sizes="(min-width: 1024px) 66vw, 100vw"
              fallbackIcon="flame"
            />

            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-brand-950 px-6 py-5 text-white">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-400 text-brand-950">
                <Icon name="play" className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold">Listen to the message</p>
                <p className="text-xs text-white/60">
                  {sermon.audioUrl || sermon.videoUrl
                    ? "Audio and video links will be attached once provided."
                    : "Audio and video are not attached yet. This sermon will be listenable when the media link is added."}
                </p>
              </div>
            </div>

            <h2 className="mt-10 font-display text-2xl font-semibold text-brand-950">
              Message overview
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">{sermon.description}</p>

            <p className="mt-6 rounded-xl border border-gold-200 bg-gold-50 px-5 py-4 text-sm text-gold-800">
              <span className="font-bold uppercase tracking-[0.14em]">Scripture:</span>{" "}
              {sermon.scripture}
            </p>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-brand-950/[0.06] bg-white p-6 shadow-soft">
              <h2 className="font-display text-lg font-semibold text-brand-950">
                More messages
              </h2>
              <ul className="mt-4 space-y-4">
                {more.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/sermons/${item.slug}`}
                      className="group flex gap-4 rounded-xl p-2 transition-colors hover:bg-cream-100"
                    >
                      <CoverImage
                        src={item.image}
                        alt=""
                        className="aspect-square w-16 shrink-0 rounded-lg"
                        sizes="64px"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-brand-950 group-hover:text-gold-700">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-ink-500">
                          {item.preacher} · {formatShortDate(item.date)}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Button href="/sermons" variant="dark" className="mt-6 w-full">
              All Sermons
              <Icon name="arrowRight" className="h-4 w-4" />
            </Button>
          </aside>
        </Container>
      </section>
    </article>
  );
}