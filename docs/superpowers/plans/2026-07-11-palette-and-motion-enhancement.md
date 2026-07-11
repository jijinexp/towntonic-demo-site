# Palette & Motion Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the Town Tonic site with a sage/herb accent, a shared motion token system, scroll-reveal polish, a signature sage-sprig moment on section headings, and cross-page route transitions — per `docs/superpowers/specs/2026-07-11-palette-and-motion-enhancement-design.md`.

**Architecture:** All palette + motion tokens live in `app/globals.css` as CSS custom properties under Tailwind v4's `@theme` and `:root`. Shared behavior (scroll reveal, sprig heading) ships as small React client components under `components/`. Route transitions use Next.js 16 App Router `template.tsx` with the View Transitions API + opacity fallback. No new npm dependencies.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript, Jest + React Testing Library, `lucide-react`.

## Global Constraints

- **Dark-only site.** No light mode variants. All text on filled surfaces uses light text: parchment `#E8E4DF` or the accent's light end.
- **No new npm dependencies.** All motion is CSS or native browser APIs (`IntersectionObserver`, `View Transitions API`).
- **`prefers-reduced-motion: reduce` must be honored** on every animation. Signature sprig → instant fade. Scroll reveals → instant. Hover state changes stay (they are state, not motion).
- **No image scale on hover.** Anywhere. No card lift on hover either — border/shadow only.
- **No parallax, no cursor-follow, no auto-playing video.**
- **Text is legible from frame 1** of any reveal: opacity animates `0.4 → 1`, `translateY ≤ 8px`.
- **Gold vs. Sage roles are exclusive.** Gold = warmth signals (CTAs, stars, eyebrows, prices, focus rings). Sage = fresh/local/produce signals (Local/Seasonal chips, ingredient tags, sprig, "Open now"). Never on the same interactive element.
- **All new tokens must meet WCAG AA.** Sage on bg-page ≥ 7.6:1, sage on sage-soft ≥ 6.2:1, text-soft on bg-card ≥ 7.4:1.
- **Contrast token values are exact** (spec §2.5): change one, revalidate.
- **Existing motion tokens stay untouched** (`--modal-*`, `--check-*` in `globals.css`). New tokens are additive.
- **Next.js 16 conventions.** This is not the Next.js you know — read `node_modules/next/dist/docs/` for any App Router API before using it.

---

## File Structure

**Created:**
- `components/reveal.tsx` — shared scroll-reveal wrapper using `IntersectionObserver`.
- `components/sprig-heading.tsx` — shared section-heading component (eyebrow + h2 + sage sprig SVG).
- `app/template.tsx` — route-change transition wrapper.
- `docs/superpowers/verify/animations.md` — manual verification checklist.
- `__tests__/reveal.test.tsx`
- `__tests__/sprig-heading.test.tsx`

**Modified:**
- `app/globals.css` — palette tokens (Task 1), motion tokens + global reduced-motion rule + button/nav utility classes (Task 2).
- `components/nav-bar.tsx` — scaling underline, mobile sticky bar slide-up + scroll show/hide (Task 3, Task 6).
- `app/page.tsx` — hero mount reveal, "Explore Menu" sage hover, "Open now" chip on info banner, section headings become `SprigHeading` (Tasks 3, 4, 5).
- `app/menu/page.tsx`, `app/about/page.tsx`, `app/gallery/page.tsx`, `app/contact/page.tsx`, `app/reservations/page.tsx` — section headings become `SprigHeading` (Task 5).
- `components/menu-explorer.tsx` — sage-soft filter chips, filter-result stagger reveal (Task 4).
- `components/menu-card.tsx` — sage `Local`/`Seasonal` tag chip, border-strong on hover (Tasks 3, 4).
- `components/menu-card.tsx` MenuItem type — add optional `sourceTags: ("local" | "seasonal")[]` (Task 4).
- `components/homepage-gallery.tsx` — grid stagger via `Reveal` (Task 3).
- `components/booking-wizard.tsx` — step-to-step horizontal crossfade, gold step indicators (Task 6).
- `components/footer.tsx` — gold eyebrow labels, border-strong dividers (Task 3).

---

## Task 1: Palette foundation

**Files:**
- Modify: `app/globals.css` (`@theme` block)

**Interfaces:**
- Produces: CSS custom properties `--color-sage`, `--color-sage-hover`, `--color-sage-soft`, `--color-text-soft`, `--color-border-strong`. Adjusts `--color-bg-elevated`. Consumed by every later task via Tailwind class names (`bg-sage-soft`, `text-sage`, `border-border-strong`, `text-text-soft`, etc.) which Tailwind v4 derives automatically from the `@theme` custom properties.

- [ ] **Step 1: Verify current baseline works**

Run: `npm run dev` (in background), open `http://localhost:3000` in a browser, confirm homepage renders as expected. Stop the dev server.

- [ ] **Step 2: Edit `app/globals.css` `@theme` block**

Replace the existing `@theme { ... }` block with (only the additions and one adjustment are new — Steel Blue, Gold, existing bg tokens are kept verbatim):

```css
@theme {
  --color-primary: #3E5167;
  --color-primary-hover: #2B3847;
  --color-gold: #BD8545;
  --color-gold-hover: #9C6D32;
  --color-sage: #8FA47A;
  --color-sage-hover: #A3B78F;
  --color-sage-soft: #3A4636;
  --color-bg-soft: #252830;
  --color-bg-page: #1C1F26;
  --color-bg-card: #252830;
  --color-bg-elevated: #31343E;
  --color-text-primary: #E8E4DF;
  --color-text-secondary: #9CA3AF;
  --color-text-soft: #B8B0A6;
  --color-text-muted: #6B7280;
  --color-border: #2D3039;
  --color-border-strong: #3A3E48;
  --font-serif: "Cormorant Garamond", serif;
  --font-sans: "Outfit", sans-serif;
}
```

- [ ] **Step 3: Restart dev server and smoke-check**

