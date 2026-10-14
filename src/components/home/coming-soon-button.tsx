"use client";

import { useId, useRef } from "react";
import { Chip } from "@/components/ui/chip";

/**
 * Covers a coming-soon tile like a case study link would, but opens a small
 * "Coming soon" modal instead. A native <dialog>: Escape and a click on the
 * backdrop close it, and focus returns to the tile.
 */
export function ComingSoonButton({ name, color }: { name: string; color: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useId();
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-haspopup="dialog"
        aria-label={`${name} (coming soon)`}
        className="absolute inset-0 z-10 cursor-pointer outline-none"
      />
      <dialog
        ref={dialog}
        aria-labelledby={title}
        // A click on the backdrop lands on the dialog itself, not its panel
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto w-[calc(100%-2*var(--gutter))] max-w-90 scale-95 rounded-card bg-paper p-0 text-center opacity-0 shadow-float transition-[opacity,scale,display,overlay] transition-discrete duration-250 ease-spring backdrop:bg-ink/0 backdrop:backdrop-blur-none backdrop:transition-[background-color,backdrop-filter,display,overlay] backdrop:transition-discrete backdrop:duration-250 open:scale-100 open:opacity-100 open:backdrop:bg-ink/30 open:backdrop:backdrop-blur-sm starting:open:scale-95 starting:open:opacity-0 starting:open:backdrop:bg-ink/0 starting:open:backdrop:backdrop-blur-none"
      >
        <div className="flex flex-col items-center px-8 pt-8 pb-6">
          <p className="type-micro" style={{ color }}>
            {name}
          </p>
          <h2 id={title} className="type-heading mt-1">
            Coming soon
          </h2>
          <p className="type-body-md mt-2 text-ink-body">
            I’m still putting this case study together. Check back soon!
          </p>
          <Chip onClick={close} className="mt-6" autoFocus>
            Sounds good
          </Chip>
        </div>
      </dialog>
    </>
  );
}
