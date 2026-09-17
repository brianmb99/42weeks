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

function assertNoPrescribedWorkHours(html) {
  for (const pattern of [
    /work approximately/i,
    /local-morning work block/i,
    /5 a\.m\.–1 p\.m\./i,
    /5–9 a\.m\./i,
    /four-hour anchor blocks/i,
    /late-night U\.S\. session/i,
    /Friday&#x27;s early close is/i,
    /6–10 a\.m\. New York/i,
  ]) {
    assert.doesNotMatch(html, pattern);
  }
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
  assert.match(html, /class="home-overview-key"/);
  assert.equal((html.match(/data-overview-row=/g) ?? []).length, 6);
  assert.equal((html.match(/data-overview-block=/g) ?? []).length, 12);
  assert.match(html, /90-day scale/);
  assert.match(html, /View the exact calendar/);
  assert.match(html, /Great Ocean Road Loop/);
  assert.match(html, /Open the 7-day plan/);
  assert.match(html, /aria-label="Open Victoria road trip plan"/);
  assert.match(html, /aria-label="Open Whitsundays plan"/);
  assert.match(html, /aria-label="Open Alice Springs plan"/);
  assert.match(html, /aria-label="Open Hong Kong plan"/);
  assert.match(html, /aria-label="Open Wānaka plan"/);
  assert.match(html, /aria-label="Open India plan"/);
  assert.equal(
    (html.match(/<a class="home-overview-item home-overview-link"/g) ?? [])
      .length,
    10,
  );
  assert.match(html, /href="\/australia\/geelong"/);
  assert.match(
    html,
    /href="\/australia\/alice-springs" aria-label="Open Alice Springs plan"/,
  );
  assert.doesNotMatch(html, /href="#overview"/);
  assert.match(html, /aria-label="Scroll to overview"/);
  assert.match(
    html,
    /\/trips\/great-southern-touring-route/,
  );
  assert.match(html, /href="\/australia\/brisbane" aria-label="Open Brisbane plan"/);
  assert.match(html, /aria-label="Open Alps plan"/);
  assert.match(html, /href="\/alps"/);
  assert.match(html, /class="home-trip-collage-image"/);
  assert.match(html, /src="\/og\.png"/);
  assert.ok(
    html.indexOf('class="home-trip-collage"') <
      html.indexOf("<h2>Where the weeks go</h2>"),
  );
  assert.doesNotMatch(html, /Australia highlight/);
  assertNoHotlinkedPhotos(html);
  assert.match(html, /\/og\.png/);
  assert.match(html, /summary_large_image/);
  assert.match(html, /Geelong/);
  assert.match(html, /Melbourne/);
  assert.match(html, /<span>Alice Springs<\/span>/);
  assert.match(html, /<h3>Alice Springs<\/h3>/);
  assert.match(html, /Two-week beach work base/);
  assert.match(html, /Opera House evening/);
  assert.match(html, /2027 performance calendar/);
  assert.match(html, /Whitsundays/);
  assert.match(html, /Red Centre life/);
  assert.match(html, /Work \+ reset/);
  assert.match(html, /Family history \+ work/);
  assert.match(html, /\/trips\/hamilton-island-working-week/);
  assert.match(html, /\/australia\/brisbane/);
  assert.match(html, /\/asia\/india/);
  assert.match(html, /\/asia\/hong-kong/);
  assert.match(html, /Diwali/);
  assert.match(html, /Dehradun family base/);
  assert.match(html, /bounded Delhi–Agra–Jaipur vacation/);
  assert.doesNotMatch(html, /real route rather than a rushed stop/);
  assert.doesNotMatch(html, /Singapore/);
  assert.match(html, /Hong Kong/);
  assert.match(html, /Two-week office stay/);
  assert.match(html, /Wānaka/);
  assert.match(html, /\/new-zealand\/wanaka/);
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
    "Melbourne",
    "Geelong",
    "Great Ocean Road",
    "Alice Springs",
    "Sydney",
    "Whitsundays",
    "Brisbane",
  ]) {
    assert.match(html, new RegExp(`>${label}<`));
  }
  assert.equal((html.match(/class="aus-route-card"/g) ?? []).length, 6);
  assert.match(html, /class="region-rhythm"/);
  assert.match(html, /class="region-rhythm-map"/);
  assert.match(html, /class="is-full">Great Ocean Road</);
  assert.match(html, /class="is-short">Ocean Rd</);
  assert.match(html, /class="is-full">Whitsundays</);
  assert.match(html, /class="is-short">Whitsundays</);
  assert.match(html, /class="is-full">Alice Springs</);
  assert.match(html, /class="is-short">Alice</);
  assert.match(html, /\/australia\/geelong/);
  assert.match(html, /\/australia\/melbourne/);
  assert.match(html, /\/australia\/sydney/);
  assert.match(html, /\/trips\/great-southern-touring-route/);
  assert.match(html, /\/trips\/hamilton-island-working-week/);
  assert.match(html, /\/australia\/alice-springs/);
  assert.match(html, /\/australia\/brisbane/);
  assert.match(html, /\/images\/australia\/geelong-waterfront\.jpg/);
  assert.match(html, /\/images\/australia\/sydney-opera-house\.jpg/);
  assertNoHotlinkedPhotos(html);
});