Run: `npm run dev`, open the homepage, menu, and reservations pages. Confirm nothing has visibly broken. The site should look ~identical to before (elevated hover surface is one shade lighter — subtle). Stop the dev server.

- [ ] **Step 4: Run existing test suite and lint**

Run: `npm run test && npm run lint`
Expected: all tests pass, no new lint errors.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "feat(palette): add sage/herb accent and depth tokens

Introduces --color-sage, --color-sage-hover, --color-sage-soft for the
fresh-produce accent, plus --color-text-soft and --color-border-strong
for tactile depth. Nudges --color-bg-elevated to #31343E so card hover
reads more clearly. No component changes yet — foundations only.

Spec: docs/superpowers/specs/2026-07-11-palette-and-motion-enhancement-design.md §2"
```

---

## Task 2: Motion tokens, global reduced-motion, shared Reveal component

**Files:**
- Modify: `app/globals.css` (`:root` block — add motion tokens; new `@media (prefers-reduced-motion: reduce)` rule at end of file)
- Create: `components/reveal.tsx`
- Create: `__tests__/reveal.test.tsx`

**Interfaces:**
- Produces (CSS): `--dur-fast: 120ms`, `--dur-base: 220ms`, `--dur-slow: 360ms`, `--dur-signature: 900ms`; `--ease-out`, `--ease-in-out`, `--ease-spring`.
- Produces (React):
  ```ts
  export interface RevealProps {
    children: React.ReactNode;
    /** ms delay before starting reveal — used for stagger. Default 0. */
    delayMs?: number;
    /** IntersectionObserver threshold. Default 0.15. */
    threshold?: number;
    /** Extra classes on the outer wrapper element. */
    className?: string;
    /** Element tag. Default "div". */
    as?: "div" | "section" | "li" | "article";
  }
  export default function Reveal(props: RevealProps): JSX.Element;
  ```
  Behavior: initial state `opacity: 0.4; translateY(8px)`. On first intersection at `threshold`, transitions to `opacity: 1; translateY(0)` over `--dur-slow` with `--ease-out`, after `delayMs`. Sets `data-revealed="true"` when done. Runs once. Under `prefers-reduced-motion: reduce`, applies final state immediately with no transition.

- [ ] **Step 1: Add motion tokens to `app/globals.css`**

In `app/globals.css`, locate the existing `:root { ... }` block (starts with `/* UI Skills: transitions-dev tokens */`). Add these lines at the **top** of that block, before `--modal-open-dur`:

```css
  /* Motion ladder — durations */
  --dur-fast: 120ms;
  --dur-base: 220ms;
  --dur-slow: 360ms;
  --dur-signature: 900ms;

  /* Motion easings */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.35, 0.64, 1);

```

- [ ] **Step 2: Append the global reduced-motion rule to `app/globals.css`**

Append at the very end of `app/globals.css`:

```css
/* Global reduced-motion guard. Per-component overrides may still opt out. */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Write the failing test for `Reveal`**

Create `__tests__/reveal.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import Reveal from "@/components/reveal";

describe("Reveal", () => {
  const observers: Array<{
    cb: IntersectionObserverCallback;
    observe: jest.Mock;
    disconnect: jest.Mock;
  }> = [];

  beforeEach(() => {
    observers.length = 0;
    class MockIO {
      cb: IntersectionObserverCallback;
      observe = jest.fn();
      disconnect = jest.fn();
      unobserve = jest.fn();
      takeRecords = () => [];
      root = null;
      rootMargin = "";
      thresholds = [];
      constructor(cb: IntersectionObserverCallback) {
        this.cb = cb;
        observers.push({ cb, observe: this.observe, disconnect: this.disconnect });
      }
    }
    // @ts-expect-error test polyfill
    global.IntersectionObserver = MockIO;
  });

  it("starts hidden and reveals when intersecting", () => {
    render(<Reveal data-testid="wrap">hello</Reveal>);
    const el = screen.getByTestId("wrap");
    expect(el).toHaveAttribute("data-revealed", "false");

    // Simulate intersection.
    const entry = { isIntersecting: true, target: el } as IntersectionObserverEntry;
    observers[0].cb([entry], {} as IntersectionObserver);

    expect(el).toHaveAttribute("data-revealed", "true");
  });

  it("renders as the requested element", () => {
    render(<Reveal as="section" data-testid="wrap">x</Reveal>);
    expect(screen.getByTestId("wrap").tagName).toBe("SECTION");
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npm run test -- reveal.test.tsx`
Expected: FAIL — module `@/components/reveal` not found.

- [ ] **Step 5: Create `components/reveal.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  delayMs?: number;
  threshold?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  ["data-testid"]?: string;
}

export default function Reveal({
  children,
  delayMs = 0,
  threshold = 0.15,
  className = "",
  as = "div",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const trigger = () => setRevealed(true);
            if (delayMs > 0) window.setTimeout(trigger, delayMs);
            else trigger();
            io.disconnect();
            break;
          }
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delayMs, threshold, revealed]);

  const Tag = as as ElementType;

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      data-revealed={revealed ? "true" : "false"}
      className={`t-reveal ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 6: Add the `t-reveal` utility to `app/globals.css`**

Append (before the global reduced-motion rule):

```css
/* Reveal (scroll-in) transition */
.t-reveal {
  opacity: 0.4;
  transform: translateY(8px);
  transition:
    opacity var(--dur-slow) var(--ease-out),
    transform var(--dur-slow) var(--ease-out);
  will-change: opacity, transform;
}
.t-reveal[data-revealed="true"] {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .t-reveal { opacity: 1 !important; transform: none !important; }
}
```

- [ ] **Step 7: Run tests + lint**

Run: `npm run test -- reveal.test.tsx && npm run lint`
Expected: reveal tests PASS, no new lint errors.

- [ ] **Step 8: Run the full suite as a regression check**

Run: `npm run test`
Expected: all tests pass.

- [ ] **Step 9: Commit**

