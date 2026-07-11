"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import MenuCard, { MenuItem } from "@/components/menu-card";
import Reveal from "@/components/reveal";
import MenuBackground from "@/components/menu-background";

const ADD_ONS = [
  { name: "Two Eggs", price: 7.0 },
  { name: "Crispy Bacon", price: 6.9 },
  { name: "Two Sausages", price: 6.0 },
  { name: "Sautéed Mushrooms", price: 5.5 },
  { name: "Smoked Salmon", price: 7.5 },
  { name: "Grilled Haloumi", price: 6.9 },
  { name: "Chili Hollandaise", price: 3.5 },
  { name: "Hash Browns", price: 6.0 },
  { name: "Fries", price: 12.0 },
];

type Tab = "brunch" | "dinner" | "dessert" | "drinks";
type Group = { label: string; sub: string; caption?: string };

const TAB_LABEL: Record<Tab, string> = {
  brunch: "All Day",
  dinner: "Dinner",
  dessert: "Dessert",
  drinks: "Drinks",
};

const LAYOUT: Record<Tab, Group[]> = {
  brunch: [
    { label: "Honest", sub: "honest" },
    { label: "Eggs", sub: "eggs" },
    { label: "Lunch", sub: "lunch" },
  ],
  dinner: [
    { label: "Trust the Chef", sub: "tasting", caption: "Tasting menus priced per person" },
    { label: "Clearwater & Canterbury Growers", sub: "growers", caption: "Grown in Canterbury soil, sustainable & symbiotic living" },
    { label: "Theo's Fisheries & Seafood", sub: "seafood", caption: "Harvested ethically and sustainably with wild caught perfection" },
    { label: "Maihan & Westmeats Mains", sub: "meat", caption: "Family businesses supporting the community and local farms" },
  ],
  dessert: [
    { label: "Desserts", sub: "dessert" },
    { label: "Cookies", sub: "cookies" },
    { label: "Cheese Selection", sub: "cheese" },
  ],
  drinks: [
    { label: "Cocktails & Mocktails", sub: "cocktails", caption: "Artisanal creations and refreshing non-alcoholic blends" },
    { label: "Fine Wines", sub: "wines", caption: "Proudly curated by local Christchurch Powerhouse Wine Company" },
    { label: "Craft Beers & Cider", sub: "beers", caption: "Featuring local Christchurch Three Boys & Cassels breweries" },
    { label: "Coffee, Tea & Non-Alcoholic", sub: "softs", caption: "Espresso bar available all day, freshly squeezed juices until 2pm" },
  ],
};

interface MenuExplorerProps {
  items: MenuItem[];
}

