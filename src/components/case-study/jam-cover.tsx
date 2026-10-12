"use client";

import Image from "next/image";
import { useState, type CSSProperties, type ReactNode } from "react";
import type { Figure } from "@/lib/case-study";
import {
  PERSONA_NECK,
  PersonaBrows,
  PersonaEyesClosed,
  PersonaEyesOpen,
  PersonaFace,
  PersonaGlasses,
  PersonaHairBack,
  PersonaHairFront,
  PersonaMouth,
  type PersonaKey,
} from "./persona-art";
import { useTileActive } from "@/components/home/use-tile-active";
import { PoseBody, PoseOverlay, RelaxedBody, type FigmaPoseKey } from "./pose-art";

/**
 * Amazon Music cover, used on the case study (JamCover) and on the landing
 * page's project tile (JamTile). At rest it's the three screens. Hovering it
 * (or tapping the case study cover on touch) moves the outer screens out of
 * the way, and the characters lean in from the sides to bop along to the
 * middle one: Social Sally and Lurking Louise on the left, Jason and Quiet
 * Quincy on the right. Eyes close, heads bob slowly on the beat, and colorful
 * notes float up. Each character holds a different pose: Sally throws her
 * arms up, Louise listens with a hand to her ear and Quincy crosses his arms
 * (all three from the Figma pose sheet, pose-art.tsx), and Jason keeps his
 * arms by his sides.
 */

/** Note colors: the character hair palette from Figma, plus Amazon Rain. */
const NOTE_COLORS = ["#FF1D1D", "#1D92FF", "#FFC82F", "#FF1D86", "#1DFF7F", "#3F1DFF", "var(--color-amazon)"];

const NOTE_PATHS = {
  // ♪
  eighth: "M13 3h2v14.5a4 3.4 0 1 1-2-2.9V3zM15 3c.5 3 5.5 4 5 9-1.2-2.4-3-3.3-5-3.6z",
  // ♫
  beamed: "M8 6l11-3v12.5a3.6 3 0 1 1-2-2.6V8.2l-7 1.9v7.4a3.6 3 0 1 1-2-2.6z",
};

/**
 * Notes float up on each side. `x` and `dx` (sideways drift) are in
 * `--note-x` units from the card's left or right edge, `size` in
 * `--note-size` units; the host sets those and `--note-bottom` / `--note-rise`.
 */
const NOTES: { side: "left" | "right"; x: number; dx: number; delay: number; glyph: keyof typeof NOTE_PATHS; size: number }[] = [
  { side: "left", x: 0.18, dx: -0.06, delay: 0, glyph: "eighth", size: 0.07 },
  { side: "left", x: 0.66, dx: 0.08, delay: 400, glyph: "beamed", size: 0.08 },
  { side: "left", x: 0.42, dx: 0.04, delay: 1100, glyph: "eighth", size: 0.06 },
  { side: "left", x: 0.86, dx: 0.1, delay: 1600, glyph: "eighth", size: 0.065 },
  { side: "left", x: 0.3, dx: -0.08, delay: 2200, glyph: "beamed", size: 0.07 },
  { side: "left", x: 0.74, dx: -0.04, delay: 2700, glyph: "eighth", size: 0.055 },
  { side: "right", x: 0.2, dx: 0.06, delay: 200, glyph: "beamed", size: 0.075 },
  { side: "right", x: 0.7, dx: -0.08, delay: 800, glyph: "eighth", size: 0.07 },
  { side: "right", x: 0.48, dx: -0.03, delay: 1300, glyph: "eighth", size: 0.06 },
  { side: "right", x: 0.88, dx: -0.1, delay: 1900, glyph: "beamed", size: 0.065 },
  { side: "right", x: 0.32, dx: 0.08, delay: 2400, glyph: "eighth", size: 0.055 },
  { side: "right", x: 0.6, dx: 0.05, delay: 2900, glyph: "beamed", size: 0.06 },
];

/** Character crop, in Frame 1 units: head to waist, with room for raised hands. */
const VIEWBOX = { x: 120, y: 120, w: 460, h: 500 };
/** Center of the face within the crop, as a fraction of its width / height. */
const FACE = { x: (354 - VIEWBOX.x) / VIEWBOX.w, y: (192 - VIEWBOX.y) / VIEWBOX.h };

type Cast = { persona: PersonaKey; pose: PoseKey; side: "left" | "right"; phase: number };

/** Who stands where. Characters on the right are mirrored so they face in. */
const CAST = {
  sally: { persona: "sally", pose: "wave", side: "left", phase: 0 },
  louise: { persona: "louise", pose: "ear", side: "left", phase: -250 },
  jason: { persona: "jason", pose: "relaxed", side: "right", phase: -125 },
  quincy: { persona: "quincy", pose: "crossed", side: "right", phase: -375 },
} satisfies Record<string, Cast>;

