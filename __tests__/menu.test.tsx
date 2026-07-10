import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import MenuPage from "@/app/menu/page";

describe("Interactive Menu Filter", () => {
  it("renders menu categories and filter tags", () => {
    render(<MenuPage />);
    expect(screen.getByText("All Day Menu (8am - 2pm)")).toBeInTheDocument();
    expect(screen.getByText("Dinner")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Dessert" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Gluten-Free" })).toBeInTheDocument();
  });

  it("filters items by vegan tag correctly when clicked", async () => {
    render(<MenuPage />);
    // Click Vegan filter button
    const veganFilter = screen.getByRole("button", { name: "Vegan" });
    fireEvent.click(veganFilter);
    
    // Fish of the day is dinner and NOT vegan, it should not show up
    expect(screen.queryByText("Pan Fried Fish of the Day")).not.toBeInTheDocument();
    // Mr. Simple is vegan, should be visible
    expect(screen.getByText("Mr. Simple")).toBeInTheDocument();
  });

  it("switches categories when category tabs are clicked", () => {
    render(<MenuPage />);
    
    // Default category is Brunch, so French Toast should be visible, Pan Fried Fish of the Day should not
    expect(screen.getByText("French Toast")).toBeInTheDocument();
    expect(screen.queryByText("Pan Fried Fish of the Day")).not.toBeInTheDocument();

    // Click Dinner tab
    const dinnerTab = screen.getByRole("tab", { name: "Dinner" });
    fireEvent.click(dinnerTab);

    // Now Pan Fried Fish of the Day should be visible, French Toast should not
    expect(screen.getByText("Pan Fried Fish of the Day")).toBeInTheDocument();
    expect(screen.queryByText("French Toast")).not.toBeInTheDocument();
  });

  it("opens details modal when clicking a menu item and closes it via close button", async () => {
    render(<MenuPage />);
    
    // Click on Mr. Simple card
    const itemCard = screen.getByText("Mr. Simple");
    fireEvent.click(itemCard);

    // Modal with detailed description and close button should appear
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Dietary Profile")).toBeInTheDocument();
    
    // Close modal
    const closeBtn = screen.getByRole("button", { name: "Close Modal" });
    fireEvent.click(closeBtn);

    // Modal should disappear
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  });

  it("renders MenuCard as a button and opens details modal when clicked", async () => {
    render(<MenuPage />);
    
    // Check that MenuCard is a focusable button
    const itemCard = screen.getByRole("button", { name: /Mr. Simple/i });
    expect(itemCard).toBeInTheDocument();
    
    // Clicking it opens the details modal
    fireEvent.click(itemCard);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes details modal when pressing the Escape key", async () => {
    render(<MenuPage />);
    
    // Click to open the modal
    const itemCard = screen.getByText("Mr. Simple");
    fireEvent.click(itemCard);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Press Escape key
    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  });

  it("closes details modal when clicking on the backdrop overlay", async () => {
    render(<MenuPage />);
    
    // Click to open the modal
    const itemCard = screen.getByText("Mr. Simple");
    fireEvent.click(itemCard);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Click on the backdrop (the element with role="dialog")
    const backdrop = screen.getByRole("dialog");
    fireEvent.click(backdrop);
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  });

  it("does not close details modal when clicking inside the modal content", () => {
    render(<MenuPage />);
    
    // Click to open the modal
    const itemCard = screen.getByText("Mr. Simple");
    fireEvent.click(itemCard);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Click inside the modal (e.g. on the title)
    const modalTitle = screen.getByRole("heading", { name: "Mr. Simple", level: 3 });
    fireEvent.click(modalTitle);
    
    // Modal should still be open
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
