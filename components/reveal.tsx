"use client";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  delayMs?: number;
  threshold?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  ["data-testid"]?: string;
}

export default function Reveal({
  children,
  delayMs = 0,
  threshold = 0.15,
  className = "",
  as = "div",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;
    let timeoutId: number | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const trigger = () => setRevealed(true);
            if (delayMs > 0) timeoutId = window.setTimeout(trigger, delayMs);
            else trigger();
            io.disconnect();
            break;
          }
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [delayMs, threshold, revealed]);

  const Tag = as as ElementType;

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      data-revealed={revealed ? "true" : "false"}
      className={`t-reveal ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
