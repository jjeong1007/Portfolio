import { spacingScale } from "@/lib/design-tokens";

/**
 * The 4pt spacing scale as specimen rows: value, a bar drawn at that exact
 * width, where it's used, and the Tailwind step / CSS variable that holds it.
 */
export function SpacingScale() {
  return (
    <ul className="flex flex-col gap-2" aria-label="Spacing scale">
      {spacingScale.map((step) => (
        <li key={step.px} className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-line pb-3">
          <span className="type-label w-12 md:w-16">{step.px}</span>
          <span aria-hidden className="w-34 shrink-0">
            <span className="block h-3 rounded-tab bg-ink" style={{ width: step.px }} />
          </span>
          <span className="type-body-md order-last w-full text-ink-body md:order-0 md:w-auto md:flex-1">
            {step.use}
          </span>
          <span className="type-body-sm ml-auto font-bold whitespace-nowrap md:text-body-md">{step.token}</span>
        </li>
      ))}
    </ul>
  );
}
