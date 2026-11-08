import { Metadata } from "next";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Location - Town Tonic Christchurch",
  description: "Hours, maps, and directions for finding Town Tonic in Addington, Christchurch.",
};

export default function ContactPage() {
  return (
    <div className="serif-ink py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-16">
        <div className="mb-3">
          <span className="block uppercase tracking-[0.2em] font-semibold text-sm">Find Us</span>
          <h1 className="title-font text-4xl md:text-6xl mt-2 text-text-primary">Contact Us</h1>
        </div>
        <p className="text-text-primary text-lg!">
          We are situated in the energetic heart of Addington, ready for your visit.
        </p>
      </div>

      <div className="mb-16">
        {/* CONTACT INFORMATION */}
        <div className="flex flex-col max-w-2xl mx-auto">
          <h2 className="title-font text-3xl md:text-4xl text-text-primary mb-6">Get in Touch</h2>
          
          <form
            action="mailto:info@towntonic.co.nz"
            method="post"
            encType="text/plain"
            className="space-y-4 mb-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-text-primary uppercase tracking-[0.14em]">
                Name
                <input
                  type="text"
                  name="name"
                  required
                  className="bg-bg-card border border-border rounded-sm px-3 py-2.5 text-lg font-normal normal-case tracking-normal text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  placeholder="Your name"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-text-primary uppercase tracking-[0.14em]">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="bg-bg-card border border-border rounded-sm px-3 py-2.5 text-lg font-normal normal-case tracking-normal text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-text-primary uppercase tracking-[0.14em]">
              Subject
              <input
                type="text"
                name="subject"
                className="bg-bg-card border border-border rounded-sm px-3 py-2.5 text-lg font-normal normal-case tracking-normal text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                placeholder="Reservation enquiry, private event, feedback…"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-text-primary uppercase tracking-[0.14em]">
              Message
              <textarea
                name="message"
                required
                rows={5}
                className="bg-bg-card border border-border rounded-sm px-3 py-2.5 text-lg font-normal normal-case tracking-normal text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold resize-y"
                placeholder="How can we help?"
              />
            </label>
            <button
              type="submit"
              className="btn text-base"
            >
              Send Message
            </button>
          </form>

          <div className="bg-bg-card border border-border rounded p-5 text-text-primary flex gap-3">
            <ShieldAlert className="text-gold flex-shrink-0" size={20} />
            <div>
              <h5 className="font-semibold text-xl text-text-primary mb-1">Parking Instructions</h5>
              <p className="leading-relaxed text-lg!">
                Complimentary visitor street parking is available along Lincoln Road and surrounding side roads. Off-street parking lots are located behind Shop 1.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

