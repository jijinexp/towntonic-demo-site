import { Metadata } from "next";
import BookingWizard from "@/components/booking-wizard";

export const metadata: Metadata = {
  title: "Table Reservations - Town Tonic Christchurch",
  description: "Book your lunch, brunch, or dinner table online at Town Tonic.",
};

export default function ReservationsPage() {
  return (
    <div className="serif-ink py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
        <div className="mb-3">
          <span className="block uppercase tracking-[0.2em] font-semibold text-sm">Reservations</span>
          <h1 className="title-font text-4xl md:text-6xl mt-2 text-text-primary">Reserve a Table</h1>
        </div>
        <p className="text-text-primary text-lg!">
          Choose your party size, date and time, and we&rsquo;ll hold a table for you.
        </p>
      </div>
      <BookingWizard />
    </div>
  );
}
