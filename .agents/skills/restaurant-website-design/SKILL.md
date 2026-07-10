---
name: restaurant-website-design
description: Use this skill when the user is building, redesigning, critiquing, or planning a website for a restaurant, cafe, bar, food truck, or similar food-service business.
---

# Restaurant Website Design

Guidance for designing restaurant websites that convert visitors into diners. Based on the core insight: restaurant site visitors fall into three "missions," and the site should serve all three fast. Restaurant visitors typically decide whether to stay or bounce within **30–45 seconds**, so page structure and above-the-fold content carry outsized weight — see the sections below.

## Required Site Structure (Pages)

A restaurant site needs fewer pages than most business sites, but each must deliver its info with zero friction. Use this as the default sitemap when scoping or reviewing a build:

1. **Homepage** — name, cuisine type, atmosphere impression, location, plus the two primary CTAs (book a table + order online, if applicable).
2. **Menu** — HTML digital menu, readable on mobile without pinching/zooming, kept current.
3. **Reservations** — integrated booking system (embedded, not a redirect) — see Reservation System Comparison below.
4. **About/Story** — the concept, the chef, the origin story; content that justifies a destination visit rather than a quick default choice.
5. **Contact & Location** — address, phone, hours, embedded Google Maps, parking info.
6. **Gallery** — food photography and atmosphere photography.

Optional but valuable, especially for established restaurants: private dining/events page, gift vouchers, press/awards section.

## Above-the-Fold Homepage Requirements

The area visible without scrolling must answer "what kind of restaurant is this, and should I book?" in under 5 seconds. Include:

- A full-width hero image or video of food and/or atmosphere at their best.
- Restaurant name in the brand typeface.
- A one-line descriptor combining cuisine + location (e.g., "Modern Italian — Borough Market, London").
- **Two CTAs visible without scrolling:** "Reserve a Table" and "View Menu."
- Opening hours and location in the header or just below the hero.

A visible above-the-fold reservation button meaningfully outperforms one buried in navigation — OpenTable research found sites with the booking CTA above the fold get 37% more online bookings than those where it's tucked into the nav menu. Treat "is the booking button visible without scrolling or a menu click" as a hard check on any homepage build/critique.

## The Three Visitor Missions

Design every page with these in mind:
1. **The Planner** — researching a future visit (browsing menu, checking vibe/photos, maybe booking ahead).
2. **The Immediate Orderer** — hungry now, wants delivery/pickup with minimal friction.
3. **The On-the-Go Visitor** — just needs address, phone number, or hours, fast, usually on mobile.

If a design choice doesn't clearly serve one of these three, question it.

## Guest Behavior Data (why this matters)

From a 1,300-guest survey (Owner.com), the pattern is consistent across dine-in, delivery, and takeout:

- Guests default to **Google search** over apps/directories combined to find new restaurants — reinforces why the website itself (not just a marketplace listing) needs to be ordering-ready and SEO-solid.
- The large majority of guests check the **website before ordering delivery/takeout**, and most also check it **before dining in** — a website isn't just for online orderers, it's a first impression for everyone, dine-in included.
- The single most common reason guests visit the site is to **see the menu** — most look specifically for menu **photos** before deciding whether to order at all.
- A poor website or ordering experience directly costs orders — confusing sites and bad checkout flows are cited as reasons guests abandon an order.
- A great online experience makes guests far more likely to **reorder** — this is a retention lever, not just an acquisition one.
- Guests actively look for **reviews/social proof** and **special offers** on the site itself, not only on third-party platforms.

Practical implications to fold into design/critique work:
- **Never route orders off-site to a third-party OLO domain** — besides the commission/data-ownership issue already noted in Core Ingredient #4, sending guests off-domain to complete an order also works against the site's own SEO, since search engines favor sites where visitors can complete their goal without leaving.
- **Lead the homepage with a clear one-line headline** stating cuisine + place (e.g., "Handmade Sicilian recipes in Lakeside, CA") plus a hero shot of a signature dish — this is the single highest-leverage homepage change for conversion.
- **Fast checkout matters concretely** — offer one-tap payment options (e.g., Apple Pay) alongside manual entry; don't force long forms for guests who just want to reorder.
- **Put reviews/star ratings near the food**, not just on a separate testimonials page — social proof next to popular dishes reduces hesitation at the moment of decision.
- **Surface offers/promotions on-site**, especially for returning/logged-in guests — this is both a conversion and a retention lever.
- **A branded app or account/login layer for repeat guests** meaningfully increases reorder rate — worth flagging as a growth lever beyond the base website, even if out of scope for a first build.

