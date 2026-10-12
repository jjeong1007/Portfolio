"use client";

import { useLayoutEffect, useSyncExternalStore, type RefObject } from "react";

/**
 * Is a page-header character (TalkingAvatar, marked `data-hero-avatar`) on
 * screen? The header avatar reports itself with `useReportHero`; the
 * Companion reads `useHeroInView` and stays out of the way until the header
 * one has scrolled off. Anything tucked under the sticky Navbar counts as off
 * screen.
 */
let inView = false;
let watched: Element | null = null;
let observer: IntersectionObserver | null = null;
let scanned = false;
const listeners = new Set<() => void>();

function set(next: boolean) {
  if (next === inView) return;
  inView = next;
  listeners.forEach((l) => l());
}

function watch(el: Element) {
  if (el === watched) return;
  observer?.disconnect();
  watched = el;
  const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 0;
  const box = el.getBoundingClientRect();
  set(box.bottom > nav && box.top < window.innerHeight);
  observer = new IntersectionObserver(([entry]) => set(entry.isIntersecting), {
    rootMargin: `-${nav}px 0px 0px 0px`,
  });
  observer.observe(el);
}

function unwatch(el: Element) {
  if (el !== watched) return;
  observer?.disconnect();
  observer = null;
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
  return inView;
}

/** Server HTML assumes a header character is showing, so the companion never flashes in on load. */
export function useHeroInView() {
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
