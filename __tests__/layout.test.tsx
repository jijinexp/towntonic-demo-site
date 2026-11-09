import { render, screen } from "@testing-library/react";
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

  it("has no hamburger or overlay: Menu and Contact sit in the one main nav (Menu is desktop-only)", () => {
    const { container } = render(<NavBar />);
    expect(screen.queryByRole("button", { name: /menu/i })).not.toBeInTheDocument();
    expect(container.querySelector("#mobile-menu")).not.toBeInTheDocument();
    const main = screen.getByRole("navigation", { name: "Main" });
    expect(Array.from(main.querySelectorAll("a")).map((a) => a.textContent)).toEqual(["Menu", "Contact"]);
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
    
    expect(findHrefByText("Menu")).toBe("/#menu");
    expect(findHrefByText("View Menu")).toBe("/#menu");
    expect(findHrefByText("Our Story")).toBeNull();
    expect(findHrefByText("Contact")).toBe("/contact");
    expect(findHrefByText("Reservations")).toBe("/reservations");
    
    const bookTableLinks = links.filter(link => link.textContent === "Reservations");
    expect(bookTableLinks.length).toBeGreaterThan(0);
    bookTableLinks.forEach(link => {
      expect(link.getAttribute("href")).toBe("/reservations");
    });
  });
});
