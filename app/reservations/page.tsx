import { Metadata } from "next";
import BookingWizard from "@/components/booking-wizard";
import { MapPin, Clock, Phone } from "lucide-react";
import SprigHeading from "@/components/sprig-heading";

export const metadata: Metadata = {
  title: "Table Reservations - Town Tonic Christchurch",
  description: "Book your lunch, brunch, or dinner table online at Town Tonic.",
};

export default function ReservationsPage() {
  return (
    <div className="bg-bg-page py-16 px-4 font-sans min-h-[70vh] flex flex-col justify-center">
      <div className="text-center max-w-xl mx-auto mb-10">
        <SprigHeading eyebrow="Join Us" as="h1">Reserve a Table</SprigHeading>
        <p className="text-text-secondary text-sm mb-6">
          Select your party details, choose your favorite seating zone, and book your spot instantly.
        </p>

        {/* Visible NAP-H Details */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-semibold text-text-muted">
          <span className="text-primary font-bold">Town Tonic</span>
          <span className="hidden sm:inline text-border">|</span>
          <a href="tel:+6433381150" className="hover:text-gold transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
            <Phone size={14} className="text-gold" />
            <span>03 338 1150</span>
          </a>
          <span className="hidden sm:inline text-border">|</span>
          <a
            href="https://maps.google.com/?q=338+Lincoln+Road,+Addington,+Christchurch"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
          >
            <MapPin size={16} className="text-gold shrink-0" />
            <span>338 Lincoln Road, Addington, Christchurch</span>
          </a>
          <span className="hidden sm:inline text-border">|</span>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gold shrink-0" />
            <span>Open Daily from 7:00 am until Late</span>
          </div>
        </div>
      </div>
      <BookingWizard />
    </div>
  );
}
