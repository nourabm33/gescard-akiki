import { mkdir, readFile, writeFile } from "node:fs/promises";

const out = new URL("../out/", import.meta.url);
const sitemap = await readFile(new URL("sitemap.xml", out), "utf8");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)];

for (const [, location] of locations) {
  const { pathname } = new URL(location);
  if (!/^\/(?:[a-z0-9-]+\/)*$/.test(pathname)) continue;
  const directory = new URL(`gescard-akiki${pathname}`, out);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${location}">
<meta http-equiv="refresh" content="0; url=${pathname}">
<title>Page moved | Gescard Akiki</title>
<script>location.replace(${JSON.stringify(pathname)} + location.search + location.hash)</script>
</head><body><p><a href="${pathname}">Continue to Gescard Akiki</a></p></body></html>
`);
}
