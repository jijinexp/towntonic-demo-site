# Design Spec: Color Palette Redesign (Option A: Wood & Steel Blue Industrial)

## 1. Background & Purpose
The website's original design utilized a Forest Green (`#1E3F2E`) and Antique Gold (`#B3925C`) color scheme. The user requested to transition the site's palette to mirror the aesthetic extracted from `images/floorshot2.jpeg`, which captures the cafe's actual interior styling: warm wooden surfaces, steel/slate blue frames, and warm sand/stone neutrals. 

Following a visual comparison review, the user approved **Option A: Wood & Steel Blue Industrial**.

---

## 2. Design Details

### 2.1 Theme Variables (`app/globals.css`)
We will modify the `@theme` directive in Tailwind CSS v4 to define the new brand tones:

*   **Primary Brand Color (Steel Blue):**
    *   `--color-primary`: `#3E5167`
    *   `--color-primary-hover`: `#2B3847`
*   **Secondary/Accent Color (Warm Timber Gold):**
    *   `--color-gold`: `#BD8545`
    *   `--color-gold-hover`: `#9C6D32`
*   **Body Text Color (Steel Charcoal):**
    *   `body { color: #1C2430; }`

---

## 3. Scope of Implementation
The colors are fully driven by the CSS variable definitions (`bg-primary`, `text-primary`, `hover:bg-primary-hover`, `text-gold`, etc.) across the application components. Updating the root variables inside [app/globals.css](file:///Users/jijinjohney/Projects/towntonic-demo-site/app/globals.css) will automatically propagate the color changes theme-wide.

We will verify:
1. Nav-bar, Buttons, Footers, and Interactive tabs render in the new Steel Blue tone.
2. Prices, selected filters, hover outlines, and booking wizard icons render in the new Warm Timber Gold tone.
3. The body font color uses high-contrast Steel Charcoal instead of standard slate.

---

## 4. Verification Plan
*   **Unit Tests:** Run `npm run test` to verify that no layout, rendering, or filter tests are broken by the theme swap.
*   **Linter:** Run `npm run lint` to guarantee syntax compliance.
*   **Build Verification:** Run `npm run build` to confirm static generation and compilation compile successfully.
