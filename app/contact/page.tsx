import { Metadata } from "next";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Location - Town Tonic Christchurch",
  description: "Hours, maps, and directions for finding Town Tonic in Addington, Christchurch.",
};

export default function ContactPage() {
  return (
    <div className="py-16 px-4 max-w-6xl mx-auto font-sans">
      <div className="text-center max-w-xl mx-auto mb-16">
        <div className="mb-3">
          <span className="block text-gold uppercase tracking-wider font-semibold text-xs">Find Us</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-primary">Contact Us</h1>
        </div>
        <p className="text-text-secondary text-sm">
          We are situated in the energetic heart of Addington, ready for your visit.
        </p>
      </div>

      <div className="mb-16">
        {/* CONTACT INFORMATION */}
        <div className="flex flex-col max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-primary mb-6">Get in Touch</h2>
          
          <form
            action="mailto:info@towntonic.co.nz"
            method="post"
            encType="text/plain"
            className="space-y-4 mb-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                Name
                <input
                  type="text"
                  name="name"
                  required
                  className="bg-bg-card border border-border rounded-sm px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  placeholder="Your name"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="bg-bg-card border border-border rounded-sm px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
              Subject
              <input
                type="text"
                name="subject"
                className="bg-bg-card border border-border rounded-sm px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                placeholder="Reservation enquiry, private event, feedback…"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
              Message
              <textarea
                name="message"
                required
                rows={5}
                className="bg-bg-card border border-border rounded-sm px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold resize-y"
                placeholder="How can we help?"
              />
            </label>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-sm transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Send Message
            </button>
          </form>

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