test("server-renders the Asia hub and regional navigation", async () => {
  const response = await render("/asia");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Asia/);
  assert.match(html, /href="\/asia" aria-current="page">Asia/);
  assert.match(html, /class="site-subnav"/);
  assert.match(html, /aria-label="Asia"/);
  assert.match(html, /aria-current="page">Overview/);
  assert.match(html, />India</);
  assert.match(html, />Hong Kong</);
  assert.match(html, /class="region-rhythm"/);
  assert.match(html, /class="is-full">India</);
  assert.match(html, /class="is-short">India</);
  assert.match(html, /class="is-full">Hong Kong</);
  assert.match(html, /Dehradun family/);
  assert.match(html, /Open plan/);
  assert.doesNotMatch(html, /Detail page not yet written/);
  assert.match(html, /Singapore is not a family stay/);
  assert.match(html, /two-day, one-night or two-night Singapore trip/);
  assert.match(html, /id="singapore"/);
  assert.match(html, /\/asia\/india/);
  assert.match(html, /\/asia\/hong-kong/);
  assert.match(html, /\/images\/asia\/dehradun-forest-research-institute\.jpg/);
  assert.match(html, /\/images\/asia\/hong-kong-peak\.jpg/);
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
        /Geelong Library/,
        /Work &amp; School from Geelong/,
        /US Eastern → 11 p\.m\.–7 a\.m\. local/,
        /href="#geelong-family-history"/,
        /id="geelong-family-history"/,
        /href="#afl-at-the-mcg"/,
        /id="afl-at-the-mcg"/,
        /Land Monday/,
        /wildcard/,
      ],
      highlightedSegments: 1,
      vibeActivities: 4,
      featurePlans: 2,
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
        /A hotel near the MCG, not a rental/,
        /St Kilda Little Penguins/,
        /Royal Botanic Gardens/,
        /AFL at the MCG/,
        /last-round home-and-away/,
        /optional inbound, not the selected stay/,
        /Hotel nights before Newtown/,
        /href="#afl-at-the-mcg"/,
      ],
      highlightedSegments: 0,
      vibeActivities: 4,
      featurePlans: 1,
      images: [
        /\/images\/australia\/melbourne-skyline\.jpg/,
        /\/images\/australia\/melbourne-little-penguin\.jpg/,
        /\/images\/australia\/melbourne-afl-mcg\.jpg/,
      ],
    },
    {
      path: "/australia/sydney",
      current: "Sydney",
      content: [
        /Shortlist Manly first, Coogee second/,
        /Sydney Opera House/,
        /Manly Ferry/,
        /Bondi-to-Coogee coastal walkway/,
        /credible evening return after the Sydney Opera House/,
        /Work &amp; School from Sydney/,
        /US Eastern → 11 p\.m\.–7 a\.m\. local; midnight–8 a\.m\. from Oct 3/,
        /href="#full-sydney-weekend"/,
        /href="#sydney-opera-house"/,
      ],
      highlightedSegments: 2,
      vibeActivities: 4,
      featurePlans: 2,
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
    assert.match(html, /class="location-rhythm-track"/);
    assert.match(html, /class="location-rhythm has-mobile-overview-cards"/);
    assert.match(html, /class="location-rhythm-mobile-map"/);
    assert.match(html, /class="location-base-grid"/);
    assert.match(html, /class="location-vibe-preview"/);
    assert.match(html, /class="location-vibe-dialog"/);
    assert.doesNotMatch(html, /What fits here/);
    assert.equal(
      (html.match(/class="is-work has-highlights"/g) ?? []).length,
      route.highlightedSegments,
    );
    assert.equal(
      (html.match(/class="location-vibe-activity"/g) ?? []).length,
      route.vibeActivities,
    );
    assert.equal(
      (html.match(/class="location-feature-plan"/g) ?? []).length,
      route.featurePlans,
    );
    for (const pattern of [...route.content, ...route.images]) {
      assert.match(html, pattern);
    }
    assertNoHotlinkedPhotos(html);
    assertUsesImperialUnits(html);
    assertNoPrescribedWorkHours(html);
  }
});

