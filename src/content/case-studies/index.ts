import type { CaseStudy } from "@/lib/case-study";
import { amazonMusic } from "./amazon-music";
import { plaza } from "./plaza";
import { shopify } from "./shopify";

/** Every published case study, keyed by project slug (see lib/projects.ts). */
export const caseStudies: Record<string, CaseStudy> = {
  [plaza.slug]: plaza,
  [amazonMusic.slug]: amazonMusic,
  [shopify.slug]: shopify,
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}
