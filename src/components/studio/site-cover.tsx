"use client";

import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { useTileActive } from "@/components/home/use-tile-active";
import desySite from "@/content/studio/desy-site.jpg";
import referraiSite from "@/content/studio/referrai-site.jpg";

/**
 * Covers for the /studio tiles: the client's landing page in a browser
 * window, on a backdrop drawn in that client's brand. At rest the window
 * shows the hero; while the tile is hovered (or focused, or in view on
 * touch) the window lifts and the page scrolls through inside it, so the
 * tile shows the work itself.
 *
 * The backdrop and window colors are the clients' brand colors, not ours,
 * so they live here rather than in the design tokens (like NOTE_COLORS in
 * case-study/jam-cover.tsx).
 */

type Site = {
  shot: StaticImageData;
  alt: string;
  /** Shown in the window's address bar. */
  domain: string;
  backdrop: string;
  /** The site's page color, behind the screenshot and the window chrome. */
  canvas: string;
  /** The screenshot is the site's light theme, so the window chrome goes dark-on-light. */
  light?: boolean;
};

const SITES: Record<string, Site> = {
  "desy-ai": {
    shot: desySite,
    alt: "Desy AI landing page in light mode: “De-risk your idea before wasting 6 months on it.” above a product dashboard",
    domain: "desyai.app",
    // Desy's showcase panels: a sunlit yellow → orange → red sweep
    backdrop:
      "radial-gradient(90% 80% at 0% 0%, #FFC21A 0%, #FFC21A00 60%), radial-gradient(70% 70% at 100% 100%, #B3120B 0%, #B3120B00 70%), linear-gradient(140deg, #F9A30B 0%, #EF6A1A 50%, #D3321A 100%)",
    canvas: "#FFFFFF",
    light: true,
  },
  referrai: {
    shot: referraiSite,
    alt: "Referrai landing page: “Reach your career apex at remarkable speeds.” beside the orange logo mark",
    domain: "referrai-test.vercel.app",
    // Referrai's warm near-black canvas, lit from below by the brand orange
    backdrop:
      "radial-gradient(120% 85% at 50% 125%, #FF5C0A 0%, #FF5C0A99 35%, #FF5C0A00 72%), radial-gradient(55% 45% at 100% 0%, #FF5C0A4D 0%, #FF5C0A00 70%), #171714",
    canvas: "#171714",
  },
};

/** The window's chrome height, in cqw so it scales with the tile. */
const BAR = "4.2cqw";

export function SiteCover({ slug }: { slug: string }) {
  const [root, active] = useTileActive<HTMLDivElement>();
  const site = SITES[slug];
  if (!site) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="absolute inset-0 overflow-hidden [container-type:size]"
      style={{ background: site.backdrop }}
    >
      {/* Faint dot grid, the texture both sites put behind their heroes */}
      <span
        className="absolute inset-0 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(circle, #FFFFFF 1px, transparent 1.2px)",
          backgroundSize: "2.4cqw 2.4cqw",
        }}
      />

      {/* The window runs off the tile's bottom edge, like the case study covers */}
      <div
        className="absolute top-[13cqh] left-[9cqw] flex h-[96cqh] w-[82cqw] flex-col overflow-hidden rounded-t-[1.6cqw] shadow-[0_2cqw_6cqw_rgba(0,0,0,0.35)] ring-1 transition-[translate,scale] duration-500 ease-out-soft"
        style={{
          background: site.canvas,
          // Hairline edge: light on the dark window, dark on the light one
          "--tw-ring-color": site.light ? "rgb(0 0 0 / 0.08)" : "rgb(255 255 255 / 0.12)",
          translate: active ? "0 -5cqh" : "0 0",
          scale: active ? "1.03" : "1",
          transformOrigin: "50% 100%",
        } as CSSProperties}
      >
        <div className="flex shrink-0 items-center gap-[0.8cqw] px-[1.6cqw]" style={{ height: BAR }}>
          {[0, 1, 2].map((dot) => (
            <span key={dot} className={`size-[1cqw] rounded-full ${site.light ? "bg-black/14" : "bg-white/22"}`} />
          ))}
          <span className={`mx-auto flex h-[2.4cqw] w-[38%] items-center justify-center rounded-[0.6cqw] text-[1.4cqw] leading-none font-medium ${
              site.light ? "bg-black/5 text-black/45" : "bg-white/8 text-white/55"
            }`}>
            {site.domain}
          </span>
          {/* Balances the dots so the address stays centered */}
          <span className="w-[4.6cqw]" />
        </div>
        <div className="relative flex-1 overflow-hidden" style={{ "--vp": `calc(96cqh - ${BAR})` } as CSSProperties}>
          <Image
            src={site.shot}
            alt={site.alt}
            sizes="(min-width: 640px) 50vw, 100vw"
            placeholder="blur"
            className="h-auto w-full transition-[translate] motion-reduce:transition-none"
            style={{
              // Scroll to the bottom of the screenshot while active; back to the hero after
              translate: active ? "0 calc(-100% + var(--vp))" : "0 0",
              transitionDuration: active ? "6s" : "700ms",
              transitionTimingFunction: active ? "cubic-bezier(0.45, 0, 0.55, 1)" : "var(--ease-out-soft)",
              transitionDelay: active ? "250ms" : "0ms",
            }}
          />
        </div>
      </div>
    </div>
  );
}
