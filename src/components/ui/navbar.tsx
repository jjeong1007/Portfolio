"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/toast";
import { useHome } from "@/components/ui/use-home";
import { LINKEDIN_URL, navLinks, transitionFor, withHome, type NavPrompt } from "@/lib/site-nav";

const linkClass =
  "type-body-md rounded-tab text-ink transition-colors duration-150 hover:text-ink-subtle";

/** Scrolled past this many px, the bar picks up its liquid glass background. */
const GLASS_AFTER = 8;

/** Whether the page has scrolled away from the very top. */
function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > GLASS_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function NavItem({ link, onToast }: { link: NavPrompt; onToast: (message: string) => void }) {
  if ("message" in link) {
    return (
      <button type="button" onClick={() => onToast(link.message)} className={linkClass}>
        {link.label}
      </button>
    );
  }
  // External links (a CV PDF hosted elsewhere) open in a new tab; site pages use the page transition
  if (/^https?:/.test(link.href) || link.href.endsWith(".pdf")) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} transitionTypes={transitionFor(link.href)} className={linkClass}>
      {link.label}
    </Link>
  );
}

/**
 * Top bar on every page (rendered in the root layout, Figma 240:6001): the
 * logo mark and page links on the left, LinkedIn on the right, on the page
 * grid's frame. At the top of the page it has no fill; once scrolled it picks
 * up a full-width liquid glass background (translucent page color, blur and
 * saturation, `shadow-glass`) so content reads as passing under it.
 * For visitors who came from /studio, the logo and Projects link go back
 * there instead of "/" (use-home.ts).
 */
export function Navbar() {
  const toast = useToast();
  const home = useHome();
  const links = withHome(navLinks, home);
  const scrolled = useScrolled();

  return (
    <header
      className={`sticky top-0 z-30 h-(--nav-height) transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out-soft ${
        scrolled
          ? "bg-page/65 shadow-glass backdrop-blur-xl backdrop-saturate-[1.8]"
          : "bg-transparent shadow-none backdrop-blur-none"
      }`}
      // Own snapshot so page transitions leave it anchored (see globals.css)
      style={{ viewTransitionName: "site-nav" }}
    >
      {/* Always on the page grid's frame, so it doesn't shift on case studies */}
      <div className="mx-auto flex h-full max-w-[calc(var(--container-content)+var(--gutter)*2)] items-center justify-between gap-4 px-(--gutter)">
        <nav aria-label="Main" className="flex items-center gap-4 md:gap-6">
          <Link href={home} transitionTypes={transitionFor(home)} aria-label="Jason Jeong, home" className="shrink-0">
            <Image
              src="/brand/logo-mark-small.svg"
              alt=""
              width={24}
              height={24}
              className="transition-transform duration-300 ease-spring hover:scale-110 hover:-rotate-12"
            />
          </Link>
          <ul className="flex items-center gap-4 md:gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <NavItem link={link} onToast={toast} />
              </li>
            ))}
          </ul>
        </nav>
        {LINKEDIN_URL ? (
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
            linkedin
          </a>
        ) : (
          <button type="button" onClick={() => toast("LinkedIn link coming soon!")} className={linkClass}>
            linkedin
          </button>
        )}
      </div>
    </header>
  );
}
