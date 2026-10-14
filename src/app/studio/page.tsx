import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ProjectGrid } from "@/components/home/project-grid";
import { PageTransition } from "@/components/ui/page-transition";
import { studioProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Studio",
  description: "Landing pages designed for startups.",
};

/** Side-hustle landing page: the home page layout, showing landing pages built for startups. */
export default function Studio() {
  return (
    <PageTransition>
      <main className="pb-30">
        <Hero
          tagline="I design landing pages"
          blurb="Helping early-stage startups tell their story with landing pages that are clear, playful and built to convert."
        />
        <ProjectGrid items={studioProjects} wide className="mt-20 md:mt-28" />
      </main>
    </PageTransition>
  );
}
