import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CaseStudyPage } from "@/components/case-study/case-study-page";
import { PageTransition } from "@/components/ui/page-transition";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

// Unknown slugs fall through to notFound() (`dynamicParams` isn't allowed with Cache Components)
export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  return study ? { title: study.name, description: study.tagline } : {};
}

/** The slug is URL data, so it's read behind Suspense; links prefetch it so navigation stays instant. */
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <PageTransition>
      <Suspense fallback={<main className="min-h-screen" />}>
        <CaseStudy params={params} />
      </Suspense>
    </PageTransition>
  );
}

async function CaseStudy({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  return <CaseStudyPage study={study} />;
}
