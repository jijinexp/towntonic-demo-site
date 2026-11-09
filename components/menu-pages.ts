// The four menus as pages: slug, running number, intro and link for each,
// built on the layout in menu-layout.ts and the dishes in menu-items.ts.
import { MENU_SECTIONS, type MenuPartLayout } from "@/components/menu-layout";
import { MENU_ITEMS } from "@/components/menu-items";

const SLUGS: Record<MenuPartLayout["id"], string> = {
  brunch: "all-day",
  dinner: "dinner",
  dessert: "dessert",
  drinks: "drinks",
};

// Draft intros, written from the menu itself; the restaurant may want to refine them.
const INTROS: Record<MenuPartLayout["id"], string> = {
  brunch:
    "Honest plates for slow mornings and long lunches: eggs, sourdough and seasonal Canterbury produce, served every day until two.",
  dinner:
    "When the lights go down, Kanav's kitchen turns to the region's growers, fishers and farmers, with textural, bold dishes built around what is best this week.",
  dessert: "A sweet finish: plated desserts, house-baked cookies and a selection of cheese to linger over.",
  drinks:
    "Cocktails and mocktails, wine from Christchurch's Powerhouse Wine Company, local Three Boys and Cassels beers, and coffee all day.",
};

export interface MenuPage extends MenuPartLayout {
  slug: string;
  /** "01", "02"… */
  number: string;
  intro: string;
  href: string;
  /** dishes and drinks on this menu */
  count: number;
}

export const MENU_PAGES: MenuPage[] = MENU_SECTIONS.map((m, i) => ({
  ...m,
  slug: SLUGS[m.id],
  number: String(i + 1).padStart(2, "0"),
  intro: INTROS[m.id],
  href: `/menu/${SLUGS[m.id]}`,
  count: MENU_ITEMS.filter((it) => it.category === m.id).length,
}));

/** The menu for a slug, with its position and the menu after it (wrapping round). */
export function menuPageBySlug(slug: string) {
  const index = MENU_PAGES.findIndex((m) => m.slug === slug);
  if (index < 0) return null;
  return { menu: MENU_PAGES[index], index, next: MENU_PAGES[(index + 1) % MENU_PAGES.length] };
}
