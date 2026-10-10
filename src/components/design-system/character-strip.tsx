import Image from "next/image";

/**
 * Positions mirror the Figma card (1192 × 235) as percentages so the strip
 * scales with its container. Later entries paint on top.
 */
const characters = [
  { src: "/brand/character-1.svg", w: 320.508, h: 180.516, left: 900, top: 74 },
  { src: "/brand/character-2.svg", w: 212.5, h: 174.359, left: 687, top: 69 },
  { src: "/brand/character-3.svg", w: 255.414, h: 167.228, left: 440, top: 81 },
  { src: "/brand/character-4.svg", w: 185.321, h: 172.967, left: 266, top: 62 },
  { src: "/brand/character-5.svg", w: 277.362, h: 186.824, left: -11, top: 52 },
];

const CARD_W = 1192;
const CARD_H = 235;

export function CharacterStrip() {
  return (
    <div className="overflow-x-auto overflow-y-hidden rounded-card bg-surface md:overflow-hidden">
      <div className="relative aspect-[1192/235] min-w-[640px]">
        {characters.map((c) => (
          <Image
            key={c.src}
            src={c.src}
            alt=""
            width={c.w}
            height={c.h}
            className="absolute h-auto"
            style={{
              left: `${(c.left / CARD_W) * 100}%`,
              top: `${(c.top / CARD_H) * 100}%`,
              width: `${(c.w / CARD_W) * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
