"use client";

import type { ColorToken } from "@/lib/design-tokens";
import { useToast } from "@/components/ui/toast";

type SwatchProps = {
  color: ColorToken;
  /** "bar" = full-width 67px bar with right-aligned label, "chip" = label only on hover */
  variant?: "bar" | "chip";
};

/** Color swatch. Click copies the hex value. */
export function Swatch({ color, variant = "bar" }: SwatchProps) {
  const toast = useToast();
  const isChip = variant === "chip";

  async function copy() {
    try {
      await navigator.clipboard.writeText(color.hex);
      toast(`Copied ${color.hex}`);
    } catch {
      toast(color.hex);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${color.name}, ${color.hex}. Copy hex`}
      style={{ backgroundColor: color.hex }}
      className={`group relative flex h-17 w-full items-center overflow-hidden rounded-card px-3 transition-transform duration-150 ease-out-soft active:scale-[0.99] ${
        isChip ? "justify-center" : "justify-end"
      } ${color.on === "light" ? "text-paper" : "text-ink"} ${
        color.token === "paper" ? "border border-line" : ""
      }`}
    >
      {!isChip && (
        <span className="type-micro absolute left-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
          {color.hex}
        </span>
      )}
      <span
        className={
          isChip
            ? "type-body-sm text-center opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
            : "type-label"
        }
      >
        {color.name}
      </span>
    </button>
  );
}
