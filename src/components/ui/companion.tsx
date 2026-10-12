"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Avatar } from "@/components/home/avatar";
import { useHeroInView } from "@/components/home/hero-presence";
import { useTalk } from "@/components/home/use-talk";
import { PromptChips } from "@/components/ui/prompt-chips";
import { companionLines } from "@/lib/dialogue";

const CLOSE_DELAY = 180;

/**
 * Fixed bottom-right character, rendered once in the root layout so it
 * persists across pages. While a page-header character (TalkingAvatar on the
 * landing and About pages) is on screen it tucks away, and it pops back in
 * once that one has scrolled out of view (hero-presence.ts). There's no
 * bubble at rest: hovering the character makes it say a random line from
 * `companionLines` in a bubble that grows as it types (see use-talk.ts);
 * clicking or focusing it opens the site navigation menu above it.
 */
export function Companion() {
  const heroInView = useHeroInView();
  const [menuOpen, setOpen] = useState(false);
  // Tucking away also closes the menu
  const open = menuOpen && !heroInView;
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const voice = useTalk(companionLines);
  const { silence } = voice;

  const show = () => {
    clearTimeout(closeTimer.current);
    silence();
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <div
      ref={root}
      // Hidden while the header character is on screen; fades in and out of the corner
      inert={heroInView}
      aria-hidden={heroInView}
      // Click-through: its box spans the closed menu too, which would block whatever is
      // underneath (e.g. the project tiles). Only the visible parts take the pointer.
      className={`pointer-events-none fixed right-4 bottom-4 z-20 flex flex-col items-end gap-3 transition-opacity duration-250 ease-out-soft md:right-8 md:bottom-8 ${
        heroInView ? "opacity-0" : "opacity-100"
      }`}
      // Own snapshot so page transitions leave it anchored (see globals.css)
      style={{ viewTransitionName: "companion" }}
      // Keyboard focus opens the menu; a mouse click does it in onClick instead
      onFocus={(e) => e.target.matches(":focus-visible") && show()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
      }}
    >
      {/* Menu */}
      <nav
        id={menuId}
        aria-label="What do you wanna learn about me?"
        inert={!open}
        className={`flex origin-bottom-right flex-col items-end gap-3 rounded-control border border-line bg-paper px-4 py-3 shadow-float transition-[opacity,transform,translate] duration-250 ease-spring ${
          open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
        }`}
      >
        <p className="type-control">What do you wanna learn about me?</p>
        <PromptChips layout="column" onSelect={() => setOpen(false)} />
      </nav>

      {/* Bubble + character */}
      <div className="flex items-center gap-2">
        <p
          aria-hidden
          className={`type-control pointer-events-none hidden w-max max-w-[284px] origin-right rounded-control border border-line bg-paper px-4 py-3 text-right shadow-float transition-[opacity,scale,translate] duration-250 ease-spring md:block ${
            voice.open && !open ? "translate-x-0 scale-100 opacity-100" : "translate-x-2 scale-95 opacity-0"
          }`}
        >
          {/* Only the typed part is laid out, so the bubble grows with the line */}
          {voice.line.slice(0, voice.typed)}
        </p>
        {/* Screen readers get the whole line at once instead of letter by letter */}
        <p className="sr-only" aria-live="polite">
          {voice.open ? voice.line : ""}
        </p>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label="Open navigation menu"
          onClick={() => (open ? setOpen(false) : show())}
          // Hover talks; only a click (or focus) opens the menu
          onPointerEnter={(e) => e.pointerType === "mouse" && !open && voice.talk()}
          onPointerLeave={(e) => e.pointerType === "mouse" && voice.stop()}
          className="pointer-events-auto rounded-full transition-transform duration-300 ease-spring hover:scale-105 active:scale-95"
        >
          <Avatar className="max-md:size-20" mouth={voice.mouth} />
        </button>
      </div>
    </div>
  );
}
