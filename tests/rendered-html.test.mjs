import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
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
}

test("server-renders the 42 Weeks planner", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>42 Weeks/);
  assert.match(html, /Trip timeline/i);
  assert.match(html, /Full trip/);
  assert.match(html, /Click a location to zoom into it/);
  assert.match(html, /Melbourne/);
  assert.match(html, /Copenhagen/);

  const plannerSource = await readFile(
    new URL("../app/planner.tsx", import.meta.url),
    "utf8",
  );
  assert.match(plannerSource, /Portugal.s Algarve & Alentejo Family Multi-Adventure/);
  assert.match(plannerSource, /Basque Country Family Multi-Adventure/);
  assert.match(plannerSource, /Alps hiking trip/);
  assert.match(plannerSource, /Normandy and World War history trip/);
  assert.match(plannerSource, /Paris and the Eiffel Tower/);
  assert.match(plannerSource, /title: "Berlin"/);
  assert.match(plannerSource, /title: "Italy"/);
  assert.match(plannerSource, /Speculative work and non-work days/);
  assert.match(plannerSource, /"six-weeks"/);
  assert.match(plannerSource, /"two-weeks"/);
  assert.match(
    plannerSource,
    /https:\/\/www\.backroads\.com\/trips\/MPGIF\/portugals-algarve-alentejo-family-multi-adventure-tour/,
  );
  assert.match(
    plannerSource,
    /https:\/\/www\.backroads\.com\/trips\/MBIIF\/basque-country-family-multi-adventure-tour/,
  );
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the separate zoomable calendar prototype", async () => {
  const response = await render("/calendar");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Calendar prototype/);
  assert.match(html, /Trip calendar/);
  assert.match(html, /Exact working dates/);
  assert.match(html, /Current planner/);
  assert.match(html, /data\/trip-plan\.json/);
  assert.match(html, /Dates run top to bottom/);
  assert.match(html, /Overview/);
  assert.match(html, /Weeks/);
  assert.match(html, /Days/);
  assert.doesNotMatch(html, /Things under consideration/);
});
