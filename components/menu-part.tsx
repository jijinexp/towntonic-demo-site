"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { nextInView, stripHeight } from "./menu-reveal";

interface MenuPartProps {
  id: string;
  title: string;
  hours?: string;
  image: string;
  imageAlt: string;
  /** Which half the photo settles into on desktop. */
  side?: "left" | "right";
  /** Position among the parts shown; earlier parts stack as strips above this one. */
  index?: number;
  children: ReactNode;
}

/**
 * One part of the menu (All Day, Dinner…). It starts as a large photo carrying
 * the title, covering the dishes. It opens on its own when the part scrolls up
 * to the nav (and closes when scrolled back above it), and clicking/tapping the
 * photo toggles it at any time; a click holds until the part next enters or
 * leaves view. Opening: on desktop the photo slides to a pinned, soft-cornered
 * frame on one half; on phones it shrinks up into a pinned band under the nav.
 * The layout and motion live in globals.css, keyed off data-open / data-side.
 */
export default function MenuPart({ id, title, hours, image, imageAlt, side = "left", index = 0, children }: MenuPartProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const contentId = `menu-${id}-dishes`;

  // Scroll trigger: edge-triggered, so it only acts when the part enters or
  // leaves view and never fights a click made while reading.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let inView = false;
    let raf = 0;
    const update = () => {
      raf = 0;
      // measured from below the strips of the earlier parts stacked under the nav
      const navBottom = (document.querySelector("header")?.getBoundingClientRect().bottom ?? 0) + index * stripHeight();
      const next = nextInView(inView, el.getBoundingClientRect().top, navBottom, window.innerHeight);
      if (next !== inView) {
        inView = next;
        setOpen(next);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    schedule(); // a part already at the top on load (e.g. /#menu-dinner) opens
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [index]);

  return (
    <section
      ref={ref}
      id={`menu-${id}`}
      aria-labelledby={`menu-${id}-title`}
      className="menu-part relative"
      data-open={open ? "true" : "false"}
      data-side={side}
      style={{ "--i": index } as CSSProperties}
    >
      <div className="menu-part-stage z-10 pointer-events-none">
        <div className="menu-part-panel relative h-full pointer-events-auto">
          <div className="menu-part-frame absolute inset-0 overflow-hidden">
            {/* eager: lazy-loading never fires reliably inside the pinned (sticky) panel */}
            <Image src={image} alt={imageAlt} fill loading="eager" sizes="100vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={contentId}
            aria-label={`${open ? "Hide" : "Show"} ${title} menu`}
            onClick={() => setOpen((o) => !o)}
            className="menu-part-toggle absolute inset-0 z-[1] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-gold"
          />
          <div className="menu-part-title pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center px-6 text-center text-white">
            <h3 id={`menu-${id}-title`} className="text-white font-normal italic text-5xl md:text-7xl leading-none">
              {title}
            </h3>
            {hours && <p className="mt-4 text-white/85 text-sm uppercase tracking-[0.2em]">{hours}</p>}
            <span aria-hidden="true" className="menu-part-hint mt-8 inline-flex items-center gap-2 border border-white/60 px-5 py-2 text-xs uppercase tracking-[0.24em] text-white">
              View menu <span>→</span>
            </span>
          </div>
        </div>
      </div>
      <div id={contentId} className="menu-part-content" inert={!open}>
        {children}
      </div>
    </section>
  );
}
