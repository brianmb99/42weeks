import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import tripPlan from "../data/trip-plan.json";
import australiaPlan from "../data/australia-part-one.json";
import "./home.css";

export const metadata: Metadata = {
  title: { absolute: "42 Weeks" },
  description:
    "The broad-strokes route, highlights, and open questions for a family sabbatical from September 2027 through June 2028.",
};

type TimelineEntry = (typeof tripPlan.timeline)[number];
type LocationEntry = TimelineEntry & {
  type: "location";
  end: string;
  days: number;
  color: string;
};

const locations = tripPlan.timeline.filter(
  (entry): entry is LocationEntry =>
    entry.type === "location" &&
    typeof entry.end === "string" &&
    typeof entry.days === "number" &&
    typeof entry.color === "string",
);
const overviewLocations = locations.filter(
  (entry) =>
    !entry.locationId.startsWith("in-transit") &&
    !entry.locationId.startsWith("brisbane-airport"),
);

function getLocation(id: string) {
  const location = locations.find((entry) => entry.id === id);
  if (!location) throw new Error(`Missing location: ${id}`);
  return location;
}

function formatDate(value: string, includeYear = false) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(includeYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function rangeLabel(location: LocationEntry) {
  return `${formatDate(location.start)}–${formatDate(location.end, true)}`;
}

type PlaceCard = {
  locationId: string;
  category: string;
  summary: string;
  highlights: string[];
  open: string;
  anchor?: string;
  href?: string;
  linkLabel?: string;
};

const australiaCards: PlaceCard[] = [
  {
    locationId: "location-geelong",
    category: "Work base",
    summary:
      "Land in Melbourne and go straight to Geelong, probably Newtown, for a normal workweek before the road trip.",
    highlights: ["Newtown base", "Queenscliff evening", "Geelong after work"],
    open: "Apartment, neighborhood routine, and local evening list",
  },
  {
    locationId: "location-melbourne",
    category: "Work base",
    summary:
      "A week in Melbourne after the road trip: work during the day and use the evenings and weekend for the city.",
    highlights: ["St Kilda Pier penguins", "Neighborhood life", "Melbourne weekend"],
    open: "Neighborhood and the rest of the evening plan",
  },
  {
    locationId: "location-hamilton-island",
    category: "6-night working week",
    summary:
      "Three early work and homeschool mornings, active island afternoons, then vacation days for Whitehaven Beach and the outer reef.",
    highlights: ["Whitsundays base", "Whitehaven Beach", "Outer reef"],
    open: "Exact holiday home, flights, and 2027 marine operators",
    href: "/trips/hamilton-island-working-week",
    linkLabel: "Open Hamilton plan",
  },
  {
    locationId: "location-longreach",
    category: "6-night working week",
    summary:
      "Live in a practical outback town: three work and homeschool mornings, then two full days for aviation, heritage, and one defining outback experience.",
    highlights: ["Qantas history", "Outback heritage", "Winton or station day"],
    open: "Lodging, seasonal programs, and Winton vs. Longreach",
    href: "/trips/longreach-outback-working-week",
    linkLabel: "Open Longreach plan",
  },
];

const asiaCards: PlaceCard[] = [
  {
    locationId: "location-india",
    category: "Three weeks",
    summary:
      "The longest Asian segment, built around Diwali with enough time for a real route rather than a rushed stop.",
    highlights: ["Diwali", "Food and history", "Multi-stop route"],
    open: "Cities, internal travel, and the Diwali plan",
    anchor: "Diwali · Oct 29",
  },
  {
    locationId: "location-singapore",
    category: "Two-week base",
    summary:
      "A compact, easy-to-navigate work base with strong food, gardens, transit, and family-friendly city days.",
    highlights: ["Hawker food", "Gardens", "Easy transit"],
    open: "Neighborhood, lodging, and weekday routine",
  },
  {
    locationId: "location-hong-kong",
    category: "Nearly three weeks",
    summary:
      "A longer city stay with room for ferries, hikes, harbor life, and a sustainable working rhythm.",
    highlights: ["Harbor and ferries", "Country-park hikes", "Dense city life"],
    open: "Hong Kong Island, Kowloon, or an outlying base",
  },
];

const winterCards: PlaceCard[] = [
  {
    locationId: "location-new-hampshire",
    category: "Home stop",
    summary:
      "Come home from Asia for several days before Christmas and reset before the Snowbird week.",
    highlights: ["Home", "Laundry and reset", "Christmas transition"],
    open: "Only the practical details",
  },
  {
    locationId: "location-snowbird",
    category: "Christmas ski week",
    summary:
      "Christmas at Snowbird, with December 27–31 currently marked as vacation days.",
    highlights: ["Christmas", "Family ski week", "Five vacation days"],
    open: "Lodging, flights, and mountain plan",
    anchor: "Christmas · Dec 25",
  },
  {
    locationId: "location-new-hampshire-repack",
    category: "Repacking stop",
    summary:
      "Return home briefly after Snowbird to unpack, reorganize, and repack for the long European stay.",
    highlights: ["Repack for Europe", "Home logistics", "Short reset"],
    open: "Flight timing and the Europe packing list",
  },
];

const europeCards: PlaceCard[] = [
  {
    locationId: "location-alps",
    category: "87-day base",
    summary:
      "The winter long stay: ski, work, and live in one Alpine base rather than moving from resort to resort.",
    highlights: ["Ski season", "Village routine", "Weekend exploration"],
    open: "Country, town, school/routine, and housing",
  },
  {
    locationId: "location-copenhagen",
    category: "88-day base",
    summary:
      "A spring long stay centered on everyday Copenhagen life, with room for Denmark and nearby European trips.",
    highlights: ["Cycling city", "Neighborhood life", "Regional weekends"],
    open: "Neighborhood, housing, routines, and side trips",
  },
];

function PlaceGrid({
  cards,
  ariaLabel,
}: {
  cards: PlaceCard[];
  ariaLabel: string;
}) {
  return (
    <div className="home-place-grid" aria-label={ariaLabel}>
      {cards.map((card) => {
        const location = getLocation(card.locationId);
        return (
          <article
            className="home-place-card"
            style={{ "--place-color": location.color } as CSSProperties}
            key={card.locationId}
          >
            <div className="home-place-card-head">
              <div>
                <p>{card.category}</p>
                <h3>{location.title}</h3>
              </div>
              <time>{rangeLabel(location)}</time>
            </div>
            {card.anchor && <strong className="home-anchor">{card.anchor}</strong>}
            <p className="home-place-summary">{card.summary}</p>
            <ul>
              {card.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            {card.href && (
              <Link className="home-place-link" href={card.href}>
                {card.linkLabel ?? "Open plan"} →
              </Link>
            )}
            <p className="home-open-item">
              <span>Still open</span>
              {card.open}
            </p>
          </article>
        );
      })}
    </div>
  );
}

export default function Home() {
  const roadTrip = australiaPlan.segments.roadTrip;

  return (
    <>
      <header className="home-header">
        <a className="home-brand" href="#top" aria-label="42 Weeks home">
          <strong>42</strong>
          <span>Weeks</span>
        </a>
        <nav aria-label="Home page sections">
          <a href="#route">Route</a>
          <a href="#places">Places</a>
          <a href="#open">Still open</a>
        </nav>
        <Link className="home-calendar-link" href="/calendar">
          Open calendar
        </Link>
      </header>

      <main className="home-main" id="top">
        <section className="home-hero">
          <div className="home-hero-copy">
            <p className="home-kicker">Family sabbatical · working plan</p>
            <h1>42 Weeks</h1>
            <p>
              September 2027 through June 2028: Australia and Asia first,
              Christmas skiing in Utah, then long stays in the Alps and
              Copenhagen.
            </p>
            <div className="home-hero-actions">
              <Link className="home-primary-action" href="/calendar">
                View the exact calendar
              </Link>
              <a className="home-text-action" href="#route">
                See the broad route ↓
              </a>
            </div>
          </div>
          <dl className="home-facts">
            <div>
              <dt>Dates</dt>
              <dd>
                {formatDate(tripPlan.trip.start, true)}–
                {formatDate(tripPlan.trip.end, true)}
              </dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>285 days</dd>
            </div>
            <div>
              <dt>Long stays</dt>
              <dd>Alps · Copenhagen</dd>
            </div>
            <div>
              <dt>Planning rule</dt>
              <dd>The calendar owns the dates</dd>
            </div>
          </dl>
        </section>

        <section className="home-route-section" id="route">
          <div className="home-section-heading">
            <div>
              <p className="home-kicker">Broad route</p>
              <h2>Where the 42 weeks go</h2>
            </div>
            <p>
              Each stop below comes directly from the current calendar. Click
              the calendar for travel days, work assumptions, and exact anchors.
            </p>
          </div>
          <ol className="home-route-list">
            {overviewLocations.map((location) => (
              <li
                style={{ "--place-color": location.color } as CSSProperties}
                key={location.id}
              >
                <span>{location.title}</span>
                <time>
                  {formatDate(location.start)}–{formatDate(location.end)}
                </time>
              </li>
            ))}
          </ol>
        </section>

        <section className="home-feature" aria-labelledby="gstr-title">
          <figure>
            <img
              alt="The Twelve Apostles and cliffs along Victoria’s Great Ocean Road"
              fetchPriority="high"
              src="https://images.unsplash.com/photo-1736893474760-759d20e84f58?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=82&w=2400"
            />
            <figcaption>
              Twelve Apostles, Victoria · Photo by{" "}
              <a
                href="https://unsplash.com/photos/a-view-of-the-beach-and-cliffs-of-the-great-ocean-road-Yd-HvUwdqMc"
                rel="noreferrer"
                target="_blank"
              >
                Philip Ho / Unsplash
              </a>
            </figcaption>
          </figure>
          <div className="home-feature-copy">
            <p className="home-kicker">Australia highlight · 9-day vacation</p>
            <h2 id="gstr-title">{roadTrip.title}</h2>
            <p>{roadTrip.summary}</p>
            <div className="home-feature-route">
              {roadTrip.overnights.map((stop) => (
                <span key={stop.place}>
                  <strong>{stop.place}</strong>
                  <small>
                    {stop.nights
                      ? `${stop.nights} night${stop.nights === 1 ? "" : "s"}`
                      : "finish"}
                  </small>
                </span>
              ))}
            </div>
            <div className="home-feature-actions">
              <Link
                className="home-primary-action"
                href="/trips/great-southern-touring-route"
              >
                Open the 9-day plan
              </Link>
              <a
                className="home-text-action"
                href={roadTrip.officialRoute.url}
                rel="noreferrer"
                target="_blank"
              >
                Visit Victoria route ↗
              </a>
            </div>
          </div>
        </section>

        <div id="places">
          <section className="home-chapter">
            <div className="home-section-heading">
              <div>
                <p className="home-kicker">September–October 2027</p>
                <h2>Australia</h2>
              </div>
              <p>
                Settle into work quickly, take one concentrated vacation week,
                then test the same three-workday / two-vacation-day rhythm in
                the Whitsundays and Outback Queensland.
              </p>
            </div>
            <PlaceGrid cards={australiaCards} ariaLabel="Australia places" />
          </section>

          <section className="home-chapter home-chapter-tinted">
            <div className="home-section-heading">
              <div>
                <p className="home-kicker">October–December 2027</p>
                <h2>Asia</h2>
              </div>
              <p>
                Three distinct bases, mostly connected by weekend travel. India
                has the anchor date; the city-level plans are still open.
              </p>
            </div>
            <PlaceGrid cards={asiaCards} ariaLabel="Asia places" />
          </section>

          <section className="home-chapter">
            <div className="home-section-heading">
              <div>
                <p className="home-kicker">December 2027–January 2028</p>
                <h2>Home, Snowbird, home</h2>
              </div>
              <p>
                Two practical home stops bracket Christmas at Snowbird before
                the long European move.
              </p>
            </div>
            <PlaceGrid cards={winterCards} ariaLabel="Home and Snowbird stops" />
          </section>

          <section className="home-chapter home-chapter-dark">
            <div className="home-section-heading">
              <div>
                <p className="home-kicker">January–June 2028</p>
                <h2>Europe</h2>
              </div>
              <p>
                The two long stays: one winter base in the Alps and one spring
                base in Copenhagen. Both remain below 90 days.
              </p>
            </div>
            <PlaceGrid cards={europeCards} ariaLabel="Europe places" />
          </section>
        </div>

        <section className="home-open-section" id="open">
          <div className="home-section-heading">
            <div>
              <p className="home-kicker">Not on the calendar yet</p>
              <h2>Ideas to place later</h2>
            </div>
            <p>
              These are retained as possibilities, not commitments. Their dates
              should stay blank until the work/vacation plan supports them.
            </p>
          </div>
          <div className="home-open-grid">
            {tripPlan.considerations.map((item) =>
              item.href ? (
                <a
                  href={item.href}
                  rel="noreferrer"
                  target="_blank"
                  key={item.title}
                >
                  <strong>{item.title}</strong>
                  <span>{item.meta}</span>
                  <i aria-hidden="true">↗</i>
                </a>
              ) : (
                <article key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.meta}</span>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="home-calendar-cta">
          <div>
            <p className="home-kicker">Planning view</p>
            <h2>Dates, workdays, travel, and vacation live in the calendar.</h2>
          </div>
          <Link className="home-primary-action" href="/calendar">
            Open calendar
          </Link>
        </section>
      </main>

      <div className="home-footer">
        <strong>42 Weeks</strong>
        <span>Broad-strokes overview · exact dates in the calendar</span>
        <Link href="/calendar">Calendar →</Link>
      </div>
    </>
  );
}
