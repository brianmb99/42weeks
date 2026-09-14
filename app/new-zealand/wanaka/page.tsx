import type { Metadata } from "next";
import wanaka from "../../../data/wanaka.json";
import LocationPlanPage from "../../trips/location-plan-page";

export const metadata: Metadata = {
  title: "Wānaka",
  description:
    "The selected twenty-night Wānaka working base, early-shift rhythm and forecast-led four-day mini-vacation.",
};

function dateRangeLabel(value: string) {
  const [start, end] = value.split("/");
  const format = (date: string, includeMonth = true) =>
    new Intl.DateTimeFormat("en-US", {
      ...(includeMonth ? { month: "short" } : {}),
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  return `${format(start)}–${format(end, !sameMonth)}`;
}

export default function WanakaPage() {
  return (
    <LocationPlanPage
      current="new-zealand"
      source="data/wanaka.json"
      plan={{
        eyebrow: "New Zealand · late-spring working base",
        title: "Wānaka",
        dates: "Nov 28–Dec 17, 2027",
        facts: [
          "20 nights",
          "Two full work weeks",
          "Two vacation weekdays",
        ],
        summary: wanaka.summary,
        photos: [
          {
            src: "/images/new-zealand/wanaka-lake.jpg",
            alt: "The northern reaches of Lake Wānaka surrounded by mountains",
            caption: "Lake Wānaka and the Southern Alps",
            credit: "Michal Klajban / Wikimedia Commons · CC BY-SA 4.0",
            source:
              "https://commons.wikimedia.org/wiki/File:Lake_Wanaka_-_northern_part,_New_Zealand.jpg",
          },
          {
            src: "/images/new-zealand/wanaka-shore.jpg",
            alt: "Lake Wānaka shoreline with mountains beyond the water",
            caption: "The everyday lakefront",
            credit: "Krzysztof Golik / Wikimedia Commons · CC BY-SA 4.0",
            source:
              "https://commons.wikimedia.org/wiki/File:Lake_Wanaka_03.jpg",
          },
          {
            src: "/images/new-zealand/wanaka-rob-roy.jpg",
            alt: "Rob Roy Glacier above the forested Rob Roy valley",
            caption: "Rob Roy Glacier",
            credit: "Du Hugin Skulblaka / Wikimedia Commons · CC BY-SA 4.0",
            source:
              "https://commons.wikimedia.org/wiki/File:Rob_Roy_Glacier_View_at_end_of_Track.jpg",
          },
        ],
        rhythmTitle: "Zoom in on the twenty-night base",
        rhythmSummary:
          "The strip is deliberately not a South Island attraction list. It shows why Wānaka is workable: long stable blocks, two real weekends and one forecast-led mini-vacation without repeated lodging changes.",
        rhythm: [
          {
            label: "Arrive and settle",
            dates: "Sun, Nov 28",
            detail: "Queenstown connection, drive, groceries and sleep.",
            days: 1,
            tone: "arrival",
          },
          {
            label: "Full work week",
            dates: "Nov 29–Dec 3",
            detail: "Early full days; long late-spring afternoons.",
            days: 5,
            tone: "work",
          },
          {
            label: "Local weekend",
            dates: "Dec 4–5",
            detail: "One larger outing and one recovery day.",
            days: 2,
            tone: "family",
          },
          {
            label: "Anchor workdays",
            dates: "Dec 6–8",
            detail: "Three four-hour early blocks; stay near Wānaka.",
            days: 3,
            tone: "work",
          },
          {
            label: "Mini-vacation",
            dates: "Dec 9–12",
            detail: "Two leave days plus the weekend; follow the forecast.",
            days: 4,
            tone: "vacation",
          },
          {
            label: "Full work week",
            dates: "Dec 13–17",
            detail: "Visible full output and gradual packing for home.",
            days: 5,
            tone: "work",
          },
        ],
        stayTitle: wanaka.base.recommendation,
        stayDescription: wanaka.base.reason,
        stayChecks: wanaka.base.requirements,
        activities: [
          {
            title: "Wānaka lakefront + Outlet Track",
            timing: "Default workday afternoon",
            description:
              "Walk or cycle from the base with no destination pressure. The lakefront is what makes ordinary workdays here feel like New Zealand rather than a remote office with weekend tourism.",
          },
          {
            title: "Mount Iron",
            timing: "Compact hike when wind and heat permit",
            description:
              "Use the local loop for a substantial after-work walk without sacrificing an entire day. Move it freely according to weather and family energy.",
          },
          {
            title: "Diamond Lake + Rocky Mountain",
            timing: "Longer afternoon",
            description:
              "Choose the lower or fuller route according to conditions and remaining daylight. It is a flexible local outing, not a fixed reservation.",
          },
          {
            title: "Rob Roy Glacier Track",
            timing: "Leading full-day weekend candidate",
            description:
              "Use this only when the access road, fords, track and alpine forecast all cooperate. Keep a lake day or Diamond Lake as the honest fallback.",
            links: [wanaka.links[2]],
          },
          {
            title: "Paddle close to shore",
            timing: "Settled-weather afternoon",
            description:
              "Kayak or paddleboard only with realistic cold-water expectations. Wind can turn an appealing lake afternoon into the wrong plan quickly.",
          },
          {
            title: "Library, Puzzling World or the pool",
            timing: "Rain, wind or recovery day",
            description:
              "These are useful working-base infrastructure, not consolation prizes. Keep at least one afternoon quiet each week.",
          },
          {
            title: "Forecast-led four-day mini-vacation",
            timing: "Dec 9–12 · two vacation weekdays",
            description:
              "Keep Wānaka as the default base. Add two nights at Aoraki only if the forecast and flexible booking make the move worthwhile; do not attempt Milford Sound as a day trip.",
          },
        ],
        panels: [
          {
            eyebrow: "Arrival",
            title: "Use the overnight flight; protect the first real workday",
            description: `${wanaka.arrival.plan} ${wanaka.arrival.fallback}`,
          },
          {
            eyebrow: "Late spring",
            title: "Long evenings make the work model worthwhile",
            description: `${wanaka.season.summary} ${wanaka.season.planningRange}`,
            items: wanaka.season.notes,
          },
          {
            id: "work-rhythm",
            eyebrow: "November 29–December 17",
            title: "Early full weeks around three anchor days",
            items: wanaka.workRhythm.map(
              (block) =>
                `${dateRangeLabel(block.dates)} — ${block.mode}: ${block.plan}`,
            ),
          },
          {
            id: "mini-vacation",
            eyebrow: "December 9–12",
            title: "Choose the four-day plan from the forecast",
            description: `${wanaka.miniVacation.recommendation} ${wanaka.miniVacation.pushback}`,
            items: wanaka.miniVacation.rankedOptions.map(
              (option) =>
                `${option.rank}. ${option.title}: ${option.tradeoff}`,
            ),
          },
          {
            eyebrow: "Place-based learning",
            title: "Homeschool hooks",
            items: wanaka.homeschool,
          },
        ],
        bookFirst: wanaka.bookFirst,
        planningNotes: [
          ...wanaka.season.notes,
          wanaka.arrival.fallback,
        ],
        links: wanaka.links,
      }}
    />
  );
}
