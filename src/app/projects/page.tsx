import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { BackLink } from "@/components/ui/back-link";
import { Container } from "@/components/ui/container";
import { PageTransition } from "@/components/ui/page-transition";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected product, strategy and design work by Jason Jeong.",
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <main>
        <Container className="pt-6 pb-40 md:pt-14">
          <BackLink />
          <h1 className="sr-only">Projects</h1>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </Container>
      </main>
    </PageTransition>
  );
}
