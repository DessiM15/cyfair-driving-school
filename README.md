# Cy Fair Driving School — Website

A rebuild of [cyfairdrivingschool.com](https://www.cyfairdrivingschool.com/): same business, same facts, presented properly. Fully bilingual (English + Spanish), mobile-first, and built for local SEO.

Built by [Smart Scale](https://smartscaleagent.com).

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Requires Node 18+ (developed on Node 22).

## Deploying

Push to `main` and import the repo in Vercel. No environment variables are required — the site is fully static apart from a small middleware for locale routing. Vercel's defaults for Next.js 15 are correct as-is.

---

## What's here

**94 statically generated pages** — every route in both languages.

| Route | Notes |
|---|---|
| `/` | Video hero, courses, stats, service-area map |
| `/teen-driving-classes` | Course breakdown + FAQ (with FAQ schema) |
| `/adult-drivers-education` | 6-hour course, Spanish availability featured |
| `/road-tests` | $75 price, three locations, requirements by age |
| `/defensive-driving` | |
| `/road-test-checklist` | **Interactive** — tick-through readiness list, printable |
| `/find-your-course` | **Interactive** — 3-question quiz, prefills the contact form |
| `/approved-road-test-locations` | Coverage map + all 28 communities |
| `/service-areas/[city]` | 28 city landing pages |
| `/instructors`, `/careers` | Instructor training + contractor opportunities |
| `/about-us`, `/meet-the-team`, `/reviews` | |
| `/contact-us`, `/online-payments`, `/privacy` | |

Spanish lives under `/es/...`. English keeps the original site's exact URL slugs so existing search rankings carry over.

---

## Architecture

```
src/
  app/[lang]/          all pages; [lang] is "en" | "es"
  components/          UI, all locale-agnostic
  content/
    site.ts            business facts (phone, address, prices, course hours)
    en.ts / es.ts      ALL copy, in both languages
    cities.ts          28 service areas
    images.ts          generated image manifest with per-locale alt text
    knowledge.ts       chatbot knowledge base
  lib/
    i18n.ts            locale helpers
    seo.tsx            metadata + JSON-LD builders
    chat.ts            chatbot intent matching
  middleware.ts        rewrites "/" → "/en" so English serves from the root
```

### Changing copy

Everything is in `src/content/en.ts` and `src/content/es.ts`. **No component contains hard-coded user-facing text.** `es.ts` is typed as `Dictionary` (derived from `en.ts`), so a missing translation is a compile error rather than a blank space on the page.

Business facts — phone, address, prices, course hours — live in `src/content/site.ts` and flow everywhere automatically.

### Adding a price

`site.ts` → `pricing`. Set a value from `null` to a number and it renders; leave it `null` and the UI says "call for pricing" instead. No layout changes needed.

---

## SEO

- Per-page titles, descriptions, OpenGraph and Twitter cards
- `hreflang` + canonical on every page, both directions, plus `x-default`
- JSON-LD: `DrivingSchool` / `LocalBusiness`, `WebSite`, `Course`, `FAQPage`, `Service`, `BreadcrumbList`
- `sitemap.xml` with reciprocal language alternates, and `robots.txt`
- Consistent NAP (name / address / phone) markup for local search
- 28 city pages cross-linked to each other and from the footer

---

## Accessibility & performance

- All motion respects `prefers-reduced-motion`
- Hero video does not load on reduced-motion, `Save-Data`, or 2G connections — the poster carries the hero instead
- Skip-to-content link, keyboard-navigable menus, focus-visible styles throughout
- Images served as AVIF/WebP via `next/image` with explicit `sizes`
- No third-party scripts, no tracking, no cookie banner needed

Two behaviours worth knowing about, both deliberate:
- **Refreshing always returns you to the top** of the page (`ScrollManager`), unless the URL has a `#hash`.
- **Clicking the logo returns to the homepage hero**, including when you're already on the homepage.

---

## Verified

`npm run build` completes clean, and a Playwright suite covers the interactive pieces:

- Chatbot answers pricing / course / Spanish / city questions, and correctly falls back when it doesn't know
- Quiz routes to the right course and carries the answer into the contact form
- Checklist ticking, progress, and age-group switching
- Contact form validation and success state
- Language toggle round-trips and stays on the same page
- Logo-click and refresh both return to top
- No hydration errors, no console errors, no horizontal overflow at 360 / 390 / 768px

---

## Before launch

See **[NOTES-FOR-LAUNCH.md](./NOTES-FOR-LAUNCH.md)** — it lists the handful of things that need the owner's input, including one factual inconsistency carried over from the current site.
