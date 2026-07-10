import BookingWizard from "@/components/booking-wizard";

export const metadata = {
  title: "Table Reservations - Town Tonic Christchurch",
  description: "Book your lunch, brunch, or dinner table online at Town Tonic.",
};

export default function ReservationsPage() {
  return (
    <div className="bg-stone-50 py-16 px-4 font-sans min-h-[70vh] flex flex-col justify-center">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-gold uppercase tracking-wider font-semibold text-xs">Join Us</span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mt-2 mb-3">Reserve a Table</h1>
        <p className="text-slate-600 text-sm">
          Select your party details, choose your favorite seating zone, and book your spot instantly.
        </p>
      </div>
      <BookingWizard />
    </div>
  );
}
