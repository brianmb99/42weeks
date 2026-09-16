# Overview (homepage)

The homepage is the whole-trip landing page. It is not a location page and not a region hub.

**Reference:** `app/page.tsx` and `app/home.css`.

## Required order

1. `SiteNav` with `current="overview"`.
2. Collage of destination photographs. Each tile links to the stay (or nested plan) it represents.
3. Title, date range, and a short framing paragraph.
4. **Where the weeks go** — 90-day chapter bar (`home-overview-bar`). One block per chapter, proportional to days. Linked chapters go to the hub or, for single-stop chapters, straight to the location page.
5. Region sections with stay cards (Australia, Asia, New Zealand, Europe). Cards use a category label, title, dates, and one-line promise.

## Bar grain

Chapter labels only: `Australia`, `India`, `Hong Kong`, `New Zealand`, `Alps`. Do not put cities on this bar. Australia’s stops belong on `/australia`.

Desktop: full labels on the bar. Mobile: compact labels plus overview cards — the same anti-scroll rule as location vibe bars.

## Visual

Slightly creamier paper than location pages (`#f6f4ee`), a dark Europe chapter on the collage, and a green accent rule. Keep that extra atmosphere; do not flatten the homepage to location ivory.

Category labels may use “+” (`Work + reset`, `Family history + work`). Still never write “Work + school”.

Copenhagen (and the home/Snowbird reset) may appear as unlinked cards and collage tiles before those stays have location pages. That is allowed on the overview. It is not a reason to add a Europe hub or a stub `/copenhagen` route.
