import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  /** Lay children out on the grid's columns (`layout-grid`); each spans all of them unless it sets col-*. */
  grid?: boolean;
} & ComponentPropsWithoutRef<T>;

/**
 * The layout grid's frame: `--grid-max` wide (1192px page grid, 1040px case
 * study grid), centered, with the responsive gutter as its margins.
 */
export function Container<T extends ElementType = "div">({
  as,
  grid = false,
  className = "",
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={`mx-auto w-full max-w-[calc(var(--grid-max)+var(--gutter)*2)] px-(--gutter) ${grid ? "layout-grid" : ""} ${className}`}
      {...props}
    />
  );
}
