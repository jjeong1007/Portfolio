import Image from "next/image";
import { BackLink } from "@/components/ui/back-link";
import { Container } from "@/components/ui/container";

const blocks = [
  {
    eyebrow: "The stack",
    title: "How it’s built.",
    rows: [
      {
        q: "How is it designed?",
        a: "Hand designed manually directly inside of Figma in terms of page layouts, components, and using various colors.",
      },
      {
        q: "How is it developed?",
        a: "Using Figma MCPs and Claude Code to develop the full website into something fully functional fully published on Vercel.",
      },
    ],
  },
  {
    eyebrow: "The system",
    title: "How it comes together.",
    rows: [
      {
        q: "How is it used?",
        a: "This design system allows me to use components easily to create new designs efficiently.",
      },
      {
        q: "What about agents?",
        a: "Keeping agents in mind, I developed this design system to ensure any coding tool can read through the design system documentation with ease to easily replicate designs in my own style.",
      },
    ],
  },
];

export function Overview() {
  return (
    <Container as="header" className="pt-6 md:pt-14">
      <BackLink />
      <h1 className="type-title mt-8 md:mt-10">
        Thinking in systems.
        <br />
        Not by each frame.
      </h1>

      <div className="mt-10 flex flex-col-reverse items-start justify-between gap-6 md:mt-14 md:flex-row md:gap-18">
        <div className="max-w-copy md:pt-2">
          <h2 className="type-subtitle">Overview</h2>
          <div className="space-y-(--space-paragraph) text-ink-body">
            <p>
              Product workflows has hugely shifted from low-fi → high-fi → design system to now
              almost being entirely reverse where high-fi and design systems are beginning to blend.
            </p>
            <p>
              As a result, I decided to create a design system myself for my own personal portfolio
              to adapt to the growing agent based design workflows where I feed my agents with my
              own personal branding and design system to make developing new screens and iterations
              so much faster.
            </p>
          </div>
        </div>
        <Image
          src="/brand/logo-mark-large.svg"
          alt="Jason Jeong logo mark"
          width={270}
          height={270}
          preload
          className="size-30 shrink-0 md:size-50 xl:mr-22 xl:size-68"
        />
      </div>

      <div className="mt-24 grid gap-14 lg:mt-41 lg:grid-cols-2 lg:gap-18">
        {blocks.map((block) => (
          <section key={block.eyebrow} className="flex flex-col gap-6">
            <div className="flex max-w-[356px] flex-col gap-1">
              <p className="type-micro">{block.eyebrow}</p>
              <h3 className="type-heading leading-none!">{block.title}</h3>
            </div>
            <dl className="flex flex-col gap-6">
              {block.rows.map((row) => (
                <div key={row.q} className="grid gap-2 md:grid-cols-[148px_1fr] md:gap-18">
                  <dt className="type-micro text-ink-subtle md:whitespace-nowrap">{row.q}</dt>
                  <dd className="leading-5">{row.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </Container>
  );
}
