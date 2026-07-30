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

function assertNoHotlinkedPhotos(html) {
  assert.doesNotMatch(html, /https:\/\/images\.(?:unsplash|pexels)\.com/);
  assert.doesNotMatch(html, /<img[^>]+src="https?:\/\//i);
}

function assertUsesImperialUnits(html) {
  assert.doesNotMatch(
    html,
    /\d[\d.,â€“â€”\s]*(?:km|kg)\b|\b(?:kilomet(?:er|re)s?|kilograms?|lit(?:er|re)s?|metres?)\b/i,
  );
}

test("server-renders the 42 Weeks overview", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>42 Weeks/);
  assert.match(html, /class="site-nav"/);
  assert.match(html, /aria-current="page">Home/);
  assert.match(html, /href="\/australia">Australia/);
  assert.doesNotMatch(html, /class="site-subnav"/);
  assert.match(html, />Overview</);
  assert.doesNotMatch(html, /Broad route/);
  assert.match(html, /Where the weeks go/);
  assert.match(
    html,
    /aria-label="Time-scaled trip overview; each row represents 90 days"/,
  );
  assert.equal((html.match(/data-overview-row=/g) ?? []).length, 5);
  assert.equal((html.match(/data-overview-block=/g) ?? []).length, 11);
  assert.match(html, /90-day scale/);
  assert.match(html, /View the exact calendar/);
  assert.match(html, /Great Ocean Road Loop/);
  assert.match(html, /Open the 7-day plan/);
  assert.match(html, /aria-label="Open Great Ocean Road Loop plan"/);
  assert.match(html, /aria-label="Open Whitsundays plan"/);
  assert.match(html, /aria-label="Open Outback plan"/);
  assert.equal(
    (html.match(/<a class="home-overview-item home-overview-link"/g) ?? [])
      .length,
    3,
  );
  assert.match(
    html,
    /\/trips\/great-southern-touring-route/,
  );
  assert.match(
    html,
    /\/images\/victoria\/twelve-apostles\.jpg/,
  );
  assertNoHotlinkedPhotos(html);
  assert.match(html, /\/og\.png/);
  assert.match(html, /summary_large_image/);
  assert.match(html, /Geelong/);
  assert.match(html, /Melbourne/);
  assert.match(html, /<span>Melbourne \+ Sydney<\/span>/);
  assert.match(html, /<h3>Melbourne \+ Sydney<\/h3>/);
  assert.match(html, /Sydney work week/);
  assert.match(html, /Opera House evening/);
  assert.match(html, /Sydney neighborhood/);
  assert.match(html, /Whitsundays/);
  assert.match(html, /Outback/);
  assert.match(html, /Play, with some work/);
  assert.match(html, /Work \+ local evenings/);
  assert.match(html, /\/trips\/hamilton-island-working-week/);
  assert.match(html, /\/trips\/longreach-outback-working-week/);
  assert.match(html, /Diwali/);
  assert.match(html, /Singapore/);
  assert.match(html, /Hong Kong/);
  assert.match(html, /Snowbird/);
  assert.match(html, /<span>Home \+ Snowbird \+ Home<\/span>/);
  assert.match(html, /<h3>Home \+ Snowbird \+ Home<\/h3>/);
  assert.match(html, /Still open/);
  assert.match(html, /Copenhagen/);
  assert.doesNotMatch(html, /Japan|AFL Grand Final/);
  assert.match(
    html,
    /https:\/\/www\.backroads\.com\/trips\/MPGIF\/portugals-algarve-alentejo-family-multi-adventure-tour/,
  );
  assert.match(
    html,
    /https:\/\/www\.backroads\.com\/trips\/MBIIF\/basque-country-family-multi-adventure-tour/,
  );
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the Australia hub and regional navigation", async () => {
  const response = await render("/australia");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Australia/);
  assert.match(html, /href="\/australia" aria-current="page">Australia/);
  assert.match(html, /class="site-subnav"/);
  assert.match(html, /aria-label="Australia"/);
  assert.match(html, /aria-current="page">Overview/);
  for (const label of [
    "Geelong",
    "Great Ocean Road",
    "Melbourne",
    "Sydney",
    "Whitsundays",
    "Outback",
  ]) {
    assert.match(html, new RegExp(`>${label}<`));
  }
  assert.equal((html.match(/class="aus-route-card"/g) ?? []).length, 6);
  assert.match(html, /\/australia\/geelong/);
  assert.match(html, /\/australia\/melbourne/);
  assert.match(html, /\/australia\/sydney/);
  assert.match(html, /\/trips\/great-southern-touring-route/);
  assert.match(html, /\/trips\/hamilton-island-working-week/);
  assert.match(html, /\/trips\/longreach-outback-working-week/);
  assert.match(html, /\/images\/australia\/geelong-waterfront\.jpg/);
  assert.match(html, /\/images\/australia\/sydney-opera-house\.jpg/);
  assertNoHotlinkedPhotos(html);
});

