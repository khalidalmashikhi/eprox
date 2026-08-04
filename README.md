# EPROX — Technical & Technology Solutions

The first official digital presence of **EPROX** — a premium, bilingual
(Arabic / English) marketing website for a mobile spare-parts, repair, and
technology-solutions company.

Built as a single-page editorial experience with a bright, refined visual
system, an original SVG "exploded device" hero, and full RTL/LTR support.

---

## Technology stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript (strict) |
| UI | React 19 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) + design tokens |
| Motion | Framer Motion (reduced-motion aware) |
| Icons | lucide-react + custom inline SVG |
| Fonts | `next/font` — Inter (Latin) + IBM Plex Sans Arabic |
| i18n | Lightweight typed dictionaries under `/[locale]` routing |

No remote images, no CSS/JS CDNs, no 3D libraries — every visual is local
CSS/SVG for performance and reliability.

---

## Local setup

```bash
npm install
npm run dev
```

Then open:

- Arabic (default): <http://localhost:3000/ar>
- English: <http://localhost:3000/en>
- `/` automatically redirects to `/ar`.

### Other commands

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

---

## Language routes

| Route | Language | Direction |
| --- | --- | --- |
| `/ar` | Arabic | RTL |
| `/en` | English | LTR |

The language switch (navigation + footer) swaps the locale segment while
**preserving the current section hash**, so visitors stay where they were.

---

## Project structure

```
Eprox/
├─ public/
│  ├─ brand/eprox-logo.png     # website-safe logo (see below)
│  └─ icon.svg                 # local "E" monogram favicon (brand color)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx            # passthrough root layout
│  │  ├─ fonts.ts             # next/font setup
│  │  ├─ globals.css          # design tokens + Tailwind theme + type scale
│  │  ├─ robots.ts / sitemap.ts
│  │  └─ [locale]/
│  │     ├─ layout.tsx        # <html lang/dir>, metadata, static params
│  │     └─ page.tsx          # assembles all sections
│  ├─ components/
│  │  ├─ navigation/          # Navbar, LanguageLink
│  │  ├─ layout/              # Footer
│  │  ├─ sections/            # Hero, TrustStrip, About, Services, Parts,
│  │  │                        #   Repair, Why, Signature, Contact
│  │  ├─ visuals/             # HeroVisual, ServiceVisuals, CategoryIcons
│  │  └─ ui/                  # Reveal, SectionHeading
│  ├─ config/
│  │  ├─ site.ts              # name, locales, section ids, brand color
│  │  └─ contact.ts           # ← EDIT YOUR CONTACT DETAILS HERE
│  └─ content/
│     ├─ types.ts             # Dictionary shape
│     ├─ ar.ts / en.ts        # ← EDIT ALL COPY HERE
│     └─ index.ts
```

---

## The logo

- **Original source:** `D:\my backup\Eprox\Eproxlogo.png`
- **Website-safe copy:** `public/brand/eprox-logo.png`
  (auto-trimmed from the original 2000×2000 canvas to the logo's real
  horizontal bounds — the aspect ratio is **preserved**, never stretched).
- Referenced in code only as `/brand/eprox-logo.png`, rendered with
  `next/image` and `object-contain`.

To replace the logo, drop a new wide PNG at `public/brand/eprox-logo.png`
(keep a similar aspect ratio so navigation/footer spacing stays balanced).

---

## How to update content

### Contact details

Open **`src/config/contact.ts`** and fill in the fields:

```ts
export const contactConfig: ContactConfig = {
  phone: "",         // international, e.g. "9665XXXXXXXX"
  whatsapp: "",      // international, digits only
  email: "",
  instagramUrl: "",  // full https URL
  mapsUrl: "",       // full https URL
  addressAr: "",
  addressEn: "",
  hoursAr: "",       // e.g. "السبت - الخميس · 10ص - 10م"
  hoursEn: "",       // e.g. "Sat - Thu · 10am - 10pm"
};
```

Any field left as `""` is treated as "not provided": its button/link/row is
hidden automatically. If **all** fields are empty, the contact section shows
a polished "channels coming soon" state instead of empty buttons. When
WhatsApp is set, it becomes the primary CTA (and powers the "Check Part
Availability" button in the Spare Parts section with a prefilled message).

### Text / copy

All visible strings live in **`src/content/ar.ts`** and
**`src/content/en.ts`**, sharing the typed `Dictionary` shape in
`types.ts`. Edit these to change any heading, description, or label.

### Brand color

The burgundy was sampled directly from the logo (`#540A09`). To adjust it,
edit the CSS variables at the top of **`src/app/globals.css`**:

```css
--brand: #6e1013;       /* interactive burgundy */
--brand-deep: #540a09;  /* logo burgundy (buttons, signature) */
--brand-strong: #7d1418;
--brand-soft: #f7ecec;
```

`src/config/site.ts` also stores `brandColor` for reference.

---

## Accessibility & motion

- Semantic landmarks, ordered headings, visible focus rings, `aria-label`
  on icon-only controls, `aria-expanded`/`aria-modal` on the mobile menu.
- Mobile menu locks body scroll and closes on **Escape**.
- All motion is gated on `prefers-reduced-motion` — transforms and parallax
  collapse to short fades, and content is always fully visible.

---

## Deployment preparation

1. Set the real production origin in `src/config/site.ts` (`url`) so
   metadata, canonical/alternate links, `robots.txt`, and `sitemap.xml`
   point at the correct domain.
2. Fill in `src/config/contact.ts`.
3. `npm run build` — the site prerenders `/ar` and `/en` as static HTML.
4. Deploy to any Node/Next-compatible host (e.g. Vercel). No environment
   variables are required.

---

## Known limitations / awaiting real data

- **Contact channels** (`src/config/contact.ts`) are intentionally empty
  until the real phone / WhatsApp / email / social values are provided.
- **Production domain** in `site.ts` is a placeholder until deployment.
- Supported device brands are shown typographically (no third-party
  logos), and no prices, stats, warranties, or certifications are claimed —
  by design, pending confirmed business facts.
- The favicon is a local `E` monogram in the brand color, not the full
  horizontal logo (which is unsuitable for a square icon).
```
