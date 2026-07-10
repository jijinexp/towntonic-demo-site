import { Metadata } from "next";
import GalleryGrid from "@/components/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery - Visual Showcase of Dishes & Vibe | Town Tonic Christchurch",
  description: "Browse images of our seasonal brunch, Canterbury dinners, espresso bar, and cozy dining atmosphere at Town Tonic on Lincoln Road, Addington.",
};

const IMAGES = [
  { src: "/images/hero_brunch.jpg", title: "Avocado Sourdough Toast" },
  { src: "/images/gallery_dinner.jpg", title: "Canterbury Pan-seared Cod" },
  { src: "/images/gallery_coffee.jpg", title: "Artisan Latte Pour" },
  { src: "/images/gallery_interior.jpg", title: "Addington Dining Room Vibe" },
  { src: "/images/about_suppliers.jpg", title: "Canterbury Farm Fields" },
  { src: "/images/hero_brunch.jpg", title: "Signature Table Plating" },
];

export default function GalleryPage() {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto font-sans">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-gold uppercase tracking-wider font-semibold text-xs">Visual Showcase</span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mt-2 mb-3">Gallery</h1>
        <p className="text-stone-600 text-sm">
          Explore our crafted dishes, locally roasted coffee, and the relaxed dining ambiance of our space.
        </p>
      </div>

      <GalleryGrid images={IMAGES} />
    </div>
  );
}
