# Notes for launch

Things that need a decision, a real asset, or the owner's confirmation before this goes live. Ordered by how much they matter.

---

## 1. A factual inconsistency on the current site — needs confirming

The live teens page currently says:

> "The class is a **26 hour** course, which is separated into **24 hours** in the classroom and **14 hours** of in-car training."

24 + 14 = 38, not 26, so those three numbers cannot all be correct. Drivers-ed hours are a TDLR-regulated claim, so nothing was guessed.

**What this site does:** publishes only the components — *24 hours classroom, 14 hours in-car (7 behind-the-wheel + 7 observation)* — and states no total.

**What's needed:** the correct figures from the owner. Fix in `src/content/site.ts` → `teenCourse`; it updates every page and the chatbot at once.

---

## 2. Photography is stock — swap the ones that imply staff

All 41 photos are Pexels-licensed (free for commercial use, no attribution required). Nobody pictured is a Cy Fair instructor, student, or vehicle.

Handled carefully already:
- No stock face is ever captioned with a real person's name.
- The three Google reviews use **initials avatars**, not stock portraits — pairing a real reviewer's name with a stranger's photo would misrepresent an actual person.
- `/meet-the-team` does **not** invent instructor profiles. It says profiles are being prepared and points to the phone number.

**Highest value to replace with real photos** (in `public/images/`, keep the same filenames and everything updates):

| File | Currently | Should become |
|---|---|---|
| `lesson-coaching.jpg` | stock instructor in passenger seat | a real instructor teaching |
| `lesson-passenger.jpg` | stock | real instructor |
| `lesson-discuss.jpg` | stock | real instructor |
| `car-white.jpg` `car-parked.jpg` `car-lot.jpg` | generic sedans | the actual school vehicles |
| `class-diverse.jpg` `class-teacher.jpg` `class-lecture.jpg` | stock classrooms | the actual classroom |
| `houston-heights.jpg` | real Houston Heights photo | fine as-is, or the office exterior |

Alt text lives in `src/content/images.ts` (English and Spanish per image) — update it when a photo changes.

**Hero video** (`public/video/hero.mp4`) is a sunny American street. It was deliberately trimmed to a segment with no identifiable storefronts, after an earlier cut showed an "Orange County" sign. Replace with local Houston footage when available.

---

## 3. The Spanish needs a native-speaker read

Written in neutral Latin American Spanish (the Houston default), not machine-translated. It should still be reviewed by a native speaker before launch.

Everything is in **one file**: `src/content/es.ts`. No component contains Spanish, so edits are safe and fast.

The three testimonials are intentionally left **in English** in the Spanish dictionary — they are direct quotes from real reviewers, and translating what someone actually said would misrepresent them.

---

## 4. The contact form and chatbot do not send anything yet

This was the agreed demo scope. Both validate properly and show real success states, and **both say plainly on screen that nothing was sent** — no one is misled into thinking a message arrived.

**To make the form live:** `src/components/ContactForm.tsx` → `submit()`. Replace the `setTimeout` with a POST to an API route, then send from there (Resend, Formspree, whatever the owner prefers). The payload is already assembled in `values`.

**To make the chatbot live:** `src/lib/chat.ts` → `findAnswer()`. Replace its body with a Claude API call passing `src/content/knowledge.ts` as context. The widget only depends on the returned shape, so nothing else changes. Lead capture is in `ChatWidget.tsx` → `submitLead()`.

Remove the "Demo" badge (`dict.chatbot.demoBadge`) and the form notice (`dict.contact.form.demoNotice`) once they're wired up.

---

## 5. Pricing is mostly hidden — that likely costs leads

Only the road test price ($75, up to 3 attempts) is published on the current site, so it's the only one published here.

Teen, adult, and defensive driving currently render "call for current pricing". Competitors who publish prices tend to win comparison shoppers, so it's worth asking the owner for real numbers.

**To add one:** `src/content/site.ts` → `pricing`, change `null` to a number. It renders automatically; no design work needed.

---

## 6. Content the current site doesn't have

Worth collecting from the owner:

- **Hours of operation** — not published anywhere on the current site. Would improve the Google Business listing and the `LocalBusiness` schema.
- **Instructor bios and photos** — `/meet-the-team` is ready for them.
- **More reviews** — only three exist on the current site. The design handles any number.
- **Privacy policy** — the current text is a reasonable placeholder but is marked as such on the page and should be reviewed properly.

---

## 7. Redirects

`next.config.ts` already redirects the old footer URLs (`/about-us/contact-us`, `/about-us/reviews`, etc.) to their new flatter equivalents, so existing inbound links don't 404.

All other slugs are unchanged from the current site, so search rankings carry over.

---

## 8. Analytics

None installed — no tracking scripts, no cookie banner required. If the owner wants analytics, Vercel Analytics is one line in the layout and is cookieless.
