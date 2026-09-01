import type { Metadata } from "next";
import skiProgramsData from "../../data/ski-programs.json";
import SiteNav from "../site-nav";
import "./ski-programs.css";

type ProgramStatus =
  | "strong option"
  | "possible"
  | "awaiting reply"
  | "draft ready"
  | "not a fit";

type SkiProgram = {
  name: string;
  location: string;
  url: string;
  status: ProgramStatus;
  contactActivity: string;
  people: string;
  currentRead: string;
  nextStep: string;
};

const statusClass: Record<ProgramStatus, string> = {
  "strong option": "is-strong",
  possible: "is-possible",
  "awaiting reply": "is-awaiting",
  "draft ready": "is-draft",
  "not a fit": "is-not-fit",
};

const statusLabels: Record<ProgramStatus, string> = {
  "strong option": "Strong option",
  possible: "Possible",
  "awaiting reply": "Awaiting reply",
  "draft ready": "Draft ready",
  "not a fit": "Not a fit",
};

function countByStatus(programs: SkiProgram[]) {
  const counts = new Map<ProgramStatus, number>();
  for (const program of programs) {
    counts.set(program.status, (counts.get(program.status) ?? 0) + 1);
  }
  return counts;
}

export const metadata: Metadata = {
  title: "U12 Ski Programs",
  description:
    "Public status board for January–March 2028 U12 alpine ski-program outreach.",
  robots: { index: false, follow: false },
};

export default function SkiProgramsPage() {
  const programs = skiProgramsData.programs as SkiProgram[];
  const counts = countByStatus(programs);
  const racerList = skiProgramsData.planning.racers.join(" and ");

  return (
    <>
      <SiteNav />
      <main className="ski-programs-page">
        <header className="ski-programs-header">
          <p className="ski-programs-eyebrow">42 Weeks · Alps planning</p>
          <h1>U12 ski program search</h1>
          <p className="ski-programs-intro">
            Outreach status for {racerList} as {skiProgramsData.planning.ageGroup}{" "}
            racers during {skiProgramsData.planning.period}. This unlisted page
            tracks program leads only — no private correspondence.
          </p>
          <div className="ski-programs-meta">
            <time dateTime="2026-09-01">
              Last updated {skiProgramsData.lastUpdated}
            </time>
            <span>{programs.length} programs tracked</span>
          </div>
          <div
            className="ski-programs-summary"
            aria-label="Status summary counts"
          >
            {(Object.keys(statusLabels) as ProgramStatus[]).map((status) => {
              const count = counts.get(status) ?? 0;
              if (count === 0) return null;
              return (
                <span
                  className="ski-programs-summary-item"
                  key={status}
                >
                  <strong>{count}</strong>
                  {statusLabels[status]}
                </span>
              );
            })}
          </div>
        </header>

        <section className="ski-programs-list" aria-label="Program leads">
          {programs.map((program) => (
            <article className="ski-program-card" key={program.name}>
              <div className="ski-program-card-header">
                <div className="ski-program-card-title">
                  <h2>{program.name}</h2>
                  <p className="ski-program-location">{program.location}</p>
                </div>
                <span
                  className={`ski-program-status ${statusClass[program.status]}`}
                >
                  {statusLabels[program.status]}
                </span>
              </div>
              <div className="ski-program-fields">
                <div className="ski-program-field">
                  <span className="ski-program-field-label">
                    Contact activity
                  </span>
                  <p className="ski-program-field-value">
                    {program.contactActivity}
                  </p>
                </div>
                <div className="ski-program-field">
                  <span className="ski-program-field-label">People</span>
                  <p className="ski-program-field-value">{program.people}</p>
                </div>
                <div className="ski-program-field">
                  <span className="ski-program-field-label">Current read</span>
                  <p className="ski-program-field-value">{program.currentRead}</p>
                </div>
                <div className="ski-program-field">
                  <span className="ski-program-field-label">Next step</span>
                  <p className="ski-program-field-value">{program.nextStep}</p>
                </div>
              </div>
              <a
                className="ski-program-link"
                href={program.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                Program website
              </a>
            </article>
          ))}
        </section>

        <p className="ski-programs-footnote">
          Source: <code>data/ski-programs.json</code>. Share this page only with
          people who need the public summary — not indexed in site navigation.
        </p>
      </main>
    </>
  );
}
