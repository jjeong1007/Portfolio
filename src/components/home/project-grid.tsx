import Link from "next/link";
import { JamTile } from "@/components/case-study/jam-cover";
import { VaseTile } from "@/components/home/vase-tile";
import { SiteCover } from "@/components/studio/site-cover";
import { Container } from "@/components/ui/container";
import { caseStudies } from "@/content/case-studies";
import { projectHex, projects, type Project } from "@/lib/projects";
import { NAV_FORWARD } from "@/lib/site-nav";

function Pill({ children, color, delay }: { children: string; color: string; delay: number }) {
  return (
    <span
      className="type-control inline-flex translate-y-3 items-center rounded-control border border-paper bg-paper/72 px-4 py-2 font-bold! whitespace-nowrap opacity-0 backdrop-blur-sm transition-[opacity,translate] duration-300 ease-spring group-hover:translate-y-0 group-hover:opacity-100"
      style={{ color, transitionDelay: `${delay}ms` }}
    >
      {children}
    </span>
  );
}

/**
 * Placeholder tile. At rest it's a plain surface; on hover the project's
 * color gradient fades up from the bottom and its name + discipline pills
 * rise in (Figma 94:4008). Projects with a live `url` open it in a new tab;
 * otherwise ones with a case study link to it. Amazon
 * Music and Plaza show animated covers (case-study/jam-cover.tsx,
 * home/vase-tile.tsx).
 */
function ProjectTile({ project, wide }: { project: Project; wide: boolean }) {
  const hex = projectHex(project);
  const study = caseStudies[project.slug];
  const hasCaseStudy = Boolean(study);
  return (
    <li className={`group relative ${wide ? "aspect-[4/3]" : "aspect-square"} overflow-hidden rounded-card bg-surface has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-nyck`}>
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} website (opens in a new tab)`}
          className="absolute inset-0 z-10 outline-none"
        />
      ) : hasCaseStudy && (
        <Link
          href={`/projects/${project.slug}`}
          transitionTypes={NAV_FORWARD}
          // Resolves the case study (URL data) ahead of the click so navigation is instant
          prefetch
          aria-label={`${project.name} case study`}
          className="absolute inset-0 z-10 outline-none"
        />
      )}
      {/* Amazon Music's cover: its three screens, and on hover the personas peek in to jam */}
      {project.slug === "amazon-music" && study && <JamTile screens={study.cover} />}
      {/* Plaza's cover: the vase, and on hover Jason pops out of it */}
      {project.slug === "plaza" && <VaseTile />}
      {/* Studio tiles: the client's live landing page in a browser window */}
      {project.url && <SiteCover slug={project.slug} />}
      {project.comingSoon && (
        <span className="type-micro absolute inset-0 flex items-center justify-center text-ink-subtle">
          Coming soon
        </span>
      )}
      {/* After the cover so the gradient tints it, but before the pills so they stay on top */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out-soft group-hover:opacity-100"
        style={{ backgroundImage: `linear-gradient(0deg, ${hex}33 0%, ${hex}00 100%)` }}
      />
      <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
        <Pill color={hex} delay={0}>{project.name}</Pill>
        <Pill color={hex} delay={60}>{project.category}</Pill>
      </span>
    </li>
  );
}

/**
 * Projects section on the landing page. `#projects` is the nav / companion anchor.
 * `wide` lays the tiles out two across in 4:3 cards that fill the row (/studio).
 */
export function ProjectGrid({
  items = projects,
  wide = false,
  className = "",
}: {
  items?: Project[];
  wide?: boolean;
  className?: string;
}) {
  return (
    <Container as="section" id="projects" aria-label="Projects" className={`scroll-mt-28 ${className}`}>
      <ul className={`grid gap-3 sm:grid-cols-2 ${wide ? "" : "lg:grid-cols-3"}`}>
        {items.map((project) => (
          <ProjectTile key={project.slug} project={project} wide={wide} />
        ))}
      </ul>
    </Container>
  );
}
