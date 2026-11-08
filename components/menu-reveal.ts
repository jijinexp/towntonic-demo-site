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
