"use client";

import Image from "next/image";
import { useRef, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import { Container } from "@/components/ui/container";

export type TabItem = {
  id: string;
  label: string;
  icon: string;
  panel: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  label: string;
  /** Sticky rail beside the panels on desktop (e.g. a table of contents); panels move right to make room. */
  aside?: ReactNode;
};

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/**
 * Accessible tabs whose active state lives in the URL hash (#foundations,
 * #assets), so tabs are linkable. The bar is sticky on a full-bleed divider.
 */
export function Tabs({ items, label, aside }: TabsProps) {
  const fallback = items[0].id;
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => fallback,
  );
  const active = items.some((item) => item.id === hash) ? hash : fallback;
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function select(id: string, focus = false) {
    history.replaceState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    if (focus) refs.current[id]?.focus();
  }

  function onKeyDown(e: KeyboardEvent, index: number) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    select(items[(index + step + items.length) % items.length].id, true);
  }

  return (
    <>
      <nav className="sticky top-(--nav-height) z-10 border-b border-divider bg-paper">
        <Container>
          <div role="tablist" aria-label={label} className="flex gap-1">
            {items.map((item, i) => {
              const selected = item.id === active;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    refs.current[item.id] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-controls={`panel-${item.id}`}
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(item.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`type-body-md inline-flex items-center gap-2 rounded-t-tab px-3 py-2 leading-none! transition-colors duration-150 hover:bg-surface ${
                    selected ? "bg-surface" : ""
                  }`}
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </Container>
      </nav>
      <Container className={aside ? "lg:grid lg:grid-cols-[192px_minmax(0,1fr)] lg:gap-12" : ""}>
        {aside && (
          <div className="sticky top-[calc(var(--nav-height)+var(--tabs-height))] hidden self-start pt-9 lg:block">
            {aside}
          </div>
        )}
        <div className="min-w-0">
          {items.map((item) => (
            <div
              key={item.id}
              role="tabpanel"
              id={`panel-${item.id}`}
              aria-labelledby={`tab-${item.id}`}
              hidden={item.id !== active}
            >
              {item.panel}
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
