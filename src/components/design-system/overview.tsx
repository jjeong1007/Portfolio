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
    <Container as="header" grid className="pt-6 md:pt-14">
      <BackLink />
      <h1 className="type-title mt-8 md:mt-10">
        Thinking in systems.
        <br />
        Not by each frame.
      </h1>

      {/* Copy on the first half, the mark centered in columns 9–11 */}
      <div className="mt-10 flex flex-col-reverse items-start gap-6 md:mt-14 md:grid md:grid-cols-subgrid md:gap-y-0">
        <div className="md:col-span-7 md:pt-2 lg:col-span-6">
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
          className="size-30 shrink-0 md:col-span-4 md:col-start-9 md:size-50 md:justify-self-end lg:col-span-3 lg:justify-self-center xl:size-68"
        />
      </div>

      {/* Two blocks of 5 columns, one empty column between them */}
      <div className="mt-24 grid grid-cols-subgrid gap-y-14 lg:mt-41">
        {blocks.map((block, i) => (
          <section
            key={block.eyebrow}
            className={`col-span-full flex flex-col gap-6 lg:col-span-5 ${i ? "lg:col-start-7" : "lg:col-start-1"}`}
          >
            <div className="flex max-w-[356px] flex-col gap-1">
              <p className="type-micro">{block.eyebrow}</p>
              <h3 className="type-heading leading-none!">{block.title}</h3>
            </div>
            {/* Question in the first 3 columns (2 of the block's 5 on desktop), answer in the rest */}
            <dl className="flex flex-col gap-6">
              {block.rows.map((row) => (
                <div key={row.q} className="grid gap-x-(--grid-gap) gap-y-2 md:grid-cols-12 lg:grid-cols-5">
                  <dt className="type-micro text-ink-subtle md:col-span-3 md:whitespace-nowrap lg:col-span-2">{row.q}</dt>
                  <dd className="leading-5 md:col-span-9 lg:col-span-3">{row.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </Container>
  );
}
