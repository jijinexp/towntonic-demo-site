# Color Palette Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the website color palette to Option A (Wood & Steel Blue Industrial) as requested, replacing the Forest Green and Antique Gold theme with Steel Blue and Warm Timber Gold.

**Architecture:** Update Tailwind CSS v4 `@theme` configuration variables in `app/globals.css` and verify theme consistency.

**Tech Stack:** Tailwind CSS v4, Next.js, Jest

## Global Constraints
*   Primary theme colors: `--color-primary` is `#3E5167` (Steel Blue) and `--color-gold` is `#BD8545` (Warm Timber Gold).
*   No cool slate tones should be used for body text; we will use `#1C2430` (Steel Charcoal) for contrast compliance.

---

### Task 1: Update Theme Color Variables

**Files:**
- Modify: `app/globals.css:1-20`
- Test: Run validation scripts

**Interfaces:**
- Consumes: None
- Produces: Updated theme colors site-wide

- [ ] **Step 1: Modify globals.css color values**

Edit the `@theme` block in `app/globals.css` to use:
```css
@theme {
  --color-primary: #3E5167;
  --color-primary-hover: #2B3847;
  --color-gold: #BD8545;
  --color-gold-hover: #9C6D32;
  --color-bg-soft: #FAF9F6;
  --font-serif: "Cormorant Garamond", serif;
  --font-sans: "Outfit", sans-serif;
}

body {
  background-color: #ffffff;
  color: #1C2430;
  font-family: var(--font-sans);
}
```

- [ ] **Step 2: Run Jest test suite to verify no regressions**

Run: `npm run test`
Expected: All 23 tests pass cleanly.

- [ ] **Step 3: Run linter to verify syntax correctness**

Run: `npm run lint`
Expected: Clean exit (no lint issues).

- [ ] **Step 4: Run production build compilation**

Run: `npm run build`
Expected: Next.js static output builds successfully.

- [ ] **Step 5: Commit changes**

Run:
```bash
git add app/globals.css
git commit -m "style: redesign brand colors to Wood & Steel Blue theme (Option A)"
```
