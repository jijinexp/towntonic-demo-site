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

  it("opens details modal when pressing Enter or Space key on MenuCard", () => {
    render(<MenuPage />);
    
    // Test Enter key on the MenuCard button/div
    const itemCard = screen.getByRole("button", { name: /Avocado Sourdough/i });
    fireEvent.keyDown(itemCard, { key: "Enter", code: "Enter" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    
    // Close it using the close button
    const closeBtn = screen.getByRole("button", { name: "Close Modal" });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Test Space key on the MenuCard
    fireEvent.keyDown(itemCard, { key: " ", code: "Space" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes details modal when pressing the Escape key", () => {
    render(<MenuPage />);
    
    // Click to open the modal
    const itemCard = screen.getByText("Avocado Sourdough");
    fireEvent.click(itemCard);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Press Escape key
    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes details modal when clicking on the backdrop overlay", () => {
    render(<MenuPage />);
    
    // Click to open the modal
    const itemCard = screen.getByText("Avocado Sourdough");
    fireEvent.click(itemCard);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Click on the backdrop (the element with role="dialog")
    const backdrop = screen.getByRole("dialog");
    fireEvent.click(backdrop);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not close details modal when clicking inside the modal content", () => {
    render(<MenuPage />);
    
    // Click to open the modal
    const itemCard = screen.getByText("Avocado Sourdough");
    fireEvent.click(itemCard);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Click inside the modal (e.g. on the title)
    const modalTitle = screen.getByRole("heading", { name: "Avocado Sourdough", level: 3 });
    fireEvent.click(modalTitle);
    
    // Modal should still be open
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
