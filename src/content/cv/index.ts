import type { ProjectKey } from "@/lib/design-tokens";
import { CONTACT_EMAIL, LINKEDIN_URL, MEDIUM_URL } from "@/lib/site-nav";

/**
 * Content for /cv, from assets/Base-Resume.pdf. Keep the two in sync: the
 * PDF in /public is what the "Download PDF" chip hands out.
 * See "CV page" in design-system.md.
 */
export type CvEntry = {
  org: string;
  role: string;
  dates: string;
  place: string;
  /** Project accent for the dot beside the name; neutral when there isn't one */
  color?: ProjectKey;
  /** Case study on this site */
  caseStudy?: string;
  bullets: string[];
};

export type CvSection = { id: string; title: string; entries: CvEntry[] };

export const CV_PDF = "/jason-jeong-cv.pdf";

export const contact = [
  { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Medium", href: MEDIUM_URL },
];

export const sections: CvSection[] = [
  {
    id: "education",
    title: "Education",
    entries: [
      {
        org: "Northwestern University",
        role: "B.S. in Product Design and Development · GPA 3.84",
        dates: "Expected Mar 2027",
        place: "Evanston, IL",
        bullets: [
          "Coursework: Human-Centered Product Design, UX Design, Digital Product Development, Product Management",
        ],
      },
    ],
  },
  {
    id: "experience",
    title: "Experience",
    entries: [
      {
        org: "Nyck AI",
        role: "Founding Designer",
        dates: "Jan 2026 – Present",
        place: "Hybrid · Chicago, IL",
        color: "nyck",
        bullets: [
          "Build a design system of 150+ tokens and 50+ components, shipped as a developer code package and a Figma library.",
          "Design end-to-end experiences for an AI-powered B2B procurement platform serving midsize food manufacturers.",
          "Conduct competitive analysis of agentic AI procurement products to identify key market differentiators.",
        ],
      },
      {
        org: "Root Inc.",
        role: "Product Design Intern",
        dates: "Jun 2026 – Aug 2026",
        place: "Remote",
        color: "root",
        bullets: [
          "Mapped the core customer journey and sitemap of Root’s product, used in product team alignment sessions.",
          "Designed 16 high-fidelity concepts proposed for the product roadmap, grounded in quantitative Mixpanel and Mode metrics.",
          "Conducted competitive analysis of customer retention strategies across the auto insurance industry.",
        ],
      },
      {
        org: "Shopify",
        role: "Product Management Intern · SEGAL Capstone",
        dates: "Apr 2026 – Jun 2026",
        place: "Evanston, IL",
        color: "shopify",
        caseStudy: "/projects/shopify",
        bullets: [
          "Led a 5-person team through a 3-month Shopify capstone on helping college students start their own businesses.",
          "Ran 8 user interviews and competitor research that invalidated the AI-first brief, reframing the problem around mobile-first selling.",
          "Designed and tested a Shop app redesign letting students build a shop and sell in-app without full store setup, earning 83% approval from 7 student testers.",
        ],
      },
      {
        org: "City of Evanston",
        role: "Digital Services Intern",
        dates: "Sep 2025 – May 2026",
        place: "Evanston, IL",
        bullets: [
          "Redesigned the city website’s navigation to WCAG 2.1 AA standards, improving content hierarchy for 5,000+ residents.",
          "Applied WCAG 2.1 AA standards to a sub-website redesign, delivering an accessible experience to 2,500+ residents.",
          "Analyzed site performance with UX principles and user behavior analytics to identify usability gaps.",
        ],
      },
      {
        org: "Plaza Marketplace",
        role: "Founding Designer",
        dates: "Mar 2025 – Jul 2025",
        place: "Evanston, IL",
        color: "plaza",
        caseStudy: "/projects/plaza",
        bullets: [
          "Designed an end-to-end mobile app launched on the App Store, driving 250+ organic downloads in its first month.",
          "Created a scalable brand guide and cross-platform design system, reducing development time by 75%.",
          "Designed the onboarding experience, achieving a 48% activation rate.",
          "Led design of product and video upload flows, generating 130+ product listings and 30+ video submissions.",
        ],
      },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    entries: [
      {
        org: "Desy AI",
        role: "Founder",
        dates: "Sep 2026 – Present",
        place: "Startup",
        color: "desy",
        bullets: [
          "Building a GitHub-connected design-to-code canvas that lets product designers edit real front-end code and submit changes as pull requests, targeting the design-to-engineering handoff bottleneck.",
          "Conducted and synthesized 15+ discovery interviews into core pain points that defined the 0-to-1 product vision.",
          "Analyzed the competitive landscape of agentic AI research and design tools to shape positioning.",
          "Lead go-to-market strategy and GTM engineering to reach product designers at SaaS companies with separate engineering teams.",
        ],
      },
    ],
  },
  {
    id: "leadership",
    title: "Leadership",
    entries: [
      {
        org: "Quark Design Labs",
        role: "Co-Founder, Co-President & UI/UX Tech Lead",
        dates: "Jan 2025 – Present",
        place: "Northwestern University",
        bullets: [
          "Co-founded a McCormick-recognized design organization, defining its mission and growing membership to 200+ students.",
        ],
      },
    ],
  },
];

export const skills: { label: string; items: string[] }[] = [
  {
    label: "Design & Research",
    items: [
      "UI/UX Design",
      "Design Systems",
      "Design Tokens",
      "Design Engineering",
      "Information Architecture",
      "Journey Mapping",
      "Discovery Interviews",
      "Competitive Analysis",
      "Accessibility (WCAG 2.1 AA)",
      "Agile Sprints",
    ],
  },
  {
    label: "Design Tools",
    items: [
      "Figma",
      "FigJam",
      "Figma Make",
      "Framer",
      "Miro",
      "Spline",
      "KeyShot",
      "Jitter",
      "Adobe Creative Suite",
      "Wix",
      "Datawrapper",
      "Flourish",
    ],
  },
  {
    label: "Code & AI Tools",
    items: ["HTML/CSS", "MATLAB", "Racket", "Claude Code", "Claude Design", "Cursor", "Lovable", "ChatGPT", "Grok"],
  },
];
