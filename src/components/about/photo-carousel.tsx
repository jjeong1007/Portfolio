"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import type { Gallery } from "@/content/about";

/** Underdamped (ratio ≈ 0.63), so every settle overshoots a little and bounces back */
const SPRING = { stiffness: 180, damping: 17 };
/** Past either end, the track follows the pointer at this share of the distance */
const RUBBER = 0.3;
/** Velocity (px/s) the track is kicked with when you push past the first or last photo */
const BUMP = 900;
/** A drag this far (px) always moves at least one photo */
const SWIPE = 48;
/** Slide heights, matching `h-80 md:h-105`, and the widest a slide gets (the 10-column gallery) */
const HEIGHT = { sm: 320, md: 420 };
const COLUMN = 992;

type Motion = {
  x: number;
  v: number;
  target: number;
  raf: number;
  last: number;
  reduced: boolean;
};

type Drag = {
  id: number;
  startPointer: number;
  startX: number;
  moved: boolean;
  slide: number | null;
  samples: { t: number; p: number }[];
};

/**
 * A springy photo carousel: the active photo sits centered and its neighbors
 * peek out on both sides, smaller and tilted away. Drag or flick it (with
 * rubber-banding at the ends), swipe a trackpad, use the arrow keys, the
 * arrow buttons or the dots. See "About page" in design-system.md.
 */
