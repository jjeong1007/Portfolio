/**
 * The "What do you wanna learn about me?" options. Shared by the landing
 * prompt card and the companion menu so they never drift apart.
 * An entry with `href` navigates; one with `message` shows a toast until its
 * page exists.
 */
export type NavPrompt = {
  label: string;
  quiet?: boolean;
} & ({ href: string } | { message: string });

export const navPrompts: NavPrompt[] = [
  { label: "My projects!!", href: "/#projects" },
  { label: "Who are you?!", href: "/about" },
  { label: "How’d you make this website??", href: "/design-system" },
  { label: "What are your deep darkest fears in life?", message: "Nice try. That’s classified.", quiet: true },
];

/** Top nav bar links (landing page). Same shape as NavPrompt. */
export const navLinks: NavPrompt[] = [
  { label: "Projects", href: "/#projects" },
  { label: "About me", href: "/about" },
  { label: "Design system", href: "/design-system" },
];

/**
 * The side-hustle landing page. Visitors who start there keep it as home: the
 * logo and "projects" links point back to it instead of "/" (see use-home.ts).
 */
export const STUDIO_HOME = "/studio";

/**
 * The landing page a path belongs to: /studio is the studio's, "/" and the case
 * studies are the main site's. Shared pages (/about, /design-system) belong to
 * neither and return null, so they use whichever home the visitor came from.
 */
export function ownHome(pathname: string): string | null {
  if (pathname === STUDIO_HOME || pathname.startsWith(`${STUDIO_HOME}/`)) return STUDIO_HOME;
  if (pathname === "/" || pathname.startsWith("/projects/")) return "/";
  return null;
}

/** Points links into the landing page ("/", "/#projects") at `home` instead. */
export function withHome(prompts: NavPrompt[], home: string): NavPrompt[] {
  if (home === "/") return prompts;
  return prompts.map((prompt) =>
    "href" in prompt && prompt.href.split("#")[0] === "/"
      ? { ...prompt, href: home + prompt.href.slice(1) }
      : prompt,
  );
}

/** Links into a landing page go "back"; everything else goes "forward". */
export function transitionFor(href: string) {
  const path = href.split("#")[0];
  return path === "/" || path === STUDIO_HOME ? NAV_BACK : NAV_FORWARD;
}

/** Transition types passed to <Link transitionTypes>. See page-transition.tsx. */
export const NAV_FORWARD = ["nav-forward"];
export const NAV_BACK = ["nav-back"];
