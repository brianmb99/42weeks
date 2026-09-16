import type { CSSProperties } from "react";
import type { Metadata } from "next";
import tripPlan from "../data/trip-plan.json";
import { sitePath } from "../lib/site-path";
import ScrollToSectionButton from "./scroll-to-section-button";
import SiteNav from "./site-nav";
import "./home.css";

export const metadata: Metadata = {
  title: { absolute: "42 Weeks" },
  description:
    "The broad-strokes route, highlights, and open questions for a family sabbatical from August 2027 through June 2028.",
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
  "location-geelong": "/australia/geelong",
  "location-great-southern-touring-route":
    "/trips/great-southern-touring-route",
  "location-melbourne-return": "/trips/great-southern-touring-route",
  "location-alice-springs": "/australia/alice-springs",
  "location-sydney": "/australia/sydney",
  "location-hamilton-island": "/trips/hamilton-island-working-week",
  "location-brisbane": "/australia/brisbane",
  "location-india": "/asia/india",
  "location-hong-kong": "/asia/hong-kong",
  "location-wanaka": "/new-zealand/wanaka",
  "location-alps": "/alps",
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
    href?: string;
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
    href: options.href ?? locationDetailPages[location.id],
  };
}

const overviewRows: OverviewRow[] = [
  {
    id: "australia",
    title: "Australia",
    blocks: [
      makeOverviewBlock("location-geelong"),
      makeOverviewBlock("location-great-southern-touring-route", {
        endLocationId: "location-melbourne-return",
        title: "Victoria road trip",
        href: "/trips/great-southern-touring-route",
      }),
      makeOverviewBlock("location-alice-springs"),
      makeOverviewBlock("location-sydney"),
      makeOverviewBlock("location-hamilton-island"),
      makeOverviewBlock("location-brisbane"),
    ],
  },
  {
    id: "asia",
    title: "Asia",
    blocks: [
      makeOverviewBlock("location-india"),
      makeOverviewBlock("location-hong-kong"),
    ],
  },
  {
    id: "new-zealand",
    title: "New Zealand",
    blocks: [makeOverviewBlock("location-wanaka")],
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
    category: "Family history + work",
    summary:
      "Land in Melbourne Monday, August 30, continue to Newtown the same day, protect the first Work & School week, and take one MCG trip from Geelong.",
    highlights: ["Monday landing", "MCG from Newtown", "Family history"],
    open: "Apartment, internet, AFL wildcard tickets, and personal family-history list",
    href: "/australia/geelong",
    linkLabel: "Open Geelong plan",
  },
  {
    locationId: "location-great-southern-touring-route",
    endLocationId: "location-melbourne-return",
    category: "Vacation road trip",
    summary:
      "Follow the Great Ocean Road through the Otways, then continue to the Grampians and Ballarat before reaching Melbourne.",
    highlights: ["Great Ocean Road", "Otways rainforest", "Grampians"],
    open: "Lodging, wildlife stops, and the final activity mix",
    href: "/trips/great-southern-touring-route",
    linkLabel: "Open the 7-day plan",
  },
  {
    locationId: "location-alice-springs",
    category: "Two-week outback work base",
    summary:
      "Work and live in the Red Centre for two full weeks, using the complete middle weekend for Tjoritja or another outback excursion.",
    highlights: ["Red Centre life", "Tjoritja weekend", "Two full work weeks"],
    open: "Rental, flight days, and exact middle-weekend route",
    href: "/australia/alice-springs",
    linkLabel: "Open Alice Springs plan",
  },
  {
    locationId: "location-sydney",
    category: "Two-week beach work base",
    summary:
      "Run two normal work and homeschool weeks beside the beach, with a complete middle weekend for the harbour, coast or Opera House.",
    highlights: ["Manly or Coogee", "Full city weekend", "Opera House evening"],
    open: "Neighborhood, rental, and 2027 performance calendar",
    href: "/australia/sydney",
    linkLabel: "Open Sydney plan",
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
    locationId: "location-brisbane",
    category: "Work + reset",
    summary:
      "Finish Australia with one dependable full-output week, laundry, recovery, and deliberate packing for India.",
    highlights: ["Full work week", "New Farm or West End", "Pack for India"],
    open: "Rental, exact flight, and international handoff",
    href: "/australia/brisbane",
    linkLabel: "Open Brisbane plan",
  },
];

