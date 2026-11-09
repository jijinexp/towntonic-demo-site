"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";

export default function NavBar() {
  const [barHidden, setBarHidden] = useState(true);
  const [scrolled, setScrolled] = useState(false);
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
    // Also pick up where the page already is (a reload part-way down fires no scroll event).
    const rafId = requestAnimationFrame(() => {
      setBarHidden(false);
      setScrolled(window.scrollY > 8);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the homepage the nav sits clear over the full-bleed hero until you start scrolling.
  const onHero = pathname === "/" && !scrolled;

  return (
    <>
      <header
        data-scrolled={scrolled ? "true" : "false"}
        data-over-hero={onHero ? "true" : "false"}
        className={`sticky top-0 z-[70] w-full transition-[background-color,border-color,box-shadow] duration-300 ${
          onHero
            ? "bg-transparent border-b border-transparent"
            : scrolled
              ? "bg-bg-page/80 backdrop-blur-xl border-b border-border shadow-sm"
              : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Three columns whose equal 1fr sides keep the logo dead centre.
            Desktop: Menu + Contact | logo | Reservations.
            Phones: (empty) | logo | Contact; Menu and Reservations live in the
            bottom bar instead. */}
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center p-4">
          <nav
            aria-label="Main"
            className="col-start-3 row-start-1 flex items-center gap-8 justify-self-end text-text-secondary text-xl md:col-start-1 md:justify-self-start md:text-3xl"
          >
            <Link href="/#menu" onClick={jumpToMenu} data-active={pathname === "/menu" ? "true" : "false"} className="hidden md:inline t-nav-link hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Menu</Link>
            <Link href="/contact" data-active={pathname === "/contact" ? "true" : "false"} className="t-nav-link hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Contact</Link>
          </nav>
          <Link href="/" className="col-start-2 row-start-1 flex items-center justify-self-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm" aria-label="Town Tonic Home">
            <Logo className="h-12 md:h-24 w-auto transition-[filter] duration-300" invert={onHero} />
          </Link>

          {/* Desktop: right action */}
          <Link href="/reservations" className={`btn ${onHero ? "btn-inverse" : ""} hidden md:inline-flex col-start-3 row-start-1 justify-self-end px-6 py-2 text-2xl normal-case tracking-normal`}>
            Reservations
          </Link>
        </div>
      </header>

      {/* Mobile bottom bar: always on screen, with the way to the menu and to book */}
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
