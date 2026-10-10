import { Hero } from "@/components/home/hero";
import { PageTransition } from "@/components/ui/page-transition";

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Hero />
      </main>
    </PageTransition>
  );
}
