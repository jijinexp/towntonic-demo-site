import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, Star } from "lucide-react";
import HomepageGallery from "@/components/homepage-gallery";
import Reveal from "@/components/reveal";
import SprigHeading from "@/components/sprig-heading";

export const metadata: Metadata = {
  title: "Town Tonic - Modern Bistro & Eating House in Addington",
  description: "Experience seasonal, locally sourced dining at Town Tonic, located in the heart of Addington, Christchurch. Reserve your table or explore our menu today.",
};

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
  return (
    <div className="flex flex-col font-sans">
      {/* HERO SECTION */}
      <section className="-mt-32">
        <div className="relative h-screen w-full overflow-hidden bg-bg-page">
          <Image
            src="/images/dishes/dish8.jpeg"
            alt="Town Tonic seasonal dish"
            fill
            priority
            className="object-contain object-right"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          {/* Gradient wash on the left for heading legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-bg-page via-bg-page/70 to-transparent" />

          {/* Foreground: heading fills, info strip pinned at bottom */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex-1 flex items-center p-6 md:p-12 lg:p-16 md:w-1/2">
              <div className="w-full max-w-3xl">
                <h1 className="text-white text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight">
                  Locally sourced,
                  <br />
                  <span className="italic font-serif font-normal">seasonal</span> dining.
                </h1>
                <p className="mt-5 max-w-md text-white/70 text-base md:text-lg font-sans">
                  A neighbourhood eating house in Addington, Christchurch — brunch to bistro, all day.
                </p>
              </div>
            </div>

            {/* Info strip: phone, address, hours */}
            <aside className="bg-bg-card/95 backdrop-blur-sm border-t border-border text-white font-sans">
            <ul className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-lg md:text-xl">
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <Phone size={22} className="text-gold shrink-0" />
                <a href="tel:+6433381150" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
                  03 338 1150
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <MapPin size={22} className="text-gold shrink-0" />
                <a
                  href="https://maps.google.com/?q=Shop+1/335+Lincoln+Road+Addington+Christchurch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                >
                  Shop 1/335 Lincoln Road, Addington
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                <Clock size={22} className="text-gold shrink-0" />
                <span>Today: 8:30 am – 2:00 pm</span>
                <span className="inline-flex items-center gap-1.5 bg-sage-soft text-sage text-xs font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wide">
                  <span className="t-pulse-dot" aria-hidden="true" />
                  Open now
                </span>
              </li>
            </ul>
          </aside>
          </div>
        </div>
      </section>

      {/* MINIMALISTIC HOME GALLERY SECTION */}
      <section className="py-20 px-4 bg-bg-page">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <SprigHeading eyebrow="Visual Story">Simple Craft, Local Passion</SprigHeading>
              <p className="text-text-secondary mt-4">
                We believe in serving real food made from Canterbury ingredients. Click on any item below to view details.
              </p>
            </Reveal>
          </div>

          <HomepageGallery items={galleryItems} />
        </div>
      </section>

      {/* TESTIMONIAL carousel */}
      <section className="bg-bg-card py-16 px-4 border-y border-border">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <SprigHeading eyebrow="Kind Words" className="mb-6">Guests on Town Tonic</SprigHeading>
            <div className="flex justify-center gap-1 text-gold mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="font-serif text-xl md:text-2xl italic leading-relaxed text-primary max-w-2xl mx-auto">
              &ldquo;The avocado toast was absolutely fresh and the atmosphere was lovely. A perfect blend of refined brunch and cozy cafe vibes.&rdquo;
            </p>
            <span className="block mt-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
              — Sarah M., Christchurch Diner
            </span>
          </Reveal>
        </div>
      </section>

      {/* STICKY BOTTOM ACTION BAR FOR MOBILE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-page border-t border-border p-3 flex gap-3 shadow-lg">
        <Link href="/menu" className="flex-1 border border-primary text-primary text-center py-2.5 rounded-sm font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
          View Menu
        </Link>
        <Link href="/reservations" className="flex-1 bg-primary text-white text-center py-2.5 rounded-sm font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
          Book Table
        </Link>
      </div>
    </div>
  );
}
