import type { Block } from "@/lib/case-study";

type BreakdownProps = Extract<Block, { type: "breakdown" }> & { accent: string };

/** First share at full accent, the last at 35%, the rest stepped between. */
function tint(i: number, count: number) {
  return 1 - (0.65 * i) / Math.max(count - 1, 1);
}

/**
 * One bar split into shares of 100, with the range's ends labeled above and
 * each share's value and label beneath its segment.
 */
export function Breakdown({ from, to, items, accent }: BreakdownProps) {
  return (
    <figure className="pt-4">
      <div className="type-micro mb-3 flex justify-between text-ink-subtle">
        <span>← {from}</span>
        <span>{to} →</span>
      </div>
      <div aria-hidden className="flex h-16 gap-1 overflow-hidden rounded-card">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="basis-0"
            style={{ flexGrow: item.value, backgroundColor: accent, opacity: tint(i, items.length) }}
          />
        ))}
      </div>
      <dl className="mt-4 flex gap-1">
        {items.map((item) => (
          <div key={item.label} className="flex min-w-0 basis-0 flex-col-reverse" style={{ flexGrow: item.value }}>
            <dt className="type-body-md mt-1 text-ink-body">
              {item.label}
              {item.note && <span className="type-body-sm mt-1 block text-ink-subtle">{item.note}</span>}
            </dt>
            <dd className="type-subtitle">{item.value}%</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
