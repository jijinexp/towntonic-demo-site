import { formatDateText, formatTimeText, parseDate, parseGuests, parseTime } from "@/components/booking-parse";

const today = new Date(2026, 10, 9); // 9 Nov 2026

describe("parseDate (day first)", () => {
  it.each([
    ["14/11/2026", "2026-11-14"],
    ["14-11-26", "2026-11-14"],
    ["14.11.2026", "2026-11-14"],
    ["14 11 2026", "2026-11-14"],
    ["2026-11-14", "2026-11-14"],
    [" 1/2/2027 ", "2027-02-01"],
  ])("reads %s", (text, iso) => expect(parseDate(text, today)).toBe(iso));

  it("fills in the year: this year if still ahead, otherwise next year", () => {
    expect(parseDate("20/11", today)).toBe("2026-11-20");
    expect(parseDate("3/1", today)).toBe("2027-01-03");
  });

  it.each(["31/02/2027", "32/1/2027", "tomorrow", "", "14/13/2026"])("rejects %p", (text) =>
    expect(parseDate(text, today)).toBeNull(),
  );

  it("shows dates as DD/MM/YYYY", () => expect(formatDateText("2026-11-14")).toBe("14/11/2026"));
});

describe("parseTime", () => {
  it.each([
    ["6:30 pm", "18:30"],
    ["6.30pm", "18:30"],
    ["630pm", "18:30"],
    ["6pm", "18:00"],
    ["6 p.m.", "18:00"],
    ["18:30", "18:30"],
    ["1830", "18:30"],
    ["12pm", "12:00"],
    ["12am", "00:00"],
    ["9:15am", "09:15"],
    ["7", "19:00"], // no am/pm: 1–7 read as evening
    ["9", "09:00"], // 8–11 read as morning
  ])("reads %s", (text, hhmm) => expect(parseTime(text)).toBe(hhmm));

  it.each(["25:00", "6:75", "13pm", "half six", ""])("rejects %p", (text) => expect(parseTime(text)).toBeNull());

  it("shows times as h:mm am/pm", () => {
    expect(formatTimeText("18:30")).toBe("6:30 pm");
    expect(formatTimeText("00:05")).toBe("12:05 am");
  });
});

describe("parseGuests", () => {
  it("takes whole numbers from 1 to 10", () => {
    expect(parseGuests("4")).toBe(4);
    expect(parseGuests(" 10 ")).toBe(10);
    expect(parseGuests("0")).toBeNull();
    expect(parseGuests("11")).toBeNull();
    expect(parseGuests("2.5")).toBeNull();
    expect(parseGuests("two")).toBeNull();
  });
});
