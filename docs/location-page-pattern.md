# Location page pattern

Use `LocationPlanPage` for city and working-base pages. The page should let a reader understand the stay in under a minute, then provide enough detail to plan it.

## Required information order

1. **Purpose and facts** — why this stop exists, exact dates, nights, and work/vacation character.
2. **Photographs** — three useful, locally stored images with descriptive alt text, credit, and source.
3. **Stay rhythm** — a compact, chronological strip showing how the days divide among arrival, Work & School, family time, vacation, and travel.
4. **Where to stay** — one recommendation, meaningful alternatives only when location or commute changes the answer, and concrete housing requirements.
5. **What fits here** — a numbered, scannable activity list. Put timing first and the operational detail below it.
6. **Planning panels** — climate, work hours, homeschool, or a major decision that needs more explanation.
7. **Book first, judgment calls, and references**.

## Rhythm strip rules

- Use the strip for mutually exclusive time blocks, not a wishlist of attractions.
- Keep it chronological and proportional enough to show the shape of the stay.
- Use explicit tones: `arrival`, `work`, `family`, `vacation`, or `travel`.
- For a normal working base, show Work & School weeks and genuinely free weekends.
- A Work & School segment may contain up to four short weekday ideas in a two-column grid. Each idea must link to its detailed activity below.
- Treat those linked ideas as a practical menu for that block, not reserved dates. The detail copy should retain weather, timing and energy caveats.
- Preserve important fragment IDs such as `work-rhythm`, `weekend`, and `mini-vacation` in the deeper planning panels.

## Activity rules

- Separate low-friction workday options from full-day or weather-dependent outings.
- Prefer five to eight strong entries over an exhaustive attraction list.
- Explain the planning judgment: duration, timing, commute, weather fallback, or what should not be combined.
- Give every rhythm-linked activity a stable `id`; keep its rhythm label shorter than its detailed heading when necessary.
- Keep tentative activities tentative. A location page is not authority to add them to the canonical itinerary.

## Content standards

- Dates come from `data/trip-plan.json`; location detail files must match them.
- Use U.S.-friendly displayed units while retaining official source data when useful.
- Avoid claims about future opening hours, fixtures, flights, or conditions. State what must be rechecked for the actual year.
- Locally store photographs; do not hotlink. Include credit and source metadata.
- Every serious work base needs an explicit workspace, internet, backup connectivity, laundry, and homeschool check.
- Describe personal and family-history value directly when it is part of the stop’s purpose.

## Implementation checklist

- Build the plan with the types in `data/location-page-types.ts`.
- Render it with `app/trips/location-plan-page.tsx`.
- Add the route to `scripts/build-static-pages.mjs`.
- Link canonical location blocks and homepage cards to the page.
- Add rendered-HTML assertions for the route, rhythm strip, important content, local images, units, and source footer.