```bash
git add app/globals.css components/reveal.tsx __tests__/reveal.test.tsx
git commit -m "feat(motion): add motion tokens, reduced-motion guard, Reveal component

Motion ladder (--dur-fast/base/slow/signature) and three easings
(--ease-out/in-out/spring) as CSS custom properties. Global
prefers-reduced-motion rule flattens animations without disabling
state hover changes. New <Reveal> client component wraps children in
an IntersectionObserver-driven fade+lift, staggering supported via
delayMs prop.

Spec: docs/superpowers/specs/2026-07-11-palette-and-motion-enhancement-design.md §3.1-3.2"
```

---

## Task 3: Baseline hover polish + scroll reveals across site

**Files:**
- Modify: `app/globals.css` — add `.t-hover-lift` and nav underline utility.
- Modify: `components/nav-bar.tsx` — desktop link underline.
- Modify: `components/menu-card.tsx` — border color shift to `border-border-strong` on hover (replacing `hover:border-gold`).
- Modify: `components/homepage-gallery.tsx` — wrap grid items with `<Reveal>` staggered.
- Modify: `components/footer.tsx` — gold eyebrow labels for section titles; `border-border-strong` dividers.
- Modify: `app/page.tsx` — wrap "Simple Craft, Local Passion" section body and testimonial with `<Reveal>`; add `translateY(-1px)` hover on hero CTAs.

**Interfaces:**
- Consumes: `Reveal` from Task 2, motion tokens from Task 2, palette tokens from Task 1.
- Produces: `.t-hover-lift` utility class (CSS): `transition: transform var(--dur-base) var(--ease-out)`, on `:hover` applies `translateY(-1px)`, on `:active` `translateY(0)`. Reduced-motion: no transform change.

- [ ] **Step 1: Add utility classes to `app/globals.css`**

Append (before the global reduced-motion rule):

```css
/* Hover: subtle lift for primary/gold buttons */
.t-hover-lift {
  transition: transform var(--dur-base) var(--ease-out),
              background-color var(--dur-base) var(--ease-out),
              box-shadow var(--dur-base) var(--ease-out);
  will-change: transform;
}
.t-hover-lift:hover { transform: translateY(-1px); }
.t-hover-lift:active { transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .t-hover-lift:hover, .t-hover-lift:active { transform: none; }
}

/* Nav underline: scaleX from left on hover */
.t-nav-link {
  position: relative;
  transition: color var(--dur-base) var(--ease-out);
}
.t-nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 1px;
  background: var(--color-gold);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform var(--dur-base) var(--ease-out);
}
.t-nav-link:hover::after,
.t-nav-link[data-active="true"]::after {
  transform: scaleX(1);
}
.t-nav-link[data-active="true"]::after {
  transform-origin: left center;
}
```

- [ ] **Step 2: Update `components/nav-bar.tsx` desktop links**

Replace each of the four desktop `<Link>` navigation items (Menu, Reservations, Our Story, Contact) so `hover:text-gold transition-colors` becomes `t-nav-link hover:text-gold`. Leave the "Book Table" CTA `<Link>` unchanged for now (updated in step 3). Concretely, replace lines that currently read:

```tsx
<Link href="/menu" className="hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Menu</Link>
```

with:

```tsx
<Link href="/menu" className="t-nav-link hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Menu</Link>
```

Apply the same rename to the three sibling links. Do NOT add `data-active` yet — active-route wiring is out of scope for this task.

- [ ] **Step 3: Add `t-hover-lift` to the Book Table nav CTA and hero CTAs**

In `components/nav-bar.tsx`, on the desktop Book Table `<Link>`, replace `transition-all` with `t-hover-lift`.

In `app/page.tsx`, on the two hero CTAs (Reserve a Table + Explore Menu), replace `transition-all` with `t-hover-lift`. On the Explore Menu ghost button also add `hover:border-sage` (this is the single sage hero moment — spec §4 Hero).

- [ ] **Step 4: Update `components/menu-card.tsx` hover border**

Change `hover:border-gold hover:shadow-sm` on the `<button>` to `hover:border-border-strong hover:shadow-sm`. This removes the gold border-on-hover in favor of the tactile neutral — the gold price tag remains the warmth signal.

- [ ] **Step 5: Wrap homepage gallery grid items with staggered Reveal**

Open `components/homepage-gallery.tsx`. Find the grid element that maps over `items`. For each item, wrap the existing card element in `<Reveal delayMs={index * 80} key={item.title}>...</Reveal>`. Change the outer element from `key` on the card to the `Reveal`.

If the current file uses `.map((item) => <Card ... />)`, change to `.map((item, index) => <Reveal delayMs={index * 80} key={item.title}><Card ... /></Reveal>)`.

- [ ] **Step 6: Wrap the "Simple Craft, Local Passion" section body + testimonial in Reveal**

In `app/page.tsx`, wrap the inner content of the `MINIMALISTIC HOME GALLERY SECTION` heading block (the `<div className="text-center max-w-2xl mx-auto mb-16">…</div>`) with `<Reveal>...</Reveal>`.

Do the same for the testimonial block: wrap the inner `<div className="mx-auto max-w-4xl text-center">…</div>` in `<Reveal>...</Reveal>`.

- [ ] **Step 7: Update `components/footer.tsx` eyebrow labels + dividers**

For every footer section title (Contact / Hours / Follow — locate them by their current heading elements), wrap the label text in a `<span>` styled like the eyebrow used on the homepage:

```tsx
<span className="text-gold uppercase tracking-wider font-semibold text-xs">Contact</span>
```

Replace any `border-border` used as a horizontal divider in the footer with `border-border-strong`.

- [ ] **Step 8: Manual dev-server verification**

