import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HomepageGallery from "@/components/homepage-gallery";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Town Tonic - Modern Bistro & Eating House in Addington",
  description: "Experience seasonal, locally sourced dining at Town Tonic, located in the heart of Addington, Christchurch. Reserve your table or explore our menu today.",
};

const galleryItems = [
  {
    src: "/images/hero_brunch.jpg",
    title: "Seasonal Brunch",
    desc: "Local avocado on sourdough with farm eggs and organic Canterbury microgreens.",
  },
  {
    src: "/images/gallery_dinner.jpg",
    title: "Canterbury Dinner",
    desc: "Pan-seared blue cod on saffron butter emulsion with local sea vegetables.",
  },
  {
    src: "/images/gallery_coffee.jpg",
    title: "Artisan Coffee",
    desc: "Premium local roasted beans, pulled with precision and styled with clean latte art.",
  },
  {
    src: "/images/gallery_interior.jpg",
    title: "The Room",
    desc: "Sunlit spaces, cozy dining tables, and lush green plants in our Addington home.",
  },
];

const pressMentions = [
  { source: "Metro Restaurant Review", quote: "A quietly confident all-day room in Addington." },
  { source: "Neat Places Christchurch", quote: "One of the neighbourhood's most reliable seasonal kitchens." },
  { source: "Google · 4.7 ★ · 480 reviews", quote: "Loved by locals for brunch, drinks, and long dinners." },
];

export default function Page() {
  return (
    <div className="flex flex-col font-sans">
      {/* HERO */}
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
          <div className="absolute inset-0 bg-gradient-to-r from-bg-page via-bg-page/70 to-transparent" />

          <div className="relative z-10 flex h-full items-center p-6 md:p-12 lg:p-16 md:w-1/2">
            <div className="w-full max-w-3xl">
              <h1 className="text-white text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight">
                Locally sourced,
                <br />
                <span className="italic font-serif font-normal">seasonal</span> dining.
              </h1>
              <p className="mt-5 max-w-md text-white/70 text-base md:text-lg">
                A neighbourhood eating house in Addington, Christchurch — brunch to bistro, all day.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/reservations"
                  className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold uppercase tracking-wider px-6 py-3 rounded-sm transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Reserve a Table
                </Link>
                <Link
                  href="/menu"
                  className="border border-white/60 text-white hover:bg-white/10 text-sm font-semibold uppercase tracking-wider px-6 py-3 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  View Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AN INVITATION */}
      <section className="py-24 md:py-32 px-4 bg-bg-page">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="block text-gold uppercase tracking-wider font-semibold text-xs mb-4">
              An Invitation
            </span>
            <p className="font-serif text-2xl md:text-4xl leading-relaxed text-primary">
              The opportunity to meet and serve you is one we don&rsquo;t take lightly.
              Come in for a long lunch, a quick espresso, or a slow-cooked dinner —
              you&rsquo;re welcome as you are.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE SPACE */}
      <section className="py-20 px-4 bg-bg-card border-y border-border">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                <Image
                  src="/images/gallery_interior.jpg"
                  alt="Town Tonic dining room"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden mt-8">
                <Image
                  src="/images/about_suppliers.jpg"
                  alt="Canterbury growers and producers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div>
              <span className="block text-gold uppercase tracking-wider font-semibold text-xs mb-3">
                The Space
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-5">
                A room built for slow hours.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We took a quiet corner of Lincoln Road and turned it into a room that
                works from the first flat white to the last dessert wine. Sunlit in the
                morning, low-lit at night — the kind of place you settle into.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Our kitchen leans on Canterbury growers, Theo&rsquo;s Fisheries, and
                Maihan &amp; Westmeats — small suppliers we&rsquo;ve cooked with for
                years.
              </p>
              <Link
                href="/about"
                className="inline-block mt-6 text-sm font-semibold uppercase tracking-wider text-primary border-b border-gold pb-0.5 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Our story →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DISHES GALLERY */}
      <section className="py-24 px-4 bg-bg-page">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Reveal>
              <span className="block text-gold uppercase tracking-wider font-semibold text-xs">
                On the Table
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-primary">
                From the kitchen this season.
              </h2>
            </Reveal>
          </div>

          <HomepageGallery items={galleryItems} />
        </div>
      </section>

      {/* PRESS / RATING */}
      <section className="bg-bg-card py-20 px-4 border-y border-border">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Reveal>
              <span className="block text-gold uppercase tracking-wider font-semibold text-xs">
                In the Press
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-primary">
                Kind words from the neighbourhood.
              </h2>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pressMentions.map((m, i) => (
              <Reveal delayMs={i * 90} key={m.source}>
                <figure className="h-full bg-bg-page border border-border rounded-sm p-6 flex flex-col">
                  <blockquote className="font-serif text-lg italic text-primary leading-relaxed flex-1">
                    &ldquo;{m.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {m.source}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVATION CTA */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        <Image
          src="/images/gallery_dinner.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 mx-auto max-w-2xl text-center text-white">
          <Reveal>
            <span className="block text-gold uppercase tracking-wider font-semibold text-xs mb-4">
              Join Us
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-5">
              A table is waiting.
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8">
              Book online in under a minute. Walk-ins welcome whenever we have room.
            </p>
            <Link
              href="/reservations"
              className="inline-block bg-primary hover:bg-primary-hover text-white text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-sm transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Reserve a Table
            </Link>
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
