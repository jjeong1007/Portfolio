"use client";

import { useToast } from "@/components/ui/toast";
import { projectHex, type Project } from "@/lib/projects";

function Pill({ children, color }: { children: string; color: string }) {
  return (
    <span
      className="type-control inline-flex items-center rounded-control border border-paper bg-paper/72 px-4 py-2 font-bold! backdrop-blur-sm transition-transform duration-300 ease-spring group-hover:-translate-y-1"
      style={{ color }}
    >
      {children}
    </span>
  );
}

/**
 * Square project tile: a soft gradient in the project color, with the
 * project name and discipline pinned to the bottom.
 * Case studies aren't live yet, so clicking shows a toast.
 */
export function ProjectCard({ project }: { project: Project }) {
  const toast = useToast();
  const hex = projectHex(project);

  return (
    <button
      type="button"
      onClick={() => toast(`The ${project.name} case study is coming soon.`)}
      aria-label={`${project.name}, ${project.category}. Case study coming soon`}
      className="group relative aspect-square w-full overflow-hidden rounded-card bg-surface text-left"
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom transition-transform duration-500 ease-out-soft group-hover:scale-y-125"
        style={{ backgroundImage: `linear-gradient(0deg, ${hex}33 0%, ${hex}00 100%)` }}
      />
      <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
        <Pill color={hex}>{project.name}</Pill>
        <Pill color={hex}>{project.category}</Pill>
      </span>
    </button>
  );
}
