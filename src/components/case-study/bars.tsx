import type { Block } from "@/lib/case-study";

type BarsProps = Extract<Block, { type: "bars" }> & { accent: string };

/**
 * Ranked horizontal bars on a surface card: label, a `bg-paper` track filled in
 * the project accent, then the value. Bars scale to the largest value.
 */
export function Bars({ title, note, items, accent }: BarsProps) {
  const max = Math.max(...items.map((item) => item.value));
  return (
    <figure className="rounded-card bg-surface p-6 md:p-8">
      <figcaption className="mb-6">
        <h3 className="type-subheading">{title}</h3>
        {note && <p className="type-body-sm mt-1 text-ink-subtle">{note}</p>}
      </figcaption>
      <dl className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 md:grid-cols-[14rem_1fr_4rem]">
            <dt className="type-body-md text-ink-body">{item.label}</dt>
            <dd className="type-label text-right text-ink md:order-last">{item.value}%</dd>
            <dd aria-hidden className="col-span-2 h-3 overflow-hidden rounded-full bg-paper md:col-span-1">
              <div className="h-full rounded-full" style={{ width: `${(item.value / max) * 100}%`, backgroundColor: accent }} />
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
