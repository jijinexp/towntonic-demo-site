"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { currentPartIndex, MOBILE_BOTTOM_BAR, stripHeight, upcomingParts } from "./menu-reveal";

interface StackPart {
  id: string;
  label: string;
  image: string;
}

/**
 * Slim photo strips for jumping between menu parts.
 * - top: pinned under the nav, one strip per part already scrolled past, so
 *   readers deep in Dessert can tap "All Day" to go back. Also publishes
 *   --stack-count on its parent so the current part's pinned photo sits below.
 * - bottom: pinned to the bottom of the screen, one strip per part still to
 *   come; each hands over to the real photo as it scrolls up into view. Also
 *   publishes --below-count so the pinned photo stops above it.
 */
export default function MenuStack({ parts, position = "top" }: { parts: StackPart[]; position?: "top" | "bottom" }) {
  const [shown, setShown] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const ids = parts.map((p) => p.id).join(",");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const navBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      const tops = ids.split(",").map((id) => document.getElementById(`menu-${id}`)?.getBoundingClientRect().top ?? Infinity);
      const strip = stripHeight();
      const current = currentPartIndex(tops, navBottom, strip);
      if (position === "top") {
        const count = Math.max(0, current);
        setShown(Array.from({ length: count }, (_, i) => i));
        ref.current?.parentElement?.style.setProperty("--stack-count", String(count));
      } else {
        const desktop = window.matchMedia("(min-width: 768px)").matches;
        const barShown = document.querySelector('.t-sticky-bar[data-hidden="false"]') !== null;
        // Only inside the menu: nothing until the first part has reached the nav,
        // so the strips never float over the hero or the "Our Menu" heading.
        const next =
          current < 0 ? [] : upcomingParts(tops, window.innerHeight, strip, !desktop && barShown ? MOBILE_BOTTOM_BAR : 0, current);
        setShown(next);
        ref.current?.parentElement?.style.setProperty("--below-count", String(next.length));
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids, position]);

  const jump = (id: string) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(`menu-${id}`)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const top = position === "top";
  return (
    <div ref={ref} className={`${top ? "menu-stack" : "menu-stack-bottom"} sticky z-30 h-0`}>
      {shown.length > 0 && (
        <nav
          aria-label={top ? "Earlier menu sections" : "Later menu sections"}
          className={`menu-stack-list absolute inset-x-0 flex flex-col ${top ? "top-0" : "bottom-0"}`}
        >
          {shown.map((i) => {
            const p = parts[i];
            return (
              <button
                key={p.id}
                type="button"
                aria-label={`${top ? "Back to" : "Jump to"} ${p.label}`}
                onClick={() => jump(p.id)}
                className="menu-strip relative flex items-center justify-center overflow-hidden px-5 text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
              >
                <Image src={p.image} alt="" fill loading="eager" sizes="100vw" className="object-cover" />
                <span aria-hidden="true" className="absolute inset-0 bg-black/50" />
                <span className="relative z-10 text-white italic text-xl md:text-3xl leading-none">{p.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
