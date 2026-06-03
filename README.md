# Secret Shopper Resort Program

Single-page landing site for the Secret Shopper Resort Program — a complimentary
4-day / 3-night all-inclusive resort stay offered in exchange for guest-experience
feedback. Visitors complete a multi-step quiz, are flipped to a thank-you page,
and a Chatti Live chat widget opens for follow-up.

## Stack

- [Vite 5](https://vitejs.dev/) + [React 18](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [lucide-react](https://lucide.dev/) for icons
- [canvas-confetti](https://www.kirilv.com/canvas-confetti/) for the thank-you
  celebration burst
- Third-party: [Chatti Live](https://chattilive.ai/) chat widget

There is intentionally no backend or database wired up yet — quiz submissions
flow through `QuizForm.onSubmitted(lead)` into `App.handleSubmitted` and a
`dataLayer` push, ready for whichever backend you bolt on later.

## Getting started

```bash
npm install
npm run dev          # Vite dev server (http://localhost:5173 by default)
```

## Available scripts

| Command             | What it does                                         |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with HMR                   |
| `npm run build`     | Produce a production build in `dist/`                |
| `npm run preview`   | Serve the built `dist/` locally for a smoke test     |
| `npm run lint`      | Run ESLint over `**/*.{ts,tsx}`                      |
| `npm run typecheck` | Run TypeScript in `--noEmit` mode (no JS output)     |

## Project layout

```
index.html                 # Document shell (preconnect/preload, no Chatti CSS hide)
public/SecretShopper/      # Resort imagery, logos, hero/CTA videos
src/
  main.tsx                 # React root
  App.tsx                  # Landing page, lightweight client-side router,
                           #   Chatti widget loader (drawer mode by default)
  components/
    QuizForm.tsx           # 6-step lead-capture quiz
    TeamCollaborationSection.tsx
    ThankYouPage.tsx       # Post-submit page; auto-pops Chatti modal + confetti
    TermsPage.tsx          # /terms route
    PrivacyPage.tsx        # /privacy route
  index.css
```

## Chatti Live widget

`App.tsx` injects the Chatti widget script on mount with
`data-settings: '{"debug":false,"openChattiLive":"drawer"}'`, so the launcher's
default click action on the home page is **drawer**. The Thank-You page calls
`OpenChattiLive('modal')` explicitly on mount to auto-pop the modal there —
this overrides the default mode for that one page.

`index.html` includes `<link rel="preconnect">` and `<link rel="preload">` for
the Chatti origin so the widget script is fetched in parallel with the rest of
the page and is ready by the time it's needed.

## Performance notes

- Routes (`TermsPage`, `PrivacyPage`) and the post-submit `ThankYouPage` are
  loaded with `React.lazy` so the initial landing-page bundle is smaller.
- `vite.config.ts` pre-bundles `react`, `react-dom`, `lucide-react`, and
  `canvas-confetti` via `optimizeDeps.include` to avoid waterfall ESM requests
  in dev cold starts (especially for the ~25 lucide icons used on the landing
  page).
- Off-screen `<img>` tags use `loading="lazy"` and `decoding="async"`.
- Below-the-fold `<video>` tags use `preload="metadata"`; the LCP hero video
  uses `preload="auto"`.

The high-resolution PNGs in `public/SecretShopper/images/images/` (each ~2–3 MB)
and the three MP4s in `public/SecretShopper/media/` (13 / 13 / 22 MB) are still
the biggest perceived-load cost — re-encoding them as WebP/AVIF and shorter
H.264/AV1 cuts is the next big win when you're ready.

## Routes

The app uses a hand-rolled `pushState`/`popstate` router (no `react-router`
dependency) for two ancillary pages:

- `/`         — landing page
- `/terms`    — Terms page
- `/privacy`  — Privacy page

After form submission, the landing-page route stays at `/` but renders
`<ThankYouPage />` instead of the marketing sections.
