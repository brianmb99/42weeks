# 42 Weeks

A living planning site for a family sabbatical from August 2027 through June 2028.

[Live site](https://brianmb99.github.io/42weeks/)

The site includes:

- the definitive date-based itinerary in `data/trip-plan.json`;
- an expandable weekly calendar with work, travel, vacation, and NYSE holidays;
- a broad trip overview; and
- glance-first location plans for Melbourne, Newtown/Geelong, Alice Springs, Sydney, the Whitsundays, Brisbane, Singapore, Hong Kong, and Wānaka;
- and an explicit archive of superseded route models under `proposals/archive/`.

New location pages use the shared template and authoring guidance in
`docs/location-page-pattern.md`.

## Local development

Use Node 22 or newer.

```sh
npm install
npm run dev
```

## Validation

```sh
npm test
npm run build:pages
```

Pushes to `main` in [`brianmb99/42weeks`](https://github.com/brianmb99/42weeks)
publish the generated static routes to GitHub Pages.
