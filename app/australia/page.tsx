import type { Metadata } from "next";
import { australiaStops } from "../../data/australia-pages";
import { sitePath } from "../../lib/site-path";
import SiteNav from "../site-nav";
import "../trips/australia.css";

export const metadata: Metadata = {
  title: "Australia",
  description:
    "The working route through Geelong, Victoria, Sydney, the Whitsundays and Outback Queensland.",
};

export default function AustraliaPage() {
  return (
    <>
      <SiteNav current="australia" australiaCurrent="overview" />
      <main className="aus-overview-page">
        <header className="aus-overview-header">
          <p>42 Weeks · regional plan</p>
          <h1>Australia</h1>
          <div className="aus-overview-facts">
            <span>Sep 18–Oct 23, 2027</span>
            <span>Victoria, New South Wales and Queensland</span>
            <span>Work + vacation</span>
          </div>
          <p className="aus-overview-summary">
            Start with a stable work week in Geelong, take the seven-day
            Victorian road trip, use Melbourne as a compact city weekend,
            work beside a Sydney beach, then finish with the Whitsundays and
            Outback Queensland.
          </p>
        </header>

        <section className="aus-route-intro" aria-labelledby="aus-route-title">
          <p>In order</p>
          <h2 id="aus-route-title">Six pieces of the Australia plan</h2>
        </section>

        <section className="aus-route-grid" aria-label="Australia trip sections">
          {australiaStops.map((stop) => (
            <a
              className="aus-route-card"
              href={sitePath(stop.href)}
              key={stop.title}
            >
              <img src={sitePath(stop.image)} alt={stop.alt} loading="lazy" />
              <div>
                <span>
                  {stop.dates} · {stop.mode}
                </span>
                <h2>{stop.title}</h2>
                <p>{stop.description}</p>
                <strong>Open plan →</strong>
              </div>
            </a>
          ))}
        </section>

        <p className="aus-overview-note">
          Dates remain controlled by <code>data/trip-plan.json</code>. These
          pages hold the working detail and can grow as lodging, activities and
          work patterns become firmer.
        </p>
      </main>
    </>
  );
}