Run: `npm run dev`. In a browser:
1. Homepage: scroll — gallery items should stagger in from 40% opacity to 100%, translating 8px up.
2. Hover any nav link — a gold underline should sweep in from the left in ~220ms.
3. Hover Reserve a Table — button should lift 1px.
4. Hover Explore Menu — border should turn sage.
5. Hover a menu card (on `/menu`) — border should turn to `border-border-strong` (a subtle warm-gray), not gold.
6. Toggle OS "Reduce motion" (macOS: System Settings → Accessibility → Display → Reduce motion). Reload. All entries should appear at their final state instantly; hover state changes still work.

Stop the dev server.

- [ ] **Step 9: Run tests and lint**

Run: `npm run test && npm run lint`
Expected: all pass.

- [ ] **Step 10: Commit**

```bash
git add app/globals.css components/nav-bar.tsx components/menu-card.tsx components/homepage-gallery.tsx components/footer.tsx app/page.tsx
git commit -m "feat(motion): hover polish and scroll reveals across site

Nav links get a scaleX gold underline. Hero + Book Table CTAs get a
1px hover lift. Menu cards swap the gold hover border for the new
--color-border-strong, keeping the gold price tag as the warmth
signal. Homepage gallery items stagger in via <Reveal>; testimonial
and section body fade in on scroll. Footer picks up gold eyebrows
and border-strong dividers.

Spec: docs/superpowers/specs/2026-07-11-palette-and-motion-enhancement-design.md §3.3, §4"
```

---

## Task 4: Sage in service — menu chips, source tags, "Open now"

**Files:**
- Modify: `components/menu-card.tsx` — add `sourceTags?: ("local" | "seasonal")[]` to the `MenuItem` interface; render a sage-soft chip above the title when tags present.
- Modify: `components/menu-explorer.tsx` — change selected filter chip style from `bg-primary … text-white` to `bg-sage-soft border-sage text-sage`; wrap filtered result grids in `<Reveal>` with 30ms stagger; keep the tab-panel semantics intact.
- Modify: `app/page.tsx` — add "Open now" chip on the Hours item of the info banner.
- Modify: `app/globals.css` — add `.t-pulse-dot` animation for the "Open now" indicator.

**Interfaces:**
- Consumes: sage tokens from Task 1, `Reveal` from Task 2.
- Produces: `MenuItem.sourceTags?: ("local" | "seasonal")[]` (optional, defaults undefined = no chip). `.t-pulse-dot` CSS utility class.

- [ ] **Step 1: Extend `MenuItem` type in `components/menu-card.tsx`**

At the `MenuItem` interface, add:

```ts
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "brunch" | "dinner" | "drinks" | "dessert";
  subCategory?: string;
  tags: ("Vegan" | "Vegetarian" | "Gluten-Free" | "Dairy-Free")[];
  sourceTags?: ("local" | "seasonal")[];
  image: string;
}
```

- [ ] **Step 2: Render the source-tag chip in `MenuCard`**

Inside the `<span className="p-5 flex-grow …">` block, immediately before the inner `<span className="block">` that contains the title row, insert:

```tsx
{item.sourceTags && item.sourceTags.length > 0 && (
  <span className="flex gap-1.5 mb-2 block">
    {item.sourceTags.map((t) => (
      <span
        key={t}
        className="bg-sage-soft text-sage text-[11px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wide"
      >
        {t === "local" ? "Local" : "Seasonal"}
      </span>
    ))}
  </span>
)}
```

- [ ] **Step 3: Update filter-chip styles in `components/menu-explorer.tsx`**

Find the `filterTags.map` block. Change the selected-branch className from:

```tsx
? "bg-primary border-primary text-white"
```

to:

```tsx
? "bg-sage-soft border-sage text-sage"
```

Keep the unselected branch (`"bg-bg-card border-border text-text-secondary hover:bg-bg-elevated"`) unchanged.

- [ ] **Step 4: Wrap filtered results in Reveal for stagger**

In `components/menu-explorer.tsx`, find each `.map((item) => (<MenuCard key={item.id} item={item} onSelect={setSelectedItem} />))` block (there are several across the sub-category groupings). Change each to include the index and wrap with Reveal:

```tsx
.map((item, index) => (
  <Reveal delayMs={index * 30} key={item.id}>
    <MenuCard item={item} onSelect={setSelectedItem} />
  </Reveal>
))
```

At the top of `components/menu-explorer.tsx`, add:

```tsx
import Reveal from "@/components/reveal";
```

Important: keep the `<Reveal>` `key` where the `MenuCard` `key` used to be (on the outer element), so React re-mounts revealers on filter change and the reveal animation replays.

- [ ] **Step 5: Add `.t-pulse-dot` utility to `app/globals.css`**

Append (before the global reduced-motion rule):

```css
/* Pulsing dot for "Open now" indicator */
.t-pulse-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: var(--color-sage);
  box-shadow: 0 0 0 0 var(--color-sage);
  animation: t-pulse 2s var(--ease-in-out) infinite;
}
@keyframes t-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(143, 164, 122, 0.55); }
  70%  { box-shadow: 0 0 0 6px rgba(143, 164, 122, 0); }
  100% { box-shadow: 0 0 0 0 rgba(143, 164, 122, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .t-pulse-dot { animation: none; }
}
```

- [ ] **Step 6: Add the "Open now" chip on `app/page.tsx` info banner**

Find the info-banner block (`<Clock size={18} className="text-gold" />` region). Replace the surrounding `<div className="py-2 sm:py-0 flex items-center justify-center gap-2 text-text-secondary font-medium">` block with:

```tsx
<div className="py-2 sm:py-0 flex items-center justify-center gap-2 text-text-secondary font-medium">
  <Clock size={18} className="text-gold" />
  <span>Open: 8:30 am – 2:00 pm today</span>
  <span className="inline-flex items-center gap-1.5 bg-sage-soft text-sage text-[10px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wide ml-1">
    <span className="t-pulse-dot" aria-hidden="true" />
    Open now
  </span>
</div>
```

Note: This spec revision assumes the restaurant is open at page-view time. A future task can gate the chip on live open/closed state; scope for this pass is the visual pattern only (spec §4 "Info banner").

