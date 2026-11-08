// Whether a menu part is "in view" for the purpose of opening it on scroll.
// A part enters when its top comes within OPEN_AT of the nav (share of the
// viewport height) and leaves once it is pushed back further than CLOSE_AT;
// the gap is hysteresis so small scrolls back up don't flicker the panel.
export const OPEN_AT = 0.15;
export const CLOSE_AT = 0.4;

export function nextInView(inView: boolean, sectionTop: number, navBottom: number, vh: number): boolean {
  const distance = sectionTop - navBottom;
  if (!inView && distance <= vh * OPEN_AT) return true;
  if (inView && distance > vh * CLOSE_AT) return false;
  return inView;
}

// Stacked strips: parts already scrolled past collapse into strips of this
// height under the nav (CSS mirrors these as --strip in globals.css).
export const STRIP_DESKTOP = 56;
export const STRIP_MOBILE = 44;
/** Phones keep the bottom stack above the fixed View Menu / Book Table bar. */
export const MOBILE_BOTTOM_BAR = 69;
export const stripHeight = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches ? STRIP_DESKTOP : STRIP_MOBILE;

/**
 * Index of the part currently being read: the last one whose top has reached
 * its own stacked position (nav bottom + one strip per earlier part). -1 when
 * the first part hasn't reached the nav yet.
 */
export function currentPartIndex(tops: number[], navBottom: number, strip: number): number {
  let current = -1;
  tops.forEach((top, i) => {
    if (top <= navBottom + i * strip + 1) current = i;
  });
  return current;
}

/**
 * Later parts to show in the bottom stack. Part j stays there until its real
 * top rises to the line where its strip sits (stacked above every later part),
 * so the strip hands over seamlessly to the photo scrolling up into view.
 */
export function upcomingParts(tops: number[], vh: number, strip: number, bottomOffset: number, current: number): number[] {
  const n = tops.length;
  const out: number[] = [];
  tops.forEach((top, j) => {
    if (j > current && top > vh - bottomOffset - (n - j) * strip) out.push(j);
  });
  return out;
}