const asiaCards: PlaceCard[] = [
  {
    locationId: "location-india",
    category: "Family, vacation and work",
    summary:
      "Week one is Dehradun with family through Diwali and a Work & School routine. Week two is a bounded Delhi–Agra–Jaipur vacation. Week three is Bangalore Work & School before Hong Kong.",
    highlights: ["Dehradun family base", "Diwali", "Taj Mahal", "Bangalore week"],
    open: "Family housing, Delhi air, Taj tickets, and the Bangalore apartment",
    anchor: "Diwali · Oct 29",
    href: "/asia/india",
    linkLabel: "Open India plan",
  },
  {
    locationId: "location-hong-kong",
    category: "Two-week office stay",
    summary:
      "Live near the office for two weeks: a full Work & School week, a complete weekend, Thanksgiving, and a Saturday-night flight to New Zealand.",
    highlights: ["Harbor and ferries", "Cheung Chau weekend", "Thanksgiving"],
    open: "Neighborhood, office commute, and exact Auckland flight",
    href: "/asia/hong-kong",
    linkLabel: "Open Hong Kong plan",
  },
];

const newZealandCards: PlaceCard[] = [
  {
    locationId: "location-wanaka",
    category: "Twenty-night working base",
    summary:
      "Use one Wānaka house for almost three weeks: early full workdays, long late-spring afternoons, two weekends, and a four-day mini-vacation using two leave days.",
    highlights: ["Long evenings", "Mount Aspiring country", "Forecast-led mini-vacation"],
    open: "Rental, flight timing, and Wānaka vs. one two-night excursion",
    href: "/new-zealand/wanaka",
    linkLabel: "Open Wānaka plan",
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
      "The winter long stay: ski, work, and live in one Alpine base chosen by the U12 program, not a circuit of resorts.",
    highlights: ["U12 program", "One mountain", "Town still open"],
    open: "Program placement, town, and housing",
    href: "/alps",
    linkLabel: "Open Alps plan",
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
              August 2027 through June 2028: Australia, Asia and Wānaka first,
              Christmas skiing in Utah, then long stays in the Alps and
              Copenhagen.
            </p>
            <div className="home-hero-actions">
              <a className="home-primary-action" href={sitePath("/calendar")}>
                View the exact calendar
              </a>
              <ScrollToSectionButton
                className="home-text-action home-scroll-action"
                targetId="overview"
              >
                See the overview ↓
              </ScrollToSectionButton>
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
              <dd>
                {inclusiveDays(tripPlan.trip.start, tripPlan.trip.end)} days
              </dd>
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

        <section
          className="home-trip-collage"
          aria-label="Australia, the Alps, and Copenhagen"
        >
          <figure>
            <img
              className="home-trip-collage-image"
              alt="42 Weeks collage showing coastal Australia, a snowy Alpine village, and Copenhagen's colorful waterfront"
              fetchPriority="high"
              src={sitePath("/og.png")}
            />
            <a
              className="home-trip-collage-australia-link"
              href={sitePath("/australia")}
              aria-label="Open Australia plans"
            >
              <span>Australia →</span>
            </a>
            <a
              className="home-trip-collage-alps"
              href={sitePath("/alps")}
              aria-label="Open Alps plan"
            >
              Alps →
            </a>
            <span className="home-trip-collage-copenhagen">Copenhagen</span>
          </figure>
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
                  <ol className="home-overview-key">
                    {row.blocks.map((block) => {
                      const content = (
                        <>
                          <strong>{block.title}</strong>
                          <time>
                            {formatDate(block.start)}–{formatDate(block.end)}
                          </time>
                        </>
                      );

                      return (
                        <li
                          key={`${block.id}-key`}
                          style={
                            {
                              "--place-color": block.color,
                            } as CSSProperties
                          }
                        >
                          {block.href ? (
                            <a href={sitePath(block.href)}>{content}</a>
                          ) : (
                            content
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

        <div id="places">
          <section className="home-chapter">
            <div className="home-section-heading">
              <div>
                <p className="home-kicker">August–October 2027</p>
                <h2>Australia</h2>
              </div>
              <p>
                Land in Melbourne, continue to Newtown the same day, preserve
                family-history time, take one concentrated road-trip week, then
                use two-week Alice Springs and Sydney bases before the reef and
                Brisbane.
              </p>
            </div>
            <PlaceGrid cards={australiaCards} ariaLabel="Australia places" />
          </section>

          <section className="home-chapter home-chapter-tinted" id="asia">
            <div className="home-section-heading">
              <div>
                <p className="home-kicker">October–November 2027</p>
                <h2>Asia</h2>
              </div>
              <p>
                India starts with family in Dehradun through Diwali, then one
                bounded north-India vacation week and a Bangalore Work &
                School week. Hong Kong is the two-week office stay before
                New Zealand.
              </p>
            </div>
            <PlaceGrid cards={asiaCards} ariaLabel="Asia places" />
          </section>

          <section className="home-chapter">
            <div className="home-section-heading">
              <div>
                <p className="home-kicker">November–December 2027</p>
                <h2>New Zealand</h2>
              </div>
              <p>
                One Wānaka house for twenty nights: early work, long
                late-spring afternoons and a four-day forecast-led
                mini-vacation.
              </p>
            </div>
            <PlaceGrid cards={newZealandCards} ariaLabel="New Zealand places" />
          </section>

          <section className="home-chapter home-chapter-tinted">
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
