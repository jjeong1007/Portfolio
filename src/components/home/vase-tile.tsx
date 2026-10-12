"use client";

import type { CSSProperties } from "react";
import { useTileActive } from "./use-tile-active";

/*
 * Art space is the vase's own (Figma 1080:1535, 94.87 × 137 units, mouth
 * centered at 47.4, 5). The svg box adds 60 units of headroom above it for
 * Jason. At rest the vase is 44cqw tall (1 unit = 44 / 137 cqw).
 */
const VASE_W = 94.8701;
const VASE_H = 136.995;
const HEADROOM = 60;
const UNIT = 44 / VASE_H; // cqw per art unit
const BOX_H = VASE_H + HEADROOM;

/* Jason in his bucket hat (public/brand/plaza-character.svg, cropped from the
   design system's character 5 with the hat in Plaza Earth). Scaled so the brim
   is about 1.3× the mouth; his chin rests on the lip, so his collar stays inside. */
const JASON = { x: 12.7, y: -51.2, width: 68, height: 65.28 };
/* Far enough down that he's fully inside the vase */
const HIDDEN_DROP = 61;

const ZOOM_MS = 450;
const SHAKE_MS = 600;

/**
 * The landing page's Plaza tile. At rest it's the Plaza vase. While the tile
 * is hovered (or focused, or in view on touch) the camera zooms into the
 * vase's mouth, the vase rocks left and right twice, and Jason pops out
 * wearing a Plaza Earth bucket hat. Leaving reverses it in 350ms.
 */
export function VaseTile() {
  const [root, active] = useTileActive<HTMLDivElement>();

  const out: CSSProperties = {
    transitionDuration: "350ms",
    transitionTimingFunction: "var(--ease-out-soft)",
    transitionDelay: "0ms",
  };

  return (
    <div ref={root} data-active={active} className="absolute inset-0 overflow-hidden [container-type:size]">
      {/* Zoom: scales around the mouth and moves it down so Jason has room above */}
      <div
        className="absolute transition-[translate,scale]"
        style={{
          left: `${50 - (VASE_W * UNIT) / 2}cqw`,
          top: `${50 - (HEADROOM + VASE_H / 2) * UNIT}cqw`,
          width: `${VASE_W * UNIT}cqw`,
          height: `${BOX_H * UNIT}cqw`,
          transformOrigin: `50% ${((HEADROOM + 5) / BOX_H) * 100}%`,
          translate: active ? `0 ${56 - (50 - (VASE_H / 2 - 5) * UNIT)}cqw` : "0 0",
          scale: active ? "2" : "1",
          ...(active
            ? { transitionDuration: `${ZOOM_MS}ms`, transitionTimingFunction: "var(--ease-out-soft)" }
            : out),
        }}
      >
        {/* Shake: rocks on its base, twice each way, once the zoom lands */}
        <div
          className={`size-full origin-bottom motion-reduce:animate-none ${active ? "animate-vase-shake" : ""}`}
          style={{ animationDelay: `${ZOOM_MS}ms` }}
        >
          <svg
            aria-hidden
            viewBox={`0 ${-HEADROOM} ${VASE_W} ${BOX_H}`}
            className="block size-full overflow-visible"
          >
            <defs>
              {/* Above the rim anything shows; at the rim only what's inside the mouth */}
              <clipPath id="plaza-vase-mouth">
                <rect x={-100} y={-200} width={300} height={194} />
                <rect x={23.1} y={-6} width={47.7} height={11.2} />
              </clipPath>
            </defs>
            <g clipPath="url(#plaza-vase-mouth)">
              <g
                className="transition-[translate]"
                style={{
                  translate: active ? "0 0" : `0 ${HIDDEN_DROP}px`,
                  ...(active
                    ? {
                        transitionDuration: "600ms",
                        transitionTimingFunction: "var(--ease-spring)",
                        transitionDelay: `${ZOOM_MS + SHAKE_MS}ms`,
                      }
                    : out),
                }}
              >
                <image href="/brand/plaza-character.svg" {...JASON} />
              </g>
            </g>
            {/* The vase is drawn over him, so its lip hides where he comes out */}
            <image href="/brand/plaza-vase.svg" x={0} y={0} width={VASE_W} height={VASE_H} />
          </svg>
        </div>
      </div>
    </div>
  );
}
