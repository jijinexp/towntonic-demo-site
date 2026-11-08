import MenuCard, { type MenuItem } from "@/components/menu-card";
import { ADD_ONS, MENU_SECTIONS } from "@/components/menu-layout";
import MenuPart from "@/components/menu-part";
import MenuStack from "@/components/menu-stack";

/** The whole menu, stacked: each part (All Day, Dinner, Dessert, Drinks) is a subsection. */
export default function MenuList({ items }: { items: MenuItem[] }) {
  // Parts with no dishes are skipped; photo sides alternate across the parts shown.
  const parts = MENU_SECTIONS.map((part) => {
    const partItems = items.filter((i) => i.category === part.id);
    const groups = part.groups.filter((g) => partItems.some((i) => i.subCategory === g.sub));
    return { part, partItems, groups };
  }).filter(({ groups }) => groups.length > 0);
  const stackParts = parts.map(({ part }) => ({ id: part.id, label: part.label, image: part.image }));

  return (
    <div className="font-sans">
      <nav aria-label="Menu sections" className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-12 px-4">
        {MENU_SECTIONS.map((part) => (
          <a
            key={part.id}
            href={`#menu-${part.id}`}
            className="text-xl md:text-2xl italic text-text-secondary hover:text-gold border-b border-transparent hover:border-gold pb-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
          >
            {part.label}
          </a>
        ))}
      </nav>

      <div className="menu-parts flex flex-col">
        <MenuStack parts={stackParts} />
        {parts.map(({ part, partItems, groups }, shown) => {
          return (
            <MenuPart
              key={part.id}
              id={part.id}
              title={part.label}
              hours={part.hours}
              image={part.image}
              imageAlt={part.imageAlt}
              side={shown % 2 === 0 ? "left" : "right"}
              index={shown}
            >
              <div className="flex flex-col gap-14">
                {groups.map(({ label, caption, sub }) => (
                  <div key={sub}>
                    <div className="border-l-4 border-gold pl-3 mb-4">
                      <h4 className="text-2xl md:text-3xl font-semibold">{label}</h4>
                      {caption && <p className="text-text-secondary text-sm italic mt-1">{caption}</p>}
                    </div>
                    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-x-12">
                      {partItems
                        .filter((i) => i.subCategory === sub)
                        .map((item) => (
                          <MenuCard key={item.id} item={item} />
                        ))}
                    </div>
                  </div>
                ))}

                {part.id === "brunch" && (
                  <div>
                    <div className="border-l-4 border-gold pl-3 mb-4">
                      <h4 className="text-2xl md:text-3xl font-semibold">Add-ons</h4>
                      <p className="text-text-secondary text-sm italic mt-1">Only available to order with meals</p>
                    </div>
                    <ul className="grid grid-cols-1 2xl:grid-cols-2 gap-x-12">
                      {ADD_ONS.map((addon) => (
                        <li key={addon.name} className="flex items-baseline gap-3 py-3 border-b border-border">
                          <span className="text-text-primary font-medium text-lg">{addon.name}</span>
                          <span aria-hidden="true" className="flex-1 border-b border-dotted border-text-muted translate-y-[-4px]" />
                          <span className="text-gold font-semibold text-lg shrink-0">${addon.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </MenuPart>
          );
        })}
        <MenuStack parts={stackParts} position="bottom" />
      </div>
    </div>
  );
}
