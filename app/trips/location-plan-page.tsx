import type { CSSProperties } from "react";
import type {
  LocationPagePlan,
  LocationRhythmTone,
} from "../../data/location-page-types";
import { sitePath } from "../../lib/site-path";
import SiteNav, {
  type AsiaNavPage,
  type AustraliaNavPage,
} from "../site-nav";
import DestinationGallery from "./destination-gallery";
import VibeActivityLink from "./vibe-activity-link";
import "./location-plan.css";

const toneLabels: Record<LocationRhythmTone, string> = {
  arrival: "Arrive / settle",
  work: "Work & School",
  family: "Family time",
  vacation: "Vacation",
  travel: "Travel",
};

type LocationPlanPageProps = {
  plan: LocationPagePlan;
  current?: "australia" | "asia" | "new-zealand";
  australiaCurrent?: AustraliaNavPage;
  asiaCurrent?: AsiaNavPage;
  source: string;
};

function ItemList({ items }: { items: string[] }) {
  return (
    <ul className="location-item-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function LocationPlanPage({
  plan,
  current,
  australiaCurrent,
  asiaCurrent,
  source,
}: LocationPlanPageProps) {
  const tones = Array.from(new Set(plan.rhythm.map((segment) => segment.tone)));
  const usesMobileOverviewCards = plan.mobileRhythmLayout !== "scroll";

  return (
    <>
      <SiteNav
        current={current}
        australiaCurrent={australiaCurrent}
        asiaCurrent={asiaCurrent}
      />
      <main className="location-page">
        <header className="location-header">
          <p>{plan.eyebrow}</p>
          <h1>{plan.title}</h1>
          <div className="location-facts">
            <span>{plan.dates}</span>
            {plan.facts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
          </div>
          <p className="location-summary">{plan.summary}</p>
        </header>

        {plan.photos.length > 0 && (
          <DestinationGallery
            photos={plan.photos}
            label={`${plan.title} planning photographs`}
          />
        )}

        <section
          className={`location-rhythm${
            usesMobileOverviewCards ? " has-mobile-overview-cards" : ""
          }`}
          aria-labelledby="location-rhythm-title"
        >
          <header>
            <div>
              <p>Stay rhythm</p>
              <h2 id="location-rhythm-title">{plan.rhythmTitle}</h2>
            </div>
            <p>{plan.rhythmSummary}</p>
          </header>
          {usesMobileOverviewCards && (
            <div
              className="location-rhythm-mobile-map"
              role="img"
              aria-label={`${plan.title} proportional stay overview: ${plan.rhythm
                .map(
                  (segment) =>
                    `${segment.label}, ${segment.days} ${
                      segment.days === 1 ? "day" : "days"
                    }`,
                )
                .join("; ")}`}
            >
              {plan.rhythm.map((segment) => (
                <span
                  className={`is-${segment.tone}${
                    segment.days >= 3 ? " is-wide" : ""
                  }`}
                  style={
                    { "--rhythm-days": segment.days } as CSSProperties
                  }
                  title={`${segment.dates} · ${segment.label}`}
                  aria-hidden="true"
                  key={`${segment.dates}-${segment.label}`}
                >
                  <b>{segment.mapLabel ?? segment.label}</b>
                </span>
              ))}
            </div>
          )}
          <ol
            className="location-rhythm-track"
            aria-label={`${plan.title} stay rhythm`}
          >
            {plan.rhythm.map((segment) => (
              <li
                className={`is-${segment.tone}${
                  segment.highlights?.length ? " has-highlights" : ""
                }`}
                style={
                  { "--rhythm-days": segment.days } as CSSProperties
                }
                key={`${segment.dates}-${segment.label}`}
              >
                <div className="location-rhythm-card-meta">
                  <span>{segment.dates}</span>
                  <em>
                    {segment.days} {segment.days === 1 ? "day" : "days"}
                  </em>
                </div>
                <strong>{segment.label}</strong>
                <small>{segment.detail}</small>
                {segment.highlights && (
                  <ul className="location-rhythm-links">
                    {segment.highlights.map((highlight) => (
                      <li key={highlight.url}>
                        <VibeActivityLink activity={highlight} />
                      </li>
                    ))}
                  </ul>
                )}
                {segment.featureLink && (
                  <a
                    className="location-rhythm-feature-link"
                    href={segment.featureLink.href}
                  >
                    {segment.featureLink.title} ↓
                  </a>
                )}
              </li>
            ))}
          </ol>
          {!usesMobileOverviewCards && (
            <p className="location-rhythm-mobile-hint" aria-hidden="true">
              Swipe to see the whole stay →
            </p>
          )}
          <div className="location-rhythm-legend" aria-label="Rhythm colors">
            {tones.map((tone) => (
              <span className={`is-${tone}`} key={tone}>
                <i aria-hidden="true" />
                {toneLabels[tone]}
              </span>
            ))}
          </div>
        </section>

        <section className="location-base-grid" aria-label="Base setup">
          <article id={plan.basePanel.id}>
            <div className="location-base-kicker">
              <p>{plan.basePanel.eyebrow}</p>
              {plan.basePanel.headerNote && (
                <p>{plan.basePanel.headerNote}</p>
              )}
            </div>
            <h2>{plan.basePanel.title}</h2>
            {plan.basePanel.description && (
              <p>{plan.basePanel.description}</p>
            )}
            {plan.basePanel.items && <ItemList items={plan.basePanel.items} />}
          </article>
          <article id="where-to-stay">
            <p>Where to stay</p>
            <h2>{plan.stayTitle}</h2>
            <p>{plan.stayDescription}</p>
            <ItemList items={plan.stayChecks} />
          </article>
        </section>

        {plan.featurePlans && plan.featurePlans.length > 0 && (
          <section
            className="location-feature-plans"
            aria-label="Dedicated experience plans"
          >
            {plan.featurePlans.map((feature) => (
              <article
                className="location-feature-plan"
                id={feature.id}
                key={feature.id}
              >
                <header>
                  <p>{feature.eyebrow}</p>
                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                </header>
                <div>
                  {feature.items && <ItemList items={feature.items} />}
                  {feature.links && (
                    <div className="location-feature-links">
                      {feature.links.map((link) => (
                        <a
                          href={link.url}
                          rel="noreferrer"
                          target="_blank"
                          key={link.url}
                        >
                          {link.title} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </section>
        )}

        {plan.showActivities && plan.activities && plan.activities.length > 0 && (
          <section
            className="location-activities"
            aria-labelledby="location-activities-title"
          >
            <header>
              <p>At a glance, then in detail</p>
              <h2 id="location-activities-title">What fits here</h2>
            </header>
            <div>
              {plan.activities.map((activity, index) => (
                <article id={activity.id} key={activity.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p>{activity.timing}</p>
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                    {activity.links && (
                      <div className="location-activity-links">
                        {activity.links.map((link) => (
                          <a
                            href={link.url}
                            rel="noreferrer"
                            target="_blank"
                            key={link.url}
                          >
                            {link.title} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {plan.panels && plan.panels.length > 0 && (
          <section className="location-panels" aria-label="Planning details">
            {plan.panels.map((panel) => (
              <article id={panel.id} key={panel.title}>
                <p>{panel.eyebrow}</p>
                <h2>{panel.title}</h2>
                {panel.description && <p>{panel.description}</p>}
                {panel.items && <ItemList items={panel.items} />}
              </article>
            ))}
          </section>
        )}

        {plan.bookFirst && plan.bookFirst.length > 0 && (
          <section className="location-booking" aria-labelledby="location-booking-title">
            <div>
              <p>Sequence matters</p>
              <h2 id="location-booking-title">Book first</h2>
            </div>
            <ol>
              {plan.bookFirst.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        )}

        <aside className="location-notes" aria-labelledby="location-notes-title">
          <p>Planning notes</p>
          <h2 id="location-notes-title">What still needs judgment</h2>
          <ItemList items={plan.planningNotes} />
        </aside>

        {plan.links && plan.links.length > 0 && (
          <section className="location-references" aria-labelledby="location-references-title">
            <div>
              <p>Official and planning links</p>
              <h2 id="location-references-title">References</h2>
            </div>
            <div>
              {plan.links.map((link) => (
                <a
                  href={link.url}
                  rel="noreferrer"
                  target="_blank"
                  key={link.url}
                >
                  {link.title} ↗
                </a>
              ))}
            </div>
          </section>
        )}

        <footer className="location-footer">
          <span>
            Detail source: <code>{source}</code>
          </span>
          <a href={sitePath("/calendar")}>Open exact calendar →</a>
        </footer>
      </main>
    </>
  );
}
