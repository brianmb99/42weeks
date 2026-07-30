import queensland from "../../data/queensland.json";
import {
  rankedKayakOptions,
  sharedKayakPlanning,
} from "../../data/whitsundays-kayaking";
import { sitePath } from "../../lib/site-path";
import SiteNav from "../site-nav";
import DestinationGallery, {
  type DestinationPhoto,
} from "./destination-gallery";
import "./queensland.css";

type Trip = typeof queensland.hamiltonIsland | typeof queensland.longreach;

const hamiltonPhotos: DestinationPhoto[] = [
  {
    src: "/images/whitsundays/hamilton-marina.jpg",
    alt: "Hamilton Island Marina surrounded by blue water and green islands",
    caption: "Hamilton Island Marina",
    credit: "Toki No Ori / Pexels",
    source:
      "https://www.pexels.com/photo/scenic-view-of-hamilton-island-marina-35087571/",
  },
  {
    src: "/images/whitsundays/reef-aerial.jpg",
    alt: "Aerial view of blue water and reef formations",
    caption: "Great Barrier Reef from above",
    credit: "Lorenzo Angeli / Unsplash",
    source:
      "https://unsplash.com/photos/an-aerial-view-of-the-great-barrier-reef-giCtF3YtEtc",
  },
  {
    src: "/images/whitsundays/coral-aerial.jpg",
    alt: "Aerial view of coral reef patterns in the ocean",
    caption: "Live coral on the Great Barrier Reef",
    credit: "GeoNadir / Unsplash",
    source:
      "https://unsplash.com/photos/an-aerial-view-of-a-coral-reef-in-the-ocean-eQZAqg-4sQQ",
  },
];

