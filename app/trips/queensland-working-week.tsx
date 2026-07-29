import queensland from "../../data/queensland.json";
import SiteNav from "../site-nav";
import DestinationGallery, {
  type DestinationPhoto,
} from "./destination-gallery";
import "./queensland.css";

type Trip = typeof queensland.hamiltonIsland | typeof queensland.longreach;

const hamiltonPhotos: DestinationPhoto[] = [
  {
    src: "https://images.pexels.com/photos/35087571/pexels-photo-35087571.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Hamilton Island Marina surrounded by blue water and green islands",
    caption: "Hamilton Island Marina",
    credit: "Toki No Ori / Pexels",
    source:
      "https://www.pexels.com/photo/scenic-view-of-hamilton-island-marina-35087571/",
  },
  {
    src: "https://images.unsplash.com/photo-1706591791971-e64df1bc78f0?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    alt: "Aerial view of blue water and reef formations",
    caption: "Great Barrier Reef from above",
    credit: "Lorenzo Angeli / Unsplash",
    source:
      "https://unsplash.com/photos/an-aerial-view-of-the-great-barrier-reef-giCtF3YtEtc",
  },
  {
    src: "https://images.unsplash.com/photo-1633319377690-fa954d0fb59c?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    alt: "Aerial view of coral reef patterns in the ocean",
    caption: "Live coral on the Great Barrier Reef",
    credit: "GeoNadir / Unsplash",
    source:
      "https://unsplash.com/photos/an-aerial-view-of-a-coral-reef-in-the-ocean-eQZAqg-4sQQ",
  },
];

const outbackPhotos: DestinationPhoto[] = [
  {
    src: "https://images.pexels.com/photos/32915492/pexels-photo-32915492.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Aerial view of a red dirt road crossing the Australian Outback",
    caption: "The scale of the Australian Outback",
    credit: "Mark Direen / Pexels",
    source:
      "https://www.pexels.com/photo/aerial-view-of-the-rugged-australian-outback-32915492/",
  },
  {
    src: "https://images.pexels.com/photos/20534219/pexels-photo-20534219.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Remote red shed in a vast dry Australian landscape",
    caption: "Big sky and working landscape",
    credit: "Francesco Ungaro / Pexels",
    source:
      "https://www.pexels.com/photo/dirt-road-through-the-outback-in-australia-20534219/",
  },
  {
    src: "https://images.pexels.com/photos/32915389/pexels-photo-32915389.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Red soil and sparse vegetation beneath a blue Outback sky",
    caption: "Red earth, scrub, and open sky",
    credit: "Mark Direen / Pexels",
    source:
      "https://www.pexels.com/photo/vast-australian-outback-landscape-under-blue-sky-32915389/",
  },
];

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
  const isHamilton = trip.slug === queensland.hamiltonIsland.slug;
  const photos = isHamilton ? hamiltonPhotos : outbackPhotos;

  return (
    <>
      <SiteNav current={isHamilton ? "hamilton" : "outback"} />
      <main className="qld-page">
      <header className="qld-header">
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

      <DestinationGallery
        photos={photos}
        label={`${trip.title} photographs`}
      />

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
    </>
  );
}
