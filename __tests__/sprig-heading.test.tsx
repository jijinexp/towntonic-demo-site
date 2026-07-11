import { render, screen } from "@testing-library/react";
import SprigHeading from "@/components/sprig-heading";

describe("SprigHeading", () => {
  beforeEach(() => {
    class MockIO {
      observe = jest.fn();
      disconnect = jest.fn();
      unobserve = jest.fn();
      takeRecords = () => [];
      root = null;
      rootMargin = "";
      thresholds = [];
      constructor() {}
    }
    // @ts-expect-error test polyfill
    global.IntersectionObserver = MockIO;
  });

  it("renders the eyebrow and heading with an aria-hidden sprig", () => {
    render(<SprigHeading eyebrow="VISUAL STORY">Simple Craft, Local Passion</SprigHeading>);
    expect(screen.getByText("VISUAL STORY")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Simple Craft, Local Passion"
    );
    const svg = document.querySelector("svg[aria-hidden='true']");
    expect(svg).not.toBeNull();
  });

  it("respects `as` prop", () => {
    render(<SprigHeading eyebrow="A" as="h3">B</SprigHeading>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });
});
