# Visual system

The site should look like one family of pages, not a design-system rewrite. Copy these relationships. Do not merge CSS custom properties just to make names match.

## Type

| Role | Size | Weight | Tracking | Notes |
| --- | --- | --- | --- | --- |
| Kicker / eyebrow | 10px | 750–800 | 0.10–0.12em | Uppercase, muted |
| Display title | `clamp(38px, 6vw, 64px)` | 650 | about −0.055em | Line-height ~0.95 |
| Section title | `clamp(26px, 3vw, 34px)` | 650 | about −0.04em | |
| Facts row | 12px | 650–700 | | Tabular nums; middots between items |
| Summary | 15–16px | 400–500 | | Max-width ~790px; line-height ~1.55–1.58 |
| Body / cards | 13–14px | 500 | | Muted secondary text 12px |
| Nav | 12px | 650 | | Sticky; optional regional subnav |

Font: **Inter Tight** via `var(--font-sans)`, with Arial as fallback. Calendar, GOR, and kayak pages keep the same family even when they redefine local colors.

## Color

Think in roles, not in hex equality.

| Role | Typical values | Use |
| --- | --- | --- |
| Ink | `#182226`–`#1d2528` | Titles, rules, strong UI |
| Muted | `#667278`–`#6c767a` | Kickers, secondary facts |
| Rule | `#d9dedf`–`#e4e8e8` | Hairlines |
| Paper | `#f6f4ee` homepage; `#f7f6f1` location/hub | Warm off-white |
| Link | `#315b54` | In-site text links and back links |
| Accent | `#1f6a57` location; `#1f7a63` homepage | Bars, selected nav, collage rule |
| Work tone | gray (`#8a9194` / `#a5aaad`) | Work & School segments |
| Vacation tone | green (`#1f6a57` / `#2e7845`) | Vacation / off |
| Travel tone | near-black | Travel days |
| Photo well | `#dfe4e3` | Gallery placeholders |

Do not introduce a new accent unless the page is a genuine exception (kayak marine teal is the existing one).

## Layout

- **Nav** is sticky, full width, white, 54px plus optional subnav.
- **Main column** is `width: min(1080–1120px, calc(100% - 32px))`, centered, with ~28–32px bottom padding.
- **Headers** on location, hub, Queensland, GOR, and kayak pages indent the title (~150px on desktop) so a back link or kicker can sit in the left gutter. Collapse the indent on small screens.
- **Bottom rules** are 2px ink under the page header; section breaks are 1px `--rule`.
- **Radius** is scarce. Cards and galleries are square-cornered. The vibe-bar hover card is the main rounded exception (`14px`).

## Photographs

- Store files in `public/images/...`. Never hotlink.
- Location pages: three images in `DestinationGallery` (featured + two). Nested plans may add a second gallery when the child activity is visually distinct (Hamilton Island + reef).
- Every image needs alt, credit, and source. Tests fail hotlinked `src` values.

## Components to reuse

- `SiteNav` — every public page
- `LocationPlanPage` — city / working-base stays
- `RegionRhythm` — Australia and Asia hubs
- `DestinationGallery` — photo boards
- `sitePath()` — every in-site URL and image path

Do not add a new gallery, nav, or time-bar component unless the existing one cannot express the grain.

## Motion and interaction

- Hover previews on desktop vibe-bar ideas; accessible bottom sheet on touch.
- Gallery images scale slightly on hover (`1.015`).
- Honor `prefers-reduced-motion`.
- Calendar weeks expand in place; that interaction is calendar-only.

## What not to “fix”

These are documented exceptions in `docs/site.md`, not unfinished polish:

- Calendar white background and status palette
- Kayak teal/green and rank badge
- GOR white paper and day list
- Duplicated `--aus-*` / `--location-*` / `--qld-*` tokens
- Homepage cream vs location ivory
- Queensland working-week layout (not `LocationPlanPage`)