test("server-renders Alice Springs, Brisbane, Wānaka and Alps glance-first plans", async () => {
  const routes = [
    {
      path: "/australia/alice-springs",
      current: /aria-current="page">Alice Springs</,
      content: [
        /<h1>Alice Springs<\/h1>/,
        /Warm dry days, cool desert nights/,
        /Tjoritja/,
        /Uluru is a separate vacation decision/,
        /East Side/,
        /class="location-rhythm-track"/,
        /Two full Work &amp; School weeks/,
        /Work &amp; School · week one/,
        /class="location-rhythm has-mobile-overview-cards"/,
        /class="location-rhythm-mobile-map"/,
        /<b>Week one<\/b>/,
        /<b>Arrive<\/b>/,
        /class="location-rhythm-card-meta"/,
        /5 days/,
        /class="location-vibe-preview"/,
        /class="location-vibe-dialog"/,
        /href="https:\/\/alicespringstelegraphstation\.com\.au\/plan-your-visit\/"/,
        /href="https:\/\/www\.schooloftheair\.net\.au\/the-experience\/"/,
        /Work &amp; School from Alice Springs/,
        /class="location-base-kicker"/,
        /US Eastern → 10:30 p\.m\.–6:30 a\.m\. local/,
        /class="location-base-grid"/,
        /href="#red-centre-weekend"/,
        /id="red-centre-weekend"/,
        /data\/alice-springs\.json/,
      ],
      image: /\/images\/outback\/aerial-road\.jpg/,
      absent: [
        /Work \+ school/,
        /location-weekday-highlights/,
        /The weekdays are part of the outback experience/,
        /What fits here/,
        /Ordinary Alice Springs life/,
        /Swipe to see the whole stay/,
        /6–10 a\.m\. New York/,
        /do not schedule it every night/,
      ],
      highlightedSegments: 2,
      vibeActivities: 7,
      featurePlans: 1,
    },
    {
      path: "/australia/brisbane",
      current: /aria-current="page">Brisbane</,
      content: [
        /<h1>Brisbane<\/h1>/,
        /Work &amp; School from Brisbane/,
        /US Eastern → 11 p\.m\.–7 a\.m\. local/,
        /New Farm first, West End second/,
        /Begin the weekend trip to India/,
        /class="location-rhythm-track"/,
        /CityCat/,
        /Queensland Museum/,
        /data\/queensland\.json/,
      ],
      image: /\/images\/australia\/brisbane-skyline\.jpg/,
      absent: [
        /location-weekday-highlights/,
        /What fits here/,
        /local-morning work block/,
      ],
      highlightedSegments: 1,
      vibeActivities: 4,
      featurePlans: 0,
    },
    {
      path: "/new-zealand/wanaka",
      current: /aria-current="page">New Zealand</,
      content: [
        /<h1>Wānaka<\/h1>/,
        /Long evenings make the Work &amp; School model worthwhile/,
        /Work &amp; School from Wānaka/,
        /US Eastern → 3–11 a\.m\. local/,
        /Nov 29–Dec 3/,
        /Do not attempt Milford Sound as a day trip/,
        /Meadowstone/,
        /class="location-rhythm-track"/,
        /Rob Roy Glacier Track/,
        /href="#wanaka-mini-vacation"/,
        /data\/wanaka\.json/,
      ],
      image: /\/images\/new-zealand\/wanaka-lake\.jpg/,
      absent: [
        /location-weekday-highlights/,
        /What fits here/,
        /5 a\.m\.–1 p\.m\./,
        /Three four-hour anchor days/,
      ],
      highlightedSegments: 3,
      vibeActivities: 7,
      featurePlans: 2,
    },
    {
      path: "/alps",
      current: /aria-current="page">Alps</,
      content: [
        /<h1>The Alps<\/h1>/,
        /Work &amp; School from the Alps/,
        /US Eastern → 3–11 p\.m\. local/,
        /One apartment in a real town/,
        /class="location-rhythm-track"/,
        /Work &amp; School · January/,
        /class="location-rhythm has-mobile-overview-cards"/,
        /class="location-rhythm-mobile-map"/,
        /<b>January<\/b>/,
        /<b>Arrive<\/b>/,
        /href="#ski-programs"/,
        /id="ski-programs"/,
        /GR Ski Racing Team Silvaplana/,
        /Apex 2100 Academy/,
        /Best-informed live option/,
        /Admissions Zoom with Britt Tilston/,
        /href="https:\/\/stmoritz\.gr-mountain\.com\/ski-club\/"/,
        /Cold, snow and short daylight/,
        /data\/alps\.json/,
      ],
      image: /\/images\/alps\/st-moritz-winter\.jpg/,
      absent: [
        /Work \+ school/,
        /What fits here/,
        /Swipe to see the whole stay/,
        /local-morning work block/,
      ],
      highlightedSegments: 1,
      vibeActivities: 4,
      featurePlans: 3,
    },
  ];

  for (const route of routes) {
    const response = await render(route.path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, route.current);
    for (const pattern of route.content) assert.match(html, pattern);
    for (const pattern of route.absent ?? []) {
      assert.doesNotMatch(html, pattern);
    }
    if (route.highlightedSegments) {
      assert.equal(
        (html.match(/class="is-work has-highlights"/g) ?? []).length,
        route.highlightedSegments,
      );
    }
    if (route.vibeActivities) {
      assert.equal(
        (html.match(/class="location-vibe-activity"/g) ?? []).length,
        route.vibeActivities,
      );
    }
    assert.equal(
      (html.match(/class="location-feature-plan"/g) ?? []).length,
      route.featurePlans,
    );
    assert.match(html, route.image);
    assert.equal(
      (html.match(/<figure(?: class="is-featured")?>/g) ?? []).length,
      3,
    );
    assert.match(html, /class="location-rhythm has-mobile-overview-cards"/);
    assert.match(html, /class="location-rhythm-mobile-map"/);
    assert.match(html, /Open exact calendar/);
    assertNoHotlinkedPhotos(html);
    assertUsesImperialUnits(html);
    assertNoPrescribedWorkHours(html);
  }
});