export default function MenuExplorer({ items }: MenuExplorerProps) {
  const [openTab, setOpenTab] = useState<Tab>("brunch");
  const [selectedTag, setSelectedTag] = useState<"All" | MenuItem["tags"][number]>("All");
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const mobileTabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({
    brunch: null,
    dinner: null,
    dessert: null,
    drinks: null,
  });

  const handleMobileTabClick = (tab: Tab) => {
    if (openTab === tab) return;
    setOpenTab(tab);
    // The accordion animates height over 500ms; scrolling before the previously
    // open panel has collapsed lands us at the wrong Y. Wait for the transition,
    // then align the newly-opened heading just below the sticky nav (h-16 = 64px).
    window.setTimeout(() => {
      const btn = mobileTabRefs.current[tab];
      if (!btn) return;
      const navOffset = 72;
      const top = btn.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }, 520);
  };
  const filterTags = ["All", "Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"] as const;
  const tabs: Tab[] = ["brunch", "dinner", "dessert", "drinks"];

  // Reset + track the "more below" hint whenever the open tab or filter changes.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const evaluate = () => {
      const overflows = el.scrollHeight > el.clientHeight + 4;
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 40;
      setShowScrollHint(overflows && !nearBottom);
    };
    evaluate();
    el.addEventListener("scroll", evaluate, { passive: true });
    return () => el.removeEventListener("scroll", evaluate);
  }, [openTab, selectedTag]);

  const matchesFilter = (item: MenuItem) =>
    selectedTag === "All" || item.tags.includes(selectedTag as MenuItem["tags"][number]);

  const renderTabBody = (tab: Tab) => {
    const tabItems = items.filter((i) => i.category === tab && matchesFilter(i));
    if (tabItems.length === 0) {
      return (
        <p className="text-neutral-600 italic text-center py-10">
          No dishes match your selected filter.
        </p>
      );
    }

    const groups = LAYOUT[tab].filter((g) => tabItems.some((i) => i.subCategory === g.sub));

    return (
      <div className="flex flex-col gap-14">
        {groups.map(({ label, caption, sub }) => {
          const groupItems = tabItems.filter((i) => i.subCategory === sub);
          return (
            <div key={sub}>
              <div className="border-l-4 border-gold pl-3 mb-6">
                <h3 className="font-serif text-2xl md:text-3xl font-bold capitalize tracking-wide">
                  {label}
                </h3>
                {caption && (
                  <p className="text-neutral-600 text-sm italic mt-1">{caption}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                {groupItems.map((item, index) => (
                  <Reveal delayMs={index * 30} key={item.id}>
                    <MenuCard item={item} />
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}

        {tab === "brunch" && (
          <div className="border-t border-neutral-300/70 pt-12 w-full">
            <div className="text-center mb-8">
              <span className="text-gold uppercase tracking-wider font-semibold text-xs">
                Side Additions
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mt-1">Menu Add-ons</h3>
              <p className="text-neutral-600 text-sm mt-1 italic">
                Only available to order with meals
              </p>
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
                  <span className="text-gold font-semibold text-lg shrink-0">
                    ${addon.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
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

      {/* ACCORDION SHELL */}
      <div
        id="menu-grid-panel"
        className="relative isolate rounded-sm overflow-hidden"
      >
        <MenuBackground />

        {/* Desktop: horizontal strips with vertical labels. Fixed viewport
            height keeps every strip the same length across menus. */}
        <div className="hidden md:flex h-[calc(100vh-8rem)] divide-x divide-neutral-400/60">
          {tabs.map((tab, i) => {
            const isOpen = openTab === tab;
            return (
              <div
                key={tab}
                className="relative transition-[flex-grow,flex-basis] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden"
                style={{
                  flexGrow: isOpen ? 20 : 0,
                  flexBasis: isOpen ? "0%" : "6.5rem",
                }}
              >
                {isOpen ? (
                  <div key={tab} ref={scrollRef} className="menu-fade-in h-full overflow-y-auto">
                    <div className="sticky top-0 z-20 px-8 md:px-12 pt-8 md:pt-10 pb-5 bg-[#f2f1e8]/95 backdrop-blur-lg border-b border-neutral-300/60 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                      <div className="flex items-baseline gap-6">
                        <span className="text-gold font-mono text-sm tracking-[0.2em]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="font-serif text-4xl md:text-6xl font-bold text-neutral-900 leading-none">
                          {TAB_LABEL[tab]}
                        </h2>
                      </div>
                    </div>
                    <div className="px-8 md:px-12 pt-8 pb-24 md:pb-28">
                      {renderTabBody(tab)}
                    </div>
                  </div>
                ) : null}

                {isOpen && (
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center pb-4 transition-opacity duration-300 ${
                      showScrollHint ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="h-16 w-full bg-gradient-to-t from-[#f2f1e8] to-transparent -mb-4" />
                    <span className="relative flex items-center gap-2 rounded-full bg-neutral-900/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-50 shadow-lg">
                      Scroll
                      <ChevronDown size={16} className="animate-bounce" />
                    </span>
                  </div>
                )}

                {!isOpen && (
                  <button
                    type="button"
                    onClick={() => setOpenTab(tab)}
                    aria-label={`Open ${TAB_LABEL[tab]} menu`}
                    className="group h-full w-full flex flex-col items-center justify-between py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <span className="text-gold font-mono text-xs tracking-[0.25em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-serif text-3xl lg:text-4xl font-bold text-neutral-800 group-hover:text-gold transition-colors"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {TAB_LABEL[tab]}
                    </span>
                    <span className="text-neutral-500 group-hover:text-gold transition-colors" aria-hidden="true">
                      &#8595;
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: stacked accordion */}
        <ul className="md:hidden divide-y divide-neutral-400/60 px-6">
          {tabs.map((tab, i) => {
            const isOpen = openTab === tab;
            return (
              <li key={tab}>
                <button
                  ref={(el) => {
                    mobileTabRefs.current[tab] = el;
                  }}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${tab}`}
                  onClick={() => handleMobileTabClick(tab)}
                  className="w-full flex items-baseline justify-between text-left py-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-gold font-mono text-xs tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-serif text-3xl font-bold transition-colors ${
                        isOpen ? "text-neutral-900" : "text-neutral-700"
                      }`}
                    >
                      {TAB_LABEL[tab]}
                    </span>
                  </span>
                  <span
                    className={`text-neutral-500 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] text-2xl ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    &#8595;
                  </span>
                </button>
                <div
                  id={`panel-${tab}`}
                  role="region"
                  aria-label={`${TAB_LABEL[tab]} menu`}
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-10">{renderTabBody(tab)}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
