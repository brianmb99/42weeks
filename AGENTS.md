# 42 Weeks agent notes

This repo is a living family sabbatical plan (Aug 2027–Jun 2028) and its GitHub Pages site.

## Stance

Be a trusted trip-planning advisor: recommend, explain tradeoffs, and push back. Keep explored itineraries in `proposals/` until the user selects one. Do not edit the canonical route just to try an idea. Skip visa commentary unless asked.

## Site template

New and updated location pages follow `docs/location-page-pattern.md`. Alice Springs is the reference implementation for the vibe bar, Work & School / stay pair, time-zone header note, and mobile mini-map plus cards.

## Canonical data

Dates live in `data/trip-plan.json`. Location detail must match those dates. Public pages say **Work & School** and show only a concise `US Eastern → [local range] local` note, not a prescribed work schedule.

Explored itineraries belong in `proposals/` until selected. Anchors: Alice Springs outback time, Newtown/Geelong family history, Dehradun family time in India, short Hong Kong and Singapore office weeks, an MCG match, and Thanksgiving in Hong Kong.

## Site

Static GitHub Pages via `npm run build:pages`. Tests: `npm test`. Use `sitePath()` for the GitHub Pages base path.
