# Design: Off-white site theme + peek-carousel homepage hero

Date: 2026-11-08
Status: Awaiting approval
Prototype (throwaway reference, not to be copied verbatim): `scratchpad/proto/index.html` from the design session, last served at http://127.0.0.1:4321/

## 1. Intent

The homepage hero should be about the food. Visitors land on "Welcome to Town Tonic" and a calm strip of the kitchen's own plated dishes. One dish sits framed in the centre and its neighbours are dimmed either side. The whole site moves from the dark charcoal theme to a warm off-white one, so the dishes read as the colour on the page.

This came out of a long prototype session that tried and rejected several things: a Gucci-style room zoom, overlapping plate clusters, a moving mosaic grid, a full-bleed slideshow and a blurred-backdrop slideshow. What's described here is what the owner approved.

## 2. Goals

1. Replace the current homepage hero (dish8 photo, "Locally sourced, seasonal dining." headline, two CTA buttons) with the peek carousel in §4.
2. Switch the whole site (every page, the nav, the footer, the mobile menu and the sticky bar) to the off-white palette in §5.
3. Keep every existing homepage section below the hero (An Invitation, The Space, On the Table gallery, In the Press, the reservation banner), restyled so it reads correctly on off-white.
4. Keep the real nav (logo image, Menu / Our Story / Contact links, Book Table button), restyled for a light background.

## 3. Non-goals and anti-goals

**Non-goals**
- No opening "page rises into place" animation. The owner explicitly declined it. Only the carousel moves.
- No redesign of the other pages' layouts. They change colour only.
- No dish names, location line, counter, progress bar or prev/pause/next buttons in the hero. All were tried and removed.
- No fixing of the 20 test failures that already exist and have nothing to do with this work (see §8).

**Anti-goals (would count as failure even if it technically works)**
- Cropping that cuts off the plate on the dish photos, apart from the one documented exception (the dessert photo, §4.3).
- A hero that looks like an overlay sitting on top of the page.
- Busy, fast motion. It should feel brisk but calm.
- Text that fails WCAG AA contrast on the new light background. The current gold (`#BD8545`) is only 2.9:1 on off-white.

## 4. Homepage hero: peek carousel

### 4.1 Layout
- The hero fills the rest of the first screen below the sticky nav (`100svh` minus the nav height). The nav no longer overlaps the hero, so remove the current `-mt-32`.
- Top: the heading **"*Welcome* to Town Tonic"** in Cormorant Garamond (the existing `--font-serif`), weight 400, charcoal ink. "Welcome" is italic and "Town Tonic" is underlined with a thin, semi-transparent ink underline (offset ~0.12em). On wide screens it sits on one line (roughly 40–64px, scaling with viewport width). On tall/portrait screens it breaks after "to" onto two lines (roughly 40–76px). This is the page's `h1`, and it must be exempt from the global rule that forces headings into Lilita One and white.
- Below the heading, the carousel fills the remaining height, leaving a small bottom margin (about 24–48px).

### 4.2 The strip
- **10 dishes** in this order (source files are in `images/dishes/`; copy them into `public/images/dishes/`):
  dish8 (lamb rump), dish5 (beef fillet), DSC05288.webp (plate leaving the pass), dish2 (beef cheeks), dish7 (scallops), dessertdish (dessert), dish4 (raw fish salad), dish3 (plates for the table), dish6 (eggs on sourdough), dish1 (brunch toasts).
  Alt text, in order: "Sous vide lamb rump with spring peas", "Sous vide beef fillet with carrot velouté", "A plate on its way out to the dining room", "Braised beef cheeks on kūmara mash", "Seared scallops with miso purée", "Dessert", "Raw fish salad", "Plates for the table", "Eggs on sourdough", "Brunch toasts".
- **Every tile is the same square.** Its size is the largest square that fits the carousel's height (minus ~24px). On wide screens it's also capped at 56% of the carousel width. On portrait screens it's capped at the screen width minus 48px. Photos fill the square (`object-fit: cover`).
- **Centre tile:** full opacity, a 1px gold hairline frame (`rgba(189,133,69,0.45)`) offset 9px outside the photo, and a soft shadow (`0 18px 40px rgba(28,31,38,0.16)`).
- **Neighbours:** each side is scaled to 0.86 at 40% opacity, with gaps of 36px between tiles. Up to two tiles each side are visible and anything further out is hidden. On portrait screens, neighbours use scale 1 and a 48px gap, which puts them just off-screen, so phones see one dish at a time.
- **It loops forever in both directions.** A tile that wraps from one end to the other is repositioned instantly while it's invisible, so it never slides across the strip.

