# Design Specification: Town Tonic Website Redesign

**Date:** 2026-07-10  
**Project:** Town Tonic Demo Site Redesign  
**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide Icons  

---

## 1. Project Overview & Motivation

Town Tonic is a modern "eating house and bar" located in Addington, Christchurch, New Zealand. The restaurant bridges the gap between a casual daytime cafe and a refined evening bistro. Their cuisine focuses on fresh, seasonal, Canterbury-sourced produce, often incorporating elements of food science.

The goal of this redesign is to replace their old web presence with a high-conversion, premium, mobile-first website that answers visitors' primary questions in under 5 seconds, showcases their beautiful culinary creations, and makes table bookings effortless.

---

## 2. Visual Design & Style System (Premium Light Editorial)

The interface utilizes a clean, editorial light theme to highlight food photography.

### A. Color Palette (Tailwind CSS v4 Configuration)
*   `--background`: Pure white (`#FFFFFF`) — the canvas for food imagery.
*   `--background-soft`: Soft stone/warm alabaster (`#FAF9F6`) — for section block differences.
*   `--primary`: Forest Green (`#1E3F2E`) — deep, high-contrast, representing fresh local herbs/produce.
*   `--primary-hover`: Dark Forest Green (`#142B20`).
*   `--secondary`: Muted Antique Gold (`#B3925C`) — for stars, active reservation steps, and editorial details.
*   `--text-primary`: Deep Slate/Charcoal (`#0F172A`) — for ultra-crisp typography.
*   `--text-secondary`: Mid Slate (`#475569`) — for body text.
*   `--text-muted`: Light Slate (`#64748B`) — for secondary details.
*   `--border-warm`: Warm light-gray (`#E7E5E4`).

### B. Typography
*   **Headings (`h1`, `h2`, `h3`, brand text):** `Cormorant Garamond` (Google Font) — a sophisticated serif that evokes artisan craftsmanship and premium dining.
*   **Body & UI Text (`p`, `button`, `input`):** `Inter` or `Outfit` (Google Font) — a clean, modern sans-serif optimized for mobile legibility.

### C. Hover States & Transitions
*   All buttons: `transition-all duration-300 ease-in-out hover:shadow-md`.
*   Interactive cards: Soft scale transitions (`hover:scale-[1.01] hover:border-antique-gold`).

---

## 3. Site Structure & Page Content Map

### 1. Homepage (`app/page.tsx`)
*   **Hero Section (Above the Fold):**
    *   Full-width premium hero photograph of a signature Canterbury brunch.
    *   Restaurant Name: **Town Tonic** (large, elegant serif).
    *   Tagline: *"Locally Sourced, Seasonal Dining — Addington, Christchurch"*.
    *   **Dual CTAs:** Primary button `"Reserve a Table"` (links to `/reservations`), secondary button `"Explore Menu"` (links to `/menu`).
*   **Quick Info Banner (NAP-H):**
    *   Horizontal bar directly below the hero: Tappable Phone (`03 338 1150`), Address link (Shop 1/335 Lincoln Road), and Today's Hours.
*   **Minimalistic Gallery Section with Editorial Text:**
    *   A grid of 3-4 showcase images of signature dishes and atmosphere.
    *   Each image is accompanied by descriptive text outlining the culinary philosophy (e.g., "Sustainably caught blue cod, served with charred sea greens" or "Cold-brewed artisan coffee, roasted locally in Christchurch").
    *   Clicking an image launches a full-screen lightbox.
*   **Testimonial Spotlight:**
    *   A clean, single-review quote carousel highlighting positive dining experiences.
*   **Opening Hours Grid:**
    *   A detailed layout of weekly operating hours.

### 2. Menu Page (`app/menu/page.tsx`)
*   **Category Navigation:** Sticky tab system linking to `All-Day / Brunch`, `Dinner`, and `Drinks`.
*   **Dietary Filters:** Interactive filter bar (`All`, `Vegan`, `Vegetarian`, `Gluten-Free`, `Dairy-Free`).
*   **HTML Digital Menu:** Grid of dishes with:
    *   Name, price, detailed description, and allergen indicators (`[VG]`, `[GF]`).
    *   High-resolution thumbnail image.
    *   Clicking an item opens an details modal with a full-size photo, detailed ingredients, and pairing recommendations.

### 3. Reservations Page (`app/reservations/page.tsx`)
*   **Step-by-Step Custom Booking Widget:**
    *   *Step 1 (Details):* Guest count (1 to 10+), Date picker, Time picker (simulated slots).
    *   *Step 2 (Seating Area):* Interactive selection between "Main Dining Room", "Sun-lit Window Table", and "Heated Garden Bar".
    *   *Step 3 (Contact):* Full name, phone number, email address, and special notes (allergies, birthdays).
    *   *Step 4 (Confirmation):* Success screen with a generated booking reference, calendar invite buttons, and contact links.

### 4. About Page (`app/about/page.tsx`)
*   **Storytelling Sections:**
    *   *The Philosophy:* "Seasonal, Local, Scientific" — bridging food science and traditional Kiwi bistronomy.
    *   *Our Sourcing:* A visual mapping of local Christchurch and Canterbury suppliers (farms, fisheries, and roasters).

### 5. Contact Page (`app/contact/page.tsx`)
*   **NAP-H Details:** Phone, Address, Email, and Hours.
*   **Click-to-Action:** Click-to-call links and instant navigation links.
*   **Interactive Location Map:** Styled placeholder map card with street directions and nearby landmarks (e.g., Wolfbrook Arena, Christchurch Hospital).
*   **Parking Details:** Information on free street parking and nearby lots.

---

## 4. Mobile-First UX Strategy

Over 75% of restaurant traffic occurs on mobile devices. The following non-negotiable UX principles are baked directly into the design and implementation of this site:

*   **Tappable Call-to-Actions (NAP-H Links):** All telephone numbers on the site are structured as `tel:` links. The address is wrapped in a Google Maps direct routing URL. This allows users en route to call or open navigation with a single tap.
*   **Sticky Bottom Action Bar (Mobile Hero):** On mobile viewports, a sticky navigation bar is fixed to the bottom of the screen with a primary "Reserve" button and secondary "Menu" button, ensuring the primary conversion actions are accessible without scrolling or menu taps.
*   **HTML Native Responsive Menus:** The digital menus are HTML-based (no PDF downloads) and display as a single-column layout on mobile, scaling to multi-columns on desktop. Category selectors are swipeable horizontally on touch screens.
*   **Touch-Friendly Wizard Controls:** All form elements on the reservation wizard utilize large touch targets (minimum 48px height) with tap-to-select chips for date/time slots rather than traditional tiny dropdown selectors.
*   **Optimized Performance & Load Speed:** Next.js Image optimization (`next/image`) is strictly used with appropriate `sizes` attributes, ensuring mobile users on 3G/4G networks experience fast page load speeds (< 2s).

---

## 5. Technical Architecture

### Component Hierarchy
*   `app/layout.tsx`: Main HTML frame, global fonts, navbar, and footer.
*   `components/nav-bar.tsx`: Sticky navbar with mobile-responsive slide-out menu.
*   `components/footer.tsx`: Persistent footer displaying NAP-H information.
*   `components/booking-wizard.tsx`: Multi-step React form using TypeScript interfaces for validation.
*   `components/menu-card.tsx`: Reusable menu item card with image modals.

### Tailwind v4 Configuration (`app/globals.css`)
Tailwind CSS v4 will be set up using native CSS variables under the `@theme` directive, like so:
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
```

---

## 6. Image Assets
Please refer to `public/images` folder for the images to be used in the website.

