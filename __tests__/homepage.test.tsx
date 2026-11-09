import { act, render, screen, within } from "@testing-library/react";
import { HOLD_MS } from "@/components/hero-slider";
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

  it("shows a full-bleed slider of five photos with one on screen at a time", () => {
    render(<Homepage />);
    const slider = screen.getByRole("region", { name: "Photos from Town Tonic" });
    expect(slider.querySelectorAll("img")).toHaveLength(5);
    expect(slider.querySelectorAll('figure[aria-hidden="false"]')).toHaveLength(1);
    expect(within(slider).getByAltText("Sous vide beef fillet with carrot velouté")).toBeInTheDocument();
  });

  it("fades to the next photo on its own every few seconds, looping round", () => {
    jest.useFakeTimers();
    render(<Homepage />);
    const slider = screen.getByRole("region", { name: "Photos from Town Tonic" });
    const shown = () => slider.querySelector('figure[aria-hidden="false"] img')!.getAttribute("alt");
    expect(shown()).toBe("Sous vide beef fillet with carrot velouté");
    act(() => jest.advanceTimersByTime(HOLD_MS));
    expect(shown()).toBe("A plate on its way out to the dining room");
    act(() => jest.advanceTimersByTime(HOLD_MS * 4));
    expect(shown()).toBe("Sous vide beef fillet with carrot velouté");
    expect(within(slider).queryAllByRole("button")).toHaveLength(0);
    jest.useRealTimers();
  });

  it("introduces what's on offer, where to find us and functions under the photos", () => {
    render(<Homepage />);
    const hero = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(within(hero).getByText(/neighbourhood eating house and bar in Addington/)).toBeInTheDocument();
    expect(Array.from(hero.querySelectorAll("dt")).map((d) => d.textContent)).toEqual(["On the menu", "Find us", "Functions"]);
    expect(within(hero).getByText(/no venue fee/)).toBeInTheDocument();
    expect(within(hero).queryByText(/Kanav/)).not.toBeInTheDocument();
    expect(within(hero).getByRole("link", { name: "Facebook" })).toHaveAttribute("href", "https://www.facebook.com/Towntonicaddington/");
    expect(within(hero).getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://www.instagram.com/towntonic_/");
    expect(within(hero).getByRole("link", { name: "info@towntonic.co.nz" })).toHaveAttribute("href", "mailto:info@towntonic.co.nz");
  });

  it("has no call-to-action buttons in the hero: its only links are the social and email ones", () => {
    render(<Homepage />);
    const hero = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(within(hero).queryAllByRole("link").map((l) => l.textContent)).toEqual(["Facebook", "Instagram", "info@towntonic.co.nz"]);
  });

  it("no longer renders its own mobile action bar (the nav provides one site-wide)", () => {
    render(<Homepage />);
    expect(screen.queryByRole("link", { name: "Reservations" })).not.toBeInTheDocument();
  });
});

describe("Homepage below the hero", () => {
  it("shows the chef, then the menu index, after the hero, and nothing else", () => {
    const { container } = render(<Homepage />);
    const sections = container.querySelectorAll(":scope > div > section"); // top-level page sections only
    expect(sections).toHaveLength(3);
    const team = sections[1];
    expect(team).toHaveAttribute("id", "team");
    expect(within(team as HTMLElement).getByRole("heading", { level: 2, name: "Behind the Pass" })).toBeInTheDocument();
    const menu = sections[2];
    expect(menu).toHaveAttribute("id", "menu");
    expect(within(menu as HTMLElement).getByRole("heading", { level: 2, name: "Our Menus" })).toBeInTheDocument();
    expect(within(menu as HTMLElement).getByRole("link", { name: "All Day menu" })).toHaveAttribute("href", "/menu/all-day");
    expect(screen.queryByText(/An Invitation/i)).not.toBeInTheDocument();
  });
});
