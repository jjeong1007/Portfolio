import type { ReactNode } from "react";

type SectionIntroProps = {
  title: string;
  /** "section" = Sub-title (44px) for top-level sections, "subsection" = Heading (32px) */
  level?: "section" | "subsection";
  id?: string;
  children?: ReactNode;
};

/** Heading + muted body paragraphs. Pass each paragraph as a <p>. */
export function SectionIntro({ title, level = "subsection", id, children }: SectionIntroProps) {
  const Heading = level === "section" ? "h2" : "h3";
  return (
    <div>
      <Heading
        id={id}
        className={level === "section" ? "type-subtitle" : "type-heading"}
      >
        {title}
      </Heading>
      {children && (
        <div
          className={`space-y-(--space-paragraph) text-ink-body ${
            level === "section" ? "mt-2" : "mt-1"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
