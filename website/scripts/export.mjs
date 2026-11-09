import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const siteDir = fileURLToPath(new URL("../", import.meta.url));
const next = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const build = spawnSync(process.execPath, [next, "build"], {
  cwd: siteDir,
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: "/gescard-akiki",
    NEXT_PUBLIC_SITE_URL: "https://nourabm33.github.io/gescard-akiki",
  },
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

await import("./publish.mjs");
