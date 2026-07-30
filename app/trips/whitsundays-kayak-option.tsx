import {
  rankedKayakOptions,
  sharedKayakPlanning,
  type KayakOption,
} from "../../data/whitsundays-kayaking";
import { sitePath } from "../../lib/site-path";
import SiteNav from "../site-nav";
import DestinationGallery from "./destination-gallery";
import "./whitsundays-kayak.css";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="kayak-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function WhitsundaysKayakOption({
  option,
}: {
  option: KayakOption;
}) {
  return (
    <>
      <SiteNav current="australia" australiaCurrent="whitsundays" />
      <main className="kayak-page">
        <header className="kayak-header">
          <div className="kayak-rank">
            Current choice {option.rank} · map route {option.stableRouteNumber}
          </div>
          <p>{option.eyebrow}</p>
          <h1>{option.title}</h1>
          <p className="kayak-route">{option.route}</p>
          <dl>
            <div>
              <dt>Distance</dt>
              <dd>{option.distanceSummary}</dd>
            </div>
            <div>
              <dt>Camps</dt>
              <dd>{option.camps}</dd>
            </div>
            <div>
              <dt>Planning cost</dt>
              <dd>{option.cost}</dd>
            </div>
          </dl>
        </header>

        <DestinationGallery
          photos={option.photos}
          label={`${option.shortTitle} photographs`}
        />

        <section className="kayak-map" aria-labelledby="kayak-map-title">
          <header>
            <p>Conceptual route</p>
            <h2 id="kayak-map-title">{option.title}</h2>
            <span>
              Map route {option.stableRouteNumber} is a stable identifier, not
              the current ranking.
            </span>
          </header>
          <a
            href={sitePath(option.mapSrc)}
            target="_blank"
            aria-label={`Enlarge map route ${option.stableRouteNumber}: ${option.title}`}
          >
            <img src={sitePath(option.mapSrc)} alt={option.mapAlt} />
          </a>
          <p>{sharedKayakPlanning.mapQualification}</p>
        </section>

        <section className="kayak-verdict" aria-labelledby="verdict-title">
          <div>
            <p>Bottom line</p>
            <h2 id="verdict-title">{option.recommendation}</h2>
          </div>
          <div>
            <article>
              <span>Choose it when</span>
              <p>{option.bestWhen}</p>
            </article>
            <article className="is-reef">
              <span>Reef standard</span>
              <p>{option.reefVerdict}</p>
            </article>
          </div>
        </section>

        <section className="kayak-days" aria-labelledby="days-title">
          <header>
            <p>Three days · two nights</p>
            <h2 id="days-title">Expedition sequence</h2>
          </header>
          <div>
            {option.days.map((day) => (
              <article key={day.label}>
                <span>{day.label}</span>
                <h3>{day.title}</h3>
                <div className="kayak-day-detail">
                  <p>{day.description}</p>
                  <BulletList items={day.bullets} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="kayak-distance" aria-labelledby="distance-title">
          <header>
            <p>Do not overstate precision</p>
            <h2 id="distance-title">Distance basis</h2>
          </header>
          <div className="kayak-distance-table">
            {option.distances.map((item) => (
              <article key={`${item.segment}-${item.distance}`}>
                <strong>{item.segment}</strong>
                <span>{item.distance}</span>
                <small>{item.type}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="kayak-camps" aria-labelledby="camps-title">
          <header>
            <p>Where we sleep</p>
            <h2 id="camps-title">Camp realities</h2>
          </header>
          <div>
            {option.campFacts.map((camp) => (
              <article key={camp.name}>
                <h3>{camp.name}</h3>
                <BulletList items={camp.facts} />
              </article>
            ))}
          </div>
        </section>

        <section className="kayak-risk-grid">
          <article>
            <p>Go / no-go</p>
            <h2>Weather and operating gates</h2>
            <BulletList items={option.weatherGates} />
          </article>
          <article>
            <p>Do not improvise</p>
            <h2>Bailout logic</h2>
            <BulletList items={option.bailout} />
          </article>
          <article>
            <p>Before booking</p>
            <h2>Questions for the operators</h2>
            <BulletList items={option.questions} />
          </article>
          <article className="is-common">
            <p>Common to every route</p>
            <h2>Family load and safety</h2>
            <dl>
              <div>
                <dt>Party</dt>
                <dd>{sharedKayakPlanning.party}</dd>
              </div>
              <div>
                <dt>Boats</dt>
                <dd>{sharedKayakPlanning.boats}</dd>
              </div>
              <div>
                <dt>Water</dt>
                <dd>{sharedKayakPlanning.water}</dd>
              </div>
            </dl>
            <BulletList items={sharedKayakPlanning.safety} />
          </article>
        </section>

        <section className="kayak-links" aria-labelledby="links-title">
          <div>
            <p>Official sources</p>
            <h2 id="links-title">Route links</h2>
          </div>
          <div>
            {[...option.links, ...sharedKayakPlanning.operators].map((link) => (
              <a href={link.url} rel="noreferrer" target="_blank" key={link.url}>
                {link.title} ↗
              </a>
            ))}
          </div>
        </section>

        <nav className="kayak-option-nav" aria-label="Other Whitsundays plans">
          <a href={sitePath("/trips/hamilton-island-working-week")}>
            ← Whitsundays overview
          </a>
          {rankedKayakOptions
            .filter((item) => item.slug !== option.slug)
            .map((item) => (
              <a
                href={sitePath(`/trips/whitsundays-sea-kayaking/${item.slug}`)}
                key={item.slug}
              >
                Current choice {item.rank}: {item.shortTitle} →
              </a>
            ))}
          <a href={sitePath("/trips/whitsundays-sea-kayaking/planning-booking")}>
            Planning &amp; booking →
          </a>
        </nav>

        <footer className="kayak-footer">
          Planning source: <code>{sharedKayakPlanning.source}</code>. Final
          route, limits, distances and camps require Salty Dog and Scamper
          confirmation.
        </footer>
      </main>
    </>
  );
}
