# Dark-Mode Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Town Tonic website from a white/light-stone theme to a Deep Charcoal (#1C1F26) dark palette while preserving Steel Blue and Timber Gold accents.

**Architecture:** Add semantic color tokens to Tailwind CSS v4 `@theme` block, then systematically replace hardcoded stone-* classes with dark equivalents across all pages and components.

**Tech Stack:** Tailwind CSS v4, Next.js App Router, TypeScript, Jest

## Global Constraints

*   Page background: `#1C1F26` (Deep Charcoal)
*   Card/surface background: `#252830`
*   Elevated surface (hover, modals): `#2D3039`
*   Primary text: `#E8E4DF` (warm off-white)
*   Secondary text: `#9CA3AF`
*   Muted text: `#6B7280`
*   Borders: `#2D3039`
*   Primary accent `#3E5167` and Gold accent `#BD8545` — NO changes
*   All existing test assertions must continue to pass

---

### Task 1: Theme Tokens and Layout Shell

Update CSS custom properties and the three layout-level components (layout, navbar, footer) that wrap every page.

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `components/nav-bar.tsx`
- Modify: `components/footer.tsx`

**Interfaces:**
- Consumes: None
- Produces: Dark theme tokens available as Tailwind utilities; dark shell wrapping all pages

- [ ] **Step 1: Update globals.css @theme block and body styles**

Add new semantic tokens and update body colors:

```css
@theme {
  --color-primary: #3E5167;
  --color-primary-hover: #2B3847;
  --color-gold: #BD8545;
  --color-gold-hover: #9C6D32;
  --color-bg-soft: #252830;
  --color-bg-page: #1C1F26;
  --color-bg-card: #252830;
  --color-bg-elevated: #2D3039;
  --color-text-primary: #E8E4DF;
  --color-text-secondary: #9CA3AF;
  --color-text-muted: #6B7280;
  --color-border: #2D3039;
  --font-serif: "Cormorant Garamond", serif;
  --font-sans: "Outfit", sans-serif;
}

body {
  background-color: #1C1F26;
  color: #E8E4DF;
  font-family: var(--font-sans);
}
```

- [ ] **Step 2: Update layout.tsx**

Replace `bg-white` on the body/main element with `bg-bg-page`.

- [ ] **Step 3: Update nav-bar.tsx**

Replace all light-theme classes:
- `bg-white/95` → `bg-bg-page/95`
- `bg-white` → `bg-bg-page`
- `border-stone-200` → `border-border`
- `border-stone-100` → `border-border`
- `hover:bg-stone-50` → `hover:bg-bg-elevated`

- [ ] **Step 4: Update footer.tsx**

Replace all light-theme classes:
- `bg-stone-50` → `bg-bg-card`
- `border-stone-200` → `border-border`
- `text-stone-600` → `text-text-secondary`
- `text-red-700` → `text-red-400`

- [ ] **Step 5: Run tests**

Run: `npm run test`
Expected: All 23 tests pass.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css app/layout.tsx components/nav-bar.tsx components/footer.tsx
git commit -m "style: convert theme tokens and layout shell to dark mode"
```

---

### Task 2: Page Files Dark Mode Conversion

Update all 6 page files to use dark palette classes.

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/gallery/page.tsx`
- Modify: `app/menu/page.tsx`
- Modify: `app/reservations/page.tsx`

**Interfaces:**
- Consumes: Theme tokens from Task 1
- Produces: All page backgrounds and text colors use dark palette

- [ ] **Step 1: Update app/page.tsx (homepage)**

Replace all light-theme classes (~15 changes):
- `bg-stone-50` → `bg-bg-card`
- `bg-white` → `bg-bg-page`
- `border-stone-200` → `border-border`
- `divide-stone-200` → `divide-border`
- `text-stone-700` → `text-text-secondary`
- `text-stone-600` → `text-text-secondary`
- `text-stone-500` → `text-text-muted`
- `border-white` → `border-white/20`
- `hover:bg-white` → `hover:bg-bg-elevated`
- `hover:text-primary` → `hover:text-text-primary`

- [ ] **Step 2: Update app/about/page.tsx**

