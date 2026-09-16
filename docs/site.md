# Site structure

Read this first. Page-type patterns and `docs/visual-system.md` are the rest of the design system. Do not invent a new page type or restyle an existing one to “unify” tokens.

The site is a living family sabbatical plan. Public pages should let someone understand the stay, then plan it. `data/trip-plan.json` owns dates. Location pages must match those dates. Draft itineraries stay in `proposals/` until selected.

## Page types

| Type | When to use | Pattern | Reference |
| --- | --- | --- | --- |
| **Overview** | The homepage. Whole-trip collage, 90-day chapter bar, then region cards. | `docs/overview-pattern.md` | `app/page.tsx` |
| **Region hub** | A chapter with **two or more** stay pages. Stop-sequence bar, then linked cards. | `docs/region-hub-pattern.md` | Australia; Asia |
| **Location** | A city or working-base stay. Glance-first plan. | `docs/location-page-pattern.md` | Alice Springs |
| **Nested plan** | A child of a location: road trip, kayak expedition, mixed work week. | `docs/nested-plan-pattern.md` | GOR; kayak routes |
| **Calendar** | Day-by-day work / travel / vacation tool. | `docs/calendar-pattern.md` | `app/calendar/` |

Shared chrome: `SiteNav` (`app/site-nav.tsx`) plus `sitePath()` for every in-site href and image.

There is **no Europe hub**. New Zealand and the Alps are single-stop chapters: top-level nav goes straight to Wānaka and `/alps`. Do not add a Europe landing until Copenhagen is a real location page.

## Hierarchy

```
Overview (/)
├── Calendar (/calendar)
├── Australia hub (/australia)
│   ├── Melbourne, Newtown/Geelong, Alice Springs, Sydney, Brisbane
│   └── Nested standing in for a stay: Whitsundays working week → kayak routes
│       Nested under Geelong: Great Ocean Road
├── Asia hub (/asia)
│   └── India, Hong Kong
├── Wānaka (/new-zealand/wanaka)     ← no NZ hub
└── Alps (/alps)                    ← no Europe hub
```

A location page is the default for a stay. A nested plan exists only when the activity needs its own sequence, map, or decision that would swamp the parent.

## Shared DNA

All public pages should feel like one site:

- Inter Tight, warm ink, uppercase 10px kickers, tight display titles
- `SiteNav`, then a constrained main column
- A facts row (dates · nights · character)
- Photographs stored under `public/images/`
- Proportional time bars at the matching scale (below)
- Green for in-site links; no hotlinked photos

The visual tokens and known exceptions are in `docs/visual-system.md`.

## Time bars (three scales)

Same idea, different grain. Do not mix grains on one bar.

1. **Overview** — 90-day chapters (`home-overview-bar`). Labels: `Australia`, `India`, `Alps`.
2. **Region hub** — stay sequence (`RegionRhythm`). Labels: `Great Ocean Road`, `Whitsundays`.
3. **Location** — stay rhythm (`vibe-map`). Segments: arrive, Work & School, weekend, travel.

Desktop: proportional widths and full labels. Mobile: keep true widths; do not horizontally scroll. Short `mapLabel`s on the bar; names and dates in a key or stacked cards.

## Copy rules that apply everywhere

- Say **Work & School**, never “Work + school”.
- Public pages do not prescribe working hours. Show only `US Eastern → [local range] local` in the Work & School header.
- Internal JSON may still hold a work-hour strategy.
- Homepage and hub **category** labels may use “+” (`Work + reset`, `Family history + work`). That is not the Work & School phrase.
- Do not comment on visas unless asked.

## Intentional exceptions

These look like drift. Keep them unless the page is being rewritten for another reason.

| Surface | What it does | Why it stays |
| --- | --- | --- |
| Calendar | White paper, work/off/travel/vacation colors, interactive weeks | It is a tool, not a stay story |
| GOR nested plan | White paper, day-by-day, indented header | Sequence and overnight map matter more than vibe |
| Kayak nested plans | Teal/green, rank badge, cream-green paper | Expedition pages need ranking and marine risk, not stay rhythm |
| Queensland working week | Own template; default weekday hours still on the page | Short mixed work/vacation week; it is also the Whitsundays “location” page in nav |
| Homepage | Slightly creamier paper; dark Europe chapter; photo collage | Overview needs more atmosphere than a location page |
| Single-stop chapters | No NZ or Europe hub | A hub with one card is worse than a direct location page |
| CSS token prefixes | `--aus-*`, `--location-*`, `--qld-*`, `--kayak-*`, `--route-*` | Same family, duplicated for historical reasons. Do not restyle to unify. |

## Adding a stay

1. Put dates in `data/trip-plan.json`.
2. If the chapter already has a hub (Australia, Asia), add a stop card and `RegionRhythm` entry.
3. If it is the only stay in the chapter (Wānaka, Alps), skip the hub and link nav straight to the location page.
4. Author a `LocationPlanPage` from `docs/location-page-pattern.md`.
5. Add nested plans only when the parent would otherwise drown.
6. Wire `SiteNav`, homepage collage/cards, `scripts/build-static-pages.mjs`, and tests.
7. Keep explored alternatives in `proposals/` until selected.
