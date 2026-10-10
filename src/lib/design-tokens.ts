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
} as const satisfies Record<string, ColorToken>;

export type ProjectKey = keyof typeof projectColors;

export type TypeStyle = {
  label: string;
  className: string;
  spec: string;
};

export const typeScale: TypeStyle[] = [
  { label: "Title", className: "type-title", spec: "Bold / 72px" },
  { label: "Sub-title", className: "type-subtitle", spec: "Bold / 44px" },
  { label: "Heading", className: "type-heading", spec: "Bold / 32px" },
  { label: "Large Body Text", className: "type-body-lg", spec: "Medium / 20px" },
  { label: "Medium Body Text", className: "type-body-md", spec: "Medium / 16px" },
  { label: "Small Body Text", className: "type-body-sm", spec: "Medium / 14px" },
  { label: "Micro / Caption", className: "type-micro", spec: "Bold / 12px / 4% LSP" },
];
