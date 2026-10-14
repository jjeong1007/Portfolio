import type { Block } from "@/lib/case-study";

type JobMapProps = Extract<Block, { type: "job-map" }> & { accent: string; textAccent?: string };

/**
 * A Jobs To Be Done map: the main job on top, then its steps in order, each
 * with the job at that step and, below a hairline, the struggle it surfaced
 * and the assumption that struggle backs. Rows are a subgrid, so the
 * struggles line up across columns.
 */
export function JobMap({ job, steps, accent, textAccent }: JobMapProps) {
  return (
    <figure className="mt-4 rounded-card bg-surface p-4 md:p-8">
      <figcaption>
        <p className="type-micro text-ink-subtle">Main job</p>
        <p className="type-subheading mt-1">{job}</p>
      </figcaption>
      <ol className="mt-6 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        {steps.map((step, i) => (
          <li key={step.stage} className="row-span-2 grid grid-rows-subgrid gap-0 rounded-card bg-paper p-4">
            <div>
              <h4 className="type-micro" style={textAccent ? { color: textAccent } : undefined}>
                {String(i + 1).padStart(2, "0")} {step.stage}
              </h4>
              <p className="type-body-md mt-2 text-ink">{step.job}</p>
            </div>
            <div>
              {step.struggle && (
                <div className="mt-4 border-t border-line pt-4">
                  <p className="type-micro text-ink-subtle">Struggle</p>
                  <p className="type-body-sm mt-1 text-ink-body">{step.struggle}</p>
                  {step.supports && (
                    <p className="type-body-sm mt-3 flex items-center gap-2 text-ink-subtle">
                      <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                      {step.supports}
                    </p>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
