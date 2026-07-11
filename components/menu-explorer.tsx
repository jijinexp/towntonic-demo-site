"use client";
import { useState } from "react";
import MenuCard, { MenuItem } from "@/components/menu-card";
import Reveal from "@/components/reveal";
import MenuBackground from "@/components/menu-background";

const ADD_ONS = [
  { name: "Two Eggs", price: 7.00 },
  { name: "Crispy Bacon", price: 6.90 },
  { name: "Two Sausages", price: 6.00 },
  { name: "Sautéed Mushrooms", price: 5.50 },
  { name: "Smoked Salmon", price: 7.50 },
  { name: "Grilled Haloumi", price: 6.90 },
  { name: "Chili Hollandaise", price: 3.50 },
  { name: "Hash Browns", price: 6.00 },
  { name: "Fries", price: 12.00 },
];

interface MenuExplorerProps {
  items: MenuItem[];
}

export default function MenuExplorer({ items }: MenuExplorerProps) {
  const [activeTab, setActiveTab] = useState<"brunch" | "dinner" | "dessert" | "drinks" >("brunch");
  const [selectedTag, setSelectedTag] = useState<"All" | MenuItem["tags"][number]>("All");
  const filterTags = ["All", "Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"] as const;

  const tabs = ["brunch", "dinner", "dessert", "drinks"] as const;

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.indexOf(activeTab);
    let nextIndex = currentIndex;

    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else {
      return;
    }

    e.preventDefault();
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab);
    setSelectedTag("All");

    // Focus the newly active tab button
    const tabElements = e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    if (tabElements[nextIndex]) {
      tabElements[nextIndex].focus();
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = item.category === activeTab;
    const matchesTag = selectedTag === "All" || item.tags.includes(selectedTag as MenuItem["tags"][number]);
    return matchesCategory && matchesTag;
  });

  return (
    <>
      {/* CATEGORY TABS */}
      <div 
        role="tablist" 
        aria-label="Menu Categories" 
        onKeyDown={handleTabKeyDown}
        className="flex justify-center border-b border-border mb-8"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls="menu-grid-panel"
            tabIndex={activeTab === tab ? 0 : -1}
            onClick={() => {
              setActiveTab(tab);
              setSelectedTag("All"); // Reset sub-filters on tab swap
            }}
            className={`px-8 py-3.5 text-base font-semibold capitalize border-b-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {tab === "brunch" ? "All Day Menu (8am - 2pm)" : tab === "dinner" ? "Dinner" : tab === "dessert" ? "Dessert" : "Drinks"}
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
                ? "bg-sage-soft border-sage text-sage"
                : "bg-bg-card border-border text-text-secondary hover:bg-bg-elevated"
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
        className="relative isolate rounded-sm overflow-hidden p-6 md:p-10"
      >
        <MenuBackground />
        {filteredItems.length > 0 ? (
          activeTab === "brunch" ? (
            <div className="flex flex-col gap-14">
              {/* HONEST GROUP */}
              {filteredItems.filter((item) => item.subCategory === "honest").length > 0 && (
                <div>
                  <div className="border-l-4 border-gold pl-3 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-primary capitalize tracking-wide">Honest</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {filteredItems
                      .filter((item) => item.subCategory === "honest")
                      .map((item, index) => (
                        <Reveal delayMs={index * 30} key={item.id}>
                          <MenuCard item={item} />
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}

              {/* EGGS GROUP */}
              {filteredItems.filter((item) => item.subCategory === "eggs").length > 0 && (
                <div>
                  <div className="border-l-4 border-gold pl-3 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-primary capitalize tracking-wide">Eggs</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {filteredItems
                      .filter((item) => item.subCategory === "eggs")
                      .map((item, index) => (
                        <Reveal delayMs={index * 30} key={item.id}>
                          <MenuCard item={item} />
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}

              {/* LUNCH GROUP */}
              {filteredItems.filter((item) => item.subCategory === "lunch").length > 0 && (
                <div>
                  <div className="border-l-4 border-gold pl-3 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-primary capitalize tracking-wide">Lunch</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {filteredItems
                      .filter((item) => item.subCategory === "lunch")
                      .map((item, index) => (
                        <Reveal delayMs={index * 30} key={item.id}>
                          <MenuCard item={item} />
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === "dinner" ? (
            <div className="flex flex-col gap-14">
              {/* TRUST THE CHEF GROUP */}
              {filteredItems.filter((item) => item.subCategory === "tasting").length > 0 && (
                <div>
                  <div className="border-l-4 border-gold pl-3 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-primary capitalize tracking-wide">Trust the Chef</h3>
                    <p className="text-text-muted text-xs italic mt-0.5">Tasting menus priced per person</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {filteredItems
                      .filter((item) => item.subCategory === "tasting")
                      .map((item, index) => (
                        <Reveal delayMs={index * 30} key={item.id}>
                          <MenuCard item={item} />
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}

              {/* GROWERS GROUP */}
              {filteredItems.filter((item) => item.subCategory === "growers").length > 0 && (
                <div>
                  <div className="border-l-4 border-gold pl-3 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-primary capitalize tracking-wide">Clearwater & Canterbury Growers</h3>
                    <p className="text-text-muted text-xs italic mt-0.5">Grown in Canterbury soil, sustainable & symbiotic living</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {filteredItems
                      .filter((item) => item.subCategory === "growers")
                      .map((item, index) => (
                        <Reveal delayMs={index * 30} key={item.id}>
                          <MenuCard item={item} />
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}

              {/* SEAFOOD GROUP */}
              {filteredItems.filter((item) => item.subCategory === "seafood").length > 0 && (
                <div>
                  <div className="border-l-4 border-gold pl-3 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-primary capitalize tracking-wide">Theo&apos;s Fisheries & Seafood</h3>
                    <p className="text-text-muted text-xs italic mt-0.5">Harvested ethically and sustainably with wild caught perfection</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {filteredItems
                      .filter((item) => item.subCategory === "seafood")
                      .map((item, index) => (
                        <Reveal delayMs={index * 30} key={item.id}>
                          <MenuCard item={item} />
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}

              {/* MEAT GROUP */}
              {filteredItems.filter((item) => item.subCategory === "meat").length > 0 && (
                <div>
                  <div className="border-l-4 border-gold pl-3 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-primary capitalize tracking-wide">Maihan & Westmeats Mains</h3>
                    <p className="text-text-muted text-xs italic mt-0.5">Family businesses supporting the community and local farms</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {filteredItems
                      .filter((item) => item.subCategory === "meat")
                      .map((item, index) => (
                        <Reveal delayMs={index * 30} key={item.id}>
                          <MenuCard item={item} />
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === "drinks" ? (
            <div className="flex flex-col gap-14">
              {/* COCKTAILS & MOCKTAILS */}
              {filteredItems.filter((item) => item.subCategory === "cocktails").length > 0 && (
                <div>
                  <div className="border-l-4 border-gold pl-3 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-primary capitalize tracking-wide">Cocktails & Mocktails</h3>
                    <p className="text-text-muted text-xs italic mt-0.5">Artisanal creations and refreshing non-alcoholic blends</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {filteredItems
                      .filter((item) => item.subCategory === "cocktails")
                      .map((item, index) => (
                        <Reveal delayMs={index * 30} key={item.id}>
                          <MenuCard item={item} />
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}

              {/* WINES */}
              {filteredItems.filter((item) => item.subCategory === "wines").length > 0 && (
                <div>
                  <div className="border-l-4 border-gold pl-3 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-primary capitalize tracking-wide">Fine Wines</h3>
                    <p className="text-text-muted text-xs italic mt-0.5">Proudly curated by local Christchurch Powerhouse Wine Company</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {filteredItems
                      .filter((item) => item.subCategory === "wines")
                      .map((item, index) => (
                        <Reveal delayMs={index * 30} key={item.id}>
                          <MenuCard item={item} />
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}

              {/* BEERS */}
              {filteredItems.filter((item) => item.subCategory === "beers").length > 0 && (
                <div>
                  <div className="border-l-4 border-gold pl-3 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-primary capitalize tracking-wide">Craft Beers & Cider</h3>
                    <p className="text-text-muted text-xs italic mt-0.5">Featuring local Christchurch Three Boys & Cassels breweries</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {filteredItems
                      .filter((item) => item.subCategory === "beers")
                      .map((item, index) => (
                        <Reveal delayMs={index * 30} key={item.id}>
                          <MenuCard item={item} />
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}

              {/* COFFEE, TEA & SOFTS */}
              {filteredItems.filter((item) => item.subCategory === "softs").length > 0 && (
                <div>
                  <div className="border-l-4 border-gold pl-3 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-primary capitalize tracking-wide">Coffee, Tea & Non-Alcoholic</h3>
                    <p className="text-text-muted text-xs italic mt-0.5">Espresso bar available all day, freshly squeezed juices until 2pm</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {filteredItems
                      .filter((item) => item.subCategory === "softs")
                      .map((item, index) => (
                        <Reveal delayMs={index * 30} key={item.id}>
                          <MenuCard item={item} />
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === "dessert" ? (
            <div className="flex flex-col gap-14">
              {/* DESSERTS */}
              {filteredItems.filter((item) => item.subCategory === "dessert").length > 0 && (
                <div>
                  <div className="border-l-4 border-gold pl-3 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-primary capitalize tracking-wide">Desserts</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {filteredItems
                      .filter((item) => item.subCategory === "dessert")
                      .map((item, index) => (
                        <Reveal delayMs={index * 30} key={item.id}>
                          <MenuCard item={item} />
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}

              {/* COOKIES */}
              {filteredItems.filter((item) => item.subCategory === "cookies").length > 0 && (
                <div>
                  <div className="border-l-4 border-gold pl-3 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-primary capitalize tracking-wide">Cookies</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {filteredItems
                      .filter((item) => item.subCategory === "cookies")
                      .map((item, index) => (
                        <Reveal delayMs={index * 30} key={item.id}>
                          <MenuCard item={item} />
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}

              {/* CHEESE */}
              {filteredItems.filter((item) => item.subCategory === "cheese").length > 0 && (
                <div>
                  <div className="border-l-4 border-gold pl-3 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-primary capitalize tracking-wide">Cheese Selection</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {filteredItems
                      .filter((item) => item.subCategory === "cheese")
                      .map((item, index) => (
                        <Reveal delayMs={index * 30} key={item.id}>
                          <MenuCard item={item} />
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {filteredItems.map((item, index) => (
                <Reveal delayMs={index * 30} key={item.id}>
                  <MenuCard item={item} />
                </Reveal>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20 border border-border rounded bg-bg-card">
            <p className="text-text-muted font-medium">No dishes match your selected filter.</p>
          </div>
        )}

        {/* ADD-ONS SECTION */}
        {activeTab === "brunch" && (
          <div className="mt-16 border-t border-neutral-300/70 pt-12 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-gold uppercase tracking-wider font-semibold text-xs">Side Additions</span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mt-1">Menu Add-ons</h3>
              <p className="text-neutral-600 text-sm mt-1 italic">Only available to order with meals</p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {ADD_ONS.map((addon, index) => (
                <li
                  key={index}
                  className="flex items-baseline gap-3 py-3 border-b border-neutral-300/70 font-sans"
                >
                  <span className="text-neutral-900 font-medium text-lg">{addon.name}</span>
                  <span
                    aria-hidden="true"
                    className="flex-1 border-b border-dotted border-neutral-500 translate-y-[-4px]"
                  />
                  <span className="text-gold font-semibold text-lg shrink-0">${addon.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
