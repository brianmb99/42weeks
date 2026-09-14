# Location page pattern

Use `LocationPlanPage` for city and working-base pages. The page should let a reader understand the stay in under a minute, then provide enough detail to plan it.

## Required information order

1. **Purpose and facts** — why this stop exists, exact dates, nights, and work/vacation character.
2. **Photographs** — three useful, locally stored images with descriptive alt text, credit, and source.
3. **Vibe bar / stay rhythm** — a compact, chronological strip showing how the days divide among arrival, Work & School, family time, vacation, and travel.
4. **Base setup** — paired boxes for Work & School and Where to Stay. For vacation stops, replace Work & School with the most useful pacing or logistics box.
5. **Dedicated experiences** — substantial boxes for special weekends, side trips, or other segments that need an actual plan.
6. **Planning panels** — climate, booking constraints, or a major decision that needs more explanation.
7. **Optional overflow ideas, book first, judgment calls, and references**.

## Rhythm strip rules

- Use the strip for mutually exclusive time blocks, not a wishlist of attractions.
- Keep it chronological and proportional enough to show the shape of the stay.
- Use explicit tones: `arrival`, `work`, `family`, `vacation`, or `travel`.
- For a normal working base, show Work & School weeks and genuinely free weekends.
- A Work & School segment may contain up to four short weekday ideas in a two-column grid.
- Give every idea one meaningful, authoritative external link. One item represents one destination; do not combine unrelated destinations under one link.
- Each idea carries a title, timing guideline and one-sentence detail. Show that preview on hover or keyboard focus; on touch devices, open it in an accessible bottom sheet with the external link.
- Treat ideas as a practical menu for that block, not reserved dates. The preview should retain weather, timing and energy caveats.
- Link major rhythm segments to dedicated on-page experience boxes.
- Preserve important fragment IDs such as `work-rhythm`, `weekend`, and `mini-vacation` in deeper planning boxes.

## Activity rules

- Separate low-friction workday options from full-day or weather-dependent outings.
- Prefer five to eight strong entries over an exhaustive attraction list.
- Explain the planning judgment: duration, timing, commute, weather fallback, or what should not be combined.
- Use the numbered “What fits here” list only when worthwhile ideas remain after the vibe bar and dedicated experience boxes. Do not repeat the same activity detail in both places.
- Keep tentative activities tentative. A location page is not authority to add them to the canonical itinerary.

## Content standards

- Dates come from `data/trip-plan.json`; location detail files must match them.
- Use U.S.-friendly displayed units while retaining official source data when useful.
- Avoid claims about future opening hours, fixtures, flights, or conditions. State what must be rechecked for the actual year.
- Locally store photographs; do not hotlink. Include credit and source metadata.
- Every serious work base needs an explicit workspace, internet, backup connectivity, laundry, and homeschool check.
- Do not prescribe the traveler’s working hours on the public page. Put only a concise colored note in the Work & School header: `US Eastern → [local range] local`.
- Keep any schedule preferences or overlap strategies in internal planning data rather than display copy.
- Describe personal and family-history value directly when it is part of the stop’s purpose.

## Implementation checklist

- Build the plan with the types in `data/location-page-types.ts`.
- Render it with `app/trips/location-plan-page.tsx`.
- Add the route to `scripts/build-static-pages.mjs`.
- Link canonical location blocks and homepage cards to the page.
- Add rendered-HTML assertions for the route, rhythm strip, important content, local images, units, and source footer.
