import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { asiaStops } from "../../data/asia-pages";
import { sitePath } from "../../lib/site-path";
import RegionRhythm from "../trips/region-rhythm";
import SiteNav from "../site-nav";
import "../trips/australia.css";

export const metadata: Metadata = {
  title: "Asia",
  description:
    "The selected Asia sequence: three weeks in India, then a two-week Hong Kong office stay before New Zealand.",
};

export default function AsiaPage() {
  return (
    <>
      <SiteNav current="asia" asiaCurrent="overview" />
      <main className="aus-overview-page">
        <header className="aus-overview-header">
          <p>42 Weeks · regional plan</p>
          <h1>Asia</h1>
          <div className="aus-overview-facts">
            <span>Oct 24–Nov 27, 2027</span>
            <span>India and Hong Kong</span>
            <span>Family + two-week office stay</span>
          </div>
          <p className="aus-overview-summary">
            Spend the first India week with family in Dehradun through Diwali,
            take one bounded north-India vacation week, then work from
            Bangalore. Fly Sunday to Hong Kong for two weeks of office life,
            a complete weekend and Thanksgiving.
          </p>
        </header>

        <RegionRhythm
          headingId="asia-route-title"
          label="Asia stay sequence"
          title="Two pieces of the Asia plan"
          summary="Each block is proportional to nights in that place. Linked stops open their detail plans."
          stops={asiaStops}
        />

        <section
          className="aus-planning-notes"
          id="singapore"
          aria-labelledby="singapore-note-title"
        >
          <p>Deliberate exclusion</p>
          <h2 id="singapore-note-title">Singapore is not a family stay</h2>
          <p>
            Those nights are more valuable as a second week in Hong Kong and as
            keeping Wānaka at three weeks than as another city setup between
            India and New Zealand. A short Singapore hop can still be added
            later if an office visit needs it.
          </p>
          <ul>
            <li>
              Two weeks in Hong Kong create a complete weekend and Thanksgiving
              before the overnight flight, instead of a six-night office stop.
            </li>
            <li>
              Wānaka stays the twenty-night late-spring work base rather than
              shrinking to make room for a third Asian city.
            </li>
            <li>
              A two-day, one-night or two-night Singapore trip remains available
              for one parent or the whole family if it earns the extra flight.
            </li>
          </ul>
        </section>

        <section className="aus-route-grid" aria-label="Asia trip sections">
          {asiaStops.map((stop) => {
            const body = (
              <div>
                <span>
                  {stop.dates} · {stop.mode}
                </span>
                <h2>{stop.title}</h2>
                <p>{stop.description}</p>
                {"href" in stop && stop.href ? (
                  <strong>Open plan →</strong>
                ) : (
                  <strong>Detail page not yet written</strong>
                )}
              </div>
            );

            if ("href" in stop && stop.href && "image" in stop && stop.image) {
              return (
                <a
                  className="aus-route-card"
                  href={sitePath(stop.href)}
                  key={stop.title}
                >
                  <img
                    src={sitePath(stop.image)}
                    alt={stop.alt}
                    loading="lazy"
                  />
                  {body}
                </a>
              );
            }

            return (
              <article
                className="aus-route-card is-plain"
                style={{ "--place-color": stop.color } as CSSProperties}
                key={stop.title}
              >
                {body}
              </article>
            );
          })}
        </section>

        <p className="aus-overview-note">
          Dates remain controlled by <code>data/trip-plan.json</code>. India is
          a Dehradun family-and-work week first; the Golden Triangle is a
          bounded vacation, not an open circuit.
        </p>
      </main>
    </>
  );
}
