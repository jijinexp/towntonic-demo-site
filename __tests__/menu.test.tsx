import { render, screen } from "@testing-library/react";
import MenuPage from "@/app/menu/page";
import { MENU_ITEMS } from "@/components/menu-items";

// The old tabbed/filtered menu (and its detail modal) was replaced on 2026-11-08
// by a single stacked menu shared with the homepage.
describe("/menu page", () => {
  it("leads with the Our Menu page heading", () => {
    render(<MenuPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Our Menu" })).toBeInTheDocument();
  });

  it("shows every part of the menu expanded, with every dish", () => {
    render(<MenuPage />);
    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual([
      "All Day",
      "Dinner",
      "Dessert",
      "Drinks",
    ]);
    expect(screen.getAllByRole("article")).toHaveLength(MENU_ITEMS.length);
  });
});
