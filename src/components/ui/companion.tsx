"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Avatar } from "@/components/home/avatar";
import { PromptChips } from "@/components/ui/prompt-chips";
import { companionMessages } from "@/lib/site-nav";

const CLOSE_DELAY = 180;
const HIDDEN_ON = ["/"];

/**
 * Fixed bottom-right character with a speech bubble, rendered once in the
 * root layout so it persists on every page except the landing page
 * (`HIDDEN_ON`). Hovering (or clicking /
 * focusing) the character opens the site navigation menu above it.
 * Bubble copy comes from `companionMessages` in site-nav.ts.
 */
export function Companion() {
  const pathname = usePathname();
  const message = companionMessages[pathname] ?? companionMessages.default;
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const show = () => {
    clearTimeout(closeTimer.current);
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

  // The landing hero already features the character front and center
  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <div
      ref={root}
      className="fixed right-4 bottom-4 z-20 flex flex-col items-end gap-3 md:right-8 md:bottom-8"
      // Own snapshot so page transitions leave it anchored (see globals.css)
      style={{ viewTransitionName: "companion" }}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
      }}
    >
      {/* Menu */}
      <nav
        id={menuId}
        aria-label="What do you wanna learn about me?"
        inert={!open}
        // Only keeps an already-open menu open (it ignores the pointer while closed)
        onPointerEnter={(e) => e.pointerType === "mouse" && clearTimeout(closeTimer.current)}
        onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
        className={`flex origin-bottom-right flex-col items-end gap-2.5 rounded-control border border-line bg-paper px-4 py-3 shadow-float transition-[opacity,transform,translate] duration-250 ease-spring ${
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
      >
        <p className="type-control">What do you wanna learn about me?</p>
        <PromptChips layout="column" onSelect={() => setOpen(false)} />
      </nav>

      {/* Bubble + character */}
      <div className="flex items-center gap-2">
        <p
          aria-hidden={open}
          className={`type-control hidden w-[284px] rounded-control border border-line bg-paper px-4 py-3 text-right shadow-float transition-[opacity,translate] duration-200 ease-out-soft md:block ${
            open ? "translate-x-2 opacity-0" : "opacity-100"
          }`}
        >
          {message}
        </p>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label="Open navigation menu"
          onClick={() => (open ? setOpen(false) : show())}
          // Hovering the character itself is the only hover trigger
          onPointerEnter={(e) => e.pointerType === "mouse" && show()}
          onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
          className="rounded-full transition-transform duration-300 ease-spring hover:scale-105 active:scale-95"
        >
          <Avatar className="max-md:size-20" />
        </button>
      </div>
    </div>
  );
}
