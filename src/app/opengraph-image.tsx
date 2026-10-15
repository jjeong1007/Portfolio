import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Link preview — mirrors Figma "Frame 343" (JJJ Final Undergrad Portfolio, node 152:1199).

export const alt = "Jason Jeong";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The Figma frame is 855×392; scale its contents up to fill the 1200×630 card.
const SCALE = 1.4;
const MARK = 128 * SCALE;
const DOT = 15 * SCALE;
const DOT_STEP = 18.488 * SCALE;
const CONTENT_WIDTH = 502 * SCALE;
const LEFT = (size.width - CONTENT_WIDTH) / 2;
const TOP = (size.height - MARK) / 2;

const DOT_COLORS = ["#2a6eff", "#ff4805", "#f08000", "#47c147", "#00b7b7", "#a95deb"];

export default async function Image() {
  const svg = await readFile(join(process.cwd(), "public/brand/logo-mark-large.svg"));
  const mark = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#fafafa" }}>
        {[0, 1, 2].map((i) => (
          <img
            key={i}
            src={mark}
            alt=""
            width={MARK}
            height={MARK}
            style={{ position: "absolute", left: LEFT + i * MARK, top: TOP }}
          />
        ))}
        {DOT_COLORS.map((color, i) => (
          <div
            key={color}
            style={{
              position: "absolute",
              left: LEFT + 395 * SCALE + i * DOT_STEP,
              top: TOP + 100 * SCALE,
              width: DOT,
              height: DOT,
              borderRadius: DOT,
              background: color,
            }}
          />
        ))}
      </div>
    ),
    size,
  );
}
