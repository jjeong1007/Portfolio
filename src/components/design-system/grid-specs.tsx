import { layoutGrids } from "@/lib/design-tokens";

const CANVAS = 1440;
const GAP = 12;

/**
 * The two layout grids as cards: a to-scale diagram of the 1440 canvas (the
 * columns tinted like the GridOverlay), then the spec rows.
 */
export function GridSpecs() {
  return (
    <ul className="grid gap-3 md:grid-cols-2" aria-label="Layout grids">
      {layoutGrids.map((grid) => (
        <li key={grid.name} className="flex flex-col gap-6 rounded-card bg-surface p-6">
          <div aria-hidden className="flex h-30 justify-center rounded-control bg-paper">
            <div
              className="grid h-full grid-cols-12"
              style={{ width: `${(grid.width / CANVAS) * 100}%`, columnGap: `${(GAP / grid.width) * 100}%` }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className="border-x border-nyck/20 bg-nyck/8" />
              ))}
            </div>
          </div>
          <div>
            <h4 className="type-subheading">{grid.name}</h4>
            <dl className="mt-3 flex flex-col gap-2">
              {[
                ["Columns", "12 · 4 on phones"],
                ["Gap", `${GAP}px`],
                ["Width", `${grid.width}px max`],
                ["Margins", grid.margins],
                ["Used on", grid.usedOn],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[96px_1fr] items-baseline gap-3 border-b border-line pb-2">
                  <dt className="type-micro text-ink-subtle">{label}</dt>
                  <dd className="type-body-md">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </li>
      ))}
    </ul>
  );
}
