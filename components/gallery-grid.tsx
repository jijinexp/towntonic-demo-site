"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/use-focus-trap";

interface ImageItem {
  src: string;
  title: string;
}

interface GalleryGridProps {
  images: ImageItem[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedImg(null);
      setIsClosing(false);
    }, 150);
  };

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (selectedImg !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImg]);

  const modalRef = useFocusTrap(selectedImg !== null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedImg(idx)}
            className="relative h-[250px] w-full border border-border rounded overflow-hidden cursor-pointer group bg-bg-card shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={`View larger image of ${img.title}`}
          >
            <Image
              src={img.src}
              alt={img.title}
              fill
              className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-semibold tracking-wide font-sans">{img.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImg !== null && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 focus-visible:outline-none"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          onClick={handleClose}
          tabIndex={-1}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Close Lightbox"
          >
            <X size={32} />
          </button>
          <div
            className={`t-modal ${isClosing ? "is-closing" : "is-open"} max-w-4xl w-full flex flex-col items-center focus-visible:outline-none`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[65vh]">
              <Image
                src={images[selectedImg].src}
                alt={images[selectedImg].title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <h3
              id="gallery-lightbox-title"
              className="font-serif text-xl font-bold text-gold mt-6 text-center"
            >
              {images[selectedImg].title}
            </h3>
          </div>
        </div>
      )}
    </>
  );
}
