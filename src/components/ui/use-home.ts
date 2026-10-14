"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { ownHome, STUDIO_HOME } from "@/lib/site-nav";

const KEY = "jj:home";

function readHome() {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

/** Nothing to subscribe to: the value only changes on navigation, which re-renders anyway. */
const subscribe = () => () => {};

/**
 * The landing page the nav treats as home. A landing page (or a case study)
 * is its own home and is remembered for the tab; shared pages like /about
 * use the remembered one, so a visitor who came from /studio stays in the
 * studio. Falls back to "/" when storage is empty or blocked.
 */
export function useHome() {
  const own = ownHome(usePathname());
  const remembered = useSyncExternalStore(subscribe, readHome, () => null);

  useEffect(() => {
    if (!own) return;
    try {
      sessionStorage.setItem(KEY, own);
    } catch {
      // Private mode or blocked storage: shared pages just fall back to "/"
    }
  }, [own]);

  return own ?? (remembered === STUDIO_HOME ? STUDIO_HOME : "/");
}
