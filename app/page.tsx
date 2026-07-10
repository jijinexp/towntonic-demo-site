"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, Star, X } from "lucide-react";

const galleryItems = [
  {
    src: "/images/hero_brunch.jpg",
    title: "Seasonal Brunch Craft",
    desc: "Local avocado on sourdough bread with farm eggs and organic Canterbury microgreens.",
  },
  {
    src: "/images/gallery_dinner.jpg",
    title: "Canterbury Sourced Dinner",
    desc: "Pan-seared blue cod on saffron butter emulsion with local sea vegetables.",
  },
  {
    src: "/images/gallery_coffee.jpg",
    title: "Artisan Coffee",
    desc: "Premium local roasted beans, pulled with precision and styled with clean latte art.",
  },
  {
    src: "/images/gallery_interior.jpg",
    title: "Warm Eating House Vibe",
    desc: "Sunlit spaces, cozy dining tables, and lush green plants in our Addington home.",
  },
];

export default function Page() {
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

  return (
    <div className="flex flex-col font-sans">
      {/* HERO SECTION */}
      <section className="relative h-[650px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero_brunch.jpg"
          alt="Town Tonic Gourmet Brunch"
          fill
          priority
          className="object-cover brightness-75"
          sizes="100vw"
        />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-sm">
            Town Tonic
          </h1>
          <p className="text-lg md:text-2xl font-light mb-8 max-w-xl mx-auto leading-relaxed">
            Locally Sourced, Seasonal Dining — Addington, Christchurch
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/reservations"
              className="bg-primary hover:bg-primary-hover text-white text-base font-semibold px-8 py-3.5 rounded-sm transition-all shadow-sm w-full sm:w-auto text-center"
            >
              Reserve a Table
            </Link>
            <Link
              href="/menu"
              className="border-2 border-white hover:bg-white hover:text-primary text-white text-base font-semibold px-8 py-3 rounded-sm transition-all w-full sm:w-auto text-center"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* MOBILE QUICK ACTION BAR / INFO BANNER */}
      <section className="bg-stone-50 border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
          <a href="tel:033381150" className="py-2 sm:py-0 flex items-center justify-center gap-2 text-primary font-medium hover:underline">
            <Phone size={18} className="text-gold" />
            <span>Call Us: 03 338 1150</span>
          </a>
          <a href="https://maps.google.com/?q=Shop+1/335+Lincoln+Road+Addington+Christchurch" target="_blank" rel="noopener noreferrer" className="py-2 sm:py-0 flex items-center justify-center gap-2 text-primary font-medium hover:underline">
            <MapPin size={18} className="text-gold" />
            <span>Shop 1/335 Lincoln Road</span>
          </a>
          <div className="py-2 sm:py-0 flex items-center justify-center gap-2 text-slate-700 font-medium">
            <Clock size={18} className="text-gold" />
            <span>Open: 8:30 am – 2:00 pm today</span>
          </div>
        </div>
      </section>

      {/* MINIMALISTIC HOME GALLERY SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold uppercase tracking-wider font-semibold text-xs">Visual Story</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-primary">Simple Craft, Local Passion</h2>
            <p className="text-slate-600 mt-4">
              We believe in serving real food made from Canterbury ingredients. Click on any item below to view details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryItems.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImg(idx)}
                className="text-left w-full block group cursor-pointer border border-stone-100 rounded-sm overflow-hidden bg-stone-50 transition-all duration-300 hover:shadow-md"
              >
                <div className="relative h-[300px] w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-primary group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL carousel */}
      <section className="bg-stone-50 py-16 px-4 border-y border-stone-200">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center gap-1 text-gold mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
          </div>
          <p className="font-serif text-xl md:text-2xl italic leading-relaxed text-primary max-w-2xl mx-auto">
            &ldquo;The avocado toast was absolutely fresh and the atmosphere was lovely. A perfect blend of refined brunch and cozy cafe vibes.&rdquo;
          </p>
          <span className="block mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            — Sarah M., Christchurch Diner
          </span>
        </div>
      </section>

      {/* STICKY BOTTOM ACTION BAR FOR MOBILE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 p-3 flex gap-3 shadow-lg">
        <Link href="/menu" className="flex-1 border border-primary text-primary text-center py-2.5 rounded-sm font-semibold text-sm">
          View Menu
        </Link>
        <Link href="/reservations" className="flex-1 bg-primary text-white text-center py-2.5 rounded-sm font-semibold text-sm">
          Book Table
        </Link>
      </div>

      {/* LIGHTBOX MODAL */}
      {activeImg !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={handleClose}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-stone-300"
            aria-label="Close Lightbox"
          >
            <X size={32} />
          </button>
          <div
            className={`t-modal ${isClosing ? "is-closing" : "is-open"} max-w-4xl w-full flex flex-col items-center`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[60vh]">
              <Image
                src={galleryItems[activeImg].src}
                alt={galleryItems[activeImg].title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <div className="text-center text-white mt-6 max-w-xl">
              <h3 id="lightbox-title" className="font-serif text-2xl font-bold text-gold">{galleryItems[activeImg].title}</h3>
              <p className="text-stone-300 mt-2 text-sm">{galleryItems[activeImg].desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
