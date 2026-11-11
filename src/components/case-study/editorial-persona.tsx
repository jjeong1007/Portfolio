"use client";

import Image from "next/image";
import { useTalk } from "@/components/home/use-talk";
import type { Persona } from "@/lib/case-study";
import { PersonaPortrait } from "./persona-portrait";

/**
 * A persona on an editorial case study (editorial.css `.persona-card`): the
 * accent-tinted identity panel (portrait, name, tags) above the bio. Hovering
 * the portrait (or tapping it on touch) has the persona say one of their
 * `lines` in a speech bubble, as in persona-card.tsx; `index` offsets each
 * portrait's bob so neighbors don't move in sync.
 */
export function EditorialPersona({ persona, index }: { persona: Persona; index: number }) {
  const { open, line, typed, talk, stop } = useTalk(persona.lines);
  const tags = [`Age ${persona.age}`, persona.favoriteArtist ? `Favorite artist: ${persona.favoriteArtist}` : persona.role].filter(
    (t): t is string => Boolean(t),
  );

  return (
    <article className="persona-card" aria-label={`Persona: ${persona.name}`}>
      <div className="persona-id">
        <div className="relative">
          <div
            className="persona-art"
            onPointerEnter={(e) => e.pointerType === "mouse" && talk()}
            onPointerLeave={(e) => e.pointerType === "mouse" && stop()}
            onPointerDown={(e) => e.pointerType !== "mouse" && talk({ linger: true })}
          >
            {typeof persona.portrait === "string" ? (
              <PersonaPortrait persona={persona.portrait} delay={index * -1100} />
            ) : (
              <Image
                src={persona.portrait}
                alt=""
                sizes="160px"
                className="size-full origin-[50%_67%] animate-bob motion-reduce:animate-none"
                style={{ animationDelay: `${index * -1100}ms` }}
              />
            )}
          </div>
          <p
            aria-hidden
            className={`type-control pointer-events-none absolute top-full left-1/2 z-10 m-0! mt-3! w-max max-w-56 origin-top -translate-x-1/2 rounded-control border border-line bg-paper px-4 py-3 text-left text-ink shadow-float transition-[opacity,scale] duration-250 ease-spring ${
              open ? "scale-100 opacity-100" : "scale-95 opacity-0"
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
        <p className="persona-name">{persona.name}</p>
        <ul className="persona-tags">
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <p className="persona-bio">{persona.body}</p>
    </article>
  );
}
