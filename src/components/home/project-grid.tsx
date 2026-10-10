import { Container } from "@/components/ui/container";
import { projectHex, projects, type Project } from "@/lib/projects";

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
 * rise in (Figma 94:4008).
 */
function ProjectTile({ project }: { project: Project }) {
  const hex = projectHex(project);
  return (
    <li className="group relative aspect-square overflow-hidden rounded-card bg-surface">
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

/** Projects section on the landing page. `#projects` is the nav / companion anchor. */
export function ProjectGrid({ className = "" }: { className?: string }) {
  return (
    <Container as="section" id="projects" aria-label="Projects" className={`scroll-mt-28 ${className}`}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectTile key={project.slug} project={project} />
        ))}
      </ul>
    </Container>
  );
}
