import type { CSSProperties } from "react";
import {
  PERSONA_NECK,
  PersonaBrows,
  PersonaEyesOpen,
  PersonaFace,
  PersonaGlasses,
  PersonaHairBack,
  PersonaHairFront,
  PersonaMouth,
  type PersonaKey,
} from "./persona-art";
import { RelaxedBody } from "./pose-art";

/** Head and shoulders, in Frame 1 units, framed like the Amazon Music portraits. */
const VIEWBOX = "195 92 310 310";

/**
 * A persona drawn live from the rig instead of a PNG: arms relaxed, head
 * idling with the site's bob from the neck. `delay` offsets the loop so
 * neighboring portraits don't bob in sync.
 */
export function PersonaPortrait({ persona, delay = 0 }: { persona: PersonaKey; delay?: number }) {
  const bob: CSSProperties = { transformOrigin: `${PERSONA_NECK.x}px ${PERSONA_NECK.y}px`, animationDelay: `${delay}ms` };
  return (
    <svg viewBox={VIEWBOX} fill="none" aria-hidden className="size-full">
      <PersonaHairBack persona={persona} />
      <RelaxedBody persona={persona} />
      <g className="animate-bob transform-view motion-reduce:animate-none" style={bob}>
        <PersonaFace />
        <PersonaBrows />
        <PersonaGlasses persona={persona} />
        <PersonaEyesOpen />
        <PersonaMouth />
        <PersonaHairFront persona={persona} />
      </g>
    </svg>
  );
}
