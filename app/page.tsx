import type { CSSProperties } from "react";
import type { Metadata } from "next";
import tripPlan from "../data/trip-plan.json";
import { sitePath } from "../lib/site-path";
import SiteNav from "./site-nav";
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

const locationDetailPages: Record<string, string> = {
  "location-great-southern-touring-route":
    "/trips/great-southern-touring-route",
  "location-hamilton-island": "/trips/hamilton-island-working-week",
  "location-longreach": "/trips/longreach-outback-working-week",
};

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

function rangeLabel(location: LocationEntry, endLocation = location) {
  return `${formatDate(location.start)}–${formatDate(endLocation.end, true)}`;
}

type OverviewBlock = {
  id: string;
  title: string;
  start: string;
  end: string;
  days: number;
  color: string;
  href?: string;
};

type OverviewRow = {
  id: string;
  title: string;
  blocks: OverviewBlock[];
};

function inclusiveDays(start: string, end: string) {
  const millisecondsPerDay = 86_400_000;
  return (
    Math.round(
      (new Date(`${end}T00:00:00Z`).getTime() -
        new Date(`${start}T00:00:00Z`).getTime()) /
        millisecondsPerDay,
    ) + 1
  );
}

function makeOverviewBlock(
  locationId: string,
  options: {
    endLocationId?: string;
    title?: string;
    color?: string;
  } = {},
): OverviewBlock {
  const location = getLocation(locationId);
  const endLocation = options.endLocationId
    ? getLocation(options.endLocationId)
    : location;

  return {
    id: options.endLocationId
      ? `${location.id}-${endLocation.id}`
      : location.id,
    title: options.title ?? location.title,
    start: location.start,
    end: endLocation.end,
    days: inclusiveDays(location.start, endLocation.end),
    color: options.color ?? location.color,
    href: locationDetailPages[location.id],
  };
}

const overviewRows: OverviewRow[] = [
  {
    id: "australia",
    title: "Australia",
    blocks: [
      makeOverviewBlock("location-geelong"),
      makeOverviewBlock("location-great-southern-touring-route"),
      makeOverviewBlock("location-melbourne", {
        endLocationId: "location-sydney",
        title: "Melbourne + Sydney",
      }),
      makeOverviewBlock("location-hamilton-island"),
      makeOverviewBlock("location-longreach"),
    ],
  },
  {
    id: "asia",
    title: "Asia",
    blocks: [
      makeOverviewBlock("location-india"),
      makeOverviewBlock("location-singapore"),
      makeOverviewBlock("location-hong-kong"),
    ],
  },
  {
    id: "home-snowbird-home",
    title: "Home + Snowbird + Home",
    blocks: [
      makeOverviewBlock("location-new-hampshire", {
        endLocationId: "location-new-hampshire-repack",
        title: "Home + Snowbird + Home",
        color: getLocation("location-snowbird").color,
      }),
    ],
  },
  {
    id: "alps",
    title: "Alps",
    blocks: [makeOverviewBlock("location-alps")],
  },
  {
    id: "copenhagen",
    title: "Copenhagen",
    blocks: [makeOverviewBlock("location-copenhagen")],
  },
];

