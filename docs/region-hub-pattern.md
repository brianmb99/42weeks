# Region hub pattern

Use a region hub when a trip chapter has **two or more** stay pages. Australia and Asia are the only hubs. Single-stop chapters (New Zealand → Wānaka, Alps → `/alps`) skip the hub.

**Reference:** `app/australia/page.tsx`. Asia reuses the same CSS (`app/trips/australia.css`) and `RegionRhythm`.

## Required order

1. `SiteNav` with `current` set to the region and `australiaCurrent` / `asiaCurrent` set to `overview`.
2. Eyebrow `42 Weeks · regional plan`, region title, facts (dates, geography, character), short summary.
3. `RegionRhythm` — location-only proportional bar (nights per stop, not weekday ideas).
4. Optional planning note that belongs to the chapter, not one stay (Asia’s Singapore exclusion).
5. Linked stop cards (`aus-route-card`): photo, dates · mode, title, one-sentence description, `Open plan →`.
6. Footer note that `data/trip-plan.json` owns dates.

## Rhythm bar

Same family as “Where the weeks go” on the homepage, finer grain.

- Desktop labels name the place (`Great Ocean Road`, `Whitsundays`), not a cryptic stub.
- Mobile keeps true proportional widths. Use a short `mapLabel` that still identifies the stop (`Ocean Rd`, not `Road`). Put full names and dates in the key under the bar. Do not stack every block to full width and do not horizontally scroll.

Stop data lives in `data/australia-pages.ts` or `data/asia-pages.ts` so the bar and the cards share one list.

## Visual

Warm paper (`--aus-paper: #f7f6f1`), ink header rule, indented title, green in-site links. Do not give Asia a second stylesheet.

## Do not

- Build a hub for one location.
- Add a Europe hub until Copenhagen is a real location page.
- Put weekday Work & School ideas on the hub bar.
- Leave a “detail page not yet written” card in a selected itinerary. If a stop is canonical, give it a location page.
