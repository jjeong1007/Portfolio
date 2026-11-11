import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { PhotoCollage } from "@/components/about/photo-collage";
import { PhotoCarousel } from "@/components/about/photo-carousel";
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
        <Container as="header" grid className="justify-items-center pt-24 text-center">
          <TalkingAvatar lines={aboutLines} className="animate-rise" style={rise(0)} />

          <h1 className="type-title mt-3 leading-[1.07]!">
            <span className="block animate-rise" style={rise(1)}>
              So, who is Jason Jeong?
            </span>
            <span className="block animate-rise font-medium!" style={rise(2)}>
              I’m a creative builder.
            </span>
          </h1>

          {/* The middle 10 columns from lg; it runs past the gutter on phones */}
          <div className="mt-20 flex w-full animate-rise justify-center lg:col-span-10 lg:col-start-2" style={rise(3)}>
            <PhotoCollage />
          </div>
        </Container>

        {/* Story and galleries: the middle 10 columns from lg */}
        <Container grid>
          <div className="mt-16 space-y-(--space-paragraph) text-ink-body lg:col-span-10 lg:col-start-2">
            {story.map((p) => (
              <p key={p.slice(0, 24)} className="type-body-lg">
                {p}
              </p>
            ))}
          </div>

          <section aria-labelledby="outside-design" className="pt-(--space-section) lg:col-span-10 lg:col-start-2">
            <h2 id="outside-design" className="type-subtitle text-center">
              Outside of design, you can catch me doing…
            </h2>
            <div className="mt-16 space-y-(--space-section)">
              {galleries.map((g) => (
                <PhotoCarousel key={g.title} {...g} />
              ))}
            </div>
          </section>
        </Container>
      </main>
    </PageTransition>
  );
}