type PlaceCard = {
  locationId: string;
  endLocationId?: string;
  title?: string;
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
    category: "Work + local evenings",
    summary:
      "Land in Melbourne and go straight to Geelong, probably Newtown. Work during the day, then use the afternoons and evenings to explore.",
    highlights: ["Newtown base", "Queenscliff evening", "Geelong after work"],
    open: "Apartment, neighborhood routine, and local evening list",
  },
  {
    locationId: "location-great-southern-touring-route",
    category: "Vacation road trip",
    summary:
      "Follow the Great Ocean Road through the Otways, then continue to the Grampians and Ballarat before reaching Melbourne.",
    highlights: ["Great Ocean Road", "Otways rainforest", "Grampians"],
    open: "Lodging, wildlife stops, and the final activity mix",
    href: "/trips/great-southern-touring-route",
    linkLabel: "Open the 7-day plan",
  },
  {
    locationId: "location-melbourne",
    endLocationId: "location-sydney",
    title: "Melbourne + Sydney",
    category: "Weekend + work base",
    summary:
      "A full Melbourne weekend followed by a Sunday-evening flight and a protected Monday–Friday work week in Sydney.",
    highlights: ["Melbourne weekend", "Sydney work week", "Opera House evening"],
    open: "Sydney neighborhood, lodging, and exact flight timing",
  },
  {
    locationId: "location-hamilton-island",
    category: "Play, with some work",
    summary:
      "Two full work and homeschool mornings, an optional light Wednesday block, a dedicated Hardy Reef day, then a three-day family sea-kayak expedition.",
    highlights: ["Hamilton work base", "Hardy Reef snorkeling", "Two-night sea kayak"],
    open: "Expedition route, operator handoff, lodging, and 2027 transfers",
    href: "/trips/hamilton-island-working-week",
    linkLabel: "Open Whitsundays plan",
  },
  {
    locationId: "location-longreach",
    category: "Play, with some work",
    summary:
      "Live in a practical outback town: three work and homeschool mornings, then two full days for aviation, heritage, and one defining outback experience.",
    highlights: ["Qantas history", "Outback heritage", "Winton or station day"],
    open: "Lodging, seasonal programs, and Winton vs. Longreach",
    href: "/trips/longreach-outback-working-week",
    linkLabel: "Open Outback plan",
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
    endLocationId: "location-new-hampshire-repack",
    title: "Home + Snowbird + Home",
    category: "Reset + Christmas ski week",
    summary:
      "Come home from Asia to reset, spend Christmas week at Snowbird, then return home briefly to repack for Europe.",
    highlights: ["Home reset", "Snowbird ski week", "Repack for Europe"],
    open: "Flights, Snowbird lodging, and the Europe packing list",
    anchor: "Christmas · Dec 25",
  },
];

