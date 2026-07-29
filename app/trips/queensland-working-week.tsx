import Link from "next/link";
import queensland from "../../data/queensland.json";
import "./queensland.css";

type Trip = typeof queensland.hamiltonIsland | typeof queensland.longreach;

function dateLabel(value: string, weekday = false) {
  return new Intl.DateTimeFormat("en-US", {
    ...(weekday ? { weekday: "long" } : {}),
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function LinkList({ links }: { links: Trip["links"] }) {
  return (
    <div className="qld-links">
      {links.map((link) => (
        <a href={link.url} rel="noreferrer" target="_blank" key={link.url}>
          {link.title} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

function SimpleList({ items }: { items: string[] }) {
  return (
    <ul className="qld-list">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function QueenslandWorkingWeek({ trip }: { trip: Trip }) {
  const other =
    trip.slug === queensland.hamiltonIsland.slug
      ? queensland.longreach
      : queensland.hamiltonIsland;

  return (
    <main className="qld-page">
      <header className="qld-header">
        <div className="qld-topline">
          <Link href="/calendar">← Calendar</Link>
          <Link href={`/trips/${other.slug}`}>Next: {other.title} →</Link>
        </div>
        <p className="qld-eyebrow">{trip.eyebrow}</p>
        <h1>{trip.title}</h1>
        <div className="qld-facts">
          <span>{dateLabel(trip.start)}–{dateLabel(trip.end)}</span>
          <span>{trip.nights} nights</span>
          <span>Work Mon–Wed</span>
          <span>Vacation Thu–Fri</span>
        </div>
        <p className="qld-summary">{trip.summary}</p>
        <p className="qld-status">{queensland.status}</p>
      </header>

      <section className="qld-rhythm" aria-labelledby="rhythm-title">
        <div>
          <p className="qld-eyebrow">Default weekday rhythm</p>
          <h2 id="rhythm-title">Work first; keep the afternoon</h2>
        </div>
        <dl>
          <div>
            <dt>Work</dt>
            <dd>{queensland.shared.workPattern.workHours}</dd>
          </div>
          <div>
            <dt>Homeschool</dt>
            <dd>{queensland.shared.workPattern.schoolHours}</dd>
          </div>
          <div>
            <dt>Together</dt>
            <dd>Lunch, then activities from about 1:30 p.m.</dd>
          </div>
        </dl>
      </section>

      <section className="qld-sequence" aria-label="Arrival, work, vacation, and departure">
        <article className="qld-sequence-item is-travel">
          <time dateTime={trip.arrival.date}>{dateLabel(trip.arrival.date, true)}</time>
          <h2>{trip.arrival.title}</h2>
          <SimpleList items={trip.arrival.items} />
        </article>

        <article className="qld-sequence-item is-work" id="work-days">
          <time>
            {trip.slug === queensland.hamiltonIsland.slug
              ? "Mon–Wed · Oct 11–13"
              : "Mon–Wed · Oct 18–20"}
          </time>
          <h2>Three work & homeschool mornings</h2>
          <p>{queensland.shared.workPattern.principle}</p>
          <h3>Good afternoon / evening options</h3>
          <SimpleList items={trip.workAfternoons} />
        </article>

        <article className="qld-sequence-item is-vacation" id="vacation-days">
          <time>Thu–Fri · vacation</time>
          <h2>Two full excursion days</h2>
          <div className="qld-vacation-days">
            {trip.vacationDays.map((day) => (
              <div key={day.date}>
                <time dateTime={day.date}>{dateLabel(day.date, true)}</time>
                <h3>{day.title}</h3>
                <p>{day.plan}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="qld-sequence-item is-travel" id="departure">
          <time dateTime={trip.departure.date}>{dateLabel(trip.departure.date, true)}</time>
          <h2>{trip.departure.title}</h2>
          <SimpleList items={trip.departure.items} />
        </article>
      </section>

      <section className="qld-planning-grid">
        <article className="qld-panel qld-base">
          <p className="qld-eyebrow">Recommended base</p>
          <h2>{trip.base.recommendation}</h2>
          <p>{trip.base.reason}</p>
          {"backup" in trip.base && (
            <p className="qld-backup">
              <strong>Practical backup:</strong> {trip.base.backup}
            </p>
          )}
          <h3>Must have</h3>
          <SimpleList items={trip.base.requirements} />
        </article>

        <article className="qld-panel">
          <p className="qld-eyebrow">Connectivity standard</p>
          <h2>Do not make work depend on one link</h2>
          <SimpleList items={queensland.shared.connectivity} />
        </article>

        <article className="qld-panel">
          <p className="qld-eyebrow">Recheck before booking</p>
          <h2>Known cautions</h2>
          <SimpleList items={trip.cautions} />
        </article>

        <article className="qld-panel">
          <p className="qld-eyebrow">Place-based learning</p>
          <h2>Homeschool hooks</h2>
          <SimpleList items={trip.homeschool} />
        </article>
      </section>

      <section className="qld-booking">
        <div>
          <p className="qld-eyebrow">Sequence matters</p>
          <h2>Book first</h2>
        </div>
        <ol>
          {trip.bookFirst.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section className="qld-references">
        <div>
          <p className="qld-eyebrow">Official and planning links</p>
          <h2>References</h2>
        </div>
        <LinkList links={trip.links} />
      </section>

      <footer className="qld-footer">
        <span>
          Detail source: <code>Queensland Working Notes.md</code>
        </span>
        <span>
          Exact dates: <code>data/trip-plan.json</code>
        </span>
      </footer>
    </main>
  );
}
