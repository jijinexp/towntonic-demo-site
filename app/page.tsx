import { Metadata } from "next";
import HeroCarousel, { type Dish } from "@/components/hero-carousel";
import MenuIndex from "@/components/menu-index";
import TeamSection from "@/components/team-section";

export const metadata: Metadata = {
  title: "Town Tonic - Modern Bistro & Eating House in Addington",
  description: "Experience seasonal, locally sourced dining at Town Tonic, located in the heart of Addington, Christchurch. Reserve your table or explore our menu today.",
};

// Hero carousel: the kitchen's own plated dishes, in display order.
const heroDishes: Dish[] = [
  { src: "/images/dishes/dish8.jpeg", alt: "Sous vide lamb rump with spring peas" },
  { src: "/images/dishes/dish5.jpeg", alt: "Sous vide beef fillet with carrot velouté" },
  { src: "/images/dishes/DSC05288.webp", alt: "A plate on its way out to the dining room" },
  { src: "/images/dishes/dish2.jpeg", alt: "Braised beef cheeks on kūmara mash" },
  { src: "/images/dishes/dish7.jpeg", alt: "Seared scallops with miso purée" },
  // 2:1 photo in a square tile: nudge the crop so the bowl stays centred
  { src: "/images/dishes/dessertdish.jpeg", alt: "Dessert", objectPosition: "38% 50%" },
  { src: "/images/dishes/dish4.jpg", alt: "Raw fish salad" },
  { src: "/images/dishes/dish3.jpeg", alt: "Plates for the table" },
  { src: "/images/dishes/dish6.jpeg", alt: "Eggs on sourdough" },
  { src: "/images/dishes/dish1.jpeg", alt: "Brunch toasts" },
];

export default function Page() {
  return (
    <div className="flex flex-col font-sans">
      {/* HERO: welcome heading over a peek carousel of dishes */}
      <section className="flex flex-col h-[calc(100svh-97px)] md:h-[calc(100svh-129px)] min-h-[520px] bg-bg-page">
        <h1 className="hero-heading shrink-0 px-5 pt-[clamp(20px,4vh,44px)] pb-[clamp(4px,1.2vh,16px)] text-center font-normal leading-[1.02] tracking-[-0.01em] text-text-primary">
          Welcome to <br />
          <span className="underline decoration-1 underline-offset-[0.12em] decoration-text-primary/45">Town Tonic</span>
        </h1>
        <div className="min-h-0 flex-1 pb-[clamp(24px,5vh,48px)]">
          <HeroCarousel dishes={heroDishes} />
        </div>
      </section>

      {/* OUR TEAM */}
      <section id="team" className="scroll-mt-24 md:scroll-mt-32">
        <TeamSection />
      </section>

      {/* MENUS: an index linking to a page per menu */}
      <section id="menu" className="scroll-mt-24 md:scroll-mt-32">
        <MenuIndex />
      </section>
    </div>
  );
}