### 4.3 Dessert photo exception
The dessert photo is 2:1, so a square crop trims it. Set `object-position: 38% 50%` on it so the bowl stays centred. The owner has accepted this trim.

### 4.4 Motion
- The strip slides over **0.95s**, eased with `cubic-bezier(.6, 0, .25, 1)`. Opacity and scale move at the same rate, and the frame and shadow fade in on the new centre tile (~1s).
- Each dish then **rests for 1.4s**, so a new dish arrives about every 2.35s.
- **Autoplay pauses** while the pointer is over the carousel, and while it has keyboard focus that came from the keyboard (`:focus-visible`). It resumes when both end. It also stops while the tab is hidden.
- **`prefers-reduced-motion: reduce`:** no autoplay and no transitions. Manual navigation still works and changes instantly.

### 4.5 Interaction and accessibility
- Clicking or tapping a visible neighbour brings it to the centre.
- A horizontal swipe of more than 40px goes to the next or previous dish. Vertical page scrolling must still work (`touch-action: pan-y`).
- The left and right arrow keys move between dishes when the carousel has focus. The carousel is focusable (`tabindex=0`) and shows a visible gold focus ring.
- Markup: a `region` with `aria-roledescription="carousel"` and `aria-label="Dishes from the kitchen"`. Non-centre slides are `aria-hidden`.
- Pausing on hover and focus is how this meets WCAG 2.2.2 (pause, stop, hide) without a visible button. The owner chose this approach.

## 5. Off-white site theme

### 5.1 Token changes (`app/globals.css` `@theme`)
Most of the site uses these tokens, so changing them does most of the work.

| Token | Now | New | Notes |
|---|---|---|---|
| `--color-bg-page` | #1C1F26 | **#F6F3EE** | warm off-white, approved |
| `--color-bg-card`, `--color-bg-soft` | #252830 | **#ECE6DD** | soft cream panels |
| `--color-bg-elevated` | #31343E | ~#E4DDD2 | builder's call; a step deeper than the cards |
| `--color-text-primary` | #E8E4DF | **#1C1F26** | charcoal ink (14.9:1) |
| `--color-text-secondary` | #9CA3AF | **#5E5A54** | warm grey (6.2:1 on page, 5.5:1 on cards) |
| `--color-text-soft` | #B8B0A6 | #5E5A54 | same as secondary |
| `--color-text-muted` | #6B7280 | builder's call | must be ≥4.5:1 on both #F6F3EE and #ECE6DD (#6B7280 is only 3.9:1 on cards) |
| `--color-border` / `-strong` | #2D3039 / #3A3E48 | ~#DDD6CB / ~#CFC6B8 | builder's call; hairlines that are visible but quiet |
| `--color-gold` | #BD8545 | **#8E5D2B** | deeper bronze for text, links and underlines (5.1:1 page, 4.5:1 cards) |
| `--color-gold-hover` | #9C6D32 | ~#74491F | builder's call |
| `--color-sage` | #8FA47A | ~#5C7049 | builder's call; the "open now" dot and any sage text need ≥3:1 for UI, ≥4.5:1 for text |
| `--color-sage-soft` | #3A4636 (dark) | a pale sage, ~#E3E8DC | builder's call |
| `--color-primary` / `-hover` | #3E5167 / #2B3847 | unchanged | steel blue, 7.4:1 on off-white |

The hero's frame hairline keeps the original light gold (`rgba(189,133,69,0.45)`) because it's decoration, not text.

The `body { background-color; color }` rule in `globals.css` is hard-coded to the dark values and must follow the tokens.

