import queensland from "../../data/queensland.json";
import {
  kayakOptions,
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

function WhitsundaysKayakPlanning() {
  return (
    <section className="qld-kayak-plan" aria-labelledby="kayak-plan-title">
      <header>
        <div>
          <p className="qld-eyebrow">New expedition option</p>
          <h2 id="kayak-plan-title">
            A three-day sea-kayak trip can fit without moving India.
          </h2>
        </div>
        <p>
          The cleanest version replaces the current Thursday–Saturday vacation
          block. Keep the calendar unchanged until Salty Dog and Scamper confirm
          the family, boats, tides, camps and 2027 transfer schedule.
        </p>
      </header>

      <div className="qld-kayak-fit">
        <article>
          <span>Sun–Wed</span>
          <strong>Hamilton Island base</strong>
          <p>Arrive Sunday; work and homeschool Monday through Wednesday.</p>
        </article>
        <article>
          <span>Wed evening</span>
          <strong>Move to the mainland</strong>
          <p>
            Ferry to Port of Airlie after work and sleep near Shute Harbour.
            Salty Dog requires every rental briefing at Shute Harbour.
          </p>
        </article>
        <article>
          <span>Thu–Sat</span>
          <strong>Three-day / two-night expedition</strong>
          <p>Scamper drop, two island camps, tide-driven Saturday pickup.</p>
        </article>
        <article>
          <span>Sunday</span>
          <strong>Fly to Outback Queensland</strong>
          <p>
            Test Proserpine → Brisbane → Longreach instead of returning to
            Hamilton Island Airport.
          </p>
        </article>
      </div>

      <div className="qld-reef-rule">
        <div>
          <p className="qld-eyebrow">Non-negotiable</p>
          <h3>At least one high-quality reef-snorkeling day</h3>
        </div>
        <p>
          Option 1 can meet that standard inside the expedition if the operator
          confirms meaningful reef time at Crayfish, Manta Ray Bay and/or
          Maureen’s Cove. Options 2 and 3 cannot safely be treated as
          substitutes for the current{" "}
          <a
            href={sharedKayakPlanning.reefTour.url}
            rel="noreferrer"
            target="_blank"
          >
            full-day Bait Reef plan
          </a>
          .
        </p>
      </div>

      <div className="qld-kayak-options">
        {kayakOptions.map((option) => (
          <a
            href={sitePath(`/trips/whitsundays-sea-kayaking/${option.slug}`)}
            key={option.slug}
          >
            <figure>
              <img
                src={option.photos[0].src}
                alt={option.photos[0].alt}
                loading="lazy"
              />
            </figure>
            <div>
              <span>Rank {option.rank}</span>
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
              <strong>Open option {option.rank} →</strong>
            </div>
          </a>
        ))}
      </div>

      <aside className="qld-kayak-contingency">
        <strong>Current recommendation</strong>
        <p>
          Keep the dates and rank Hook Island first in genuinely calm weather.
          If Option 2 or 3 wins, either use Wednesday as an additional vacation
          day for Bait Reef before the evening mainland transfer, or add Sunday
          for a separate outer-reef trip and shorten Outback by one night. Do
          not shorten Outback yet.
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
      <SiteNav current={isHamilton ? "hamilton" : "outback"} />
      <main className="qld-page">
      <header className="qld-header">
        <p className="qld-eyebrow">{trip.eyebrow}</p>
        <h1>{trip.title}</h1>
        <div className="qld-facts">
          <span>{dateLabel(trip.start)}–{dateLabel(trip.end)}</span>
          <span>{trip.nights} nights</span>
          <span>Work Mon–Wed</span>
          <span>{isHamilton ? "Vacation Thu–Sat" : "Vacation Thu–Fri"}</span>
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
          <time>
            {isHamilton
              ? "Thu–Sat · no-expedition baseline"
              : "Thu–Fri · vacation"}
          </time>
          <h2>
            {isHamilton
              ? "Current fallback: reef, Whitehaven and island time"
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
