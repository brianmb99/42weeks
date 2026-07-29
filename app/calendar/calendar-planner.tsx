"use client";

import Link from "next/link";
import { useState } from "react";
import tripPlan from "../../data/trip-plan.json";

type TimelineEntry = (typeof tripPlan.timeline)[number];
type LocationEntry = TimelineEntry & {
  type: "location";
  end: string;
  days: number;
  color: string;
};
type DayStatus = "work" | "off" | "travel";
type DayOverride = {
  date: string;
  status: Exclude<DayStatus, "travel">;
  note: string | null;
};
type DayModel = {
  date: Date;
  iso: string;
  entries: TimelineEntry[];
  location: LocationEntry;
  status: DayStatus;
};
type WeekModel = {
  number: number;
  days: DayModel[];
  start: string;
  end: string;
};

const locations = tripPlan.timeline.filter(
  (entry): entry is LocationEntry =>
    entry.type === "location" &&
    typeof entry.end === "string" &&
    typeof entry.days === "number" &&
    typeof entry.color === "string",
);
const datedEntries = tripPlan.timeline.filter((entry) => entry.type !== "location");
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

function statusForDate(date: Date, entries: TimelineEntry[]): DayStatus {
  if (entries.some((entry) => entry.type === "travel")) return "travel";

  const override = dayOverrides.find((entry) => entry.date === isoDate(date));
  if (override) return override.status;

  const weekend = date.getDay() === 0 || date.getDay() === 6;
  return weekend
    ? (tripPlan.dayPlanning.weekendDefault as DayStatus)
    : (tripPlan.dayPlanning.weekdayDefault as DayStatus);
}

const allTripDays = datesBetween(tripPlan.trip.start, tripPlan.trip.end);
const dayModels: DayModel[] = allTripDays.map((date) => {
  const iso = isoDate(date);
  const entries = entriesForDate(iso);
  return {
    date,
    iso,
    entries,
    location: locationForDate(iso),
    status: statusForDate(date, entries),
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

function EventLine({ entries }: { entries: TimelineEntry[] }) {
  if (entries.length === 0) return <span className="empty-event">—</span>;

  return (
    <>
      {entries.map((entry, index) => {
        const fixed = entry.type === "event" && entry.fixed;
        return (
          <span
            className={`day-event event-${entry.type} ${fixed ? "is-fixed" : ""}`}
            title={entry.context ?? entry.title}
            key={entry.id}
          >
            {index > 0 && <i aria-hidden="true"> · </i>}
            {entry.type === "travel" && <b aria-hidden="true">→</b>}
            {fixed && <b className="fixed-mark" aria-label="Fixed date">■</b>}
            {entry.title}
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
    >
      <span
        className="status-box"
        title={
          day.status === "travel"
            ? "Travel"
            : day.status === "work"
              ? "Speculative workday"
              : "Speculative non-work day"
        }
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
        <i className={`pattern-box status-${day.status}`} key={day.iso} />
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

export default function CalendarPlanner() {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set());

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

  return (
    <main className="calendar-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{tripPlan.title}</p>
          <h1>Working calendar</h1>
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
          <span>Location</span>
          <span>Key dates / travel</span>
        </div>
      </div>

      <section className="week-calendar" aria-label={`${weeks.length} planning weeks`}>
        {weeks.map((week) => {
          const expanded = expandedWeeks.has(week.number);
          const weekLocations = uniqueWeekLocations(week);
          const events = weekEvents(week);

          return (
            <section
              className={`week-block ${expanded ? "is-expanded" : ""}`}
              style={
                {
                  "--week-color":
                    weekLocations.length === 1 ? weekLocations[0].color : "#58666b",
                } as React.CSSProperties
              }
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
                <span className="week-locations">
                  {weekLocations.map((location, index) => (
                    <span key={location.id}>
                      {index > 0 && <i aria-hidden="true"> → </i>}
                      <b style={{ "--dot-color": location.color } as React.CSSProperties} />
                      {location.title}
                    </span>
                  ))}
                </span>
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
        Exact working dates · <code>data/trip-plan.json</code>
      </footer>
    </main>
  );
}
