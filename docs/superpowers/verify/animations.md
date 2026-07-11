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
