"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import MenuCard, { MenuItem } from "@/components/menu-card";
import { useFocusTrap } from "@/hooks/use-focus-trap";

interface MenuExplorerProps {
  items: MenuItem[];
}

export default function MenuExplorer({ items }: MenuExplorerProps) {
  const [activeTab, setActiveTab] = useState<"brunch" | "dinner" | "drinks" >("brunch");
  const [selectedTag, setSelectedTag] = useState<"All" | MenuItem["tags"][number]>("All");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedItem(null);
      setIsClosing(false);
    }, 150);
  };

  const filterTags = ["All", "Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"] as const;

  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  const filteredItems = items.filter((item) => {
    const matchesCategory = item.category === activeTab;
    const matchesTag = selectedTag === "All" || item.tags.includes(selectedTag as MenuItem["tags"][number]);
    return matchesCategory && matchesTag;
  });

  const modalRef = useFocusTrap(selectedItem !== null);

  return (
    <>
      {/* CATEGORY TABS */}
      <div 
        role="tablist" 
        aria-label="Menu Categories" 
        className="flex justify-center border-b border-stone-200 mb-8"
      >
        {(["brunch", "dinner", "drinks"] as const).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls="menu-grid-panel"
            onClick={() => {
              setActiveTab(tab);
              setSelectedTag("All"); // Reset sub-filters on tab swap
            }}
            className={`px-8 py-3.5 text-base font-semibold capitalize border-b-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-stone-400 hover:text-stone-600"
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
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              selectedTag === tag
                ? "bg-primary border-primary text-white"
                : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* MENU GRID PANEL */}
      <div 
        id="menu-grid-panel" 
        role="tabpanel"
        aria-label={`${activeTab} menu section`}
      >
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} onSelect={setSelectedItem} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-stone-100 rounded bg-stone-50">
            <p className="text-stone-500 font-medium">No dishes match your selected filter.</p>
          </div>
        )}
      </div>

      {/* DETAILS MODAL */}
      {selectedItem && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-black/55 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div 
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className={`t-modal ${isClosing ? "is-closing" : "is-open"} bg-white rounded-sm w-full max-w-2xl overflow-hidden shadow-2xl relative focus-visible:outline-none`}
            tabIndex={-1}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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
              <p className="text-stone-600 leading-relaxed text-sm mb-6">{selectedItem.description}</p>
              
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
                    <span className="text-xs text-stone-400 font-medium">Traditional Chef Recipe</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
