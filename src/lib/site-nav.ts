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
  { label: "My projects!!", href: "/projects" },
  { label: "Who are you?!", message: "The about page is coming soon." },
  { label: "How’d you make this website??", href: "/design-system" },
  { label: "What are your deep darkest fears in life?", message: "Nice try. That’s classified.", quiet: true },
];

/** Companion speech-bubble commentary, per route. Falls back to `default`. */
export const companionMessages: Record<string, string> & { default: string } = {
  default: "Let me know what else you wanna learn about me just by clicking me!",
};

/** Transition types passed to <Link transitionTypes>. See page-transition.tsx. */
export const NAV_FORWARD = ["nav-forward"];
export const NAV_BACK = ["nav-back"];
