"use client";

import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/components/ui/toast";
import { navLinks, transitionFor } from "@/lib/site-nav";

const linkClass =
  "type-body-md rounded-tab px-1 py-1 text-ink transition-colors duration-150 hover:text-ink-subtle";

/**
 * Sticky top bar on every page (rendered in the root layout): logo mark +
 * links, centered on a bottom border (Figma 94:8094). Its height is
 * `--nav-height`; anything else sticky should sit below it.
 */
export function Navbar() {
  const toast = useToast();

  return (
    <header
      className="sticky top-0 z-30 h-(--nav-height) border-b border-line bg-paper/90 backdrop-blur-md"
      // Own snapshot so page transitions leave it anchored (see globals.css)
      style={{ viewTransitionName: "site-nav" }}
    >
      <nav
        aria-label="Main"
        className="flex h-full items-center justify-center gap-6 px-(--gutter)"
      >
        <Link href="/" transitionTypes={transitionFor("/")} aria-label="Jason Jeong, home" className="shrink-0">
          <Image
            src="/brand/logo-mark-small.svg"
            alt=""
            width={32}
            height={32}
            className="transition-transform duration-300 ease-spring hover:scale-110 hover:-rotate-12"
          />
        </Link>
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              {"href" in link ? (
                <Link href={link.href} transitionTypes={transitionFor(link.href)} className={linkClass}>
                  {link.label}
                </Link>
              ) : (
                <button type="button" onClick={() => toast(link.message)} className={linkClass}>
                  {link.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
