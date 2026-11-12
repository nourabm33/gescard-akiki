# Gescard Akiki V3 quality report

Assessment date: 12 November 2026. This is an evidence-based internal review against the V3 brief, not a third-party certification, legal opinion, or live lead-performance report.

## Assessment

The owner supplied an initial **60/100 estimate** based on a crawl of 13 pages. That crawl did not include a category breakdown, Lighthouse, Search Console, or field-performance data. I have not reconstructed category-level baseline marks from that single total. The baseline findings below come from the owner's description and checks of the existing V2 site.

| Category | Max | V2 baseline finding | V3 points | Evidence and remaining gap |
| --- | ---: | --- | ---: | --- |
| Content quality and usefulness | 20 | The owner described thin content. The site had little buyer guidance and no explained consultation process. | **17** | Adds researched buyer FAQs, a four-step consultation process, expanded professional biography, and distinct buyer considerations on all five development pages. Project permissions and some primary developer facts still need review. |
| Lead generation and conversion functionality | 20 | Enquiries depended on external WhatsApp and email links; there was no website submission workflow. | **13** | Adds a short project-aware form, server-side validation, Turnstile verification, honeypot, rate limit, duplicate prevention, provider idempotency, truthful delivery state, and fallback channels. Thirteen tests pass. It is not live: Worker, Turnstile, Resend, recipient, and inbox receipt still need owner setup and an authorised end-to-end test. |
| Professional trust and compliance readiness | 20 | The owner identified missing registration and compliance details. Existing awards and affiliation were not a substitute for a verified broker record or ad permits. | **14** | DLD showed broker 78844 and brokerage office 36052 with their displayed expiry dates; RichKey's site confirms the affiliation. The brokerage trade licence and required marketing permissions/permit IDs/QRs for the project material have not been supplied or verified. Legal and privacy review is pending. |
| Analytics and measurement | 15 | No analytics or conversion measurement was configured. | **10** | Adds opt-in GA4 with denied advertising consent, withdrawal support, documented events, and lead counting only after provider acceptance. No GA4 property/ID is configured, so no tag or visitor data is active and no traffic results are claimed. |
| SEO and technical reliability | 15 | Custom-domain routes were canonical, but the old `/gescard-akiki/` paths returned 404. | **14** | Checked all 13 production routes, canonical URLs, sitemap, and robots file; added redirects for legacy prefixed URLs; V3 export check covers 463 internal links/assets. Lighthouse SEO scored 100 on the tested V3 home, Contact, and project pages. One point remains for deployment and Search Console verification after approval. |
| UX, accessibility and performance | 10 | The site had no approved cinematic background footage and had form-label contrast issues. | **7** | Adds two real-video placements with keyboard-accessible controls, poster/mobile/reduced-motion fallbacks, deferred playback, and offscreen pausing. V3 Lighthouse accessibility scored 100 and CLS was 0 on the tested pages. Mobile performance is mixed and needs more optimisation; see measurements below. |
| **Total** | **100** | **Owner estimate: 60/100** | **75/100** | A 90+ result is not supported yet. The 75 is an internal rubric score; the owner's 60 remains the only provided baseline total. |

## Route and browser evidence

- On 12 November, all 13 live canonical pages returned HTTP 200 with matching canonical URLs. The old custom-domain paths `/gescard-akiki/contact/` and `/gescard-akiki/properties/` returned 404 before this change. V3 now exports redirects for the legacy prefixed routes.
- The static export link check examined 463 internal links and assets. It found no remaining repository-prefix internal URLs. The production routes were verified separately; redirects still need to be checked after the approved GitHub Pages deployment.
- Browser checks covered project enquiry prefill, required-field validation, legacy redirects, FAQ interaction, desktop muted video, keyboard pause/resume, offscreen pausing, and mobile/reduced-motion static fallbacks.
- `npm run test`: 13 tests passed across 4 files. This includes Worker input/origin/spam/rate-limit/provider-failure cases and consent/event privacy cases. `npm run lint` (ESLint and TypeScript) passed. Wrangler deployment was dry-run only; no endpoint was deployed and no email was sent.

## Lighthouse measurements

Measurements use Lighthouse 13.6.0 / Chrome 157. The production V2 baseline was measured on the actual custom domain with mobile throttling. V3 measurements use the exported static build on localhost with matching Lighthouse settings; these are lab results and do not represent field users or a production deployment.

