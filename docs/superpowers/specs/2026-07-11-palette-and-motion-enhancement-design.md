# Design Spec: Palette & Motion Enhancement

**Date:** 2026-07-11
**Branch:** `feature/town-tonic-redesign`
**Direction:** Crafted & Tactile — with warmth, invitation, and a "fresh local produce" story throughout.

---

## 1. Background & Purpose

The Town Tonic redesign has landed a solid first prototype: dark, warm-industrial base (`#1C1F26`), Steel Blue primary (`#3E5167`), Warm Timber Gold accent (`#BD8545`), Cormorant Garamond + Outfit typography, and considered modal/success-check animations.

This spec takes the prototype further on two axes:

1. **Palette** — introduce a disciplined sage/herb accent so the site can *say* "fresh, local, seasonal" without a word, and add a small set of depth tokens (soft text, strong border) so surfaces feel tactile rather than flat.
2. **Motion** — establish a shared token system, add scroll reveals and hover polish across the site, and introduce one signature moment (a hand-drawn sage sprig on every section heading) so the site feels curated rather than generated.

Guiding rules for all decisions in this spec:

- **Warmth is never sacrificed.** Every addition is checked against "does this still feel like somewhere you want to sit down and eat?"
- **Text is legible from frame 1.** No motion ever hides content.
- **Discipline over abundance.** Two accents, one signature moment, one motion ladder — not more.

---

## 2. Palette

### 2.1 Kept unchanged
- `--color-primary: #3E5167` — Steel Blue
- `--color-primary-hover: #2B3847`
- `--color-gold: #BD8545` — Warm Timber Gold
- `--color-gold-hover: #9C6D32`
- `--color-bg-page: #1C1F26`
- `--color-bg-card: #252830`
- `--color-text-primary: #E8E4DF`
- `--color-text-secondary: #9CA3AF`
- `--color-text-muted: #6B7280`
- `--color-border: #2D3039`

### 2.2 Adjusted
- `--color-bg-elevated: #2D3039` → **`#31343E`** — one step lighter so hover states on cards read more clearly against the base card.

### 2.3 New tokens

**Sage (fresh accent)**
- `--color-sage: #8FA47A` — the main sage tone. Reads clearly as green on dark, muted enough to sit next to gold without clashing.
- `--color-sage-hover: #A3B78F` — brightens on hover.
- `--color-sage-soft: #3A4636` — deep near-forest tone used as chip fill.

**Depth**
- `--color-text-soft: #B8B0A6` — one warmer step between primary and secondary text, for lead paragraphs and testimonial quotes.
- `--color-border-strong: #3A3E48` — for section dividers and hover states where the default border disappears.

### 2.4 Usage rules (hard rules)

- **Gold** = warmth signals: stars, hero CTAs, eyebrow labels, price marks, focus rings.
- **Sage** = fresh/local/produce signals *only*: "Seasonal", "Local", "Today's pick" chips; ingredient tags on menu; the sprig on section headings; small ticks next to sourced-locally callouts.
- **Never mix gold and sage on the same interactive element.** They coexist on the page, not in one component.
- **Text-on-fill rule:** any filled surface uses light text — parchment (`#E8E4DF`) or the accent's light end (e.g. sage `#8FA47A` on sage-soft `#3A4636`). No dark text on colored fills anywhere.

### 2.5 Contrast

All new combos verified ≥ WCAG AA large / AAA normal:

| Combo | Ratio |
|---|---|
| `text-sage` on `bg-page` | ~7.6:1 |
| `text-sage` on `bg-sage-soft` (chip) | ~6.2:1 |
| `text-text-soft` on `bg-bg-card` | ~7.4:1 |
| `text-text-primary` on `bg-sage-soft` | ~11:1 |

---

## 3. Motion System

### 3.1 Tokens (add to `globals.css`)

**Durations** — one ladder:
```css
--dur-fast:      120ms;  /* micro: focus, tap, chip select */
--dur-base:      220ms;  /* default: hover, small state changes */
--dur-slow:      360ms;  /* scroll reveals, chip fills, testimonial swap */
--dur-signature: 900ms;  /* the sage sprig draw only */
```

**Easings** — three, no more:
```css
--ease-out:    cubic-bezier(0.22, 1, 0.36, 1);    /* existing — keep */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);    /* symmetric transitions */
--ease-spring: cubic-bezier(0.34, 1.35, 0.64, 1); /* chips, "settle in" */
```

### 3.2 Principles

