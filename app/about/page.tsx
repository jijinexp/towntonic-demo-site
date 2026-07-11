import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SprigHeading from "@/components/sprig-heading";

export const metadata: Metadata = {
  title: "Our Story - Town Tonic Christchurch",
  description: "Learn about the local sourcing and bistronomy concept behind Town Tonic.",
};

export default function AboutPage() {
  return (
    <div className="py-16 px-4 max-w-5xl mx-auto font-sans">
      <div className="text-center max-w-xl mx-auto mb-16">
        <SprigHeading eyebrow="Our Origins" as="h1">Our Story</SprigHeading>
        <p className="text-text-secondary text-sm">
          Bridging organic Canterbury farming and modern culinary craft.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative h-[400px] w-full border border-border rounded overflow-hidden">
          <Image
            src="/images/about_suppliers.jpg"
            alt="Canterbury Fields Sourcing"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <h2 className="font-serif text-3xl font-bold text-primary mb-4">The Bistronomy Philosophy</h2>
          <p className="text-text-secondary leading-relaxed mb-6 text-sm">
            Town Tonic began with a singular focus: celebrating local Canterbury suppliers and food creators. We work directly with Christchurch nurseries, Canterbury farms, and local boat harbors to source fresh fish, organic vegetables, and small-batch ingredients.
          </p>
          <p className="text-text-secondary leading-relaxed mb-6 text-sm">
            Our kitchen bridges the gap between casual eating and high-level cooking science. Every brunch plate, dinner course, or elixir is designed to showcase the purest flavors of the season.
          </p>
          <Link href="/menu" className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-sm text-sm transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
            Explore Our Dishes
          </Link>
        </div>
      </div>

      <div className="border-t border-border pt-16">
        <h3 className="font-serif text-3xl font-bold text-center text-primary mb-10">Our Canterbury Partners</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-text-muted font-medium text-sm">
          <div className="bg-bg-card p-6 border border-border rounded-sm">
            <h4 className="text-primary font-bold mb-1">Addington Coffee Roasters</h4>
            <p className="text-xs text-text-muted">Weekly Single-Origin beans</p>
          </div>
          <div className="bg-bg-card p-6 border border-border rounded-sm">
            <h4 className="text-primary font-bold mb-1">Akaroa Harbor Harvests</h4>
            <p className="text-xs text-text-muted">Sustainably caught blue cod</p>
          </div>
          <div className="bg-bg-card p-6 border border-border rounded-sm">
            <h4 className="text-primary font-bold mb-1">Canterbury Organic Farms</h4>
            <p className="text-xs text-text-muted">Fresh heirloom tomatoes & herbs</p>
          </div>
          <div className="bg-bg-card p-6 border border-border rounded-sm">
            <h4 className="text-primary font-bold mb-1">Lincoln Orchard Guild</h4>
            <p className="text-xs text-text-muted">Seasonal apples, pears & honey</p>
          </div>
        </div>
      </div>
    </div>
  );
}

