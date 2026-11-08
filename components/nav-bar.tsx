"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [barHidden, setBarHidden] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // On the homepage the menu is already on the page: scroll to it ourselves,
  // since following "/#menu" again from "/" doesn't scroll.
  const jumpToMenu = (e: React.MouseEvent) => {
    if (pathname !== "/") return;
    const el = document.getElementById("menu");
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", "/#menu");
  };

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setBarHidden(false));
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastScrollY.current;
        setScrolled(y > 8);
        if (Math.abs(dy) > 4) {
          // Show on scroll up, hide on scroll down. Always show near top.
          setBarHidden(dy > 0 && y > 120);
          lastScrollY.current = y;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        data-scrolled={scrolled ? "true" : "false"}
        className={`sticky top-0 z-[70] w-full transition-colors duration-300 ${
          scrolled ? "bg-bg-page/80 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Three columns: links | centred logo | action. The equal 1fr side
            columns keep the logo dead centre whatever the links' widths. */}
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center p-4">
          {/* Desktop: left links */}
          <nav aria-label="Main" className="hidden md:flex items-center gap-8 justify-self-start text-text-secondary text-3xl">
            <Link href="/#menu" onClick={jumpToMenu} data-active={pathname === "/menu" ? "true" : "false"} className="t-nav-link hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Menu</Link>
            <Link href="/contact" data-active={pathname === "/contact" ? "true" : "false"} className="t-nav-link hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Contact</Link>
          </nav>
          {/* Mobile: empty left column balances the hamburger so the logo stays centred */}
          <span aria-hidden="true" className="md:hidden" />

          <Link href="/" className="col-start-2 flex items-center justify-self-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm" aria-label="Town Tonic Home">
            <Logo className="h-16 md:h-24 w-auto" invert={false} />
          </Link>

          {/* Desktop: right action */}
          <Link href="/reservations" className="btn hidden md:inline-flex justify-self-end px-6 py-2 text-2xl normal-case tracking-normal">
            Reservations
          </Link>

          {/* Mobile hamburger (animates to X) */}
          <button
            data-open={isOpen ? "true" : "false"}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className={`group md:hidden justify-self-end p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm transition-colors text-text-primary`}
          >
            <span className="relative block h-6 w-6" aria-hidden="true">
              <span className="absolute inset-x-0.5 h-0.5 rounded-full bg-current top-[22%] -translate-y-1/2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[open=true]:top-1/2 group-data-[open=true]:rotate-45" />
              <span className="absolute inset-x-0.5 h-0.5 rounded-full bg-current top-1/2 -translate-y-1/2 transition-opacity duration-200 group-data-[open=true]:opacity-0" />
              <span className="absolute inset-x-0.5 h-0.5 rounded-full bg-current top-[78%] -translate-y-1/2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[open=true]:top-1/2 group-data-[open=true]:-rotate-45" />
            </span>
          </button>
        </div>

      </header>

      {/* Mobile menu overlay (animated) */}
      <div
        data-open={isOpen ? "true" : "false"}
        aria-hidden={!isOpen}
        className="group md:hidden fixed inset-0 z-[60] pointer-events-none data-[open=true]:pointer-events-auto"
      >
        {/* Scrim */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/60 opacity-0 group-data-[open=true]:opacity-100 transition-opacity duration-300 ease-out cursor-default"
        />
        {/* Panel */}
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-y-0 right-0 w-full max-w-sm bg-bg-page/90 backdrop-blur-xl border-l border-border shadow-2xl px-6 pt-28 pb-10 flex flex-col gap-6 text-text-primary text-3xl translate-x-full group-data-[open=true]:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          <div className="flex flex-col gap-5">
            <Link href="/#menu" onClick={(e) => { setIsOpen(false); jumpToMenu(e); }} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Menu</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Contact</Link>
          </div>
          <Link href="/reservations" onClick={() => setIsOpen(false)} className="btn mt-auto py-3 text-2xl normal-case tracking-normal">
            Reservations
          </Link>
        </nav>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div
        className="t-sticky-bar md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-page/95 backdrop-blur-sm border-t border-border p-3 flex gap-3 shadow-lg"
        data-hidden={barHidden ? "true" : "false"}
      >
        <Link
          href="/#menu"
          onClick={jumpToMenu}
          className="btn flex-1 h-11 px-3 text-sm"
        >
          View Menu
        </Link>
        <Link
          href="/reservations"
          className="btn flex-1 h-11 px-3 text-sm"
        >
          Reservations
        </Link>
      </div>
    </>
  );
}