- [ ] **Step 7: Seed at least one `sourceTags` value in menu data (smoke check)**

Locate the menu-items data file (search: `rg -l "category: \"brunch\"" app`). Add `sourceTags: ["local"]` to one brunch item and `sourceTags: ["seasonal"]` to one dinner item so the chip visibly renders during dev-server verification. If no ergonomic data file exists yet, skip — the visual chip will be validated when data is added later.

- [ ] **Step 8: Dev-server verification**

Run: `npm run dev`.
1. `/menu`: filter chips — selected chip is dark sage fill with sage text (not primary blue).
2. Change filter — items in the results fade + translate up in a fast stagger (~30ms between cards).
3. `/menu`: any card with `sourceTags` shows a small dark-sage "LOCAL" or "SEASONAL" chip above the title.
4. Homepage: hours row shows an "OPEN NOW" pill with a gently pulsing sage dot.
5. Reduce motion on: pulse dot goes static, no other visible regressions.

Stop the dev server.

- [ ] **Step 9: Run tests and lint**

Run: `npm run test && npm run lint`
Expected: all pass. (The existing menu-explorer tests may check the previous filter class strings — if any test fails on the old `bg-primary`/`text-white` class expectations, update the test to assert on new `bg-sage-soft`/`text-sage` classes.)

- [ ] **Step 10: Commit**

```bash
git add app/globals.css components/menu-card.tsx components/menu-explorer.tsx app/page.tsx
git commit -m "feat(sage): filter chips, source tags, open-now indicator

Menu filter chips move from primary-blue to sage-soft when selected —
the palette starts telling the produce story. MenuItem gains an
optional sourceTags: ('local' | 'seasonal')[] rendered as a small
sage chip above the item title. Results stagger in on filter change.
Hero info banner grows an 'Open now' sage pill with a pulsing dot.

Spec: docs/superpowers/specs/2026-07-11-palette-and-motion-enhancement-design.md §4 (Info banner, menu-explorer, menu-card)"
```

---

## Task 5: Signature moment — SprigHeading

**Files:**
- Create: `components/sprig-heading.tsx`
- Create: `__tests__/sprig-heading.test.tsx`
- Modify: `app/globals.css` — add `.t-sprig` draw animation.
- Modify: `app/page.tsx` — replace the "Simple Craft, Local Passion" heading block with `<SprigHeading>`; add `KIND WORDS` eyebrow + sprig to testimonial section.
- Modify: `app/menu/page.tsx`, `app/about/page.tsx`, `app/gallery/page.tsx`, `app/contact/page.tsx`, `app/reservations/page.tsx` — replace top-of-page section headings with `<SprigHeading>` where an eyebrow/h2 pattern already exists.

**Interfaces:**
- Consumes: sage tokens (Task 1), motion tokens (Task 2).
- Produces:
  ```ts
  export interface SprigHeadingProps {
    eyebrow: string;
    children: React.ReactNode; // the heading text
    className?: string;
    /** default "h2" */
    as?: "h1" | "h2" | "h3";
    /** align center or left. default "center" */
    align?: "center" | "left";
  }
  export default function SprigHeading(props: SprigHeadingProps): JSX.Element;
  ```
  Renders: `<div align><span eyebrow-styles>SPRIG_SVG {eyebrow}</span><Tag heading-styles>{children}</Tag></div>`. Sprig SVG has `aria-hidden="true"`. Uses `IntersectionObserver` to add `data-drawn="true"` when scrolled into view, which triggers the stroke-dasharray draw + leaf fade. Under `prefers-reduced-motion`, appears final-state on mount.

- [ ] **Step 1: Write the failing test for `SprigHeading`**

Create `__tests__/sprig-heading.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import SprigHeading from "@/components/sprig-heading";

describe("SprigHeading", () => {
  beforeEach(() => {
    class MockIO {
      observe = jest.fn();
      disconnect = jest.fn();
      unobserve = jest.fn();
      takeRecords = () => [];
      root = null;
      rootMargin = "";
      thresholds = [];
      constructor() {}
    }
    // @ts-expect-error test polyfill
    global.IntersectionObserver = MockIO;
  });

  it("renders the eyebrow and heading with an aria-hidden sprig", () => {
    render(<SprigHeading eyebrow="VISUAL STORY">Simple Craft, Local Passion</SprigHeading>);
    expect(screen.getByText("VISUAL STORY")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Simple Craft, Local Passion"
    );
    const svg = document.querySelector("svg[aria-hidden='true']");
    expect(svg).not.toBeNull();
  });

  it("respects `as` prop", () => {
    render(<SprigHeading eyebrow="A" as="h3">B</SprigHeading>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- sprig-heading.test.tsx`
Expected: FAIL — module `@/components/sprig-heading` not found.

- [ ] **Step 3: Create `components/sprig-heading.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export interface SprigHeadingProps {
  eyebrow: string;
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  align?: "center" | "left";
}

// Small 3-leaf sprig, hand-drawn feel.
function Sprig({ drawn }: { drawn: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`t-sprig ${drawn ? "is-drawn" : ""}`}
    >
      {/* Stem */}
      <path
        d="M10 18 C 10 12, 10 8, 10 3"
        stroke="var(--color-sage)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="t-sprig-stroke"
      />
      {/* Left leaf */}
      <path
        d="M10 12 C 6 12, 4 10, 4 7 C 6 8, 9 9, 10 12 Z"
        stroke="var(--color-sage)"
        fill="var(--color-sage)"
        strokeWidth="1"
        strokeLinejoin="round"
        className="t-sprig-leaf"
        style={{ transitionDelay: "40ms" }}
      />
      {/* Right leaf */}
      <path
        d="M10 9 C 14 9, 16 7, 16 4 C 14 5, 11 6, 10 9 Z"
        stroke="var(--color-sage)"
        fill="var(--color-sage)"
        strokeWidth="1"
        strokeLinejoin="round"
        className="t-sprig-leaf"
        style={{ transitionDelay: "100ms" }}
      />
      {/* Top leaf */}
      <path
        d="M10 5 C 8 4, 8 2, 10 1 C 12 2, 12 4, 10 5 Z"
        stroke="var(--color-sage)"
        fill="var(--color-sage)"
        strokeWidth="1"
        strokeLinejoin="round"
        className="t-sprig-leaf"
        style={{ transitionDelay: "160ms" }}
      />
    </svg>
  );
}

export default function SprigHeading({
  eyebrow,
  children,
  className = "",
  as = "h2",
  align = "center",
}: SprigHeadingProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || drawn) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [drawn]);

  const Tag = as as ElementType;
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div ref={ref} className={`flex flex-col ${alignClass} ${className}`}>
      <span
        className={`inline-flex items-center gap-2 text-gold uppercase tracking-wider font-semibold text-xs`}
      >
        <Sprig drawn={drawn} />
        {eyebrow}
      </span>
      <Tag className="font-serif text-3xl md:text-5xl font-bold mt-2 text-primary">
        {children}
      </Tag>
    </div>
  );
}
```

