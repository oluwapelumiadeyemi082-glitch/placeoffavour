import { homeContent } from "@/lib/content/home";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/ui/cover-image";
import { Icon } from "@/components/ui/icon";

const highlights = [
  { title: "Bible-based teaching", note: "Sound, practical messages that change lives." },
  { title: "Heartfelt worship", note: "An atmosphere where you can meet with God." },
  { title: "A family of care", note: "Prayer, fellowship and support for every season." },
];

export function Welcome() {
  const { welcome } = homeContent;
  return (
    <section className="py-20 sm:py-24">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <CoverImage
            src="/images/worship-1.svg"
            alt="Inside the church auditorium during a service"
            className="aspect-[4/5] rounded-3xl"
            sizes="(min-width: 1024px) 50vw, 100vw"
            fallbackIcon="cross"
          />
          <div className="absolute -bottom-6 -right-3 hidden rounded-2xl border border-brand-950/[0.06] bg-white p-5 shadow-lift sm:-right-6 sm:block">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold-600">
              <Icon name="sparkles" className="h-4 w-4" />
              Grace &amp; Truth
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-brand-950">
              Welcome home
            </p>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-gold-600">
            {welcome.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-balance text-brand-950 sm:text-4xl">
            {welcome.title}
          </h2>
          {welcome.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 20)} className="mt-5 text-base leading-relaxed text-ink-500">
              {paragraph}
            </p>
          ))}
          <ul className="mt-7 space-y-4">
            {highlights.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="font-semibold text-brand-950">{item.title}</p>
                  <p className="text-sm text-ink-500">{item.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={homeContent.welcomeCta.href} size="lg" variant="dark">
              {homeContent.welcomeCta.label}
              <Icon name="arrowRight" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}