test("server-renders Hong Kong and India location plans", async () => {
  const routes = [
    {
      path: "/asia/hong-kong",
      current: "Hong Kong",
      content: [
        /A full week, then a real weekend, then Thanksgiving/,
        /Western Wan Chai or the Admiralty edge/,
        /Cheung Chau weekend/,
        /Dragon’s Back/,
        /Work &amp; School from Hong Kong/,
        /US Eastern → 10 p\.m\.–6 a\.m\. local/,
        /href="#hong-kong-weekend"/,
        /href="#hong-kong-thanksgiving"/,
        /href="#hong-kong-departure-day"/,
        /data\/asia-pages\.ts/,
      ],
      image: /\/images\/asia\/hong-kong-peak\.jpg/,
      highlightedSegments: 2,
      vibeActivities: 7,
      featurePlans: 3,
    },
    {
      path: "/asia/india",
      current: "India",
      content: [
        /Family week, vacation week, Bangalore week/,
        /Family house in Dehradun/,
        /Forest Research Institute/,
        /Diwali in Dehradun/,
        /Delhi, Agra and Jaipur/,
        /Work &amp; School from Dehradun and Bangalore/,
        /US Eastern → 7:00 p\.m\.–2:30 a\.m\. local/,
        /href="#diwali"/,
        /href="#golden-triangle"/,
        /Nag Tibba is a separate decision/,
        /class="location-rhythm has-mobile-overview-cards"/,
        /class="location-rhythm-mobile-map"/,
        /data\/india\.json/,
      ],
      image: /\/images\/asia\/dehradun-forest-research-institute\.jpg/,
      highlightedSegments: 2,
      vibeActivities: 7,
      featurePlans: 2,
    },
  ];

  for (const route of routes) {
    const response = await render(route.path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /href="\/asia" aria-current="page">Asia/);
    assert.match(html, /class="site-subnav"/);
    assert.match(html, /aria-label="Asia"/);
    assert.match(html, /href="\/asia">Overview</);
    assert.match(
      html,
      new RegExp(`aria-current="page">${route.current}<`),
    );
    assert.match(html, /class="location-rhythm-track"/);
    assert.match(html, /class="location-rhythm has-mobile-overview-cards"/);
    assert.match(html, /class="location-rhythm-mobile-map"/);
    assert.match(html, /class="location-base-grid"/);
    assert.match(html, /class="location-vibe-preview"/);
    assert.match(html, /class="location-vibe-dialog"/);
    assert.doesNotMatch(html, /What fits here/);
    assert.equal(
      (html.match(/class="is-work has-highlights"/g) ?? []).length,
      route.highlightedSegments,
    );
    assert.equal(
      (html.match(/class="location-vibe-activity"/g) ?? []).length,
      route.vibeActivities,
    );
    assert.equal(
      (html.match(/class="location-feature-plan"/g) ?? []).length,
      route.featurePlans,
    );
    assert.match(html, route.image);
    assert.equal(
      (html.match(/<figure(?: class="is-featured")?>/g) ?? []).length,
      3,
    );
    for (const pattern of route.content) assert.match(html, pattern);
    assertNoHotlinkedPhotos(html);
    assertUsesImperialUnits(html);
    assertNoPrescribedWorkHours(html);
  }
});

