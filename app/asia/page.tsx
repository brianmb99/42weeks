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
    "The selected Asia sequence: Dehradun family time in India, a bounded Singapore office week, and Thanksgiving in Hong Kong.",
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
            <span>India, Singapore and Hong Kong</span>
            <span>Family + office weeks</span>
          </div>
          <p className="aus-overview-summary">
            Spend the longer block with family in Dehradun, then keep Singapore
            and Hong Kong as compact office weeks with a real weekend attached.
            India is not a sightseeing circuit; Hong Kong uses Thanksgiving as
            the principal family day.
          </p>
        </header>

        <RegionRhythm
          headingId="asia-route-title"
          label="Asia stay sequence"
          title="Three pieces of the Asia plan"
          summary="Each block is proportional to nights in that place. Singapore and Hong Kong open their detail plans; India still needs a location page."
          stops={asiaStops}
        />

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
          a Dehradun family-and-work base first; outside trips stay selective.
        </p>
      </main>
    </>
  );
}
