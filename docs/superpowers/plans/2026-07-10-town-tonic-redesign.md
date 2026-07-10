# Town Tonic Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, mobile-first, multi-page Next.js website for Town Tonic in Christchurch, NZ using TypeScript and Tailwind CSS v4, featuring an interactive menu, step-by-step booking wizard, and light editorial visuals.

**Architecture:** App Router structure with client-side interactive state components (filters, booking wizard, lightbox) isolated from layout shells. A shared Jest testing environment will be configured for Component TDD.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Jest, React Testing Library, Lucide Icons, and Next/Image.

## Global Constraints
*   **Next.js App Router** structure is required.
*   **Tailwind CSS v4** configured natively in `globals.css` with `@import "tailwindcss";`.
*   **TypeScript** (`.tsx` and `.ts`) must be used for all code components and utilities.
*   **Light Theme styling:** White/Stone backgrounds, Forest Green primary accents (`#1E3F2E`), and Antique Gold secondary accents (`#B3925C`).
*   **NAP-H information** (Name, Address, Phone, Hours) must be present in the layout footer and page templates.
*   **Mobile-First UX** rules: Click-to-call `tel:` links, click-to-map addresses, and sticky bottom navigation on small screens.

---

### Task 1: Project Setup and Test Framework Configuration

**Files:**
- Create: `postcss.config.mjs`
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Create: `tsconfig.json` (modified from CLI)
- Modify: `package.json`
- Modify: `app/globals.css`
- Modify: `.gitignore`

**Interfaces:**
- Produces: Base project structure and running development server
- Produces: Test runner environment (`npm run test`)

- [ ] **Step 1: Write a dummy failing test to verify Jest runner**
  Create `__tests__/setup.test.ts`:
  ```typescript
  describe("Test Runner Setup", () => {
    it("should fail initially", () => {
      expect(true).toBe(false);
    });
  });
  ```

- [ ] **Step 2: Initialize Next.js project boilerplate**
  To handle conflicts with existing files in the workspace (like `.git` and `docs/`), scaffold Next.js in a subfolder and pull it up:
  Run:
  ```bash
  npx -y create-next-app@latest tmp-next-app --typescript --eslint --app --import-alias "@/*" --use-npm --yes
  mv tmp-next-app/* ./ 2>/dev/null || true
  mv tmp-next-app/.* ./ 2>/dev/null || true
  rm -rf tmp-next-app
  ```

- [ ] **Step 3: Install Tailwind v4 and Jest testing dependencies**
  Run:
  ```bash
  npm install tailwindcss @tailwindcss/postcss postcss lucide-react
  npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest @types/jest ts-node
  ```

- [ ] **Step 4: Create PostCSS configuration**
  Create `postcss.config.mjs`:
  ```javascript
  export default {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  };
  ```

- [ ] **Step 5: Create Jest Config files**
  Create `jest.config.ts`:
  ```typescript
  import type { Config } from 'jest';
  import nextJest from 'next/jest';

  const createJestConfig = nextJest({
    dir: './',
  });

  const config: Config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
    },
  };

  export default createJestConfig(config);
  ```

  Create `jest.setup.ts`:
  ```typescript
  import '@testing-library/jest-dom';
  ```

- [ ] **Step 6: Update package.json scripts**
  Modify: Add `"test": "jest"` and `"test:watch": "jest --watch"` under `"scripts"` in `package.json`.

- [ ] **Step 7: Run Jest test suite to check failure**
  Run: `npm run test`
  Expected: FAIL with `expect(true).toBe(false)`

- [ ] **Step 8: Make setup test pass and remove it**
  Modify `__tests__/setup.test.ts` to `expect(true).toBe(true)`.
  Run: `npm run test`
  Expected: PASS
  Delete `__tests__/setup.test.ts`.

- [ ] **Step 9: Configure Tailwind v4 styles**
  Replace `app/globals.css` with:
  ```css
  @import "tailwindcss";

  @theme {
    --color-primary: #1E3F2E;
    --color-primary-hover: #142B20;
    --color-gold: #B3925C;
    --color-gold-hover: #9E7F4B;
    --color-bg-soft: #FAF9F6;
    --font-serif: "Cormorant Garamond", serif;
    --font-sans: "Outfit", sans-serif;
  }

  body {
    background-color: #ffffff;
    color: #0F172A;
    font-family: var(--font-sans);
  }

  h1, h2, h3, h4, .font-serif {
    font-family: var(--font-serif);
  }
  ```

- [ ] **Step 10: Commit setup**
  Run:
  ```bash
  git add .
  git commit -m "chore: setup Next.js project with Tailwind CSS v4, TypeScript, and Jest"
  ```

---

### Task 2: Layout Shell, Navigation, and Footer (Responsive NAP-H)

**Files:**
- Create: `components/nav-bar.tsx`
- Create: `components/footer.tsx`
- Create: `types/index.ts`
- Modify: `app/layout.tsx`
- Create: `__tests__/layout.test.tsx`

**Interfaces:**
- Consumes: Tailwind v4 globals
- Produces: Sticky global navigation header and fixed NAP-H footer

