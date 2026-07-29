import type { Metadata } from "next";
import australiaPlan from "../../../data/australia-part-one.json";
import SiteNav from "../../site-nav";
import DestinationGallery, {
  type DestinationPhoto,
} from "../destination-gallery";
import "./route.css";

export const metadata: Metadata = {
  title: "Great Ocean Road Loop",
  description:
    "The nine-day vacation loop from Geelong to Melbourne via the Great Ocean Road, Gariwerd, and Ballarat.",
};

const roadTrip = australiaPlan.segments.roadTrip;
const geelong = australiaPlan.segments.geelong;
const melbourne = australiaPlan.segments.melbourne;
const roadPhotos: DestinationPhoto[] = [
  {
    src: "https://images.unsplash.com/photo-1736893474760-759d20e84f58?auto=format&fit=crop&fm=jpg&q=82&w=2200",
    alt: "The Twelve Apostles and cliffs along Victoria's Great Ocean Road",
    caption: "Twelve Apostles",
    credit: "Philip Ho / Unsplash",
    source:
      "https://unsplash.com/photos/a-view-of-the-beach-and-cliffs-of-the-great-ocean-road-Yd-HvUwdqMc",
  },
  {
    src: "https://images.unsplash.com/photo-1602729396501-b7c1ab35a2e4?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    alt: "Tree ferns and tall forest in Great Otway National Park",
    caption: "Otways rainforest",
    credit: "Caitie Philpott / Unsplash",
    source:
      "https://unsplash.com/photos/green-and-brown-trees-during-daytime-GIcFo20HDt0",
  },
  {
    src: "https://images.unsplash.com/photo-1634449594030-74d022f19fd8?auto=format&fit=crop&fm=jpg&q=82&w=1400",
    alt: "Mount Abrupt rising over woodland in the Grampians",
    caption: "Mount Abrupt, Grampians",
    credit: "Christian Bass / Unsplash",
    source:
      "https://unsplash.com/photos/a-view-of-a-mountain-range-with-trees-in-the-foreground-C1HARJTjGfk",
  },
];

function dateLabel(value: string, weekday = false) {
  return new Intl.DateTimeFormat("en-US", {
    ...(weekday ? { weekday: "short" } : {}),
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function GreatSouthernTouringRoutePage() {
  return (
    <>
      <SiteNav current="great-ocean-road" />
      <main className="route-page">
      <header className="route-header">
        <p>{australiaPlan.title}</p>
        <h1>{roadTrip.title}</h1>
        <div className="route-facts">
          <span>
            {dateLabel(roadTrip.start)}–{dateLabel(roadTrip.end)}
          </span>
          <span>{roadTrip.durationDays} days</span>
          <span>Vacation: Mon–Fri</span>
        </div>
        <p className="route-introduction">{roadTrip.summary}</p>
        <a
          className="official-route"
          href={roadTrip.officialRoute.url}
          rel="noreferrer"
          target="_blank"
        >
          {roadTrip.officialRoute.title} ↗
        </a>
      </header>

      <DestinationGallery
        photos={roadPhotos}
        label="Great Ocean Road Loop photographs"
      />

      <section className="route-context" aria-label="Before and after the road trip">
        <article>
          <span>Before · {dateLabel(geelong.start)}–{dateLabel(geelong.end)}</span>
          <h2>Geelong work week</h2>
          <p>
            Aim for <strong>{geelong.preferredArea}</strong>. Work September
            20–24; use an evening for Queenscliff and other afternoons or
            evenings for Geelong.
          </p>
        </article>
        <article>
          <span>After · {dateLabel(melbourne.start)}–{dateLabel(melbourne.end)}</span>
          <h2>Melbourne work week</h2>
          <p>
            Work October 4–8, with Melbourne activities in the evenings,
            including the fairy penguins at St Kilda Pier.
          </p>
        </article>
      </section>

      <section className="overnight-strip" aria-labelledby="overnights-title">
        <div>
          <p>Route sequence</p>
          <h2 id="overnights-title">Overnights</h2>
        </div>
        <ol>
          {roadTrip.overnights.map((stop) => (
            <li key={stop.place}>
              <strong>{stop.place}</strong>
              <span>
                {stop.nights
                  ? `${stop.nights} night${stop.nights === 1 ? "" : "s"}`
                  : stop.note}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="booking-list" aria-labelledby="book-first-title">
        <h2 id="book-first-title">Book first</h2>
        <ul>
          {roadTrip.bookFirst.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="day-plan" aria-labelledby="day-plan-title">
        <div className="section-title">
          <p>Working detail</p>
          <h2 id="day-plan-title">Day by day</h2>
        </div>
        {roadTrip.days.map((day) => {
          const options = "options" in day ? day.options : [];
          const links = "links" in day ? day.links : [];
          return (
            <article className="route-day" id={`day-${day.day}`} key={day.day}>
              <div className="day-date">
                <span>Day {day.day}</span>
                <time dateTime={day.date}>{dateLabel(day.date, true)}</time>
              </div>
              <div className="day-route">
                <h3>{day.route}</h3>
                <p>{day.drive}</p>
                <span>Sleep: {day.overnight}</span>
              </div>
              <div className="day-notes">
                <ul className="primary-plan">
                  {day.plan.map((item) => <li key={item}>{item}</li>)}
                </ul>
                {options.length > 0 && (
                  <div className="day-options">
                    <strong>Choose from</strong>
                    <p>{options.join(" · ")}</p>
                  </div>
                )}
                {links.length > 0 && (
                  <div className="day-links">
                    {links.map((link) => (
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
          );
        })}
      </section>

      <p className="route-data-note">
        Detail source: <code>data/australia-part-one.json</code>. Calendar dates
        remain authoritative in <code>data/trip-plan.json</code>.
      </p>
      </main>
    </>
  );
}