## Four Core Ingredients (must-haves)

1. **Mouth-watering visuals** — Professional photography of food, interior, and staff. People "eat with their eyes first"; low-quality images undermine trust before anyone reads the menu. As a baseline: 8–15 professionally shot dishes, styled to match the actual cuisine and price point (e.g., minimalist dark-surface styling for fine dining vs. natural light and abundant plating for casual brunch spots), plus atmosphere shots taken *during service* (candlelit, populated, energetic) — empty-restaurant shots undersell the experience. Generic stock food photography is easy to spot and damages credibility, especially at premium price points.
2. **A real, accessible menu — never a PDF.** Menu should be:
   - Built as actual HTML (crawlable by Google, works with screen readers)
   - Mobile-friendly and easy to scan
   - Easy for restaurant staff to update without a developer
3. **NAP-H info everywhere** — Name, Address, Phone, Hours. Accurate, consistent, and visible on every page (typically the footer), since many visitors are about to call or are already en route.
4. **Integrated ordering & reservations** — Built into the site itself rather than only routed through third-party marketplace apps, which often take a large commission and withhold customer data from the restaurant. Third-party tools are fine as a backend, but keep the branding and flow consistent with the site.

## UX Principles

- **Mobile-first, non-negotiable.** Over 75% of restaurant site visitors are on mobile — often standing outside deciding whether to walk in, or booking that evening's table from a couch. Non-negotiable standards:
  - **Click-to-call**: phone number is a tappable `tel:` link, not plain text.
  - **Click-to-map**: address links straight to Google Maps/Apple Maps.
  - Menu readable without zooming or horizontal scrolling; no PDFs.
  - **Sticky booking button** — fixed in the header or bottom of screen, not buried behind a nav-menu tap.
  - **Page speed under ~2 seconds.** A 5-second mobile load loses roughly half of visitors before they see a single dish — treat load time as a conversion metric, not just a technical one.
- **Frictionless checkout/booking.** Minimize form fields, keep visual continuity from browse → order/reserve → confirm.
- **Fast, obvious primary action.** The homepage should make it obvious in one glance how to order, book, or find the place — don't bury the CTA.
- **Clear, intuitive navigation.** Visitors should reach menu, booking, and contact info in a few clicks with no dead ends — treat nav as a roadmap, not a maze. Confusing navigation reads as unprofessional and drives bounces.
- **Reservation system as a business lever, not just convenience.** Beyond letting guests self-serve a booking anytime, an online reservation system centralizes bookings (no double-booking from phone + walk-in), lets the restaurant set capacity rules for peak times/private events, and reduces no-shows/last-minute cancellations — directly protecting revenue.

## Brand & Visual Design

- **Color scheme.** Colors set emotional tone before a word is read — choose a palette that matches the restaurant's atmosphere and cuisine (e.g., warm tones for cozy/comfort food, dark/muted tones for upscale), and keep it consistent site-wide.
- **Typography.** Use clear, highly-legible fonts for menu items and practical info (hours, prices); more expressive/branded fonts are fine for headers and logotype. Consistency across pages signals professionalism.
- **Digital must match physical.** The website is the digital expression of the same brand expressed in the tableware, interior, and staff uniforms. A stark, elegant fine-dining interior paired with a bright, playful website (or vice versa) creates cognitive dissonance that suppresses bookings — check that typography, palette, and photography style on the site actually match the in-person experience before shipping.

## Reservation System Comparison

Whichever system is used, the booking flow must be **embedded in the site**, not a redirect to a third-party page — a redirect breaks brand continuity and converts worse than an in-brand flow.

