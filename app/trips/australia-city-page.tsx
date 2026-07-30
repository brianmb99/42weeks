import type { AustraliaCity } from "../../data/australia-pages";
import SiteNav from "../site-nav";
import DestinationGallery from "./destination-gallery";
import "./australia.css";

export default function AustraliaCityPage({ city }: { city: AustraliaCity }) {
  return (
    <>
      <SiteNav current="australia" australiaCurrent={city.slug} />
      <main className="aus-city-page">
        <header className="aus-city-header">
          <p>{city.eyebrow}</p>
          <h1>{city.title}</h1>
          <div className="aus-city-facts">
            <span>{city.dates}</span>
            {city.facts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
          </div>
          <p className="aus-city-summary">{city.summary}</p>
        </header>

        <DestinationGallery
          photos={city.photos}
          label={`${city.title} planning photographs`}
        />

        <section className="aus-stay" aria-labelledby="aus-stay-title">
          <div>
            <p>Where to stay</p>
            <h2 id="aus-stay-title">{city.stayTitle}</h2>
            <p>{city.stayDescription}</p>
          </div>
          <ul>
            {city.stayChecks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
        </section>

        <section className="aus-ideas" aria-labelledby="aus-ideas-title">
          <header>
            <p>Working list</p>
            <h2 id="aus-ideas-title">What fits here</h2>
          </header>
          <div>
            {city.ideas.map((idea, index) => (
              <article key={idea.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{idea.timing}</p>
                  <h3>{idea.title}</h3>
                  <p>{idea.description}</p>
                  {idea.links && (
                    <div className="aus-idea-links">
                      {idea.links.map((link) => (
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

        <aside className="aus-planning-notes" aria-labelledby="aus-notes-title">
          <p>Still to settle</p>
          <h2 id="aus-notes-title">Planning notes</h2>
          <ul>
            {city.planningNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </aside>
      </main>
    </>
  );
}
