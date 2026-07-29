"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import tripPlan from "../../data/trip-plan.json";

const DAY = 24 * 60 * 60 * 1000;

type Density = "overview" | "weeks" | "days";
type Segment = (typeof tripPlan.segments)[number];
type Anchor = (typeof tripPlan.anchors)[number];

const densities: Record<
  Density,
  { label: string; pixelsPerDay: number; minimumHeight: number }
> = {
  overview: { label: "Overview", pixelsPerDay: 3.2, minimumHeight: 82 },
  weeks: { label: "Weeks", pixelsPerDay: 9, minimumHeight: 110 },
  days: { label: "Days", pixelsPerDay: 28, minimumHeight: 196 },
};

function localDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function differenceInDays(start: Date, end: Date) {
  return Math.round((end.getTime() - start.getTime()) / DAY);
}

function formatDate(value: string | Date, year = true) {
  const date = typeof value === "string" ? localDate(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    ...(year ? { year: "numeric" } : {}),
  }).format(date);
}

function formatCompactDate(value: string | Date) {
  const date = typeof value === "string" ? localDate(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function tickDates(segment: Segment, density: Density) {
  const start = localDate(segment.start);
  const end = localDate(segment.end);
  const ticks: Date[] = [];

  for (let date = new Date(start); date <= end; date = addDays(date, 1)) {
    const isFirst = date.getTime() === start.getTime();
    const isLast = date.getTime() === end.getTime();
    const isMonday = date.getDay() === 1;
    const isMonthStart = date.getDate() === 1;

    if (
      density === "days" ||
      (density === "weeks" && (isFirst || isLast || isMonday)) ||
      (density === "overview" && (isFirst || isLast || isMonthStart))
    ) {
      ticks.push(new Date(date));
    }
  }

  return ticks;
}

function tickPosition(segment: Segment, date: Date) {
  if (segment.days <= 1) return 0;
  return (differenceInDays(localDate(segment.start), date) / (segment.days - 1)) * 100;
}

function SegmentRow({
  segment,
  density,
  anchors,
}: {
  segment: Segment;
  density: Density;
  anchors: Anchor[];
}) {
  const settings = densities[density];
  const contentMinimum = anchors.length
    ? 82 + anchors.length * 58
    : settings.minimumHeight;
  const rowHeight = Math.max(
    settings.minimumHeight,
    contentMinimum,
    Math.round(segment.days * settings.pixelsPerDay),
  );
  const ticks = tickDates(segment, density);

  return (
    <section
      className={`segment-row density-${density}`}
      style={{ "--row-height": `${rowHeight}px` } as React.CSSProperties}
      aria-label={`${segment.name}, ${formatCompactDate(segment.start)} through ${formatCompactDate(segment.end)}`}
    >
      <div className="date-bookends" aria-hidden="true">
        <time dateTime={segment.start}>{formatCompactDate(segment.start)}</time>
        <span>{segment.days} days</span>
        <time dateTime={segment.end}>{formatCompactDate(segment.end)}</time>
      </div>

      <div className="vertical-track">
        <div className="track-line" />

        {ticks.map((date) => {
          const weekend = date.getDay() === 0 || date.getDay() === 6;
          const isBoundary =
            date.getTime() === localDate(segment.start).getTime() ||
            date.getTime() === localDate(segment.end).getTime();

          return (
            <div
              className={`date-tick ${weekend ? "is-weekend" : ""} ${isBoundary ? "is-boundary" : ""}`}
              style={{ top: `${tickPosition(segment, date)}%` }}
              key={date.toISOString()}
            >
              <span className="tick-dot" />
              <time dateTime={date.toISOString().slice(0, 10)}>
                {formatDate(date, density === "overview")}
              </time>
            </div>
          );
        })}

        <article
          className="destination-block"
          style={{ "--segment-color": segment.color } as React.CSSProperties}
        >
          <header className="destination-heading">
            <div>
              <p className="location-label">Location</p>
              <h2>{segment.name}</h2>
            </div>
            <div className="destination-dates">
              <strong>{formatCompactDate(segment.start)} – {formatCompactDate(segment.end)}</strong>
              <span>{segment.days} days</span>
            </div>
          </header>

          {anchors.length > 0 && (
            <div className="anchor-list" aria-label={`Anchor dates in ${segment.name}`}>
              {anchors.map((anchor) => (
                <div className="anchor-event" key={anchor.id}>
                  <time dateTime={anchor.date}>{formatCompactDate(anchor.date)}</time>
                  <div>
                    <strong>{anchor.name}</strong>
                    <p>{anchor.note}</p>
                  </div>
                  <span className={`certainty certainty-${anchor.certainty}`}>
                    {anchor.certainty.replace("-", " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  );
}

export default function CalendarPlanner() {
  const [density, setDensity] = useState<Density>("overview");
  const anchorsBySegment = useMemo(() => {
    return tripPlan.anchors.reduce<Record<string, Anchor[]>>((result, anchor) => {
      result[anchor.segmentId] ??= [];
      result[anchor.segmentId].push(anchor);
      return result;
    }, {});
  }, []);

  return (
    <main className="calendar-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{tripPlan.title}</p>
          <h1>Trip calendar</h1>
          <p className="trip-range">
            {formatCompactDate(tripPlan.trip.start)} – {formatCompactDate(tripPlan.trip.end)}
          </p>
        </div>
        <Link href="/" className="back-link">
          Current planner
        </Link>
      </header>

      <div className="calendar-toolbar">
        <div className="density-control" role="group" aria-label="Calendar detail">
          <span>Detail</span>
          {Object.entries(densities).map(([value, setting]) => (
            <button
              type="button"
              className={density === value ? "is-active" : ""}
              aria-pressed={density === value}
              onClick={() => setDensity(value as Density)}
              key={value}
            >
              {setting.label}
            </button>
          ))}
        </div>
        <p className="toolbar-help">
          Dates run top to bottom. Increase detail to reveal weeks or individual days.
        </p>
      </div>

      <div className="source-strip">
        <strong>Exact working dates</strong>
        <span>Definitive source: <code>data/trip-plan.json</code></span>
      </div>

      <div className="timeline-header" aria-hidden="true">
        <span>Date range</span>
        <span>Calendar</span>
        <span>Destination and anchors</span>
      </div>

      <div className="vertical-calendar">
        {tripPlan.segments.map((segment) => (
          <SegmentRow
            segment={segment}
            density={density}
            anchors={anchorsBySegment[segment.id] ?? []}
            key={segment.id}
          />
        ))}
      </div>

      <footer className="calendar-footer">
        End of working timeline · {formatCompactDate(tripPlan.trip.end)}
      </footer>
    </main>
  );
}
