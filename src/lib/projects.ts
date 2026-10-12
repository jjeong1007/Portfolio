import { projectColors, type ProjectKey } from "@/lib/design-tokens";

export type Project = {
  slug: string;
  name: string;
  category: string;
  color: ProjectKey;
  /** No cover or case study yet; the tile says "Coming soon". */
  comingSoon?: boolean;
};

/** Order matches the Figma grid (left → right, top → bottom). */
export const projects: Project[] = [
  { slug: "desy-ai", name: "Desy AI", category: "Product Management", color: "desy", comingSoon: true },
  { slug: "nyck", name: "Nyck", category: "Design System", color: "nyck", comingSoon: true },
  { slug: "root-inc", name: "Root Inc", category: "Mobile App UI", color: "root", comingSoon: true },
  { slug: "shopify", name: "Shopify", category: "Product Strategy", color: "shopify", comingSoon: true },
  { slug: "plaza", name: "Plaza", category: "Mobile App UI", color: "plaza" },
  { slug: "amazon-music", name: "Amazon Music", category: "Mobile App UI", color: "amazon" },
];

export function projectHex(project: Project) {
  return projectColors[project.color].hex;
}
