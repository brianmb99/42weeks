import Link from "next/link";
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

const DAY = 24 * 60 * 60 * 1000;
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
  return new Date(value.getTime() + days * DAY);
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
  return datedEntries.filter((entry) => entry.start === date);
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

function DayRow({
  date,
  isFirstTripDay,
}: {
  date: Date;
  isFirstTripDay: boolean;
}) {
  const iso = isoDate(date);
  const entries = entriesForDate(iso);
  const status = statusForDate(date, entries);
  const parts = dayParts(date);
  const monthStart = date.getDate() === 1 || isFirstTripDay;
  const monthId = monthStart
    ? `month-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    : undefined;

  return (
    <div
      className={`day-row status-${status} ${date.getDay() === 1 ? "is-monday" : ""} ${monthStart ? "is-month-start" : ""}`}
      id={monthId}
    >
      <span
        className="status-box"
        title={
          status === "travel"
            ? "Travel"
            : status === "work"
              ? "Speculative workday"
              : "Speculative non-work day"
        }
      />
      <span className="weekday">{parts.weekday}</span>
      <time dateTime={iso}>
        <span className="date-month">{parts.month}</span>
        <strong>{parts.day}</strong>
      </time>
      <div className="events-cell">
        <EventLine entries={entries} />
      </div>
    </div>
  );
}

function LocationSection({ location }: { location: LocationEntry }) {
  const dates = datesBetween(location.start, location.end);

  return (
    <section
      className="location-section"
      style={{ "--location-color": location.color } as React.CSSProperties}
      aria-label={`${location.title}, ${compactDate(location.start)} through ${compactDate(location.end)}`}
    >
      <aside className="location-bracket">
        <div>
          <strong>{location.title}</strong>
          <span>{location.days} days</span>
        </div>
      </aside>
      <div className="day-list">
        {dates.map((date) => (
          <DayRow
            date={date}
            isFirstTripDay={isoDate(date) === tripPlan.trip.start}
            key={isoDate(date)}
          />
        ))}
      </div>
    </section>
  );
}

export default function CalendarPlanner() {
  return (
    <main className="calendar-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{tripPlan.title}</p>
          <h1>Working calendar</h1>
          <p className="trip-range">
            {compactDate(tripPlan.trip.start)} – {compactDate(tripPlan.trip.end)}
            <span>{allTripDays.length} days</span>
          </p>
        </div>
        <Link href="/" className="back-link">
          Current planner
        </Link>
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
        </div>
        <div className="column-headings" aria-hidden="true">
          <span>Location</span>
          <span>Day</span>
          <span>Schedule</span>
        </div>
      </div>

      <section className="day-calendar" aria-label="Day-by-day trip calendar">
        {locations.map((location) => (
          <LocationSection location={location} key={location.id} />
        ))}
      </section>

      <footer className="calendar-footer">
        Exact working dates · <code>data/trip-plan.json</code>
      </footer>
    </main>
  );
}
