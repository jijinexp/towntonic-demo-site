"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import Reveal from "@/components/reveal";

interface GalleryItem {
  src: string;
  title: string;
  desc: string;
}

interface HomepageGalleryProps {
  items: GalleryItem[];
}

export default function HomepageGallery({ items }: HomepageGalleryProps) {
  const [activeImg, setActiveImg] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveImg(null);
      setIsClosing(false);
    }, 150);
  };

  useEffect(() => {
    if (activeImg === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImg]);

  const modalRef = useFocusTrap(activeImg !== null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, idx) => (
          <Reveal delayMs={idx * 80} key={item.title}>
            <button
              type="button"
              onClick={() => setActiveImg(idx)}
              className="text-left w-full block group cursor-pointer border border-border rounded-sm overflow-hidden bg-bg-card transition-all duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <div className="relative h-[300px] w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-primary group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {activeImg !== null && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-xs focus-visible:outline-none"
          onClick={handleClose}
          tabIndex={-1}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Close Lightbox"
          >
            <X size={32} />
          </button>
          <div
            className={`t-modal ${isClosing ? "is-closing" : "is-open"} max-w-4xl w-full flex flex-col items-center focus-visible:outline-none`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[60vh]">
              <Image
                src={items[activeImg].src}
                alt={items[activeImg].title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <div className="text-center text-white mt-6 max-w-xl">
              <h3 id="lightbox-title" className="font-serif text-2xl font-bold text-gold">{items[activeImg].title}</h3>
              <p className="text-text-secondary mt-2 text-sm">{items[activeImg].desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
