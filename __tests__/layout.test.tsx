import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";

describe("Global layout components", () => {
  it("renders navigation links correctly", () => {
    render(<NavBar />);
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Reservations")).toBeInTheDocument();
  });

  it("renders footer containing NAP-H phone and address links", () => {
    render(<Footer />);
    expect(screen.getByText("03 338 1150")).toBeInTheDocument();
    expect(screen.getByText(/335 Lincoln Road/)).toBeInTheDocument();
  });

  it("toggles the mobile menu visibility when the hamburger button is clicked", () => {
    const { container } = render(<NavBar />);
    
    // The mobile menu container (id="mobile-menu") should not be in the document initially
    expect(container.querySelector("#mobile-menu")).not.toBeInTheDocument();
    
    // Find the hamburger button and click it
    const toggleButton = screen.getByRole("button", { name: /toggle menu/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    
    fireEvent.click(toggleButton);
    
    // The mobile menu container should now be in the document
    const mobileMenu = container.querySelector("#mobile-menu");
    expect(mobileMenu).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    
    // Click again to close it
    fireEvent.click(toggleButton);
    expect(container.querySelector("#mobile-menu")).not.toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("verifies footer links have correct href attributes", () => {
    render(<Footer />);
    
    // Verify phone link href
    const phoneLink = screen.getByRole("link", { name: "03 338 1150" });
    expect(phoneLink).toHaveAttribute("href", "tel:+6433381150");
    
    // Verify maps link href
    const mapsLink = screen.getByRole("link", { name: /335 Lincoln Road/ });
    expect(mapsLink).toHaveAttribute(
      "href",
      "https://maps.google.com/?q=Shop+1/335+Lincoln+Road+Addington+Christchurch"
    );
  });

  it("verifies nav-bar links have correct href attributes", () => {
    render(<NavBar />);
    
    // Find all links
    const links = screen.getAllByRole("link");
    
    const findHrefByText = (text: string | RegExp) => {
      const match = links.find(link => {
        const content = link.textContent || "";
        return typeof text === "string" ? content === text : text.test(content);
      });
      return match ? match.getAttribute("href") : null;
    };
    
    expect(findHrefByText("Menu")).toBe("/menu");
    expect(findHrefByText("View Menu")).toBe("/menu");
    expect(findHrefByText("Our Story")).toBe("/about");
    expect(findHrefByText("Contact")).toBe("/contact");
    expect(findHrefByText("Reservations")).toBe("/reservations");
    
    const bookTableLinks = links.filter(link => link.textContent === "Book Table");
    expect(bookTableLinks.length).toBeGreaterThan(0);
    bookTableLinks.forEach(link => {
      expect(link.getAttribute("href")).toBe("/reservations");
    });
  });
});
