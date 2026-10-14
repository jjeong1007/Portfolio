"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useTileActive } from "@/components/home/use-tile-active";
import type { Figure } from "@/lib/case-study";

/**
 * The landing page's Shopify tile. At rest it's a fanned deck of the final
 * screens: the live storefront in front, the "how do you want to start" and
 * "add a product" screens tucked behind it. While the tile is hovered (or
 * focused, or in view on touch) the deck fans out, the storefront lifts, and
 * shopping bags, hearts and stars float up from it. Positions are in cqw (the
 * tile is square).
 */

/** In with a spring, staggered; out quickly and all at once (like JamTile). */
function motion(active: boolean, delay: number, duration = 600): CSSProperties {
  return {
    transitionDuration: active ? `${duration}ms` : "300ms",
    transitionTimingFunction: active ? "var(--ease-spring)" : "var(--ease-out-soft)",
    transitionDelay: active ? `${delay}ms` : "0ms",
  };
}

/* ---------------------------------------------------------------------------
 * What floats up from the deck
 * ------------------------------------------------------------------------- */

/* Filled glyphs on a 24-unit grid (Lucide's heart and star, and a shopping bag to match) */
const GLYPHS: Record<"bag" | "heart" | "star", ReactNode> = {
  bag: (
    <>
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path d="M5.2 7h13.6l-.9 13.1A2 2 0 0 1 15.9 22H8.1a2 2 0 0 1-2-1.9z" />
    </>
  ),
  heart: (
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  ),
  star: (
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  ),
};

/** Shopify Forest for the bags, and the character hair palette for the rest (like JamTile's notes). */
const COLORS = { bag: "var(--color-shopify)", heart: "#FF1D86", star: "#FFC82F" };

/** `x` in cqw from the tile's left edge, `dx` sideways drift, `size` in cqw. */
const FLOATERS: { glyph: keyof typeof GLYPHS; x: number; dx: number; size: number; delay: number }[] = [
  { glyph: "bag", x: 14, dx: -4, size: 7, delay: 0 },
  { glyph: "heart", x: 30, dx: 5, size: 5.5, delay: 500 },
  { glyph: "star", x: 22, dx: 3, size: 5, delay: 1100 },
  { glyph: "bag", x: 80, dx: 4, size: 6.5, delay: 300 },
  { glyph: "star", x: 66, dx: -5, size: 5.5, delay: 800 },
  { glyph: "heart", x: 74, dx: -3, size: 5, delay: 1500 },
  { glyph: "bag", x: 46, dx: -3, size: 5.5, delay: 1900 },
];

/** Only rendered while active, so each loop starts fresh on hover. */
function Floaters({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30 motion-reduce:hidden">
      {FLOATERS.map((f, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute animate-note opacity-0"
          style={
            {
              left: `${f.x}cqw`,
              bottom: "42cqw",
              width: `${f.size}cqw`,
              color: COLORS[f.glyph],
              // After the deck has fanned out
              animationDelay: `${f.delay + 400}ms`,
              "--dx": `${f.dx}cqw`,
              "--rise": "-32cqw",
              "--tilt": `${i % 2 ? 14 : -14}deg`,
            } as CSSProperties
          }
        >
          {GLYPHS[f.glyph]}
        </svg>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Tile
 * ------------------------------------------------------------------------- */

export function ShopTile({ screens }: { screens: Figure[] }) {
  const [root, active] = useTileActive<HTMLDivElement>();
  const [first, middle, last] = screens;

  const phone = (figure: Figure, className: string, style: CSSProperties) => (
    <Image
      key={figure.src.src}
      src={figure.src}
      alt={figure.alt}
      sizes="(min-width: 1024px) 200px, (min-width: 640px) 260px, 50vw"
      className={`absolute h-auto w-[40cqw] drop-shadow-[0_2cqw_3cqw_rgba(0,0,0,0.14)] transition-[translate,rotate] ${className}`}
      style={style}
    />
  );

  return (
    <div
      ref={root}
      data-active={active}
      className="absolute inset-0 isolate overflow-hidden [container-type:size]"
    >
      {/* A soft pool of Shopify green under the deck */}
      <span
        aria-hidden
        className="absolute inset-0 transition-opacity duration-500 ease-out-soft"
        style={{
          backgroundImage:
            "radial-gradient(70% 55% at 50% 100%, color-mix(in srgb, var(--color-shopify) 34%, transparent) 0%, transparent 100%)",
          opacity: active ? 1 : 0.7,
        }}
      />

      {/* Behind the storefront, pivoting from below so they fan like cards */}
      {phone(first, "top-[30cqw] left-[12cqw] origin-[50%_120%]", {
        rotate: active ? "-16deg" : "-8deg",
        translate: active ? "-7cqw -2cqw" : "0 0",
        ...motion(active, 0, 700),
      })}
      {phone(last, "top-[30cqw] right-[12cqw] origin-[50%_120%]", {
        rotate: active ? "16deg" : "8deg",
        translate: active ? "7cqw -2cqw" : "0 0",
        ...motion(active, 0, 700),
      })}
      {/* The storefront lifts out of the deck */}
      {phone(middle, "z-10 top-[24cqw] left-[30cqw]", {
        translate: active ? "0 -6cqw" : "0 0",
        ...motion(active, 60, 700),
      })}

      <Floaters active={active} />
    </div>
  );
}
