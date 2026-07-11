import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";
import { OpeningHours } from "@/types";
import Logo from "./logo";

const openingHours: OpeningHours[] = [
  { day: "Mon", hours: "8:30 am – 2:00 pm", closed: false },
  { day: "Tue – Fri", hours: "8:30 am – 2:00 pm, 5:30 pm – 8:00 pm", closed: false },
  { day: "Sat", hours: "9:00 am – 2:00 pm, 5:30 pm – 8:30 pm", closed: false },
  { day: "Sun", hours: "Closed", closed: true },
];

export default function Footer() {
  return (
    <footer className="bg-bg-card border-t border-border-strong py-12 text-sm text-text-secondary font-sans">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm mb-4" aria-label="Town Tonic Home">
            <Logo className="h-16 md:h-20 w-auto" />
          </Link>
          <p className="leading-relaxed">
            Christchurch’s favorite eating house & bar. Bridges the gap between casual daytime cafe and premium evening bistro.
          </p>
        </div>
        <div>
          <h4 className="mb-4">
            <span className="text-gold uppercase tracking-wider font-semibold text-xs">Contact & Location</span>
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2.5">
              <MapPin size={16} className="text-gold" />
              <a href="https://maps.google.com/?q=Shop+1/335+Lincoln+Road+Addington+Christchurch" target="_blank" rel="noopener noreferrer" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
                Shop 1/335 Lincoln Road, Addington, Christchurch
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-gold" />
              <a href="tel:+6433381150" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">03 338 1150</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-gold" />
              <a href="mailto:info@towntonic.co.nz" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">info@towntonic.co.nz</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4">
            <span className="text-gold uppercase tracking-wider font-semibold text-xs">Opening Hours</span>
          </h4>
          <ul className="space-y-2 flex flex-col">
            {openingHours.map((item) => (
              <li
                key={item.day}
                className={`flex justify-between ${item.closed ? "font-medium text-red-400" : ""}`}
              >
                <span>{item.day}:</span>
                <span>{item.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