### 5.2 Global rules that assume a dark site
- **Headings forced white:** `h1…h6 { color: #fff !important }`. Change this so headings use the dark ink by default. Headings placed over photos still need to be white: the reservation banner on the homepage, the homepage-gallery card titles, and both lightboxes. Those must still come out white (explicit `text-white` has to win). Filled buttons (`bg-primary` / `bg-gold`) keep white text.
- **Nav white-at-top:** the rule `header nav a { color: #fff }` and its scrolled flip assume a dark hero behind a transparent header. On off-white the nav text is always dark. Keep the gold hover and active underline.
- **Menu panel override:** `#menu-grid-panel` headings are already dark (#171717). This still works on light, so leave it.

### 5.3 Components with hard-coded dark styling
- **`nav-bar.tsx`:** the logo should no longer be inverted (`invert={false}` everywhere). Scrolled state: an off-white translucent background with blur and a hairline border, in place of `bg-white/70`. Make the hamburger icon dark in both states. The mobile menu panel (currently `bg-bg-page/60` + `text-white` + `border-white/10`) gets light glass with dark text. The scrim can stay dark.
- **`footer.tsx`, `booking-wizard.tsx`, the about, contact, menu, gallery and reservations pages:** mostly tokens, so they should follow automatically. The builder must check each page by eye for leftover `text-white` / `white/…` on non-photo surfaces and fix them.
- **Over photos (leave dark or white):** `homepage-gallery.tsx` card gradient and title, the `gallery-grid.tsx` hover overlay, both lightboxes (`bg-black/90`), and the homepage reservation banner (`bg-black/65`). These sit on images and stay as they are.
- **`menu-explorer.tsx`:** already uses a light paper colour (#f2f1e8). Check that it still looks right next to the off-white page.

## 6. Homepage below the hero
The sections stay as they are, in the same order and with the same content. Only the colours change through the tokens, apart from the reservation banner, which stays a dark photo with white text. The homepage's own mobile sticky bar duplicates the one in `nav-bar.tsx`, so two bars stack on phones. **Builder's call:** remove the homepage copy, since the nav-bar one is global. Mention this in the PR.

## 7. Implementation notes (builder's call unless stated)
- **Read `node_modules/next/dist/docs/` first** for this Next.js 16 version (repo rule in AGENTS.md). Check especially the `next/image` and client component conventions.
- The hero carousel is a client component (suggested: `components/hero-carousel.tsx`), with `app/page.tsx` staying a server component. React Compiler is on, so avoid patterns it can't handle.
- Use `next/image` for the dish photos (`sizes` to suit a tile that's at most ~56vw). The first dish is `priority`.
- The layout maths from the prototype is a good reference. Each slide is absolutely positioned at the stage centre with `translate(x, y) scale(s)`. The x positions build outwards from the centre tile, using each tile's scaled width plus the gap. Recompute on resize (ResizeObserver suggested).
- Make the image sources configurable data in the component or page, not hard-coded in the markup.

## 8. Testing and verification
- **Baseline:** `npx jest` currently gives **20 failed / 5 passed of 25**, before any change. The failures come from stale assertions (for example, the homepage test expects a "Town Tonic" heading and an "Explore Menu" link that don't exist).
- **Update `__tests__/homepage.test.tsx`** for the new hero: the `h1` "Welcome to Town Tonic" is present, a carousel region with 10 dish images is present, and only the centre slide is not `aria-hidden`. Arrow-key navigation moves the centre. Keep the existing lightbox tests working, but update their stale text queries to match the current gallery data so this file passes.
- Leave the other failing suites alone. Report their state before and after, and make sure this work adds no new failures.
- `npm run lint` and `npm run build` must pass.
- **Check by eye in the browser** at 1280×720, 1440×900, 390×844 and 360×640: every page, the hero autoplay timing, hover pause, side-tile click, swipe on mobile, and reduced motion. Check contrast for any text whose colour changed.

## 9. Decisions log
**Owner's decisions:** carousel style hero; peek neighbours; equal square tiles; no dish names or location; no buttons; pause on hover and focus; slide 0.95s + rest 1.4s; off-white #F6F3EE across the whole site; keep the existing homepage sections; keep and restyle the real nav; no opening animation; accept the dessert crop.

**Calls made during the design (owner can veto):** darker bronze `#8E5D2B` replacing gold for text; the 0.86 side scale, 40% side opacity and 36px gap; the hero heading kept in Cormorant (exempt from Lilita); removing the duplicate homepage sticky bar; the exact values for the elevated, muted, border, sage and gold-hover tokens left to the builder within the stated contrast limits.
