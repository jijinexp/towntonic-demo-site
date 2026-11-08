import { render, fireEvent, act } from "@testing-library/react";
import MenuPart from "@/components/menu-part";
import { nextInView, OPEN_AT, CLOSE_AT } from "@/components/menu-reveal";

describe("nextInView (arrival zone with hysteresis)", () => {
  // vh = 1000, nav bottom = 129
  it("enters when the part comes within OPEN_AT of the nav", () => {
    expect(nextInView(false, 129 + 1000 * OPEN_AT + 1, 129, 1000)).toBe(false);
    expect(nextInView(false, 129 + 1000 * OPEN_AT, 129, 1000)).toBe(true);
  });
  it("stays in through small scrolls back up, leaves beyond CLOSE_AT", () => {
    expect(nextInView(true, 129 + 300, 129, 1000)).toBe(true);
    expect(nextInView(true, 129 + 1000 * CLOSE_AT + 1, 129, 1000)).toBe(false);
  });
});

describe("MenuPart: scroll and click together", () => {
  const setTop = (el: HTMLElement, top: number) => {
    el.getBoundingClientRect = () => ({ top, bottom: top + 2000, left: 0, right: 0, width: 0, height: 2000, x: 0, y: top, toJSON: () => ({}) });
  };
  const scroll = async () => {
    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    });
  };

  it("opens on arrival, respects a click to close, and re-opens on the next arrival", async () => {
    const { container, getByRole } = render(
      <MenuPart id="dinner" title="Dinner" image="/x.jpg" imageAlt="x">
        <p>dishes</p>
      </MenuPart>,
    );
    const section = container.querySelector("section")!;
    setTop(section, 2000); // far below
    await scroll();
    expect(section.dataset.open).toBe("false");

    setTop(section, 50); // arrived at the nav
    await scroll();
    expect(section.dataset.open).toBe("true");

    fireEvent.click(getByRole("button", { name: "Hide Dinner menu" })); // reader closes it
    setTop(section, -300); // keeps scrolling within the part
    await scroll();
    expect(section.dataset.open).toBe("false"); // click wins while still in the part

    setTop(section, 2000); // scrolls back up, away
    await scroll();
    setTop(section, 50); // and arrives again
    await scroll();
    expect(section.dataset.open).toBe("true");
  });

  it("still opens and closes on click without any scrolling", () => {
    const { container, getByRole } = render(
      <MenuPart id="drinks" title="Drinks" image="/x.jpg" imageAlt="x">
        <p>dishes</p>
      </MenuPart>,
    );
    const section = container.querySelector("section")!;
    fireEvent.click(getByRole("button", { name: "Show Drinks menu" }));
    expect(section.dataset.open).toBe("true");
  });
});