- [ ] **Step 1: Write test for Navigation and Layout elements**
  Create `__tests__/layout.test.tsx`:
  ```typescript
  import { render, screen } from "@testing-library/react";
  import NavBar from "@/components/nav-bar";
  import Footer from "@/components/footer";

  describe("Global layout components", () => {
    it("renders navigation links correctly", () => {
      render(<NavBar />);
      expect(screen.getByText("Menu")).toBeInTheDocument();
      expect(screen.getByText("Reservations")).toBeInTheDocument();
    });

    it("renders footer containing NAP-H phone and address links", () => {
      render(<Footer />);
      expect(screen.getByText("03 338 1150")).toBeInTheDocument();
      expect(screen.getByText(/335 Lincoln Road/)).toBeInTheDocument();
    });
  });
  ```

- [ ] **Step 2: Verify test fails**
  Run: `npm run test`
  Expected: FAIL (Cannot find module `@/components/nav-bar`)

- [ ] **Step 3: Implement Navigation Component**
  Create `components/nav-bar.tsx`:
  ```typescript
  "use client";
  import { useState } from "react";
  import Link from "next/link";
  import { Menu, X } from "lucide-react";

  export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
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
          <button className="md:hidden text-primary p-1" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {isOpen && (
          <nav className="md:hidden border-t border-stone-100 bg-white p-4 flex flex-col gap-4 font-sans font-medium text-text-secondary text-base">
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
    );
  }
  ```

- [ ] **Step 4: Implement Footer Component (NAP-H)**
  Create `components/footer.tsx`:
  ```typescript
  import Link from "next/link";
  import { Phone, MapPin, Mail, Clock } from "lucide-react";

  export default function Footer() {
    return (
      <footer className="bg-stone-50 border-t border-stone-200 py-12 text-sm text-slate-600 font-sans">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-lg font-bold text-primary mb-4">Town Tonic</h3>
            <p className="leading-relaxed">
              Christchurch’s favorite eating house & bar. Bridges the gap between casual daytime cafe and premium evening bistro.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-4">Contact & Location</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <MapPin size={16} className="text-gold" />
                <a href="https://maps.google.com/?q=Shop+1/335+Lincoln+Road+Addington+Christchurch" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Shop 1/335 Lincoln Road, Addington, Christchurch
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-gold" />
                <a href="tel:033381150" className="hover:underline">03 338 1150</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-gold" />
                <a href="mailto:info@towntonic.co.nz" className="hover:underline">info@towntonic.co.nz</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-4">Opening Hours</h4>
            <ul className="space-y-2 flex flex-col">
              <li className="flex justify-between"><span>Mon:</span> <span>8:30 am – 2:00 pm</span></li>
              <li className="flex justify-between"><span>Tue – Fri:</span> <span>8:30 am – 2:00 pm, 5:30 pm – 8:00 pm</span></li>
              <li className="flex justify-between"><span>Sat:</span> <span>9:00 am – 2:00 pm, 5:30 pm – 8:30 pm</span></li>
              <li className="flex justify-between font-medium text-red-700"><span>Sun:</span> <span>Closed</span></li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
  ```

- [ ] **Step 5: Incorporate into layout**
  Replace `app/layout.tsx` to wrap pages in fonts, navigation, and footer:
  ```typescript
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
        <body className="antialiased min-h-screen flex flex-col bg-white">
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    );
  }
  ```

- [ ] **Step 6: Run test suite to verify passes**
  Run: `npm run test`
  Expected: PASS

- [ ] **Step 7: Commit changes**
  Run:
  ```bash
  git add components/nav-bar.tsx components/footer.tsx app/layout.tsx __tests__/layout.test.tsx
  git commit -m "feat: add global responsive layout shell with nav bar and footer"
  ```

---

### Task 3: Homepage Implementation & Image Asset Generation

**Files:**
- Create: `app/page.tsx`
- Create: `__tests__/homepage.test.tsx`
- Create: `public/images/hero_brunch.jpg` (generated)
- Create: `public/images/gallery_dinner.jpg` (generated)
- Create: `public/images/gallery_coffee.jpg` (generated)
- Create: `public/images/gallery_interior.jpg` (generated)

**Interfaces:**
- Consumes: Image assets, Link elements from Next.js
- Produces: Front page showcasing name, tagline, double CTA above-the-fold, click-to-call links, and inline gallery.

- [ ] **Step 1: Generate Visual Assets using generate_image**
  Generate `hero_brunch.jpg` (avocado on sourdough):
  Prompt: "Vibrant gourmet brunch plate with avocado on sourdough toast, poached eggs, and colorful microgreens on a white ceramic plate, captured in bright natural morning sunlight, restaurant table setting, close-up, high resolution, photorealistic"
  Saved to: `public/images/hero_brunch.jpg`

  Generate `gallery_dinner.jpg` (pan-seared blue cod):
  Prompt: "Exquisite fine dining fish dish, pan-seared blue cod fillet resting on yellow saffron emulsion, garnished with baby herbs and sea greens, white wide-rim porcelain bowl, overhead angle, elegant restaurant plating, high resolution, photorealistic"
  Saved to: `public/images/gallery_dinner.jpg`

  Generate `gallery_coffee.jpg` (latte art):
  Prompt: "Beautiful latte art in a rustic ceramic coffee cup, perfect microfoam, sat on a textured wooden table next to a small dish of seasonal berries, natural warm lighting, high resolution, photorealistic"
  Saved to: `public/images/gallery_coffee.jpg`

  Generate `gallery_interior.jpg` (cozy cafe interior):
  Prompt: "Minimalist, sunlit Scandinavian style cafe interior, light wooden tables, green leafy potted plants, large windows, cozy and clean atmosphere, empty seats, high resolution, photorealistic"
  Saved to: `public/images/gallery_interior.jpg`

