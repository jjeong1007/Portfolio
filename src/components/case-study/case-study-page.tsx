import Image from "next/image";
import { BackLink } from "@/components/ui/back-link";
import { Container } from "@/components/ui/container";
import { PageGrid } from "@/components/ui/page-grid";
import type { Block, CaseStudy, Feature, Figure, Section } from "@/lib/case-study";
import { projectHex, projects, projectTextHex } from "@/lib/projects";
import { Bars } from "./bars";
import { Breakdown } from "./breakdown";
import { GoldenCircle } from "./golden-circle";
import { Icon } from "./icons";
import { JobMap } from "./job-map";
import { JamCover } from "./jam-cover";
import { PersonaCard } from "./persona-card";

/** Body copy is Large Body (20px) and runs the full width of its container. */
const TEXT = "type-body-lg text-ink-body";

/**
 * Editorial case studies (`layout: "editorial"`) hold headings and copy to 8 of the
 * 12 grid columns from desktop up. Keyed off `data-layout` on <main> (group "case").
 */
const MEASURE = "group-data-[layout=editorial]/case:lg:w-2/3";

/** A flat wash of the project accent behind a card's content (the showcase band's tint). */
function AccentTint({ accent }: { accent: string }) {
  return <span aria-hidden className="absolute inset-0 -z-10 opacity-20" style={{ backgroundColor: accent }} />;
}

/** Opens a new chapter of the story: a micro label in the project's text accent, then a hairline. */
function PartDivider({ label, color }: { label: string; color?: string }) {
  return (
    <div className="mb-12 flex items-center gap-6 md:mb-18">
      <Eyebrow color={color} className="shrink-0">
        {label}
      </Eyebrow>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  );
}

/** Micro label in the project's text accent; `dot` adds a swatch of the full accent before it. */
function Eyebrow({
  children,
  color,
  dot,
  className = "",
}: {
  children: string;
  color?: string;
  dot?: string;
  className?: string;
}) {
  return (
    <p
      className={`type-micro flex items-center gap-2 text-ink-subtle ${className}`}
      style={color ? { color } : undefined}
    >
      {dot && <span aria-hidden className="size-2 rounded-full" style={{ backgroundColor: dot }} />}
      {children}
    </p>
  );
}

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className={`space-y-(--space-paragraph) ${TEXT} ${MEASURE}`}>
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

const COLUMNS = {
  1: "",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
} as const;
const SIZES = {
  1: "(min-width: 1440px) 1040px, 100vw",
  2: "(min-width: 768px) 50vw, 100vw",
  3: "(min-width: 768px) 33vw, 100vw",
  4: "(min-width: 768px) 25vw, 50vw",
} as const;

