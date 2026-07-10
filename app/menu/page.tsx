"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import MenuCard, { MenuItem } from "@/components/menu-card";

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
  const [activeTab, setActiveTab] = useState<"brunch" | "dinner" | "drinks">("brunch");
  const [selectedTag, setSelectedTag] = useState<"All" | MenuItem["tags"][number]>("All");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filterTags = ["All", "Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"] as const;

  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = item.category === activeTab;
    const matchesTag = selectedTag === "All" || item.tags.includes(selectedTag as MenuItem["tags"][number]);
    return matchesCategory && matchesTag;
  });

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto font-sans">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-3">Our Menu</h1>
        <p className="text-slate-600 text-sm">
          Canterbury ingredients prepared with care. We serve all-day brunch, refined dinners, and selected local drinks.
        </p>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex justify-center border-b border-stone-200 mb-8">
        {(["brunch", "dinner", "drinks"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSelectedTag("All"); // Reset sub-filters on tab swap
            }}
            className={`px-8 py-3.5 text-base font-semibold capitalize border-b-2 transition-all ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab === "brunch" ? "Brunch" : tab === "dinner" ? "Dinner" : "Drinks"}
          </button>
        ))}
      </div>

      {/* DIETARY FILTER CHIPS */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all ${
              selectedTag === tag
                ? "bg-primary text-white border-primary"
                : "bg-white text-slate-600 border-stone-200 hover:bg-stone-50"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* MENU CARD GRID */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} onSelect={setSelectedItem} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-stone-100 rounded bg-stone-50">
          <p className="text-slate-500 font-medium">No dishes match your selected filter.</p>
        </div>
      )}

      {/* DETAILS MODAL */}
      {selectedItem && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/55 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-sm w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-250"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-all"
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>
            <div className="relative h-[300px] w-full">
              <Image
                src={selectedItem.image}
                alt={selectedItem.name}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-baseline mb-3">
                <h3 id="modal-title" className="font-serif text-2xl font-bold text-primary">{selectedItem.name}</h3>
                <span className="font-sans font-bold text-gold text-xl">${selectedItem.price.toFixed(2)}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm mb-6">{selectedItem.description}</p>
              
              <div className="border-t border-stone-200 pt-6">
                <h5 className="font-semibold text-xs text-primary uppercase tracking-wider mb-2.5">Dietary Profile</h5>
                <div className="flex gap-2">
                  {selectedItem.tags.length > 0 ? (
                    selectedItem.tags.map((t, idx) => (
                      <span key={idx} className="bg-primary/5 text-primary text-xs font-semibold px-3 py-1 rounded-sm">
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Traditional Chef Recipe</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
