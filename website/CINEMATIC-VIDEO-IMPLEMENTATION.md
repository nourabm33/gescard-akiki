# Cinematic video backgrounds

## Integration

The supplied 36-second WhatsApp video is the source for six short, silent background clips. Clips are 864×486 at 24 fps for desktop and 640×360 at 24 fps for phones. Each loops with a short crossfade between its end and start. The original full video is not shipped to visitors.

| Clip | Placement | Desktop MP4 | Mobile MP4 |
| --- | --- | ---: | ---: |
| Arrival | Home hero | 217 KB | 125 KB |
| Award moment | About hero | 252 KB | 152 KB |
| Team awards | About philosophy section | 387 KB | 225 KB |
| City walk | Expertise hero | 230 KB | 138 KB |
| Award stage | Media hero | 269 KB | 156 KB |
| Lobby walk | Contact hero | 355 KB | 202 KB |

Property listings and development pages keep their project imagery. The source video shows an awards event and office arrivals, not the developments themselves.

The poster is visible before video playback. Videos are muted, inline, and looped; only one background plays at a time. Playback starts when its section is visible, pauses and unloads when the section leaves the nearby viewport, and does not run when reduced motion, data saving, a 2G connection, or a low-memory/low-CPU device is detected. The user can pause or resume motion from the section control.

## Verification

The static export passed `npm run export`, `npm run lint`, `npm test` (15 tests), `node --test scripts/sync-media.test.mjs` (4 tests), and `work/check_v2_export.py` (473 local links, anchors, images, fonts and assets across 13 pages, plus SEO and GitHub Pages configuration).

An Edge Chromium browser audit against the local production export verified playback on desktop and phone-sized viewports for Home, About, Expertise, Media, and Contact. It confirmed successful `video/mp4` responses, advancing playback time, 864×486 desktop and 640×360 phone video dimensions, the About philosophy video after scrolling, pause/resume, offscreen unload, and poster-only rendering under reduced motion. Screenshots and the machine-readable audit are kept outside the repository under `work/v3-video/`.

Lighthouse was run against two builds served locally with identical Edge settings: the `main` export and this updated export. Median results were:

| Profile | Performance score | LCP | TBT | CLS | Transferred bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| Desktop, main | 94.5 | 1.55 s | 2 ms | 0.00 | 1,276,362 |
| Desktop, updated | 95 | 1.53 s | 2 ms | 0.00 | 1,290,525 |
| Mobile, main | 76 | 6.80 s | 60 ms | 0.00 | 1,059,544 |
| Mobile, updated | 76 | 6.78 s | 60 ms | 0.00 | 1,069,938 |

Lighthouse's emulated run fetched the poster but did not request media. The separate playback audit requested each MP4 successfully. Actual background files remain below 388 KB on desktop and 226 KB on mobile; nearby-section loading and single-player arbitration keep other clips out of active playback.

The Codex in-app browser connector was unavailable for this session, so verification used the installed Microsoft Edge Chromium engine against the local production export. A physical phone and Safari were not available for testing.
