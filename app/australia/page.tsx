import type { Metadata } from "next";
import { australiaStops } from "../../data/australia-pages";
import { sitePath } from "../../lib/site-path";
import SiteNav from "../site-nav";
import "../trips/australia.css";

export const metadata: Metadata = {
  title: "Australia",
  description:
    "The selected working route through Melbourne, Newtown, Victoria, Alice Springs, Sydney, the Whitsundays and Brisbane.",
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
            <span>Aug 21–Oct 23, 2027</span>
            <span>Victoria, Northern Territory, New South Wales and Queensland</span>
            <span>Work + vacation</span>
          </div>
          <p className="aus-overview-summary">
            Land in Melbourne, live for a week in Newtown, take the
            seven-day Victorian road trip, spend two weeks working in Alice
            Springs, work beside a Sydney beach, then finish with the
            Whitsundays and a Brisbane reset week.
          </p>
        </header>

        <section className="aus-route-intro" aria-labelledby="aus-route-title">
          <p>In order</p>
          <h2 id="aus-route-title">Seven pieces of the Australia plan</h2>
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
