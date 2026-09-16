# Calendar pattern

The calendar is a **planning tool**, not a stay story. White paper, expandable weeks, and status colors are intentional.

**Reference:** `app/calendar/`.

## Job

Show every day from the trip start through the end, with:

- location rail grouped by stay
- work / off / travel / vacation status
- NYSE holidays and early closes
- notes from `data/trip-plan.json`

It must not become a second itinerary. Dates and statuses come from `trip-plan.json`. Clicking a location should open the existing hub or location page via `href` on that timeline entry.

## Visual

Keep the calendar palette (`--work`, `--off`, `--travel`, `--vacation`) even though it differs from location vibe-bar tones. Do not restyle it to warm paper or the location accent just to match.

Public copy on the calendar may name day status (`work`, `vacation`). It still should not prescribe a clock. Work-hour strategy stays in JSON notes, not in a “work 5 a.m.–1 p.m.” header.
