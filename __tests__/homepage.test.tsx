import { render, screen, within } from "@testing-library/react";
import Homepage from "@/app/page";

beforeAll(() => {
  class RO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  global.ResizeObserver = RO as unknown as typeof ResizeObserver;
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    onchange: null,
    dispatchEvent: jest.fn(),
  }));
});

describe("Homepage hero", () => {
  it("greets visitors with the welcome heading", () => {
    render(<Homepage />);
    expect(screen.getByRole("heading", { level: 1, name: "Welcome to Town Tonic" })).toBeInTheDocument();
  });

  it("shows the ten-dish carousel with only the centre dish exposed", () => {
    render(<Homepage />);
    const carousel = screen.getByRole("region", { name: "Dishes from the kitchen" });
    expect(carousel.querySelectorAll("img")).toHaveLength(10);
    expect(carousel.querySelectorAll('figure[aria-hidden="false"]')).toHaveLength(1);
    expect(within(carousel).getByAltText("Sous vide lamb rump with spring peas")).toBeInTheDocument();
  });

  it("has no call-to-action buttons in the hero", () => {
    render(<Homepage />);
    const hero = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(within(hero).queryAllByRole("link")).toHaveLength(0);
  });

  it("no longer renders its own mobile action bar (the nav provides one site-wide)", () => {
    render(<Homepage />);
    expect(screen.queryByRole("link", { name: "Book Table" })).not.toBeInTheDocument();
  });
});

describe("Homepage below the hero", () => {
  it("shows the food menu straight after the hero, and nothing else", () => {
    const { container } = render(<Homepage />);
    const sections = container.querySelectorAll(":scope > div > section"); // top-level page sections only
    expect(sections).toHaveLength(2);
    const menu = sections[1];
    expect(menu).toHaveAttribute("id", "menu");
    expect(within(menu as HTMLElement).getByRole("heading", { level: 2, name: "Our Menu" })).toBeInTheDocument();
    expect(within(menu as HTMLElement).getAllByText("All Day").length).toBeGreaterThan(0);
    expect(screen.queryByText(/An Invitation/i)).not.toBeInTheDocument();
  });
});
