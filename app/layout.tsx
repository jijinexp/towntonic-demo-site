import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Town Tonic - Christchurch Restaurant & Cafe",
  description: "Premium locally-sourced Canterbury dining in Addington, Christchurch.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-white pb-20 md:pb-0">
        <NavBar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
