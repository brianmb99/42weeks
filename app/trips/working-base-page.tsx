import { sitePath } from "../../lib/site-path";
import SiteNav, { type AustraliaNavPage } from "../site-nav";
import "./queensland.css";

export type WorkingBaseSection = {
  id?: string;
  eyebrow: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type WorkingBasePageProps = {
  current: "australia" | "new-zealand";
  australiaCurrent?: AustraliaNavPage;
  eyebrow: string;
  title: string;
  facts: string[];
  summary: string;
  baseTitle: string;
  baseReason: string;
  requirements: string[];
  sections: WorkingBaseSection[];
  cautions: string[];
  homeschool: string[];
  bookFirst: string[];
  links: Array<{ title: string; url: string }>;
  source: string;
};

function SimpleList({ items }: { items: string[] }) {
  return (
    <ul className="qld-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function WorkingBasePage({
  current,
  australiaCurrent,
  eyebrow,
  title,
  facts,
  summary,
  baseTitle,
  baseReason,
  requirements,
  sections,
  cautions,
  homeschool,
  bookFirst,
  links,
  source,
}: WorkingBasePageProps) {
  return (
    <>
      <SiteNav current={current} australiaCurrent={australiaCurrent} />
      <main className="qld-page">
        <header className="qld-header">
          <p className="qld-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <div className="qld-facts">
            {facts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
          </div>
          <p className="qld-summary">{summary}</p>
        </header>

        <section className="qld-sequence" aria-label={`${title} working plan`}>
          {sections.map((section, index) => (
            <article
              className={`qld-sequence-item ${
                index % 3 === 1 ? "is-vacation" : "is-work"
              }`}
              id={section.id}
              key={section.title}
            >
              <p className="qld-eyebrow">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items && <SimpleList items={section.items} />}
            </article>
          ))}
        </section>

        <section className="qld-planning-grid">
          <article className="qld-panel qld-base">
            <p className="qld-eyebrow">Recommended base</p>
            <h2>{baseTitle}</h2>
            <p>{baseReason}</p>
            <h3>Must have</h3>
            <SimpleList items={requirements} />
          </article>

          <article className="qld-panel">
            <p className="qld-eyebrow">Recheck before booking</p>
            <h2>Known cautions</h2>
            <SimpleList items={cautions} />
          </article>

          <article className="qld-panel">
            <p className="qld-eyebrow">Place-based learning</p>
            <h2>Homeschool hooks</h2>
            <SimpleList items={homeschool} />
          </article>
        </section>

        <section className="qld-booking">
          <div>
            <p className="qld-eyebrow">Sequence matters</p>
            <h2>Book first</h2>
          </div>
          <ol>
            {bookFirst.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </section>

        <section className="qld-references">
          <div>
            <p className="qld-eyebrow">Official and planning links</p>
            <h2>References</h2>
          </div>
          <div className="qld-links">
            {links.map((link) => (
              <a href={link.url} rel="noreferrer" target="_blank" key={link.url}>
                {link.title} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <footer className="qld-footer">
          <span>
            Detail source: <code>{source}</code>
          </span>
          <a href={sitePath("/calendar")}>Open exact calendar →</a>
        </footer>
      </main>
    </>
  );
}
