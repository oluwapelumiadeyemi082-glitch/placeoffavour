import type { Metadata } from "next";
import { getSermons } from "@/lib/data/content";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SermonFilter } from "@/components/sermon-filter";

export const metadata: Metadata = {
  title: "Sermons",
  description:
    "Browse and listen to recent sermons preached at Place of Favour, with scripture references for every message.",
};

export default async function SermonsPage() {
  const sermons = await getSermons();

  return (
    <>
      <PageHero
        eyebrow="The Word"
        title="Sermons"
        description="Faith comes by hearing. Explore recent messages preached at Place of Favour."
        crumb="Sermons"
      />
      <section className="py-16 sm:py-20">
        <Container>
          <SermonFilter sermons={sermons} />
        </Container>
      </section>
    </>
  );
}