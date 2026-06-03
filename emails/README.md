# Email templates

Bulletproof transactional templates for the Secret Shopper Resort Program.
Designs live in Figma file `h256vydF2QnvnqbYcZON2Q`
(`ShareLife-Secret-Shopper-Virtual-Travel-Club-Design`).

## Files

```
emails/
  welcome.html        # post-enrollment welcome email (Figma node 36:619)
  assets/             # all images referenced by the templates (PNG, exported from Figma)
  README.md
```

## Compatibility targets

Each template is built to render correctly in:

- Gmail (web, Android, iOS)
- Apple Mail (macOS, iOS)
- Yahoo Mail
- Outlook 2016 / 2019 / 2021 (Windows desktop)

## Build rules followed

- Table-based layout only (no `<div>` for layout, no flex, no grid)
- All CSS inline; `<style>` in `<head>` is **only** for resets + media queries
- `role="presentation"` on every layout `<table>`
- Max container width: 600px
- Responsive via percentage widths + `@media (max-width: 620px)` in `<head>`
- No CSS shorthand on `margin` / `padding` / `border` (Outlook breaks)
- Web-safe font stacks only: `Arial, Helvetica, sans-serif` + `Georgia` for the
  testimonial pull-quote glyph
- Every `<img>` has explicit `width`, `height`, `alt`, `border="0"`, and
  `display:block`
- MSO conditional comments for Outlook ghost columns and PNG dpi
- Pre-header text included via a hidden span

## Templating placeholders

The HTML is plain text — drop it into Handlebars / Mustache / Liquid /
React Email / your transactional provider's template engine and the placeholder
syntax `{{...}}` will Just Work. Variables expected:

| Placeholder           | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| `{{firstName}}`       | Recipient's first name (e.g. `Sarah`)                      |
| `{{ASSET_BASE_URL}}`  | CDN base URL for `emails/assets/` contents, no trailing `/` |
| `{{preferencesUrl}}`  | Manage email preferences URL                               |
| `{{privacyUrl}}`      | Privacy policy URL                                         |
| `{{termsUrl}}`        | Terms URL                                                  |
| `{{unsubscribeUrl}}`  | RFC-compliant one-click unsubscribe URL                    |
| `{{facebookUrl}}`     | Facebook profile URL                                       |
| `{{linkedinUrl}}`     | LinkedIn profile URL                                       |
| `{{twitterUrl}}`      | X / Twitter profile URL                                    |
| `{{instagramUrl}}`    | Instagram profile URL                                      |

If you don't have a templating layer yet, a single `String.replaceAll(...)`
loop or a tiny `mustache` call in the sender will do the trick.

## Image assets

All 13 image assets used by `welcome.html` were exported directly from the
Figma design and live in `emails/assets/`. Before sending you must host them
on a CDN (or any HTTPS origin) and set `{{ASSET_BASE_URL}}` to the path that
serves the contents of that folder — without a trailing slash.

For example, if you upload `emails/assets/*` to `s3://cdn-bucket/email/welcome/`
fronted by `https://cdn.sharelife.vacations`, then
`{{ASSET_BASE_URL}}` = `https://cdn.sharelife.vacations/email/welcome`
and the email's `<img src="{{ASSET_BASE_URL}}/logo-header.png" />` resolves to
`https://cdn.sharelife.vacations/email/welcome/logo-header.png`.

| File                   | Figma source name                  | Native size  | Rendered size (max) |
| ---------------------- | ---------------------------------- | ------------ | ------------------- |
| `logo-header.png`      | Secret Shopper Resort Program      | 641 × 115    | 320 × 58            |
| `hero-luxury.png`      | Luxury Resort Experience           | 1600 × 900   | 600 × 240           |
| `strip-resort-a.png`   | Data → Resort                      | 1600 × 900   | 268 × 180           |
| `strip-beach-a.png`    | Data → Beach Relaxation            | 1600 × 900   | 268 × 180           |
| `strip-resort-b.png`   | Data → Relaxing at Resort          | 1600 × 900   | 552 × 280           |
| `strip-beach-b.png`    | Data → Happy Couple                | 1600 × 900   | 552 × 280           |
| `partner-atlantis.png` | Atlantis                           | 600 × 139    | 120 × 28            |
| `partner-dreams.png`   | Dreams                             | 600 × 278    | 120 × 56            |
| `partner-sandals.png`  | Sandals                            | 589 × 175    | 120 × 36            |
| `partner-lifestyle.png`| Lifestyle Holidays                 | 591 × 119    | 120 × 24            |
| `partner-vidanta.png`  | Vidanta                            | 599 × 139    | 120 × 28            |
| `partner-secrets.png`  | Secrets                            | 572 × 277    | 120 × 58            |
| `logo-footer.png`      | Secret Shopper (mono footer)       | 641 × 115    | 160 × 29            |

