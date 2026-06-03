# Purity & Isaiah — Songs of Song 2026 💍

An elegant, fully responsive wedding website built with **Yarn + Vite + React + TypeScript**.
It reimagines the original announcement site as a richer, animated single-page experience.

## ✨ Features

- **Preloader splash** with animated monogram, plus a gentle **falling-petals** overlay
- **Hero** with full-screen photo, animated zoom and a live **countdown timer** to the wedding day
- **Our Story** with a scroll-animated alternating **timeline**
- **Bride & Groom** profile cards (bio, education, roles, favourites, Facebook link)
- **Kingdom-Driven Marital Goals** card grid
- **Wedding Details** — three events with an interactive **Google Maps** embed per venue and
  **Add-to-Calendar** buttons (Google Calendar link + downloadable `.ics` for Apple/Outlook)
- **Gallery** — filterable masonry grid with a full **lightbox** (keyboard + arrow navigation)
- **Wedding Program** timeline
- **Accommodation & Travel** — hotel cards with call / map links and airport info
- **FAQ** accordion with the **Colours of the Day (Aso-Ebi)** swatches
- **Guestbook / Well-Wishes wall** — guests post messages that appear live on the page
- **Gifts** — bank account cards with one-tap **copy-to-clipboard**
- **RSVP form** with validation, conditional fields and a thank-you state — submits to **Formspree**
  when configured, always keeps a `localStorage` backup
- **Share the joy** — WhatsApp, Facebook, native share sheet and copy-link buttons
- **Dark / light theme** toggle (remembers your choice, respects system preference)
- **Background music** toggle, **back-to-top** button, sticky nav with scroll-spy
- Smooth scroll-reveal animations throughout (respects `prefers-reduced-motion`)
- **PWA**: installable to a home screen and works offline (service worker + manifest)
- **Social preview**: Open Graph + Twitter meta and a generated share image (`public/og-image.png`)
- Accessible **skip-to-content** link and keyboard-friendly controls

## 🚀 Getting started

```bash
yarn install     # install dependencies
yarn dev         # start the dev server (http://localhost:5173)
yarn build       # type-check + production build to /dist
yarn preview     # preview the production build locally
```

## 🛠 Customising content

Almost everything lives in **`src/data/wedding.ts`** — names, dates, story,
profiles, goals, events, program, gift accounts, gallery and nav links.
Edit that one file to update the whole site.

- **Photos:** add real images to `public/gallery/` and point `gallery[].src` at
  `./gallery/your-photo.jpg`. Swap `bride.photo` / `groom.photo` and the hero
  background in `src/components/Hero.css`.
- **Music:** drop `wedding-theme.mp3` in `public/music/` to enable the audio button.
- **Colours / fonts:** tweak the CSS variables at the top of `src/index.css`.
- **RSVP backend (Formspree):** create a free form at [formspree.io](https://formspree.io),
  copy your endpoint (e.g. `https://formspree.io/f/abcdwxyz`) and paste it into
  `rsvpEndpoint` in `src/data/wedding.ts`. Responses will then be emailed to you, and a
  `localStorage` backup is always kept regardless.
- **Guestbook:** messages save to the visitor's browser (`localStorage`). To collect them
  centrally so everyone sees the same wall, connect a small backend (Firebase Firestore or a
  Google Sheet via Apps Script) in `src/components/Guestbook.tsx`.
- **Add-to-Calendar / hotels / FAQ:** event times live on `weddingEvents[].startISO/endISO`,
  hotels in `hotels`, questions in `faqs`, and the Aso-Ebi colours in `colourOfTheDay` — all in
  `src/data/wedding.ts`.

## 🖼 Social share image

`public/og-image.png` (1200×1200) is what shows when the link is shared on
WhatsApp/Facebook/X. It was generated from `public/og-image.svg` — edit the SVG
and re-export to PNG to change it (any SVG→PNG tool, or macOS Quick Look).

## 📲 PWA (installable / offline)

The site ships a web manifest (`public/manifest.webmanifest`) and a service
worker (`public/sw.js`) registered in `src/main.tsx` for production builds.
Visitors can "Add to Home Screen" and the site keeps working offline after the
first visit. Bump the `CACHE` version string in `sw.js` when you ship updates.

## 📦 Deploying to GitHub Pages

`vite.config.ts` uses `base: './'` so the build works from any sub-path.

A ready-made workflow lives at `.github/workflows/deploy.yml`: push to `main`,
then in your repo go to **Settings → Pages → Source = "GitHub Actions"**. It
installs with Yarn 4, runs `yarn build`, and publishes `dist/` automatically.

Prefer manual? Run `yarn build` and publish the `dist/` folder yourself.

---

_“Many waters cannot quench love, neither can the floods drown it.” — Song of Solomon 8:7_
