import { Metadata } from "next";
import BookingWizard from "@/components/booking-wizard";

export const metadata: Metadata = {
  title: "Table Reservations - Town Tonic Christchurch",
  description: "Book your lunch, brunch, or dinner table online at Town Tonic.",
};

export default function ReservationsPage() {
  return (
    <div className="bg-bg-page py-16 px-4 font-sans min-h-[70vh] flex flex-col justify-center">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-3 text-primary">Reserve a Table</h1>
        <p className="text-text-secondary text-sm">
          Select your party details and book your spot instantly.
        </p>
      </div>
      <BookingWizard />
    </div>
  );
}
