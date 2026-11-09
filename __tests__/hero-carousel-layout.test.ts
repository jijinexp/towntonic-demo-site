import { computeLayout, wrapOffset, GAP_WIDE, GAP_TALL, SIDE_SCALE } from "@/components/hero-carousel-layout";

describe("wrapOffset", () => {
  it("wraps indices into the shortest signed distance from the active dish", () => {
    expect(wrapOffset(9, 0, 10)).toBe(-1);
    expect(wrapOffset(5, 0, 10)).toBe(5);
    expect(wrapOffset(1, 9, 10)).toBe(2);
    expect(wrapOffset(4, 4, 10)).toBe(0);
  });
});

describe("computeLayout", () => {
  it("wide screen: equal squares sized by height, neighbours scaled and spaced outward", () => {
    const { size, slides } = computeLayout({ count: 10, active: 0, stageW: 1280, stageH: 460, wide: true });
    expect(size).toBe(436);
    expect(slides[0]).toEqual({ offset: 0, x: 0, scale: 1, visible: true });
    expect(slides[1].scale).toBe(SIDE_SCALE);
    expect(slides[1].x).toBeCloseTo(436 / 2 + GAP_WIDE + (436 * 0.86) / 2);
    expect(slides[9].x).toBeCloseTo(-slides[1].x);
    expect(slides[2].visible).toBe(true);
    expect(slides[3].visible).toBe(false);
    expect(slides[8].visible).toBe(true);
    expect(slides[7].visible).toBe(false);
  });

  it("wide but narrow stage: square capped at 56% of the width", () => {
    const { size } = computeLayout({ count: 10, active: 0, stageW: 600, stageH: 900, wide: true });
    expect(size).toBeCloseTo(0.56 * 600);
  });

  it("portrait: square capped at width minus 48, neighbours unscaled just off-screen", () => {
    const { size, slides } = computeLayout({ count: 10, active: 4, stageW: 390, stageH: 600, wide: false });
    expect(size).toBe(342);
    expect(slides[4].offset).toBe(0);
    expect(slides[5].scale).toBe(1);
    expect(slides[5].x).toBe(342 + GAP_TALL);
    expect(slides[3].x).toBe(-(342 + GAP_TALL));
  });

  it("wraps: dish 9 sits immediately left of dish 0", () => {
    const { slides } = computeLayout({ count: 10, active: 0, stageW: 1280, stageH: 460, wide: true });
    expect(slides[9].offset).toBe(-1);
    expect(slides[5].offset).toBe(5);
  });

  it("never returns a negative size for a tiny stage", () => {
    const { size } = computeLayout({ count: 10, active: 0, stageW: 10, stageH: 10, wide: false });
    expect(size).toBeGreaterThanOrEqual(0);
  });
});
