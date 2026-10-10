import type { Metadata } from "next";
import { Overview } from "@/components/design-system/overview";
import { Foundations } from "@/components/design-system/foundations";
import { Assets } from "@/components/design-system/assets";
import { PageTransition } from "@/components/ui/page-transition";
import { Tabs } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Design System",
  description: "Thinking in systems. Not by each frame. The design system behind Jason Jeong's portfolio.",
};

export default function DesignSystemPage() {
  return (
    <PageTransition>
      <main>
        <Overview />
        <div className="mt-24 lg:mt-32">
          <Tabs
            label="Design system sections"
            items={[
              { id: "foundations", label: "Foundations", icon: "/brand/icon-blocks.svg", panel: <Foundations /> },
              { id: "assets", label: "Assets", icon: "/brand/icon-library-big.svg", panel: <Assets /> },
            ]}
          />
        </div>
      </main>
    </PageTransition>
  );
}
