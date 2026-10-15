import { projectColors, projectTextColors, type ProjectKey } from "@/lib/design-tokens";

export type Project = {
  slug: string;
  name: string;
  category: string;
  color: ProjectKey;
  /** No cover or case study yet; the tile says "Coming soon". */
  comingSoon?: boolean;
  /** Live site. The tile opens it in a new tab instead of a case study. */
  url?: string;
  /** Cover is the project's landing page in a browser window (studio/site-cover.tsx). */
  siteCover?: boolean;
};

/** Grid order (left → right, top → bottom): published case studies first, then coming-soon tiles. */
export const projects: Project[] = [
  { slug: "plaza", name: "Plaza", category: "Mobile App UI", color: "plaza" },
  { slug: "amazon-music", name: "Amazon Music", category: "Mobile App UI", color: "amazon" },
  { slug: "shopify", name: "Shopify", category: "Product Strategy", color: "shopify" },
  { slug: "desy-ai", name: "Desy AI", category: "Product Management", color: "desy", comingSoon: true, siteCover: true },
  { slug: "nyck", name: "Nyck", category: "Design System", color: "nyck", comingSoon: true },
  { slug: "root-inc", name: "Root Inc", category: "Mobile App UI", color: "root", comingSoon: true },
];

/** Landing pages designed for startups, shown on /studio. Tiles link out to the live sites. */
export const studioProjects: Project[] = [
  { slug: "desy-ai", name: "Desy AI", category: "Landing Page", color: "desy", url: "https://desyai.app/", siteCover: true },
  { slug: "referrai", name: "Referrai", category: "Landing Page", color: "referrai", url: "https://referrai-test.vercel.app/", siteCover: true },
];

export function projectHex(project: Project) {
  return projectColors[project.color].hex;
}

/** The project's accent for small text (eyebrows, captions): darkened where the accent is too light. */
export function projectTextHex(project: Project) {
  return projectTextColors[project.color];
}
