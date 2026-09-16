# Nested plan pattern

A nested plan is a **child of a location**, not a peer of Australia or Asia. Use one when the activity needs a sequence, map, ranking, or booking decision that would swamp the parent location page.

Parent location pages still introduce the experience in a feature-plan box and link down.

## Current nested plans

| Parent | Nested route | Layout | Notes |
| --- | --- | --- | --- |
| Newtown / Geelong | `/trips/great-southern-touring-route` | `route.css` — day-by-day white itinerary | Selected Victorian road trip |
| Whitsundays | `/trips/hamilton-island-working-week` | `queensland.css` — mixed work/vacation week | Older than `LocationPlanPage`; keep until rewritten |
| Hamilton working week | `/trips/whitsundays-sea-kayaking/...` | `whitsundays-kayak.css` — ranked expeditions | Three live routes plus planning/booking |
| Archive | `/trips/longreach-outback-working-week` | same Queensland template | Still built; not on the selected route |

## Shared requirements

- `SiteNav` with the parent region current (`australiaCurrent` = `geelong` or `whitsundays`).
- Back-link to the parent location, not only to the hub.
- Dates must match `trip-plan.json` / the parent stay.
- Photographs stored locally; caption with credit.
- A clear recommendation when options are ranked (kayak first/second/third).
- Do not invent a fourth nested visual language. Prefer GOR, Queensland, or kayak.

## When to add one

Add a nested plan if any of these is true:

- The reader needs a day-by-day sequence (GOR).
- Options must be ranked with constraints (kayak routes).
- A short mixed week cannot be told as a normal working-base vibe bar (Hamilton).

Otherwise keep the detail on the location page as a feature-plan box (Alps ski programs, Wānaka glacier flights, Alice Springs weekends).

## Intentional visual exceptions

GOR, Queensland, and kayak pages predate `LocationPlanPage`. They keep their own paper, header indent, and accent. That is allowed. New nested plans should clone the closest of those three, not mint a fourth look.

The Queensland working week still **shows a default weekday clock** (`4:30 a.m.–12:30 p.m.`). Location pages must not do that. Do not copy this exception onto Alice, Wānaka, India, Hong Kong, or the Alps.

Whitsundays is special: the nested working-week page is also the stay in `SiteNav` (there is no `/australia/whitsundays` location page). GOR is listed in the Australia subnav because it is a selected week, not only a side trip. New nested plans do not automatically get a subnav slot.