- [ ] **Step 4: Add sprig draw CSS to `app/globals.css`**

Append (before the global reduced-motion rule):

```css
/* Sprig signature draw */
.t-sprig .t-sprig-stroke {
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  transition: stroke-dashoffset var(--dur-signature) var(--ease-out);
}
.t-sprig .t-sprig-leaf {
  opacity: 0;
  transition: opacity 240ms var(--ease-out);
}
.t-sprig.is-drawn .t-sprig-stroke {
  stroke-dashoffset: 0;
}
.t-sprig.is-drawn .t-sprig-leaf {
  opacity: 1;
}
@media (prefers-reduced-motion: reduce) {
  .t-sprig .t-sprig-stroke { stroke-dashoffset: 0 !important; transition: none !important; }
  .t-sprig .t-sprig-leaf   { opacity: 1 !important; transition: none !important; }
}
```

- [ ] **Step 5: Verify sprig tests pass**

Run: `npm run test -- sprig-heading.test.tsx`
Expected: PASS.

- [ ] **Step 6: Adopt `SprigHeading` on homepage**

In `app/page.tsx`, replace the two-line eyebrow + `<h2>` inside the gallery section:

```tsx
<span className="text-gold uppercase tracking-wider font-semibold text-xs">Visual Story</span>
<h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-primary">Simple Craft, Local Passion</h2>
```

with:

```tsx
<SprigHeading eyebrow="Visual Story">Simple Craft, Local Passion</SprigHeading>
```

Wrap the testimonial section content (currently just the stars + quote) with an eyebrow-first structure using SprigHeading. Insert before the stars row:

```tsx
<SprigHeading eyebrow="Kind Words" className="mb-6">Guests on Town Tonic</SprigHeading>
```

Add the import at the top of `app/page.tsx`:

```tsx
import SprigHeading from "@/components/sprig-heading";
```

- [ ] **Step 7: Adopt `SprigHeading` on remaining pages**

For each of `app/menu/page.tsx`, `app/about/page.tsx`, `app/gallery/page.tsx`, `app/contact/page.tsx`, `app/reservations/page.tsx`:

1. Read the file.
2. Locate the top-of-page section-heading block where an eyebrow `<span>` sits above an `<h1>` or `<h2>` (mirrors the homepage pattern). If found, replace with `<SprigHeading eyebrow="…" as="h1|h2">…</SprigHeading>` matching the original element level and text. Import `SprigHeading` at the top of the file.
3. If a page has no eyebrow/heading pattern in this style, skip it — do not force one in. Note in the commit which pages were skipped.

- [ ] **Step 8: Dev-server verification**

Run: `npm run dev`. In a browser:
1. Homepage: scroll to "Visual Story" — sprig stem draws in over ~900ms, three leaves fade in staggered. Runs once; scrolling away and back does not re-trigger.
2. Homepage: scroll to "Kind Words" — same pattern.
3. Each other page: sprig appears next to the section eyebrow.
4. Toggle reduce-motion on: sprigs render fully drawn instantly.
5. Inspect an SVG in devtools — confirms `aria-hidden="true"`.

Stop the dev server.

- [ ] **Step 9: Run tests and lint**

Run: `npm run test && npm run lint`
Expected: all pass.

- [ ] **Step 10: Commit**

```bash
git add app/globals.css components/sprig-heading.tsx __tests__/sprig-heading.test.tsx app/page.tsx app/menu/page.tsx app/about/page.tsx app/gallery/page.tsx app/contact/page.tsx app/reservations/page.tsx
git commit -m "feat(sprig): add SprigHeading signature moment across pages

Shared <SprigHeading> renders an inline sage sprig SVG next to each
section's gold eyebrow. When the block scrolls into view, the stem
draws over --dur-signature, then the three leaves fade in staggered.
Adopted on homepage (Visual Story, Kind Words) plus interior pages.
Sprig is aria-hidden and honors prefers-reduced-motion.

Spec: docs/superpowers/specs/2026-07-11-palette-and-motion-enhancement-design.md §3.4"
```

---

## Task 6: Route transitions, wizard step crossfade, mobile sticky show/hide

**Files:**
- Create: `app/template.tsx`
- Modify: `app/globals.css` — add `.t-route` and `.t-wizard-step` and `.t-sticky-bar` utility classes.
- Modify: `components/booking-wizard.tsx` — wrap each step body in `.t-wizard-step` with `data-active` state; step-indicator dots go gold.
- Modify: `components/nav-bar.tsx` — mobile sticky bar picks up `.t-sticky-bar`; add a small `useScrollDirection` hook (inline) to toggle `data-hidden` on scroll direction.

