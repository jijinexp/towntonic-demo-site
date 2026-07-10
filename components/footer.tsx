import Link from "next/link";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 py-12 text-sm text-slate-600 font-sans">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-lg font-bold text-primary mb-4">Town Tonic</h3>
          <p className="leading-relaxed">
            Christchurch’s favorite eating house & bar. Bridges the gap between casual daytime cafe and premium evening bistro.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-primary mb-4">Contact & Location</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2.5">
              <MapPin size={16} className="text-gold" />
              <a href="https://maps.google.com/?q=Shop+1/335+Lincoln+Road+Addington+Christchurch" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Shop 1/335 Lincoln Road, Addington, Christchurch
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-gold" />
              <a href="tel:033381150" className="hover:underline">03 338 1150</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-gold" />
              <a href="mailto:info@towntonic.co.nz" className="hover:underline">info@towntonic.co.nz</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-primary mb-4">Opening Hours</h4>
          <ul className="space-y-2 flex flex-col">
            <li className="flex justify-between"><span>Mon:</span> <span>8:30 am – 2:00 pm</span></li>
            <li className="flex justify-between"><span>Tue – Fri:</span> <span>8:30 am – 2:00 pm, 5:30 pm – 8:00 pm</span></li>
            <li className="flex justify-between"><span>Sat:</span> <span>9:00 am – 2:00 pm, 5:30 pm – 8:30 pm</span></li>
            <li className="flex justify-between font-medium text-red-700"><span>Sun:</span> <span>Closed</span></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