function Figures({ figures, columns = 1, fit = "framed" }: Extract<Block, { type: "figures" }>) {
  // Photo bento: rows alternate wide + narrow, then narrow + wide. The wide cell sets
  // the row height (4:3) and the narrow one crops to fill it; phones stack them.
  if (fit === "bento") {
    return (
      <div className="grid gap-3 pt-4 md:grid-cols-3">
        {figures.map((f, i) => {
          const wide = i % 4 === 0 || i % 4 === 3;
          return (
            <figure
              key={f.src.src}
              className={`relative overflow-hidden rounded-card bg-surface ${
                wide ? "aspect-[4/3] md:col-span-2" : "aspect-[3/4] md:aspect-auto"
              }`}
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes={wide ? "(min-width: 768px) 67vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                placeholder="blur"
                className="object-cover"
              />
            </figure>
          );
        })}
      </div>
    );
  }
  // Photos and full-bleed art: each fills its own card
  if (fit === "bleed") {
    return (
      <div className={`grid gap-3 pt-4 ${COLUMNS[columns]}`}>
        {figures.map((f) => (
          <figure key={f.src.src} className="overflow-hidden rounded-card bg-surface">
            <div className="relative">
              <Image src={f.src} alt={f.alt} sizes={SIZES[columns]} placeholder="blur" className="h-auto w-full" />
              {/* Speech bubbles float over the image from tablet up; phones get them listed below */}
              {f.callouts?.map((c) => (
                <blockquote
                  key={c.quote}
                  className="type-control absolute hidden max-w-80 rounded-control border border-line bg-paper px-4 py-3 text-ink shadow-float md:block"
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                >
                  “{c.quote}”
                </blockquote>
              ))}
            </div>
            {f.callouts && (
              <ul className="space-y-2 px-4 pt-4 md:hidden">
                {f.callouts.map((c) => (
                  <li key={c.quote} className="type-body-md text-ink">
                    “{c.quote}”
                  </li>
                ))}
              </ul>
            )}
            {f.caption && <figcaption className="type-body-sm px-4 py-3 text-ink-subtle">{f.caption}</figcaption>}
          </figure>
        ))}
      </div>
    );
  }
  // Transparent graphics: one padded surface card, images never upscaled past their size.
  // Several figures each get their own caption underneath; a single one is captioned below the card.
  const single = figures.length === 1;
  return (
    <figure className="mt-4 rounded-card bg-surface p-3 sm:p-6 md:p-12">
      <div className={`grid items-end justify-items-center gap-6 ${COLUMNS[columns]}`}>
        {figures.map((f: Figure) => (
          <div key={f.src.src} className="flex flex-col items-center gap-3">
            <Image
              src={f.src}
              alt={f.alt}
              sizes={f.maxWidth ? `${f.maxWidth}px` : SIZES[columns]}
              className="h-auto max-w-full"
              style={f.maxWidth ? { width: f.maxWidth } : undefined}
            />
            {!single && f.caption && <p className="type-body-sm text-center text-ink-body">{f.caption}</p>}
          </div>
        ))}
      </div>
      {single && figures[0].caption && (
        <figcaption className="type-body-sm mt-4 text-center text-ink-subtle">{figures[0].caption}</figcaption>
      )}
    </figure>
  );
}

/** Dashed stand-ins for images that haven't been exported yet, each labeled with what goes there. */
function Placeholders({ labels, columns = 1, tall }: Omit<Extract<Block, { type: "placeholder" }>, "type">) {
  return (
    <div className={`grid gap-3 pt-4 ${COLUMNS[columns]}`}>
      {labels.map((label) => (
        <div
          key={label}
          className={`flex flex-col items-center justify-center gap-1 rounded-card border border-dashed border-ink-faint bg-surface p-6 text-center ${
            tall ? "min-h-90 md:min-h-120" : "min-h-60 md:min-h-80"
          }`}
        >
          <p className="type-micro text-ink-subtle">Image placeholder</p>
          <p className="type-body-sm text-ink-body">{label}</p>
        </div>
      ))}
    </div>
  );
}

/** A bordered pill with a Lucide icon in the project color, like a `Chip` at rest. */
function FeaturePill({ feature, accent, large }: { feature: Feature; accent: string; large?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-control border border-line bg-paper ${
        large ? "type-label px-4 py-3" : "type-control px-3 py-2"
      }`}
    >
      <span style={{ color: accent }}>
        <Icon name={feature.icon} />
      </span>
      {feature.title}
    </span>
  );
}

function Features({ items, accent }: { items: Feature[]; accent: string }) {
  return (
    <dl className="space-y-6 pt-4">
      {items.map((f) => (
        // Pill in the first 4 grid columns, its copy in the other 8
        <div key={f.title} className="grid gap-3 md:grid-cols-12">
          <dt className="md:col-span-4">
            <FeaturePill feature={f} accent={accent} />
          </dt>
          <dd className={`md:col-span-8 md:pt-2 ${TEXT}`}>{f.body}</dd>
        </div>
      ))}
    </dl>
  );
}

function Merge({ from, to, accent }: { from: Feature[]; to: Feature; accent: string }) {
  const sign = "type-heading text-ink-subtle";
  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-6 rounded-card bg-surface p-6 md:flex-row md:gap-12 md:p-12">
      <div className="flex flex-col items-center gap-2">
        {from.map((f, i) => (
          <div key={f.title} className="flex flex-col items-center gap-2">
            {i > 0 && (
              <span aria-hidden className={sign}>
                +
              </span>
            )}
            <FeaturePill feature={f} accent={accent} />
          </div>
        ))}
      </div>
      <span aria-hidden className={sign}>
        =
      </span>
      <FeaturePill feature={to} accent={accent} large />
    </div>
  );
}

function Personas({ items }: Extract<Block, { type: "personas" }>) {
  return (
    // A lone persona gets the full row instead of a third of it
    <ul className={`grid gap-3 pt-4 ${items.length > 1 ? "md:grid-cols-3" : ""}`}>
      {items.map((p, i) => (
        <PersonaCard key={p.name} persona={p} index={i} />
      ))}
    </ul>
  );
}

function Quotes({ items }: Extract<Block, { type: "quotes" }>) {
  return (
    // Editorial pages set a row of three quotes three across
    <ul
      className={`grid gap-3 pt-4 md:grid-cols-2 ${
        items.length === 3 ? "group-data-[layout=editorial]/case:lg:grid-cols-3" : ""
      }`}
    >
      {items.map((q) => (
        <li key={q.quote} className="flex flex-col rounded-card bg-surface p-6 md:p-8">
          {q.label && <h3 className="type-micro mb-3 text-ink-subtle">{q.label}</h3>}
          <blockquote className="type-body-lg text-ink">“{q.quote}”</blockquote>
          {q.attribution && <p className="type-body-sm mt-auto pt-4 text-ink-subtle">{q.attribution}</p>}
        </li>
      ))}
    </ul>
  );
}

// Full class names so Tailwind picks them up; fewer than 4 stats stretch to fill the row
const statColumns = ["md:grid-cols-1", "md:grid-cols-2", "md:grid-cols-3", "md:grid-cols-4"];

function Stats({ items, valueColor }: Extract<Block, { type: "stats" }> & { valueColor?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-3 pt-4 ${statColumns[Math.min(items.length, 4) - 1]}`}>
      {items.map((s) => (
        <div key={s.label} className="flex flex-col-reverse justify-end rounded-card bg-surface p-6">
          <dt className="type-body-md mt-1 text-ink-body">{s.label}</dt>
          <dd className="type-subtitle" style={valueColor ? { color: valueColor } : undefined}>
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Stacked surface cards, each led by a dot: `negative` in the negative red, `positive` in the project accent. */
function Findings({
  tone,
  items,
  accent,
  textAccent,
}: Extract<Block, { type: "findings" }> & { accent: string; textAccent?: string }) {
  const dot = tone === "positive" ? accent : "var(--color-negative)";
  const title = tone === "positive" ? textAccent : "var(--color-negative)";
  return (
    <ul className={`space-y-3 pt-4 ${MEASURE}`}>
      {items.map((item) => (
        <li key={item.title} className="relative rounded-card bg-surface py-6 pr-6 pl-12 md:py-8 md:pr-8 md:pl-14">
          <span
            aria-hidden
            className="absolute top-8 left-6 size-2 rounded-full md:top-10 md:left-7"
            style={{ backgroundColor: dot }}
          />
          <h3 className="type-subheading" style={title ? { color: title } : undefined}>
            {item.title}
          </h3>
          <p className="type-body-md mt-1 text-ink-body">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** One row per test result: the screen tested, then what the tester said and what it told us. */
function Tests({ items }: Extract<Block, { type: "tests" }>) {
  return (
    <ul className="space-y-3 pt-4">
      {items.map((t) => (
        <li
          key={t.quote}
          className="grid grid-cols-[5.5rem_1fr] items-center gap-5 rounded-card bg-surface p-4 md:grid-cols-[10rem_1fr] md:gap-10 md:p-6"
        >
          <Image
            src={t.figure.src}
            alt={t.figure.alt}
            sizes="(min-width: 768px) 160px, 88px"
            className="h-auto w-full rounded-control"
          />
          <div>
            <blockquote className="type-subheading md:type-heading md:font-medium!">“{t.quote}”</blockquote>
            <p className="type-body-md mt-3 text-negative">{t.finding}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** The old framing struck through on `bg-surface`, an arrow, then the new one on the accent tint. */
function Reframe({ from, to, accent }: Extract<Block, { type: "reframe" }> & { accent: string }) {
  const pill = "type-subheading md:type-heading font-medium! rounded-full px-5 py-2.5 md:px-6 md:py-3";
  return (
    <p className="flex flex-wrap items-center gap-4 pt-4">
      <span className={`${pill} bg-surface text-ink-subtle line-through decoration-2`}>{from}</span>
      <span aria-hidden className="type-heading text-ink-subtle">
        →
      </span>
      <span className={`${pill} relative isolate overflow-hidden`}>
        <AccentTint accent={accent} />
        {to}
      </span>
    </p>
  );
}

function Testimonial({
  quote,
  attribution,
  accent,
  textAccent,
}: Extract<Block, { type: "testimonial" }> & { accent: string; textAccent?: string }) {
  return (
    <figure className="relative isolate overflow-hidden rounded-card p-8 md:p-12">
      <AccentTint accent={accent} />
      <blockquote className="type-heading font-medium!">“{quote}”</blockquote>
      <figcaption className="type-body-md mt-6" style={textAccent ? { color: textAccent } : undefined}>
        {attribution}
      </figcaption>
    </figure>
  );
}

/**
 * Screens on a surface card (6 grid columns) beside their copy (5 columns, one
 * empty column between); every other row puts the screens on the right.
 */
function Spotlights({
  items,
  onBand,
  titleColor,
}: Extract<Block, { type: "spotlights" }> & { onBand?: boolean; titleColor?: string }) {
  return (
    <div className="space-y-12 pt-4 md:space-y-18">
      {items.map((item, i) => (
        <div key={item.title} className="grid items-center gap-x-3 gap-y-6 md:grid-cols-12">
          {item.mockup ? (
            // A finished mockup (phone frames and shadow baked in) sits straight on the page, uncropped
            <Image
              src={item.mockup.src}
              alt={item.mockup.alt}
              sizes="(min-width: 1280px) 520px, (min-width: 768px) 50vw, 100vw"
              placeholder="blur"
              className={`h-auto w-full md:col-span-6 md:row-start-1 ${i % 2 ? "md:col-start-7" : ""}`}
            />
          ) : (
          <div
            className={`flex h-90 items-start justify-center gap-3 overflow-hidden rounded-card ${
              onBand ? "bg-paper" : "bg-surface"
            } px-6 pt-10 sm:h-110 md:col-span-6 md:row-start-1 md:px-10 ${
              i % 2 ? "md:col-start-7" : ""
            }`}
          >
            {item.figures?.map((f) => (
              <Image
                key={f.src.src}
                src={f.src}
                alt={f.alt}
                sizes="(min-width: 768px) 240px, 45vw"
                className="h-auto w-1/2 max-w-60"
              />
            ))}
          </div>
          )}
          {/* On a showcase band the copy hugs the screens: right-aligned when it sits on the left */}
          <div
            className={`md:col-span-5 md:row-start-1 ${i % 2 ? "md:col-start-1" : "md:col-start-8"} ${
              onBand && i % 2 ? "md:text-right" : ""
            }`}
          >
            <h3 className="type-subheading" style={onBand && titleColor ? { color: titleColor } : undefined}>
              {item.title}
            </h3>
            <p className={`mt-2 ${TEXT}`}>{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BlockView({
  block,
  accent,
  textAccent,
  onBand,
  editorial,
}: {
  block: Block;
  accent: string;
  textAccent?: string;
  onBand?: boolean;
  editorial?: boolean;
}) {
  switch (block.type) {
    case "text":
      return <Paragraphs paragraphs={block.paragraphs} />;
    case "list":
      return (
        <ul className={`list-disc space-y-2 pl-6 marker:text-ink-subtle ${TEXT} ${MEASURE}`}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "emphasis":
      return <p className={`type-body-lg font-bold! text-ink ${MEASURE}`}>{block.text}</p>;
    case "subheading":
      return (
        <div className={`pt-6 ${MEASURE}`}>
          <h3 className="type-subheading">{block.title}</h3>
          {block.paragraphs.length > 0 && (
            <div className="mt-2">
              <Paragraphs paragraphs={block.paragraphs} />
            </div>
          )}
        </div>
      );
    case "figures":
      return <Figures {...block} />;
    case "placeholder":
      return <Placeholders {...block} />;
    case "cards":
      return (
        <ul className={`grid gap-3 ${block.items.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {block.items.map((card) => (
            <li key={card.title} className="rounded-card bg-surface p-6 md:p-8">
              {card.icon && (
                <span className="mb-4 block" style={{ color: accent }}>
                  <Icon name={card.icon} className="size-13" />
                </span>
              )}
              <h3 className="type-subheading">{card.title}</h3>
              <p className="type-body-md mt-2 text-ink-body">{card.body}</p>
            </li>
          ))}
        </ul>
      );
    case "logos":
      return (
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {block.items.map((logo) => (
            <li key={logo.name} className="flex flex-col items-center gap-4 rounded-card bg-surface px-6 py-10">
              <Image src={logo.src} alt="" className="size-12" />
              <span className="type-label text-ink">{logo.name}</span>
            </li>
          ))}
        </ul>
      );
    case "features":
      return <Features items={block.items} accent={accent} />;
    case "merge":
      return <Merge from={block.from} to={block.to} accent={accent} />;
    case "personas":
      return <Personas {...block} />;
    case "quotes":
      return <Quotes {...block} />;
    case "stats":
      return <Stats {...block} valueColor={editorial ? textAccent : undefined} />;
    case "findings":
      return <Findings {...block} accent={accent} textAccent={textAccent} />;
    case "tests":
      return <Tests {...block} />;
    case "reframe":
      return <Reframe {...block} accent={accent} />;
    case "testimonial":
      return <Testimonial {...block} accent={accent} textAccent={textAccent} />;
    case "spotlights":
      return <Spotlights {...block} onBand={onBand} titleColor={textAccent} />;
    case "golden-circle":
      return <GoldenCircle {...block} accent={accent} />;
    case "breakdown":
      return <Breakdown {...block} accent={accent} />;
    case "bars":
      return <Bars {...block} accent={accent} />;
    case "job-map":
      return <JobMap {...block} accent={accent} textAccent={textAccent} />;
  }
}

function SectionView({
  section,
  index,
  accent,
  textAccent,
  editorial,
}: {
  section: Section;
  index: number;
  accent: string;
  textAccent?: string;
  editorial?: boolean;
}) {
  const id = `section-${index}`;
  const statement = section.variant === "statement";
  const callout = section.variant === "callout";
  const showcase = section.variant === "showcase";
  const blocks = section.blocks && (
    <div className="mt-6 space-y-6">
      {section.blocks.map((block, i) => (
        <BlockView
          key={i}
          block={block}
          accent={accent}
          textAccent={textAccent}
          onBand={showcase}
          editorial={editorial}
        />
      ))}
    </div>
  );
  // A new chapter gets half a section of extra room above its divider
  const top = section.part ? "mt-[calc(var(--space-section)*1.5)]" : "mt-(--space-section)";
  const divider = section.part && <PartDivider label={section.part} color={textAccent} />;

  // Problem statements: the title large on a card tinted with the accent, or muted on `bg-surface`
  if (callout) {
    const muted = section.tone === "muted";
    return (
      <Container as="section" aria-labelledby={id} className={top}>
        {divider}
        <div className={`relative isolate overflow-hidden rounded-card p-8 md:p-14 ${muted ? "bg-surface" : ""}`}>
          {!muted && <AccentTint accent={accent} />}
          <Eyebrow color={muted ? undefined : textAccent}>{section.eyebrow}</Eyebrow>
          <h2 id={id} className={`type-subtitle mt-3 max-w-3xl ${muted ? "text-ink-subtle" : ""}`}>
            {section.title}
          </h2>
          {blocks}
        </div>
      </Container>
    );
  }

  // Final solution: a full-bleed band in a flat tint of the project accent, header centered
  // over a hero mockup, then the feature rows (the old Framer layout).
  if (showcase) {
    return (
      <section aria-labelledby={id} className="relative isolate mt-(--space-section) py-18 md:py-24">
        <div aria-hidden className="absolute inset-0 -z-10 opacity-20" style={{ backgroundColor: accent }} />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow color={textAccent} className="justify-center">
              {section.eyebrow}
            </Eyebrow>
            <h2 id={id} className="type-heading mt-1">
              {section.title}
            </h2>
          </div>
          {section.blocks?.[0]?.type === "text" && (
            <div className="mx-auto mt-6 max-w-3xl text-center">
              <Paragraphs paragraphs={section.blocks[0].paragraphs} />
            </div>
          )}
          {section.hero && (
            <Image
              src={section.hero.src}
              alt={section.hero.alt}
              sizes="(min-width: 768px) 560px, 90vw"
              className="mx-auto mt-10 h-auto w-full max-w-copy"
            />
          )}
          {section.blocks && (
            <div className="mt-12 space-y-6 md:mt-18">
              {section.blocks
                .filter((block, i) => !(i === 0 && block.type === "text"))
                .map((block, i) => (
                  <BlockView key={i} block={block} accent={accent} textAccent={textAccent} onBand />
                ))}
            </div>
          )}
        </Container>
      </section>
    );
  }

  return (
    <Container as="section" aria-labelledby={id} className={top}>
      {divider}
      <Eyebrow color={textAccent}>{section.eyebrow}</Eyebrow>
      <h2
        id={id}
        className={
          statement
            ? "type-subtitle mt-3 border-l-4 pl-6 md:pl-8"
            : `type-heading mt-1 ${MEASURE}`
        }
        style={statement ? { borderColor: accent } : undefined}
      >
        {section.title}
      </h2>
      {blocks}
    </Container>
  );
}

/** Three product screens on a `bg-surface` card, the middle one raised, all running off the bottom edge. */
function Cover({ screens }: { screens: Figure[] }) {
  return (
    <figure className="mt-10 flex h-90 items-start justify-center gap-3 overflow-hidden rounded-card bg-surface px-6 pt-10 sm:h-120 sm:gap-6 md:h-140 md:px-16 md:pt-16">
      {screens.map((screen, i) => (
        <Image
          key={screen.src.src}
          src={screen.src}
          alt={screen.alt}
          sizes="(min-width: 768px) 280px, 30vw"
          preload
          // The outer screens sit lower, so the row fans out and runs off the card's bottom edge
          className={`h-auto w-1/3 max-w-70 ${i === 1 ? "" : "mt-10 md:mt-16"}`}
        />
      ))}
    </figure>
  );
}

/**
 * A project case study: back link, title + cover, context and project meta,
 * contributions, then the story as eyebrow + heading sections. Content comes
 * from `src/content/case-studies/`; the accent is the project's color, and
 * eyebrows use its text shade (lib/design-tokens projectTextColors).
 */
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const project = projects.find((p) => p.slug === study.slug);
  const accent = project ? projectHex(project) : "currentColor";
  const textAccent = project ? projectTextHex(project) : undefined;
  const editorial = study.layout === "editorial";

  return (
    // The narrower case study grid (globals.css, design-system.md §4.1)
    <main data-grid="case-study" data-layout={study.layout} className="group/case pb-30">
      <PageGrid grid="case-study" />
      <Container className="pt-6">
        <BackLink href="/#projects" label="Back to projects" className="-ml-3" />
      </Container>

      <Container as="header" className="mt-10 md:mt-14">
        {project && <Eyebrow color={textAccent} dot={accent}>
            {project.category}
          </Eyebrow>}
        <h1 className="type-title mt-1">{study.name}</h1>
        <p className="type-body-lg mt-2 text-ink-body">{study.tagline}</p>
        {study.cover.length === 0 ? (
          <div className="mt-10">
            <Placeholders labels={["Cover: three final product screens"]} tall />
          </div>
        ) : study.slug === "amazon-music" ? (
          <JamCover screens={study.cover} />
        ) : (
          <Cover screens={study.cover} />
        )}
      </Container>

      {/* Context in the first 7 columns, the meta in the last 4 */}
      <Container grid className="mt-18 gap-y-12">
        <div className="lg:col-span-7">
          <Eyebrow color={textAccent}>Context</Eyebrow>
          <p className={`mt-3 ${TEXT}`}>{study.context}</p>
        </div>
        <dl className="grid grid-cols-2 content-start gap-6 lg:col-span-4 lg:col-start-9">
          {study.meta.map((row) => (
            <div key={row.label}>
              <dt className="type-micro text-ink-subtle">{row.label}</dt>
              <dd className="mt-1 leading-5">
                {row.values.map((v) => (
                  <span key={v} className="block">
                    {v}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container as="section" aria-labelledby="contributions" className="mt-18">
        <h2 id="contributions" className="type-heading">
          My contributions
        </h2>
        <ul className={`mt-6 grid gap-3 ${study.contributions.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {study.contributions.map((c) => (
            <li key={c.title} className="rounded-card bg-surface p-6">
              <h3 className="type-subheading">{c.title}</h3>
              <p className="type-body-md mt-2 text-ink-body">{c.body}</p>
            </li>
          ))}
        </ul>
      </Container>

      {study.sections.map((section, i) => (
        <SectionView
          key={section.eyebrow}
          section={section}
          index={i}
          accent={accent}
          textAccent={textAccent}
          editorial={editorial}
        />
      ))}

      <Container className="mt-(--space-section)">
        <BackLink href="/#projects" label="Back to projects" className="-ml-3" />
      </Container>
    </main>
  );
}
