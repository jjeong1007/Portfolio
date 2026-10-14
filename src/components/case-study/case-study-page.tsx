import Image from "next/image";
import { BackLink } from "@/components/ui/back-link";
import { Container } from "@/components/ui/container";
import type { Block, CaseStudy, Feature, Figure, Section } from "@/lib/case-study";
import { projectHex, projects, projectTextHex } from "@/lib/projects";
import { Breakdown } from "./breakdown";
import { GoldenCircle } from "./golden-circle";
import { Icon } from "./icons";
import { JobMap } from "./job-map";
import { JamCover } from "./jam-cover";
import { PersonaCard } from "./persona-card";

/** Body copy is Large Body (20px) and runs the full width of its container. */
const TEXT = "type-body-lg text-ink-body";

/** Micro label in the project's text accent; `dot` adds a swatch of the full accent before it. */
function Eyebrow({ children, color, dot }: { children: string; color?: string; dot?: string }) {
  return (
    <p className="type-micro flex items-center gap-2 text-ink-subtle" style={color ? { color } : undefined}>
      {dot && <span aria-hidden className="size-2 rounded-full" style={{ backgroundColor: dot }} />}
      {children}
    </p>
  );
}

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className={`space-y-(--space-paragraph) ${TEXT}`}>
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

const COLUMNS = {
  1: "",
  2: "md:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
} as const;
const SIZES = {
  1: "(min-width: 1440px) 1192px, 100vw",
  2: "(min-width: 768px) 50vw, 100vw",
  3: "(min-width: 640px) 33vw, 100vw",
  4: "(min-width: 768px) 25vw, 50vw",
} as const;

function Figures({ figures, columns = 1, fit = "framed" }: Extract<Block, { type: "figures" }>) {
  // Photos and full-bleed art: each fills its own card
  if (fit === "bleed") {
    return (
      <div className={`grid gap-3 pt-4 ${COLUMNS[columns]}`}>
        {figures.map((f) => (
          <figure key={f.src.src} className="overflow-hidden rounded-card bg-surface">
            <Image src={f.src} alt={f.alt} sizes={SIZES[columns]} placeholder="blur" className="h-auto w-full" />
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
        <div key={f.title} className="grid gap-3 md:grid-cols-[240px_minmax(0,1fr)] md:gap-18">
          <dt>
            <FeaturePill feature={f} accent={accent} />
          </dt>
          <dd className={`md:pt-2 ${TEXT}`}>{f.body}</dd>
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
    <ul className="grid gap-3 pt-4 md:grid-cols-3">
      {items.map((p, i) => (
        <PersonaCard key={p.name} persona={p} index={i} />
      ))}
    </ul>
  );
}

function Quotes({ items }: Extract<Block, { type: "quotes" }>) {
  return (
    <ul className="grid gap-3 pt-4 md:grid-cols-2">
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

function Stats({ items }: Extract<Block, { type: "stats" }>) {
  return (
    <dl className="grid grid-cols-2 gap-3 pt-4 md:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="flex flex-col-reverse rounded-card bg-surface p-6">
          <dt className="type-body-md mt-1 text-ink-body">{s.label}</dt>
          <dd className="type-subtitle">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Screens on a surface card beside their copy; every other row puts the screens on the right. */
function Spotlights({ items }: Extract<Block, { type: "spotlights" }>) {
  return (
    <div className="space-y-12 pt-4 md:space-y-18">
      {items.map((item, i) => (
        <div key={item.title} className="grid items-center gap-6 md:grid-cols-2 md:gap-18">
          <div
            className={`flex h-90 items-start justify-center gap-3 overflow-hidden rounded-card bg-surface px-6 pt-10 sm:h-110 md:px-10 ${
              i % 2 ? "md:order-last" : ""
            }`}
          >
            {item.figures.map((f) => (
              <Image
                key={f.src.src}
                src={f.src}
                alt={f.alt}
                sizes="(min-width: 768px) 240px, 45vw"
                className="h-auto w-1/2 max-w-60"
              />
            ))}
          </div>
          <div>
            <h3 className="type-subheading">{item.title}</h3>
            <p className={`mt-2 ${TEXT}`}>{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BlockView({ block, accent, textAccent }: { block: Block; accent: string; textAccent?: string }) {
  switch (block.type) {
    case "text":
      return <Paragraphs paragraphs={block.paragraphs} />;
    case "list":
      return (
        <ul className={`list-disc space-y-2 pl-6 marker:text-ink-subtle ${TEXT}`}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "emphasis":
      return <p className="type-body-lg font-bold! text-ink">{block.text}</p>;
    case "subheading":
      return (
        <div className="pt-6">
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
      return <Stats {...block} />;
    case "spotlights":
      return <Spotlights {...block} />;
    case "golden-circle":
      return <GoldenCircle {...block} accent={accent} />;
    case "breakdown":
      return <Breakdown {...block} accent={accent} />;
    case "job-map":
      return <JobMap {...block} accent={accent} textAccent={textAccent} />;
  }
}

function SectionView({
  section,
  index,
  accent,
  textAccent,
}: {
  section: Section;
  index: number;
  accent: string;
  textAccent?: string;
}) {
  const id = `section-${index}`;
  const statement = section.variant === "statement";
  return (
    <Container as="section" aria-labelledby={id} className="mt-(--space-section)">
      <Eyebrow color={textAccent}>{section.eyebrow}</Eyebrow>
      <h2
        id={id}
        className={
          statement
            ? "type-subtitle mt-3 border-l-4 pl-6 md:pl-8"
            : "type-heading mt-1"
        }
        style={statement ? { borderColor: accent } : undefined}
      >
        {section.title}
      </h2>
      {section.blocks && (
        <div className="mt-6 space-y-6">
          {section.blocks.map((block, i) => (
            <BlockView key={i} block={block} accent={accent} textAccent={textAccent} />
          ))}
        </div>
      )}
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

  return (
    <main className="pb-30 xl:[--gutter:200px]">
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

      <Container className="mt-18 grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-18">
        <div>
          <Eyebrow color={textAccent}>Context</Eyebrow>
          <p className={`mt-3 ${TEXT}`}>{study.context}</p>
        </div>
        <dl className="grid grid-cols-2 content-start gap-6">
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
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {study.contributions.map((c) => (
            <li key={c.title} className="rounded-card bg-surface p-6">
              <h3 className="type-subheading">{c.title}</h3>
              <p className="type-body-md mt-2 text-ink-body">{c.body}</p>
            </li>
          ))}
        </ul>
      </Container>

      {study.sections.map((section, i) => (
        <SectionView key={section.eyebrow} section={section} index={i} accent={accent} textAccent={textAccent} />
      ))}

      <Container className="mt-(--space-section)">
        <BackLink href="/#projects" label="Back to projects" className="-ml-3" />
      </Container>
    </main>
  );
}
