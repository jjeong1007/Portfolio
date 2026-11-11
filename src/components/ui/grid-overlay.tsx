import { Container } from "@/components/ui/container";

/**
 * The layout grid drawn over the whole page while "Show my system" is on
 * (`<html data-system="on">`, set by ViewControls). Pure CSS: it reads the
 * same grid variables as Container, so it always matches the page's grid,
 * and the label names it from `--grid-name` / `--grid-columns`.
 */
export function GridOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-25 opacity-0 transition-opacity duration-300 ease-out-soft in-data-[system=on]:opacity-100"
    >
      <Container grid className="h-full">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            // One column each; phones only have 4
            className={`col-span-1 border-x border-nyck/20 bg-nyck/8 ${i >= 4 ? "max-md:hidden" : ""}`}
          />
        ))}
      </Container>
      <span className="type-micro grid-label absolute bottom-4 left-4 rounded-control border border-line bg-paper px-3 py-2 text-nyck md:bottom-8 md:left-8" />
    </div>
  );
}