const outbackPhotos: DestinationPhoto[] = [
  {
    src: "/images/outback/aerial-road.jpg",
    alt: "Aerial view of a red dirt road crossing the Australian Outback",
    caption: "The scale of the Australian Outback",
    credit: "Mark Direen / Pexels",
    source:
      "https://www.pexels.com/photo/aerial-view-of-the-rugged-australian-outback-32915492/",
  },
  {
    src: "/images/outback/red-shed.jpg",
    alt: "Remote red shed in a vast dry Australian landscape",
    caption: "Big sky and working landscape",
    credit: "Francesco Ungaro / Pexels",
    source:
      "https://www.pexels.com/photo/dirt-road-through-the-outback-in-australia-20534219/",
  },
  {
    src: "/images/outback/red-earth.jpg",
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

function WhitsundaysKayakPlanning() {
  return (
    <section className="qld-kayak-plan" aria-labelledby="kayak-plan-title">
      <header>
        <div>
          <p className="qld-eyebrow">Current expedition recommendation</p>
          <h2 id="kayak-plan-title">
            Separate the reef day; choose the best paddling journey.
          </h2>
        </div>
        <p>
          Whitehaven–Henning–Paddle Bay is the preferred two-night
          expedition. Whitehaven–Chance–Henning is the more balanced fallback.
          Hook Island rises to first only when snorkeling is deliberately part
          of the expedition and northern Hook is genuinely calm.
        </p>
      </header>

      <div className="qld-kayak-fit">
        <article>
          <span>Sun–Tue</span>
          <strong>Hamilton Island base</strong>
          <p>
            Arrive Sunday; work and homeschool Monday and Tuesday. Ferry to the
            mainland Tuesday evening.
          </p>
        </article>
        <article>
          <span>Wednesday</span>
          <strong>Dedicated Hardy Reef day</strong>
          <p>
            Optional light work about 4:30–7:00 a.m., then the full-day boat
            trip from Port of Airlie. Serious snorkeling happens here.
          </p>
        </article>
        <article>
          <span>Thu–Sat</span>
          <strong>Three-day / two-night expedition</strong>
          <p>
            Shute Harbour briefing, Scamper drop, two island camps and a
            tide-driven Saturday pickup.
          </p>
        </article>
        <article>
          <span>Sunday</span>
          <strong>Fly to Outback Queensland</strong>
          <p>
            Proserpine → Brisbane → Longreach. Keep Outback at six nights.
          </p>
        </article>
      </div>

      <div className="qld-reef-rule">
        <div>
          <p className="qld-eyebrow">Snorkeling decision</p>
          <h3>{sharedKayakPlanning.snorkelingDecision.title}</h3>
        </div>
        <p>
          The practical default is the{" "}
          <a
            href={sharedKayakPlanning.reefTour.url}
            rel="noreferrer"
            target="_blank"
          >
            Hardy Reef full-day adventure
          </a>
          {" "}from Port of Airlie on Wednesday. The published 2026 schedule is
          the planning proxy; confirm the 2027 trip, child participation and
          Thursday operator handoff before booking.
        </p>
      </div>

      <div className="qld-kayak-options">
        {rankedKayakOptions.map((option) => (
          <a
            href={sitePath(`/trips/whitsundays-sea-kayaking/${option.slug}`)}
            key={option.slug}
          >
            <figure>
              <img
                src={sitePath(option.photos[0].src)}
                alt={option.photos[0].alt}
                loading="lazy"
              />
            </figure>
            <div>
              <span>
                Current choice {option.rank} · map route{" "}
                {option.stableRouteNumber}
              </span>
              <h3>{option.shortTitle}</h3>
              <p>{option.bestWhen}</p>
              <dl>
                <div>
                  <dt>Distance</dt>
                  <dd>{option.distanceSummary}</dd>
                </div>
                <div>
                  <dt>Camps</dt>
                  <dd>{option.camps}</dd>
                </div>
              </dl>
              <strong>Open route details →</strong>
            </div>
          </a>
        ))}
      </div>

      <div className="qld-kayak-compare" role="table" aria-label="Sea-kayak route comparison">
        <div className="qld-kayak-compare-head" role="row">
          <span role="columnheader">Route</span>
          <span role="columnheader">Paddling</span>
          <span role="columnheader">Why choose it</span>
          <span role="columnheader">Main dependency</span>
        </div>
        {rankedKayakOptions.map((option) => (
          <div role="row" key={`comparison-${option.slug}`}>
            <strong role="cell" data-label="Route">{option.shortTitle}</strong>
            <span role="cell" data-label="Paddling">{option.distanceSummary}</span>
            <span role="cell" data-label="Why choose it">{option.recommendation}</span>
            <span role="cell" data-label="Main dependency">{option.bestWhen}</span>
          </div>
        ))}
      </div>

      <aside className="qld-kayak-contingency">
        <strong>Ranking logic</strong>
        <p>
          The numbers printed on the maps are stable route identifiers, not
          rankings. Under the current separate-snorkeling assumption, map route
          2 ranks first, map route 3 second and map route 1 third.
          <a href={sitePath("/trips/whitsundays-sea-kayaking/planning-booking")}>
            Open planning and booking guidance →
          </a>
        </p>
      </aside>
    </section>
  );
}

export default function QueenslandWorkingWeek({ trip }: { trip: Trip }) {
  const isHamilton = trip.slug === queensland.hamiltonIsland.slug;
  const photos = isHamilton ? hamiltonPhotos : outbackPhotos;

  return (
    <>
      <SiteNav
        current="australia"
        australiaCurrent={isHamilton ? "whitsundays" : "outback"}
      />
      <main className="qld-page">
      <header className="qld-header">
        <p className="qld-eyebrow">{trip.eyebrow}</p>
        <h1>{trip.title}</h1>
        <div className="qld-facts">
          <span>{dateLabel(trip.start)}–{dateLabel(trip.end)}</span>
          <span>{trip.nights} nights</span>
          <span>{isHamilton ? "Work Mon–Tue + Wed early" : "Work Mon–Wed"}</span>
          <span>{isHamilton ? "Vacation Wed–Sat" : "Vacation Thu–Fri"}</span>
        </div>
        <p className="qld-summary">{trip.summary}</p>
        <p className="qld-status">{queensland.status}</p>
      </header>

      <DestinationGallery
        photos={photos}
        label={`${trip.title} photographs`}
      />

      {isHamilton && <WhitsundaysKayakPlanning />}

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
            {isHamilton
              ? "Mon–Tue · Oct 11–12"
              : "Mon–Wed · Oct 18–20"}
          </time>
          <h2>
            {isHamilton
              ? "Two work & homeschool mornings"
              : "Three work & homeschool mornings"}
          </h2>
          <p>{queensland.shared.workPattern.principle}</p>
          <h3>Good afternoon / evening options</h3>
          <SimpleList items={trip.workAfternoons} />
        </article>

        <article className="qld-sequence-item is-vacation" id="vacation-days">
          <time>
            {isHamilton
              ? "Wed–Sat · reef + expedition"
              : "Thu–Fri · vacation"}
          </time>
          <h2>
            {isHamilton
              ? "Hardy Reef, then the two-night kayak expedition"
              : "Two full excursion days"}
          </h2>
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
          Detail source:{" "}
          <code>
            {isHamilton
              ? "Whitsundays Sea Kayak Expedition Options.md"
              : "Queensland Working Notes.md"}
          </code>
        </span>
        <span>
          Exact dates: <code>data/trip-plan.json</code>
        </span>
      </footer>
      </main>
    </>
  );
}
