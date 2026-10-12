"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type Group = { tab: string; id: string; label: string; sections: { id: string; label: string }[] };

/** Every heading the rail links to, grouped by the tab whose panel holds it. */
const groups: Group[] = [
  {
    tab: "foundations",
    id: "foundations-title",
    label: "Foundations",
    sections: [
      { id: "mood-title", label: "Mood & Tone" },
      { id: "color-title", label: "Color palette" },
      { id: "type-title", label: "Typography" },
      { id: "spacing-title", label: "Spacing" },
      { id: "motion-title", label: "Motion" },
    ],
  },
  {
    tab: "assets",
    id: "assets-title",
    label: "Assets",
    sections: [
      { id: "logo-title", label: "Logo mark" },
      { id: "char-title", label: "Characters" },
      { id: "icon-title", label: "Icons" },
    ],
  },
];

const OVERVIEW = "overview";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/** Space above a heading once it's scrolled to: the sticky Navbar + Tabs bar + the panel's 36px top padding. */
function stickyOffset() {
  const root = getComputedStyle(document.documentElement);
  return parseFloat(root.getPropertyValue("--nav-height")) + parseFloat(root.getPropertyValue("--tabs-height")) + 36;
}

/**
 * Table of contents for /design-system, in the sticky rail beside the tab
 * panels. Picking a section in the other tab switches tabs first (the tab
 * lives in the URL hash, like `Tabs`), then scrolls to the heading and moves
 * focus to it. The section being read is marked as the current one.
 */
export function ContentsNav() {
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => groups[0].tab,
  );
  const activeTab = groups.find((g) => g.tab === hash)?.tab ?? groups[0].tab;
  const [current, setCurrent] = useState(OVERVIEW);

  // Scroll spy: the last heading of the open tab that has passed under the sticky bars
  useEffect(() => {
    const group = groups.find((g) => g.tab === activeTab)!;
    const ids = [group.id, ...group.sections.map((s) => s.id)];
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = stickyOffset() + 48;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let next = OVERVIEW;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) next = id;
      }
      setCurrent(atBottom && next !== OVERVIEW ? ids[ids.length - 1] : next);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [activeTab]);

  function go(tab: string | null, id: string) {
    if (tab && tab !== activeTab) {
      history.replaceState(null, "", `#${tab}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    // Wait for the other panel to un-hide before measuring
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (id === OVERVIEW) {
          window.scrollTo({ top: 0 });
          return;
        }
        const el = document.getElementById(id);
        if (!el) return;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - stickyOffset() });
        el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      }),
    );
  }

  function link(tab: string | null, id: string, label: string, level: "top" | "section") {
    const isCurrent = current === id;
    return (
      <button
        type="button"
        onClick={() => go(tab, id)}
        aria-current={isCurrent ? "location" : undefined}
        className={`-ml-px block w-full border-l-2 py-1 text-left transition-colors duration-150 hover:text-ink ${
          level === "top" ? "type-body-md pl-3" : "type-body-sm pl-6"
        } ${isCurrent ? "border-ink text-ink" : `border-transparent ${level === "top" ? "text-ink" : "text-ink-subtle"}`}`}
      >
        {label}
      </button>
    );
  }

  return (
    <nav aria-label="Design system contents">
      <p className="type-micro text-ink-subtle">Contents</p>
      <ul className="mt-3 border-l border-line">
        <li>{link(null, OVERVIEW, "Overview", "top")}</li>
        {groups.map((g) => (
          <li key={g.tab} className="mt-3">
            {link(g.tab, g.id, g.label, "top")}
            <ul>
              {g.sections.map((s) => (
                <li key={s.id}>{link(g.tab, s.id, s.label, "section")}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
