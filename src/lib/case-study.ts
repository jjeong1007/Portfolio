import type { StaticImageData } from "next/image";
import type { PersonaKey } from "@/components/case-study/persona-art";

/**
 * Shape of a case study page (`/projects/[slug]`). Each case study lives in
 * `src/content/case-studies/<slug>/` as an `index.ts` plus its images, and is
 * registered in `src/content/case-studies/index.ts`. Rendered by
 * `components/case-study/editorial-case-study.tsx` (Shopify has its own
 * hand-built page, shopify-editorial.tsx, in the same layout).
 */

export type Figure = {
  src: StaticImageData;
  alt: string;
  caption?: string;
  /** Caps the displayed width in px (framed figures only), for art that reads too large at full width. */
  maxWidth?: number;
  /**
   * Speech bubbles over the image (bleed figures only), e.g. what testers said on that screen.
   * `x` / `y` place each bubble's top-left corner as a percentage of the image.
   */
  callouts?: { quote: string; x: number; y: number }[];
};

/** Lucide icons available to `features`, `merge` and `cards` blocks (drawn in `case-study/icons.tsx`). */
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
  | "users"
  | "graduation"
  | "sparkles";

/** A Golden Circle point, with an optional supporting line set smaller beneath it. */
export type CirclePoint = { text: string; note?: string };

/** A named feature: an icon pill plus, in a `features` block, a description. */
export type Feature = { icon: IconName; title: string; body?: string };

export type Persona = {
  name: string;
  age: number;
  /** Shown after the age, e.g. Amazon Music's personas' favorite artists. */
  favoriteArtist?: string;
  /** Shown after the age instead, for personas without a favorite artist. */
  role?: string;
  body: string;
  /** First-person lines said in a speech bubble when the portrait is hovered; one is picked at random. */
  lines: string[];
  /** Square, transparent-cornered portrait, or a persona drawn live from the rig (persona-art.tsx); shown in a circle. */
  portrait: StaticImageData | PersonaKey;
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
  /**
   * `bento` lays photos out 3 across, alternating a wide (2-column) and a narrow
   * cell per row: list them landscape, portrait, portrait, landscape, … (cropped to fit).
   */
  | { type: "figures"; figures: Figure[]; columns?: 1 | 2 | 3 | 4; fit?: "framed" | "bleed" | "bento" }
  /** Stand-ins for images not exported yet: dashed `bg-surface` cards, each labeled with what goes there. */
  | { type: "placeholder"; labels: string[]; columns?: 1 | 2 | 3 | 4; tall?: boolean }
  /** Titled cards in a grid, e.g. takeaways; `icon` sits above the title in the project color. */
  | { type: "cards"; items: { icon?: IconName; title: string; body: string }[] }
  /** Company logos on `bg-surface` tiles, each named beneath its mark, e.g. competitors. */
  | { type: "logos"; items: { name: string; src: StaticImageData }[] }
  /** Feature pills, each beside its description (label / answer rows). */
  | { type: "features"; items: Feature[] }
  /** Features combined into one: `from` pills + … = `to`. */
  | { type: "merge"; from: Feature[]; to: Feature }
  /** Persona cards: portrait (talks on hover), name, age and favorite artist or role, a short bio. */
  | { type: "personas"; items: Persona[] }
  /** Quote cards: what someone said, with an optional label above and attribution below. */
  | { type: "quotes"; items: { label?: string; quote: string; attribution?: string }[] }
  /** Big numbers with a short label each, e.g. launch metrics. */
  | { type: "stats"; items: { value: string; label: string }[] }
  /** Simon Sinek's Golden Circle: why / how / what cards beside concentric rings in the project accent. */
  | { type: "golden-circle"; why: CirclePoint[]; how: CirclePoint[]; what: CirclePoint[] }
  /**
   * One bar split into shares that add up to 100, e.g. a customer mix. The first
   * share is drawn in the project accent and later ones in lighter tints of it;
   * `from` / `to` label the ends of the range.
   */
  | { type: "breakdown"; from: string; to: string; items: { label: string; value: number; note?: string }[] }
  /** Ranked horizontal bars of percentages, e.g. survey answers; `note` sits under the title (sample size). */
  | { type: "bars"; title: string; note?: string; items: { label: string; value: number }[] }
  /**
   * A Jobs To Be Done map: the main job, then its steps in order (Define, Locate…).
   * A step can name the struggle it surfaced and, in `supports`, the assumption it backs.
   */
  | {
      type: "job-map";
      job: string;
      steps: { stage: string; job: string; struggle?: string; supports?: string }[];
    }
  /**
   * Findings as stacked cards, each with a dot, a title and a line of detail. `negative`
   * marks problems and assumptions (in `negative`); `positive` marks wins and takeaways
   * (in the project accent).
   */
  | { type: "findings"; tone: "negative" | "positive"; items: { title: string; body: string }[] }
  /** Usability test results: the screen tested, what the tester said, and what it told us. */
  | { type: "tests"; items: { figure: Figure; quote: string; finding: string }[] }
  /** One word or framing swapped for another: the old one struck through, the new one in the accent tint. */
  | { type: "reframe"; from: string; to: string }
  /** One large quote on a band tinted with the project accent, e.g. the final validation verdict. */
  | { type: "testimonial"; quote: string; attribution: string }
  /** Feature rows: screens on a `bg-surface` card beside a title and description, alternating sides. */
  /** `mockup` replaces the card with one finished mockup image (device frames baked in), shown uncropped. */
  | { type: "spotlights"; items: { title: string; body: string; figures?: Figure[]; mockup?: Figure }[] };

export type Section = {
  /**
   * Starts a new chapter of the story ("Part one · Research"): a labeled hairline
   * divider above this section, with extra space before it.
   */
  part?: string;
  eyebrow: string;
  title: string;
  /**
   * `statement` sets the title large with an accent rule: use it for the core problem / HMW.
   * `callout` sets the title large on a card tinted with the project accent (or `bg-surface`
   * with `tone: "muted"`, e.g. a first framing that later gets replaced).
   * `showcase` sets the section on a full-bleed band tinted with the project accent, with a
   * centered header and an optional `hero` image under it: use it for the final solution.
   */
  variant?: "statement" | "callout" | "showcase";
  /** `callout` only: `muted` uses `bg-surface` and subtle text instead of the accent tint. */
  tone?: "muted";
  /** `showcase` only: a transparent mockup shown centered under the header. */
  hero?: Figure;
  blocks?: Block[];
};

export type CaseStudy = {
  slug: string;
  /**
   * Confidential: the page shows a password gate until `CASE_STUDY_PASSWORD`
   * is entered. Also add `import "server-only"` to the case study's file.
   */
  protected?: boolean;
  name: string;
  /**
   * `editorial` reads like a long-form article: section headings and body copy are held to
   * a narrower measure (8 of 12 columns) while figures keep the full width, quotes sit three
   * across, and stats are set in the project accent.
   */
  layout?: "editorial";
  /** One line under the title. */
  tagline: string;
  /** Product screens shown side by side on a `bg-surface` card (no baked-in titles or backdrops). Empty shows a placeholder. */
  cover: Figure[];
  context: string;
  /** Label / answer rows: Role, Timeline, Team, Tools… */
  meta: { label: string; values: string[] }[];
  contributions: { title: string; body: string }[];
  sections: Section[];
};
