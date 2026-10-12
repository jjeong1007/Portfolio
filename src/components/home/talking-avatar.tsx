"use client";

import type { CSSProperties } from "react";
import { Avatar } from "@/components/home/avatar";
import { useTalk } from "@/components/home/use-talk";
import { heroLines } from "@/lib/dialogue";

/**
 * The landing-page avatar with a speech bubble above it. Hovering the
 * character (or tapping it on touch) says a random line from `heroLines`
 * while the mouth lip-syncs to each letter.
 */
export function TalkingAvatar({ className = "", style }: { className?: string; style?: CSSProperties }) {
  const { open, line, typed, mouth, talk, stop } = useTalk(heroLines);

  return (
    <div className={`relative ${className}`} style={style}>
      <div
        onPointerEnter={(e) => e.pointerType === "mouse" && talk()}
        onPointerLeave={(e) => e.pointerType === "mouse" && stop()}
        onPointerDown={(e) => e.pointerType !== "mouse" && talk({ linger: true })}
      >
        <Avatar mouth={mouth} />
      </div>

      <p
        aria-hidden
        className={`type-control pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 w-max max-w-[min(20rem,calc(100vw-32px))] origin-bottom -translate-x-1/2 rounded-control border border-line bg-paper px-4 py-3 text-center shadow-float transition-[opacity,scale,translate] duration-250 ease-spring ${
          open ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
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
  );
}
