"use client";

import { useLayoutEffect } from "react";

/**
 * Mirrors a page's grid onto `<html data-grid>` so the GridOverlay (outside
 * `<main>`) follows it. Render it inside a `<main data-grid="…">`. The effect
 * cleans up when the page unmounts or Next hides it on navigation, so the
 * next page falls back to the page grid.
 */
export function PageGrid({ grid }: { grid: "case-study" }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.grid = grid;
    return () => {
      delete root.dataset.grid;
    };
  }, [grid]);
  return null;
}