/* ---------------------------------------------------------------------------
 * Character rig
 * ------------------------------------------------------------------------- */

/** Loops pause at rest and pick up the character's `--phase` offset. */
function loop(jam: boolean, origin: string): CSSProperties {
  return { transformOrigin: origin, animationDelay: "var(--phase)", animationPlayState: jam ? "running" : "paused" };
}

/** Head parts bob together on the beat, pivoting at the neck. */
function Bob({ jam, children }: { jam: boolean; children: ReactNode }) {
  return (
    <g className="animate-jam-nod transform-view motion-reduce:animate-none" style={loop(jam, `${PERSONA_NECK.x}px ${PERSONA_NECK.y}px`)}>
      {children}
    </g>
  );
}

/** Eyes start open as they lean in, then close once they're in the groove. */
function Swap({ jam, open, closed }: { jam: boolean; open: ReactNode; closed: ReactNode }) {
  const fade = "transition-opacity duration-150";
  return (
    <>
      <g className={fade} style={{ opacity: jam ? 0 : 1, transitionDelay: jam ? "550ms" : "0ms" }}>
        {open}
      </g>
      <g className={fade} style={{ opacity: jam ? 1 : 0, transitionDelay: jam ? "550ms" : "0ms" }}>
        {closed}
      </g>
    </>
  );
}

/** The head, bobbing on the beat. `children` go on top and bob with it. */
function Head({ persona, jam, children }: { persona: PersonaKey; jam: boolean; children?: ReactNode }) {
  return (
    <Bob jam={jam}>
      <PersonaFace />
      <g className="transition-transform duration-300 ease-spring" style={{ transform: jam ? "translateY(-3px)" : undefined }}>
        <PersonaBrows />
      </g>
      <PersonaGlasses persona={persona} />
      <Swap jam={jam} open={<PersonaEyesOpen />} closed={<PersonaEyesClosed />} />
      <PersonaMouth />
      <PersonaHairFront persona={persona} />
      {children}
    </Bob>
  );
}

/** Every body comes from the Figma pose sheet: three poses, and Jason's relaxed one built from it. */
type PoseKey = FigmaPoseKey | "relaxed";

function Character({ persona, pose, jam }: { persona: PersonaKey; pose: PoseKey; jam: boolean }) {
  return (
    // Sways from the hips over two beats
    <g className="animate-jam-sway transform-view motion-reduce:animate-none" style={loop(jam, "348px 620px")}>
      <Bob jam={jam}>
        <PersonaHairBack persona={persona} />
      </Bob>
      {pose === "relaxed" ? <RelaxedBody /> : <PoseBody pose={pose} persona={persona} />}
      {/* A hand raised to the face, tucked behind the head */}
      {pose !== "relaxed" && <PoseOverlay pose={pose} />}
      <Head persona={persona} jam={jam} />
    </g>
  );
}

