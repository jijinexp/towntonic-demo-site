import type { MenuItem } from "@/components/menu-card";

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
  groups: MenuGroup[];
}

export const MENU_SECTIONS: MenuPartLayout[] = [
  {
    id: "brunch",
    image: "/images/dishes/dish1.jpeg",
    imageAlt: "Brunch toasts",
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
    image: "/images/dishes/dish5.jpeg",
    imageAlt: "Sous vide beef fillet with carrot velouté",
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
    image: "/images/dishes/dessertdish.jpeg",
    imageAlt: "Dessert",
    label: "Dessert",
    groups: [
      { label: "Desserts", sub: "dessert" },
      { label: "Cookies", sub: "cookies" },
      { label: "Cheese Selection", sub: "cheese" },
    ],
  },
  {
    id: "drinks",
    image: "/images/gallery_coffee.jpg",
    imageAlt: "Coffee at Town Tonic",
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