1. **No motion blocks reading.** Text is legible from frame 1. Reveals animate opacity `0.4 → 1` and translate ≤ `8px`.
2. **Motion has a role.** Every animation either (a) confirms an action, (b) directs attention on entry, or (c) is the signature moment. If it fails all three, cut it.
3. **Enter differs from exit.** Enters use `--ease-out`. Exits use `--ease-in-out` and are ~⅔ the enter duration.
4. **Physical, not floaty.** Chips and buttons use `--ease-spring`. Reveals use `--ease-out`.
5. **`prefers-reduced-motion` honored everywhere.** Signature sprig → instant fade. Scroll reveals → instant. Hovers stay (they're state, not motion).

### 3.3 Motion catalog

**Hover / interactive**
- **Buttons (primary + gold)** — background color transition `--dur-base --ease-out` + `translateY(-1px)` on hover, `translateY(0)` on active. No scale.
- **Nav links** — gold underline (1px) grows from left `scaleX(0→1)` in `--dur-base --ease-out`; retracts to right on leave.
- **Cards (gallery, menu)** — border color shifts to `--color-border-strong`, box-shadow deepens. No lift, no scale.
- **Filter chips (menu)** — selected chip fills with sage-soft over `--dur-base --ease-spring`.

**Scroll reveal** (via `IntersectionObserver`, threshold `0.15`, once per element)
- Section headings: eyebrow, h2, lead paragraph fade + `translateY: 8px → 0` in `--dur-slow --ease-out`, 60ms stagger.
- Gallery items: same, 80ms stagger.
- Testimonial: fade only, no translate.

**Testimonial** — stays at a single quote for this pass; scroll fade-in only. A rotating variant is out of scope; if it's added later it must crossfade `--dur-slow --ease-in-out`, pause on hover *and* focus-within, and expose prev/next controls (WCAG 2.2.2).

**Page transitions (Next.js 16 App Router)** — via `app/template.tsx`. Uses View Transitions API where available, opacity crossfade fallback. Outgoing fades out `--dur-fast`, incoming fades in `--dur-base` after a 40ms gap. No slide.

**Booking wizard** — existing modal + success check unchanged. Add step-to-step horizontal crossfade (`opacity` + `translateX(12px→0)`) using `--dur-base --ease-out`.

### 3.4 Signature moment — the sage sprig

Alongside every section eyebrow label, a small SVG sprig (3–4 leaves) sits to the left. On scroll into view:
- Stroke draws in over `--dur-signature` (900ms) with `--ease-out`, using the `stroke-dasharray` technique already used by the success check.
- After draw completes, leaves fade `opacity: 0 → 1` in 240ms with 60ms stagger between leaves.
- Color: `--color-sage`.
- Runs once per element. `aria-hidden="true"` (decorative). `prefers-reduced-motion` → sprig appears instantly, no draw.

### 3.5 Explicit non-goals

- No image scale on any hover.
- No parallax on hero.
- No cursor-follow effects.
- No auto-playing video.
- No card lift on hover (border/shadow only).

---

## 4. Component & Page Impact

### `nav-bar.tsx`
- Scaling underline (gold, 1px, from left) on links.
- Active route: solid gold underline, no animation.
- Mobile drawer slides from right, `--dur-slow --ease-out`.

### Hero (`app/page.tsx`)
- Wordmark gains a soft `drop-shadow: 0 0 24px rgba(189,133,69,0.15)` — warm-lit at night.
- On mount only: wordmark → subhead → CTAs fade in staggered (100ms, then 200ms).
- "Explore Menu" ghost button: border color → `--color-sage` on hover (single sage moment in the hero).

### Info banner (Phone / Map / Hours)
- New "Open now" chip on the Hours item — `bg-sage-soft` + `text-sage` + a small pulsing dot (2s ease-in-out infinite). Only when actually open. When closed: muted chip with "Reopens at 8:30 am".
- Dot pulse honors `prefers-reduced-motion` (goes static).

### `homepage-gallery.tsx` / `gallery-grid.tsx`
- Card border on hover → `--color-border-strong`.
- Overlay caption uses parchment text on `rgba(28,31,38,0.75)` gradient.
- Grid stagger reveal (80ms).
- Signature sprig on the "Simple Craft, Local Passion" heading.

### `menu-explorer.tsx` + `menu-card.tsx`
- Filter chips: unselected = `border-border`; selected = `bg-sage-soft` + `text-sage` + sage border. Spring ease on selection.
- Menu card price: gold (unchanged).
- New "Local" / "Seasonal" tag on qualifying cards — sage-soft chip, sage text, ~11px, above item title. Driven by a `tags: ("local" | "seasonal")[]` field on menu items, defaulting to none.
- Filtered results: items fade + `translateY: 4px → 0` on filter change, 30ms stagger.
- Card border on hover → `--color-border-strong`.

### Testimonial section
- Quote text: `text-primary` → `text-text-soft` (warmer, more magazine-like).
- Add "KIND WORDS" eyebrow so the sprig has a home.
- Scroll fade-in (no translate). Single quote — no rotation in this pass.

### `booking-wizard.tsx`
- Step indicator dots: muted → gold as user progresses; current step = gold filled.
- Step-to-step horizontal crossfade (spec'd in 3.3).
- No other changes.

### `footer.tsx`
- Dividers use `--color-border-strong`.
- Section labels ("Contact", "Hours", "Follow") get gold eyebrow treatment.
- No motion.

### Page-level (all routes)
- `app/template.tsx` wraps route transitions.
- Sprig treatment applied to About, Menu, Gallery, Contact section headings.

### Sticky mobile bottom bar
- `bg-bg-page/95` with `backdrop-blur-sm`.
- Slides up on mount, `--dur-slow --ease-spring`.
- Hides on scroll-down, reveals on scroll-up (throttled).

---

## 5. Accessibility

- All new tokens meet WCAG AA (verified in §2.5).
- Focus rings unchanged (gold) — ensure they sit above the new hover translations (no clipping).
- Global `prefers-reduced-motion` rule:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- Sprig SVGs get `aria-hidden="true"`.
- Testimonial autoplay pauses on hover **and** focus-within, exposes prev/next controls (WCAG 2.2.2).

---

## 6. Performance

- Every scroll reveal uses `IntersectionObserver` (not scroll listeners) and animates `transform` + `opacity` only (GPU-composited).
- Sprig SVGs inline in a shared component, not fetched.
- Route transitions use View Transitions API where available, opacity fallback otherwise.
- CLS budget: reveals start at final layout position (opacity `0.4 → 1`, `translateY ≤ 8px` on already-laid-out elements).
- No new dependencies. All motion is CSS or native browser APIs.

---

## 7. Testing & Verification

### Unit / RTL
- No new tests required for palette (tokens are CSS).
- Menu explorer test: assert selected chip carries `data-selected="true"`.
- Wizard: existing step tests keep passing.

### Manual verification checklist (`docs/superpowers/verify/animations.md`)
1. Scroll each section → sprig draws once, does not re-animate on re-scroll.
2. Toggle OS "Reduce motion" → all animations flatten, content still fully visible.
3. Filter menu → chips crossfade, results stagger under 250ms total.
4. Route change → clean fade, no flash of unstyled content.
5. Sticky bar on mobile → slides up on load, hides on scroll-down / reveals on scroll-up.
6. Lighthouse Performance and Accessibility scores ≥ current baseline.

### Visual regression
- Capture screenshots (hero, gallery section, menu chips selected + unselected, testimonial, footer) *before* Phase 1.
- Compare after each phase. Attach to PRs.

---

## 8. Rollout Phases

Each phase is a separate PR against `feature/town-tonic-redesign`, independently revertible.

### Phase 1 — Palette foundation
- Add sage tokens, `--color-text-soft`, `--color-border-strong`.
- Adjust `--color-bg-elevated` to `#31343E`.
- Audit text-on-fill rule across existing components.
- **Ship — site looks ~95% identical, foundations in place.**

### Phase 2 — Motion tokens + baseline polish
- Motion tokens (`--dur-*`, `--ease-*`).
- Global `prefers-reduced-motion` rule.
- Button hover translate, nav underline scaleX, card border-color hover.
- Shared `<Reveal>` component (IntersectionObserver wrapper) for section headings + gallery stagger.
- **Ship — site feels different without new content.**

### Phase 3 — Sage in service
- Menu filter chips: unselected/selected sage-soft states.
- "Local" / "Seasonal" tags on qualifying menu cards.
- "Open now" chip with pulsing dot on info banner.
- Hero "Explore Menu" ghost sage hover.
- **Ship — palette starts telling the story.**

### Phase 4 — Signature moment
- Shared `<SprigHeading>` component (SVG sprig + eyebrow + h2 slot).
- Roll out across Home, Menu, Gallery, About, Contact.
- Add "KIND WORDS" eyebrow to testimonial.
- **Ship.**

### Phase 5 — Route transitions + wizard polish
- `app/template.tsx` with View Transitions API + fallback.
- Booking wizard step-to-step crossfade.
- Sticky mobile bar slide-up + scroll show/hide.
- **Ship — curated layer between pages and inside flows.**

### Phase 6 — QA sweep
- Manual verification checklist end-to-end.
- Lighthouse before/after (mobile + desktop).
- Visual regression compare against pre-work screenshots.
- Contrast recheck on all rendered sage combos.

---

## 9. Open Questions

None at spec time. Any that arise during implementation are captured in the corresponding phase plan.
