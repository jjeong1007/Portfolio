"use client";

import Image from "next/image";
import { useTalk } from "@/components/home/use-talk";
import type { Persona } from "@/lib/case-study";

/**
 * A persona card. Hovering the portrait (or tapping it on touch) has the
 * persona say one of their `lines` in a speech bubble to the portrait's
 * right, which grows as the text types (see home/use-talk.ts). The portrait
 * idles with the same head bob as the site's Avatar, pivoting at the neck;
 * `index` offsets each card's loop so the personas don't bob in sync.
 */
export function PersonaCard({ persona, index }: { persona: Persona; index: number }) {
  const { open, line, typed, talk, stop } = useTalk(persona.lines);

  return (
    <li className="rounded-card bg-surface p-6">
      <div className="relative w-fit">
        <div
          onPointerEnter={(e) => e.pointerType === "mouse" && talk()}
          onPointerLeave={(e) => e.pointerType === "mouse" && stop()}
          onPointerDown={(e) => e.pointerType !== "mouse" && talk({ linger: true })}
        >
          <div className="size-24 overflow-hidden rounded-full border-2 border-line bg-paper">
            <Image
              src={persona.portrait}
              alt=""
              sizes="96px"
              className="size-full origin-[50%_67%] animate-bob motion-reduce:animate-none"
              style={{ animationDelay: `${index * -1100}ms` }}
            />
          </div>
        </div>
        <p
          aria-hidden
          className={`type-control pointer-events-none absolute top-1/2 left-[calc(100%+12px)] z-10 w-max max-w-56 origin-left -translate-y-1/2 rounded-control border border-line bg-paper px-4 py-3 shadow-float transition-[opacity,scale,translate] duration-250 ease-spring ${
            open ? "translate-x-0 scale-100 opacity-100" : "-translate-x-2 scale-95 opacity-0"
          }`}
        >
          {/* Only the typed part is laid out, so the bubble grows with the line */}
          {line.slice(0, typed)}
        </p>
        {/* Screen readers get the whole line at once instead of letter by letter */}
        <p className="sr-only" aria-live="polite">
          {open ? line : ""}
        </p>
      </div>
      <h3 className="type-subheading mt-4">{persona.name}</h3>
      <p className="type-body-sm mt-1 text-ink-subtle">
        Age {persona.age} · Favorite artist: {persona.favoriteArtist}
      </p>
      <p className="type-body-md mt-3 text-ink-body">{persona.body}</p>
    </li>
  );
}
