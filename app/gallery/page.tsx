"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const IMAGES = [
  { src: "/images/hero_brunch.jpg", title: "Avocado Sourdough Toast" },
  { src: "/images/gallery_dinner.jpg", title: "Canterbury Pan-seared Cod" },
  { src: "/images/gallery_coffee.jpg", title: "Artisan Latte Pour" },
  { src: "/images/gallery_interior.jpg", title: "Addington Dining Room Vibe" },
  { src: "/images/about_suppliers.jpg", title: "Canterbury Farm Fields" },
  { src: "/images/hero_brunch.jpg", title: "Signature Table Plating" },
];

export default function GalleryPage() {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImg(null);
      }
    };
    if (selectedImg !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImg]);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto font-sans">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-gold uppercase tracking-wider font-semibold text-xs">Visual Showcase</span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mt-2 mb-3">Gallery</h1>
        <p className="text-slate-600 text-sm">
          Explore our crafted dishes, locally roasted coffee, and the relaxed dining ambiance of our space.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {IMAGES.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedImg(idx)}
            className="relative h-[250px] w-full border border-stone-200 rounded overflow-hidden cursor-pointer group bg-stone-100 shadow-xs focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label={`View larger image of ${img.title}`}
          >
            <Image
              src={img.src}
              alt={img.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
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
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          onClick={() => setSelectedImg(null)}
        >
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-4 right-4 text-white hover:text-stone-300 focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Close Lightbox"
          >
            <X size={32} />
          </button>
          <div
            className="max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[65vh]">
              <Image
                src={IMAGES[selectedImg].src}
                alt={IMAGES[selectedImg].title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <h3
              id="gallery-lightbox-title"
              className="font-serif text-xl font-bold text-gold mt-6 text-center"
            >
              {IMAGES[selectedImg].title}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

