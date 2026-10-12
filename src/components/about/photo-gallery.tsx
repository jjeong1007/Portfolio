import Image from "next/image";
import type { Gallery } from "@/content/about";

/** Width of the gallery column (--container-narrow) */
const COLUMN = 1000;
/** Wider than this, a photo spans both columns on mobile */
const PANORAMA = 2;

/**
 * Justified photo rows (≥640px): each photo grows by its aspect ratio, so a
 * row shares one height at any width. Below 640px the rows dissolve into a
 * 2-column masonry and panoramas span both columns.
 */
export function PhotoGallery({ title, rows }: Gallery) {
  return (
    <section aria-labelledby={slug(title)}>
      <h3 id={slug(title)} className="type-subtitle text-center font-medium!">
        {title}
      </h3>
      <div className="mt-4 columns-2 gap-3 sm:columns-auto">
        {rows.map((row, i) => {
          const total = row.reduce((sum, p) => sum + ratio(p.size), 0);
          return (
            <div key={i} className="contents sm:mb-3 sm:flex sm:gap-3 sm:last:mb-0">
              {row.map((photo) => {
                const r = ratio(photo.size);
                const share = r / total;
                const wide = r > PANORAMA;
                return (
                  <figure
                    key={photo.src.src}
                    className={`group/photo relative mb-3 break-inside-avoid overflow-hidden rounded-photo bg-surface sm:mb-0 sm:min-w-0 sm:basis-0 ${
                      wide ? "max-sm:[column-span:all]" : ""
                    }`}
                    style={{ aspectRatio: `${photo.size[0]} / ${photo.size[1]}`, flexGrow: r }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      placeholder="blur"
                      sizes={`(min-width: ${COLUMN + 128}px) ${Math.round(COLUMN * share)}px, (min-width: 640px) ${Math.round(100 * share)}vw, ${wide ? 100 : 50}vw`}
                      className="object-cover"
                    />
                    {/* Hover, like the project tiles: the bottom darkens, then the caption rises in.
                        Touch screens can't hover, so they show both at rest. */}
                    {photo.caption && (
                      <>
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-linear-to-t from-ink/60 to-ink/0 to-50% opacity-0 transition-opacity duration-500 ease-out-soft group-hover/photo:opacity-100 [@media(hover:none)]:opacity-100"
                        />
                        <figcaption className="type-body-md absolute bottom-3 left-3 translate-y-3 text-paper opacity-0 transition-[opacity,translate] delay-60 duration-300 ease-spring group-hover/photo:translate-y-0 group-hover/photo:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                          {photo.caption}
                        </figcaption>
                      </>
                    )}
                  </figure>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}

const ratio = ([w, h]: [number, number]) => w / h;
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
