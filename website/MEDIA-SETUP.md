# Automatic website media

GitHub Actions checks the official YouTube and Instagram APIs every six hours, at 00:17, 06:17, 12:17 and 18:17 UTC. GitHub can delay scheduled runs. Edit the cron in `.github/workflows/refresh-media.yml` to change the frequency. After merging to `main`, run **Actions → Refresh website media → Run workflow** for an immediate check.

The workflow updates a small JSON snapshot in the dedicated GitHub prerelease tagged `media-feed`. The existing Pages deployment still builds from `main` at the repository root. The browser reads the public snapshot through the GitHub REST API, with one shared request per page load and HTTP caching. The homepage shows up to three items from each platform, and Media shows up to six. The site displays its curated selection before the first successful refresh and when a snapshot is unavailable. If one API fails, the workflow keeps that platform’s latest successful snapshot and can publish the other platform’s update. The job reports the failure in Actions. API snapshots expire after 28 days. A successful refresh with no public results removes that platform’s cached cards while keeping the channel link.

## YouTube Data API

1. In Google Cloud Console, select a project and enable **YouTube Data API v3**.
2. Create an API key and restrict it to **YouTube Data API v3**. The scheduled runner makes server requests, so a browser referrer restriction would reject them.
3. In this GitHub repository, open **Settings → Secrets and variables → Actions → Secrets** and create `YOUTUBE_API_KEY`. Enter the value directly in GitHub.
4. Run the workflow. Confirm its YouTube log reports a successful refresh and open the website’s Media page.

The workflow gets the official uploads playlist, checks video metadata in batches, sorts newest first and includes public videos of at least 181 seconds by default. This excludes videos within YouTube’s three-minute Shorts limit. For a confirmed shorter regular video or an exception, edit `includeIds` or `excludeIds` in `website/media-sync.config.json`. The public status and channel checks still apply to overrides. Videos that disallow embedding link directly to YouTube.

## Instagram API with Instagram Login

1. Gescard should check **Account type and tools** in Instagram. The official API requires a public **Business** or **Creator** account. If the account is personal, Gescard needs to switch to a professional account before authorising it.
2. In Meta for Developers, create or select the app and configure **Instagram API with Instagram Login**. For an app in development, add Gescard’s account in **API setup with Instagram login → Generate access tokens** and have him accept the tester invitation in Instagram. If using an app to connect accounts outside its app roles, follow Meta’s Advanced Access and App Review requirements.
3. Have Gescard complete the Instagram Login consent. This integration reads public Reel metadata and needs only `instagram_business_basic`. Use the Meta dashboard token generator or the official Business Login token exchange to obtain a long-lived Instagram user access token.
4. Add the token directly as the GitHub Actions secret `INSTAGRAM_ACCESS_TOKEN`. Add `INSTAGRAM_API_VERSION` under **Actions → Variables**, using the supported version selected for the app, such as `v24.0` where available.
5. Run the workflow and confirm that it reports a successful Instagram refresh. It verifies that the token belongs to `gescard.akiki` and only includes items tagged as Reels. A public post link is available if Instagram blocks the embedded player.

Meta long-lived user tokens typically expire after 60 days. Refresh the unexpired token through Meta’s `ig_refresh_token` endpoint before it expires and replace the GitHub secret. If it has expired, repeat Instagram Login. For a revoked connection, remove the secret and run the workflow with **Clear previously authorised Instagram API data** selected.

Official references

- [YouTube Data API sample requests](https://developers.google.com/youtube/data/sample_requests)
- [YouTube Shorts eligibility](https://support.google.com/youtube/answer/15424877)
- [Meta’s Instagram API collection](https://www.postman.com/meta/instagram/collection/6yqw8pt/instagram-api)
- [Meta’s Business Login for Instagram](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login/)
- [GitHub Actions schedule and manual dispatch](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)

To test locally without credentials, run `npm test` and `node --test scripts/sync-media.test.mjs` from `website/`. These tests exercise both providers and the GitHub snapshot against fixture responses.
