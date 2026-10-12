"use client";

import { useEffect, useRef, useState } from "react";

/**
 * For animated covers on the landing page's project tiles. The tile's link
 * covers the cover, so this listens on the cover's parent (the tile) instead:
 * active while the tile is hovered or its link has keyboard focus. Touch
 * screens can't hover, so there it's active while 60% of the tile is in view,
 * and a tap just opens the case study. Attach the ref to the cover's root.
 */
export function useTileActive<T extends HTMLElement>() {
  const root = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const host = root.current?.parentElement;
    if (!host) return;
    const enter = (e: PointerEvent) => e.pointerType === "mouse" && setActive(true);
    const leave = (e: PointerEvent) => e.pointerType === "mouse" && setActive(false);
    const focus = (e: FocusEvent) => (e.target as Element).matches(":focus-visible") && setActive(true);
    const blur = () => setActive(false);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    host.addEventListener("focusin", focus);
    host.addEventListener("focusout", blur);

    let observer: IntersectionObserver | undefined;
    if (window.matchMedia("(hover: none)").matches) {
      observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.6 });
      observer.observe(host);
    }

    return () => {
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("focusin", focus);
      host.removeEventListener("focusout", blur);
      observer?.disconnect();
    };
  }, []);

  return [root, active] as const;
}
