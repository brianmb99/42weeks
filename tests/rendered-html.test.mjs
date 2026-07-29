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

test("server-renders the expandable weekly working calendar", async () => {
  const response = await render("/calendar");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Working calendar/);
  assert.match(html, /40<!-- --> weeks/);
  assert.match(html, /\+ 5 days/);
  assert.match(html, /285<!-- --> days/);
  assert.match(html, /Current planner/);
  assert.match(html, /data\/trip-plan\.json/);
  assert.match(html, />Work</);
  assert.match(html, />Travel</);
  assert.match(html, />Not working</);
  assert.match(html, />Vacation</);
  assert.match(html, />Fixed event</);
  assert.match(html, />\+ all</);
  assert.match(html, />− all</);
  assert.match(html, /W<!-- -->01/);
  assert.match(html, /W<!-- -->41/);
  assert.match(html, /Expand week 8, Nov 6 to Nov 12/);
  assert.match(html, /2028-03-12: not working/);
  assert.match(html, /New Hampshire/);
  assert.match(html, /Geelong/);
  assert.match(html, /Great Southern Touring Route/);
  assert.match(html, /Expand all weeks in GSTR/);
  assert.match(html, /Melbourne/);
  assert.match(html, /Brisbane area/);
  assert.doesNotMatch(html, /AFL (semifinal|Grand Final)/);
  assert.match(html, /NYSE closed — Thanksgiving Day/);
  assert.match(html, /NYSE closes 1:00 p\.m\. — Day after Thanksgiving/);
  assert.match(html, /NYSE holiday calendar/);
  assert.match(html, /Expand all weeks in Melbourne/);
  assert.match(html, /aria-pressed="false"/);
  assert.doesNotMatch(html, />Location</);
  assert.doesNotMatch(html, /Things under consideration/);
  assert.doesNotMatch(html, />Anchor<|Maximum 90-day|max 90-day/i);
  assert.doesNotMatch(html, />Overview<|>Weeks<|Dates run top to bottom|Spacing reflects elapsed time/);

  const tripPlan = JSON.parse(
    await readFile(new URL("../data/trip-plan.json", import.meta.url), "utf8"),
  );
  const datedEvents = tripPlan.timeline.filter((entry) => entry.type === "event");
  assert.equal(datedEvents.length, 5);
  assert.ok(datedEvents.every((entry) => typeof entry.fixed === "boolean"));
  assert.equal(datedEvents.filter((entry) => entry.fixed).length, 2);
  assert.equal(tripPlan.rules.length, 2);
  assert.equal(tripPlan.dayPlanning.weekdayDefault, "work");
  assert.equal(tripPlan.dayPlanning.weekendDefault, "off");
  assert.equal(tripPlan.dayPlanning.marketHolidayDefault, "off");
  assert.equal(tripPlan.dayPlanning.marketEarlyCloseDefault, "work");
  assert.equal(tripPlan.dayPlanning.overrides.length, 10);
  assert.deepEqual(
    tripPlan.dayPlanning.overrides.map((entry) => entry.date),
    [
      "2027-09-27",
      "2027-09-28",
      "2027-09-29",
      "2027-09-30",
      "2027-10-01",
      "2027-12-27",
      "2027-12-28",
      "2027-12-29",
      "2027-12-30",
      "2027-12-31",
    ],
  );
  assert.ok(
    tripPlan.dayPlanning.overrides.every(
      (entry) => entry.status === "vacation",
    ),
  );
  assert.equal(tripPlan.marketCalendar.dates.length, 8);
  assert.equal(
    tripPlan.marketCalendar.dates.filter((entry) => entry.status === "closed").length,
    7,
  );
  assert.equal(
    tripPlan.marketCalendar.dates.filter(
      (entry) => entry.status === "early-close",
    ).length,
    1,
  );
  assert.equal(tripPlan.trip.start, "2027-09-18");
  const melbourneTravel = tripPlan.timeline.find(
    (entry) => entry.id === "travel-to-geelong",
  );
  assert.equal(melbourneTravel.end, "2027-09-19");
  assert.equal(melbourneTravel.days, 2);

  const geelong = tripPlan.timeline.find(
    (entry) => entry.id === "location-geelong",
  );
  const roadTrip = tripPlan.timeline.find(
    (entry) => entry.id === "location-great-southern-touring-route",
  );
  const melbourne = tripPlan.timeline.find(
    (entry) => entry.id === "location-melbourne",
  );
  const brisbane = tripPlan.timeline.find(
    (entry) => entry.id === "location-brisbane",
  );
  assert.deepEqual(
    [geelong.start, geelong.end, roadTrip.start, roadTrip.end],
    ["2027-09-18", "2027-09-24", "2027-09-25", "2027-10-03"],
  );
  assert.deepEqual(
    [melbourne.start, melbourne.end, brisbane.start, brisbane.end],
    ["2027-10-04", "2027-10-10", "2027-10-11", "2027-10-26"],
  );
});

test("server-renders the Great Southern Touring Route detail", async () => {
  const response = await render("/trips/great-southern-touring-route");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Great Southern Touring Route/);
  assert.match(html, /Geelong work week/);
  assert.match(html, /Melbourne work week/);
  assert.match(html, /Newtown/);
  assert.match(html, /Queenscliff/);
  assert.match(html, /St Kilda Pier/);
  assert.match(html, /Apollo Bay/);
  assert.match(html, /Port Campbell/);
  assert.match(html, /Port Fairy/);
  assert.match(html, /Halls Gap/);
  assert.match(html, /Ballarat/);
  assert.match(html, /Sovereign Hill/);
  assert.match(html, /Day by day/);
  assert.match(html, /Book first/);
  assert.match(html, /data\/australia-part-one\.json/);

  const tripPlan = JSON.parse(
    await readFile(new URL("../data/trip-plan.json", import.meta.url), "utf8"),
  );
  const australiaPlan = JSON.parse(
    await readFile(
      new URL("../data/australia-part-one.json", import.meta.url),
      "utf8",
    ),
  );
  const calendarRoute = tripPlan.timeline.find(
    (entry) => entry.id === "location-great-southern-touring-route",
  );
  const detailRoute = australiaPlan.segments.roadTrip;
  assert.equal(detailRoute.days.length, 9);
  assert.equal(detailRoute.overnights.length, 6);
  assert.deepEqual(
    [detailRoute.start, detailRoute.end],
    [calendarRoute.start, calendarRoute.end],
  );
});
