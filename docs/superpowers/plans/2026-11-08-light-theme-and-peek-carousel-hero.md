# Off-white Theme + Peek-Carousel Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Switch the whole site to an off-white theme and replace the homepage hero with a "Welcome to Town Tonic" heading above a 10-dish peek carousel.

**Architecture:** The theme flips through the Tailwind v4 `@theme` tokens in `app/globals.css`, plus fixes to the few global rules and components that hard-code the dark theme. The carousel is a client component (`components/hero-carousel.tsx`). Its positioning maths lives in a pure function (`components/hero-carousel-layout.ts`) so it can be unit-tested without a browser. `app/page.tsx` stays a server component and passes the dish data in.

**Tech Stack:** Next.js 16.2 (App Router, Turbopack, React Compiler), React 19.2, Tailwind v4, Jest 30 + Testing Library (jsdom).

**Spec:** `docs/superpowers/specs/2026-11-08-light-theme-and-peek-carousel-hero-design.md`

## Global Constraints

- Next 16: `next/image` `priority` is deprecated. Use `loading="eager"` (and `fetchPriority="high"` on the first dish). All 10 carousel images use `loading="eager"`, because off-screen absolutely positioned slides may never trigger lazy loading.
- Off-white page `#F6F3EE`; cards `#ECE6DD`; ink `#1C1F26`; secondary text `#5E5A54`; gold-as-text `#8E5D2B`; frame hairline `rgba(189,133,69,0.45)`; shadow `0 18px 40px rgba(28,31,38,0.16)`.
- Every text colour must be ≥4.5:1 on both `#F6F3EE` and `#ECE6DD`.
- Carousel: slide `950ms` `cubic-bezier(.6, 0, .25, 1)`; rest `1400ms`; side scale `0.86`; side opacity `0.4`; gap `36px` wide / `48px` portrait; visible range ±2; tile = largest square ≤ (stageH − 24), ≤ 0.56·stageW when wide, ≤ stageW − 48 when portrait. "Wide" means `(min-aspect-ratio: 1/1)`.
- No opening reveal animation, no dish names, no carousel buttons.
- Baseline before any change: `npx jest` → 20 failed / 5 passed (25). This work must not add failures outside `homepage.test.tsx` and the new carousel tests.

## Review Focus

1. **Resize / rotate a phone mid-session.** The tile size and positions recompute, and switching between wide and portrait changes the side scale and gap. Test: a layout unit test for the portrait vs wide outputs, plus the component re-laying out on a `resize` event.
2. **Rapid clicks, arrow presses or swipes while a slide is moving.** The centre always ends on the last requested dish and nothing desyncs. Test: three quick ArrowRight presses land on index 3.
3. **Wrapping past either end.** Going back from dish 0 lands on dish 9, and a tile that wraps never animates across the strip. Test: the layout gives index 9 the offset −1 when active = 0, and the component goes from 0 to 9 on ArrowLeft.
4. **Reduced motion.** No autoplay. Manual navigation still works. Test: with `matchMedia` reporting reduce, advancing timers by 10s doesn't change the active slide.
5. **Hidden tab or hover.** Autoplay stops, then resumes when the tab is visible again or the pointer leaves. Test: mouseenter, then 10s, gives no change; mouseleave, then 2350ms, advances.

---

### Task 1: Off-white theme (tokens, global rules, nav, logo)

**Files:**
- Modify: `app/globals.css` (`@theme` block, `body` rule, heading/nav colour rules)
- Modify: `components/nav-bar.tsx`
- Modify: `components/footer.tsx` (only if it hard-codes dark styling)

**Interfaces:**
- Produces: the tokens listed in spec §5.1, with the same names. Later tasks use `bg-bg-page`, `text-text-primary`, `text-gold` and so on unchanged.

- [ ] **Step 1: Update `@theme` tokens** to the spec §5.1 values. Builder's-call tokens: `bg-elevated #E4DDD2`, `text-muted #66615A`, `border #DDD6CB`, `border-strong #CFC6B8`, `gold-hover #74491F`, `sage #5C7049`, `sage-hover #4B5D3B`, `sage-soft #E3E8DC`. Point `body` background and colour at `var(--color-bg-page)` and `var(--color-text-primary)`.
- [ ] **Step 2: Fix the dark-site global rules.** In the heading rule, drop `h1…h6` from the forced `#fff !important` and keep it for filled `bg-primary` / `bg-gold` links. Headings now inherit ink, and an explicit `text-white` class wins. Replace the nav white-at-top rules with dark ink (`var(--color-text-primary)`) in both states, keeping filled-button white.
- [ ] **Step 3: Nav component.** Set `invert={false}` on the logo. Scrolled header uses `bg-bg-page/80 backdrop-blur-xl border-b border-border shadow-sm`. The hamburger is `text-text-primary` in both states. The mobile panel uses `bg-bg-page/90 text-text-primary border-border`.
- [ ] **Step 4: Verify.** Run `npm run lint` (no new errors in the touched files). In the dev server, look at `/`, `/menu`, `/about`, `/gallery`, `/reservations` and `/contact` at 1280×720 and 390×844: no white text on off-white, and the logo is visible.
- [ ] **Step 5: Run `npx jest`.** It must show no more failures than the baseline of 20.