**Interfaces:**
- Consumes: motion tokens (Task 2).
- Produces:
  - `app/template.tsx` — Next.js App Router `template` that keys off pathname and wraps children in a `.t-route` element.
  - `.t-wizard-step` CSS: base state `opacity: 0; transform: translateX(12px)`, active state `opacity: 1; transform: translateX(0)`, `transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)`.
  - `.t-sticky-bar` CSS: `transform: translateY(0); transition: transform var(--dur-slow) var(--ease-spring)`; `[data-hidden="true"]` → `transform: translateY(100%)`.

- [ ] **Step 1: Add route-transition CSS to `app/globals.css`**

Append (before the global reduced-motion rule):

```css
/* Route change: opacity fade */
.t-route {
  animation: t-route-in var(--dur-base) var(--ease-out) both;
}
@keyframes t-route-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .t-route { animation: none; opacity: 1; }
}

/* Wizard step-to-step transition */
.t-wizard-step {
  opacity: 0;
  transform: translateX(12px);
  transition:
    opacity var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}
.t-wizard-step[data-active="true"] {
  opacity: 1;
  transform: translateX(0);
}
@media (prefers-reduced-motion: reduce) {
  .t-wizard-step { transition: none; }
}

/* Mobile sticky action bar */
.t-sticky-bar {
  transform: translateY(0);
  transition: transform var(--dur-slow) var(--ease-spring);
}
.t-sticky-bar[data-hidden="true"] {
  transform: translateY(100%);
}
@media (prefers-reduced-motion: reduce) {
  .t-sticky-bar { transition: none; }
}
```

- [ ] **Step 2: Create `app/template.tsx`**

`template.tsx` in Next.js 16 App Router remounts on every route change. Confirm the pattern by reading `node_modules/next/dist/docs/` (grep for `template.tsx`) before writing:

Run: `rg -l "template" node_modules/next/dist/docs 2>/dev/null | head -5`

Then create:

```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="t-route">{children}</div>;
}
```

The View Transitions API upgrade is intentionally deferred — opacity fallback lands first, viewTransition can be added later once we've verified no regressions.

- [ ] **Step 3: Update booking-wizard step wrappers**

In `components/booking-wizard.tsx`, each step body currently renders based on `step === 1/2/3/4`. Wrap each step's outer element with `<div className="t-wizard-step" data-active="true">...</div>`. Every step is only in the DOM when active in the current implementation, so `data-active` is always `"true"` — the transition plays on mount of each step. This delivers the crossfade without a full refactor to keep steps mounted.

For each step's wrapping element, add:

```tsx
<div className="t-wizard-step" data-active="true" key={`step-${step}`}>
  {/* existing step content */}
</div>
```

The `key={step-N}` on the top-level wrapper causes React to unmount the old step and mount the new one — the mount triggers the CSS transition from the initial `opacity: 0; translateX(12px)` to `data-active="true"` state.

Alternatively, if steps 1..4 currently render inside a single conditional switch, wrap the outer conditional container:

```tsx
<div className="t-wizard-step" data-active="true" key={step}>
  {step === 1 && <Step1 />}
  {step === 2 && <Step2 />}
  {/* etc. */}
</div>
```

Whichever fits the current structure with the least code churn — read the file first, then pick.

- [ ] **Step 4: Update wizard step indicator dots to gold**

In `components/booking-wizard.tsx`, locate the step-indicator dots (search for the render that maps over `[1, 2, 3, 4]` or similar). Ensure the completed and current-step styles use `bg-gold` (filled) and `text-text-muted` / `border-border` for future steps. Do not repaint them any color other than gold/muted — this is the primary "you are here" signal.

If the current implementation uses `bg-primary` for the current dot, change to `bg-gold`. If it uses another accent, change to `bg-gold`.

- [ ] **Step 5: Add scroll-direction hide/show to the mobile sticky bar**

The mobile sticky bar currently lives in `components/nav-bar.tsx` under `<div className="md:hidden fixed bottom-0 …">`. Convert its `<div>` into the component below (add a small inline scroll-direction watcher):

At the top of `components/nav-bar.tsx`, add `useEffect, useRef, useState` to the imports if not already present.

Add — inside the `NavBar` component body, above the return statement:

```tsx
const [barHidden, setBarHidden] = useState(false);
const lastScrollY = useRef(0);
useEffect(() => {
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const dy = y - lastScrollY.current;
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
```

Update the sticky bar wrapper `<div>` to:

```tsx
<div
  className="t-sticky-bar md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-page/95 backdrop-blur-sm border-t border-border p-3 flex gap-3 shadow-lg"
  data-hidden={barHidden ? "true" : "false"}
>
  {/* existing two links */}
</div>
```

Also add `t-hover-lift` to each of the two sticky-bar `<Link>` elements' classNames (mirrors the hero CTA polish).

- [ ] **Step 6: Dev-server verification**

Run: `npm run dev`. In a browser:
1. Navigate between pages via nav links — outgoing page fades out briefly, incoming fades in over ~220ms. No slide, no layout jump.
2. Open `/reservations` — advance through booking-wizard steps. Each step slides in from the right ~12px with a fade.
3. Wizard step indicator dots — completed and current dots are gold.
4. On mobile viewport (Chrome devtools iPhone 12): scroll down — sticky bar slides down out of view; scroll up — sticky bar springs back.
5. Reduce-motion on: all four flatten — no fades, no springs — content still fully usable.

Stop the dev server.

- [ ] **Step 7: Run tests and lint**

Run: `npm run test && npm run lint`
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add app/globals.css app/template.tsx components/booking-wizard.tsx components/nav-bar.tsx
git commit -m "feat(motion): route transitions, wizard step crossfade, sticky bar

app/template.tsx opacity-fades between routes on every navigation.
Booking wizard steps slide + fade horizontally on advance; step
indicator dots settle on gold. Mobile sticky action bar slides in
from below on mount and now hides on scroll-down / reveals on
scroll-up with a spring ease.

