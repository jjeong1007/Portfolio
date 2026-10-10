import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";

type Asset = { src: string; name: string; meta?: string; w: number; h: number; alt: string };

const logos: Asset[] = [
  { src: "/brand/logo-mark-large.svg", name: "logo-mark-large.svg", meta: "270 × 270", w: 180, h: 180, alt: "Logo mark, large" },
  { src: "/brand/logo-mark-small.svg", name: "logo-mark-small.svg", meta: "94 × 94", w: 94, h: 94, alt: "Logo mark, small" },
];

const characters: Asset[] = [
  { src: "/brand/character-1.svg", name: "character-1.svg", w: 321, h: 181, alt: "Character at a desk with a laptop" },
  { src: "/brand/character-2.svg", name: "character-2.svg", w: 213, h: 174, alt: "Character pose 2" },
  { src: "/brand/character-3.svg", name: "character-3.svg", w: 255, h: 167, alt: "Character pose 3" },
  { src: "/brand/character-4.svg", name: "character-4.svg", w: 185, h: 173, alt: "Character pose 4" },
  { src: "/brand/character-5.svg", name: "character-5.svg", w: 277, h: 187, alt: "Character pose 5" },
];

const icons: Asset[] = [
  { src: "/brand/icon-blocks.svg", name: "lucide/blocks", w: 40, h: 40, alt: "Blocks icon" },
  { src: "/brand/icon-library-big.svg", name: "lucide/library-big", w: 40, h: 40, alt: "Library icon" },
  { src: "/brand/icon-times.svg", name: "times (custom)", w: 28, h: 28, alt: "Times glyph" },
];

function AssetCard({ asset, size = "lg" }: { asset: Asset; size?: "lg" | "sm" }) {
  return (
    <figure className="flex flex-col overflow-hidden rounded-card bg-surface">
      <div className={`grid place-items-center p-6 ${size === "lg" ? "h-[220px] md:h-[280px]" : "h-40"}`}>
        <Image src={asset.src} alt={asset.alt} width={asset.w} height={asset.h} className="max-h-full w-auto" />
      </div>
      <figcaption className="flex justify-between gap-3 border-t border-line bg-paper p-3">
        <span className="type-micro !normal-case">{asset.name}</span>
        {asset.meta && <span className="type-micro text-ink-subtle">{asset.meta}</span>}
      </figcaption>
    </figure>
  );
}

export function Assets() {
  return (
    <Container className="pt-[37px] pb-30">
      <SectionIntro title="Assets" level="section">
        <p>
          The marks, characters and icons that carry the brand. Every asset is a vector exported
          straight from Figma and lives in <code>/public/brand</code>.
        </p>
      </SectionIntro>

      <section aria-labelledby="logo-title" className="mt-18">
        <h3 id="logo-title" className="type-heading">Logo mark</h3>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {logos.map((a) => <AssetCard key={a.name} asset={a} />)}
        </div>
      </section>

      <section aria-labelledby="char-title" className="mt-(--space-section)">
        <h3 id="char-title" className="type-heading">Characters</h3>
        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {characters.map((a) => <AssetCard key={a.name} asset={a} />)}
        </div>
      </section>

      <section aria-labelledby="icon-title" className="mt-(--space-section)">
        <h3 id="icon-title" className="type-heading">Icons</h3>
        <p className="mt-1.25 text-ink-body">
          UI icons come from{" "}
          <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="underline">
            Lucide
          </a>{" "}
          at 20px with a black stroke.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {icons.map((a) => <AssetCard key={a.name} asset={a} size="sm" />)}
        </div>
      </section>
    </Container>
  );
}
