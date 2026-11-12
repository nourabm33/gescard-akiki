# Gescard Akiki | UAE Real Estate

Personal real estate brand website for Gescard Akiki, UAE real estate consultant with RichKey Properties.

Live: https://gescardakiki.com (GitHub Pages custom domain; the root `CNAME` file must stay)

## How this repository is organised

| Path | What it is |
| --- | --- |
| `website/` | Source code: Next.js (App Router) + TypeScript + Tailwind CSS |
| everything else at the root | The **generated static site** served by GitHub Pages. Do not edit by hand. |

GitHub Pages uses **Deploy from a branch → `main` → `/ (root)`**. `.nojekyll` makes Pages serve the `_next/` folder. The media refresh uses a separate GitHub Actions workflow.

## Develop

```bash
cd website
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint + TypeScript
npm test           # enquiry, analytics consent and media feed tests
```

## Publish a change

```bash
cd website
npm run export     # builds for https://gescardakiki.com (base path "") and copies the static site to the repo root
cd ..
# Commit the source and generated site to a feature branch and open a PR to main.
```

`npm run export` works on Windows, macOS and Linux. It pins the base path (`""`) and canonical URL (`https://gescardakiki.com`) in `website/scripts/export.mjs`, overriding any environment values. The export never deletes the root `CNAME` or `.nojekyll`.

## Editing content

All content lives in `website/src/data/`:

- `profile.ts`: contact details, socials, verified credentials and optional biography or languages
- `properties.ts`: individual listings and featured development profiles. Add an object and re-export to generate `/properties/<slug>/`. Use the optional `development` fields for project-wide facts and source links.
- `videos.ts` and `instagram.ts`: the pre-rendered media selection. See [media refresh setup](website/MEDIA-SETUP.md) to activate automatic updates.
- `services.ts`, `testimonials.ts`, `navigation.ts`

Property images go in `website/public/images/properties/` and are referenced as `/images/properties/<file>`.

### Images

Original photos are kept in `website/assets/originals/`. `npm run images` (Python + Pillow) regenerates the optimised WebP sizes in `website/public/images/` and `src/data/image-manifest.json`. Dubai architecture photos are illustrative stock images from Unsplash and are never presented as listings.

New client portraits and project renders are stored as web-ready copies only. See `website/CONTENT-SOURCES.md` for the asset references and content to confirm.

## Activation and review

See [V3 deployment and activation](website/V3-OPERATIONS.md) for direct enquiries, analytics, project marketing review and live checks.
