"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { useToast } from "@/components/ui/toast";
import { useHome } from "@/components/ui/use-home";
import {
  CONTACT_EMAIL,
  LINKEDIN_URL,
  MEDIUM_URL,
  navLinks,
  transitionFor,
  withHome,
  type NavPrompt,
} from "@/lib/site-nav";

const WORDMARK = "Jason Jeong";

const linkClass = "type-body-md text-ink transition-colors duration-150 hover:text-ink-subtle";

/**
 * The site footer, rendered once in the root layout under every page: a
 * call to action with a copy-email chip, page and profile links, a giant
 * wordmark whose letters spring up on hover, and the copyright row.
 * See "Footer" in design-system.md.
 */
export function Footer() {
  const toast = useToast();
  const home = useHome();
  const pages: NavPrompt[] = [...withHome(navLinks, home), { label: "Design system", href: "/design-system" }];

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      toast("Email copied. Talk soon!");
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  }

  return (
    <footer className="overflow-x-clip border-t border-line">
      <Container grid className="gap-y-16 pt-18">
        <div className="md:col-span-7 lg:col-span-7">
          <p className="type-micro text-ink-subtle">Say hi</p>
          <p className="type-subtitle mt-2 leading-[1.07]!">
            Let’s build something
            <span className="block font-medium!">people smile about.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <Chip onClick={copyEmail} className="gap-2 border-ink! bg-ink! text-paper! hover:bg-ink-body!">
              <Icon>
                {/* Lucide copy */}
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </Icon>
              Copy my email
            </Chip>
            {LINKEDIN_URL && (
              <Chip href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </Chip>
            )}
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-3 md:col-span-5 md:grid-cols-5 lg:col-span-4 lg:col-start-9 lg:grid-cols-4">
          <LinkGroup title="Pages" className="md:col-span-2 md:col-start-2 lg:col-start-1">
            {pages.map((page) =>
              "href" in page ? (
                <li key={page.label}>
                  <Link href={page.href} transitionTypes={transitionFor(page.href)} className={linkClass}>
                    {page.label}
                  </Link>
                </li>
              ) : null,
            )}
          </LinkGroup>
          <LinkGroup title="Elsewhere" className="md:col-span-2">
            {LINKEDIN_URL && <External href={LINKEDIN_URL}>LinkedIn</External>}
            <External href={MEDIUM_URL}>Medium</External>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                Email
              </a>
            </li>
          </LinkGroup>
        </nav>
      </Container>

      {/* Decorative: each letter springs up and darkens on hover */}
      <Container className="@container mt-16">
        <p
          aria-hidden
          className="font-display relative -mb-[0.075em] flex justify-between leading-[0.8] font-bold tracking-tight text-line select-none [font-variation-settings:'opsz'_14]"
          // Sized so the two words fill the width with a ~0.25em gap between them. The negative
          // margin drops the box bottom onto the baseline, so the rule below sits flush under
          // the letters and the "g" hangs over it (relative keeps it in front of the rule).
          style={{ fontSize: "18.5cqw" }}
        >
          {WORDMARK.split(" ").map((word) => (
            <span key={word} className="flex">
              {[...word].map((ch, i) => (
                <span
                  key={i}
                  className="inline-block transition-[translate,color] duration-500 ease-spring hover:-translate-y-[0.12em] hover:text-ink hover:duration-200"
                >
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </p>
      </Container>

      <Container className="type-body-sm flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line py-6 text-ink-subtle">
        <p>© 2026 Jason Jeong</p>
        <p>Designed in Figma, built with Next.js</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0 })}
          className="group inline-flex items-center gap-1 text-ink transition-colors duration-150 hover:text-ink-subtle"
        >
          Back to top
          <span aria-hidden className="transition-transform duration-200 ease-spring group-hover:-translate-y-1">
            ↑
          </span>
        </button>
      </Container>
    </footer>
  );
}

function LinkGroup({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <p className="type-micro text-ink-subtle">{title}</p>
      <ul className="mt-4 space-y-2">{children}</ul>
    </div>
  );
}

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-1 ${linkClass}`}>
        {children}
        <span
          aria-hidden
          className="text-ink-subtle transition-transform duration-200 ease-spring group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          ↗
        </span>
      </a>
    </li>
  );
}

function Icon({ children }: { children: ReactNode }) {
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
      {children}
    </svg>
  );
}
