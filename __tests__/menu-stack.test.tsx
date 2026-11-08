import { render, screen, fireEvent, act } from "@testing-library/react";
import MenuStack from "@/components/menu-stack";
import { currentPartIndex, upcomingParts } from "@/components/menu-reveal";

describe("currentPartIndex", () => {
  // nav bottom 129, strip 44: part i is current once its top reaches 129 + i*44
  it("is -1 before the first part reaches the nav", () => {
    expect(currentPartIndex([500, 2000, 4000], 129, 44)).toBe(-1);
  });
  it("is the last part whose top has reached its stacked position", () => {
    expect(currentPartIndex([129, 2000, 4000], 129, 44)).toBe(0);
    expect(currentPartIndex([-1800, 129 + 44, 2000], 129, 44)).toBe(1);
    expect(currentPartIndex([-5000, -3000, 129 + 88], 129, 44)).toBe(2);
  });
});

describe("upcomingParts", () => {
  // vh 800, strip 44, no bottom offset; 4 parts. Part j sits in the bottom stack
  // until its real top rises to where its strip would be: vh - (n - j) * strip.
  it("lists later parts that are still below their bottom-strip line", () => {
    expect(upcomingParts([129, 3000, 6000, 9000], 800, 44, 0, 0)).toEqual([1, 2, 3]);
  });
  it("hands a part over to the page once its real top comes up into view", () => {
    // part 1's line is 800 - 3*44 = 668; at 600 it is on screen, so no strip
    expect(upcomingParts([-2000, 600, 3000, 6000], 800, 44, 0, 0)).toEqual([2, 3]);
  });
  it("never lists the current part or earlier ones, and respects a bottom offset", () => {
    expect(upcomingParts([-9000, -6000, 129, 9000], 800, 44, 69, 2)).toEqual([3]);
    expect(upcomingParts([-9000, -6000, -3000, 129], 800, 44, 0, 3)).toEqual([]);
  });
});

describe("MenuStack", () => {
  const parts = [
    { id: "brunch", label: "All Day", image: "/a.jpg" },
    { id: "dinner", label: "Dinner", image: "/b.jpg" },
    { id: "dessert", label: "Dessert", image: "/c.jpg" },
  ];
  const mount = (tops: number[]) => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    tops.forEach((top, i) => {
      const s = document.createElement("section");
      s.id = `menu-${parts[i].id}`;
      s.getBoundingClientRect = () => ({ top, bottom: top + 1000, left: 0, right: 0, width: 0, height: 1000, x: 0, y: top, toJSON: () => ({}) });
      s.scrollIntoView = jest.fn();
      host.appendChild(s);
    });
    return host;
  };
  const tick = async () => {
    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    });
  };
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("shows no strips while the first part is current", async () => {
    mount([0, 2000, 4000]);
    render(<MenuStack parts={parts} />);
    await tick();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("shows nothing at all until the reader is inside the menu parts", async () => {
    mount([500, 3000, 6000]); // still above the first part (hero / "Our Menu" heading)
    render(
      <>
        <MenuStack parts={parts} />
        <MenuStack parts={parts} position="bottom" />
      </>,
    );
    await tick();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("bottom stack offers the parts still to come, and jumps forward", async () => {
    mount([0, 3000, 6000]);
    render(<MenuStack parts={parts} position="bottom" />);
    await tick();
    expect(screen.getAllByRole("button").map((b) => b.textContent)).toEqual(["Dinner", "Dessert"]);
    fireEvent.click(screen.getByRole("button", { name: "Jump to Dessert" }));
    expect(document.getElementById("menu-dessert")!.scrollIntoView).toHaveBeenCalled();
  });

  it("stacks a strip for every part already scrolled past", async () => {
    mount([-5000, -3000, 60]); // in jsdom there is no header, so nav bottom = 0
    render(<MenuStack parts={parts} />);
    await tick();
    expect(screen.getAllByRole("button").map((b) => b.textContent)).toEqual(["All Day", "Dinner"]);
  });

  it("jumps back to a part when its strip is tapped", async () => {
    mount([-5000, -3000, 60]);
    render(<MenuStack parts={parts} />);
    await tick();
    fireEvent.click(screen.getByRole("button", { name: "Back to All Day" }));
    expect(document.getElementById("menu-brunch")!.scrollIntoView).toHaveBeenCalled();
  });
});
