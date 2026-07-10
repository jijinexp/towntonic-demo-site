import { render, screen, fireEvent } from "@testing-library/react";
import MenuPage from "@/app/menu/page";

describe("Interactive Menu Filter", () => {
  it("renders menu categories and filter tags", () => {
    render(<MenuPage />);
    expect(screen.getByText("Brunch")).toBeInTheDocument();
    expect(screen.getByText("Dinner")).toBeInTheDocument();
    expect(screen.getByText("Gluten-Free")).toBeInTheDocument();
  });

  it("filters items by vegan tag correctly when clicked", async () => {
    render(<MenuPage />);
    // Click Vegan filter button
    const veganFilter = screen.getByRole("button", { name: "Vegan" });
    fireEvent.click(veganFilter);
    
    // Saffron cod is dinner and NOT vegan, it should not show up
    expect(screen.queryByText("Saffron Blue Cod")).not.toBeInTheDocument();
    // Avocado sourdough is vegan, should be visible
    expect(screen.getByText("Avocado Sourdough")).toBeInTheDocument();
  });

  it("switches categories when category tabs are clicked", () => {
    render(<MenuPage />);
    
    // Default category is Brunch, so Blueberry Hotcake should be visible, Saffron Blue Cod should not
    expect(screen.getByText("Blueberry Hotcake")).toBeInTheDocument();
    expect(screen.queryByText("Saffron Blue Cod")).not.toBeInTheDocument();

    // Click Dinner tab
    const dinnerTab = screen.getByRole("button", { name: "Dinner" });
    fireEvent.click(dinnerTab);

    // Now Saffron Blue Cod should be visible, Blueberry Hotcake should not
    expect(screen.getByText("Saffron Blue Cod")).toBeInTheDocument();
    expect(screen.queryByText("Blueberry Hotcake")).not.toBeInTheDocument();
  });

  it("opens details modal when clicking a menu item and closes it via close button", () => {
    render(<MenuPage />);
    
    // Click on Avocado Sourdough card
    const itemCard = screen.getByText("Avocado Sourdough");
    fireEvent.click(itemCard);

    // Modal with detailed description and close button should appear
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Dietary Profile")).toBeInTheDocument();
    
    // Close modal
    const closeBtn = screen.getByRole("button", { name: "Close Modal" });
    fireEvent.click(closeBtn);

    // Modal should disappear
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