| Page and environment | Performance | Accessibility | SEO | LCP | TBT | CLS | Transferred resources |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| V2 home, production mobile baseline | 64 | 100 | 100 | 4.1 s | 1,030 ms | 0 | 562 KiB |
| V2 Contact, production mobile baseline | 85 | 97 | 100 | 2.7 s | 460 ms | 0 | 364 KiB |
| V2 Marèva page, production mobile baseline | 89 | 97 | 100 | 3.6 s | 100 ms | 0 | 780 KiB |
| V3 home, exported desktop video test | 95 | 100 | 100 | 1.5 s | 0 ms | 0 | 1,246 KiB |
| V3 Contact, exported mobile | 79 | 100 | 100 | 5.2 s | 130 ms | 0 | 687 KiB |
| V3 Marèva page, exported mobile | 75 | 100 | 100 | 5.9 s | 180 ms | 0 | 821 KiB |

Three paired local mobile homepage runs had wide variance. Median Lighthouse performance was 74 before and 67 after; median LCP improved from 7.184 s to 6.842 s, while median TBT increased from 139 ms to 358 ms. Transferred bytes fell from 1,115,161 to 1,059,527 (about 5%). These runs do **not** establish a mobile performance improvement: the performance score and blocking time regressed in the paired sample. Desktop was strong, but the mobile homepage needs further work before the performance requirement can be considered complete. No Search Console access or field-data report was available, so INP and real-user Core Web Vitals are unknown.

## Video edits

Source supplied by Gescard: `WhatsApp Video 2026-11-11 at 19.42.06.mp4`, 36.375 seconds, 1024×576, 24 fps, H.264 video and AAC audio. The two selected clips retain the source footage and remove audio:

| Clip | Source selection | Encoded asset | Poster sizes | Placement |
| --- | --- | ---: | ---: | --- |
| Arrival / award handoff | Starts at 00:02.92; 4.667 s output | 864×486 H.264 MP4, 494,716 bytes | 480 px: 14,058 bytes; 960 px: 30,136 bytes | Homepage hero, desktop only, deferred muted loop with pause control |
| RichKey team awards | Starts at 00:33.54; 2.792 s output | 864×486 H.264 MP4, 304,565 bytes | 480 px: 14,310 bytes; 960 px: 29,476 bytes | About page, manual play with pause control |

The second edit is slightly shorter than the suggested 3–7 seconds because the source only provides a brief, usable group shot. It is click-to-play, so the user controls whether it moves. Mobile, reduced-motion, low-power and save-data cases use static posters. Only the visible page's video can play; failed playback retains the poster.

## Release blockers for 90+ and production activation

Keep the pull request in draft until these items are resolved. The V3 branch is not deployed by this work.

1. **Project marketing:** Have the brokerage classify each Dubai and Abu Dhabi project page, card, CTA, and render. Obtain the applicable developer/brokerage authorisation and permit IDs/QRs before approving regulated material. If permission is absent, remove or withhold the affected material before merging. This PR does not claim legal compliance.
2. **Brokerage records:** Review the displayed broker and office records against current organisation-held documents; provide the brokerage trade licence if its number is to be shown.
3. **Enquiry service:** Approve the recipient, inbox access, retention and privacy wording; configure organisation-owned Cloudflare, Turnstile and Resend; then verify an actual received email and failure path. Until then, the direct endpoint is intentionally absent and the form uses its existing WhatsApp/email continuation.
4. **Measurement:** Approve the GA4 property and event plan, configure its ID, and test opt-in, decline, withdrawal, and event receipt. No analytics account or historical results are represented as configured.
5. **Mobile performance:** Investigate the measured TBT increase and repeat controlled mobile runs after the next optimisation. Compare field Core Web Vitals once Search Console or equivalent data is available.
6. **Release:** Review the Privacy Policy, Terms, marketing classifications and final rendered pages with the brokerage and its qualified UAE adviser. Then merge only with owner approval and verify all routes, redirects, form, analytics and pages on the live custom domain.

The current score is therefore **75/100**, not 90+. The V3 changes materially improve the site's content and capability, but external approvals and measurable mobile-performance work remain necessary before a higher score is defensible.
