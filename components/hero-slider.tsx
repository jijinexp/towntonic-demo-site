"use client";
// Full-bleed hero slideshow, after palais-dor.webflow.io: edge-to-edge photos
// that crossfade on their own, under a large white title that stays put.
import { useEffect, useState } from "react";
import Image from "next/image";

export interface HeroSlide {
  src: string;
  alt: string;
  /** CSS object-position, for photos whose subject sits off-centre. */
  objectPosition?: string;
}

/** How long each photo stays before the next fades in, ms. */
export const HOLD_MS = 5000;

export default function HeroSlider({ slides, children }: { slides: HeroSlide[]; children?: React.ReactNode }) {
  const count = slides.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Visitors who ask for reduced motion keep the first photo.
    if (count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % count), HOLD_MS);
    return () => window.clearInterval(id);
  }, [count]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos from Town Tonic"
      className="relative h-full w-full overflow-hidden bg-[#111] text-[#f7f9fa]"
    >
      {slides.map((s, i) => (
        <figure
          key={s.src}
          aria-hidden={i !== active}
          className={`absolute inset-0 m-0 transition-opacity duration-[1500ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes="100vw"
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : undefined}
            className="object-cover"
            style={s.objectPosition ? { objectPosition: s.objectPosition } : undefined}
          />
        </figure>
      ))}

      {/* darken the photos so the white title reads on any of them */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/40" />
      {/* a little extra shade at the top, under the clear nav */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/45 to-transparent" />

      {/* the title, which stays still while the photos change */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        {children}
      </div>
    </div>
  );
}
