"use client";
import { useState, useEffect } from "react";
import { Calendar, User, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const TIME_SLOTS = ["11:30 am", "12:00 pm", "12:30 pm", "1:00 pm", "5:30 pm", "6:00 pm", "6:30 pm", "7:00 pm", "7:30 pm"];
const SEAT_ZONES = [
  { id: "main", name: "Main Dining Room", desc: "Cozy refined seating close to our kitchen showcase." },
  { id: "window", name: "Sunlit Window Seating", desc: "Settle next to our floor-to-ceiling glass fronts overlooking Addington." },
  { id: "garden", name: "Heated Garden Bar", desc: "Lush outdoor green courtyard setting with overhead heating." },
];

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
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [zone, setZone] = useState("main");
  
  // Contact Info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  
  // Errors
  const [error, setError] = useState("");
  const [bookingRef, setBookingRef] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setDate(getLocalDateString());
  }, []);

  const handleStep1Next = () => {
    if (!time) {
      setError("Please select a dining time slot.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleStep2Next = () => {
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError("Please fill out all contact fields.");
      return;
    }
    setError("");
    // Generate mock ref
    const ref = "TT-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setStep(4);
  };

  return (
    <div className="w-full max-w-xl mx-auto border border-stone-200 rounded-sm bg-white p-8 shadow-sm">
      {step < 4 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">
              {step === 1 && "Step 1 of 3: Details"}
              {step === 2 && "Step 2 of 3: Seating"}
              {step === 3 && "Step 3 of 3: Contact"}
            </span>
            <span className="text-stone-400 text-xs font-semibold">{step}/3</span>
          </div>
          {/* PROGRESS BAR */}
          <div
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuetext={`Step ${step} of 3`}
            className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden"
          >
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 text-xs font-semibold p-3 rounded-sm mb-6 border border-red-100">
          {error}
        </div>
      )}

      {/* STEP 1: GUESTS, DATE, TIME */}
      {step === 1 && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="flex flex-col">
            <label htmlFor="booking-guests" className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Number of Guests</label>
            <div className="flex items-center gap-3">
              <User size={18} className="text-gold" />
              <select
                id="booking-guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="flex-grow bg-stone-50 border border-stone-200 px-4 py-2.5 rounded text-sm text-slate-700 font-medium"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1} {i + 1 === 1 ? "Guest" : "Guests"}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="booking-date" className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Select Date</label>
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-gold" />
              <input
                id="booking-date"
                type="date"
                min={mounted ? getLocalDateString() : undefined}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-grow bg-stone-50 border border-stone-200 px-4 py-2.5 rounded text-sm text-slate-700 font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Preferred Time Slot</span>
            <div role="group" aria-label="Preferred Time Slot" className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  aria-pressed={time === slot}
                  onClick={() => {
                    setTime(slot);
                    setError("");
                  }}
                  className={`py-2 text-xs font-semibold rounded border transition-all ${
                    time === slot
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-stone-200 text-slate-600 hover:bg-stone-50"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStep1Next}
            className="mt-4 bg-primary hover:bg-primary-hover text-white py-3 rounded-sm font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <span>Next Step</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* STEP 2: SEATING ZONE */}
      {step === 2 && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Choose Dining Zone</span>
            <div role="radiogroup" aria-label="Choose Dining Zone" className="flex flex-col gap-3">
              {SEAT_ZONES.map((sz) => (
                <label
                  key={sz.id}
                  htmlFor={`zone-${sz.id}`}
                  className={`p-4 border rounded cursor-pointer block transition-all ${
                    zone === sz.id
                      ? "border-gold bg-stone-50/50"
                      : "border-stone-200 bg-white hover:bg-stone-50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-sm text-primary">{sz.name}</span>
                    <input
                      id={`zone-${sz.id}`}
                      type="radio"
                      name="dining-zone"
                      value={sz.id}
                      checked={zone === sz.id}
                      onChange={() => setZone(sz.id)}
                      className="accent-primary"
                    />
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{sz.desc}</p>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 border border-stone-200 text-slate-600 hover:bg-stone-50 py-3 rounded-sm font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <button
              onClick={handleStep2Next}
              className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 rounded-sm font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>Next Step</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CONTACT INFORMATION */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 animate-in fade-in duration-200">
          <div className="flex flex-col">
            <label htmlFor="booking-name" className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Full Name</label>
            <input
              id="booking-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded text-sm text-slate-700"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="booking-phone" className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Phone Number</label>
            <input
              id="booking-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 021 234 567"
              className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded text-sm text-slate-700"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="booking-email" className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Email Address</label>
            <input
              id="booking-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded text-sm text-slate-700"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="booking-notes" className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Special Notes (Optional)</label>
            <textarea
              id="booking-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Allergies, high chair requests, birthdays..."
              className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded text-sm text-slate-700 h-24 resize-none"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 border border-stone-200 text-slate-600 hover:bg-stone-50 py-3 rounded-sm font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 rounded-sm font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>Confirm Booking</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: SUCCESS SCREEN */}
      {step === 4 && (
        <div className="text-center py-6 animate-in zoom-in-95 duration-300">
          <div className="flex justify-center mb-6">
            <CheckCircle size={64} className="text-gold" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-primary mb-2">Table Reserved</h3>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
            Booking Ref: <span className="text-gold font-bold">{bookingRef}</span>
          </p>
          
          <div className="bg-stone-50 border border-stone-200 rounded-sm p-5 text-left mb-8 text-sm text-slate-600 flex flex-col gap-3 font-sans">
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="font-semibold text-primary">Guest Count:</span>
              <span>{guests} {guests === 1 ? "person" : "people"}</span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="font-semibold text-primary">Date & Time:</span>
              <span>{formatFriendlyDate(date)} at {time}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-primary">Dining Zone:</span>
              <span className="capitalize">{zone} Area</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mb-8 leading-relaxed max-w-sm mx-auto">
            A confirmation email has been dispatched to <span className="font-semibold">{email}</span>. If you need to make changes, please dial <a href="tel:+6433381150" className="text-primary hover:underline font-semibold">03 338 1150</a>.
          </p>

          <button
            onClick={() => {
              setStep(1);
              setGuests(2);
              setDate(getLocalDateString());
              setTime("");
              setZone("main");
              setName("");
              setPhone("");
              setEmail("");
              setNotes("");
              setBookingRef("");
              setError("");
            }}
            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-6 py-3 rounded-sm transition-all"
          >
            Book Another Table
          </button>
        </div>
      )}
    </div>
  );
}

