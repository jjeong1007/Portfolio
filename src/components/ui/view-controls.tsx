"use client";

import { useEffect, useState } from "react";

/**
 * Top-right panel of the Navbar (Figma 164:1204): the "Show my system" switch
 * and the light / dark toggle. For now they only flag `<html>` with
 * `data-system="on"` and `data-theme="dark"`; the grid overlay and the dark
 * palette will key off those attributes.
 */
export function ViewControls() {
  const [system, setSystem] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (system) document.documentElement.dataset.system = "on";
    else delete document.documentElement.dataset.system;
  }, [system]);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <div className="flex items-center gap-6 rounded-full border border-line bg-paper px-8 py-3">
      <button
        type="button"
        role="switch"
        aria-checked={system}
        onClick={() => setSystem((on) => !on)}
        className="type-body-md group flex items-center gap-4 rounded-tab text-ink"
      >
        Show my system
        <span
          aria-hidden
          className={`relative h-6 w-10 shrink-0 rounded-full transition-colors duration-200 ${
            system ? "bg-ink" : "bg-ink-faint group-hover:bg-ink-subtle"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-paper transition-transform duration-300 ease-spring ${
              system ? "translate-x-4" : ""
            }`}
          />
        </span>
      </button>
      <span aria-hidden className="h-6 w-px bg-line" />
      <button
        type="button"
        aria-pressed={dark}
        aria-label="Dark mode"
        onClick={() => setDark((on) => !on)}
        className="relative size-6 shrink-0 rounded-tab text-ink transition-colors duration-150 hover:text-ink-subtle"
      >
        <ThemeIcon shown={!dark}>
          {/* Lucide sun */}
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2m-7.07-14.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </ThemeIcon>
        <ThemeIcon shown={dark}>
          {/* Lucide moon */}
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </ThemeIcon>
      </button>
    </div>
  );
}

/** Sun and moon stack in one spot; the outgoing one spins away as the other spins in. */
function ThemeIcon({ shown, children }: { shown: boolean; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`absolute inset-0 transition-[opacity,rotate,scale] duration-300 ease-spring ${
        shown ? "opacity-100" : "scale-50 -rotate-90 opacity-0"
      }`}
    >
      {children}
    </svg>
  );
}
