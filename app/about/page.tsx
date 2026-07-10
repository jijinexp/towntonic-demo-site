import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story - Town Tonic Christchurch",
  description: "Learn about the local sourcing and bistronomy concept behind Town Tonic.",
};

export default function AboutPage() {
  return (
    <div className="py-16 px-4 max-w-5xl mx-auto font-sans">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-gold uppercase tracking-wider font-semibold text-xs">Our Origins</span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mt-2 mb-3">Our Story</h1>
        <p className="text-slate-600 text-sm">
          Bridging organic Canterbury farming and modern culinary craft.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative h-[400px] w-full border border-stone-200 rounded overflow-hidden">
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
          <p className="text-slate-600 leading-relaxed mb-6 text-sm">
            Town Tonic began with a singular focus: celebrating local Canterbury suppliers and food creators. We work directly with Christchurch nurseries, Canterbury farms, and local boat harbors to source fresh fish, organic vegetables, and small-batch ingredients.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6 text-sm">
            Our kitchen bridges the gap between casual eating and high-level cooking science. Every brunch plate, dinner course, or elixir is designed to showcase the purest flavors of the season.
          </p>
          <Link href="/menu" className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-sm text-sm transition-all shadow-sm">
            Explore Our Dishes
          </Link>
        </div>
      </div>

      <div className="border-t border-stone-200 pt-16">
        <h3 className="font-serif text-3xl font-bold text-center text-primary mb-10">Our Canterbury Partners</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-slate-500 font-medium text-sm">
          <div className="bg-stone-50 p-6 border border-stone-100 rounded-sm">
            <h4 className="text-primary font-bold mb-1">Addington Coffee Roasters</h4>
            <p className="text-xs text-slate-400">Weekly Single-Origin beans</p>
          </div>
          <div className="bg-stone-50 p-6 border border-stone-100 rounded-sm">
            <h4 className="text-primary font-bold mb-1">Akaroa Harbor Harvests</h4>
            <p className="text-xs text-slate-400">Sustainably caught blue cod</p>
          </div>
          <div className="bg-stone-50 p-6 border border-stone-100 rounded-sm">
            <h4 className="text-primary font-bold mb-1">Canterbury Organic Farms</h4>
            <p className="text-xs text-slate-400">Fresh heirloom tomatoes & herbs</p>
          </div>
          <div className="bg-stone-50 p-6 border border-stone-100 rounded-sm">
            <h4 className="text-primary font-bold mb-1">Lincoln Orchard Guild</h4>
            <p className="text-xs text-slate-400">Seasonal apples, pears & honey</p>
          </div>
        </div>
      </div>
    </div>
  );
}