test("server-renders Geelong, Melbourne and Sydney planning pages", async () => {
  const routes = [
    {
      path: "/australia/geelong",
      current: "Geelong",
      content: [
        /Newtown, near the Barwon River/,
        /Balyang Sanctuary/,
        /Queenscliff/,
        /Geelong Library &amp; Heritage Centre/,
        /dedicated children and youth floor/,
      ],
      images: [
        /\/images\/australia\/geelong-waterfront\.jpg/,
        /\/images\/australia\/geelong-queenscliff-pier\.jpg/,
        /\/images\/australia\/geelong-balyang-sanctuary\.jpg/,
      ],
    },
    {
      path: "/australia/melbourne",
      current: "Melbourne",
      content: [
        /CBD or Southbank for a short stay/,
        /Little Penguins at St Kilda Pier/,
        /free, ticketed evening sessions/,
        /Royal Botanic Gardens/,
      ],
      images: [
        /\/images\/australia\/melbourne-skyline\.jpg/,
        /\/images\/australia\/melbourne-little-penguin\.jpg/,
        /\/images\/australia\/melbourne-st-kilda-skyline\.jpg/,
      ],
    },
    {
      path: "/australia/sydney",
      current: "Sydney",
      content: [
        /Shortlist Manly first, Coogee second/,
        /Sydney Opera House/,
        /Live at the beach/,
        /3\.7-mile Bondi-to-Coogee walk/,
        /credible evening return after the Sydney Opera House/,
      ],
      images: [
        /\/images\/australia\/sydney-opera-house\.jpg/,
        /\/images\/australia\/sydney-manly-beach\.jpg/,
        /\/images\/australia\/sydney-coogee-beach\.jpg/,
      ],
    },
  ];

  for (const route of routes) {
    const response = await render(route.path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /href="\/australia" aria-current="page">Australia/);
    assert.match(html, /class="site-subnav"/);
    assert.match(
      html,
      new RegExp(`aria-current="page">${route.current}<`),
    );
    assert.equal(
      (html.match(/<figure(?: class="is-featured")?>/g) ?? []).length,
      3,
    );
    for (const pattern of [...route.content, ...route.images]) {
      assert.match(html, pattern);
    }
    assertNoHotlinkedPhotos(html);
    assertUsesImperialUnits(html);
  }
});

