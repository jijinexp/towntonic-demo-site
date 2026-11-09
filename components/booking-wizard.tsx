"use client";
import { useState, useEffect, useRef } from "react";
import { Calendar, Minus, Plus } from "lucide-react";
import { MAX_GUESTS, formatDateText, formatTimeText, isoDate, parseDate, parseGuests, parseTime } from "./booking-parse";

const formatFriendlyTime = (t: string) => {
  if (!t) return "";
  const [hStr, mStr] = t.split(":");
  const h = parseInt(hStr);
  const m = parseInt(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return t;
  const period = h >= 12 ? "pm" : "am";
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return `${displayH}:${mStr.padStart(2, "0")} ${period}`;
};

const formatFriendlyDate = (dateStr: string) => {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  return d.toLocaleDateString("en-NZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getLocalDateString = () => isoDate(new Date());

export default function BookingWizard() {
  const [submitted, setSubmitted] = useState(false);
  // What the visitor has typed; read with booking-parse.ts on blur and on submit.
  const [guestsText, setGuestsText] = useState("2");
  const [dateText, setDateText] = useState("");
  const [timeText, setTimeText] = useState("");
  // The booking as confirmed.
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [bookingRef, setBookingRef] = useState("");

  const pathRef = useRef<SVGPathElement>(null);
  const pickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (submitted && pathRef.current) {
      const len = typeof pathRef.current.getTotalLength === "function"
        ? Math.ceil(pathRef.current.getTotalLength())
        : 40;
      pathRef.current.style.strokeDasharray = String(len);
      pathRef.current.style.strokeDashoffset = String(len);
    }
  }, [submitted]);

  const resetDateTime = () => {
    setDateText(formatDateText(getLocalDateString()));
    setTimeText(formatTimeText("18:00"));
  };

  useEffect(() => {
    // Today's date depends on the visitor's clock, so fill it in after mounting.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    resetDateTime();
  }, []);

  const stepGuests = (dir: 1 | -1) => {
    const n = parseInt(guestsText, 10);
    const base = Number.isNaN(n) ? 2 : n;
    setGuestsText(String(Math.min(MAX_GUESTS, Math.max(1, base + dir))));
    setError("");
  };
  const typedGuests = parseInt(guestsText, 10);

  const openPicker = () => {
    const el = pickerRef.current;
    if (!el) return;
    const iso = parseDate(dateText);
    if (iso) el.value = iso;
    if (typeof el.showPicker === "function") el.showPicker();
    else el.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const g = parseGuests(guestsText);
    if (g === null) {
      setError(`Please enter between 1 and ${MAX_GUESTS} guests. For larger groups, call us on 03 338 1150.`);
      return;
    }
    const d = parseDate(dateText);
    if (!d) {
      setError("Please enter the date as DD/MM/YYYY, for example 14/11/2026.");
      return;
    }
    if (d < getLocalDateString()) {
      setError("Please choose today or a date in the future.");
      return;
    }
    const t = parseTime(timeText);
    if (!t) {
      setError("Please enter a time like 6:30 pm or 18:30.");
      return;
    }
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError("Please fill out all contact fields.");
      return;
    }
    setError("");
    setGuests(g);
    setDate(d);
    setTime(t);
    setDateText(formatDateText(d));
    setTimeText(formatTimeText(t));
    const ref = "TT-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setSubmitted(true);
  };

  // Same field and label styles as the contact form.
  const labelClass = "flex flex-col gap-1.5 text-sm font-semibold text-text-primary uppercase tracking-[0.14em]";
  const fieldClass =
    "w-full bg-bg-card border border-border rounded-sm px-3 py-2.5 text-lg font-normal normal-case tracking-normal text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary";
  const boxClass =
    "flex items-center bg-bg-card border border-border rounded-sm text-lg font-normal normal-case tracking-normal text-text-primary focus-within:ring-2 focus-within:ring-text-primary";
  const stepClass =
    "h-9 w-9 shrink-0 inline-flex items-center justify-center rounded-sm text-text-primary hover:bg-text-primary/10 disabled:opacity-35 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary";
  const bareInput = "min-w-0 flex-1 bg-transparent py-2.5 focus:outline-none placeholder:text-text-muted";

  return (
    <div className="w-full max-w-2xl mx-auto">
      {error && (
        <p role="alert" className="mb-6 border border-red-800/40 rounded-sm px-4 py-3 text-base! text-red-900">
          {error}
        </p>
      )}

      {!submitted && (
        <form onSubmit={handleSubmit} noValidate className="t-wizard-step space-y-4" key="form">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={labelClass}>
              <label htmlFor="booking-guests">Guests</label>
              <div className={`${boxClass} px-1.5`}>
                <button type="button" aria-label="Decrease guests" onClick={() => stepGuests(-1)} disabled={typedGuests <= 1} className={stepClass}>
                  <Minus size={16} />
                </button>
                <input
                  id="booking-guests"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={guestsText}
                  onChange={(e) => {
                    setGuestsText(e.target.value);
                    setError("");
                  }}
                  aria-describedby="booking-guests-hint"
                  className={`${bareInput} text-center tabular-nums`}
                />
                <button type="button" aria-label="Increase guests" onClick={() => stepGuests(1)} disabled={typedGuests >= MAX_GUESTS} className={stepClass}>
                  <Plus size={16} />
                </button>
              </div>
              <span id="booking-guests-hint" className="sr-only">Up to {MAX_GUESTS} guests</span>
            </div>

            <div className={labelClass}>
              <label htmlFor="booking-date">Date</label>
              <div className={`${boxClass} relative pl-3 pr-1.5`}>
                <input
                  id="booking-date"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="DD/MM/YYYY"
                  value={dateText}
                  onChange={(e) => {
                    setDateText(e.target.value);
                    setError("");
                  }}
                  onBlur={() => {
                    const iso = parseDate(dateText);
                    if (iso) setDateText(formatDateText(iso));
                  }}
                  className={`${bareInput} tabular-nums`}
                />
                <button type="button" aria-label="Choose a date from a calendar" onClick={openPicker} className={stepClass}>
                  <Calendar size={18} strokeWidth={1.5} />
                </button>
                {/* the calendar behind the button; typing in the field works without it */}
                <input
                  ref={pickerRef}
                  type="date"
                  tabIndex={-1}
                  aria-hidden="true"
                  min={getLocalDateString()}
                  onChange={(e) => {
                    if (e.target.value) setDateText(formatDateText(e.target.value));
                    setError("");
                  }}
                  className="pointer-events-none absolute h-0 w-0 opacity-0"
                />
              </div>
            </div>

            <label htmlFor="booking-time" className={labelClass}>
              Time
              <input
                id="booking-time"
                type="text"
                autoComplete="off"
                placeholder="e.g. 6:30 pm"
                value={timeText}
                onChange={(e) => {
                  setTimeText(e.target.value);
                  setError("");
                }}
                onBlur={() => {
                  const t = parseTime(timeText);
                  if (t) setTimeText(formatTimeText(t));
                }}
                className={`${fieldClass} tabular-nums`}
              />
            </label>
          </div>

          <label htmlFor="booking-name" className={labelClass}>
            Full Name
            <input
              id="booking-name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={fieldClass}
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label htmlFor="booking-phone" className={labelClass}>
              Phone Number
              <input
                id="booking-phone"
                type="tel"
                required
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="021 234 567"
                className={fieldClass}
              />
            </label>
            <label htmlFor="booking-email" className={labelClass}>
              Email Address
              <input
                id="booking-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={fieldClass}
              />
            </label>
          </div>

          <label htmlFor="booking-notes" className={labelClass}>
            Special Notes (Optional)
            <textarea
              id="booking-notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Allergies, seating preferences, high chairs, birthdays…"
              className={`${fieldClass} resize-y`}
            />
          </label>

          <button type="submit" className="btn text-base">
            Confirm Booking
          </button>
        </form>
      )}

      {submitted && (
        <div className="t-wizard-step text-center py-6" key="success">
          <div className="flex justify-center mb-6">
            <span className="t-success-check" data-state="in" aria-hidden="true">
              <svg className="w-16 h-16 text-text-primary" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path ref={pathRef} d="M14 24l8 8 14-16" />
              </svg>
            </span>
          </div>
          <h2 className="title-font text-3xl md:text-5xl text-text-primary mb-3">Table Reserved</h2>
          <p className="text-sm! uppercase tracking-[0.2em] mb-8">
            Booking Ref: <span className="font-semibold">{bookingRef}</span>
          </p>

          <dl className="mx-auto max-w-md text-left border-t border-text-primary/30 mb-8">
            <div className="flex justify-between gap-6 border-b border-text-primary/30 py-3 text-lg">
              <dt className="uppercase text-sm tracking-[0.14em] self-center">Guests</dt>
              <dd>{guests} {guests === 1 ? "person" : "people"}</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-text-primary/30 py-3 text-lg">
              <dt className="uppercase text-sm tracking-[0.14em] self-center">When</dt>
              <dd className="text-right">{formatFriendlyDate(date)} at {formatFriendlyTime(time)}</dd>
            </div>
          </dl>

          <p className="text-base! leading-relaxed max-w-md mx-auto mb-8">
            A confirmation email has been sent to <span className="font-semibold">{email}</span>. If you need to make changes, please call{" "}
            <a href="tel:+6433381150" className="underline underline-offset-4 hover:no-underline">03 338 1150</a>.
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              setGuestsText("2");
              resetDateTime();
              setName("");
              setPhone("");
              setEmail("");
              setNotes("");
              setBookingRef("");
              setError("");
            }}
            className="btn text-base"
          >
            Book Another Table
          </button>
        </div>
      )}
    </div>
  );
}
