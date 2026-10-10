import Image from "next/image";
import type { CSSProperties } from "react";
import { Avatar } from "@/components/home/avatar";
import { PromptCard } from "@/components/home/prompt-card";

/** Staggered entrance: each block rises in 80ms after the previous one. */
const rise = (step: number): CSSProperties => ({ animationDelay: `${step * 80}ms` });

export function Hero() {
  return (
    <section className="grid min-h-svh place-items-center px-(--gutter) py-18">
      <div className="flex w-full max-w-[786px] flex-col items-center text-center">
        <div className="animate-rise" style={rise(0)}>
          <PromptCard />
        </div>

        <Avatar className="mt-3 animate-rise" style={rise(1)} />

        <h1 className="type-title mt-3 leading-[1.07]!">
          <span className="inline-flex animate-rise items-center gap-[0.22em]" style={rise(2)}>
            Hiya, I’m Jason.
            <Image
              src="/brand/logo-mark-small.svg"
              alt=""
              width={52}
              height={52}
              className="size-[0.72em] transition-transform duration-300 ease-spring hover:scale-110 hover:-rotate-12"
            />
          </span>
          <span className="block animate-rise font-medium!" style={rise(3)}>
            I do product &amp; strategy
          </span>
        </h1>

        <p className="type-body-lg mt-4 max-w-[747px] animate-rise text-ink-body" style={rise(4)}>
          Going deep into product strategy, making a butt-ton of design systems{" "}
          <span className="text-ink-faint">(haha get it)</span>, and creating compelling experiences
          for not just customers, but my team as well.
        </p>
      </div>
    </section>
  );
}