Replace all light-theme classes (~10 changes):
- `text-stone-600` → `text-text-secondary`
- `border-stone-200` → `border-border`
- `text-stone-500` → `text-text-muted`
- `bg-stone-50` → `bg-bg-card`
- `border-stone-100` → `border-border`
- `text-stone-400` → `text-text-muted`

- [ ] **Step 3: Update app/contact/page.tsx**

Replace all light-theme classes (~9 changes):
- `text-stone-600` → `text-text-secondary`
- `bg-stone-100` → `bg-bg-card`
- `border-stone-200` → `border-border`
- `text-stone-500` → `text-text-muted`
- `bg-stone-50` → `bg-bg-card`

- [ ] **Step 4: Update app/gallery/page.tsx and app/menu/page.tsx**

Replace `text-stone-600` → `text-text-secondary` in both files.

- [ ] **Step 5: Update app/reservations/page.tsx**

Replace all light-theme classes (~4 changes):
- `bg-stone-50` → `bg-bg-page`
- `text-stone-600` → `text-text-secondary`
- `text-stone-500` → `text-text-muted`
- `text-stone-300` → `text-border`

- [ ] **Step 6: Run tests**

Run: `npm run test`
Expected: All 23 tests pass.

- [ ] **Step 7: Commit**

```bash
git add app/
git commit -m "style: convert all page files to dark mode"
```

---

### Task 3: Interactive Components Dark Mode Conversion

Update all 5 interactive component files.

**Files:**
- Modify: `components/booking-wizard.tsx`
- Modify: `components/menu-card.tsx`
- Modify: `components/menu-explorer.tsx`
- Modify: `components/gallery-grid.tsx`
- Modify: `components/homepage-gallery.tsx`

**Interfaces:**
- Consumes: Theme tokens from Task 1
- Produces: All interactive components render correctly on dark backgrounds

- [ ] **Step 1: Update components/booking-wizard.tsx (~30 changes)**

Replace all light-theme classes:
- `bg-white` → `bg-bg-card`
- `border-stone-200` → `border-border`
- `text-stone-400` → `text-text-muted`
- `bg-stone-100` → `bg-bg-page`
- `bg-stone-50` → `bg-bg-page`
- `text-stone-700` → `text-text-primary`
- `text-stone-600` → `text-text-secondary`
- `text-stone-500` → `text-text-muted`
- `hover:bg-stone-50` → `hover:bg-bg-elevated`
- `bg-red-50` → `bg-red-900/20`
- `border-red-100` → `border-red-800/30`
- `text-red-700` → `text-red-400`

- [ ] **Step 2: Update components/menu-card.tsx (~5 changes)**

Replace all light-theme classes:
- `border-stone-200` → `border-border`
- `bg-white` → `bg-bg-card`
- `text-stone-600` → `text-text-secondary`
- `bg-stone-100` → `bg-bg-page`

- [ ] **Step 3: Update components/menu-explorer.tsx (~16 changes)**

Replace all light-theme classes:
- `border-stone-200` → `border-border`
- `text-stone-400` → `text-text-muted`
- `hover:text-stone-600` → `hover:text-text-secondary`
- `bg-stone-50` → `bg-bg-card`
- `border-stone-100` → `border-border`
- `text-stone-600` → `text-text-secondary`
- `hover:bg-stone-100` → `hover:bg-bg-elevated`
- `text-stone-500` → `text-text-muted`
- `text-stone-700` → `text-text-primary`
- `bg-white` → `bg-bg-card`

- [ ] **Step 4: Update components/gallery-grid.tsx and components/homepage-gallery.tsx**

gallery-grid.tsx (~2 changes):
- `border-stone-200` → `border-border`
- `bg-stone-100` → `bg-bg-card`

homepage-gallery.tsx (~4 changes):
- `border-stone-100` → `border-border`
- `bg-stone-50` → `bg-bg-card`
- `text-stone-600` → `text-text-secondary`
- `text-stone-300` → `text-text-secondary`

- [ ] **Step 5: Run full test suite**

Run: `npm run test`
Expected: All 23 tests pass.

- [ ] **Step 6: Run lint and build**

Run: `npm run lint && npm run build`
Expected: Clean lint, successful build.

- [ ] **Step 7: Commit**

```bash
git add components/
git commit -m "style: convert all interactive components to dark mode"
```