- [ ] **Step 2: Write tests for Homepage above-the-fold elements and homepage gallery**
  Create `__tests__/homepage.test.tsx`:
  ```typescript
  import { render, screen } from "@testing-library/react";
  import Homepage from "@/app/page";

  describe("Homepage Content", () => {
    it("renders above-the-fold elements (name, tagline, 2 CTAs)", () => {
      render(<Homepage />);
      expect(screen.getByRole("heading", { name: "Town Tonic" })).toBeInTheDocument();
      expect(screen.getByText(/Locally Sourced, Seasonal Dining/)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Reserve a Table" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Explore Menu" })).toBeInTheDocument();
    });

    it("renders the minimalist gallery section with text description", () => {
      render(<Homepage />);
      expect(screen.getByText(/Artisan Coffee/)).toBeInTheDocument();
      expect(screen.getByText(/Canterbury Sourced Dinner/)).toBeInTheDocument();
    });
  });
  ```

- [ ] **Step 3: Verify test fails**
  Run: `npm run test`
  Expected: FAIL (cannot locate `@/app/page`)

- [ ] **Step 4: Implement Homepage and Gallery Lightbox**
  Replace `app/page.tsx` with:
  ```typescript
  "use client";
  import { useState } from "react";
  import Link from "next/link";
  import Image from "next/image";
  import { Phone, MapPin, Calendar, Clock, Star, ArrowRight, X } from "lucide-react";

  const galleryItems = [
    {
      src: "/images/hero_brunch.jpg",
      title: "Seasonal Brunch Craft",
      desc: "Local avocado on sourdough bread with farm eggs and organic Canterbury microgreens.",
    },
    {
      src: "/images/gallery_dinner.jpg",
      title: "Canterbury Sourced Dinner",
      desc: "Pan-seared blue cod on saffron butter emulsion with local sea vegetables.",
    },
    {
      src: "/images/gallery_coffee.jpg",
      title: "Artisan Coffee",
      desc: "Premium local roasted beans, pulled with precision and styled with clean latte art.",
    },
    {
      src: "/images/gallery_interior.jpg",
      title: "Warm Eating House Vibe",
      desc: "Sunlit spaces, cozy dining tables, and lush green plants in our Addington home.",
    },
  ];

  export default function Page() {
    const [activeImg, setActiveImg] = useState<number | null>(null);

    return (
      <div className="flex flex-col font-sans">
        {/* HERO SECTION */}
        <section className="relative h-[650px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src="/images/hero_brunch.jpg"
            alt="Town Tonic Gourmet Brunch"
            fill
            priority
            className="object-cover brightness-75"
            sizes="100vw"
          />
          <div className="relative z-10 text-center text-white px-4 max-w-3xl">
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-sm">
              Town Tonic
            </h1>
            <p className="text-lg md:text-2xl font-light mb-8 max-w-xl mx-auto leading-relaxed">
              Locally Sourced, Seasonal Dining — Addington, Christchurch
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/reservations"
                className="bg-primary hover:bg-primary-hover text-white text-base font-semibold px-8 py-3.5 rounded-sm transition-all shadow-sm w-full sm:w-auto"
              >
                Reserve a Table
              </Link>
              <Link
                href="/menu"
                className="border-2 border-white hover:bg-white hover:text-primary text-white text-base font-semibold px-8 py-3 rounded-sm transition-all w-full sm:w-auto"
              >
                Explore Menu
              </Link>
            </div>
          </div>
        </section>

        {/* MOBILE QUICK ACTION BAR / INFO BANNER */}
        <section className="bg-stone-50 border-b border-stone-200">
          <div className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            <a href="tel:033381150" className="py-2 sm:py-0 flex items-center justify-center gap-2 text-primary font-medium hover:underline">
              <Phone size={18} className="text-gold" />
              <span>Call Us: 03 338 1150</span>
            </a>
            <a href="https://maps.google.com/?q=Shop+1/335+Lincoln+Road+Addington+Christchurch" target="_blank" rel="noopener noreferrer" className="py-2 sm:py-0 flex items-center justify-center gap-2 text-primary font-medium hover:underline">
              <MapPin size={18} className="text-gold" />
              <span>Shop 1/335 Lincoln Road</span>
            </a>
            <div className="py-2 sm:py-0 flex items-center justify-center gap-2 text-slate-700 font-medium">
              <Clock size={18} className="text-gold" />
              <span>Open: 8:30 am – 2:00 pm today</span>
            </div>
          </div>
        </section>

        {/* MINIMALISTIC HOME GALLERY SECTION */}
        <section className="py-20 px-4 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-gold uppercase tracking-wider font-semibold text-xs">Visual Story</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-primary">Simple Craft, Local Passion</h2>
              <p className="text-slate-600 mt-4">
                We believe in serving real food made from Canterbury ingredients. Click on any item below to view details.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {galleryItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className="group cursor-pointer border border-stone-100 rounded-sm overflow-hidden bg-stone-50 transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative h-[300px] w-full overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-primary group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL carousal */}
        <section className="bg-stone-50 py-16 px-4 border-y border-stone-200">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center gap-1 text-gold mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="font-serif text-xl md:text-2xl italic leading-relaxed text-primary max-w-2xl mx-auto">
              &ldquo;The avocado toast was absolutely fresh and the atmosphere was lovely. A perfect blend of refined brunch and cozy cafe vibes.&rdquo;
            </p>
            <span className="block mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              — Sarah M., Christchurch Diner
            </span>
          </div>
        </section>

        {/* STICKY BOTTOM ACTION BAR FOR MOBILE */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 p-3 flex gap-3 shadow-lg">
          <Link href="/menu" className="flex-1 border border-primary text-primary text-center py-2.5 rounded-sm font-semibold text-sm">
            View Menu
          </Link>
          <Link href="/reservations" className="flex-1 bg-primary text-white text-center py-2.5 rounded-sm font-semibold text-sm">
            Book Table
          </Link>
        </div>

        {/* LIGHTBOX MODAL */}
        {activeImg !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={() => setActiveImg(null)}
              className="absolute top-4 right-4 text-white hover:text-stone-300"
              aria-label="Close Lightbox"
            >
              <X size={32} />
            </button>
            <div className="max-w-4xl w-full flex flex-col items-center">
              <div className="relative w-full h-[60vh]">
                <Image
                  src={galleryItems[activeImg].src}
                  alt={galleryItems[activeImg].title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <div className="text-center text-white mt-6 max-w-xl">
                <h3 className="font-serif text-2xl font-bold text-gold">{galleryItems[activeImg].title}</h3>
                <p className="text-stone-300 mt-2 text-sm">{galleryItems[activeImg].desc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  ```

