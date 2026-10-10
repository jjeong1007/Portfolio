import { ViewTransition, type ReactNode } from "react";

/**
 * Wrap each page's content (in page.tsx, not a layout) so route changes
 * animate. Links tagged `nav-forward` / `nav-back` (see site-nav.ts) pick the
 * direction; untyped navigations (browser back, refresh) swap instantly.
 * Animations live in globals.css under "View transitions".
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
