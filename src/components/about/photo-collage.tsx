"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { collage } from "@/content/about";

/**
 * Figma frame (103:12209) around the collage, in design px. Every position is
 * a multiple of `--u` (one design px as a share of the frame's width), so the
 * collage scales as one piece.
 */
const FRAME = { w: 952, h: 556 };
const CENTER = { x: 476, y: 266, w: 492, h: 304 };
const CORNER = { w: 296, h: 216 };

/** Open (Figma) and tucked offsets from the center, plus tilt, per corner: TL, TR, BL, BR */
const CORNERS = [
  { x: -296, y: -120, r: 15 },
  { x: 296, y: -120, r: -15 },
  { x: -296, y: 144, r: -15 },
  { x: 296, y: 144, r: 15 },
] as const;
/** At rest the corners hide behind the middle photo, peeking out at the edges */
const TUCK = { x: 0.55, y: 0.5, r: 0.5, scale: 0.9 };

const u = (n: number) => `calc(var(--u) * ${n})`;

/**
 * "hover over me!": a selfie with four photos tucked behind it. Hovering or
 * focusing the collage (tapping on touch) fans them out to the corners with
 * `ease-spring`, staggered 60ms. See "About page" in design-system.md.
 */
export function PhotoCollage({ className = "", style }: { className?: string; style?: CSSProperties }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      tabIndex={0}
      role="group"
      aria-label="Photos of Jason. Hover or focus to spread them out."
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onPointerDown={(e) => e.pointerType !== "mouse" && setOpen((o) => !o)}
      onFocus={(e) => e.target.matches(":focus-visible") && setOpen(true)}
      onBlur={() => setOpen(false)}
      className={`@container relative shrink-0 rounded-card ${className}`}
      // Wider than the column on small screens: the outer photos run off the edges
      style={{ width: "min(calc(100% + 96px), 952px)", aspectRatio: `${FRAME.w} / ${FRAME.h}`, ...style }}
    >
      <div className="absolute inset-0" style={{ "--u": `calc(100cqw / ${FRAME.w})` } as CSSProperties}>
        {collage.corners.map((photo, i) => {
          const c = CORNERS[i];
          const transform = open
            ? `translate(${u(c.x)}, ${u(c.y)}) rotate(${c.r}deg)`
            : `translate(${u(c.x * TUCK.x)}, ${u(c.y * TUCK.y)}) rotate(${c.r * TUCK.r}deg) scale(${TUCK.scale})`;
          return (
            <div
              key={photo.src.src}
              className="absolute overflow-hidden rounded-photo bg-surface shadow-halo transition-transform duration-700 ease-spring"
              style={{
                left: u(CENTER.x - CORNER.w / 2),
                top: u(CENTER.y - CORNER.h / 2),
                width: u(CORNER.w),
                height: u(CORNER.h),
                transform,
                transitionDelay: open ? `${i * 60}ms` : "0ms",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 296px, 32vw"
                placeholder="blur"
                className="object-cover"
                style={{ objectPosition: photo.focus }}
              />
            </div>
          );
        })}

        <div
          className="absolute overflow-hidden rounded-photo bg-surface shadow-halo"
          style={{
            left: u(CENTER.x - CENTER.w / 2),
            top: u(CENTER.y - CENTER.h / 2),
            width: u(CENTER.w),
            height: u(CENTER.h),
          }}
        >
          <Image
            src={collage.center.src}
            alt={collage.center.alt}
            fill
            priority
            sizes="(min-width: 1024px) 492px, 52vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>

        {/* 8px above the middle photo; its job is done once the photos fan out */}
        <p
          aria-hidden
          className={`type-subheading pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-ink-body transition-[opacity,translate] duration-200 ease-out-soft ${
            open ? "-translate-y-[calc(100%+4px)] opacity-0" : "-translate-y-full opacity-100"
          }`}
          style={{ top: `calc(${u(CENTER.y - CENTER.h / 2)} - 8px)` }}
        >
          <span className="[@media(hover:none)]:hidden">hover over me!</span>
          <span className="hidden [@media(hover:none)]:inline">tap me!</span>
        </p>
      </div>
    </div>
  );
}