Spec: docs/superpowers/specs/2026-07-11-palette-and-motion-enhancement-design.md §3.3, §4 (Sticky bar, booking wizard)"
```

---

## Task 7: QA sweep + verification doc

**Files:**
- Create: `docs/superpowers/verify/animations.md` — manual verification checklist.

- [ ] **Step 1: Ensure the verify directory exists**

Run: `mkdir -p docs/superpowers/verify`

- [ ] **Step 2: Write the manual verification checklist**

Create `docs/superpowers/verify/animations.md`:

```markdown
# Palette & Motion Enhancement — Manual Verification Checklist

Run against a `npm run dev` build. Record ✓ / ✗ for each. Attach output to the phase-6 PR.

## Palette
- [ ] Homepage still renders at ~parity with the pre-work screenshot (Steel Blue primary, Warm Timber Gold accent).
- [ ] Card hover states show a slightly warmer border (`--color-border-strong` `#3A3E48`), not gold.
- [ ] Testimonial quote body is warmer (`--color-text-soft`) than surrounding secondary text.
- [ ] No dark text appears on any colored fill (spot-check sage chips, gold buttons, primary CTAs).

## Sage in service
- [ ] Menu filter chips: selected chip is dark-sage fill with sage text. Unselected is neutral.
- [ ] At least one menu card shows a `LOCAL` or `SEASONAL` sage-soft chip above the title.
- [ ] Homepage info banner shows an `OPEN NOW` sage pill with a pulsing dot.

## Motion
- [ ] Homepage gallery items stagger in on first scroll (80ms between items).
- [ ] Testimonial fades in on scroll — no translate.
- [ ] Menu filter change produces a quick stagger reveal on the results grid.
- [ ] Nav link hover: gold underline sweeps in from the left in ~220ms; retracts on leave.
- [ ] Hero CTAs lift 1px on hover, return on active.
- [ ] "Explore Menu" ghost CTA border turns sage on hover.

## Signature moment
- [ ] `SprigHeading` renders on Home (Visual Story, Kind Words), Menu, About, Gallery, Contact, Reservations wherever a heading pattern exists.
- [ ] On scroll into view: stem draws over ~900ms, three leaves fade in staggered.
- [ ] Runs once — does not re-animate on scroll away and back.
- [ ] SVG carries `aria-hidden="true"` (devtools inspect).

## Route + wizard + sticky bar
- [ ] Route changes cross-fade (~220ms) — no slide, no CLS.
- [ ] Booking wizard step advance: slide-in from right (12px) + fade.
- [ ] Wizard step indicator dots use gold for current + completed.
- [ ] Mobile sticky action bar hides on scroll down, reveals on scroll up.

## Accessibility
- [ ] OS "Reduce motion" enabled: every reveal, sprig draw, route fade, wizard slide, and pulsing dot flattens. Content still fully visible and usable.
- [ ] Focus rings on all interactive elements are unobscured by hover translations (no clipping on Reserve, Book Table, filter chips, nav Book Table).
- [ ] Keyboard tab flow unchanged from baseline.

## Performance
- [ ] Lighthouse (mobile) Performance ≥ baseline captured before Phase 1.
- [ ] Lighthouse (mobile) Accessibility ≥ baseline captured before Phase 1.
- [ ] No new Cumulative Layout Shift regressions (compare LH diagnostics).

## Contrast recheck (against rendered pixels)
Sample each of these with a browser color-picker on the deployed page:
- [ ] Sage text `#8FA47A` on page bg `#1C1F26` — ≥ 7:1
- [ ] Sage text on sage-soft chip fill `#3A4636` — ≥ 6:1
- [ ] Text-soft `#B8B0A6` on card bg `#252830` — ≥ 7:1
- [ ] Primary parchment text `#E8E4DF` on sage-soft chip — ≥ 10:1

## Regression sweep
- [ ] Booking flow end-to-end works (all 4 steps → confirmation with success check).
- [ ] Menu filters work across all tabs (Brunch / Dinner / Dessert / Drinks) and dietary chips.
- [ ] Mobile menu drawer opens and closes.
- [ ] `npm run test` — all pass.
- [ ] `npm run lint` — no new errors.
- [ ] `npm run build` — completes without error.
```

- [ ] **Step 3: Run the checklist against the current dev build**

Start `npm run dev`, walk the checklist top to bottom, fix any ✗ items inline before committing (they represent real regressions in the previous phases).

- [ ] **Step 4: Capture Lighthouse baseline + post-work runs**

Baseline: check out the commit *before* Task 1 (`git log --oneline` → find), run Lighthouse mobile against homepage, record Performance + Accessibility scores. Return to current HEAD, re-run Lighthouse. Confirm no regression >2 points on either.

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/verify/animations.md
git commit -m "docs: add manual verification checklist for palette + motion pass

Covers palette parity, sage-in-service moments, motion reveals,
signature sprig, route + wizard + sticky bar, a11y and contrast
recheck, and a regression sweep. Attach filled-in copy to the QA
sweep PR.

Spec: docs/superpowers/specs/2026-07-11-palette-and-motion-enhancement-design.md §7"
```

---

## Self-review notes

- **Spec coverage:** §2 palette → Task 1. §3.1-3.2 motion tokens/principles + Reveal → Task 2. §3.3 catalog (hover/scroll reveal/wizard/route/testimonial) → Tasks 3, 4, 6. §3.4 signature sprig → Task 5. §3.5 non-goals — enforced in Global Constraints; nothing to implement. §4 component/page impact — distributed across Tasks 3–6 matching the phase mapping. §5 accessibility — global rule in Task 2, per-component in Tasks 3–6, checklist in Task 7. §6 performance — enforced via CSS-only motion + `IntersectionObserver`; measured in Task 7. §7 testing — Reveal + SprigHeading unit tests in Tasks 2 & 5; manual checklist in Task 7. §8 rollout phases — one PR per task.
- **Testimonial rotation** was scoped out in the spec; the plan does not implement it.
- **View Transitions API** upgrade was deferred by design in Task 6 step 2 — opacity fallback lands first, per spec §6 which lists the API as "where available".
- **Live open/closed gating** for the "Open now" chip is called out inline in Task 4 as future scope.
