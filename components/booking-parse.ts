// Reads the date, time and guest count people type into the reservations form.
// Kept free of React so it can be tested on its own.

export const MAX_GUESTS = 10;

const pad = (n: number) => String(n).padStart(2, "0");

/** A local date as "YYYY-MM-DD". */
export function isoDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * A typed date, day first (NZ style), as "YYYY-MM-DD", or null if it isn't a real date.
 * Accepts 14/11/2026, 14-11-26, 14.11.2026, 14 11 2026, 2026-11-14, and 14/11 (this year,
 * or next year if that day has passed).
 */
export function parseDate(text: string, today: Date = new Date()): string | null {
  const t = text.trim();
  let y: number, m: number, d: number;
  const iso = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  const dmy = t.match(/^(\d{1,2})[/\-. ](\d{1,2})(?:[/\-. ](\d{2}|\d{4}))?$/);
  if (iso) {
    [y, m, d] = [Number(iso[1]), Number(iso[2]), Number(iso[3])];
  } else if (dmy) {
    d = Number(dmy[1]);
    m = Number(dmy[2]);
    if (dmy[3]) {
      y = Number(dmy[3]);
      if (y < 100) y += 2000;
    } else {
      y = today.getFullYear();
      if (isoDate(new Date(y, m - 1, d)) < isoDate(today)) y += 1;
    }
  } else {
    return null;
  }
  const date = new Date(y, m - 1, d);
  // Reject days that roll over, like 31/02.
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return isoDate(date);
}

/** "YYYY-MM-DD" shown as "DD/MM/YYYY". */
export function formatDateText(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/**
 * A typed time as 24-hour "HH:MM", or null if it can't be read.
 * Accepts 6:30 pm, 6.30pm, 630pm, 6pm, 18:30, 1830. Without am/pm, 13–23 and 0 are
 * read as 24-hour; 1–7 as pm and 8–11 as am (the restaurant opens 8:30 am to 8:30 pm);
 * 12 as midday.
 */
export function parseTime(text: string): string | null {
  const t = text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/([ap])\.?m\.?$/, "$1m") // a.m. / p.m.
    .replace(/\./g, ":") // 6.30
    .replace(/:(?=[ap])/, "");
  const match = t.match(/^(\d{1,2})(?::?(\d{2}))?(am|pm|a|p)?$/);
  if (!match) return null;
  let h = Number(match[1]);
  const min = match[2] ? Number(match[2]) : 0;
  const suffix = match[3]?.[0];
  if (min > 59) return null;
  if (suffix) {
    if (h < 1 || h > 12) return null;
    if (suffix === "p" && h !== 12) h += 12;
    if (suffix === "a" && h === 12) h = 0;
  } else if (h > 23) {
    return null;
  } else if (h >= 1 && h <= 7) {
    h += 12;
  }
  return `${pad(h)}:${pad(min)}`;
}

/** "HH:MM" shown as "6:30 pm". */
export function formatTimeText(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 === 0 ? 12 : h % 12}:${pad(m)} ${h >= 12 ? "pm" : "am"}`;
}

/** A typed guest count from 1 to MAX_GUESTS, or null. */
export function parseGuests(text: string): number | null {
  if (!/^\s*\d{1,3}\s*$/.test(text)) return null;
  const n = Number(text);
  return n >= 1 && n <= MAX_GUESTS ? n : null;
}