| System | Best for | Trade-off |
|---|---|---|
| **OpenTable** | Established restaurants with consistent demand; wide US/CA/AU visibility via OpenTable's own app/search | Commission-based (~$1–$1.50/diner), but the extra discovery traffic often justifies it |
| **Resy** | Independent premium restaurants | Lower commission than OpenTable; strong with Michelin/premium-casual crowd |
| **SevenRooms** | Restaurant groups/venues wanting owned guest data | More comprehensive CRM, higher setup complexity |
| **Direct booking form (no third party)** | Small restaurants (under ~30 covers) without overflow-management needs | Zero commission, but no extra discovery/marketplace traffic |

## SEO Toolkit

Local SEO basics (Google Business Profile, location-specific keywords, locally-relevant content) still apply — see below — plus a broader on-site/off-site toolkit:

- **Keyword research.** Identify the actual phrases diners search (e.g., "best pizza near me," "romantic dinner spots") and work them naturally into page copy, not just generic dish names.
- **Engaging, original content.** Fresh, well-written content (blog posts, stories, seasonal menu features) both engages readers and improves search rankings — thin or duplicated content doesn't.
- **Backlinks.** Links from reputable external sites (local press, food bloggers, directories) signal credibility to search engines and boost rankings.
- **Social media integration.** Embedding/linking active social profiles (Instagram, Facebook, TikTok) on the site extends reach and reinforces community engagement.
- **Analytics & monitoring.** Track site performance (traffic, conversion from visit → order/booking, bounce rate) to make data-driven improvements rather than guessing.

## Local SEO Checklist

- Fully optimized **Google Business Profile**: accurate hours, verified location, current menu, real photos.
- Natural **location-specific keywords** in copy (e.g., "brick oven pizza in Brooklyn," not just "pizza").
- Locally-relevant content builds authority: community stories, local partnerships, neighborhood events.

## Matching Design to Restaurant Type

Pick a design language that matches the concept — don't default to one generic template.

| Type | Visual direction | Priority |
|---|---|---|
| Fine dining | Dark, minimalist, immersive photography/video, calm navigation | Atmosphere & prestige (e.g., Sushi Samba-style) |
| Fast-casual | Bright, bold "Order Online" CTAs, speed-optimized | Fast decisions, low friction |
| Neighborhood cafe | Warm colors, handwritten-style fonts, "Our Story" page, live social feed | Community & personality |

## How to Apply This Skill

When building or reviewing a restaurant website (including as a code/artifact deliverable):
1. Start from the **Required Site Structure** — confirm all core pages exist (Homepage, Menu, Reservations, About/Story, Contact & Location, Gallery) before going deeper on any one page.
2. Check the homepage's **above-the-fold** content answers "what kind of restaurant, should I book?" in under 5 seconds, with both CTAs visible without scrolling.
3. Identify which restaurant type/concept it is, and pick a matching visual direction from the type-matching table, plus a coherent color/typography choice from Brand & Visual Design — and verify it actually matches the physical space.
4. Check the four core ingredients are present and not compromised (especially: no PDF menus, NAP-H visible everywhere, orders/bookings completed on-domain not routed to a third-party redirect).
5. Walk through the **Reservation System Comparison** to pick/verify the right booking system for the restaurant's size and goals.
6. Confirm mobile standards are met concretely: click-to-call, click-to-map, sticky booking button, sub-2-second load.
7. Make sure the menu is photo-first, checkout supports fast one-tap payment, and reviews/offers are visible near the point of decision, not buried on separate pages.
8. If building for real deployment, flag the full SEO toolkit (Google Business Profile, keyword research, content, backlinks, social integration, analytics) even though most of it lives outside the site itself.
9. When presenting a critique, organize feedback under these same categories (Site Structure / Above-the-Fold / Guest Behavior Fit / Core Ingredients / UX & Mobile / Brand & Visual Design / SEO / Type Match) rather than as an unstructured list — it's easier for the user to act on.

Sources: adapted from "Ultimate Guide to Website Design for Restaurants That Converts" (dev.to), "14 Powerful Strategies for Restaurant Website Design" (easyeatsnz.co.nz), "New Data: 6 Ways Guests Judge Your Restaurant's Website" (owner.com, guest survey data), and "Web Design for Restaurants: What Every Site Needs" (madebyevoke.com).