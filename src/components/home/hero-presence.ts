"use client";

import { useLayoutEffect, useSyncExternalStore, type RefObject } from "react";

/**
 * Does this page have a header character (TalkingAvatar, marked
 * `data-hero-avatar`)? The header avatar reports itself with `useReportHero`;
 * the Companion reads `useHeroOnPage` and stays hidden for the whole page, so
 * there's only ever one Jason. Scrolling doesn't bring the Companion in.
 */
let present = false;
let watched: Element | null = null;
let scanned = false;
const listeners = new Set<() => void>();

function set(next: boolean) {
  if (next === present) return;
  present = next;
  listeners.forEach((l) => l());
}

function watch(el: Element) {
  watched = el;
  set(true);
}

function unwatch(el: Element) {
  if (el !== watched) return;
  watched = null;
  set(false);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * The first client read looks for a header avatar in the server HTML, so the
 * answer is right even before the page content has hydrated (no flash).
 */
function getSnapshot() {
  if (!scanned) {
    scanned = true;
    const el = document.querySelector("[data-hero-avatar]");
    if (el) watch(el);
  }
  return present;
}

/** Server HTML assumes a header character is showing, so the companion never flashes in on load. */
export function useHeroOnPage() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}

/** Report `ref` (the header avatar) for as long as it's mounted. */
export function useReportHero(ref: RefObject<HTMLElement | null>) {
  // Layout effect so the companion knows before the first paint after a navigation
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    watch(el);
    return () => unwatch(el);
  }, [ref]);
}
