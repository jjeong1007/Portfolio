import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { TalkingAvatar } from "@/components/home/talking-avatar";

/** Staggered entrance: each block rises in 80ms after the previous one. */
const rise = (step: number): CSSProperties => ({ animationDelay: `${step * 80}ms` });

const defaultBlurb = (
  <>
    Going deep into product strategy, making a butt-ton of design systems{" "}
    <span className="text-ink-faint">(haha get it)</span>, and creating compelling experiences
    for not just customers, but my team as well.
  </>
);

/** The landing hero. `tagline` and `blurb` let other landing pages (e.g. /studio) reuse it. */
export function Hero({
  tagline = <>I do product &amp; strategy</>,
  blurb = defaultBlurb,
}: {
  tagline?: ReactNode;
  blurb?: ReactNode;
}) {
  return (
    <section className="flex justify-center px-(--gutter) pt-20 md:pt-23">
      <div className="flex w-full max-w-197 flex-col items-center text-center">
        <TalkingAvatar className="animate-rise" style={rise(0)} />

        <h1 className="type-title mt-3 leading-[1.07]!">
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

        <p className="type-body-lg mt-4 max-w-187 animate-rise text-ink-body" style={rise(3)}>
          {blurb}
        </p>
      </div>
    </section>
  );
}
