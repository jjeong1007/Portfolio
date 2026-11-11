"use client";

import { useEffect, useRef } from "react";
import type { PersonaKey } from "./persona-art";
import { PersonaPortrait } from "./persona-portrait";

/** Same rhythm as the site's Avatar: a random pause between blinks, sometimes a double blink. */
const BLINK_GAP = [2200, 6500] as const;
const BLINK_TWICE_CHANCE = 0.25;

/**
 * A persona portrait that blinks at random intervals, like the Avatar. Sets
 * `data-blink` on its `group/persona` root; PersonaEyesOpen squashes each eye
 * while it's set. Skipped entirely under reduced motion.
 */
export function BlinkingPersona({ persona, className = "" }: { persona: PersonaKey; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const gap = BLINK_GAP[0] + Math.random() * (BLINK_GAP[1] - BLINK_GAP[0]);
      timer = setTimeout(() => {
        const twice = Math.random() < BLINK_TWICE_CHANCE;
        root.current?.setAttribute("data-blink", twice ? "twice" : "once");
        timer = setTimeout(
          () => {
            root.current?.removeAttribute("data-blink");
            schedule();
          },
          twice ? 500 : 230,
        );
      }, gap);
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={root} className={`group/persona size-full ${className}`}>
      <PersonaPortrait persona={persona} />
    </div>
  );
}
