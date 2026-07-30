import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = resolve(import.meta.dirname, "..");
const outputDir = join(projectRoot, ".github-pages");
const clientDir = join(projectRoot, "dist", "client");
const workerPath = join(projectRoot, "dist", "server", "index.js");
const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";
const siteOrigin = "https://brianmb99.github.io";
const routes = [
  "/",
  "/calendar",
  "/trips/great-southern-touring-route",
  "/trips/hamilton-island-working-week",
  "/trips/whitsundays-sea-kayaking/hook-island-reef",
  "/trips/whitsundays-sea-kayaking/whitehaven-henning-paddle",
  "/trips/whitsundays-sea-kayaking/whitehaven-chance-henning",
  "/trips/whitsundays-sea-kayaking/planning-booking",
  "/trips/longreach-outback-working-week",
];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });

const workerUrl = pathToFileURL(workerPath);
workerUrl.searchParams.set("static-pages", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`${siteOrigin}${route}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  if (!response.ok) {
    throw new Error(`Could not render ${route}: ${response.status}`);
  }

  const destination =
    route === "/"
      ? join(outputDir, "index.html")
      : join(outputDir, route.slice(1), "index.html");
  await mkdir(dirname(destination), { recursive: true });
  const html = (await response.text()).replace(
    /(?<![A-Za-z0-9_.-])\/assets\//g,
    `${siteBasePath}/assets/`,
  );
  await writeFile(destination, html, "utf8");
}

async function prefixAssetReferences(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await prefixAssetReferences(path);
    } else if (/\.(?:css|js)$/.test(entry.name)) {
      const source = await readFile(path, "utf8");
      const updated = source.replace(
        /(?<![A-Za-z0-9_.-])\/assets\//g,
        `${siteBasePath}/assets/`,
      );
      if (updated !== source) await writeFile(path, updated, "utf8");
    }
  }
}

await prefixAssetReferences(join(outputDir, "assets"));
await writeFile(join(outputDir, ".nojekyll"), "", "utf8");
await writeFile(
  join(outputDir, "404.html"),
  `<!doctype html><meta charset="utf-8"><title>42 Weeks</title><script>location.replace("${siteBasePath}/");</script>`,
  "utf8",
);

console.log(`Generated ${routes.length} routes in ${outputDir}`);
