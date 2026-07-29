"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import tripPlan from "../../data/trip-plan.json";

type TimelineEntry = (typeof tripPlan.timeline)[number];
type MarketEntry = {
  id: string;
  type: "market-holiday" | "market-early-close";
  start: string;
  title: string;
  context: string;
};
type CalendarEntry = TimelineEntry | MarketEntry;
type LocationEntry = TimelineEntry & {
  type: "location";
  end: string;
  days: number;
  color: string;
};
type DayStatus = "work" | "off" | "travel" | "vacation";
type DayOverride = {
  date: string;
  status: Exclude<DayStatus, "travel">;
  note: string | null;
};
type DayModel = {
  date: Date;
  iso: string;
  entries: CalendarEntry[];
  location: LocationEntry;
  status: DayStatus;
  note: string | null;
};
type WeekModel = {
  number: number;
  days: DayModel[];
  start: string;
  end: string;
};
type RailSegment = {
  id: string;
  title: string;
  color: string;
  textColor: string;
  shortLabel: boolean;
  top: number;
  height: number;
};

const locations = tripPlan.timeline.filter(
  (entry): entry is LocationEntry =>
    entry.type === "location" &&
    typeof entry.end === "string" &&
    typeof entry.days === "number" &&
    typeof entry.color === "string",
);
const marketEntries: MarketEntry[] = tripPlan.marketCalendar.dates.map((entry) => ({
  id: entry.id,
  type:
    entry.status === "closed"
      ? "market-holiday"
      : "market-early-close",
  start: entry.date,
  title:
    entry.status === "closed"
      ? `NYSE closed — ${entry.title}`
      : `NYSE closes 1:00 p.m. — ${entry.title}`,
  context: entry.note,
}));
const datedEntries: CalendarEntry[] = [
  ...tripPlan.timeline.filter((entry) => entry.type !== "location"),
  ...marketEntries,
];
const dayOverrides = tripPlan.dayPlanning.overrides as DayOverride[];

function localDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

function isoDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(value: Date, days: number) {
  const next = new Date(value);
  next.setDate(next.getDate() + days);
  return next;
}

function datesBetween(start: string, end: string) {
  const dates: Date[] = [];
  for (
    let date = localDate(start);
    date <= localDate(end);
    date = addDays(date, 1)
  ) {
    dates.push(date);
  }
  return dates;
}

function compactDate(value: string, year = true) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(year ? { year: "numeric" } : {}),
  }).format(localDate(value));
}

function monthName(value: Date, short = false) {
  return new Intl.DateTimeFormat("en-US", {
    month: short ? "short" : "long",
    year: "numeric",
  }).format(value);
}

function dayParts(value: Date) {
  return {
    weekday: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(value),
    month: new Intl.DateTimeFormat("en-US", { month: "short" }).format(value),
    day: value.getDate(),
  };
}

function entriesForDate(date: string) {
  return datedEntries.filter((entry) => {
    if (entry.type === "travel" && entry.end) {
      return entry.start <= date && entry.end >= date;
    }
    return entry.start === date;
  });
}

function locationForDate(date: string) {
  const location = locations.find(
    (entry) => entry.start <= date && entry.end >= date,
  );
  if (!location) throw new Error(`No location covers ${date}`);
  return location;
}

function statusForDate(date: Date, entries: CalendarEntry[]): DayStatus {
  if (entries.some((entry) => entry.type === "travel")) return "travel";

  const override = dayOverrides.find((entry) => entry.date === isoDate(date));
  if (override) return override.status;
  if (entries.some((entry) => entry.type === "market-holiday")) {
    return tripPlan.dayPlanning.marketHolidayDefault as DayStatus;
  }

  const weekend = date.getDay() === 0 || date.getDay() === 6;
  return weekend
    ? (tripPlan.dayPlanning.weekendDefault as DayStatus)
    : (tripPlan.dayPlanning.weekdayDefault as DayStatus);
}

