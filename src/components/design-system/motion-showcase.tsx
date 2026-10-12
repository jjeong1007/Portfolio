import { durations, easings } from "@/lib/design-tokens";

/**
 * Easing cards (hovering one slides a dot across its track on that curve)
 * and the duration scale as specimen rows.
 */
export function MotionShowcase() {
  return (
    <>
      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3" aria-label="Easing curves">
        {easings.map((e) => (
          <li key={e.token} className="group flex flex-col gap-4 rounded-card bg-surface p-6">
            <div aria-hidden className="relative h-4 rounded-full bg-paper">
              <span
                className="absolute top-0 left-0 size-4 rounded-full bg-ink transition-[left] duration-700 group-hover:left-[calc(100%-16px)]"
                style={{ transitionTimingFunction: `var(--${e.token})` }}
              />
            </div>
            <div>
              <h4 className="type-subheading">{e.token}</h4>
              <p className="type-micro mt-1 normal-case! text-ink-subtle">{e.curve}</p>
            </div>
            <p className="type-body-md text-ink-body">{e.use}</p>
          </li>
        ))}
      </ul>

      <ul className="mt-12 flex flex-col gap-2" aria-label="Durations">
        {durations.map((d) => (
          <li
            key={d.label}
            className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-line pb-3"
          >
            <span className="type-label md:w-56">{d.label}</span>
            <span className="type-body-md order-last w-full text-ink-body md:order-0 md:w-auto md:flex-1">
              {d.use}
            </span>
            <span className="type-body-sm font-bold whitespace-nowrap md:text-body-md">{d.value}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