Recommendations before uploading to your CDN:

- Re-encode photographic assets (`hero-*`, `strip-*`) as JPG quality 78–82
  (target ≤ 60 KB each). PNGs ship at 2–3 MB which is fine for the preview
  but slow for transactional sends.
- Always serve at **2× density** of the rendered size so the email looks crisp
  on Retina and high-DPI Windows. The current source PNGs from Figma are
  already 1600 × 900 — well above 2× requirements.
- Partner logos can stay as PNGs (transparent) and should be ≤ 20 KB each
  after re-optimization.

## Local preview

A live preview built from the source is wired through the Vite dev server.

1. The build step copies `emails/assets/*` to `public/email-assets/welcome/`
   and substitutes `{{ASSET_BASE_URL}}` → `/email-assets/welcome` plus all
   other `{{placeholder}}` tokens.
2. Output is written to `public/email-preview.html`.
3. With `npm run dev` running, open
   <http://localhost:5173/email-preview.html> in any browser.

To regenerate the preview after editing `welcome.html`:

```bash
# from project root
mkdir -p public/email-assets/welcome
cp emails/assets/*.png public/email-assets/welcome/
python3 - <<'PY'
src = "emails/welcome.html"
dst = "public/email-preview.html"
subs = {
  "{{ASSET_BASE_URL}}":  "/email-assets/welcome",
  "{{firstName}}":        "Sarah",
  "{{preferencesUrl}}":   "#preferences",
  "{{privacyUrl}}":       "#privacy",
  "{{termsUrl}}":         "#terms",
  "{{unsubscribeUrl}}":   "#unsubscribe",
  "{{facebookUrl}}":      "#facebook",
  "{{linkedinUrl}}":      "#linkedin",
  "{{twitterUrl}}":       "#twitter",
  "{{instagramUrl}}":     "#instagram",
}
html = open(src).read()
for k, v in subs.items():
    html = html.replace(k, v)
open(dst, "w").write(html)
PY
```

Browser preview is a **layout check only** — Gmail / Outlook rendering is not
guaranteed to match it. Always test in real clients before going live.

## Testing in real clients

Recommended workflow before marking a template done:

1. **Inbox-level previews via Litmus or Email on Acid** — covers Gmail web /
   Android / iOS, Apple Mail (macOS + iOS), Yahoo, and the full Outlook 2016 /
   2019 / 2021 / Outlook.com matrix in one shot.
2. **Free fallback:** create test inboxes on Gmail, Yahoo, iCloud, and Outlook,
   send the rendered HTML via `curl` to a transactional API (Resend / Postmark
   / SendGrid sandbox), and inspect each.
3. Specifically verify:
   - The dark navy header gradient renders (Outlook will show a flat
     `#1e3a5f` — that's expected because Outlook ignores `background-image`).
   - The 2-up image strips, 2×2 benefit cards, and 2×3 partner grid stack
     correctly under 620px in Gmail's mobile app.
   - The testimonial pull-quote glyph (Georgia `&ldquo;`) renders.
   - The pre-header text shows in the inbox preview after the subject line.
   - All `{{placeholder}}` tokens have been substituted before sending.

## When you're ready to wire up sending

The `App.handleSubmitted(lead)` callback in `src/App.tsx` already receives
`{ firstName, lastName, email, phone }` from `QuizForm`. The simplest path is:

1. Stand up a serverless function (Vercel / Netlify / Cloudflare).
2. POST the lead from `handleSubmitted` to that function.
3. Have the function read `emails/welcome.html`, run
   `String.replaceAll('{{firstName}}', lead.firstName)` (plus the other
   placeholders), and forward the rendered HTML to your provider's send
   endpoint (Resend, Postmark, SendGrid, SES — all accept raw HTML).
4. Don't forget to set the `From`, `Subject`, `Reply-To`, and a plain-text
   alternate (most transactional providers can auto-generate the latter).
