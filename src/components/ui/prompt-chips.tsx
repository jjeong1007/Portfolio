"use client";

import { usePathname } from "next/navigation";
import { Chip } from "@/components/ui/chip";
import { useToast } from "@/components/ui/toast";
import { navPrompts, transitionFor } from "@/lib/site-nav";

type PromptChipsProps = {
  /** "row" wraps horizontally (landing), "column" stacks right-aligned (companion menu) */
  layout?: "row" | "column";
  onSelect?: () => void;
};

/** The site's quick-navigation chips, driven by `navPrompts`. */
export function PromptChips({ layout = "row", onSelect }: PromptChipsProps) {
  const toast = useToast();
  const pathname = usePathname();

  return (
    <ul
      className={
        layout === "row"
          ? "flex flex-wrap items-end justify-center gap-2"
          : "flex flex-col items-end gap-2"
      }
    >
      {navPrompts.map((prompt) => {
        const variant = prompt.quiet ? "quiet" : "default";
        return (
          <li key={prompt.label}>
            {"href" in prompt ? (
              <Chip
                href={prompt.href}
                transitionTypes={transitionFor(prompt.href)}
                aria-current={pathname === prompt.href ? "page" : undefined}
                variant={variant}
                onClick={onSelect}
                className="aria-[current=page]:bg-surface"
              >
                {prompt.label}
              </Chip>
            ) : (
              <Chip
                variant={variant}
                onClick={() => {
                  toast(prompt.message);
                  onSelect?.();
                }}
              >
                {prompt.label}
              </Chip>
            )}
          </li>
        );
      })}
    </ul>
  );
}
