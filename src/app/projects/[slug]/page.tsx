import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EditorialCaseStudy } from "@/components/case-study/editorial-case-study";
import { PasswordGate } from "@/components/case-study/password-gate";
import { ShopifyEditorial } from "@/components/case-study/shopify-editorial";
import { PageTransition } from "@/components/ui/page-transition";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { hasAccess } from "@/lib/case-study-access";

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

/**
 * Password-protected case studies render the gate until the access cookie is
 * set, so their content is never sent to the browser without the password.
 */
async function CaseStudy({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  if (study.protected && !(await hasAccess())) return <PasswordGate />;
  // Shopify is hand-built; the rest render their content in the same editorial layout
  if (study.slug === "shopify") return <ShopifyEditorial />;
  return <EditorialCaseStudy study={study} />;
}
