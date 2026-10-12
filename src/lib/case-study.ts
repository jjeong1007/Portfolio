import type { StaticImageData } from "next/image";

/**
 * Shape of a case study page (`/projects/[slug]`). Each case study lives in
 * `src/content/case-studies/<slug>/` as an `index.ts` plus its images, and is
 * registered in `src/content/case-studies/index.ts`. Rendered by
 * `components/case-study/case-study-page.tsx`.
 */

export type Figure = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

/** Lucide icons available to `features` and `merge` blocks (drawn in `case-study/icons.tsx`). */
export type IconName =
  | "locate"
  | "gamepad"
  | "inbox"
  | "mic"
  | "calendar"
  | "palette"
  | "layout"
  | "route"
  | "map"
  | "video"
  | "bag"
  | "users";

/** A named feature: an icon pill plus, in a `features` block, a description. */
export type Feature = { icon: IconName; title: string; body?: string };

export type Persona = {
  name: string;
  age: number;
  favoriteArtist: string;
  body: string;
  /** First-person lines said in a speech bubble when the portrait is hovered; one is picked at random. */
  lines: string[];
  /** Square, transparent-cornered portrait; shown in a circle. */
  portrait: StaticImageData;
};

export type Block =
  /** Body paragraphs (`ink-body`, full width). */
  | { type: "text"; paragraphs: string[] }
  /** A bulleted list. */
  | { type: "list"; items: string[] }
  /** One emphasized line in `ink`, e.g. the question a section ends on. */
  | { type: "emphasis"; text: string }
  /** A smaller heading inside a section, with its own paragraphs. */
  | { type: "subheading"; title: string; paragraphs: string[] }
  /**
   * Images. `framed` (default) sits them on a `bg-surface` card with padding,
   * for transparent graphics; `bleed` lets photos and full-bleed art fill the card.
   */
  | { type: "figures"; figures: Figure[]; columns?: 1 | 2 | 3 | 4; fit?: "framed" | "bleed" }
  /** Titled cards in a grid, e.g. takeaways. */
  | { type: "cards"; items: { title: string; body: string }[] }
  /** Feature pills, each beside its description (label / answer rows). */
  | { type: "features"; items: Feature[] }
  /** Features combined into one: `from` pills + … = `to`. */
  | { type: "merge"; from: Feature[]; to: Feature }
  /** Persona cards: portrait (talks on hover), name, age and favorite artist, a short bio. */
  | { type: "personas"; items: Persona[] }
  /** Quote cards: what someone said, with an optional label above and attribution below. */
  | { type: "quotes"; items: { label?: string; quote: string; attribution?: string }[] }
  /** Big numbers with a short label each, e.g. launch metrics. */
  | { type: "stats"; items: { value: string; label: string }[] }
  /** Feature rows: screens on a `bg-surface` card beside a title and description, alternating sides. */
  | { type: "spotlights"; items: { title: string; body: string; figures: Figure[] }[] };

export type Section = {
  eyebrow: string;
  title: string;
  /** `statement` sets the title large with an accent rule: use it for the core problem / HMW. */
  variant?: "statement";
  blocks?: Block[];
};

export type CaseStudy = {
  slug: string;
  name: string;
  /** One line under the title. */
  tagline: string;
  /** Product screens shown side by side on a `bg-surface` card (no baked-in titles or backdrops). */
  cover: Figure[];
  context: string;
  /** Label / answer rows: Role, Timeline, Team, Tools… */
  meta: { label: string; values: string[] }[];
  contributions: { title: string; body: string }[];
  sections: Section[];
};
