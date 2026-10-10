import { PromptChips } from "@/components/ui/prompt-chips";

/** Floating "What do you wanna learn about me?" panel with quick-action chips. */
export function PromptCard() {
  return (
    <nav
      aria-labelledby="prompt-title"
      className="flex max-w-full flex-col items-center gap-2.5 rounded-control border border-line bg-paper px-4 py-3 shadow-float"
    >
      <p id="prompt-title" className="type-control">
        What do you wanna learn about me?
      </p>
      <PromptChips />
    </nav>
  );
}
