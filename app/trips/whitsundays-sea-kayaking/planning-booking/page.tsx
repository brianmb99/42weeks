import type { Metadata } from "next";
import {
  rankedKayakOptions,
  sharedKayakPlanning,
} from "../../../../data/whitsundays-kayaking";
import { sitePath } from "../../../../lib/site-path";
import SiteNav from "../../../site-nav";
import "../../whitsundays-kayak.css";

export const metadata: Metadata = {
  title: "Whitsundays kayak planning & booking",
  description:
    "Operator roles, permit timing, snorkeling strategy and weather contingencies for the family sea-kayak expedition.",
};

function List({ items }: { items: string[] }) {
  return (
    <ul className="kayak-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

const capacitySnapshot = [
  ["Crayfish Beach", "12", "Full published capacity remained"],
  ["Maureen’s Cove", "24", "Full published capacity remained"],
  ["Whitehaven Beach", "30", "Room for the family"],
  ["Northern Spit, Henning", "18", "Full published capacity remained"],
  ["Chance Bay", "2", "Not enough room for this family of four"],
];

export default function WhitsundaysPlanningBookingPage() {
  return (
    <>
      <SiteNav current="hamilton" />
      <main className="kayak-page kayak-planning-page">
        <header className="kayak-header">
          <div className="kayak-rank">Decision support</div>
          <p>Whitsundays sea kayaking</p>
          <h1>Planning &amp; booking</h1>
          <p className="kayak-route">
            Coordinate the family, two decked doubles, the reef day, tide-based
            transfers and two camp permits as one plan. No individual booking
            is useful if the others describe a different route.
          </p>
        </header>

        <section className="kayak-planning-lead">
          <div>
            <p>Working week</p>
            <h2>Reef Wednesday; paddle Thursday–Saturday</h2>
          </div>
          <ol>
            <li><strong>Monday–Tuesday</strong><span>Work and homeschool from Hamilton Island.</span></li>
            <li><strong>Tuesday evening</strong><span>Ferry to Port of Airlie and sleep on the mainland.</span></li>
            <li><strong>Wednesday</strong><span>Optional 4:30–7:00 a.m. work block, then the dedicated boat-based day at Hardy Reef.</span></li>
            <li><strong>Thursday–Saturday</strong><span>Shute Harbour briefing and two-night kayak expedition.</span></li>
            <li><strong>Sunday</strong><span>Fly Proserpine → Brisbane → Longreach.</span></li>
          </ol>
          <p>
            The current 2026 ferry and reef schedules make this sequence
            plausible, but the 2027 ferry, reef boat, Salty Dog briefing and
            Scamper departure must be checked as a single chain.
          </p>
        </section>

        <section className="kayak-planning-grid">
          <article>
            <p>Operator role</p>
            <h2>Salty Dog</h2>
            <List
              items={[
                "Approve the family, adult-child pairings and loaded-tandem route concept.",
                "Confirm the exact two decked double kayak models, payload, child fit and safety equipment.",
                "Set the chart line, tide gates, landing options, weather limits and bailout plan.",
                "Conduct the required briefing at Shute Harbour.",
              ]}
            />
          </article>
          <article>
            <p>Operator role</p>
            <h2>Scamper</h2>
            <List
              items={[
                "Confirm which drop, camp and pickup combinations are served on the candidate dates.",
                "Confirm kayak carriage, multi-stop handling and the tide-driven pickup range.",
                "Validate whether Paddle Bay is a useful final pickup, not merely technically possible.",
                "Leave enough margin before Sunday’s onward flight.",
              ]}
            />
          </article>
          <article>
            <p>Permit role</p>
            <h2>Queensland Parks</h2>
            <List
              items={[
                "Book only after both operators confirm the same route and direction.",
                "Start checking at the 12-month mark; be ready by the Whitsundays-specific 11-month mark.",
                "Book each matching camp night and verify the permit names the correct site.",
                "Treat Chance Bay as the most likely capacity bottleneck.",
              ]}
            />
          </article>
          <article>
            <p>Reef role</p>
            <h2>Separate boat outing</h2>
            <p>{sharedKayakPlanning.snorkelingDecision.summary}</p>
            <List items={sharedKayakPlanning.snorkelingDecision.reasons} />
            <a
              href={sharedKayakPlanning.reefTour.url}
              rel="noreferrer"
              target="_blank"
            >
              {sharedKayakPlanning.reefTour.title} ↗
            </a>
            <p>
              <a
                href={sharedKayakPlanning.hamiltonReefTour.url}
                rel="noreferrer"
                target="_blank"
              >
                {sharedKayakPlanning.hamiltonReefTour.title} ↗
              </a>{" "}
              remains the Hamilton-based alternative, but it makes the
              mainland briefing and Thursday transfer sequence harder.
            </p>
          </article>
        </section>

        <section className="kayak-distance kayak-booking-sequence">
          <header>
            <p>Order matters</p>
            <h2>Coordinated booking sequence</h2>
          </header>
          <ol>
            {sharedKayakPlanning.bookingSequence.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="kayak-capacity" aria-labelledby="capacity-title">
          <header>
            <p>Point-in-time evidence</p>
            <h2 id="capacity-title">Camp capacity snapshot</h2>
            <span>Comparable October 2026 dates checked July 30, 2026</span>
          </header>
          <div role="table" aria-label="Comparable campsite availability snapshot">
            <div role="row">
              <strong role="columnheader">Camp</strong>
              <strong role="columnheader">People available</strong>
              <strong role="columnheader">Interpretation</strong>
            </div>
            {capacitySnapshot.map(([camp, available, note]) => (
              <div role="row" key={camp}>
                <span role="cell">{camp}</span>
                <span role="cell">{available}</span>
                <span role="cell">{note}</span>
              </div>
            ))}
          </div>
          <p>
            This is evidence about likely bottlenecks, not a prediction of 2027
            availability. Chance Bay—not Whitehaven—was the route-critical
            constraint in this comparison.
          </p>
        </section>

        <section className="kayak-risk-grid">
          <article>
            <p>Lead time</p>
            <h2>When to act</h2>
            <List items={sharedKayakPlanning.bookingTiming} />
          </article>
          <article>
            <p>Forecast strategy</p>
            <h2>One booking, one supported fallback</h2>
            <List items={sharedKayakPlanning.weatherStrategy} />
          </article>
          <article className="is-common">
            <p>Shared load</p>
            <h2>Family and boats</h2>
            <dl>
              <div><dt>Party</dt><dd>{sharedKayakPlanning.party}</dd></div>
              <div><dt>Boats</dt><dd>{sharedKayakPlanning.boats}</dd></div>
              <div><dt>Water</dt><dd>{sharedKayakPlanning.water}</dd></div>
            </dl>
            <List items={sharedKayakPlanning.safety} />
          </article>
          <article>
            <p>Route choice</p>
            <h2>Current order</h2>
            <ol className="kayak-route-order">
              {rankedKayakOptions.map((option) => (
                <li key={option.slug}>
                  <a href={sitePath(`/trips/whitsundays-sea-kayaking/${option.slug}`)}>
                    <span>{option.rank}</span>
                    <strong>{option.shortTitle}</strong>
                    <small>Map route {option.stableRouteNumber}</small>
                  </a>
                </li>
              ))}
            </ol>
          </article>
        </section>

        <section className="kayak-links" aria-labelledby="planning-links-title">
          <div>
            <p>Official sources</p>
            <h2 id="planning-links-title">Operators, permits, maps &amp; weather</h2>
          </div>
          <div>
            {[
              ...sharedKayakPlanning.operators,
              ...sharedKayakPlanning.planningLinks,
            ].map((link) => (
              <a href={link.url} rel="noreferrer" target="_blank" key={link.url}>
                {link.title} ↗
              </a>
            ))}
          </div>
        </section>

        <nav className="kayak-option-nav" aria-label="Whitsundays expedition pages">
          <a href={sitePath("/trips/hamilton-island-working-week")}>
            ← Whitsundays overview
          </a>
          {rankedKayakOptions.map((option) => (
            <a
              href={sitePath(`/trips/whitsundays-sea-kayaking/${option.slug}`)}
              key={option.slug}
            >
              {option.shortTitle} →
            </a>
          ))}
        </nav>

        <footer className="kayak-footer">
          Planning source: <code>{sharedKayakPlanning.source}</code>. Recheck
          2027 schedules, prices, booking rules, permits and marine conditions.
        </footer>
      </main>
    </>
  );
}
