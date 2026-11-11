import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { PageTransition } from "@/components/ui/page-transition";
import { contact, CV_PDF, sections, skills, type CvEntry } from "@/content/cv";
import { NAV_FORWARD } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "CV",
  description: "Jason Jeong’s resume: design, UX and product experience at Nyck AI, Root, Shopify, the City of Evanston and Plaza.",
};

/** Staggered entrance: each block rises in 80ms after the previous one. */
const rise = (step: number): CSSProperties => ({ animationDelay: `${step * 80}ms` });

/**
 * The resume as a page (content from assets/Base-Resume.pdf). A left-aligned
 * title and contact chips, then each section, all in the middle 10 columns:
 * dates and place in 3, the entry in 7. See "CV page" in design-system.md.
 */
export default function CvPage() {
  return (
    <PageTransition>
      <main className="pb-(--space-section)">
        {/* Left aligned with the sections below: the middle 10 columns from lg */}
        <Container as="header" grid className="pt-24">
          <div className="lg:col-span-10 lg:col-start-2">
            <h1 className="type-title animate-rise leading-[1.07]!" style={rise(0)}>
              My experience
            </h1>

            <ul className="mt-8 flex animate-rise flex-wrap gap-2" style={rise(1)}>
              {contact.map((c) => (
                <li key={c.href}>
                  <Chip href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {c.label}
                  </Chip>
                </li>
              ))}
              <li>
                <Chip href={CV_PDF} download className="gap-2 border-ink! bg-ink! text-paper! hover:bg-ink-body!">
                  <DownloadIcon />
                  Download PDF
                </Chip>
              </li>
            </ul>
          </div>
        </Container>

        <Container grid>
          <div className="mt-18 animate-rise space-y-(--space-section) lg:col-span-10 lg:col-start-2" style={rise(2)}>
            {sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 id={section.id} className="type-heading border-b border-ink pb-3">
                  {section.title}
                </h2>
                <ol>
                  {section.entries.map((entry) => (
                    <Entry key={entry.org} entry={entry} />
                  ))}
                </ol>
              </section>
            ))}

            <section aria-labelledby="skills">
              <h2 id="skills" className="type-heading border-b border-ink pb-3">
                Skills
              </h2>
              <dl>
                {skills.map((group) => (
                  <div key={group.label} className="grid gap-3 border-b border-line py-8 md:grid-cols-10">
                    <dt className="type-micro pt-2 text-ink-subtle md:col-span-3">{group.label}</dt>
                    <dd className="flex flex-wrap gap-2 md:col-span-7">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="type-body-sm rounded-control border border-line bg-paper px-3 py-1 text-ink"
                        >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </Container>
      </main>
    </PageTransition>
  );
}

function Entry({ entry }: { entry: CvEntry }) {
  return (
    <li className="grid gap-3 border-b border-line py-8 md:grid-cols-10">
      <div className="type-body-sm text-ink-subtle md:col-span-3">
        <p className="text-ink">{entry.dates}</p>
        <p>{entry.place}</p>
      </div>

      <div className="md:col-span-7">
        <h3 className="type-subheading flex items-center gap-2">
          <span
            aria-hidden
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: entry.color ? `var(--color-${entry.color})` : "var(--color-ink-faint)" }}
          />
          {entry.org}
        </h3>
        <p className="type-body-md mt-1 text-ink-body">{entry.role}</p>

        <ul className="type-body-md mt-4 space-y-2 text-ink-body">
          {entry.bullets.map((b) => (
            <li key={b} className="relative pl-4 before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-ink-faint">
              {b}
            </li>
          ))}
        </ul>

        {entry.caseStudy && (
          <Link
            href={entry.caseStudy}
            transitionTypes={NAV_FORWARD}
            className="group type-body-md mt-4 inline-flex items-center gap-1 text-ink underline decoration-line underline-offset-4 transition-colors duration-150 hover:decoration-ink"
          >
            Read the case study
            <span aria-hidden className="transition-transform duration-200 ease-spring group-hover:translate-x-1">
              →
            </span>
          </Link>
        )}
      </div>
    </li>
  );
}

/** Lucide download */
function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 15V3" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}
