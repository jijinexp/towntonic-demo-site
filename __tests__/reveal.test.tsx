import { act, render, screen } from "@testing-library/react";
import Reveal from "@/components/reveal";

describe("Reveal", () => {
  const observers: Array<{
    cb: IntersectionObserverCallback;
    observe: jest.Mock;
    disconnect: jest.Mock;
  }> = [];

  beforeEach(() => {
    observers.length = 0;
    class MockIO {
      cb: IntersectionObserverCallback;
      observe = jest.fn();
      disconnect = jest.fn();
      unobserve = jest.fn();
      takeRecords = () => [];
      root = null;
      rootMargin = "";
      thresholds = [];
      constructor(cb: IntersectionObserverCallback) {
        this.cb = cb;
        observers.push({ cb, observe: this.observe, disconnect: this.disconnect });
      }
    }
    // @ts-expect-error test polyfill
    global.IntersectionObserver = MockIO;
  });

  it("starts hidden and reveals when intersecting", () => {
    render(<Reveal data-testid="wrap">hello</Reveal>);
    const el = screen.getByTestId("wrap");
    expect(el).toHaveAttribute("data-revealed", "false");

    // Simulate intersection.
    const entry = { isIntersecting: true, target: el } as IntersectionObserverEntry;
    act(() => {
      observers[0].cb([entry], {} as IntersectionObserver);
    });

    expect(el).toHaveAttribute("data-revealed", "true");
  });

  it("renders as the requested element", () => {
    render(<Reveal as="section" data-testid="wrap">x</Reveal>);
    expect(screen.getByTestId("wrap").tagName).toBe("SECTION");
  });
});