- [ ] **Step 5: Run tests and verify they pass**
  Run: `npm run test`
  Expected: PASS

- [ ] **Step 6: Commit changes**
  Run:
  ```bash
  git add app/page.tsx __tests__/homepage.test.tsx public/images/
  git commit -m "feat: implement Homepage with double CTA, NAP-H info, and inline gallery lightbox"
  ```

---

### Task 4: Interactive Menu Component and Page

**Files:**
- Create: `components/menu-card.tsx`
- Create: `app/menu/page.tsx`
- Create: `__tests__/menu.test.tsx`

**Interfaces:**
- Consumes: HTML interactive filters (dietary requirements)
- Produces: Filterable digital menu matching brunch, dinner, and drinks items

- [ ] **Step 1: Write TDD test cases for Menu item filtering**
  Create `__tests__/menu.test.tsx`:
  ```typescript
  import { render, screen, fireEvent } from "@testing-library/react";
  import MenuPage from "@/app/menu/page";

  describe("Interactive Menu Filter", () => {
    it("renders menu categories and filter tags", () => {
      render(<MenuPage />);
      expect(screen.getByText("Brunch")).toBeInTheDocument();
      expect(screen.getByText("Dinner")).toBeInTheDocument();
      expect(screen.getByText("Gluten-Free")).toBeInTheDocument();
    });

    it("filters items by vegan tag correctly when clicked", async () => {
      render(<MenuPage />);
      // Click Vegan filter
      const veganFilter = screen.getByText("Vegan");
      fireEvent.click(veganFilter);
      
      // Saffron cod is dinner and NOT vegan, it should not show up
      expect(screen.queryByText("Saffron Blue Cod")).not.toBeInTheDocument();
      // Avocado sourdough is vegan, should be visible
      expect(screen.getByText("Avocado Sourdough")).toBeInTheDocument();
    });
  });
  ```

- [ ] **Step 2: Verify test fails**
  Run: `npm run test`
  Expected: FAIL (cannot locate `@/app/menu/page`)

