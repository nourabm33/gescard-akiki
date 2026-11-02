# Gescard Akiki | UAE Real Estate

Personal real estate brand website for Gescard Akiki, UAE real estate consultant with RichKey Properties.

Live (GitHub Pages): https://nourabm33.github.io/gescard-akiki/

## How this repository is organised

| Path | What it is |
| --- | --- |
| `website/` | Source code: Next.js (App Router) + TypeScript + Tailwind CSS |
| everything else at the root | The **generated static site** served by GitHub Pages. Do not edit by hand. |

GitHub Pages settings: **Source: Deploy from a branch → Branch: `main` → Folder: `/ (root)`**. No GitHub Actions and no `gh-pages` branch are used. `.nojekyll` makes Pages serve the `_next/` folder.

## Develop

```bash
cd website
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint + TypeScript
npm test           # unit tests (enquiry form validation / WhatsApp message)
```

## Publish a change

```bash
cd website
npm run export     # builds for /gescard-akiki and copies the static site to the repo root
cd ..
git add -A && git commit -m "Update site" && git push
```

`npm run export` sets `NEXT_PUBLIC_BASE_PATH=/gescard-akiki` and `NEXT_PUBLIC_SITE_URL=https://nourabm33.github.io/gescard-akiki`.
For a custom domain (e.g. `gescardakiki.com`), change both in `website/package.json` (base path `""`), add a `CNAME` file at the root, and re-run the export.

## Editing content

All content lives in `website/src/data/`:

- `profile.ts`: contact details, socials, biography, credentials, languages (biography/credentials/languages are empty until verified text is supplied)
- `properties.ts`: property listings (empty: the site shows a "request current opportunities" panel). Add an object to `properties` and re-export; the detail page `/properties/<slug>/` is generated automatically.
- `videos.ts`: YouTube videos (real IDs and titles from the official channel)
- `instagram.ts`: manually managed Instagram tiles
- `services.ts`, `testimonials.ts`, `navigation.ts`

Property images go in `website/public/images/properties/` and are referenced as `/images/properties/<file>`.

### Images

Original photos are kept in `website/assets/originals/`. `npm run images` (Python + Pillow) regenerates the optimised WebP sizes in `website/public/images/` and `src/data/image-manifest.json`. Dubai architecture photos are illustrative stock images from Unsplash and are never presented as listings.

## Before launch

- Have the Privacy Policy and Terms templates reviewed by a legal professional.
- Confirm the "Certified Senior Property Consultant" title and any credentials before adding them to `profile.ts`.
