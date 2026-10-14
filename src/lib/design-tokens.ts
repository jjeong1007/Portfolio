/**
 * Typed mirror of the tokens in `src/app/globals.css`.
 * Use these when a component needs token *data* (names, hex values, project
 * accents) rather than a class. Hex values must match globals.css.
 */

export type ColorToken = {
  name: string;
  token: string;
  hex: string;
  /** Text color that sits on top of this fill */
  on: "light" | "dark";
};

export const neutrals = {
  black: { name: "Primary Black", token: "ink", hex: "#000000", on: "light" },
  text: { name: "Text", token: "ink-body", hex: "#525252", on: "light" },
  subtle: { name: "Subtle Text", token: "ink-subtle", hex: "#808080", on: "light" },
  border: { name: "Borders", token: "line", hex: "#E5E5E5", on: "dark" },
  surface: { name: "Secondary BG", token: "surface", hex: "#F2F2F2", on: "dark" },
  white: { name: "White", token: "paper", hex: "#FFFFFF", on: "dark" },
} as const satisfies Record<string, ColorToken>;

export const projectColors = {
  desy: { name: "Desy Burnt Sienna", token: "desy", hex: "#DF5732", on: "light" },
  nyck: { name: "Nyck Blue", token: "nyck", hex: "#0E6DF9", on: "light" },
  root: { name: "Root Carrot", token: "root", hex: "#FD5726", on: "light" },
  plaza: { name: "Plaza Earth", token: "plaza", hex: "#A34414", on: "light" },
  shopify: { name: "Shopify Forest", token: "shopify", hex: "#95BF47", on: "light" },
  amazon: { name: "Amazon Rain", token: "amazon", hex: "#26CAD3", on: "light" },
  referrai: { name: "Referrai Orange", token: "referrai", hex: "#FF5C0A", on: "light" },
} as const satisfies Record<string, ColorToken>;

export type ProjectKey = keyof typeof projectColors;

/**
 * Accent shades for small text (eyebrows, captions). Shopify and Amazon are
 * (and Referrai) are too light to read at 12px on white, so they get a darker shade (Shopify's
 * is from the Figma); the rest are readable as-is.
 */
export const projectTextColors = {
  desy: "#DF5732",
  nyck: "#0E6DF9",
  root: "#FD5726",
  plaza: "#A34414",
  shopify: "#5E8E3E",
  amazon: "#188389",
  referrai: "#C94A08",
} as const satisfies Record<ProjectKey, string>;

export type TypeStyle = {
  label: string;
  className: string;
  spec: string;
};

export const typeScale: TypeStyle[] = [
  { label: "Title", className: "type-title", spec: "Bold / 72px" },
  { label: "Sub-title", className: "type-subtitle", spec: "Bold / 44px" },
  { label: "Heading", className: "type-heading", spec: "Bold / 32px" },
  { label: "Subheading", className: "type-subheading", spec: "Bold / 20px" },
  { label: "Large Body Text", className: "type-body-lg", spec: "Medium / 20px" },
  { label: "Medium Body Text", className: "type-body-md", spec: "Medium / 16px" },
  { label: "Small Body Text", className: "type-body-sm", spec: "Medium / 14px" },
  { label: "Micro / Caption", className: "type-micro", spec: "Bold / 12px / 4% LSP" },
];

/* ---- Spacing: a 4pt grid ------------------------------------------------ */

export type SpaceStep = {
  px: number;
  /** Tailwind class suffix (`gap-3`, `mt-18`) or the CSS variable that holds it */
  token: string;
  use: string;
};

/** The steps the design actually uses. Every value is a multiple of 4. */
export const spacingScale: SpaceStep[] = [
  { px: 4, token: "1", use: "Eyebrow → heading, between tabs" },
  { px: 8, token: "2", use: "Icon → label, Sub-title → body, chip gaps" },
  { px: 12, token: "3", use: "Card grid gap, control padding (x)" },
  { px: 16, token: "4", use: "Gutter on mobile, bubble padding" },
  { px: 20, token: "5", use: "Neutral swatch rows" },
  { px: 24, token: "6 · --space-paragraph", use: "Between paragraphs, stacked groups" },
  { px: 40, token: "10 · --space-intro", use: "Section intro → its content" },
  { px: 48, token: "12", use: "Swatch columns, card padding (lg)" },
  { px: 72, token: "18", use: "Column gaps, page top padding" },
  { px: 136, token: "34 · --space-section", use: "Between sections (96 tablet, 72 mobile)" },
];

/* ---- Motion ------------------------------------------------------------- */

export type Easing = { token: string; curve: string; use: string };

/** Mirrors the `--ease-*` tokens in globals.css. */
export const easings: Easing[] = [
  { token: "ease-out-soft", curve: "cubic-bezier(0.22, 1, 0.36, 1)", use: "Default for UI: hovers, entrances, fades" },
  { token: "ease-spring", curve: "cubic-bezier(0.34, 1.56, 0.64, 1)", use: "Playful overshoot: chip lift, menus, bubbles" },
  { token: "ease-sway", curve: "cubic-bezier(0.37, 0, 0.63, 1)", use: "Looping back-and-forth: the head bob" },
  { token: "ease-lid", curve: "cubic-bezier(0.45, 0, 0.9, 0.55)", use: "Closing fast and snapping shut: eyelids" },
  { token: "ease-rebound", curve: "cubic-bezier(0, 0.55, 0.45, 1)", use: "The release after a squash: eyes opening" },
];

export type Duration = { label: string; value: string; use: string };

export const durations: Duration[] = [
  { label: "Feedback", value: "150–200ms", use: "Hover, press, color changes" },
  { label: "Overlay", value: "250ms", use: "Menus and speech bubbles, with ease-spring" },
  { label: "Page exit / enter", value: "220ms / 520ms", use: "Route changes: fade, drift and blur" },
  { label: "Entrance", value: "700ms", use: "animate-rise, staggered 80ms" },
  { label: "Accent", value: "180ms / 450ms", use: "animate-blink / animate-blink-twice" },
  { label: "Idle loop", value: "3.2s", use: "animate-bob, infinite" },
];
