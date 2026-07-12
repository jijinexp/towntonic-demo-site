"use client";
import { useState, useEffect, useRef } from "react";
import { Calendar, User, Minus, Plus, Clock } from "lucide-react";

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

const getLocalDateString = () => {
  const local = new Date();
  const offset = local.getTimezoneOffset();
  const localDate = new Date(local.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().split("T")[0];
};

export default function BookingWizard() {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  useEffect(() => {
    if (submitted && pathRef.current) {
      const len = typeof pathRef.current.getTotalLength === "function"
        ? Math.ceil(pathRef.current.getTotalLength())
        : 40;
      pathRef.current.style.strokeDasharray = String(len);
      pathRef.current.style.strokeDashoffset = String(len);
    }
  }, [submitted]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setDate(getLocalDateString());
    setTime("18:00");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setError("Please select a dining date.");
      return;
    }
    const todayStr = getLocalDateString();
    if (date < todayStr) {
      setError("Please select a current or future dining date.");
      return;
    }
    if (!time) {
      setError("Please select a dining time.");
      return;
    }
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError("Please fill out all contact fields.");
      return;
    }
    setError("");
    const ref = "TT-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-xl mx-auto border border-border rounded-sm bg-bg-card p-8 shadow-sm">
      {error && (
        <div className="bg-red-900/20 text-red-400 text-xs font-semibold p-3 rounded-sm mb-6 border border-red-800/30">
          {error}
        </div>
      )}

      {!submitted && (
        <form onSubmit={handleSubmit} className="t-wizard-step flex flex-col gap-6" key="form">
          <div className="flex flex-col">
            <span id="booking-guests-label" className="text-sm font-bold text-white uppercase tracking-wider mb-2 text-center">Number of Guests</span>
            <div className="flex items-center gap-3">
              <User size={18} className="text-gold" />
              <div
                className="flex-grow flex items-center justify-between bg-bg-page border border-border rounded px-2 py-1.5 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold"
                role="group"
                aria-labelledby="booking-guests-label"
              >
                <button
                  type="button"
                  aria-label="Decrease guests"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  disabled={guests <= 1}
                  className="h-9 w-9 inline-flex items-center justify-center rounded text-text-primary hover:bg-bg-elevated disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Minus size={16} />
                </button>
                <span
                  aria-live="polite"
                  className="text-sm font-semibold text-text-primary tabular-nums"
                >
                  {guests} {guests === 1 ? "Guest" : "Guests"}
                </span>
                <button
                  type="button"
                  aria-label="Increase guests"
                  onClick={() => setGuests((g) => Math.min(10, g + 1))}
                  disabled={guests >= 10}
                  className="h-9 w-9 inline-flex items-center justify-center rounded text-text-primary hover:bg-bg-elevated disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="booking-date" className="text-sm font-bold text-white uppercase tracking-wider mb-2 text-center">Select Date</label>
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-gold" />
              <input
                id="booking-date"
                type="date"
                min={mounted ? getLocalDateString() : undefined}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-grow bg-bg-page border border-border px-4 py-2.5 rounded text-sm text-text-primary font-medium text-center [&::-webkit-date-and-time-value]:text-center [&::-webkit-datetime-edit]:text-center [&::-webkit-datetime-edit-fields-wrapper]:justify-center focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span id="booking-time-label" className="text-sm font-bold text-white uppercase tracking-wider mb-2 text-center">Preferred Time</span>
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-gold" />
              <div
                role="group"
                aria-labelledby="booking-time-label"
                className="flex-grow flex items-center justify-center bg-bg-page border border-border rounded px-3 py-2 gap-1 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold"
              >
                {(() => {
                  const [h24Str = "", mStr = ""] = time.split(":");
                  const h24 = parseInt(h24Str);
                  const m = parseInt(mStr);
                  const validH = !Number.isNaN(h24);
                  const validM = !Number.isNaN(m);
                  const hour12 = validH ? (h24 % 12 === 0 ? 12 : h24 % 12) : 12;
                  const period: "AM" | "PM" = validH && h24 >= 12 ? "PM" : "AM";
                  const minute = validM ? m : 0;

                  const commit = (nh: number, nm: number, np: "AM" | "PM") => {
                    let h = nh % 12;
                    if (np === "PM") h += 12;
                    setTime(`${String(h).padStart(2, "0")}:${String(nm).padStart(2, "0")}`);
                    setError("");
                  };

                  const selectClass =
                    "bg-transparent text-sm text-text-primary font-medium tabular-nums focus:outline-none appearance-none pr-1";

                  return (
                    <>
                      <select
                        aria-label="Hour"
                        value={hour12}
                        onChange={(e) => commit(parseInt(e.target.value), minute, period)}
                        className={selectClass}
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                      <span className="text-text-primary">:</span>
                      <select
                        aria-label="Minute"
                        value={minute}
                        onChange={(e) => commit(hour12, parseInt(e.target.value), period)}
                        className={selectClass}
                      >
                        {Array.from({ length: 12 }, (_, i) => i * 5).map((mm) => (
                          <option key={mm} value={mm}>
                            {String(mm).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <select
                        aria-label="AM or PM"
                        value={period}
                        onChange={(e) => commit(hour12, minute, e.target.value as "AM" | "PM")}
                        className={`${selectClass} ml-2`}
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="booking-name" className="text-sm font-bold text-white uppercase tracking-wider mb-2 text-center">Full Name</label>
            <input
              id="booking-name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="bg-bg-page border border-border px-4 py-2.5 rounded text-sm text-text-primary text-center focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="booking-phone" className="text-sm font-bold text-white uppercase tracking-wider mb-2 text-center">Phone Number</label>
            <input
              id="booking-phone"
              type="tel"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 021 234 567"
              className="bg-bg-page border border-border px-4 py-2.5 rounded text-sm text-text-primary text-center focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="booking-email" className="text-sm font-bold text-white uppercase tracking-wider mb-2 text-center">Email Address</label>
            <input
              id="booking-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              className="bg-bg-page border border-border px-4 py-2.5 rounded text-sm text-text-primary text-center focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="booking-notes" className="text-sm font-bold text-white uppercase tracking-wider mb-2 text-center">Special Notes (Optional)</label>
            <textarea
              id="booking-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Allergies, seating preferences, high chair requests, birthdays..."
              className="bg-bg-page border border-border px-4 py-2.5 rounded text-sm text-text-primary h-24 resize-none text-center focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-primary hover:bg-primary-hover text-white py-3 rounded-sm font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span>Confirm Booking</span>
          </button>
        </form>
      )}

      {submitted && (
        <div className="t-wizard-step text-center py-6" key="success">
          <div className="flex justify-center mb-6">
            <span className="t-success-check" data-state="in" aria-hidden="true">
              <svg className="w-16 h-16 text-gold" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <path ref={pathRef} d="M14 24l8 8 14-16" />
              </svg>
            </span>
          </div>
          <h3 className="font-serif text-3xl font-bold text-primary mb-2">Table Reserved</h3>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-6">
            Booking Ref: <span className="text-gold font-bold">{bookingRef}</span>
          </p>

          <div className="bg-bg-page border border-border rounded-sm p-5 text-left mb-8 text-sm text-text-secondary flex flex-col gap-3 font-sans">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="font-semibold text-primary">Guest Count:</span>
              <span>{guests} {guests === 1 ? "person" : "people"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-primary">Date & Time:</span>
              <span>{formatFriendlyDate(date)} at {formatFriendlyTime(time)}</span>
            </div>
          </div>

          <p className="text-xs text-text-muted mb-8 leading-relaxed max-w-sm mx-auto">
            A confirmation email has been dispatched to <span className="font-semibold">{email}</span>. If you need to make changes, please dial <a href="tel:+6433381150" className="text-primary hover:underline font-semibold">03 338 1150</a>.
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              setGuests(2);
              setDate(getLocalDateString());
              setTime("18:00");
              setName("");
              setPhone("");
              setEmail("");
              setNotes("");
              setBookingRef("");
              setError("");
            }}
            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-6 py-3 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Book Another Table
          </button>
        </div>
      )}
    </div>
  );
}
