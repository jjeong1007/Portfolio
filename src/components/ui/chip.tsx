import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ChipVariant = "default" | "quiet";

const base =
  "inline-flex items-center justify-center rounded-control border border-line bg-paper px-3 py-2 text-center whitespace-nowrap transition-[transform,background-color,border-color] duration-200 ease-spring hover:-translate-y-0.5 hover:border-ink-faint hover:bg-surface active:translate-y-0 active:scale-[0.97]";

const variants: Record<ChipVariant, string> = {
  default: "type-control text-ink",
  /* De-emphasized option: 12px, subtle text */
  quiet: "type-control text-micro! text-ink-subtle",
};

type ChipProps = { variant?: ChipVariant; className?: string };

/** Bordered pill used for quick actions. Renders a Link when given `href`. */
export function Chip({
  variant = "default",
  className = "",
  ...props
}: ChipProps & (ComponentPropsWithoutRef<typeof Link> | ComponentPropsWithoutRef<"button">)) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if ("href" in props && props.href !== undefined) {
    return <Link className={classes} {...(props as ComponentPropsWithoutRef<typeof Link>)} />;
  }
  return <button type="button" className={classes} {...(props as ComponentPropsWithoutRef<"button">)} />;
}