test("server-renders the expandable weekly calendar", async () => {
  const response = await render("/calendar");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Calendar/);
  assert.match(html, />Calendar</);
  assert.match(html, /43<!-- --> weeks/);
  assert.match(html, /\+ 5 days/);
  assert.match(html, /306<!-- --> days/);
  assert.match(html, /class="site-nav"/);
  assert.match(html, /aria-current="page">Calendar/);
  assert.match(html, />Victoria road trip</);
  assert.match(html, />Whitsundays</);
  assert.match(html, />Alice Springs</);
  assert.match(html, />Brisbane</);
  assert.match(html, />Wānaka</);
  assert.match(html, /data\/trip-plan\.json/);
  assert.match(html, />Work</);
  assert.match(html, />Travel</);
  assert.match(html, />Not working</);
  assert.match(html, />Vacation</);
  assert.match(html, />Fixed event</);
  assert.match(html, />\+ all</);
  assert.match(html, />− all</);
  assert.match(html, /W<!-- -->01/);
  assert.match(html, /W<!-- -->44/);
  assert.match(html, /Expand week 7, Oct 9 to Oct 15/);
  assert.match(html, /2028-03-12: not working/);
  assert.match(html, /New Hampshire/);
  assert.match(html, /Geelong/);
  assert.match(html, /Great Ocean Road Loop/);
  assert.match(html, /Expand all weeks in Victoria road trip/);
  assert.match(html, /Melbourne/);
  assert.match(html, /Hamilton Island/);
  assert.match(html, /Alice Springs/);
  assert.match(html, /Expand all weeks in Alice Springs/);
  assert.match(html, /Expand all weeks in Wānaka/);
  assert.match(html, /Expand all weeks in India/);
  assert.doesNotMatch(html, /Expand all weeks in (Brisbane Airport|In transit|Longreach)/);
  assert.match(html, />Description</);
  assert.match(html, /Sovereign Hill; arrive in Melbourne/);
  assert.match(html, /Fly Melbourne → Alice Springs/);
  assert.match(html, /Fly Alice Springs → Sydney/);
  assert.match(html, /Fly Sydney → Hamilton Island/);
  assert.match(html, /Work &amp; homeschool — Hamilton Island/);
  assert.match(html, /Hardy Reef \+ Whitsundays kayak expedition/);
  assert.match(
    html,
    /Saturday, October 16, 2027\nNot working\nHardy Reef \+ Whitsundays kayak expedition/,
  );
  assert.match(html, /Fly Proserpine → Brisbane/);
  assert.match(html, /Evening ferry Hamilton Island → Port of Airlie/);
  assert.match(html, /Work, homeschool and reset — Brisbane/);
  assert.match(html, /Weekend flight Brisbane → India/);
  assert.match(html, /Saturday-night flight Hong Kong → Auckland → Queenstown → Wānaka/);
  assert.match(html, /Thanksgiving in Hong Kong/);
  assert.match(html, /Expand all weeks in Hong Kong/);
  assert.doesNotMatch(html, /Singapore/);
  assert.match(html, /Wānaka mini-vacation/);
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
  assert.match(html, /Expand all weeks in Newtown, Geelong/);
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
  assert.equal(datedEvents.length, 28);
  assert.ok(datedEvents.every((entry) => typeof entry.fixed === "boolean"));
  assert.equal(datedEvents.filter((entry) => entry.fixed).length, 7);
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
  assert.equal(tripPlan.dayPlanning.overrides.length, 18);
  assert.deepEqual(
    tripPlan.dayPlanning.overrides.map((entry) => entry.date),
    [
      "2027-09-07",
      "2027-09-08",
      "2027-09-09",
      "2027-09-10",
      "2027-10-13",
      "2027-10-14",
      "2027-10-15",
      "2027-10-29",
      "2027-12-06",
      "2027-12-07",
      "2027-12-08",
      "2027-12-09",
      "2027-12-10",
      "2027-12-27",
      "2027-12-28",
      "2027-12-29",
      "2027-12-30",
      "2027-12-31",
    ],
  );
  assert.equal(
    tripPlan.dayPlanning.overrides.filter(
      (entry) => entry.status === "vacation",
    ).length,
    15,
  );
  assert.equal(
    tripPlan.dayPlanning.overrides.filter((entry) => entry.status === "work")
      .length,
    3,
  );
  assert.equal(tripPlan.marketCalendar.dates.length, 9);
  assert.equal(
    tripPlan.marketCalendar.dates.filter((entry) => entry.status === "closed").length,
    8,
  );
  assert.equal(
    tripPlan.marketCalendar.dates.filter(
      (entry) => entry.status === "early-close",
    ).length,
    1,
  );
  assert.equal(tripPlan.trip.start, "2027-08-28");
  assert.match(tripPlan.locationPolicy, /sleep at the end/);
  assert.match(tripPlan.railPolicy, /groups connection and overnight-travel/);
  assert.match(tripPlan.travelPolicy, /weekends for long-haul travel/);
  const melbourneTravel = tripPlan.timeline.find(
    (entry) => entry.id === "travel-to-melbourne",
  );
  assert.equal(melbourneTravel.end, "2027-08-30");
  assert.equal(melbourneTravel.days, 3);

  const melbourneOpening = tripPlan.timeline.find(
    (entry) => entry.id === "location-melbourne-opening",
  );
  const geelong = tripPlan.timeline.find(
    (entry) => entry.id === "location-geelong",
  );
  const roadTrip = tripPlan.timeline.find(
    (entry) => entry.id === "location-great-southern-touring-route",
  );
  const melbourneReturn = tripPlan.timeline.find(
    (entry) => entry.id === "location-melbourne-return",
  );
  const aliceSprings = tripPlan.timeline.find(
    (entry) => entry.id === "location-alice-springs",
  );
  const sydney = tripPlan.timeline.find(
    (entry) => entry.id === "location-sydney",
  );
  const hamiltonIsland = tripPlan.timeline.find(
    (entry) => entry.id === "location-hamilton-island",
  );
  const brisbane = tripPlan.timeline.find(
    (entry) => entry.id === "location-brisbane",
  );
  const wanaka = tripPlan.timeline.find(
    (entry) => entry.id === "location-wanaka",
  );
  assert.equal(melbourneOpening, undefined);
  assert.deepEqual(
    [
      geelong.start,
      geelong.end,
      roadTrip.start,
      roadTrip.end,
    ],
    [
      "2027-08-30",
      "2027-09-04",
      "2027-09-05",
      "2027-09-10",
    ],
  );
  assert.equal(aliceSprings.railLabel, "Alice Springs");
  assert.equal(wanaka.days, 20);
  const indiaTransit = tripPlan.timeline.find(
    (entry) => entry.id === "location-in-transit-india",
  );
  const brisbaneToIndia = tripPlan.timeline.find(
    (entry) => entry.id === "travel-brisbane-india",
  );
  assert.deepEqual(
    [indiaTransit.start, indiaTransit.end, indiaTransit.railGroupId],
    ["2027-10-23", "2027-10-23", "location-india"],
  );
  assert.deepEqual(
    [brisbaneToIndia.start, brisbaneToIndia.end, brisbaneToIndia.days],
    ["2027-10-23", "2027-10-24", 2],
  );
  const whitsundaysToBrisbane = tripPlan.timeline.find(
    (entry) => entry.id === "travel-whitsundays-brisbane",
  );
  const hamiltonVacation = tripPlan.timeline.find(
    (entry) => entry.id === "event-hamilton-vacation-block",
  );
  assert.equal(whitsundaysToBrisbane.start, "2027-10-17");
  assert.match(whitsundaysToBrisbane.title, /Proserpine → Brisbane/);
  assert.deepEqual(
    [hamiltonVacation.start, hamiltonVacation.end, hamiltonVacation.days],
    ["2027-10-13", "2027-10-16", 4],
  );
  assert.deepEqual(
    [
      melbourneReturn.start,
      melbourneReturn.end,
      aliceSprings.start,
      aliceSprings.end,
      sydney.start,
      sydney.end,
      hamiltonIsland.start,
      hamiltonIsland.end,
      brisbane.start,
      brisbane.end,
      wanaka.start,
      wanaka.end,
    ],
    [
      "2027-09-11",
      "2027-09-11",
      "2027-09-12",
      "2027-09-25",
      "2027-09-26",
      "2027-10-09",
      "2027-10-10",
      "2027-10-16",
      "2027-10-17",
      "2027-10-22",
      "2027-11-28",
      "2027-12-17",
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
    assert.equal(
      tripPlan.timeline.some(
        (entry) =>
          entry.id.includes("singapore") || entry.locationId === "singapore",
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
    [
      india.start,
      india.end,
      hongKong.start,
      hongKong.end,
      wanaka.start,
      wanaka.end,
    ],
    [
      "2027-10-24",
      "2027-11-13",
      "2027-11-14",
      "2027-11-26",
      "2027-11-28",
      "2027-12-17",
    ],
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
        "travel-melbourne-geelong",
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
  assert.match(html, /Fly Proserpine → Brisbane/);
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
  assert.match(html, />Brisbane</);
  assert.match(html, /Whitsundays Sea Kayak Expedition Options\.md/);
  assert.match(html, /\/trips\/whitsundays-sea-kayaking\/planning-booking/);
  assert.match(html, /12.{1,6}14 mile/);
  assertUsesImperialUnits(html);
});

test("server-renders the archived Longreach fallback", async () => {
  const response = await render("/trips/longreach-outback-working-week");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Outback Queensland: Work &amp; Play/);
  assert.match(html, /Archived alternative; not part of the selected canonical route/);
  assert.doesNotMatch(html, /aria-current="page">Outback/);
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
  assert.match(html, /Melbourne handoff, then Alice Springs and Sydney/);
  assert.match(html, /Newtown/);
  assert.match(html, /Queenscliff/);
  assert.match(html, /Alice Springs/);
  assert.match(html, /Sydney/);
  assert.match(html, /Sydney Opera House performance/);
  assert.match(html, /full staged opera/);
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

test("server-renders the Alps U12 ski program notes on the location page", async () => {
  const response = await render("/alps");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>The Alps/);
  assert.match(html, /href="\/alps" aria-current="page">Alps/);
  assert.match(html, /Allie and Charlie/);
  assert.match(html, /January–March 2028/);
  assert.match(html, /updated September 17, 2026/);
  assert.match(html, /GR Ski Racing Team Silvaplana/);
  assert.match(html, /Apex 2100 Academy/);
  assert.match(html, /day-athlete/);
  assert.match(html, /OpenApply/);
  assert.match(html, /Club des Sports de Tignes/);
  assert.match(html, /ACM Ski Team/);
  assert.match(html, /Club des Sports de Val d&#x27;Isère|Club des Sports de Val d'Isère/);
  assert.match(html, /Veronica/);
  assert.match(html, /Valentina \(Ski Team\)/);
  assert.match(html, /Lucia/);
  assert.match(html, /Britt Tilston/);
  assert.match(html, /Nicolas Combe/);
  assert.match(html, /Lionel Fayolle/);
  assert.match(html, /Pascal Arpin/);
  assert.match(html, /Cyril/);
  assert.match(html, /Elodie Crépin/);
  assert.match(html, /Submit the Apex OpenApply application and U12 ski videos/);
  assert.match(html, /Send ACM race history and current skiing video/);
  assert.match(html, /One outreach email sent after Pascal/);
  assert.match(
    html,
    /https:\/\/stmoritz\.gr-mountain\.com\/ski-club\//,
  );
  assert.match(html, /ESS Verbier/);
  assert.match(html, /Ski Zenit/);
  assert.match(html, /Ski Club Verbier/);
  assert.match(html, /Ski Club de Bagnes/);
  assert.match(html, /data\/alps\.json/);
  assert.match(html, /class="site-nav"/);
  assert.doesNotMatch(html, /href="\/ski-programs"/);
  assert.doesNotMatch(html, /mailto:/i);
  assert.doesNotMatch(html, /@[a-z0-9.-]+\.[a-z]{2,}/i);
  assert.equal((html.match(/class="location-feature-plan"/g) ?? []).length, 3);
});
