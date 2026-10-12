import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { PhotoCollage } from "@/components/about/photo-collage";
import { PhotoGallery } from "@/components/about/photo-gallery";
import { TalkingAvatar } from "@/components/home/talking-avatar";
import { Container } from "@/components/ui/container";
import { PageTransition } from "@/components/ui/page-transition";
import { galleries, story } from "@/content/about";
import { aboutLines } from "@/lib/dialogue";

export const metadata: Metadata = {
  title: "About me",
  description: "Product thinker, designer and builder. Photography, hiking and travel on the side.",
};

/** Staggered entrance: each block rises in 80ms after the previous one. */
const rise = (step: number): CSSProperties => ({ animationDelay: `${step * 80}ms` });

/** Figma "Who are you" (103:12209). See "About page" in design-system.md. */
export default function AboutPage() {
  return (
    <PageTransition>
      {/* The collage runs past the gutter on small screens */}
      <main className="overflow-x-clip pb-(--space-section)">
        <Container as="header" className="flex flex-col items-center pt-24 text-center">
          <TalkingAvatar lines={aboutLines} className="animate-rise" style={rise(0)} />

          <h1 className="type-title mt-3 leading-[1.07]!">
            <span className="block animate-rise" style={rise(1)}>
              So, who is Jason Jeong?
            </span>
            <span className="block animate-rise font-medium!" style={rise(2)}>
              I’m a creative builder.
            </span>
          </h1>

          <div className="mt-20 flex w-full animate-rise justify-center" style={rise(3)}>
            <PhotoCollage />
          </div>
        </Container>

        <Container>
          <div className="mx-auto mt-16 max-w-narrow space-y-(--space-paragraph) text-ink-body">
            {story.map((p) => (
              <p key={p.slice(0, 24)} className="type-body-lg">
                {p}
              </p>
            ))}
          </div>

          <section aria-labelledby="outside-design" className="mx-auto max-w-narrow pt-(--space-section)">
            <h2 id="outside-design" className="type-subtitle text-center">
              Outside of design, you can catch me doing…
            </h2>
            <div className="mt-16 space-y-(--space-section)">
              {galleries.map((g) => (
                <PhotoGallery key={g.title} {...g} />
              ))}
            </div>
          </section>
        </Container>
      </main>
    </PageTransition>
  );
}
