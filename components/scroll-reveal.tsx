"use client";
// Scroll reveals matched like-for-like to
// osteriafrancescana.it (their theme's script.js, GSAP 3.11 + ScrollTrigger + SplitText):
//
//   titles      SplitText lines in overflow:hidden parents; each line rises from
//               yPercent 100 → 0, 2.5s, ease "power4" (= power4.out), stagger 0.1s
//   paragraphs, buttons, separators, menu rows
//               from opacity 0, y 100px → 0, 1.5s, "power4"
//   slider/photos
//               opacity 0 → 1, 2s, "power4", 0.5s delay
//   trigger     ScrollTrigger default start "top bottom": as soon as the element's
//               top crosses the bottom of the viewport. Content already on screen
//               at load doesn't rise (they skip it for LCP); here it gets the
//               photo fade instead so the page still arrives softly.
//
// power4.out ≈ cubic-bezier(.23, 1, .32, 1) (easeOutQuint): fast start, long settle.
import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Phase = "idle" | "enter" | "load0" | "load";

/** Watches the element and reports how it should appear. */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mountedAt = performance.now();
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      // the first callback arrives straight after mount for anything already on screen
      if (performance.now() - mountedAt < 200) {
        setPhase("load0");
        raf = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("load")));
      } else {
        setPhase("enter");
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, phase };
}

const EASE = "ease-[cubic-bezier(.23,1,.32,1)]";
const REDUCED = "motion-reduce:!opacity-100 motion-reduce:!translate-y-0 motion-reduce:!transition-none";

const BLOCK: Record<Phase, string> = {
  idle: "opacity-0 translate-y-[100px]",
  enter: `opacity-100 translate-y-0 transition-[opacity,translate] duration-[1500ms] ${EASE}`,
  load0: "opacity-0",
  load: `opacity-100 transition-opacity duration-[2000ms] delay-500 ${EASE}`,
};
const FADE: Record<Phase, string> = {
  idle: "opacity-0",
  enter: `opacity-100 transition-opacity duration-[2000ms] ${EASE}`,
  load0: "opacity-0",
  load: `opacity-100 transition-opacity duration-[2000ms] delay-500 ${EASE}`,
};

/**
 * Paragraphs, rows, buttons, separators ("block": fade + rise 100px, 1.5s)
 * and photos ("fade": opacity, 2s).
 */
export default function Reveal({
  kind = "block",
  className = "",
  style,
  as: Tag = "div",
  "aria-hidden": ariaHidden,
  children,
}: {
  kind?: "block" | "fade";
  className?: string;
  style?: CSSProperties;
  as?: "div" | "span" | "li" | "p";
  "aria-hidden"?: boolean;
  children?: ReactNode;
}) {
  const { ref, phase } = useReveal();
  const cls = (kind === "fade" ? FADE : BLOCK)[phase];
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      aria-hidden={ariaHidden || undefined}
      data-reveal={phase}
      className={`${cls} ${REDUCED} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

/**
 * Titles: split into lines, each line rises out of a mask (2.5s, 0.1s stagger).
 * Words get their own masks; after layout each word learns its line number so
 * words on the same line move together, exactly like SplitText lines.
 */
export function RiseTitle({
  text,
  as: Tag = "span",
  className = "",
  id,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  className?: string;
  id?: string;
}) {
  const { ref, phase } = useReveal();
  const words = text.split(" ");

  // line numbers → --line on each word (DOM write, no re-render)
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const assign = () => {
      const ws = root.querySelectorAll<HTMLElement>("[data-word]");
      let line = -1;
      let lastTop = -Infinity;
      ws.forEach((w) => {
        const top = (w.parentElement as HTMLElement).offsetTop;
        if (top > lastTop + 2) {
          line++;
          lastTop = top;
        }
        w.style.setProperty("--line", String(line));
      });
    };
    assign();
    const ro = new ResizeObserver(assign);
    ro.observe(root);
    return () => ro.disconnect();
  }, [ref]);

  const word =
    phase === "idle"
      ? "translate-y-[130%]"
      : phase === "enter"
        ? `translate-y-0 transition-[translate] duration-[2500ms] ${EASE} [transition-delay:calc(var(--line,0)*100ms)]`
        : "translate-y-0";
  const wrap =
    phase === "load0" ? "opacity-0" : phase === "load" ? `opacity-100 transition-opacity duration-[2000ms] delay-500 ${EASE}` : "";

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      id={id}
      data-reveal={phase}
      className={`${wrap} motion-reduce:!opacity-100 motion-reduce:!transition-none ${className}`}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          {/* the mask; a little slack above and below so accents and descenders aren't cut */}
          <span className="inline-block overflow-hidden align-bottom pt-[0.1em] -mt-[0.1em] pb-[0.22em] -mb-[0.22em] [text-decoration:inherit]">
            <span data-word className={`inline-block [text-decoration:inherit] ${word} motion-reduce:!translate-y-0 motion-reduce:!transition-none`}>
              {w}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
