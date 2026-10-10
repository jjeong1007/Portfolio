import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { Swatch } from "@/components/ui/swatch";
import { CharacterStrip } from "@/components/design-system/character-strip";
import { neutrals, projectColors, typeScale } from "@/lib/design-tokens";

const brandColors = [neutrals.black, neutrals.white, ...Object.values(projectColors)];
const lightNeutrals = [neutrals.white, neutrals.surface, neutrals.border];
const darkNeutrals = [neutrals.subtle, neutrals.text, neutrals.black];

export function Foundations() {
  return (
    <Container className="pt-[37px] pb-30">
      <SectionIntro title="Foundations" level="section">
        <p>
          Foundations don’t just establish the details of your brand. It also establishes the tone
          and feel of what you’re building.
        </p>
      </SectionIntro>

      {/* Brand board */}
      <div className="mt-(--space-intro) grid gap-3 lg:grid-cols-[660fr_520fr]">
        <div className="flex min-h-[420px] flex-col items-center justify-center gap-[7px] rounded-card bg-surface lg:min-h-[620px]">
          <Image src="/brand/logo-mark-small.svg" alt="" width={94} height={94} />
          <p className="type-subtitle">Jason Jeong</p>
        </div>
        <ul className="flex flex-col gap-3" aria-label="Brand colors">
          {brandColors.map((color) => (
            <li key={color.name}>
              <Swatch color={color} />
            </li>
          ))}
        </ul>
      </div>

      {/* Mood & Tone */}
      <section aria-labelledby="mood-title" className="mt-18">
        <SectionIntro title="Mood & Tone" id="mood-title">
          <p>
            This design system embodies a “playful minimalism” style where there is minimal content
            throughout with slick designs but still maintains a level of playfulness through vibrant
            colors that are speckled in throughout.
          </p>
          <p>
            Elements of minimalism come into play through the usage of black and white as primary
            colors throughout the website and the font “Satoshi” for body texts where information
            needs to be easily consumed by users.
          </p>
          <p>
            Elements of playfulness seep through the website in each project page where small specks
            or components are filled with each respective vibrant color. The usage of the font
            Bricolage Grotesque allows for more fun experimentation through a fun typography that is
            more dynamic than a traditional flat sans-serif or mono font.
          </p>
          <p>
            The primary character design of myself also adds to the playful minimalism by
            incorporating a vector design of a character that has both a minimal and slick look to
            it but also adding a lot of fun throughout the website as well.
          </p>
        </SectionIntro>
        <div className="mt-(--space-intro)">
          <CharacterStrip />
        </div>
      </section>

      {/* Color palette */}
      <section aria-labelledby="color-title" className="mt-(--space-section)">
        <SectionIntro title="Color palette" id="color-title">
          <p>
            This design system contains a simple palette consisting of various shades of grays as
            the primary color palette alongside a few vibrant colors that represent each project.
            There are a total of 6 different project colors.
          </p>
        </SectionIntro>

        <div className="mt-(--space-intro) grid gap-5 md:grid-cols-[576fr_567fr] md:gap-12.5">
          {[lightNeutrals, darkNeutrals].map((column, i) => (
            <ul key={i} className="flex flex-col gap-5" aria-label={i ? "Dark neutrals" : "Light neutrals"}>
              {column.map((color) => (
                <li key={color.name}>
                  <Swatch color={color} />
                </li>
              ))}
            </ul>
          ))}
        </div>

        <ul className="mt-[35px] grid grid-cols-3 gap-3 lg:grid-cols-6" aria-label="Project colors">
          {Object.values(projectColors).map((color) => (
            <li key={color.name}>
              <Swatch color={color} variant="chip" />
            </li>
          ))}
        </ul>
      </section>

      {/* Typography */}
      <section aria-labelledby="type-title" className="mt-(--space-section)">
        <SectionIntro title="Typography" id="type-title">
          <p>This design system composes of two primary typefaces: Bricolage Grotesque and Satoshi.</p>
          <p>
            Bricolage Grotesque creates a more playful and fun feel towards the website really
            allowing me to showcase my playfulness when I design. It also just compliments to
            character designs.
          </p>
          <p>
            Satoshi provides a more minimal and simple experience to the user as they are reading
            the contents of my website. It’s slick and clean look makes text easier to read and
            digest because of its sans-serif nature.
          </p>
        </SectionIntro>

        <div className="mt-[54px] flex min-h-[190px] flex-col items-center justify-center gap-5 rounded-card bg-surface px-6 py-10 text-center md:flex-row md:gap-30 md:py-6 md:text-left">
          <div className="font-display font-bold [font-variation-settings:'opsz'_14]">
            <p className="text-body-lg leading-display tracking-tight">Bricolage Grotesque</p>
            <p className="text-subtitle leading-display tracking-tight">Playfulness</p>
          </div>
          <Image src="/brand/icon-times.svg" alt="combined with" width={28} height={28} />
          <div className="font-body font-bold">
            <p className="text-body-lg leading-display tracking-tight">Satoshi</p>
            <p className="text-subtitle leading-display tracking-tight">Minimalism</p>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-[7px]" aria-label="Type scale">
          {typeScale.map((style) => (
            <div
              key={style.label}
              className="flex flex-wrap items-center justify-between gap-x-5 border-b border-line pb-3"
            >
              <span className={style.className}>{style.label}</span>
              <span className="type-body-sm font-bold whitespace-nowrap md:text-body-md">{style.spec}</span>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
