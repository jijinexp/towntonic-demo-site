import { Metadata } from "next";
import { Phone, MapPin, Mail, Clock, ShieldAlert } from "lucide-react";
import SprigHeading from "@/components/sprig-heading";

export const metadata: Metadata = {
  title: "Contact & Location - Town Tonic Christchurch",
  description: "Hours, maps, and directions for finding Town Tonic in Addington, Christchurch.",
};

export default function ContactPage() {
  return (
    <div className="py-16 px-4 max-w-6xl mx-auto font-sans">
      <div className="text-center max-w-xl mx-auto mb-16">
        <SprigHeading eyebrow="Find Us" as="h1">Contact Us</SprigHeading>
        <p className="text-text-secondary text-sm">
          We are situated in the energetic heart of Addington, ready for your visit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* MAP PLACEHOLDER */}
        <div className="bg-bg-card border border-border rounded-sm h-[400px] flex flex-col justify-center items-center text-center p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-bg-card flex flex-col justify-center items-center">
            <MapPin size={48} className="text-gold mb-4" />
            <h3 className="font-serif text-xl font-bold text-primary mb-2">Lincoln Road, Addington</h3>
            <p className="text-text-muted text-xs mb-6 max-w-xs">
              Shop 1/335 Lincoln Road, Addington, Christchurch 8024
            </p>
            <a
              href="https://maps.google.com/?q=Shop+1/335+Lincoln+Road+Addington+Christchurch"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-6 py-3 rounded-sm transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="flex flex-col justify-center">
          <h2 className="font-serif text-3xl font-bold text-primary mb-6">Get in Touch</h2>
          
          <div className="space-y-6 text-sm text-text-secondary mb-8">
            <div className="flex items-start gap-4">
              <MapPin className="text-gold mt-1" size={20} />
              <div>
                <h4 className="font-bold text-primary mb-1">Address</h4>
                <p>Shop 1/335 Lincoln Road, Addington, Christchurch 8024</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-gold mt-1" size={20} />
              <div>
                <h4 className="font-bold text-primary mb-1">Phone</h4>
                <a href="tel:+6433381150" className="hover:underline text-primary font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">03 338 1150</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-gold mt-1" size={20} />
              <div>
                <h4 className="font-bold text-primary mb-1">Email</h4>
                <a href="mailto:info@towntonic.co.nz" className="hover:underline text-primary font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">info@towntonic.co.nz</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-gold mt-1" size={20} />
              <div>
                <h4 className="font-bold text-primary mb-1">Hours of Operation</h4>
                <p>Mon - Fri: 7:00 am - Late</p>
                <p>Sat - Sun: 8:00 am - Late</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-card border border-border rounded p-5 text-xs text-text-muted flex gap-3">
            <ShieldAlert className="text-gold flex-shrink-0" size={20} />
            <div>
              <h5 className="font-bold text-primary mb-1">Parking Instructions</h5>
              <p className="leading-relaxed">
                Complimentary visitor street parking is available along Lincoln Road and surrounding side roads. Off-street parking lots are located behind Shop 1.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

