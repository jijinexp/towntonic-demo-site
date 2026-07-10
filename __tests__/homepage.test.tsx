import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import Homepage from "@/app/page";

describe("Homepage Content", () => {
  it("renders above-the-fold elements (name, tagline, 2 CTAs)", () => {
    render(<Homepage />);
    expect(screen.getByRole("heading", { name: "Town Tonic" })).toBeInTheDocument();
    expect(screen.getByText(/Locally Sourced, Seasonal Dining/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reserve a Table" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore Menu" })).toBeInTheDocument();
  });

  it("renders the minimalist gallery section with text description", () => {
    render(<Homepage />);
    expect(screen.getByText(/Artisan Coffee/)).toBeInTheDocument();
    expect(screen.getByText(/Canterbury Sourced Dinner/)).toBeInTheDocument();
  });

  it("opens the lightbox when a gallery card is clicked and closes it via close button", async () => {
    render(<Homepage />);
    
    // Simulates clicking a gallery card to open the lightbox modal
    const cardTitle = screen.getByText("Seasonal Brunch Craft");
    fireEvent.click(cardTitle);
    
    // Asserts that the lightbox container and the close button are visible
    const lightbox = screen.getByRole("dialog");
    expect(lightbox).toBeInTheDocument();
    expect(lightbox).toHaveAttribute("aria-modal", "true");
    
    const closeButton = screen.getByRole("button", { name: "Close Lightbox" });
    expect(closeButton).toBeInTheDocument();
    
    // Clicks the close button to verify that the lightbox is closed (no longer in the document)
    fireEvent.click(closeButton);
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  });

  it("closes the lightbox when the Escape key is pressed", async () => {
    render(<Homepage />);
    
    // Simulates clicking a gallery card to open the lightbox modal
    const cardTitle = screen.getByText("Seasonal Brunch Craft");
    fireEvent.click(cardTitle);
    
    // Asserts lightbox is open
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    
    // Simulates Escape keypress
    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
    
    // Asserts lightbox is closed
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  });
});
