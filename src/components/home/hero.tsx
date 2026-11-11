import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { TalkingAvatar } from "@/components/home/talking-avatar";
import { Container } from "@/components/ui/container";

/** Staggered entrance: each block rises in 80ms after the previous one. */
const rise = (step: number): CSSProperties => ({ animationDelay: `${step * 80}ms` });

const defaultBlurb = (
  <>
    Design has always been one of my passions. From making YouTube graphics in elementary school
    to now product experiences that are memorable. I’m a firm believer in that smiling and
    laughing through the process is always key.
  </>
);

/**
 * The landing hero (Figma 240:6001): the headline and blurb on the left, the
 * talking avatar in a 180px circle on the right. On phones the avatar sits
 * centered above the copy so its speech bubble has room. `tagline` and `blurb`
 * let other landing pages (e.g. /studio) reuse it.
 */
export function Hero({
  tagline = <>I do design and UX!</>,
  blurb = defaultBlurb,
}: {
  tagline?: ReactNode;
  blurb?: ReactNode;
}) {
  return (
    <Container as="section" grid className="items-start gap-y-8 pt-12 md:pt-24">
      <TalkingAvatar
        className="row-start-1 animate-rise justify-self-center md:col-span-3 md:col-start-10 md:mt-4 md:justify-self-end"
        avatarClassName="size-36! md:size-45!"
        style={rise(0)}
      />

      <div className="md:col-span-9 md:row-start-1 lg:col-span-8">
        <h1 className="type-title leading-[1.07]!">
          <span className="inline-flex animate-rise items-center gap-[0.22em]" style={rise(1)}>
            Hiya, I’m Jason.
            <Image
              src="/brand/logo-mark-small.svg"
              alt=""
              width={52}
              height={52}
              className="size-[0.72em] transition-transform duration-300 ease-spring hover:scale-110 hover:-rotate-12"
            />
          </span>
          <span className="block animate-rise font-medium!" style={rise(2)}>
            {tagline}
          </span>
        </h1>
        <p className="type-body-lg mt-4 max-w-[46.75rem] animate-rise text-ink-body" style={rise(3)}>
          {blurb}
        </p>
      </div>
    </Container>
  );
}