export function PhotoCarousel({ title, photos }: Gallery) {
  const id = slug(title);
  const last = photos.length - 1;

  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLElement | null)[]>([]);
  /** Track offset (px) that centers each slide */
  const stops = useRef<number[]>([]);
  const motion = useRef<Motion>({ x: 0, v: 0, target: 0, raf: 0, last: 0, reduced: false });
  const drag = useRef<Drag | null>(null);

  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  /** Paint the current motion state: no React render per frame */
  const paint = () => {
    const m = motion.current;
    if (!track.current) return;
    track.current.style.transform = `translate3d(${m.x}px, 0, 0)`;
    // Moving fast leans the photos into the motion, like they're being pulled along
    const skew = m.reduced ? 0 : clamp(-m.v / 300, -5, 5);
    slides.current.forEach((el, i) => {
      if (!el) return;
      const d = clamp((stops.current[i] - m.x) / (el.offsetWidth + 12), -1.5, 1.5);
      const away = Math.abs(d);
      const scale = m.reduced ? 1 : 1 - away * 0.12;
      const tilt = m.reduced ? 0 : d * 3;
      el.style.transform = `scale(${scale}) rotate(${tilt}deg) skewX(${skew}deg)`;
      el.style.opacity = String(1 - Math.min(away, 1.5) * 0.3);
    });
  };

  const tick = (t: number) => {
    const m = motion.current;
    const dt = Math.min((t - m.last) / 1000, 1 / 30);
    m.last = t;
    // A few small steps per frame keep the spring stable at any frame rate
    const steps = 4;
    const h = dt / steps;
    for (let s = 0; s < steps; s++) {
      const a = -SPRING.stiffness * (m.x - m.target) - SPRING.damping * m.v;
      m.v += a * h;
      m.x += m.v * h;
    }
    if (Math.abs(m.x - m.target) < 0.2 && Math.abs(m.v) < 2) {
      m.x = m.target;
      m.v = 0;
      m.raf = 0;
      paint();
      return;
    }
    paint();
    m.raf = requestAnimationFrame(tick);
  };

  const run = () => {
    const m = motion.current;
    if (m.reduced) {
      m.x = m.target;
      m.v = 0;
      paint();
      return;
    }
    if (m.raf) return;
    m.last = performance.now();
    m.raf = requestAnimationFrame(tick);
  };

  const stop = () => {
    cancelAnimationFrame(motion.current.raf);
    motion.current.raf = 0;
  };

  /** Go to a photo. Past either end it stays put and bumps instead. */
  const goTo = (i: number) => {
    const m = motion.current;
    if (i < 0) m.v += BUMP;
    if (i > last) m.v -= BUMP;
    const next = clamp(i, 0, last);
    indexRef.current = next;
    setIndex(next);
    m.target = stops.current[next];
    run();
  };

  const measure = () => {
    const vw = viewport.current?.clientWidth ?? 0;
    stops.current = slides.current.map((el) => (el ? vw / 2 - (el.offsetLeft + el.offsetWidth / 2) : 0));
  };

  // Center the first photo before the first paint, and re-center on resize
  useLayoutEffect(() => {
    const m = motion.current;
    m.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const recenter = () => {
      measure();
      m.target = stops.current[indexRef.current];
      m.x = m.target;
      m.v = 0;
      paint();
    };
    recenter();
    const ro = new ResizeObserver(recenter);
    if (viewport.current) ro.observe(viewport.current);
    return () => {
      ro.disconnect();
      stop();
    };
     
  }, []);

  // Trackpad: one horizontal swipe moves one photo, however long its momentum runs
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    let sum = 0;
    let locked = false;
    let idle: ReturnType<typeof setTimeout>;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      clearTimeout(idle);
      idle = setTimeout(() => {
        locked = false;
        sum = 0;
      }, 160);
      if (locked) return;
      sum += e.deltaX;
      if (Math.abs(sum) > 40) {
        locked = true;
        goTo(indexRef.current + Math.sign(sum));
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(idle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    stop();
    const hit = (e.target as HTMLElement).closest<HTMLElement>("[data-slide]");
    drag.current = {
      id: e.pointerId,
      startPointer: e.clientX,
      startX: motion.current.x,
      moved: false,
      slide: hit ? Number(hit.dataset.slide) : null,
      samples: [{ t: e.timeStamp, p: e.clientX }],
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.startPointer;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      e.currentTarget.dataset.dragging = "true";
    }
    const m = motion.current;
    const min = stops.current[last];
    const max = stops.current[0];
    let x = d.startX + dx;
    if (x > max) x = max + (x - max) * RUBBER;
    if (x < min) x = min + (x - min) * RUBBER;
    d.samples.push({ t: e.timeStamp, p: e.clientX });
    d.samples = d.samples.filter((s) => e.timeStamp - s.t < 100);
    m.x = x;
    paint();
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    delete e.currentTarget.dataset.dragging;

    // A tap (no drag) on a side photo brings it to the middle
    if (!d.moved) {
      if (d.slide !== null && d.slide !== indexRef.current) goTo(d.slide);
      else run();
      return;
    }

    const first = d.samples[0];
    const span = (e.timeStamp - first.t) / 1000;
    const velocity = span > 0 ? (e.clientX - first.p) / span : 0;
    const m = motion.current;
    m.v = velocity;

    // Where a flick would coast to, then the photo nearest that spot
    const projected = m.x + velocity * 0.15;
    let next = nearest(stops.current, projected);
    const dx = e.clientX - d.startPointer;
    if (next === indexRef.current && Math.abs(dx) > SWIPE) next -= Math.sign(dx);
    goTo(clamp(next, 0, last));
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowLeft: indexRef.current - 1,
      ArrowRight: indexRef.current + 1,
      Home: 0,
      End: last,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    goTo(keys[e.key]);
  };

  const current = photos[index];

  return (
    <section aria-labelledby={id} aria-roledescription="carousel">
      <h3 id={id} className="type-subtitle text-center font-medium!">
        {title}
      </h3>

      <div
        ref={viewport}
        tabIndex={0}
        aria-label={`${title} photos. Use the left and right arrow keys to browse.`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        // Horizontal gestures belong to the carousel; vertical ones still scroll the page
        className="mt-4 cursor-grab touch-pan-y select-none rounded-photo py-4 data-[dragging=true]:cursor-grabbing"
      >
        <div ref={track} className="relative flex w-max items-center gap-3 will-change-transform">
          {photos.map((photo, i) => {
            const r = photo.size[0] / photo.size[1];
            const active = i === index;
            return (
              <figure
                key={photo.src.src}
                ref={(el) => {
                  slides.current[i] = el;
                }}
                data-slide={i}
                data-active={active}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${photos.length}`}
                aria-current={active || undefined}
                className={`group/slide relative h-80 max-w-[min(calc(100vw-32px),992px)] shrink-0 overflow-hidden rounded-photo bg-surface will-change-transform md:h-105 ${
                  active ? "" : "cursor-pointer"
                }`}
                style={{ aspectRatio: `${photo.size[0]} / ${photo.size[1]}` }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  draggable={false}
                  placeholder="blur"
                  sizes={`(min-width: 768px) ${Math.round(Math.min(HEIGHT.md * r, COLUMN))}px, ${Math.round(Math.min(HEIGHT.sm * r, 400))}px`}
                  className="pointer-events-none object-cover"
                />
                {/* The active photo's caption: the bottom darkens, then the caption rises in */}
                {photo.caption && (
                  <>
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-ink/60 to-ink/0 to-50% opacity-0 transition-opacity duration-500 ease-out-soft group-data-[active=true]/slide:opacity-100"
                    />
                    <figcaption className="type-body-md absolute bottom-3 left-3 translate-y-3 text-paper opacity-0 transition-[opacity,translate] duration-300 ease-spring group-data-[active=true]/slide:translate-y-0 group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:delay-200">
                      {photo.caption}
                    </figcaption>
                  </>
                )}
              </figure>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <ArrowButton label="Previous photo" onClick={() => goTo(indexRef.current - 1)}>
          {/* Lucide chevron-left */}
          <path d="m15 18-6-6 6-6" />
        </ArrowButton>

        <div className="flex items-center">
          {photos.map((photo, i) => (
            <button
              key={photo.src.src}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index || undefined}
              onClick={() => goTo(i)}
              className="group/dot px-1 py-2"
            >
              <span
                className={`block h-2 rounded-full transition-[width,background-color] duration-500 ease-spring ${
                  i === index ? "w-6 bg-ink" : "w-2 bg-ink-faint group-hover/dot:bg-ink-subtle"
                }`}
              />
            </button>
          ))}
        </div>

        <ArrowButton label="Next photo" onClick={() => goTo(indexRef.current + 1)}>
          {/* Lucide chevron-right */}
          <path d="m9 18 6-6-6-6" />
        </ArrowButton>
      </div>

      <p aria-live="polite" className="sr-only">
        {`Photo ${index + 1} of ${photos.length}${current.caption ? `, ${current.caption}` : ""}: ${current.alt}`}
      </p>
    </section>
  );
}

function ArrowButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-12 place-items-center rounded-full border border-line bg-paper text-ink transition-[translate,scale,background-color,border-color] duration-300 ease-spring hover:-translate-y-1 hover:border-ink-faint hover:bg-surface active:scale-[0.97]"
    >
      <svg
        viewBox="0 0 24 24"
        width={20}
        height={20}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {children}
      </svg>
    </button>
  );
}

const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), hi);
const nearest = (xs: number[], x: number) =>
  xs.reduce((best, s, i) => (Math.abs(s - x) < Math.abs(xs[best] - x) ? i : best), 0);
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
