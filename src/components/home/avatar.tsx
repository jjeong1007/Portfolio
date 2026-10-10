"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { CharacterBody, CharacterHead, EYE_LEFT_D, EYE_RIGHT_D } from "@/components/home/character-art";

/** Eye centers in the 418 x 235 art frame (also their blink pivots). */
const EYE_LEFT = { x: 210.31, y: 61.98 };
const EYE_RIGHT = { x: 235.19, y: 58 };
/** How far the pupils can travel toward the cursor, in art units (~2px at 128px). */
const LOOK_X = 3;
const LOOK_Y = 2;
/** Cursor distance (px) at which the eyes reach their full travel. */
const LOOK_REACH = 240;
/** Random pause between blinks, and how often a blink is a double blink. */
const BLINK_GAP = [2200, 6500] as const;
const BLINK_TWICE_CHANCE = 0.25;

/**
 * Circular avatar cropping the rigged character to the head. The art is
 * inline SVG so the head and eyes can move: the head bobs (`animate-bob`),
 * the eyes blink at random intervals and follow the cursor. Hover still
 * plays the head wiggle (`animate-wave`). Crop offsets come from Figma
 * (128px frame) as percentages so it scales. See "Motion" in design-system.md.
 */
export function Avatar({ className = "", style }: { className?: string; style?: CSSProperties }) {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const eyes = useRef<SVGGElement>(null);

  // Random blinking
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const gap = BLINK_GAP[0] + Math.random() * (BLINK_GAP[1] - BLINK_GAP[0]);
      timer = setTimeout(() => {
        const twice = Math.random() < BLINK_TWICE_CHANCE;
        root.current?.setAttribute("data-blink", twice ? "twice" : "once");
        timer = setTimeout(() => {
          root.current?.removeAttribute("data-blink");
          schedule();
        }, twice ? 500 : 230);
      }, gap);
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  // Eyes follow the cursor
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const update = () => {
      frame = 0;
      if (!svg.current || !eyes.current) return;
      let x = 0;
      let y = 0;
      if (pointer) {
        const box = svg.current.getBoundingClientRect();
        const dx = pointer.x - (box.left + (((EYE_LEFT.x + EYE_RIGHT.x) / 2) / 418) * box.width);
        const dy = pointer.y - (box.top + (((EYE_LEFT.y + EYE_RIGHT.y) / 2) / 235) * box.height);
        const dist = Math.hypot(dx, dy);
        if (dist > 0) {
          const reach = Math.min(1, dist / LOOK_REACH);
          x = (dx / dist) * LOOK_X * reach;
          y = (dy / dist) * LOOK_Y * reach;
        }
      }
      eyes.current.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      request();
    };
    // Look back to center when the cursor leaves the window
    const onLeave = () => {
      pointer = null;
      request();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={root}
      className={`group relative size-32 shrink-0 overflow-hidden rounded-full border-2 border-line bg-paper shadow-halo ${className}`}
      style={style}
    >
      <svg
        ref={svg}
        viewBox="0 0 418 235"
        fill="none"
        role="img"
        aria-label="Illustration of Jason"
        className="absolute aspect-418/235 max-w-none origin-[56%_28%] overflow-visible group-hover:animate-wave"
        style={{ left: "-93.07%", top: "23.62%", width: "250.85%" }}
      >
        <CharacterBody />
        {/* Pivots at the neck, in art units */}
        <g className="origin-[240px_106px] animate-bob transform-view motion-reduce:animate-none">
          <CharacterHead />
          <g ref={eyes} className="transition-transform duration-200 ease-out-soft">
            <path
              d={EYE_LEFT_D}
              fill="#010101"
              className="origin-[210.31px_61.98px] transform-view group-data-[blink=once]:animate-blink group-data-[blink=twice]:animate-blink-twice"
            />
            {/* Trails the left eye by 15ms so the blink doesn't feel mechanical */}
            <path
              d={EYE_RIGHT_D}
              fill="#010101"
              className="origin-[235.19px_58px] transform-view [animation-delay:15ms] group-data-[blink=once]:animate-blink group-data-[blink=twice]:animate-blink-twice"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
