// Copies the static export (website/out) to the repository root, which GitHub Pages
// serves via "Deploy from a branch → main → / (root)".
// Files from the previous export are tracked in .published-files.json and removed first,
// so deleted pages don't linger. Source folders are never touched.
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const site = resolve(here, "..");
const out = join(site, "out");
const root = resolve(site, "..");
const manifestPath = join(root, ".published-files.json");
const protectedNames = new Set(["website", ".git", ".github", ".gitignore", "README.md", ".published-files.json", ".nojekyll", "CNAME"]);

if (!existsSync(join(out, "index.html"))) {
  console.error("No export found in website/out. Run `npm run build` first.");
  process.exit(1);
}

const previous = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : [];
for (const name of previous) {
  if (!protectedNames.has(name)) rmSync(join(root, name), { recursive: true, force: true });
}

const entries = readdirSync(out).filter((name) => !protectedNames.has(name));
for (const name of entries) cpSync(join(out, name), join(root, name), { recursive: true });

writeFileSync(join(root, ".nojekyll"), "");
writeFileSync(manifestPath, `${JSON.stringify(entries.sort(), null, 2)}\n`);
console.log(`Published ${entries.length} entries to the repository root.`);
