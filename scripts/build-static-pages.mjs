import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = resolve(import.meta.dirname, "..");
const outputDir = join(projectRoot, ".github-pages");
const clientDir = join(projectRoot, "dist", "client");
const workerPath = join(projectRoot, "dist", "server", "index.js");
const routes = [
  "/",
  "/calendar",
  "/trips/great-southern-touring-route",
  "/trips/hamilton-island-working-week",
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
    new Request(`https://brianmb99.github.io${route}`, {
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
  await writeFile(destination, await response.text(), "utf8");
}

await writeFile(join(outputDir, ".nojekyll"), "", "utf8");
await writeFile(
  join(outputDir, "404.html"),
  '<!doctype html><meta charset="utf-8"><title>42 Weeks</title><script>location.replace("/");</script>',
  "utf8",
);

console.log(`Generated ${routes.length} routes in ${outputDir}`);
