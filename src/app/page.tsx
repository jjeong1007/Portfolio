import { Hero } from "@/components/home/hero";
import { ProjectGrid } from "@/components/home/project-grid";
import { PageTransition } from "@/components/ui/page-transition";

export default function Home() {
  return (
    <PageTransition>
      <main className="pb-30">
        <Hero />
        <ProjectGrid className="mt-20 md:mt-28" />
      </main>
    </PageTransition>
  );
}