const europeCards: PlaceCard[] = [
  {
    locationId: "location-alps",
    category: `${getLocation("location-alps").days}-day base`,
    summary:
      "The winter long stay: ski, work, and live in one Alpine base rather than moving from resort to resort.",
    highlights: ["Ski season", "Village routine", "Weekend exploration"],
    open: "Country, town, school/routine, and housing",
  },
  {
    locationId: "location-copenhagen",
    category: `${getLocation("location-copenhagen").days}-day base`,
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
        const endLocation = card.endLocationId
          ? getLocation(card.endLocationId)
          : location;
        return (
          <article
            className="home-place-card"
            style={{ "--place-color": location.color } as CSSProperties}
            key={card.locationId}
          >
            <div className="home-place-card-head">
              <div>
                <p>{card.category}</p>
                <h3>{card.title ?? location.title}</h3>
              </div>
              <time>{rangeLabel(location, endLocation)}</time>
            </div>
            {card.anchor && <strong className="home-anchor">{card.anchor}</strong>}
            <p className="home-place-summary">{card.summary}</p>
            <ul>
              {card.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            {card.href && (
              <a className="home-place-link" href={sitePath(card.href)}>
                {card.linkLabel ?? "Open plan"} →
              </a>
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
  return (
    <>
      <SiteNav current="home" />

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
              <a className="home-primary-action" href={sitePath("/calendar")}>
                View the exact calendar
              </a>
              <a className="home-text-action" href="#overview">
                See the overview ↓
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

        <section className="home-route-section" id="overview">
          <div className="home-section-heading">
            <div>
              <p className="home-kicker">Overview</p>
              <h2>Where the weeks go</h2>
            </div>
            <p>
              Each row uses the same 90-day scale. Linked stops open their
              detail plans; the calendar remains the source of exact dates.
            </p>
          </div>
          <div
            className="home-overview-rows"
            aria-label="Time-scaled trip overview; each row represents 90 days"
          >
            {overviewRows.map((row) => {
              const firstBlock = row.blocks[0];
              const lastBlock = row.blocks[row.blocks.length - 1];
              const rowDays = row.blocks.reduce(
                (total, block) => total + block.days,
                0,
              );

              return (
                <section
                  className="home-overview-row"
                  data-overview-row={row.id}
                  key={row.id}
                >
                  <header>
                    <div>
                      <h3>{row.title}</h3>
                      <time>
                        {formatDate(firstBlock.start)}–
                        {formatDate(lastBlock.end, true)}
                      </time>
                    </div>
                    <span>{rowDays} days · 90-day scale</span>
                  </header>
                  <ol className="home-overview-track">
                    {row.blocks.map((block) => {
                      const content = (
                        <>
                          <span>{block.title}</span>
                          <time>
                            {formatDate(block.start)}–{formatDate(block.end)}
                          </time>
                        </>
                      );
                      const style = {
                        "--place-color": block.color,
                        "--block-width": `${(block.days / 90) * 100}%`,
                      } as CSSProperties;

                      return (
                        <li
                          data-overview-block={block.id}
                          key={block.id}
                          style={style}
                          title={`${block.title}: ${formatDate(block.start)}–${formatDate(block.end, true)}`}
                        >
                          {block.href ? (
                            <a
                              className="home-overview-item home-overview-link"
                              href={sitePath(block.href)}
                              aria-label={`Open ${block.title} plan`}
                            >
                              {content}
                            </a>
                          ) : (
                            <div className="home-overview-item">{content}</div>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </section>
              );
            })}
          </div>
        </section>

        <section
          className="home-trip-collage"
          aria-label="Australia, Val d'Isère, and Copenhagen"
        >
          <figure className="home-trip-collage-australia">
            <a href={sitePath("/australia")} aria-label="Open Australia plans">
              <img
                alt="The Twelve Apostles and cliffs along Victoria's Great Ocean Road"
                fetchPriority="high"
                src={sitePath("/images/victoria/twelve-apostles.jpg")}
              />
              <span>Australia</span>
            </a>
            <figcaption>
              <a
                href="https://unsplash.com/photos/a-view-of-the-beach-and-cliffs-of-the-great-ocean-road-Yd-HvUwdqMc"
                rel="noreferrer"
                target="_blank"
              >
                Philip Ho / Unsplash
              </a>
            </figcaption>
          </figure>

          <figure>
            <img
              alt="Skiers walking through deep snow in Val d'Isère"
              src={sitePath("/images/home/val-disere-winter.jpg")}
            />
            <span>Val d'Isère</span>
            <figcaption>
              <a
                href="https://commons.wikimedia.org/wiki/File:Village_enneig%C3%A9_pendant_l%27hiver_-_Val_d%27Is%C3%A8re.jpg"
                rel="noreferrer"
                target="_blank"
              >
                Webvaldisere / CC BY-SA 4.0
              </a>
            </figcaption>
          </figure>

          <figure>
            <img
              alt="Colorful buildings and boats along Copenhagen's Nyhavn canal"
              src={sitePath("/images/home/copenhagen-nyhavn.jpg")}
            />
            <span>Copenhagen</span>
            <figcaption>
              <a
                href="https://commons.wikimedia.org/wiki/File:Nyhavn-2023.jpg"
                rel="noreferrer"
                target="_blank"
              >
                Mahendra / CC BY-SA 4.0
              </a>
            </figcaption>
          </figure>
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
                then use a reef-and-expedition mini-vacation in the Whitsundays
                before returning to a work-and-play rhythm in Outback Queensland.
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
          <a className="home-primary-action" href={sitePath("/calendar")}>
            Open calendar
          </a>
        </section>
      </main>

      <div className="home-footer">
        <strong>42 Weeks</strong>
        <span>Broad-strokes overview · exact dates in the calendar</span>
        <a href={sitePath("/calendar")}>Calendar →</a>
      </div>
    </>
  );
}
