import { render, screen } from "@testing-library/react";
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
});
