import type { CSSProperties } from "react";
import { sitePath } from "../../lib/site-path";
import "./region-rhythm.css";

export type RegionRhythmStop = {
  title: string;
  barLabel?: string;
  mapLabel: string;
  dates: string;
  days: number;
  color: string;
  href?: string;
};

export default function RegionRhythm({
  title,
  summary,
  headingId,
  label,
  stops,
}: {
  title: string;
  summary: string;
  headingId: string;
  label: string;
  stops: readonly RegionRhythmStop[];
}) {
  const totalDays = stops.reduce((total, stop) => total + stop.days, 0);

  return (
    <section className="region-rhythm" aria-labelledby={headingId}>
      <header>
        <div>
          <p>Stay sequence</p>
          <h2 id={headingId}>{title}</h2>
        </div>
        <p>{summary}</p>
      </header>
      <div
        className="region-rhythm-map"
        role="img"
        aria-label={`${label}: ${stops
          .map(
            (stop) =>
              `${stop.title}, ${stop.days} ${stop.days === 1 ? "day" : "days"}`,
          )
          .join("; ")}`}
      >
        {stops.map((stop) => {
          const style = {
            "--place-color": stop.color,
            "--rhythm-days": stop.days,
          } as CSSProperties;
          const className = stop.days / totalDays >= 0.18 ? "is-wide" : undefined;
          const inner = (
            <>
              <b className="is-full">{stop.barLabel ?? stop.title}</b>
              <b className="is-short">{stop.mapLabel}</b>
            </>
          );

          return stop.href ? (
            <a
              href={sitePath(stop.href)}
              className={className}
              style={style}
              title={`${stop.title}: ${stop.dates}`}
              key={stop.title}
            >
              {inner}
            </a>
          ) : (
            <span
              className={className}
              style={style}
              title={`${stop.title}: ${stop.dates}`}
              key={stop.title}
            >
              {inner}
            </span>
          );
        })}
      </div>
      <ol className="region-rhythm-key">
        {stops.map((stop) => {
          const content = (
            <>
              <strong>{stop.title}</strong>
              <span>
                {stop.dates} · {stop.days} {stop.days === 1 ? "day" : "days"}
              </span>
            </>
          );

          return (
            <li
              style={{ "--place-color": stop.color } as CSSProperties}
              key={stop.title}
            >
              {stop.href ? (
                <a href={sitePath(stop.href)}>{content}</a>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
