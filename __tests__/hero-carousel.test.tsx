import { render, screen, fireEvent, act } from "@testing-library/react";
import HeroCarousel, { type Dish } from "@/components/hero-carousel";

const dishes: Dish[] = Array.from({ length: 10 }, (_, i) => ({ src: `/images/dishes/d${i}.jpeg`, alt: `Dish ${i}` }));

let reduceMotion = false;
let canHover = true;

beforeAll(() => {
  class RO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  global.ResizeObserver = RO as unknown as typeof ResizeObserver;
});

beforeEach(() => {
  reduceMotion = false;
  canHover = true;
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query.includes("prefers-reduced-motion")
      ? reduceMotion
      : query.includes("hover")
        ? canHover
        : query.includes("min-aspect-ratio"),
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    onchange: null,
    dispatchEvent: jest.fn(),
  }));
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

const region = () => screen.getByRole("region", { name: "Dishes from the kitchen" });
const figures = () => Array.from(region().querySelectorAll("figure"));
const activeIndex = () => figures().findIndex((f) => f.getAttribute("data-active") === "true");

describe("HeroCarousel", () => {
  it("renders every dish, with only the centre slide exposed to assistive tech", () => {
    render(<HeroCarousel dishes={dishes} />);
    expect(region()).toHaveAttribute("aria-roledescription", "carousel");
    expect(region().querySelectorAll("img")).toHaveLength(10);
    const exposed = figures().filter((f) => f.getAttribute("aria-hidden") === "false");
    expect(exposed).toHaveLength(1);
    expect(activeIndex()).toBe(0);
  });

  it("moves with the arrow keys, including rapid presses and wrapping backwards", () => {
    render(<HeroCarousel dishes={dishes} />);
    fireEvent.keyDown(region(), { key: "ArrowRight" });
    expect(activeIndex()).toBe(1);
    fireEvent.keyDown(region(), { key: "ArrowRight" });
    fireEvent.keyDown(region(), { key: "ArrowRight" });
    expect(activeIndex()).toBe(3);
    fireEvent.keyDown(region(), { key: "ArrowLeft" });
    fireEvent.keyDown(region(), { key: "ArrowLeft" });
    fireEvent.keyDown(region(), { key: "ArrowLeft" });
    fireEvent.keyDown(region(), { key: "ArrowLeft" });
    expect(activeIndex()).toBe(9);
  });

  it("brings a clicked neighbour to the centre", () => {
    render(<HeroCarousel dishes={dishes} />);
    fireEvent.click(figures()[1]);
    expect(activeIndex()).toBe(1);
  });

  it("autoplays one dish per slide + hold (950 + 1400 ms)", () => {
    render(<HeroCarousel dishes={dishes} />);
    act(() => jest.advanceTimersByTime(2300));
    expect(activeIndex()).toBe(0);
    act(() => jest.advanceTimersByTime(100));
    expect(activeIndex()).toBe(1);
  });

  it("pauses while hovered and resumes when the pointer leaves", () => {
    render(<HeroCarousel dishes={dishes} />);
    fireEvent.mouseEnter(region());
    act(() => jest.advanceTimersByTime(10000));
    expect(activeIndex()).toBe(0);
    fireEvent.mouseLeave(region());
    act(() => jest.advanceTimersByTime(2400));
    expect(activeIndex()).toBe(1);
  });

  it("ignores emulated hover on touch screens, so a tap does not freeze autoplay", () => {
    canHover = false;
    render(<HeroCarousel dishes={dishes} />);
    fireEvent.mouseEnter(region());
    act(() => jest.advanceTimersByTime(2400));
    expect(activeIndex()).toBe(1);
  });

  it("stops while the tab is hidden and resumes when visible", () => {
    render(<HeroCarousel dishes={dishes} />);
    Object.defineProperty(document, "hidden", { configurable: true, get: () => true });
    act(() => { document.dispatchEvent(new Event("visibilitychange")); });
    act(() => jest.advanceTimersByTime(10000));
    expect(activeIndex()).toBe(0);
    Object.defineProperty(document, "hidden", { configurable: true, get: () => false });
    act(() => { document.dispatchEvent(new Event("visibilitychange")); });
    act(() => jest.advanceTimersByTime(2400));
    expect(activeIndex()).toBe(1);
  });

  it("does not autoplay under reduced motion, but manual navigation still works", () => {
    reduceMotion = true;
    render(<HeroCarousel dishes={dishes} />);
    act(() => jest.advanceTimersByTime(10000));
    expect(activeIndex()).toBe(0);
    fireEvent.keyDown(region(), { key: "ArrowRight" });
    expect(activeIndex()).toBe(1);
  });

  it("swipes past 40px change dish; small moves do not", () => {
    render(<HeroCarousel dishes={dishes} />);
    fireEvent.touchStart(region(), { touches: [{ clientX: 300 }] });
    fireEvent.touchEnd(region(), { changedTouches: [{ clientX: 280 }] });
    expect(activeIndex()).toBe(0);
    fireEvent.touchStart(region(), { touches: [{ clientX: 300 }] });
    fireEvent.touchEnd(region(), { changedTouches: [{ clientX: 200 }] });
    expect(activeIndex()).toBe(1);
    fireEvent.touchStart(region(), { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(region(), { changedTouches: [{ clientX: 300 }] });
    expect(activeIndex()).toBe(0);
  });

  it("applies a custom object-position to a dish photo", () => {
    render(<HeroCarousel dishes={[{ ...dishes[0], objectPosition: "38% 50%" }, ...dishes.slice(1)]} />);
    expect(screen.getByAltText("Dish 0")).toHaveStyle({ objectPosition: "38% 50%" });
  });
});
