import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Block, CaseStudy, Feature, Figure, Section } from "@/lib/case-study";
import { projectHex, projects, projectTextHex } from "@/lib/projects";
import { Bars } from "./bars";
import { Breakdown } from "./breakdown";
import { dmMono } from "./editorial-font";
import { EditorialPersona } from "./editorial-persona";
import { GoldenCircle } from "./golden-circle";
import { Icon } from "./icons";
import { JamCover } from "./jam-cover";
import { JobMap } from "./job-map";
import "./editorial.css";

/**
 * A data-driven case study (`src/content/case-studies/`) set in the editorial
 * layout of the Shopify case study (shopify-editorial.tsx): hero with meta,
 * cover, context, contributions, then each section as eyebrow + heading with
 * prose held to the narrow measure and figures at full width. Styles are the
 * shared editorial.css; the accent is the project's color.
 */

const FULL = "(min-width: 1440px) 1192px, 100vw";
const SIZES = {
  1: FULL,
  2: "(min-width: 810px) 50vw, 100vw",
  3: "(min-width: 810px) 33vw, 100vw",
  4: "(min-width: 810px) 25vw, 50vw",
} as const;
const HALF = SIZES[2];

const pad = (n: number) => String(n).padStart(2, "0");

/** Three product screens on a grey card, the middle one raised, running off the bottom edge. */
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
          className={`h-auto w-1/3 max-w-70 ${i === 1 ? "" : "mt-10 md:mt-16"}`}
        />
      ))}
    </figure>
  );
}

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return paragraphs.map((p) => <p key={p}>{p}</p>);
}

function Figures({ figures, columns = 1, fit = "framed" }: Extract<Block, { type: "figures" }>) {
  const cols = columns > 1 ? `cols-${columns}` : "";
  if (fit === "bento") {
    return (
      <div className="bento">
        {figures.map((f, i) => {
          const wide = i % 4 === 0 || i % 4 === 3;
          return (
            <figure key={f.src.src} className={wide ? "wide" : "tall"}>
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes={wide ? "(min-width: 810px) 67vw, 100vw" : "(min-width: 810px) 33vw, 100vw"}
                placeholder="blur"
              />
            </figure>
          );
        })}
      </div>
    );
  }
  if (fit === "bleed") {
    return (
      <div className={`figs ${cols}`}>
        {figures.map((f) => (
          <figure key={f.src.src} className="bleed-fig">
            <div className="shot">
              <Image src={f.src} alt={f.alt} sizes={SIZES[columns]} placeholder="blur" />
              {/* Speech bubbles float over the image from tablet up; phones get them listed below */}
              {f.callouts?.map((c) => (
                <blockquote
                  key={c.quote}
                  className="type-control absolute m-0 hidden max-w-80 rounded-control border border-line bg-paper px-4 py-3 text-ink shadow-float md:block"
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                >
                  “{c.quote}”
                </blockquote>
              ))}
            </div>
            {f.callouts && (
              <ul className="space-y-2 pt-4 md:hidden">
                {f.callouts.map((c) => (
                  <li key={c.quote}>“{c.quote}”</li>
                ))}
              </ul>
            )}
            {f.caption && <figcaption>{f.caption}</figcaption>}
          </figure>
        ))}
      </div>
    );
  }
  // Transparent graphics on a grey frame. Several figures are captioned each; a single one under the frame.
  const single = figures.length === 1;
  return (
    <figure className="frame">
      <div className={`figs ${cols}`}>
        {figures.map((f) => (
          <div key={f.src.src}>
            <Image
              src={f.src}
              alt={f.alt}
              sizes={f.maxWidth ? `${f.maxWidth}px` : SIZES[columns]}
              style={f.maxWidth ? { width: f.maxWidth } : undefined}
            />
            {!single && f.caption && <figcaption>{f.caption}</figcaption>}
          </div>
        ))}
      </div>
      {single && figures[0].caption && <figcaption>{figures[0].caption}</figcaption>}
    </figure>
  );
}

function FeaturePill({ feature, big }: { feature: Feature; big?: boolean }) {
  return (
    <span className={`fpill ${big ? "big" : ""}`}>
      <span className="icon">
        <Icon name={feature.icon} />
      </span>
      {feature.title}
    </span>
  );
}

/** Card grids: two across, or three when there are three (or a multiple of three) items. */
const gridFor = (n: number) => (n % 3 === 0 && n % 2 !== 0 ? "grid-3" : "grid-2");