- [ ] **Step 3: Implement Reusable MenuCard Component**
  Create `components/menu-card.tsx`:
  ```typescript
  "use client";
  import Image from "next/image";

  export interface MenuItem {
    id: string;
    name: string;
    price: number;
    description: string;
    category: "brunch" | "dinner" | "drinks";
    tags: ("Vegan" | "Vegetarian" | "Gluten-Free" | "Dairy-Free")[];
    image: string;
  }

  interface MenuCardProps {
    item: MenuItem;
    onSelect: (item: MenuItem) => void;
  }

  export default function MenuCard({ item, onSelect }: MenuCardProps) {
    return (
      <div
        onClick={() => onSelect(item)}
        className="flex flex-col border border-stone-200 rounded-sm bg-white overflow-hidden cursor-pointer hover:border-gold hover:shadow-sm transition-all duration-200"
      >
        <div className="relative h-[200px] w-full">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-5 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <h4 className="font-serif text-lg font-bold text-primary">{item.name}</h4>
              <span className="font-sans font-medium text-gold">${item.price.toFixed(2)}</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mb-4">{item.description}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((t, idx) => (
              <span key={idx} className="bg-stone-100 text-stone-600 text-[10px] font-semibold px-2 py-0.5 rounded-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 4: Implement Menu Page with interactive state**
  Create `app/menu/page.tsx`:
  ```typescript
  "use client";
  import { useState } from "react";
  import Image from "next/image";
  import { X } from "lucide-react";
  import MenuCard, { MenuItem } from "@/components/menu-card";

  const MENU_ITEMS: MenuItem[] = [
    {
      id: "b1",
      name: "Avocado Sourdough",
      price: 21.00,
      description: "Smashed avocado on toasted sourdough, heirloom tomatoes, pickled red onion, lemon oil, toasted pumpkin seeds, and local microgreens.",
      category: "brunch",
      tags: ["Vegan", "Vegetarian"],
      image: "/images/hero_brunch.jpg",
    },
    {
      id: "b2",
      name: "Blueberry Hotcake",
      price: 22.50,
      description: "Double stack maple hotcake, loaded with organic Canterbury blueberries, lemon mascarpone, toasted pecans, and local lavender honey.",
      category: "brunch",
      tags: ["Vegetarian"],
      image: "/images/gallery_coffee.jpg",
    },
    {
      id: "d1",
      name: "Saffron Blue Cod",
      price: 38.00,
      description: "Pan-seared wild blue cod fillet served over rich saffron potato cream, charred local samphire, caperberries, and cold-pressed olive oil.",
      category: "dinner",
      tags: ["Gluten-Free"],
      image: "/images/gallery_dinner.jpg",
    },
    {
      id: "d2",
      name: "Canterbury Lamb Roast",
      price: 42.00,
      description: "Slow-roasted grass-fed Canterbury lamb rump, served with rosemary parsnip puree, glazed baby carrots, and red wine jus.",
      category: "dinner",
      tags: ["Gluten-Free", "Dairy-Free"],
      image: "/images/gallery_dinner.jpg",
    },
    {
      id: "dr1",
      name: "Single Origin Batch Brew",
      price: 6.00,
      description: "Artisan filter brew sourced sustainably from direct-trade farms, rotated weekly, roasted in Christchurch.",
      category: "drinks",
      tags: ["Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"],
      image: "/images/gallery_coffee.jpg",
    },
    {
      id: "dr2",
      name: "Elderflower Tonic",
      price: 9.50,
      description: "Town Tonic house elixir: cold-pressed elderflower, Canterbury lemon balm, sparkling spring tonic.",
      category: "drinks",
      tags: ["Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"],
      image: "/images/gallery_coffee.jpg",
    },
  ];

  export default function MenuPage() {
    const [activeTab, setActiveTab] = useState<"brunch" | "dinner" | "drinks">("brunch");
    const [selectedTag, setSelectedTag] = useState<string>("All");
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    const filterTags = ["All", "Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"];

    const filteredItems = MENU_ITEMS.filter((item) => {
      const matchesCategory = item.category === activeTab;
      const matchesTag = selectedTag === "All" || item.tags.includes(selectedTag as any);
      return matchesCategory && matchesTag;
    });

    return (
      <div className="py-12 px-4 max-w-7xl mx-auto font-sans">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-3">Our Menu</h1>
          <p className="text-slate-600 text-sm">
            Canterbury ingredients prepared with care. We serve all-day brunch, refined dinners, and selected local drinks.
          </p>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex justify-center border-b border-stone-200 mb-8">
          {(["brunch", "dinner", "drinks"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedTag("All"); // Reset sub-filters on tab swap
              }}
              className={`px-8 py-3.5 text-base font-semibold capitalize border-b-2 transition-all ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab === "brunch" ? "Brunch" : tab}
            </button>
          ))}
        </div>

        {/* DIETARY FILTER CHIPS */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                selectedTag === tag
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-slate-600 border-stone-200 hover:bg-stone-50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* MENU CARD GRID */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} onSelect={setSelectedItem} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-stone-100 rounded bg-stone-50">
            <p className="text-slate-500 font-medium">No dishes match your selected filter.</p>
          </div>
        )}

        {/* DETAILS MODAL */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-black/55 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white rounded-sm w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-250">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-all"
                aria-label="Close Modal"
              >
                <X size={20} />
              </button>
              <div className="relative h-[300px] w-full">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="font-serif text-2xl font-bold text-primary">{selectedItem.name}</h3>
                  <span className="font-sans font-bold text-gold text-xl">${selectedItem.price.toFixed(2)}</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm mb-6">{selectedItem.description}</p>
                
                <div className="border-t border-stone-200 pt-6">
                  <h5 className="font-semibold text-xs text-primary uppercase tracking-wider mb-2.5">Dietary Profile</h5>
                  <div className="flex gap-2">
                    {selectedItem.tags.length > 0 ? (
                      selectedItem.tags.map((t, idx) => (
                        <span key={idx} className="bg-primary/5 text-primary text-xs font-semibold px-3 py-1 rounded-sm">
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Traditional Chef Recipe</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  ```

- [ ] **Step 5: Run tests and verify they pass**
  Run: `npm run test`
  Expected: PASS

- [ ] **Step 6: Commit changes**
  Run:
  ```bash
  git add components/menu-card.tsx app/menu/page.tsx __tests__/menu.test.tsx
  git commit -m "feat: implement digital HTML menu with category tabs, tag filters, and details modal"
  ```

---

### Task 5: Custom Embedded Reservation Form (Step-by-Step Wizard)

**Files:**
- Create: `components/booking-wizard.tsx`
- Create: `app/reservations/page.tsx`
- Create: `__tests__/booking.test.tsx`

**Interfaces:**
- Consumes: Form field states, validation errors
- Produces: Multi-step interactive flow writing booking records to client state

- [ ] **Step 1: Write TDD tests to cover validation and step-by-step progress**
  Create `__tests__/booking.test.tsx`:
  ```typescript
  import { render, screen, fireEvent, waitFor } from "@testing-library/react";
  import ReservationsPage from "@/app/reservations/page";

  describe("Custom Booking Wizard", () => {
    it("starts at Step 1 (Guests, Date, Time) and validates next action", async () => {
      render(<ReservationsPage />);
      expect(screen.getByText("Step 1 of 3: Details")).toBeInTheDocument();

      // Click "Next" without setting time slot
      const nextBtn = screen.getByRole("button", { name: "Next Step" });
      fireEvent.click(nextBtn);

      // Should show validation error
      expect(screen.getByText("Please select a dining time slot.")).toBeInTheDocument();
    });

    it("allows user to proceed to Step 2 upon selecting time slot", async () => {
      render(<ReservationsPage />);
      
      // Select 12:30 pm slot
      const timeSlot = screen.getByText("12:30 pm");
      fireEvent.click(timeSlot);

      // Click Next
      const nextBtn = screen.getByRole("button", { name: "Next Step" });
      fireEvent.click(nextBtn);

      // Now should show Step 2 Dining Area selections
      await waitFor(() => {
        expect(screen.getByText("Step 2 of 3: Seating")).toBeInTheDocument();
      });
    });
  });
  ```

- [ ] **Step 2: Verify test fails**
  Run: `npm run test`
  Expected: FAIL (cannot locate `@/app/reservations/page`)

- [ ] **Step 3: Implement step-by-step BookingWizard Component**
  Create `components/booking-wizard.tsx`:
  ```typescript
  "use client";
  import { useState } from "react";
  import { Calendar, User, Map, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

  const TIME_SLOTS = ["11:30 am", "12:00 pm", "12:30 pm", "1:00 pm", "5:30 pm", "6:00 pm", "6:30 pm", "7:00 pm", "7:30 pm"];
  const SEAT_ZONES = [
    { id: "main", name: "Main Dining Room", desc: "Cozy refined seating close to our kitchen showcase." },
    { id: "window", name: "Sunlit Window Seating", desc: "Settle next to our floor-to-ceiling glass fronts overlooking Addington." },
    { id: "garden", name: "Heated Garden Bar", desc: "Lush outdoor green courtyard setting with overhead heating." },
  ];

  export default function BookingWizard() {
    const [step, setStep] = useState(1);
    const [guests, setGuests] = useState(2);
    const [date, setDate] = useState("2026-07-15");
    const [time, setTime] = useState("");
    const [zone, setZone] = useState("main");
    
    // Contact Info
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [notes, setNotes] = useState("");
    
    // Errors
    const [error, setError] = useState("");
    const [bookingRef, setBookingRef] = useState("");

    const handleStep1Next = () => {
      if (!time) {
        setError("Please select a dining time slot.");
        return;
      }
      setError("");
      setStep(2);
    };

    const handleStep2Next = () => {
      setStep(3);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!name || !phone || !email) {
        setError("Please fill out all contact fields.");
        return;
      }
      setError("");
      // Generate mock ref
      const ref = "TT-" + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(ref);
      setStep(4);
    };

    return (
      <div className="w-full max-w-xl mx-auto border border-stone-200 rounded-sm bg-white p-8 shadow-sm">
        {step < 4 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                {step === 1 && "Step 1 of 3: Details"}
                {step === 2 && "Step 2 of 3: Seating"}
                {step === 3 && "Step 3 of 3: Contact"}
              </span>
              <span className="text-stone-400 text-xs font-semibold">{step}/3</span>
            </div>
            {/* PROGRESS BAR */}
            <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 text-xs font-semibold p-3 rounded-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        {/* STEP 1: GUESTS, DATE, TIME */}
        {step === 1 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Number of Guests</label>
              <div className="flex items-center gap-3">
                <User size={18} className="text-gold" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="flex-grow bg-stone-50 border border-stone-200 px-4 py-2.5 rounded text-sm text-slate-700 font-medium"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1} {i + 1 === 1 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Select Date</label>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-gold" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="flex-grow bg-stone-50 border border-stone-200 px-4 py-2.5 rounded text-sm text-slate-700 font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Preferred Time Slot</label>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setTime(slot);
                      setError("");
                    }}
                    className={`py-2 text-xs font-semibold rounded border transition-all ${
                      time === slot
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-stone-200 text-slate-600 hover:bg-stone-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStep1Next}
              className="mt-4 bg-primary hover:bg-primary-hover text-white py-3 rounded-sm font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>Next Step</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: SEATING ZONE */}
        {step === 2 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Choose Dining Zone</label>
              <div className="flex flex-col gap-3">
                {SEAT_ZONES.map((sz) => (
                  <div
                    key={sz.id}
                    onClick={() => setZone(sz.id)}
                    className={`p-4 border rounded cursor-pointer transition-all ${
                      zone === sz.id
                        ? "border-gold bg-stone-50/50"
                        : "border-stone-200 bg-white hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold text-sm text-primary">{sz.name}</h4>
                      <input
                        type="radio"
                        checked={zone === sz.id}
                        onChange={() => setZone(sz.id)}
                        className="accent-primary"
                      />
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{sz.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-stone-200 text-slate-600 hover:bg-stone-50 py-3 rounded-sm font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button
                onClick={handleStep2Next}
                className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 rounded-sm font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <span>Next Step</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT INFORMATION */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 animate-in fade-in duration-200">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded text-sm text-slate-700"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 021 234 567"
                className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded text-sm text-slate-700"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john@example.com"
                className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded text-sm text-slate-700"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Special Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Allergies, high chair requests, birthdays..."
                className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded text-sm text-slate-700 h-24 resize-none"
              />
            </div>

            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 border border-stone-200 text-slate-600 hover:bg-stone-50 py-3 rounded-sm font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 rounded-sm font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Confirm Booking</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: SUCCESS SCREEN */}
        {step === 4 && (
          <div className="text-center py-6 animate-in zoom-in-95 duration-300">
            <div className="flex justify-center mb-6">
              <CheckCircle size={64} className="text-gold" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-primary mb-2">Table Reserved</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
              Booking Ref: <span className="text-gold font-bold">{bookingRef}</span>
            </p>
            
            <div className="bg-stone-50 border border-stone-200 rounded-sm p-5 text-left mb-8 text-sm text-slate-600 flex flex-col gap-3 font-sans">
              <div className="flex justify-between border-b border-stone-150 pb-2">
                <span className="font-semibold text-primary">Guest Count:</span>
                <span>{guests} {guests === 1 ? "person" : "people"}</span>
              </div>
              <div className="flex justify-between border-b border-stone-150 pb-2">
                <span className="font-semibold text-primary">Date & Time:</span>
                <span>{date} at {time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-primary">Dining Zone:</span>
                <span className="capitalize">{zone} Area</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mb-8 leading-relaxed max-w-sm mx-auto">
              A confirmation email has been dispatched to <span className="font-semibold">{email}</span>. If you need to make changes, please dial <a href="tel:033381150" className="text-primary hover:underline font-semibold">03 338 1150</a>.
            </p>

            <button
              onClick={() => {
                setStep(1);
                setTime("");
                setName("");
                setPhone("");
                setEmail("");
                setNotes("");
              }}
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-6 py-3 rounded-sm transition-all"
            >
              Book Another Table
            </button>
          </div>
        )}
      </div>
    );
  }
  ```

- [ ] **Step 4: Implement Reservations Page Wrapper**
  Create `app/reservations/page.tsx`:
  ```typescript
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
  ```

- [ ] **Step 5: Run tests and verify they pass**
  Run: `npm run test`
  Expected: PASS

- [ ] **Step 6: Commit changes**
  Run:
  ```bash
  git add components/booking-wizard.tsx app/reservations/page.tsx __tests__/booking.test.tsx
  git commit -m "feat: implement custom step-by-step embedded booking wizard"
  ```

---

### Task 6: Auxiliary Pages (About, Contact, Gallery Showcase)

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/contact/page.tsx`
- Create: `app/gallery/page.tsx`
- Create: `__tests__/auxiliary.test.tsx`
- Create: `public/images/about_suppliers.jpg` (generated)

**Interfaces:**
- Consumes: Static details, layout structures
- Produces: Secondary information pages representing supplier story, parking, maps, and lightboxes.

- [ ] **Step 1: Generate Visual Asset for Sourcing Page**
  Generate `about_suppliers.jpg` (Canterbury fields):
  Prompt: "Beautiful overhead shot of organic Canterbury farmland fields with rows of fresh greens, natural sunlight, organic farming Christchurch, high resolution, photorealistic"
  Saved to: `public/images/about_suppliers.jpg`

- [ ] **Step 2: Write tests for auxiliary page availability**
  Create `__tests__/auxiliary.test.tsx`:
  ```typescript
  import { render, screen } from "@testing-library/react";
  import AboutPage from "@/app/about/page";
  import ContactPage from "@/app/contact/page";
  import GalleryPage from "@/app/gallery/page";

  describe("Auxiliary Pages Content", () => {
    it("renders About page contents", () => {
      render(<AboutPage />);
      expect(screen.getByRole("heading", { name: "Our Story" })).toBeInTheDocument();
      expect(screen.getByText(/Canterbury suppliers/i)).toBeInTheDocument();
    });

    it("renders Contact page details", () => {
      render(<ContactPage />);
      expect(screen.getByRole("heading", { name: "Contact Us" })).toBeInTheDocument();
      expect(screen.getByText("Lincoln Road, Addington")).toBeInTheDocument();
    });

    it("renders Gallery showcase elements", () => {
      render(<GalleryPage />);
      expect(screen.getByRole("heading", { name: "Gallery" })).toBeInTheDocument();
      expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
    });
  });
  ```

- [ ] **Step 3: Verify test fails**
  Run: `npm run test`
  Expected: FAIL (cannot locate pages)

- [ ] **Step 4: Implement About Page**
  Create `app/about/page.tsx`:
  ```typescript
  import Image from "next/image";
  import Link from "next/link";

  export const metadata = {
    title: "Our Story - Town Tonic Christchurch",
    description: "Learn about the local sourcing and bistronomy concept behind Town Tonic.",
  };

  export default function AboutPage() {
    return (
      <div className="py-16 px-4 max-w-5xl mx-auto font-sans">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-gold uppercase tracking-wider font-semibold text-xs">Our Origins</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mt-2 mb-3">Our Story</h1>
          <p className="text-slate-600 text-sm">
            Bridging organic Canterbury farming and modern culinary craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative h-[400px] w-full border border-stone-200 rounded overflow-hidden">
            <Image
              src="/images/about_suppliers.jpg"
              alt="Canterbury Fields Sourcing"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">The Bistronomy Philosophy</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm">
              Town Tonic began with a singular focus: celebrating local Canterbury food creators. We work directly with Christchurch nurseries, Canterbury farms, and local boat harbors to source fresh fish, organic vegetables, and small-batch ingredients.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm">
              Our kitchen bridges the gap between casual eating and high-level cooking science. Every brunch plate, dinner course, or elixir is designed to showcase the purest flavors of the season.
            </p>
            <Link href="/menu" className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-sm text-sm transition-all shadow-sm">
              Explore Our Dishes
            </Link>
          </div>
        </div>

        <div className="border-t border-stone-200 pt-16">
          <h3 className="font-serif text-3xl font-bold text-center text-primary mb-10">Our Canterbury Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-slate-500 font-medium text-sm">
            <div className="bg-stone-50 p-6 border border-stone-100 rounded-sm">
              <h4 className="text-primary font-bold mb-1">Addington Coffee Roasters</h4>
              <p className="text-xs text-slate-400">Weekly Single-Origin beans</p>
            </div>
            <div className="bg-stone-50 p-6 border border-stone-100 rounded-sm">
              <h4 className="text-primary font-bold mb-1">Akaroa Harbor Harvests</h4>
              <p className="text-xs text-slate-400">Sustainably caught blue cod</p>
            </div>
            <div className="bg-stone-50 p-6 border border-stone-100 rounded-sm">
              <h4 className="text-primary font-bold mb-1">Canterbury organic Farms</h4>
              <p className="text-xs text-slate-400">Fresh heirloom tomatoes & herbs</p>
            </div>
            <div className="bg-stone-50 p-6 border border-stone-100 rounded-sm">
              <h4 className="text-primary font-bold mb-1">Lincoln Orchard Guild</h4>
              <p className="text-xs text-slate-400">Seasonal apples, pears & honey</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 5: Implement Contact Page**
  Create `app/contact/page.tsx`:
  ```typescript
  import { Phone, MapPin, Mail, Clock, ShieldAlert } from "lucide-react";

  export const metadata = {
    title: "Contact & Location - Town Tonic Christchurch",
    description: "Hours, maps, and directions for finding Town Tonic in Addington, Christchurch.",
  };

  export default function ContactPage() {
    return (
      <div className="py-16 px-4 max-w-6xl mx-auto font-sans">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-gold uppercase tracking-wider font-semibold text-xs">Find Us</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mt-2 mb-3">Contact Us</h1>
          <p className="text-slate-600 text-sm">
            We are situated in the energetic heart of Addington, ready for your visit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* MAP PLACEHOLDER */}
          <div className="bg-stone-100 border border-stone-200 rounded-sm h-[400px] flex flex-col justify-center items-center text-center p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-stone-100 flex flex-col justify-center items-center">
              <MapPin size={48} className="text-gold mb-4" />
              <h3 className="font-serif text-xl font-bold text-primary mb-2">Lincoln Road, Addington</h3>
              <p className="text-slate-500 text-xs mb-6 max-w-xs">
                Shop 1/335 Lincoln Road, Addington, Christchurch 8024
              </p>
              <a
                href="https://maps.google.com/?q=Shop+1/335+Lincoln+Road+Addington+Christchurch"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-6 py-3 rounded-sm transition-all shadow-sm"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* CONTACT INFORMATION */}
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">Get in Touch</h2>
            
            <div className="space-y-6 text-sm text-slate-600 mb-8">
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
                  <a href="tel:033381150" className="hover:underline text-primary font-medium">03 338 1150</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-gold mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-primary mb-1">Email</h4>
                  <a href="mailto:info@towntonic.co.nz" className="hover:underline text-primary font-medium">info@towntonic.co.nz</a>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded p-5 text-xs text-slate-500 flex gap-3">
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
  ```

- [ ] **Step 6: Implement Gallery Page**
  Create `app/gallery/page.tsx`:
  ```typescript
  "use client";
  import { useState } from "react";
  import Image from "next/image";
  import { X } from "lucide-react";

  const IMAGES = [
    { src: "/images/hero_brunch.jpg", title: "Avocado Sourdough Toast" },
    { src: "/images/gallery_dinner.jpg", title: "Canterbury Pan-seared Cod" },
    { src: "/images/gallery_coffee.jpg", title: "Artisan Latte Pour" },
    { src: "/images/gallery_interior.jpg", title: "Addington Dining Room Vibe" },
    { src: "/images/about_suppliers.jpg", title: "Canterbury Farm Fields" },
    { src: "/images/hero_brunch.jpg", title: "Signature Table Plating" },
  ];

  export default function GalleryPage() {
    const [selectedImg, setSelectedImg] = useState<number | null>(null);

    return (
      <div className="py-16 px-4 max-w-7xl mx-auto font-sans">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-gold uppercase tracking-wider font-semibold text-xs">Visual Showcase</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mt-2 mb-3">Gallery</h1>
          <p className="text-slate-600 text-sm">
            Explore our crafted dishes, locally roasted coffee, and the relaxed dining ambiance of our space.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {IMAGES.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImg(idx)}
              className="relative h-[250px] border border-stone-200 rounded overflow-hidden cursor-pointer group bg-stone-100 shadow-xs"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-semibold tracking-wide font-sans">{img.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX MODAL */}
        {selectedImg !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 text-white hover:text-stone-300"
              aria-label="Close Lightbox"
            >
              <X size={32} />
            </button>
            <div className="max-w-4xl w-full flex flex-col items-center">
              <div className="relative w-full h-[65vh]">
                <Image
                  src={IMAGES[selectedImg].src}
                  alt={IMAGES[selectedImg].title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <h3 className="font-serif text-xl font-bold text-gold mt-6 text-center">{IMAGES[selectedImg].title}</h3>
            </div>
          </div>
        )}
      </div>
    );
  }
  ```

- [ ] **Step 7: Run tests and verify they pass**
  Run: `npm run test`
  Expected: PASS

- [ ] **Step 8: Verify build compilation**
  Run: `npm run build`
  Expected: Successful compilation without TypeScript or Next.js build errors.

- [ ] **Step 9: Commit changes**
  Run:
  ```bash
  git add app/about/page.tsx app/contact/page.tsx app/gallery/page.tsx __tests__/auxiliary.test.tsx public/images/about_suppliers.jpg
  git commit -m "feat: implement Story, Contact, and Gallery pages with testing, matching Canterbury identity"
  ```
