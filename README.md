# 42 Weeks

A living planning site for a family sabbatical from September 2027 through June 2028.

[Live site](https://brianmb99.github.io)

The site includes:

- the definitive date-based itinerary in `data/trip-plan.json`;
- an expandable weekly calendar with work, travel, vacation, and NYSE holidays;
- a broad trip overview; and
- detail pages for the Great Southern Touring Route, Hamilton Island, and Outback Queensland.

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

Pushes to `main` publish the generated static routes to GitHub Pages.
