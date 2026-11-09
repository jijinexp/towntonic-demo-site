import type { Metadata } from "next";
import { Caudex, Cormorant_Garamond, Marcellus, Outfit, Lilita_One } from "next/font/google";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

// Section titles, set in capitals: a free stand-in for El Nacional's Bagerich.
const marcellus = Marcellus({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["400"],
});

// Dish names on the menu pages, after the Wix "Aperitivo" template.
const caudex = Caudex({
  subsets: ["latin"],
  variable: "--font-dish",
  weight: ["400"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const lilita = Lilita_One({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Town Tonic - Christchurch Restaurant & Cafe",
  description: "Premium locally-sourced Canterbury dining in Addington, Christchurch.",
  // This is a demo, not the restaurant's real site: keep it out of search results.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${marcellus.variable} ${caudex.variable} ${outfit.variable} ${lilita.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-bg-page pb-20 md:pb-0">
        <NavBar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
