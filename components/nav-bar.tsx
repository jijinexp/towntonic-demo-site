"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-bg-page/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <Link href="/" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm" aria-label="Town Tonic Home">
            <Image
              src="/images/logo.png"
              alt="Town Tonic"
              width={150}
              height={40}
              className="h-10 w-auto object-contain"
              style={{ width: "auto" }}
              priority
            />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-sans font-medium text-text-secondary text-sm">
            <Link href="/menu" className="t-nav-link hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Menu</Link>
            <Link href="/reservations" className="t-nav-link hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Reservations</Link>
            <Link href="/about" className="t-nav-link hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Our Story</Link>
            <Link href="/contact" className="t-nav-link hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Contact</Link>
            <Link href="/reservations" className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-sm t-hover-lift hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              Book Table
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-primary p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
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
            className="md:hidden border-t border-border bg-bg-page p-4 flex flex-col gap-4 font-sans font-medium text-text-secondary text-base"
          >
            <Link href="/menu" onClick={() => setIsOpen(false)} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Menu</Link>
            <Link href="/reservations" onClick={() => setIsOpen(false)} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Reservations</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Our Story</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Contact</Link>
            <Link href="/reservations" onClick={() => setIsOpen(false)} className="bg-primary text-white text-center py-3 rounded-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              Book Table
            </Link>
          </nav>
        )}
      </header>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-page/95 border-t border-border p-3 flex gap-3 shadow-lg">
        <Link
          href="/menu"
          className="flex-1 border border-primary text-primary hover:bg-bg-elevated text-center py-2.5 rounded-sm font-semibold transition-all text-sm flex items-center justify-center h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          View Menu
        </Link>
        <Link
          href="/reservations"
          className="flex-1 bg-primary text-white hover:bg-primary-hover text-center py-2.5 rounded-sm font-semibold transition-all text-sm flex items-center justify-center h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          Book Table
        </Link>
      </div>
    </>
  );
}
