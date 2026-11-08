"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { computeLayout, wrapOffset } from "./hero-carousel-layout";

export interface Dish {
  src: string;
  alt: string;
  /** CSS object-position for photos whose subject is off-centre in a square crop. */
  objectPosition?: string;
}

interface HeroCarouselProps {
  dishes: Dish[];
  /** How long the strip takes to slide one dish along, ms. */
  slideMs?: number;
  /** How long each dish rests in the centre before the next slide, ms. */
  holdMs?: number;
}

const EASE = "cubic-bezier(.6, 0, .25, 1)";
const SIDE_OPACITY = 0.4;
const SWIPE_PX = 40;

export default function HeroCarousel({ dishes, slideMs = 950, holdMs = 1400 }: HeroCarouselProps) {
  const count = dishes.length;
  // `prev` lets each render spot tiles that wrapped round the back of the ring.
  const [nav, setNav] = useState({ active: 0, prev: 0 });
  const [stage, setStage] = useState({ w: 0, h: 0 });
  const [wide, setWide] = useState(true);
  const [reduce, setReduce] = useState(false);
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const step = useCallback(
    (delta: number) => setNav((n) => ({ prev: n.active, active: (((n.active + delta) % count) + count) % count })),
    [count],
  );
  const goTo = useCallback((i: number) => setNav((n) => ({ prev: n.active, active: i })), []);

  // Stage size → tile size. ResizeObserver covers window resizes and rotation.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const raf = requestAnimationFrame(() => setReady(true)); // first placement without animating
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // Screen shape and motion preference.
  useEffect(() => {
    const wideMq = window.matchMedia("(min-aspect-ratio: 1/1)");
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Touch screens emulate mouseenter on tap with no matching mouseleave, which
    // would freeze autoplay; only real hover-capable pointers pause it.
    const hoverMq = window.matchMedia("(hover: hover)");
    const sync = () => {
      setWide(wideMq.matches);
      setReduce(reduceMq.matches);
      setCanHover(hoverMq.matches);
    };
    sync();
    wideMq.addEventListener("change", sync);
    reduceMq.addEventListener("change", sync);
    hoverMq.addEventListener("change", sync);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      wideMq.removeEventListener("change", sync);
      reduceMq.removeEventListener("change", sync);
      hoverMq.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Autoplay: one dish per slide + hold, paused while looked at, focused, hidden, or reduced motion.
  useEffect(() => {
    if (reduce || hovered || focused || hidden || count < 2) return;
    const t = window.setTimeout(() => step(1), slideMs + holdMs);
    return () => window.clearTimeout(t);
  }, [nav.active, reduce, hovered, focused, hidden, count, slideMs, holdMs, step]);

  const { size, slides } = computeLayout({ count, active: nav.active, stageW: stage.w, stageH: stage.h, wide });
  const animate = ready && !reduce;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Dishes from the kitchen"
      tabIndex={0}
      className="relative h-full w-full overflow-hidden touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      onMouseEnter={() => {
        if (canHover) setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => {
        let keyboard = true;
        try {
          keyboard = e.currentTarget.matches(":focus-visible");
        } catch {
          /* older engines: treat any focus as keyboard focus */
        }
        if (keyboard) setFocused(true);
      }}
      onBlur={() => setFocused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > SWIPE_PX) step(dx < 0 ? 1 : -1);
      }}
    >
      <div ref={stageRef} className="absolute inset-0">
        {dishes.map((dish, i) => {
          const p = slides[i];
          const isActive = p.offset === 0;
          // A tile that jumped across the ring is moved instantly while it is invisible.
          const wrapped = Math.abs(p.offset - wrapOffset(i, nav.prev, count)) > count / 2;
          const style: CSSProperties = {
            width: size,
            height: size,
            transform: `translate(${p.x - size / 2}px, ${-size / 2}px) scale(${p.scale})`,
            opacity: !ready ? 0 : isActive ? 1 : p.visible ? SIDE_OPACITY : 0,
            pointerEvents: p.visible ? "auto" : "none",
            outline: "1px solid",
            outlineColor: isActive ? "rgba(189,133,69,0.45)" : "transparent",
            outlineOffset: 9,
            boxShadow: isActive ? "0 18px 40px rgba(28,31,38,0.16)" : "none",
            transition:
              animate && !wrapped
                ? `transform ${slideMs}ms ${EASE}, opacity ${slideMs}ms ease, outline-color 1s ease, box-shadow 1s ease`
                : "none",
          };
          return (
            <figure
              key={dish.src}
              data-active={isActive ? "true" : "false"}
              aria-hidden={isActive ? "false" : "true"}
              onClick={() => {
                if (!isActive) goTo(i);
              }}
              className={`absolute left-1/2 top-1/2 m-0 will-change-transform ${isActive ? "cursor-default" : "cursor-pointer"}`}
              style={style}
            >
              <Image
                src={dish.src}
                alt={dish.alt}
                fill
                loading="eager"
                fetchPriority={i === 0 ? "high" : "auto"}
                sizes="(min-aspect-ratio: 1/1) 56vw, 100vw"
                className="object-cover"
                style={dish.objectPosition ? { objectPosition: dish.objectPosition } : undefined}
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}