### Task 2: Carousel layout function

**Files:**
- Create: `components/hero-carousel-layout.ts`
- Test: `__tests__/hero-carousel-layout.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export interface SlidePlacement { offset: number; x: number; scale: number; visible: boolean }
  export interface LayoutResult { size: number; slides: SlidePlacement[] }   // slides[i] for dish i
  export function wrapOffset(i: number, active: number, count: number): number // range -(ceil(count/2)-1)…floor(count/2)
  export function computeLayout(o: { count: number; active: number; stageW: number; stageH: number; wide: boolean }): LayoutResult
  ```
  `x` is the tile centre's horizontal distance from the stage centre, in px. Positions build outward from offset 0 using `size*scale/2 + gap + size*scale/2`.

- [ ] **Step 1: Write the failing tests** in `__tests__/hero-carousel-layout.test.ts`:
  - `wrapOffset(9, 0, 10) === -1`, `wrapOffset(5, 0, 10) === 5`, `wrapOffset(1, 9, 10) === 2`.
  - Wide, `{count:10, active:0, stageW:1280, stageH:460}`: `size === 436` (460 − 24, below 0.56·1280); `slides[0]` is `{offset:0, x:0, scale:1, visible:true}`; `slides[1].x === 436/2 + 36 + 436*0.86/2`; `slides[9].x === -slides[1].x`; `slides[3].visible === false`; `slides[2].visible === true`.
  - Wide and short, `{stageW:600, stageH:900}` with `wide:true`: `size === 0.56*600`.
  - Portrait, `{count:10, active:4, stageW:390, stageH:600, wide:false}`: `size === 342`; `slides[5].scale === 1`; `slides[5].x === 342 + 48`.
- [ ] **Step 2: Run** `npx jest __tests__/hero-carousel-layout.test.ts`. Expect FAIL (module not found).
- [ ] **Step 3: Implement `wrapOffset` and `computeLayout`** with the constants from Global Constraints, exported as named consts (`SIDE_SCALE`, `GAP_WIDE`, `GAP_TALL`, `VISIBLE_RANGE`).
- [ ] **Step 4: Run the tests.** Expect PASS.

### Task 3: HeroCarousel component

**Files:**
- Create: `components/hero-carousel.tsx`
- Test: `__tests__/hero-carousel.test.tsx`

**Interfaces:**
- Consumes: `computeLayout`, `wrapOffset` from Task 2.
- Produces:
  ```ts
  export interface Dish { src: string; alt: string; objectPosition?: string }
  export default function HeroCarousel(props: { dishes: Dish[]; slideMs?: number /* 950 */; holdMs?: number /* 1400 */ }): JSX.Element
  ```
  Root: `<div role="region" aria-roledescription="carousel" aria-label="Dishes from the kitchen" tabIndex={0}>`. Each slide is a `<figure data-active="true|false" aria-hidden=…>` containing a `next/image` (`fill`, `sizes="(min-aspect-ratio: 1/1) 56vw, 100vw"`, `loading="eager"`, and `fetchPriority="high"` on index 0).

- [ ] **Step 1: Write the failing tests.** Stub `window.matchMedia` (returning `matches:false` unless the test sets reduce) and `ResizeObserver` in the test file. Use `jest.useFakeTimers()`.
  - renders 10 images, and exactly one figure has `aria-hidden="false"` (index 0)
  - ArrowRight on the region makes index 1 active; three quick ArrowRights from the start → index 3
  - ArrowLeft from index 0 → index 9
  - clicking the index-1 figure makes it active
  - autoplay: after `act(() => jest.advanceTimersByTime(2350))`, index 1 is active
  - hover pause: `mouseEnter` on the region, advance 10000 → still index 0; `mouseLeave`, advance 2350 → index 1
  - reduced motion: matchMedia `(prefers-reduced-motion: reduce)` matches → advance 10000 → still index 0; ArrowRight still works
  - swipe: `touchStart` clientX 300 → `touchEnd` clientX 200 → index 1; a 20px move → no change
