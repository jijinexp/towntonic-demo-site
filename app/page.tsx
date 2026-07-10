import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, Star } from "lucide-react";
import HomepageGallery from "@/components/homepage-gallery";

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
              className="bg-primary hover:bg-primary-hover text-white text-base font-semibold px-8 py-3.5 rounded-sm transition-all shadow-sm w-full sm:w-auto text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Reserve a Table
            </Link>
            <Link
              href="/menu"
              className="border-2 border-white hover:bg-white hover:text-primary text-white text-base font-semibold px-8 py-3 rounded-sm transition-all w-full sm:w-auto text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* MOBILE QUICK ACTION BAR / INFO BANNER */}
      <section className="bg-stone-50 border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
          <a href="tel:+6433381150" className="py-2 sm:py-0 flex items-center justify-center gap-2 text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
            <Phone size={18} className="text-gold" />
            <span>Call Us: 03 338 1150</span>
          </a>
          <a href="https://maps.google.com/?q=Shop+1/335+Lincoln+Road+Addington+Christchurch" target="_blank" rel="noopener noreferrer" className="py-2 sm:py-0 flex items-center justify-center gap-2 text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
            <MapPin size={18} className="text-gold" />
            <span>Shop 1/335 Lincoln Road</span>
          </a>
          <div className="py-2 sm:py-0 flex items-center justify-center gap-2 text-stone-700 font-medium">
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
            <p className="text-stone-600 mt-4">
              We believe in serving real food made from Canterbury ingredients. Click on any item below to view details.
            </p>
          </div>

          <HomepageGallery items={galleryItems} />
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
          <span className="block mt-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
            — Sarah M., Christchurch Diner
          </span>
        </div>
      </section>

      {/* STICKY BOTTOM ACTION BAR FOR MOBILE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 p-3 flex gap-3 shadow-lg">
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
