import { Metadata } from "next";
import MenuExplorer from "@/components/menu-explorer";
import { MenuItem } from "@/components/menu-card";

export const metadata: Metadata = {
  title: "Our Menu - Seasonal Brunch & Dinner | Town Tonic Christchurch",
  description: "Browse the Town Tonic digital menu. Sourced from organic Canterbury farms, we serve fresh brunch, dinner mains, and local craft drinks in Addington.",
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: "b1",
    name: "Avocado Sourdough",
    price: 21.00,
    description: "Smashed avocado on toasted sourdough, heirloom tomatoes, pickled red onion, lemon oil, toasted pumpkin seeds, and local microgreens.",
    category: "brunch",
    tags: ["Vegan", "Vegetarian"],
    image: "/images/hero_brunch.jpg",
  },
  {
    id: "b2",
    name: "Blueberry Hotcake",
    price: 22.50,
    description: "Double stack maple hotcake, loaded with organic Canterbury blueberries, lemon mascarpone, toasted pecans, and local lavender honey.",
    category: "brunch",
    tags: ["Vegetarian"],
    image: "/images/gallery_coffee.jpg",
  },
  {
    id: "d1",
    name: "Saffron Blue Cod",
    price: 38.00,
    description: "Pan-seared wild blue cod fillet served over rich saffron potato cream, charred local samphire, caperberries, and cold-pressed olive oil.",
    category: "dinner",
    tags: ["Gluten-Free"],
    image: "/images/gallery_dinner.jpg",
  },
  {
    id: "d2",
    name: "Canterbury Lamb Roast",
    price: 42.00,
    description: "Slow-roasted grass-fed Canterbury lamb rump, served with rosemary parsnip puree, glazed baby carrots, and red wine jus.",
    category: "dinner",
    tags: ["Gluten-Free", "Dairy-Free"],
    image: "/images/gallery_dinner.jpg",
  },
  {
    id: "dr1",
    name: "Single Origin Batch Brew",
    price: 6.00,
    description: "Artisan filter brew sourced sustainably from direct-trade farms, rotated weekly, roasted in Christchurch.",
    category: "drinks",
    tags: ["Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"],
    image: "/images/gallery_coffee.jpg",
  },
  {
    id: "dr2",
    name: "Elderflower Tonic",
    price: 9.50,
    description: "Town Tonic house elixir: cold-pressed elderflower, Canterbury lemon balm, sparkling spring tonic.",
    category: "drinks",
    tags: ["Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"],
    image: "/images/gallery_coffee.jpg",
  },
];

export default function MenuPage() {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto font-sans">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-3">Our Menu</h1>
        <p className="text-stone-600 text-sm">
          Canterbury ingredients prepared with care. We serve all-day brunch, refined dinners, and selected local drinks.
        </p>
      </div>

      <MenuExplorer items={MENU_ITEMS} />
    </div>
  );
}
