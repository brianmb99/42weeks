# 42 Weeks

A living planning site for a family sabbatical from September 2027 through June 2028.

The first version includes:

- a proportional overview of the full trip;
- destination-by-destination planning views;
- dated anchors and open decisions;
- a browser-local scratchpad with Markdown export; and
- a small, plan-aware idea concierge preview.

## Local development

Use Node 22 or newer.

```sh
npm install
npm run dev
```

## Validation

```sh
npm run build
node --test tests/rendered-html.test.mjs
```