test("server-renders the expandable weekly calendar", async () => {
  const response = await render("/calendar");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Calendar/);
  assert.match(html, />Calendar</);
  assert.match(html, /40<!-- --> weeks/);
  assert.match(html, /\+ 5 days/);
  assert.match(html, /285<!-- --> days/);
  assert.match(html, /class="site-nav"/);
  assert.match(html, /aria-current="page">Calendar/);
  assert.match(html, />Great Ocean Road</);
  assert.match(html, />Whitsundays</);
  assert.match(html, />Outback</);
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
  assert.match(html, /Great Ocean Road Loop/);
  assert.match(html, /Expand all weeks in Great Ocean Road/);
  assert.match(html, /Melbourne/);
  assert.match(html, /Hamilton Island/);
  assert.match(html, /Longreach/);
  assert.match(html, /Expand all weeks in Outback/);
  assert.match(html, /Expand all weeks in India/);
  assert.doesNotMatch(html, /Expand all weeks in (Brisbane Airport|In transit|Longreach)/);
  assert.match(html, />Description</);
  assert.match(html, /Sovereign Hill; arrive in Melbourne late/);
  assert.match(html, /Melbourne day; evening flight to Sydney/);
  assert.match(html, /Fly Sydney → Hamilton Island/);
  assert.match(html, /Work &amp; homeschool — Hamilton Island/);
  assert.match(html, /Hardy Reef \+ Whitsundays kayak expedition/);
  assert.match(
    html,
    /Saturday, October 16, 2027\nNot working\nHardy Reef \+ Whitsundays kayak expedition/,
  );
  assert.match(html, /Fly Proserpine → Brisbane → Longreach/);
  assert.match(html, /Evening ferry Hamilton Island → Port of Airlie/);
  assert.match(html, /Outback vacation days/);
  assert.match(html, /Fly Longreach → Brisbane → India/);
  assert.doesNotMatch(html, /Fly Longreach → Brisbane<\/|Fly Brisbane → India/);
  assert.match(html, /Charlie&#x27;s birthday/);
  assert.match(html, /Kate&#x27;s birthday/);
  assert.match(html, /Allie&#x27;s birthday/);
  assert.match(html, /Brian&#x27;s birthday/);
  assert.match(
    html,
    /Tuesday, October 12, 2027\nWork[\s\S]{0,300}Charlie&#x27;s birthday/,
  );
  assert.match(html, /Location = where we sleep that night/);
  assert.match(html, /Fly home; unpack and repack for Europe/);
  assert.doesNotMatch(html, /Japan/);
  assert.match(html, /Sydney/);
  assert.doesNotMatch(html, /AFL (semifinal|Grand Final)/);
  assert.match(html, /NYSE closed — Thanksgiving Day/);
  assert.match(html, /NYSE closes 1:00 p\.m\. — Day after Thanksgiving/);
  assert.match(html, /NYSE holiday calendar/);
  assert.match(html, /Expand all weeks in Melbourne/);
  assert.match(html, /Expand all weeks in Sydney/);
  assert.match(html, /aria-pressed="false"/);
  assert.doesNotMatch(html, />Location</);
  assert.doesNotMatch(html, /Things under consideration/);
  assert.doesNotMatch(html, />Anchor<|Maximum 90-day|max 90-day/i);
  assert.doesNotMatch(html, />Overview<|>Weeks<|Dates run top to bottom|Spacing reflects elapsed time/);

  const tripPlan = JSON.parse(
    await readFile(new URL("../data/trip-plan.json", import.meta.url), "utf8"),
  );
  const datedEvents = tripPlan.timeline.filter((entry) => entry.type === "event");
  assert.equal(datedEvents.length, 14);
  assert.ok(datedEvents.every((entry) => typeof entry.fixed === "boolean"));
  assert.equal(datedEvents.filter((entry) => entry.fixed).length, 6);
  assert.deepEqual(
    datedEvents
      .filter((entry) => entry.id.includes("-birthday-"))
      .map((entry) => [entry.title, entry.start]),
    [
      ["Charlie's birthday", "2027-10-12"],
      ["Kate's birthday", "2027-10-26"],
      ["Allie's birthday", "2028-01-18"],
      ["Brian's birthday", "2028-03-12"],
    ],
  );
  assert.equal(tripPlan.rules.length, 2);
  assert.equal(tripPlan.dayPlanning.weekdayDefault, "work");
  assert.equal(tripPlan.dayPlanning.weekendDefault, "off");
  assert.equal(tripPlan.dayPlanning.marketHolidayDefault, "off");
  assert.equal(tripPlan.dayPlanning.marketEarlyCloseDefault, "work");
  assert.equal(tripPlan.dayPlanning.overrides.length, 15);
  assert.deepEqual(
    tripPlan.dayPlanning.overrides.map((entry) => entry.date),
    [
      "2027-09-27",
      "2027-09-28",
      "2027-09-29",
      "2027-09-30",
      "2027-10-01",
      "2027-10-13",
      "2027-10-14",
      "2027-10-15",
      "2027-10-21",
      "2027-10-22",
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
  assert.match(tripPlan.locationPolicy, /sleep at the end/);
  assert.match(tripPlan.railPolicy, /groups connection and overnight-travel/);
  assert.match(tripPlan.travelPolicy, /weekend travel/);
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
  const sydney = tripPlan.timeline.find(
    (entry) => entry.id === "location-sydney",
  );
  const hamiltonIsland = tripPlan.timeline.find(
    (entry) => entry.id === "location-hamilton-island",
  );
  const longreach = tripPlan.timeline.find(
    (entry) => entry.id === "location-longreach",
  );
  assert.deepEqual(
    [geelong.start, geelong.end, roadTrip.start, roadTrip.end],
    ["2027-09-19", "2027-09-24", "2027-09-25", "2027-09-30"],
  );
  assert.equal(longreach.railLabel, "Outback");
  assert.equal(longreach.color, "#4f7fa2");
  assert.equal(
    tripPlan.timeline.some(
      (entry) => entry.id.startsWith("location-brisbane-airport"),
    ),
    false,
  );
  const indiaTransit = tripPlan.timeline.find(
    (entry) => entry.id === "location-in-transit-india",
  );
  const longreachToIndia = tripPlan.timeline.find(
    (entry) => entry.id === "travel-longreach-india",
  );
  assert.deepEqual(
    [indiaTransit.start, indiaTransit.end, indiaTransit.railGroupId],
    ["2027-10-23", "2027-10-23", "location-india"],
  );
  assert.deepEqual(
    [longreachToIndia.start, longreachToIndia.end, longreachToIndia.days],
    ["2027-10-23", "2027-10-24", 2],
  );
  const hamiltonToLongreach = tripPlan.timeline.find(
    (entry) => entry.id === "travel-hamilton-island-longreach",
  );
  const hamiltonVacation = tripPlan.timeline.find(
    (entry) => entry.id === "event-hamilton-vacation-block",
  );
  assert.equal(hamiltonToLongreach.start, "2027-10-17");
  assert.match(hamiltonToLongreach.title, /Proserpine → Brisbane → Longreach/);
  assert.deepEqual(
    [hamiltonVacation.start, hamiltonVacation.end, hamiltonVacation.days],
    ["2027-10-13", "2027-10-16", 4],
  );
  assert.deepEqual(
    [
      melbourne.start,
      melbourne.end,
      sydney.start,
      sydney.end,
      hamiltonIsland.start,
      hamiltonIsland.end,
      longreach.start,
      longreach.end,
    ],
    [
      "2027-10-01",
      "2027-10-02",
      "2027-10-03",
      "2027-10-09",
      "2027-10-10",
      "2027-10-16",
      "2027-10-17",
      "2027-10-22",
    ],
  );

  const locations = tripPlan.timeline.filter(
    (entry) => entry.type === "location",
  );
  const dateValue = (value) => new Date(`${value}T00:00:00Z`);
  const inclusiveDays = (start, end) =>
    Math.round((dateValue(end) - dateValue(start)) / 86_400_000) + 1;

  assert.ok(
    locations.every(
      (location) =>
        location.days === inclusiveDays(location.start, location.end),
    ),
  );
  for (
    let date = dateValue(tripPlan.trip.start);
    date <= dateValue(tripPlan.trip.end);
    date = new Date(date.getTime() + 86_400_000)
  ) {
    const iso = date.toISOString().slice(0, 10);
    assert.equal(
      locations.filter(
        (location) => location.start <= iso && location.end >= iso,
      ).length,
      1,
      `Expected exactly one location on ${iso}`,
    );
  }
  assert.ok(
    locations
      .filter((location) => ["alps", "copenhagen"].includes(location.locationId))
      .every((location) => location.days <= 90),
  );
  assert.equal(
    tripPlan.timeline.some(
      (entry) => entry.id.includes("japan") || entry.locationId === "japan",
    ),
    false,
  );

  const india = locations.find((entry) => entry.id === "location-india");
  const hongKong = locations.find(
    (entry) => entry.id === "location-hong-kong",
  );
  const repack = locations.find(
    (entry) => entry.id === "location-new-hampshire-repack",
  );
  const alps = locations.find((entry) => entry.id === "location-alps");
  const copenhagen = locations.find(
    (entry) => entry.id === "location-copenhagen",
  );
  assert.deepEqual(
    [india.start, india.end, hongKong.start, hongKong.end],
    ["2027-10-24", "2027-11-13", "2027-11-28", "2027-12-17"],
  );
  assert.deepEqual(
    [repack.start, repack.end, alps.start, alps.end, copenhagen.start],
    ["2028-01-01", "2028-01-05", "2028-01-07", "2028-03-31", "2028-04-01"],
  );

  const weekendTravel = tripPlan.timeline.filter(
    (entry) =>
      entry.type === "travel" &&
      ![
        "travel-new-hampshire-snowbird",
        "travel-new-hampshire-alps",
      ].includes(entry.id),
  );
  assert.ok(
    weekendTravel.every((entry) =>
      [0, 6].includes(dateValue(entry.start).getUTCDay()),
    ),
  );
});

test("server-renders the Hamilton Island working week", async () => {
  const response = await render("/trips/hamilton-island-working-week");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Whitsundays: Work, Reef &amp; Sea Kayak/);
  assert.match(html, /aria-current="page">Whitsundays/);
  assert.equal(
    (html.match(/<figure(?: class="is-featured")?>/g) ?? []).length,
    6,
  );
  assert.match(html, /\/images\/whitsundays\/hamilton-marina\.jpg/);
  assert.match(html, /\/images\/whitsundays\/reef-aerial\.jpg/);
  assertNoHotlinkedPhotos(html);
  assert.match(html, /7<!-- --> nights/);
  assert.match(html, /Fly Proserpine → Brisbane → Longreach/);
  assert.doesNotMatch(html, /Brisbane airport hotel for October 16/);
  assert.match(html, /Whitehaven Beach/);
  assert.match(html, /Hardy Reef/);
  assert.match(html, /Work Mon–Tue \+ Wed early/);
  assert.match(html, /Vacation Wed–Sat/);
  assert.match(html, /Hardy Reef, then the two-night kayak expedition/);
  assert.match(html, /Separate the reef day; choose the best paddling journey/);
  assert.match(html, /Separate the serious snorkeling from the kayak expedition/);
  assert.match(html, /Whitehaven–Henning–Paddle Bay/);
  assert.match(html, /Whitehaven–Chance–Henning/);
  assert.match(html, /Crayfish–Maureen’s Cove/);
  assert.match(html, /Current first choice/);
  assert.match(html, /Current second choice/);
  assert.match(html, /Third under the current separate-snorkeling plan/);
  assert.match(html, /\/trips\/whitsundays-sea-kayaking\/hook-island-reef/);
  assert.match(html, /\/trips\/whitsundays-sea-kayaking\/whitehaven-henning-paddle/);
  assert.match(html, /\/trips\/whitsundays-sea-kayaking\/whitehaven-chance-henning/);
  assert.match(html, /Dedicated Hardy Reef snorkeling day/);
  assert.match(html, /optional light work about 4:30–7:00 a\.m\./i);
  assert.match(html, /Hamilton Island Holiday Home/);
  assert.match(html, /Starlink/);
  assert.match(html, />Outback</);
  assert.match(html, /Whitsundays Sea Kayak Expedition Options\.md/);
  assert.match(html, /\/trips\/whitsundays-sea-kayaking\/planning-booking/);
  assert.match(html, /12.{1,6}14 mile/);
  assertUsesImperialUnits(html);
});

test("server-renders the Outback Queensland plan", async () => {
  const response = await render("/trips/longreach-outback-working-week");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Outback Queensland: Work &amp; Play/);
  assert.match(html, /aria-current="page">Outback/);
  assert.equal(
    (html.match(/<figure(?: class="is-featured")?>/g) ?? []).length,
    3,
  );
  assert.match(html, /\/images\/outback\/aerial-road\.jpg/);
  assert.match(html, /\/images\/outback\/red-shed\.jpg/);
  assertNoHotlinkedPhotos(html);
  assert.match(html, /6<!-- --> nights/);
  assert.match(html, /Qantas Founders Museum/);
  assert.match(html, /Australian Stockman/);
  assert.match(html, /Winton dinosaur day/);
  assert.match(html, /Saltbush Retreat/);
  assert.match(html, /Work Mon–Wed/);
  assert.match(html, /Vacation Thu–Fri/);
  assert.match(html, /Begin the trip to India/);
  assert.match(html, /arrive in India on Sunday, October 24/i);
  assert.doesNotMatch(html, /Brisbane airport hotel for October 23/);
  assert.match(html, />Whitsundays</);
  assert.match(html, /Queensland Working Notes\.md/);
});

test("server-renders all three Whitsundays sea-kayak options", async () => {
  const routes = [
    {
      path: "/trips/whitsundays-sea-kayaking/hook-island-reef",
      title: /Crayfish Beach → Maureen’s Cove/,
      image: /\/images\/whitsundays\/islands-aerial\.jpg/,
      map: /\/images\/whitsundays\/kayak-routes\/route-1-hook-island-reef-v2\.png/,
      reef: /primary advantage is optional shore snorkeling after camp is established/,
      choice: /Current choice <!-- -->3<!-- --> · map route <!-- -->1/,
    },
    {
      path: "/trips/whitsundays-sea-kayaking/whitehaven-henning-paddle",
      title: /Whitehaven → Henning → Paddle Bay/,
      image: /\/images\/whitsundays\/whitehaven-beach\.jpg/,
      map: /\/images\/whitsundays\/kayak-routes\/route-2-whitehaven-henning-paddle-bay\.png/,
      reef: /Keep the important snorkeling on the separate boat-based outer-reef day/,
      choice: /Current choice <!-- -->1<!-- --> · map route <!-- -->2/,
    },
    {
      path: "/trips/whitsundays-sea-kayaking/whitehaven-chance-henning",
      title: /Whitehaven → Chance → Henning/,
      image: /\/images\/whitsundays\/hill-inlet-aerial\.jpg/,
      map: /\/images\/whitsundays\/kayak-routes\/route-3-whitehaven-chance-henning\.png/,
      reef: /Keep the important snorkeling on the separate boat-based outer-reef day/,
      choice: /Current choice <!-- -->2<!-- --> · map route <!-- -->3/,
    },
  ];

  for (const route of routes) {
    const response = await render(route.path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, route.title);
    assert.match(html, route.image);
    assert.match(html, route.map);
    assert.match(html, route.reef);
    assert.match(html, route.choice);
    assertNoHotlinkedPhotos(html);
    assert.match(html, /aria-current="page">Whitsundays/);
    assert.equal(
      (html.match(/<figure(?: class="is-featured")?>/g) ?? []).length,
      3,
    );
    assert.match(html, /Expedition sequence/);
    assert.match(html, /Distance basis/);
    assert.match(html, /Weather and operating gates/);
    assert.match(html, /Family load and safety/);
    assert.match(html, /Whitsundays Sea Kayak Expedition Options\.md/);
    assert.match(html, /Whitsundays overview/);
    assert.match(html, /conceptual itinerary overlay, not a navigation chart/i);
    assert.match(html, /Planning &amp; booking/);
    assert.match(html, /gallons/);
    assert.match(html, /pounds/);
    assertUsesImperialUnits(html);
  }
});

test("server-renders Whitsundays planning and booking guidance", async () => {
  const response = await render(
    "/trips/whitsundays-sea-kayaking/planning-booking",
  );
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Planning &amp; booking/);
  assert.match(html, /Reef Wednesday; paddle Thursday–Saturday/);
  assert.match(html, /Optional 4:30–7:00 a\.m\. work block/);
  assert.match(html, /Hardy Reef/);
  assert.match(html, /Salty Dog/);
  assert.match(html, /Scamper/);
  assert.match(html, /Queensland Parks/);
  assert.match(html, /Camp capacity snapshot/);
  assert.match(html, /Chance Bay/);
  assert.match(html, /One booking, one supported fallback/);
  assert.match(html, /Whitehaven–Henning–Paddle Bay/);
  assert.match(html, /Whitsundays Sea Kayak Expedition Options\.md/);
  assertNoHotlinkedPhotos(html);
});

test("server-renders the Great Ocean Road Loop detail", async () => {
  const response = await render("/trips/great-southern-touring-route");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Great Ocean Road Loop/);
  assert.match(html, /aria-current="page">Great Ocean Road/);
  assert.equal(
    (html.match(/<figure(?: class="is-featured")?>/g) ?? []).length,
    4,
  );
  assert.match(html, /\/images\/victoria\/twelve-apostles\.jpg/);
  assert.match(html, /\/images\/victoria\/otways-rainforest\.jpg/);
  assert.match(html, /\/images\/victoria\/grampians-mount-abrupt\.jpg/);
  assertNoHotlinkedPhotos(html);
  assert.match(html, /great-ocean-road-loop-map\.png/);
  assert.match(html, /Victoria loop at a glance/);
  assert.match(html, /Great Southern Touring Route overview/);
  assert.match(html, /Otways rainforest/);
  assert.match(html, /Mount Abrupt, Grampians/);
  assert.match(html, /Geelong work week/);
  assert.match(html, /Melbourne weekend, then Sydney work week/);
  assert.match(html, /Newtown/);
  assert.match(html, /Queenscliff/);
  assert.match(html, /St Kilda Pier/);
  assert.match(html, /Sydney/);
  assert.match(html, /Sydney Opera House performance/);
  assert.match(html, /full staged opera or Great Opera Hits/);
  assert.match(html, /https:\/\/opera\.org\.au\/sydney\//);
  assert.match(html, /Pole House/);
  assert.match(html, /Fairhaven family house/);
  assert.match(html, /Otway Fly/);
  assert.match(html, /mountain-bike/);
  assert.match(html, /Apollo Bay/);
  assert.match(html, /Halls Gap/);
  assert.match(html, /Sovereign Hill/);
  assert.match(html, /Day by day/);
  assert.match(html, /Book first/);
  assert.match(html, /data\/australia-part-one\.json/);
  assert.match(html, /2\.6 miles round trip/);
  assertUsesImperialUnits(html);

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
  const routeEnd = tripPlan.timeline.find(
    (entry) => entry.id === "event-great-southern-touring-route-end",
  );
  const detailRoute = australiaPlan.segments.roadTrip;
  const sydneyPlan = australiaPlan.segments.sydney;
  assert.equal(detailRoute.days.length, 7);
  assert.equal(detailRoute.overnights.length, 4);
  assert.equal(detailRoute.start, calendarRoute.start);
  assert.equal(detailRoute.end, routeEnd.start);
  assert.equal(sydneyPlan.eveningIdeas[0].title, "Sydney Opera House performance");
  assert.match(sydneyPlan.eveningIdeas[0].status, /Likely/);
});
