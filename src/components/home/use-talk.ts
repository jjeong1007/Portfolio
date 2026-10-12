"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouthShape } from "@/components/home/character-art";

/** Typing speed: one character (and one mouth shape) every 25ms. */
const CHAR_MS = 25;
/** Grace period after the pointer leaves before the bubble hides. */
const CLOSE_DELAY = 150;
/** On touch there's no "leave", so the line stays up this long after it finishes. */
const LINGER_MS = 2500;

/** Rough lip-sync: open vowels go wide, rounded ones go round, consonants stay small. */
function mouthFor(char: string | undefined): MouthShape {
  if (!char) return "rest";
  const c = char.toLowerCase();
  if ("aei".includes(c)) return "wide";
  if ("ouw".includes(c)) return "round";
  return /[a-z0-9]/.test(c) ? "small" : "rest";
}

function pickLine(lines: string[], previous: string | null) {
  const pool = lines.length > 1 ? lines.filter((l) => l !== previous) : lines;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Character dialogue: `talk()` picks a random line (never the same one twice
 * in a row) and types it out; `mouth` is the lip-sync shape for the Avatar.
 * `stop()` hides it after a short grace period, `silence()` hides it now.
 * Pass `{ linger: true }` for touch, where the line hides on its own.
 */
export function useTalk(lines: string[]) {
  const [open, setOpen] = useState(false);
  const [line, setLine] = useState<string | null>(null);
  const [typed, setTyped] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const talk = ({ linger = false } = {}) => {
    clearTimeout(closeTimer.current);
    if (open && !linger) return;
    const next = pickLine(lines, line);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setLine(next);
    setTyped(still ? next.length : 0);
    setOpen(true);
    if (linger) {
      closeTimer.current = setTimeout(() => setOpen(false), (still ? 0 : next.length * CHAR_MS) + LINGER_MS);
    }
  };
  const stop = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };
  const silence = useCallback(() => {
    clearTimeout(closeTimer.current);
    setOpen(false);
  }, []);

  // Type the line out one character at a time while open
  useEffect(() => {
    if (!open || !line || typed >= line.length) return;
    const t = setTimeout(() => setTyped((n) => n + 1), CHAR_MS);
    return () => clearTimeout(t);
  }, [open, line, typed]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const talking = open && line !== null && typed < line.length;
  const mouth: MouthShape = talking ? mouthFor(line[typed - 1]) : "rest";

  return { open, line: line ?? "", typed, mouth, talk, stop, silence };
}
