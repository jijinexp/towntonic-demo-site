import { render, screen, within, fireEvent } from "@testing-library/react";
import MenuList from "@/components/menu-list";
import { MENU_ITEMS } from "@/components/menu-items";
import { MENU_SECTIONS } from "@/components/menu-layout";

describe("MenuList (stacked menu)", () => {
  it("shows the four parts as subsections, in order, all expanded", () => {
    render(<MenuList items={MENU_ITEMS} />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual(["All Day", "Dinner", "Dessert", "Drinks"]);
    // no tabs or sliders: the only buttons are each part's photo toggle
    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  it("renders every dish on the menu", () => {
    render(<MenuList items={MENU_ITEMS} />);
    expect(screen.getAllByRole("article")).toHaveLength(MENU_ITEMS.length);
    expect(screen.getByRole("heading", { level: 5, name: "Mr. Simple" })).toBeInTheDocument();
  });

  it("groups dishes under their group headings with captions", () => {
    render(<MenuList items={MENU_ITEMS} />);
    const dinner = document.getElementById("menu-dinner")!;
    expect(within(dinner).getByRole("heading", { level: 4, name: "Theo's Fisheries & Seafood" })).toBeInTheDocument();
    expect(within(dinner).getByText("Harvested ethically and sustainably with wild caught perfection")).toBeInTheDocument();
  });

  it("lists the add-ons at the end of All Day", () => {
    render(<MenuList items={MENU_ITEMS} />);
    const allDay = document.getElementById("menu-brunch")!;
    expect(within(allDay).getByText("Add-ons")).toBeInTheDocument();
    expect(within(allDay).getByText("Smoked Salmon")).toBeInTheDocument();
  });

  it("has jump links to each part", () => {
    render(<MenuList items={MENU_ITEMS} />);
    const nav = screen.getByRole("navigation", { name: "Menu sections" });
    const hrefs = within(nav).getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(MENU_SECTIONS.map((s) => `#menu-${s.id}`));
  });

  it("gives each part a photo panel carrying its title", () => {
    render(<MenuList items={MENU_ITEMS} />);
    for (const part of MENU_SECTIONS) {
      const section = document.getElementById(`menu-${part.id}`)!;
      expect(within(section).getByRole("img", { name: part.imageAlt })).toBeInTheDocument();
      expect(within(section).getByRole("heading", { level: 3, name: part.label })).toBeInTheDocument();
    }
  });

  it("starts each part closed, with its dishes hidden behind the photo", () => {
    render(<MenuList items={MENU_ITEMS} />);
    const dinner = document.getElementById("menu-dinner")!;
    expect(dinner.dataset.open).toBe("false");
    const toggle = within(dinner).getByRole("button", { name: "Show Dinner menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(dinner.querySelector(".menu-part-content")).toHaveAttribute("inert");
  });

  it("opens a part when its photo is clicked, and closes it on a second click", () => {
    render(<MenuList items={MENU_ITEMS} />);
    const dinner = document.getElementById("menu-dinner")!;
    fireEvent.click(within(dinner).getByRole("button", { name: "Show Dinner menu" }));
    expect(dinner.dataset.open).toBe("true");
    expect(dinner.querySelector(".menu-part-content")).not.toHaveAttribute("inert");
    const toggle = within(dinner).getByRole("button", { name: "Hide Dinner menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(toggle);
    expect(dinner.dataset.open).toBe("false");
    // other parts are unaffected
    expect(document.getElementById("menu-brunch")!.dataset.open).toBe("false");
  });

  it("alternates the photo side: left, right, left, right", () => {
    render(<MenuList items={MENU_ITEMS} />);
    const sides = MENU_SECTIONS.map((p) => document.getElementById(`menu-${p.id}`)!.dataset.side);
    expect(sides).toEqual(["left", "right", "left", "right"]);
  });

  it("skips groups that have no dishes", () => {
    render(<MenuList items={MENU_ITEMS.filter((i) => i.subCategory !== "cookies")} />);
    expect(screen.queryByRole("heading", { level: 4, name: "Cookies" })).not.toBeInTheDocument();
  });
});
