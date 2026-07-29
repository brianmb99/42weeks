import Link from "next/link";
import tripPlan from "../../data/trip-plan.json";

type TimelineEntry = (typeof tripPlan.timeline)[number];

const locationNames = Object.fromEntries(
  tripPlan.timeline
    .filter((entry) => entry.type === "location")
    .map((entry) => [entry.locationId, entry.title]),
);

function localDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

function dateParts(value: string) {
  const date = localDate(value);
  return {
    weekday: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date),
    monthDay: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date),
    year: date.getFullYear(),
  };
}

function compactDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(localDate(value));
}

function typeLabel(type: TimelineEntry["type"]) {
  if (type === "location") return "Location";
  if (type === "travel") return "Travel";
  return "Anchor";
}

function TimelineDate({ entry }: { entry: TimelineEntry }) {
  const start = dateParts(entry.start);

  if (entry.end) {
    return (
      <div className="entry-date entry-date-range">
        <time dateTime={entry.start}>
          <span>{start.weekday}</span>
          <strong>{start.monthDay}</strong>
          <small>{start.year}</small>
        </time>
        <span className="date-through">to</span>
        <time dateTime={entry.end}>
          <strong>{dateParts(entry.end).monthDay}</strong>
          <small>{dateParts(entry.end).year}</small>
        </time>
      </div>
    );
  }

  return (
    <time className="entry-date" dateTime={entry.start}>
      <span>{start.weekday}</span>
      <strong>{start.monthDay}</strong>
      <small>{start.year}</small>
    </time>
  );
}

function TimelineRow({ entry }: { entry: TimelineEntry }) {
  const location = locationNames[entry.locationId];

  return (
    <article
      className={`timeline-row event-${entry.type}`}
      style={
        entry.color
          ? ({ "--location-color": entry.color } as React.CSSProperties)
          : undefined
      }
    >
      <TimelineDate entry={entry} />
      <div className="timeline-marker" aria-hidden="true">
        <span />
      </div>
      <div className="entry-content">
        <div className="entry-meta">
          <span className="event-type">{typeLabel(entry.type)}</span>
          {entry.type === "location" && entry.days && <span>{entry.days} days</span>}
          {entry.type === "anchor" && location && <span>{location}</span>}
        </div>
        <h2>{entry.title}</h2>
        {entry.type === "location" && entry.end && (
          <p className="date-summary">
            {compactDate(entry.start)} – {compactDate(entry.end)}
          </p>
        )}
        {entry.context && <p>{entry.context}</p>}
      </div>
    </article>
  );
}

export default function CalendarPlanner() {
  return (
    <main className="timeline-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{tripPlan.title}</p>
          <h1>Working timeline</h1>
          <p className="trip-range">
            {compactDate(tripPlan.trip.start)} – {compactDate(tripPlan.trip.end)}
          </p>
        </div>
        <Link href="/" className="back-link">
          Current planner
        </Link>
      </header>

      <section className="timeline-key" aria-label="Timeline key">
        <div><span className="key-mark key-location" />Location stay</div>
        <div><span className="key-mark key-travel" />Travel day</div>
        <div><span className="key-mark key-anchor" />Anchor date</div>
      </section>

      <div className="source-line">
        Exact working dates · source: <code>data/trip-plan.json</code>
      </div>

      <section className="timeline" aria-label="Chronological trip timeline">
        {tripPlan.timeline.map((entry) => (
          <TimelineRow entry={entry} key={entry.id} />
        ))}
      </section>

      <footer className="page-footer">
        End of working timeline · {compactDate(tripPlan.trip.end)}
      </footer>
    </main>
  );
}