/** One character's own SVG, so its pivots stay in Frame 1 units. */
function CharacterSvg({ cast, jam }: { cast: Cast; jam: boolean }) {
  return (
    <svg
      viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`}
      fill="none"
      className={`size-full overflow-visible ${cast.side === "right" ? "-scale-x-100" : ""}`}
    >
      <Character persona={cast.persona} pose={cast.pose} jam={jam} />
    </svg>
  );
}

/** Notes only render while jamming, so each loop starts fresh on hover. */
function Notes({ jam }: { jam: boolean }) {
  if (!jam) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30 motion-reduce:hidden">
      {NOTES.map((note, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute animate-note opacity-0"
          style={
            {
              [note.side]: `calc(var(--note-x) * ${note.x})`,
              bottom: "var(--note-bottom)",
              width: `calc(var(--note-size) * ${note.size})`,
              color: NOTE_COLORS[i % NOTE_COLORS.length],
              animationDelay: `${note.delay + 500}ms`,
              "--dx": `calc(var(--note-x) * ${note.dx})`,
              "--rise": "var(--note-rise)",
              "--tilt": `${i % 2 ? 14 : -14}deg`,
            } as CSSProperties
          }
        >
          <path d={NOTE_PATHS[note.glyph]} fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}

/** Entrance: in with a spring, staggered; out quickly and all at once. */
function entrance(jam: boolean, delay: number): CSSProperties {
  return {
    transitionDuration: jam ? "700ms" : "350ms",
    transitionTimingFunction: jam ? "var(--ease-spring)" : "var(--ease-out-soft)",
    transitionDelay: jam ? `${delay}ms` : "0ms",
  };
}

/* ---------------------------------------------------------------------------
 * Case study cover
 * ------------------------------------------------------------------------- */

type Placement = {
  cast: Cast;
  /** Distance from the card's side edge, in `--h` units (negative hangs off the edge). */
  inset: number;
  /** Distance below the card's bottom edge, in `--h` units. */
  drop: number;
  /** Entrance stagger, ms. */
  delay: number;
};

/** Back row first, so the front row overlaps it. */
const COVER_PLACEMENTS: Placement[] = [
  { cast: CAST.louise, inset: -0.34, drop: 0.24, delay: 260 },
  { cast: CAST.quincy, inset: -0.24, drop: 0.24, delay: 320 },
  { cast: CAST.sally, inset: 0.22, drop: 0.3, delay: 140 },
  { cast: CAST.jason, inset: 0.12, drop: 0.3, delay: 200 },
];

/** A character standing at the card's side edge. Sizes are in `--h` units (one character's height). */
function Peeker({ placement: { cast, inset, drop, delay }, jam }: { placement: Placement; jam: boolean }) {
  const out = cast.side === "left" ? -1 : 1;
  return (
    <div
      aria-hidden
      className="absolute z-20 transition-[translate,rotate] will-change-transform"
      style={
        {
          [cast.side]: `calc(var(--h) * ${inset})`,
          bottom: `calc(var(--h) * ${-drop})`,
          height: "var(--h)",
          aspectRatio: `${VIEWBOX.w} / ${VIEWBOX.h}`,
          // Hide past the edge, leaning away, until the music starts
          translate: jam ? "0 0" : `calc(${out} * (100% + var(--h) * ${Math.max(inset, 0)} + 16px)) 0`,
          rotate: jam ? "0deg" : `${out * 12}deg`,
          transformOrigin: cast.side === "left" ? "0% 100%" : "100% 100%",
          "--phase": `${cast.phase}ms`,
          ...entrance(jam, delay),
        } as CSSProperties
      }
    >
      <CharacterSvg cast={cast} jam={jam} />
    </div>
  );
}

/** The case study cover: the scene on the cover card, jamming while hovered (or toggled by a tap). */
export function JamCover({ screens }: { screens: Figure[] }) {
  const [jam, setJam] = useState(false);

  return (
    <figure
      data-jam={jam}
      onPointerEnter={(e) => e.pointerType === "mouse" && setJam(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setJam(false)}
      // Touch has no hover: a tap starts and stops the jam
      onPointerDown={(e) => e.pointerType !== "mouse" && setJam((j) => !j)}
      className="relative mt-10 flex h-90 items-start justify-center gap-3 overflow-hidden rounded-card bg-surface px-6 pt-10 [container-type:size] sm:h-120 sm:gap-6 md:h-140 md:px-16 md:pt-16"
      style={
        {
          "--h": "min(82cqh, 44cqw)",
          "--note-x": "var(--h)",
          "--note-size": "var(--h)",
          "--note-bottom": "calc(var(--h) * 0.62)",
          "--note-rise": "calc(var(--h) * -0.42)",
        } as CSSProperties
      }
    >
      {screens.map((screen, i) => {
        const side = i === 0 ? "-translate-x-[230%]" : i === screens.length - 1 ? "translate-x-[230%]" : "";
        return (
          <Image
            key={screen.src.src}
            src={screen.src}
            alt={screen.alt}
            sizes="(min-width: 768px) 280px, 30vw"
            preload
            // The outer screens sit lower, so the row fans out and runs off the card's bottom edge.
            // While jamming they slide out of frame to make room for the characters.
            className={`h-auto w-1/3 max-w-70 transition-[translate] ease-out-soft ${i === 1 ? "" : "mt-10 md:mt-16"} ${
              jam ? `${side} duration-500` : "duration-700"
            }`}
          />
        );
      })}
      {COVER_PLACEMENTS.map((placement) => (
        <Peeker key={placement.cast.persona} placement={placement} jam={jam} />
      ))}
      <Notes jam={jam} />
    </figure>
  );
}

/* ---------------------------------------------------------------------------
 * Landing page tile (Figma: JJJ Final Undergrad Portfolio, "Low-fi v2",
 * frames 98:11896 at rest and 100:11904 on hover, 389 x 389). Positions are
 * in cqw (the tile is square), converted from that frame.
 * ------------------------------------------------------------------------- */

/** One character's box, scaled so a Frame 1 unit is 0.1054cqw (0.41px at 389px). */
const TILE_UNIT = 0.1054;

type Lean = {
  cast: Cast;
  /** Where the face lands, in cqw from the tile's top-left. */
  face: { x: number; y: number };
  delay: number;
};

/** Two leaning in on each side, stacked (Figma 100:11904). Top row first, so the bottom row overlaps it. */
const TILE_LEANS: Lean[] = [
  { cast: CAST.sally, face: { x: 9, y: 25.7 }, delay: 140 },
  { cast: CAST.jason, face: { x: 91, y: 25.7 }, delay: 200 },
  { cast: CAST.louise, face: { x: 9, y: 63 }, delay: 260 },
  { cast: CAST.quincy, face: { x: 91, y: 63 }, delay: 320 },
];
/** They lean in 27° from the sides, bodies running off the edge. */
const TILE_TILT = 27;

function Leaner({ lean: { cast, face, delay }, jam }: { lean: Lean; jam: boolean }) {
  const w = VIEWBOX.w * TILE_UNIT;
  const h = VIEWBOX.h * TILE_UNIT;
  const left = cast.side === "left";
  // Mirrored characters have their face on the other side of the box
  const fx = left ? FACE.x : 1 - FACE.x;
  const tilt = left ? TILE_TILT : -TILE_TILT;
  return (
    <div
      aria-hidden
      className="absolute z-20 transition-[translate,rotate] will-change-transform"
      style={
        {
          left: `${face.x - fx * w}cqw`,
          top: `${face.y - FACE.y * h}cqw`,
          width: `${w}cqw`,
          height: `${h}cqw`,
          transformOrigin: `${fx * 100}% ${FACE.y * 100}%`,
          // Out past the edge until the music starts
          translate: jam ? "0 0" : `${left ? -(face.x + w) : 100 - face.x + w}cqw 0`,
          rotate: `${jam ? tilt : tilt * 1.5}deg`,
          "--phase": `${cast.phase}ms`,
          ...entrance(jam, delay),
        } as CSSProperties
      }
    >
      <CharacterSvg cast={cast} jam={jam} />
    </div>
  );
}

/**
 * The landing page's Amazon Music tile. The tile's link covers it, so this
 * listens on its parent (the tile) instead: it jams while the tile is hovered
 * or its link has keyboard focus. Touch screens can't hover, so there it jams
 * while the tile is scrolled into view, and a tap just opens the case study.
 *
 * At rest the middle screen sits over the other two, which peek out behind it
 * and run off the sides (Figma 98:11896). While jamming the middle screen grows
 * and the others slide out, and the characters lean in from the sides.
 */
export function JamTile({ screens }: { screens: Figure[] }) {
  const [root, jam] = useTileActive<HTMLDivElement>();

  const [first, middle, last] = screens;
  const screen = (figure: Figure, className: string, style: CSSProperties) => (
    <Image
      key={figure.src.src}
      src={figure.src}
      alt={figure.alt}
      sizes="(min-width: 1024px) 220px, (min-width: 640px) 290px, 60vw"
      className={`absolute h-auto w-[45.8cqw] transition-[translate,scale] ${className}`}
      style={style}
    />
  );

  return (
    <div
      ref={root}
      data-jam={jam}
      className="absolute inset-0 isolate overflow-hidden [container-type:size]"
      style={
        {
          "--note-x": "22cqw",
          "--note-size": "55cqw",
          "--note-bottom": "44cqw",
          "--note-rise": "-36cqw",
        } as CSSProperties
      }
    >
      {/* Outer screens tuck behind the middle one and slide out to the sides */}
      {screen(first, "top-[30.3cqw] left-[-4.4cqw]", {
        translate: jam ? "-60cqw 0" : "0 0",
        ...entrance(jam, 0),
        transitionTimingFunction: "var(--ease-out-soft)",
      })}
      {screen(last, "top-[30.3cqw] left-[58.9cqw]", {
        translate: jam ? "60cqw 0" : "0 0",
        ...entrance(jam, 0),
        transitionTimingFunction: "var(--ease-out-soft)",
      })}
      {/* The middle screen grows from 178 to 222 wide and rises (Figma 99:11901 → 100:11907) */}
      {screen(middle, "z-10 top-[23.4cqw] left-[27.1cqw] origin-top", {
        translate: jam ? "0 -8.5cqw" : "0 0",
        scale: jam ? "1.247" : "1",
        ...entrance(jam, 0),
        transitionTimingFunction: "var(--ease-out-soft)",
        transitionDuration: "500ms",
      })}
      {TILE_LEANS.map((lean) => (
        <Leaner key={lean.cast.persona} lean={lean} jam={jam} />
      ))}
      <Notes jam={jam} />
    </div>
  );
}
