import type { CirclePoint } from "@/lib/case-study";

/**
 * Concentric rings, outermost first; sizes are % of the outer ring (Figma 139:1209).
 * Flat fills of the project accent: the rings stack, so their tints compound
 * toward the center, and the solid core carries ink text (never white, §2.2).
 */
const RINGS = [
  { size: 100, opacity: 0.2 },
  { size: 66, opacity: 0.3 },
  { size: 25.5, opacity: 1 },
];

/** Ring labels: vertical center as % of the outer ring. */
const LABELS = [
  { text: "Why", top: 50 },
  { text: "How", top: 72.6 },
  { text: "What", top: 91.1 },
];

function PointCard({ title, points }: { title: string; points: CirclePoint[] }) {
  return (
    <div className="rounded-card bg-paper p-4 md:p-6">
      <h4 className="type-subheading">{title}</h4>
      <ul className="type-body-md mt-2 list-disc space-y-2 pl-6 text-ink marker:text-ink-subtle">
        {points.map((p) => (
          <li key={p.text}>
            {p.text}
            {p.note && <span className="type-body-sm mt-1 block text-ink-body">{p.note}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Simon Sinek's Golden Circle on a flat surface card: why / how / what cards
 * beside the rings, which are tinted with the project accent like `Breakdown`.
 * The rings repeat the card titles, so they're hidden from screen readers.
 */
export function GoldenCircle({
  why,
  how,
  what,
  accent,
}: {
  why: CirclePoint[];
  how: CirclePoint[];
  what: CirclePoint[];
  accent: string;
}) {
  return (
    <div className="pt-4">
      <div className="grid items-center gap-6 rounded-card bg-surface p-4 md:grid-cols-2 md:gap-12 md:p-8">
        <div className="space-y-3">
          <PointCard title="Why" points={why} />
          <PointCard title="How" points={how} />
          <PointCard title="What" points={what} />
        </div>
        <div aria-hidden className="relative mx-auto aspect-square w-full max-w-120">
          {RINGS.map((ring) => (
            <div
              key={ring.size}
              className="absolute top-1/2 left-1/2 aspect-square -translate-1/2 rounded-full"
              style={{ width: `${ring.size}%`, backgroundColor: accent, opacity: ring.opacity }}
            />
          ))}
          {LABELS.map((label) => (
            <p
              key={label.text}
              className="type-subheading absolute left-1/2 -translate-1/2 text-ink"
              style={{ top: `${label.top}%` }}
            >
              {label.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