- [ ] **Step 2: Run** `npx jest __tests__/hero-carousel.test.tsx`. Expect FAIL.
- [ ] **Step 3: Implement.** State is `active`. The stage size comes from a ResizeObserver on the stage element (falling back to `clientWidth/clientHeight`). `wide` comes from `matchMedia("(min-aspect-ratio: 1/1)")` with a change listener. Apply each placement as inline `width/height = size`, `transform: translate(x − size/2, −size/2) scale(scale)`, `opacity: offset===0 ? 1 : visible ? 0.4 : 0`, and `pointer-events: none` when not visible. Wrap rule: keep a ref of the previous offsets. If `|offset − prev| > count/2`, render that slide with `transition: none` for that update (it's hidden, so this is invisible). Autoplay: a `setTimeout(slideMs + holdMs)` restarted on every `active` change, skipped when reduced-motion, hovered, keyboard-focused (`:focus-visible` at focusin) or `document.hidden`. Centre tile styling: the hairline outline (offset 9px) and the shadow from Global Constraints. Transitions on `transform` and `opacity` use `slideMs` and the spec easing; they're disabled under reduced motion.
- [ ] **Step 4: Run the tests.** Expect PASS. Also run `npm run lint`.

### Task 4: Homepage integration

**Files:**
- Copy: `images/dishes/{dish8.jpeg,dish5.jpeg,DSC05288.webp,dish2.jpeg,dish7.jpeg,dessertdish.jpeg,dish4.jpg,dish3.jpeg,dish6.jpeg,dish1.jpeg}` → `public/images/dishes/`
- Modify: `app/page.tsx` (replace the HERO section; delete the homepage's own mobile sticky bar)
- Modify: `__tests__/homepage.test.tsx`

**Interfaces:**
- Consumes: `HeroCarousel`, `Dish` from Task 3.

- [ ] **Step 1: Rewrite `__tests__/homepage.test.tsx`** (stub matchMedia and ResizeObserver as in Task 3):
  - `getByRole("heading", { level: 1, name: "Welcome to Town Tonic" })`
  - `getByRole("region", { name: "Dishes from the kitchen" })` contains 10 `img`
  - no link named "Reserve a Table" inside the hero `section` (the hero has no CTAs)
  - fix the lightbox tests' stale queries: "Seasonal Brunch Craft" → `"Seasonal Brunch"` (via `getByRole("button", { name: "View Seasonal Brunch" })`); keep the Escape and close-button assertions
- [ ] **Step 2: Run** `npx jest __tests__/homepage.test.tsx`. Expect FAIL (the old hero is still there).
- [ ] **Step 3: Implement.** Copy the images. Define the `dishes: Dish[]` array in `app/page.tsx` with the spec §4.2 order and alt text; dessert gets `objectPosition: "38% 50%"`. The hero section is `flex flex-col` with height `calc(100svh - <nav height>)` (measure the sticky header: `h-16`/`md:h-24` logo + `p-4` → 96px mobile / 128px desktop; use `h-[calc(100svh-96px)] md:h-[calc(100svh-128px)]`, `min-h-[520px]`). Inside: the `h1` with `<em>Welcome</em> to <br className="landscape-hidden"/>`, and "Town Tonic" underlined (`underline decoration-1 underline-offset-[0.12em] decoration-text-primary/45`). Give the h1 a `hero-heading` class that `globals.css` exempts from the Lilita display font. One line on wide screens and broken after "to" on portrait screens (CSS `@media (min-aspect-ratio: 1/1) { .hero-heading br { display: none } }`); size `clamp(40px, 11vw, 76px)` on portrait and `clamp(40px, 4.4vw, 64px)` on wide. Then `<HeroCarousel dishes={dishes} />` filling the rest, with bottom padding `clamp(24px, 5vh, 48px)`. Remove `-mt-32` and the old hero markup, and delete the homepage sticky bar block.
- [ ] **Step 4: Run** `npx jest __tests__/homepage.test.tsx __tests__/hero-carousel*.test.*`. Expect PASS.

### Task 5: Page sweep and final verification

**Files:**
- Modify (as found): `app/about/page.tsx`, `app/contact/page.tsx`, `app/menu/page.tsx`, `app/gallery/page.tsx`, `app/reservations/page.tsx`, `components/booking-wizard.tsx`, `components/footer.tsx`, `components/menu-explorer.tsx`

- [ ] **Step 1: Grep** for `text-white`, `white/` and `bg-black` in these files. Fix any that sit on a non-photo surface (use `text-text-primary` / `border-border`). Leave photo overlays, lightboxes and filled-button text alone.
- [ ] **Step 2: Browser check** every page at 1280×720 and 390×844, and the homepage also at 1440×900 and 360×640. Check: hero timing (~2.35s per dish), hover pause, side-tile click, the gold frame on the centre tile, and no tile overlapping the heading.
- [ ] **Step 3: Run** `npm run lint`, `npm run build` and `npx jest`. Expect lint and build to pass. Jest: homepage and carousel suites pass, and the other suites show no more failures than at baseline. Record the before and after counts for the summary.
