"use client";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export interface SprigHeadingProps {
  eyebrow: string;
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  align?: "center" | "left";
}

// Small 3-leaf sprig, hand-drawn feel.
function Sprig({ drawn }: { drawn: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`t-sprig ${drawn ? "is-drawn" : ""}`}
    >
      {/* Stem */}
      <path
        d="M10 18 C 10 12, 10 8, 10 3"
        stroke="var(--color-sage)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="t-sprig-stroke"
      />
      {/* Left leaf */}
      <path
        d="M10 12 C 6 12, 4 10, 4 7 C 6 8, 9 9, 10 12 Z"
        stroke="var(--color-sage)"
        fill="var(--color-sage)"
        strokeWidth="1"
        strokeLinejoin="round"
        className="t-sprig-leaf"
        style={{ transitionDelay: "40ms" }}
      />
      {/* Right leaf */}
      <path
        d="M10 9 C 14 9, 16 7, 16 4 C 14 5, 11 6, 10 9 Z"
        stroke="var(--color-sage)"
        fill="var(--color-sage)"
        strokeWidth="1"
        strokeLinejoin="round"
        className="t-sprig-leaf"
        style={{ transitionDelay: "100ms" }}
      />
      {/* Top leaf */}
      <path
        d="M10 5 C 8 4, 8 2, 10 1 C 12 2, 12 4, 10 5 Z"
        stroke="var(--color-sage)"
        fill="var(--color-sage)"
        strokeWidth="1"
        strokeLinejoin="round"
        className="t-sprig-leaf"
        style={{ transitionDelay: "160ms" }}
      />
    </svg>
  );
}

export default function SprigHeading({
  eyebrow,
  children,
  className = "",
  as = "h2",
  align = "center",
}: SprigHeadingProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || drawn) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [drawn]);

  const Tag = as as ElementType;
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div ref={ref} className={`flex flex-col ${alignClass} ${className}`}>
      <span
        className={`inline-flex items-center gap-2 text-gold uppercase tracking-wider font-semibold text-xs`}
      >
        <Sprig drawn={drawn} />
        {eyebrow}
      </span>
      <Tag className="font-serif text-3xl md:text-5xl font-bold mt-2 text-primary">
        {children}
      </Tag>
    </div>
  );
}
