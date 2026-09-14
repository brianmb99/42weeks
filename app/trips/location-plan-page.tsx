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
import "./location-plan.css";

const toneLabels: Record<LocationRhythmTone, string> = {
  arrival: "Arrive / settle",
  work: "Work + school",
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

        <section className="location-rhythm" aria-labelledby="location-rhythm-title">
          <header>
            <div>
              <p>Stay rhythm</p>
              <h2 id="location-rhythm-title">{plan.rhythmTitle}</h2>
            </div>
            <p>{plan.rhythmSummary}</p>
          </header>
          <ol
            className="location-rhythm-track"
            aria-label={`${plan.title} stay rhythm`}
          >
            {plan.rhythm.map((segment) => (
              <li
                className={`is-${segment.tone}`}
                style={
                  { "--rhythm-days": segment.days } as CSSProperties
                }
                key={`${segment.dates}-${segment.label}`}
              >
                <span>{segment.dates}</span>
                <strong>{segment.label}</strong>
                <small>{segment.detail}</small>
              </li>
            ))}
          </ol>
          <p className="location-rhythm-mobile-hint" aria-hidden="true">
            Swipe to see the whole stay →
          </p>
          <div className="location-rhythm-legend" aria-label="Rhythm colors">
            {tones.map((tone) => (
              <span className={`is-${tone}`} key={tone}>
                <i aria-hidden="true" />
                {toneLabels[tone]}
              </span>
            ))}
          </div>
        </section>

        <section className="location-stay" aria-labelledby="location-stay-title">
          <div>
            <p>Where to stay</p>
            <h2 id="location-stay-title">{plan.stayTitle}</h2>
            <p>{plan.stayDescription}</p>
          </div>
          <ItemList items={plan.stayChecks} />
        </section>

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
              <article key={activity.title}>
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
