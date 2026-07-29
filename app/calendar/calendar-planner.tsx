import Link from "next/link";
import tripPlan from "../../data/trip-plan.json";

type TimelineEntry = (typeof tripPlan.timeline)[number];
type DateCluster = {
  date: string;
  entries: TimelineEntry[];
};

const DAY = 24 * 60 * 60 * 1000;
const LONG_GAP_DAYS = 28;
const PIXELS_PER_DAY = 4;

const locationNames = Object.fromEntries(
  tripPlan.timeline
    .filter((entry) => entry.type === "location")
    .map((entry) => [entry.locationId, entry.title]),
);

const clusters = tripPlan.timeline.reduce<DateCluster[]>((result, entry) => {
  const current = result[result.length - 1];
  if (current?.date === entry.start) {
    current.entries.push(entry);
  } else {
    result.push({ date: entry.start, entries: [entry] });
  }
  return result;
}, []);

function localDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

function daysBetween(start: string, end: string) {
  return Math.round((localDate(end).getTime() - localDate(start).getTime()) / DAY);
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

function compactDate(value: string, year = true) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(year ? { year: "numeric" } : {}),
  }).format(localDate(value));
}

function typeLabel(type: TimelineEntry["type"]) {
  if (type === "location") return "Location";
  if (type === "travel") return "Travel";
  return "Event";
}

function ClusterDate({ value }: { value: string }) {
  const date = dateParts(value);
  return (
    <time className="cluster-date" dateTime={value}>
      <span>{date.weekday}</span>
      <strong>{date.monthDay}</strong>
      <small>{date.year}</small>
    </time>
  );
}

function EventEntry({ entry }: { entry: TimelineEntry }) {
  const location = locationNames[entry.locationId];
  const showContext =
    entry.context &&
    (entry.type === "event" || entry.id === "travel-to-melbourne");
  const fixed = entry.type === "event" && entry.fixed;

  return (
    <div
      className={`event-entry event-${entry.type} ${fixed ? "is-fixed" : ""}`}
      style={
        entry.color
          ? ({ "--location-color": entry.color } as React.CSSProperties)
          : undefined
      }
    >
      <div className="event-meta">
        <span className="event-type">{typeLabel(entry.type)}</span>
        {entry.type === "location" && entry.end && (
          <>
            <span>through {compactDate(entry.end, false)}</span>
            <span>{entry.days} days</span>
          </>
        )}
        {entry.type === "event" && location && <span>{location}</span>}
        {fixed && <span className="fixed-label">Fixed</span>}
      </div>
      <h2>{entry.title}</h2>
      {showContext && <p>{entry.context}</p>}
    </div>
  );
}

function ElapsedGap({ from, to }: { from: string; to: string }) {
  const elapsedDays = daysBetween(from, to);
  if (elapsedDays <= 0) return null;

  const emptyDays = Math.max(0, elapsedDays - 1);
  const compressed = emptyDays > LONG_GAP_DAYS;
  const representedDays = compressed ? LONG_GAP_DAYS : emptyDays;
  const height = Math.max(12, representedDays * PIXELS_PER_DAY);

  return (
    <div
      className={`elapsed-gap ${compressed ? "is-compressed" : ""}`}
      style={{ "--gap-height": `${height}px` } as React.CSSProperties}
      aria-label={
        compressed
          ? `${emptyDays} days without a separate dated event, compressed`
          : `${emptyDays} days until the next dated event`
      }
    >
      {compressed && (
        <span className="gap-label">
          <i aria-hidden="true">∕ ∕</i>
          {emptyDays} days
        </span>
      )}
    </div>
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
        <div><span className="key-mark key-event" />Dated event</div>
        <div><span className="key-mark key-fixed" />Fixed date</div>
        <p>Spacing reflects elapsed time; long empty periods are compressed.</p>
      </section>

      <div className="source-line">
        Exact working dates · source: <code>data/trip-plan.json</code>
      </div>

      <section className="timeline" aria-label="Chronological trip timeline">
        {clusters.map((cluster, index) => {
          const nextDate =
            clusters[index + 1]?.date ??
            (cluster.date < tripPlan.trip.end ? tripPlan.trip.end : null);

          return (
            <div className="cluster-block" key={cluster.date}>
              <section className="date-cluster">
                <ClusterDate value={cluster.date} />
                <div
                  className={`cluster-marker ${
                    cluster.entries.length > 1
                      ? "marker-mixed"
                      : cluster.entries[0].type === "event" &&
                          cluster.entries[0].fixed
                        ? "marker-fixed"
                        : `marker-${cluster.entries[0].type}`
                  }`}
                  aria-hidden="true"
                >
                  <span />
                </div>
                <div className="cluster-events">
                  {cluster.entries.map((entry) => (
                    <EventEntry entry={entry} key={entry.id} />
                  ))}
                </div>
              </section>
              {nextDate && <ElapsedGap from={cluster.date} to={nextDate} />}
            </div>
          );
        })}

        <div className="timeline-end">
          <time dateTime={tripPlan.trip.end}>{compactDate(tripPlan.trip.end)}</time>
          <span aria-hidden="true" />
          <p>End of working timeline</p>
        </div>
      </section>
    </main>
  );
}