/** Blocks set as prose: held to the narrow measure. Everything else runs the full width. */
const PROSE = new Set<Block["type"]>(["text", "list", "emphasis", "subheading"]);

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return <Paragraphs paragraphs={block.paragraphs} />;
    case "list":
      return (
        <ul className="prose-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "emphasis":
      return <p className="emphasis">{block.text}</p>;
    case "subheading":
      return (
        <div className="subhead">
          <h3>{block.title}</h3>
          <Paragraphs paragraphs={block.paragraphs} />
        </div>
      );
    case "figures":
      return <Figures {...block} />;
    case "placeholder":
      return (
        <div className={`figs ${(block.columns ?? 1) > 1 ? `cols-${block.columns}` : ""}`}>
          {block.labels.map((label) => (
            <div key={label} className="placeholder" style={block.tall ? { minHeight: 480 } : undefined}>
              <p className="eyebrow">Image placeholder</p>
              <p>{label}</p>
            </div>
          ))}
        </div>
      );
    case "cards":
      return (
        <div className={gridFor(block.items.length)}>
          {block.items.map((card, i) => (
            <div className="card" key={card.title}>
              {card.icon ? (
                <span className="icon">
                  <Icon name={card.icon} className="size-9" />
                </span>
              ) : (
                <span className="num">{pad(i + 1)}</span>
              )}
              <h4>{card.title}</h4>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      );
    case "logos":
      return (
        <div className="logos">
          {block.items.map((logo) => (
            <div className="card" key={logo.name}>
              <Image src={logo.src} alt="" />
              <strong>{logo.name}</strong>
            </div>
          ))}
        </div>
      );
    case "features":
      return (
        <div className={gridFor(block.items.length)}>
          {block.items.map((f) => (
            <div className="card" key={f.title}>
              <span className="icon">
                <Icon name={f.icon} className="size-9" />
              </span>
              <h4>{f.title}</h4>
              {f.body && <p>{f.body}</p>}
            </div>
          ))}
        </div>
      );
    case "merge":
      return (
        <div className="merge">
          <div className="merge-from">
            {block.from.map((f, i) => (
              <div key={f.title} className="merge-from">
                {i > 0 && (
                  <span aria-hidden className="sign">
                    +
                  </span>
                )}
                <FeaturePill feature={f} />
              </div>
            ))}
          </div>
          <span aria-hidden className="sign">
            =
          </span>
          <FeaturePill feature={block.to} big />
        </div>
      );
    case "personas":
      return (
        <div className={`personas ${block.items.length > 1 ? "many" : ""}`}>
          {block.items.map((p, i) => (
            <EditorialPersona key={p.name} persona={p} index={i} />
          ))}
        </div>
      );
    case "quotes":
      return (
        <div className={`quotes ${block.items.length === 3 ? "" : "pair"}`}>
          {block.items.map((q) => (
            <figure className="quote quote-card" key={q.quote} style={{ margin: 0 }}>
              {q.label && <p className="eyebrow accent">{q.label}</p>}
              <blockquote style={{ margin: 0 }}>{q.quote}</blockquote>
              {q.attribution && <cite>— {q.attribution}</cite>}
            </figure>
          ))}
        </div>
      );
    case "stats": {
      const n = Math.min(block.items.length, 4);
      return (
        <div className={`stats ${n > 2 ? `cols-${n}` : ""}`} style={{ "--n": n } as CSSProperties}>
          {block.items.map((s) => (
            <div className="stat" key={s.label}>
              <span className="big">{s.value}</span>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      );
    }
    case "findings":
      return (
        <div className="stack narrow">
          {block.items.map((item) => (
            <div className={`item ${block.tone === "positive" ? "good" : "bad"}`} key={item.title}>
              <p className="tag">{item.title}</p>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      );
    case "tests":
      return (
        <div className="stack">
          {block.items.map((t) => (
            <div className="test-row" key={t.quote}>
              <Image src={t.figure.src} alt={t.figure.alt} sizes="160px" />
              <div>
                <blockquote>“{t.quote}”</blockquote>
                <p>{t.finding}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "reframe":
      return (
        <div className="reframe">
          <span className="pill old">{block.from}</span>
          <span className="arrow" aria-hidden>
            →
          </span>
          <span className="pill new">{block.to}</span>
        </div>
      );
    case "testimonial":
      return (
        <div className="testimonial">
          <blockquote>“{block.quote}”</blockquote>
          <cite>— {block.attribution}</cite>
        </div>
      );
    case "spotlights":
      return block.items.map((item, i) => (
        <div className={`split ${i % 2 ? "flip" : ""}`} key={item.title}>
          {item.mockup ? (
            <figure>
              <Image src={item.mockup.src} alt={item.mockup.alt} sizes={HALF} placeholder="blur" />
            </figure>
          ) : (
            <figure className="screens">
              {item.figures?.map((f) => (
                <Image key={f.src.src} src={f.src} alt={f.alt} sizes="240px" />
              ))}
            </figure>
          )}
          <div>
            <span className="step">{pad(i + 1)}</span>
            <h3>{item.title}</h3>
            <p className="muted">{item.body}</p>
          </div>
        </div>
      ));
    // Charts drawn by their own components, in the project accent
    case "golden-circle":
    case "breakdown":
    case "bars":
    case "job-map":
      return <Chart block={block} />;
  }
}

function Chart({ block }: { block: Extract<Block, { type: "golden-circle" | "breakdown" | "bars" | "job-map" }> }) {
  const accent = "var(--cs-accent)";
  const textAccent = "var(--cs-accent-text)";
  let chart: ReactNode;
  if (block.type === "golden-circle") chart = <GoldenCircle {...block} accent={accent} />;
  else if (block.type === "breakdown") chart = <Breakdown {...block} accent={accent} />;
  else if (block.type === "bars") chart = <Bars {...block} accent={accent} />;
  else chart = <JobMap {...block} accent={accent} textAccent={textAccent} />;
  return <div style={{ marginTop: 36 }}>{chart}</div>;
}

/** Runs of prose blocks share one narrow column; other blocks sit between them at full width. */
function Blocks({ blocks }: { blocks: Block[] }) {
  const groups: Block[][] = [];
  for (const block of blocks) {
    const last = groups.at(-1);
    if (last && PROSE.has(block.type) && PROSE.has(last[0].type)) last.push(block);
    else groups.push([block]);
  }
  return groups.map((group, i) =>
    PROSE.has(group[0].type) ? (
      <div className="narrow" key={i} style={i > 0 ? { marginTop: 36 } : undefined}>
        {group.map((block, j) => (
          <BlockView key={j} block={block} />
        ))}
      </div>
    ) : (
      <BlockView key={i} block={group[0]} />
    ),
  );
}

function SectionView({ section, index }: { section: Section; index: number }) {
  const id = `section-${index}`;
  const divider = section.part && (
    <div className="divider">
      <p className="eyebrow good">{section.part}</p>
    </div>
  );
  const blocks = section.blocks ?? [];

  // Problem statements: the title on a card tinted with the accent (grey when muted); a statement's
  // blocks follow the card, a callout's sit inside it
  if (section.variant === "statement" || section.variant === "callout") {
    const inside = section.variant === "callout";
    return (
      <>
        {divider}
        <section aria-labelledby={id}>
          <div className={`callout ${section.tone === "muted" ? "grey" : ""}`}>
            <p className="eyebrow">{section.eyebrow}</p>
            <h3 id={id}>{section.title}</h3>
            {inside && blocks.map((b, i) => (b.type === "text" ? <Paragraphs key={i} paragraphs={b.paragraphs} /> : null))}
          </div>
          {inside ? (
            <Blocks blocks={blocks.filter((b) => b.type !== "text")} />
          ) : (
            blocks.length > 0 && (
              <div style={{ marginTop: 36 }}>
                <Blocks blocks={blocks} />
              </div>
            )
          )}
        </section>
      </>
    );
  }

  // Final solution: header and lead copy, the hero mockup, then the feature rows (Shopify's "Our solution")
  if (section.variant === "showcase") {
    const [first, ...rest] = blocks;
    const lead = first?.type === "text" ? first : undefined;
    return (
      <>
        {divider}
        <section aria-labelledby={id}>
          <div className="narrow showcase-head">
            <p className="eyebrow">{section.eyebrow}</p>
            <h2 id={id}>{section.title}</h2>
            {lead && <Paragraphs paragraphs={lead.paragraphs} />}
          </div>
          {section.hero && (
            // A transparent mockup: centered at a capped width, not stretched to the full frame
            <figure className="hero-fig">
              <Image src={section.hero.src} alt={section.hero.alt} sizes="(min-width: 810px) 480px, 100vw" />
            </figure>
          )}
          <Blocks blocks={lead ? rest : blocks} />
        </section>
      </>
    );
  }

  return (
    <>
      {divider}
      <section aria-labelledby={id}>
        <div className="narrow">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id={id}>{section.title}</h2>
        </div>
        <Blocks blocks={blocks} />
      </section>
    </>
  );
}

export function EditorialCaseStudy({ study }: { study: CaseStudy }) {
  const project = projects.find((p) => p.slug === study.slug);
  const style = {
    "--cs-accent": project ? projectHex(project) : "var(--cs-ink-label)",
    "--cs-accent-text": project ? projectTextHex(project) : "var(--cs-ink-label)",
  } as CSSProperties;

  return (
    <main className={`editorial-cs ${dmMono.variable}`} style={style}>
      <div className="wrap">
        <nav className="back" aria-label="Breadcrumb">
          <Link href="/#projects">← Back to projects</Link>
        </nav>

        <header className="hero">
          {project && <p className="eyebrow">{project.category}</p>}
          <h1 className="display">{study.name}</h1>
          <p className="lead">{study.tagline}</p>
          <div className="meta">
            {study.meta.map((row) => (
              <div key={row.label}>
                <span>{row.label}</span>
                {row.values.map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
            ))}
          </div>
        </header>

        {study.cover.length > 0 && (
          <div className="cover">
            {study.slug === "amazon-music" ? <JamCover screens={study.cover} /> : <Cover screens={study.cover} />}
          </div>
        )}

        <section className="narrow">
          <p className="eyebrow">Context</p>
          <p>{study.context}</p>
        </section>

        <section className="tight">
          <p className="eyebrow">My contributions</p>
          <div className={gridFor(study.contributions.length)}>
            {study.contributions.map((c) => (
              <div className="card" key={c.title}>
                <h4>{c.title}</h4>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {study.sections.map((section, i) => (
          <SectionView key={section.eyebrow} section={section} index={i} />
        ))}

        <footer>
          <p className="display">Thanks for reading</p>
          <div className="links">
            <Link href="/#projects">Back to projects</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