const allTripDays = datesBetween(tripPlan.trip.start, tripPlan.trip.end);
const dayModels: DayModel[] = allTripDays.map((date) => {
  const iso = isoDate(date);
  const entries = entriesForDate(iso);
  const override = dayOverrides.find((entry) => entry.date === iso);
  return {
    date,
    iso,
    entries,
    location: locationForDate(iso),
    status: statusForDate(date, entries),
    note: override?.note ?? null,
  };
});
const weeks: WeekModel[] = Array.from(
  { length: Math.ceil(dayModels.length / 7) },
  (_, index) => {
    const days = dayModels.slice(index * 7, index * 7 + 7);
    return {
      number: index + 1,
      days,
      start: days[0].iso,
      end: days[days.length - 1].iso,
    };
  },
);
const fullWeeks = Math.floor(allTripDays.length / 7);
const remainingDays = allTripDays.length % 7;
const monthLinks = allTripDays.reduce<Array<{ id: string; label: string }>>(
  (result, date) => {
    const id = `month-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!result.some((item) => item.id === id)) {
      result.push({ id, label: monthName(date, true) });
    }
    return result;
  },
  [],
);

function dayTooltip(day: DayModel) {
  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(day.date);
  const status =
    day.status === "travel"
      ? "Travel"
      : day.status === "vacation"
        ? "Vacation"
      : day.status === "work"
        ? "Work"
        : "Not working";
  return [
    date,
    status,
    ...(day.note ? [day.note] : []),
    ...day.entries.map((entry) => entry.title),
  ].join("\n");
}

function EventLine({ entries }: { entries: CalendarEntry[] }) {
  if (entries.length === 0) return <span className="empty-event">—</span>;

  return (
    <>
      {entries.map((entry, index) => {
        const fixed = entry.type === "event" && entry.fixed;
        const href = "href" in entry ? entry.href : null;
        return (
          <span
            className={`day-event event-${entry.type} ${fixed ? "is-fixed" : ""}`}
            title={entry.context ?? entry.title}
            key={entry.id}
          >
            {index > 0 && <i aria-hidden="true"> · </i>}
            {entry.type === "travel" && <b aria-hidden="true">→</b>}
            {fixed && <b className="fixed-mark" aria-label="Fixed date">■</b>}
            {href ? (
              <Link className="event-detail-link" href={href}>
                {entry.title} <span aria-hidden="true">↗</span>
              </Link>
            ) : (
              entry.title
            )}
          </span>
        );
      })}
    </>
  );
}

function DayRow({ day }: { day: DayModel }) {
  const parts = dayParts(day.date);
  const monthStart = day.date.getDate() === 1;

  return (
    <div
      className={`day-row status-${day.status} ${day.date.getDay() === 1 ? "is-monday" : ""} ${monthStart ? "is-month-start" : ""}`}
      data-date={day.iso}
    >
      <span
        className="status-box"
        title={dayTooltip(day)}
      />
      <span className="weekday">{parts.weekday}</span>
      <time dateTime={day.iso}>
        <span className="date-month">{parts.month}</span>
        <strong>{parts.day}</strong>
      </time>
      <div className="events-cell">
        <EventLine entries={day.entries} />
      </div>
    </div>
  );
}

function groupDaysByLocation(days: DayModel[]) {
  return days.reduce<Array<{ location: LocationEntry; days: DayModel[] }>>(
    (result, day) => {
      const current = result[result.length - 1];
      if (current?.location.id === day.location.id) {
        current.days.push(day);
      } else {
        result.push({ location: day.location, days: [day] });
      }
      return result;
    },
    [],
  );
}

function WeekDetail({ week }: { week: WeekModel }) {
  return (
    <div className="week-detail" id={`week-${week.number}-detail`}>
      {groupDaysByLocation(week.days).map((group) => (
        <div
          className="week-location-group"
          style={{ "--location-color": group.location.color } as React.CSSProperties}
          key={`${week.number}-${group.location.id}`}
        >
          <aside className="week-location-bracket">
            <strong>{group.location.title}</strong>
          </aside>
          <div className="week-day-list">
            {group.days.map((day) => <DayRow day={day} key={day.iso} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusPattern({ days }: { days: DayModel[] }) {
  const label = days
    .map((day) => `${day.iso}: ${day.status === "off" ? "not working" : day.status}`)
    .join(", ");
  return (
    <span className="week-pattern" aria-label={label}>
      {days.map((day) => (
        <i
          className={`pattern-box status-${day.status}`}
          title={dayTooltip(day)}
          key={day.iso}
        />
      ))}
    </span>
  );
}

function uniqueWeekLocations(week: WeekModel) {
  return week.days.reduce<LocationEntry[]>((result, day) => {
    if (!result.some((location) => location.id === day.location.id)) {
      result.push(day.location);
    }
    return result;
  }, []);
}

function weekEvents(week: WeekModel) {
  return week.days
    .flatMap((day) => day.entries)
    .filter(
      (entry, index, entries) =>
        entries.findIndex((candidate) => candidate.id === entry.id) === index,
    );
}

function monthAnchors(week: WeekModel) {
  return week.days
    .filter(
      (day) =>
        day.date.getDate() === 1 || day.iso === tripPlan.trip.start,
    )
    .map(
      (day) =>
        `month-${day.date.getFullYear()}-${String(day.date.getMonth() + 1).padStart(2, "0")}`,
    );
}

function railTextColor(color: string) {
  const value = color.replace("#", "");
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;
  return luminance > 154 ? "#1c2528" : "#ffffff";
}

function collapsedDatePosition(date: string, endEdge = false) {
  const dayIndex = dayModels.findIndex((day) => day.iso === date);
  const weekIndex = Math.floor(dayIndex / 7);
  const week = weeks[weekIndex];
  const indexInWeek = dayIndex - weekIndex * 7;
  return weekIndex * 34 + ((indexInWeek + (endEdge ? 1 : 0)) / week.days.length) * 34;
}

function initialRailSegments(): RailSegment[] {
  return locations.map((location) => {
    const top = collapsedDatePosition(location.start);
    const bottom = collapsedDatePosition(location.end, true);
    return {
      id: location.id,
      title: location.title,
      color: location.color,
      textColor: railTextColor(location.color),
      shortLabel: location.days <= 8,
      top,
      height: bottom - top,
    };
  });
}

function weekNumbersForLocation(locationId: string) {
  return weeks
    .filter((week) =>
      week.days.some((day) => day.location.id === locationId),
    )
    .map((week) => week.number);
}

export default function CalendarPlanner() {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set());
  const [railSegments, setRailSegments] =
    useState<RailSegment[]>(initialRailSegments);
  const calendarRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const calendar = calendarRef.current;
    if (!calendar) return;

    function measureDate(date: string, endEdge = false) {
      if (!calendar) return 0;
      const rootRect = calendar.getBoundingClientRect();
      const dayIndex = dayModels.findIndex((day) => day.iso === date);
      const weekIndex = Math.floor(dayIndex / 7);
      const week = weeks[weekIndex];
      const indexInWeek = dayIndex - weekIndex * 7;
      const row = calendar.querySelector<HTMLElement>(`[data-date="${date}"]`);

      if (row) {
        const rect = row.getBoundingClientRect();
        return (endEdge ? rect.bottom : rect.top) - rootRect.top;
      }

      const summary = calendar.querySelector<HTMLElement>(
        `[data-week="${week.number}"] .week-summary`,
      );
      if (!summary) return 0;
      const rect = summary.getBoundingClientRect();
      const fraction =
        (indexInWeek + (endEdge ? 1 : 0)) / week.days.length;
      return rect.top - rootRect.top + rect.height * fraction;
    }

    function measureRail() {
      setRailSegments(
        locations.map((location) => {
          const top = measureDate(location.start);
          const bottom = measureDate(location.end, true);
          return {
            id: location.id,
            title: location.title,
            color: location.color,
            textColor: railTextColor(location.color),
            shortLabel: location.days <= 8,
            top,
            height: Math.max(2, bottom - top),
          };
        }),
      );
    }

    measureRail();
    window.addEventListener("resize", measureRail);
    return () => window.removeEventListener("resize", measureRail);
  }, [expandedWeeks]);

  function toggleWeek(number: number) {
    setExpandedWeeks((current) => {
      const next = new Set(current);
      if (next.has(number)) next.delete(number);
      else next.add(number);
      return next;
    });
  }

  function expandAll() {
    setExpandedWeeks(new Set(weeks.map((week) => week.number)));
  }

  function collapseAll() {
    setExpandedWeeks(new Set());
  }

  function toggleLocation(locationId: string) {
    const locationWeeks = weekNumbersForLocation(locationId);
    setExpandedWeeks((current) => {
      const next = new Set(current);
      const allExpanded = locationWeeks.every((number) => next.has(number));
      locationWeeks.forEach((number) => {
        if (allExpanded) next.delete(number);
        else next.add(number);
      });
      return next;
    });
  }

  return (
    <main className="calendar-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{tripPlan.title}</p>
          <h1>Calendar</h1>
          <p className="trip-range">
            {compactDate(tripPlan.trip.start)} – {compactDate(tripPlan.trip.end)}
            <span>
              {fullWeeks} weeks{remainingDays ? ` + ${remainingDays} days` : ""}
              {" · "}{allTripDays.length} days
            </span>
          </p>
        </div>
        <Link href="/" className="back-link">Current planner</Link>
      </header>

      <div className="calendar-tools">
        <nav className="month-nav" aria-label="Jump to month">
          {monthLinks.map((month) => (
            <a href={`#${month.id}`} key={month.id}>{month.label}</a>
          ))}
        </nav>
        <div className="status-key" aria-label="Day shading">
          <span><i className="status-sample sample-work" />Work</span>
          <span><i className="status-sample sample-travel" />Travel</span>
          <span><i className="status-sample sample-off" />Not working</span>
          <span><i className="status-sample sample-vacation" />Vacation</span>
          <span><i className="fixed-event-sample">■</i>Fixed event</span>
          <small>Weekdays/work and weekends/off are initial assumptions.</small>
          <div className="all-controls">
            <button type="button" aria-label="Expand all weeks" onClick={expandAll}>+ all</button>
            <button type="button" aria-label="Collapse all weeks" onClick={collapseAll}>− all</button>
          </div>
        </div>
        <div className="week-headings" aria-hidden="true">
          <span />
          <span>Week</span>
          <span>Dates</span>
          <span>Pattern</span>
          <span>Description</span>
        </div>
      </div>

      <section
        className="week-calendar"
        aria-label={`${weeks.length} planning weeks`}
        ref={calendarRef}
      >
        <aside className="location-rail" aria-label="Trip locations">
          {railSegments.map((segment) => {
            const locationWeeks = weekNumbersForLocation(segment.id);
            const allExpanded = locationWeeks.every((number) =>
              expandedWeeks.has(number),
            );
            const action = allExpanded ? "Collapse" : "Expand";
            return (
              <button
                type="button"
                className={`location-rail-segment ${segment.shortLabel ? "is-short" : ""}`}
                style={
                  {
                    "--rail-color": segment.color,
                    "--rail-text": segment.textColor,
                    top: segment.top,
                    height: segment.height,
                  } as React.CSSProperties
                }
                aria-label={`${action} all weeks in ${segment.title}`}
                aria-pressed={allExpanded}
                title={`${action} all weeks in ${segment.title}`}
                onClick={() => toggleLocation(segment.id)}
                key={segment.id}
              >
                <span>{segment.title}</span>
              </button>
            );
          })}
        </aside>
        {weeks.map((week) => {
          const expanded = expandedWeeks.has(week.number);
          const weekLocations = uniqueWeekLocations(week);
          const events = weekEvents(week).filter(
            (entry) =>
              entry.type !== "market-holiday" &&
              entry.type !== "market-early-close",
          );

          return (
            <section
              className={`week-block ${expanded ? "is-expanded" : ""}`}
              style={
                {
                  "--week-color":
                    weekLocations.length === 1 ? weekLocations[0].color : "#58666b",
                } as React.CSSProperties
              }
              data-week={week.number}
              key={week.number}
            >
              {monthAnchors(week).map((id) => (
                <span className="month-anchor" id={id} key={id} />
              ))}
              <button
                type="button"
                className="week-summary"
                aria-expanded={expanded}
                aria-controls={`week-${week.number}-detail`}
                aria-label={`${expanded ? "Collapse" : "Expand"} week ${week.number}, ${compactDate(week.start, false)} to ${compactDate(week.end, false)}`}
                onClick={() => toggleWeek(week.number)}
              >
                <span className="week-toggle" aria-hidden="true">{expanded ? "−" : "+"}</span>
                <strong className="week-number">W{String(week.number).padStart(2, "0")}</strong>
                <span className="week-dates">
                  {compactDate(week.start, false)}–{compactDate(week.end, false)}
                </span>
                <StatusPattern days={week.days} />
                <span className="week-event-summary">
                  {events.length ? (
                    events.map((entry, index) => (
                      <span key={entry.id}>
                        {index > 0 && <i aria-hidden="true"> · </i>}
                        {entry.type === "event" && entry.fixed && <b aria-label="Fixed">■</b>}
                        {entry.title}
                      </span>
                    ))
                  ) : (
                    <span className="empty-event">—</span>
                  )}
                </span>
              </button>
              {expanded && <WeekDetail week={week} />}
            </section>
          );
        })}
      </section>

      <footer className="calendar-footer">
        Exact working dates · <code>data/trip-plan.json</code> ·{" "}
        <a href={tripPlan.marketCalendar.sourceUrl}>NYSE holiday calendar</a>
      </footer>
    </main>
  );
}
