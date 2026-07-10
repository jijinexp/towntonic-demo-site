"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <Link href="/" className="font-serif text-2xl font-bold tracking-wide text-primary">
            Town Tonic
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-sans font-medium text-text-secondary text-sm">
            <Link href="/menu" className="hover:text-gold transition-colors">Menu</Link>
            <Link href="/reservations" className="hover:text-gold transition-colors">Reservations</Link>
            <Link href="/about" className="hover:text-gold transition-colors">Our Story</Link>
            <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
            <Link href="/reservations" className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-sm transition-all hover:shadow-sm">
              Book Table
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-primary p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {isOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden border-t border-stone-100 bg-white p-4 flex flex-col gap-4 font-sans font-medium text-text-secondary text-base"
          >
            <Link href="/menu" onClick={() => setIsOpen(false)}>Menu</Link>
            <Link href="/reservations" onClick={() => setIsOpen(false)}>Reservations</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>Our Story</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href="/reservations" onClick={() => setIsOpen(false)} className="bg-primary text-white text-center py-3 rounded-sm font-semibold">
              Book Table
            </Link>
          </nav>
        )}
      </header>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-stone-200 p-3 flex gap-3 shadow-lg">
        <Link
          href="/menu"
          className="flex-1 border border-primary text-primary hover:bg-stone-50 text-center py-2.5 rounded-sm font-semibold transition-all text-sm flex items-center justify-center h-11"
        >
          View Menu
        </Link>
        <Link
          href="/reservations"
          className="flex-1 bg-primary text-white hover:bg-primary-hover text-center py-2.5 rounded-sm font-semibold transition-all text-sm flex items-center justify-center h-11"
        >
          Book Table
        </Link>
      </div>
    </>
  );
}
