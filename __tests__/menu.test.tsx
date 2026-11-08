import { render, screen, within } from "@testing-library/react";
import MenuPage from "@/app/menu/page";
import MenuSlugPage, { generateStaticParams } from "@/app/menu/[slug]/page";
import { MENU_ITEMS } from "@/components/menu-items";
import { MENU_PAGES } from "@/components/menu-pages";

// The menu is an index of four menus (homepage + /menu), each with its own page.
describe("/menu index", () => {
  it("leads with the Our Menus heading and links each menu to its page, numbered", () => {
    render(<MenuPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Our Menus" })).toBeInTheDocument();
    const links = ["All Day", "Dinner", "Dessert", "Drinks"].map((l) => screen.getByRole("link", { name: `${l} menu` }));
    expect(links.map((a) => a.getAttribute("href"))).toEqual(["/menu/all-day", "/menu/dinner", "/menu/dessert", "/menu/drinks"]);
    expect(within(links[1]).getByText("/ 02", { exact: false })).toBeInTheDocument();
  });
});

describe("/menu/[slug] pages", () => {
  const renderPage = async (slug: string) => render(await MenuSlugPage({ params: Promise.resolve({ slug }) }));

  it("builds a page for every menu", () => {
    expect(generateStaticParams()).toEqual(MENU_PAGES.map((m) => ({ slug: m.slug })));
  });

  it("shows the menu title, its photo, groups and every dish on it", async () => {
    await renderPage("dinner");
    expect(screen.getByRole("heading", { level: 1, name: "Dinner" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Sous vide beef fillet with carrot velouté" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Theo's Fisheries & Seafood" })).toBeInTheDocument();
    const dinner = MENU_ITEMS.filter((i) => i.category === "dinner");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(dinner.length);
    expect(screen.getByText("$105.00")).toBeInTheDocument();
  });

  it("lists the add-ons only on All Day", async () => {
    await renderPage("all-day");
    expect(screen.getByRole("heading", { level: 2, name: "Add-ons" })).toBeInTheDocument();
    expect(screen.getByText("Smoked Salmon")).toBeInTheDocument();
  });

  it("links on to the next menu, wrapping from the last to the first", async () => {
    await renderPage("drinks");
    const next = screen.getByRole("navigation", { name: "Next menu" });
    expect(within(next).getByRole("link")).toHaveAttribute("href", "/menu/all-day");
    expect(screen.getByRole("link", { name: /All menus/ })).toHaveAttribute("href", "/#menu");
  });

  it("returns not-found for an unknown menu", async () => {
    await expect(MenuSlugPage({ params: Promise.resolve({ slug: "brunch" }) })).rejects.toThrow();
  });
});
