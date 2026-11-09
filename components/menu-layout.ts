import type { MenuItem } from "@/components/menu-items";

// How the menu is organised on the page: the four parts in order, the groups
// inside each part (matched to MenuItem.subCategory), and the All Day add-ons.

export type MenuPart = MenuItem["category"];

export interface MenuGroup {
  label: string;
  sub: string;
  caption?: string;
}

export interface MenuPartLayout {
  id: MenuPart;
  label: string;
  /** Service time shown under the part heading. */
  hours?: string;
  /** Photo for the part's split-layout panel. */
  image: string;
  imageAlt: string;
  /** CSS object-position, for photos whose subject sits off-centre in the crop. */
  imagePosition?: string;
  groups: MenuGroup[];
}

export const MENU_SECTIONS: MenuPartLayout[] = [
  {
    id: "brunch",
    image: "/images/menus/all-day.webp",
    imageAlt: "French toast with berries and pink crumb",
    label: "All Day",
    hours: "8:00 am – 2:00 pm daily",
    groups: [
      { label: "Honest", sub: "honest" },
      { label: "Eggs", sub: "eggs" },
      { label: "Lunch", sub: "lunch" },
    ],
  },
  {
    id: "dinner",
    image: "/images/menus/dinner.webp",
    imageAlt: "A plated dinner dish with nasturtium leaves and capers",
    label: "Dinner",
    hours: "From 5:30 pm",
    groups: [
      { label: "Trust the Chef", sub: "tasting", caption: "Tasting menus priced per person" },
      { label: "Clearwater & Canterbury Growers", sub: "growers", caption: "Grown in Canterbury soil, sustainable & symbiotic living" },
      { label: "Theo's Fisheries & Seafood", sub: "seafood", caption: "Harvested ethically and sustainably with wild caught perfection" },
      { label: "Maihan & Westmeats Mains", sub: "meat", caption: "Family businesses supporting the community and local farms" },
    ],
  },
  {
    id: "dessert",
    image: "/images/menus/dessert.webp",
    imageAlt: "A plated dessert with a chocolate bar, berry sauce and ice cream",
    label: "Dessert",
    groups: [
      { label: "Desserts", sub: "dessert" },
      { label: "Cookies", sub: "cookies" },
      { label: "Cheese Selection", sub: "cheese" },
    ],
  },
  {
    id: "drinks",
    image: "/images/menus/drinks.webp",
    imageAlt: "A red cocktail in a coupe on a wooden table",
    imagePosition: "50% 25%",
    label: "Drinks",
    groups: [
      { label: "Cocktails & Mocktails", sub: "cocktails", caption: "Artisanal creations and refreshing non-alcoholic blends" },
      { label: "Fine Wines", sub: "wines", caption: "Proudly curated by local Christchurch Powerhouse Wine Company" },
      { label: "Craft Beers & Cider", sub: "beers", caption: "Featuring local Christchurch Three Boys & Cassels breweries" },
      { label: "Coffee, Tea & Non-Alcoholic", sub: "softs", caption: "Espresso bar available all day, freshly squeezed juices until 2pm" },
    ],
  },
];

export const ADD_ONS = [
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
