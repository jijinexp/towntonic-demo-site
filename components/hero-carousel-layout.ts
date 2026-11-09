// Pure positioning maths for the homepage peek carousel. Kept free of React and
// the DOM so it can be unit-tested and reasoned about on its own.

export const SIDE_SCALE = 0.86; // neighbours on wide screens
export const GAP_WIDE = 36; // px between tiles on wide screens
export const GAP_TALL = 48; // px on portrait screens — puts neighbours just off-screen
export const VISIBLE_RANGE = 2; // tiles shown either side of the centre
export const WIDE_MAX_FRACTION = 0.56; // tile never wider than this share of the stage on wide screens
export const TALL_SIDE_MARGIN = 48; // total horizontal margin around the tile on portrait screens
export const VERTICAL_MARGIN = 24; // room above/below the tile for its frame and shadow

export interface SlidePlacement {
  offset: number; // signed position relative to the centre tile (0 = centre)
  x: number; // tile centre's horizontal distance from the stage centre, px
  scale: number;
  visible: boolean;
}

export interface LayoutResult {
  size: number; // side length of every (square) tile, px
  slides: SlidePlacement[]; // slides[i] describes dish i
}

/** Shortest signed distance from `active` to `i` on a ring of `count` dishes. */
export function wrapOffset(i: number, active: number, count: number): number {
  const k = (((i - active) % count) + count) % count;
  return k > Math.floor(count / 2) ? k - count : k;
}

export function computeLayout(o: {
  count: number;
  active: number;
  stageW: number;
  stageH: number;
  wide: boolean;
}): LayoutResult {
  const { count, active, stageW, stageH, wide } = o;
  const maxW = wide ? stageW * WIDE_MAX_FRACTION : stageW - TALL_SIDE_MARGIN;
  const size = Math.max(0, Math.min(stageH - VERTICAL_MARGIN, maxW));
  const gap = wide ? GAP_WIDE : GAP_TALL;
  const side = wide ? SIDE_SCALE : 1;
  const scaleOf = (k: number) => (k === 0 ? 1 : side);

  // Every tile is the same size, so position k is a closed-form sum:
  // centre half-width + |k| gaps + (|k| - 1) full side tiles + one side half-width.
  const xOf = (k: number) => {
    if (k === 0) return 0;
    const n = Math.abs(k);
    const dist = size / 2 + n * gap + (n - 1) * size * side + (size * side) / 2;
    return Math.sign(k) * dist;
  };

  const slides = Array.from({ length: count }, (_, i) => {
    const offset = wrapOffset(i, active, count);
    return { offset, x: xOf(offset), scale: scaleOf(offset), visible: Math.abs(offset) <= VISIBLE_RANGE };
  });
  return { size, slides };
}
