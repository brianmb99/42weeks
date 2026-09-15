import type { Metadata } from "next";
import wanaka from "../../../data/wanaka.json";
import LocationPlanPage from "../../trips/location-plan-page";

export const metadata: Metadata = {
  title: "Wānaka",
  description:
    "The selected twenty-night Wānaka Work & School base and forecast-led four-day mini-vacation.",
};

export default function WanakaPage() {
  return (
    <LocationPlanPage
      current="new-zealand"
      source="data/wanaka.json"
      plan={{
        eyebrow: "New Zealand · late-spring Work & School base",
        title: "Wānaka",
        dates: "Nov 28–Dec 17, 2027",
        facts: [
          "20 nights",
          "Two full Work & School weeks",
          "Two vacation weekdays",
        ],
        summary:
          "Wānaka works because this is almost three weeks in one house, not a South Island road trip disguised as a Work & School period. Long late-spring daylight, two complete weekends and one forecast-led mini-vacation provide the New Zealand experience without repeated lodging changes.",
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
            mapLabel: "Arrive",
            dates: "Sun, Nov 28",
            detail: "Queenstown connection, drive, groceries and sleep.",
            days: 1,
            tone: "arrival",
          },
          {
            label: "Work & School · week one",
            mapLabel: "Week one",
            dates: "Nov 29–Dec 3",
            detail: "Protected commitments with flexible local outings.",
            days: 5,
            tone: "work",
            highlights: [
              {
                title: "Lakefront + Outlet Track",
                timing: "Default local outing",
                description:
                  "Walk or cycle from the base with no destination pressure and adjust the distance to conditions.",
                url: "https://www.wanaka.co.nz/explore/outlet-track/",
              },
              {
                title: "Mount Iron",
                timing: "Compact local hike",
                description:
                  "Use the local loop when wind, heat and family energy make a substantial walk sensible.",
                url: "https://www.doc.govt.nz/parks-and-recreation/places-to-go/otago/places/wanaka-area/things-to-do/mount-iron-track/",
              },
              {
                title: "Wānaka Library",
                timing: "School reset or wet day",
                description:
                  "Use the library as practical working-base infrastructure for reading, study and a change of scene.",
                url: "https://qldclibraries.govt.nz/library-locations/wanaka-library/",
              },
              {
                title: "Wānaka Pool",
                timing: "Cold, windy or recovery option",
                description:
                  "Use the community pool when open-water conditions or family energy rule out a lake outing.",
                url: "https://www.qldc.govt.nz/recreation/wanaka-recreation-centre/wanaka-recreation-centre-pool",
              },
            ],
          },
          {
            label: "Local weekend",
            mapLabel: "Weekend",
            dates: "Dec 4–5",
            detail: "One larger outing and one recovery day.",
            days: 2,
            tone: "family",
            featureLink: {
              title: "See local weekend plan",
              href: "#wanaka-local-weekend",
            },
          },
          {
            label: "Work & School · three days",
            mapLabel: "Three days",
            dates: "Dec 6–8",
            detail: "Protected commitments; keep optional plans nearby.",
            days: 3,
            tone: "work",
            highlights: [
              {
                title: "Puzzling World",
                timing: "Rain or high-wind option",
                description:
                  "Use the maze and illusion rooms as a playful indoor family outing close to town.",
                url: "https://www.puzzlingworld.co.nz/",
              },
              {
                title: "Paddle close to shore",
                timing: "Settled-weather option",
                description:
                  "Use realistic cold-water expectations and current local boating-safety guidance.",
                url: "https://www.qldc.govt.nz/recreation/lakes-and-boating/boat-safety",
              },
            ],
          },
          {
            label: "Mini-vacation",
            mapLabel: "Mini-vac",
            dates: "Dec 9–12",
            detail: "Two leave days plus the weekend; follow the forecast.",
            days: 4,
            tone: "vacation",
            featureLink: {
              title: "See mini-vacation plan",
              href: "#wanaka-mini-vacation",
            },
          },
          {
            label: "Work & School · final week",
            mapLabel: "Final week",
            dates: "Dec 13–17",
            detail: "Protected commitments and gradual packing for home.",
            days: 5,
            tone: "work",
            highlights: [
              {
                title: "Diamond Lake + Rocky Mountain",
                timing: "Longer local outing",
                description:
                  "Choose the lower or fuller route according to daylight, track conditions and family energy.",
                url: "https://www.doc.govt.nz/parks-and-recreation/places-to-go/otago/places/diamond-lake-and-hospital-flat/things-to-do/rocky-mountain-track/",
              },
            ],
          },
        ],
        basePanel: {
          id: "work-rhythm",
          eyebrow: "Three-week base",
          title: "Work & School from Wānaka",
          headerNote: "US Eastern → 3–11 a.m. local",
          description:
            "The long stay supports normal professional and academic commitments while late-spring daylight and a single stable home keep local New Zealand experiences practical.",
          items: [
            "Alpine systems — Study glaciation, geology, watersheds and the Southern Alps through local landscapes.",
            "Conservation — Examine native birds, invasive species and New Zealand’s protected-land model.",
            "Kāi Tahu context — Use Māori place names and regional history as part of understanding the landscape.",
            "Mountain judgment — Treat forecasts, UV, cold water, river crossings and track conditions as real learning.",
          ],
        },
        stayTitle: wanaka.base.recommendation,
        stayDescription:
          "This keeps the lakefront and town practical on foot or bike while offering a better chance of a family house and separate closed-door workspace. Albert Town is the value fallback if its property is materially better.",
        stayChecks: [
          "Three bedrooms or two bedrooms plus a genuinely separate office",
          "A closed-door workspace separated from sleeping and school areas",
          "Verified fibre or high-quality fixed broadband and strong mobile backup",
          "Heating, laundry, full kitchen and blackout curtains",
          "Parking and secure bicycle storage",
          "Flexible cancellation around the long-haul flight connection",
        ],
        featurePlans: [
          {
            id: "wanaka-local-weekend",
            eyebrow: "December 4–5 · dedicated trip",
            title: "Local Wānaka weekend",
            description:
              "Use one larger outing and one recovery day. Rob Roy Glacier Track leads only when the access road, fords, track and alpine forecast all cooperate.",
            items: [
              "Choose Rob Roy as the primary full-day plan only after checking access and conditions.",
              "Use Diamond Lake, Rocky Mountain or a lake day as the honest fallback.",
              "Keep the second day slower rather than stacking two demanding alpine outings.",
            ],
            links: [
              {
                title: "Rob Roy Glacier Track",
                url: "https://www.doc.govt.nz/parks-and-recreation/places-to-go/otago/places/mount-aspiring-national-park/things-to-do/tracks/rob-roy-track/",
              },
              {
                title: "Diamond Lake and Rocky Mountain",
                url: "https://www.doc.govt.nz/parks-and-recreation/places-to-go/otago/places/diamond-lake-and-hospital-flat/things-to-do/rocky-mountain-track/",
              },
            ],
          },
          {
            id: "wanaka-mini-vacation",
            eyebrow: "December 9–12 · two vacation weekdays",
            title: "Forecast-led four-day mini-vacation",
            description: `${wanaka.miniVacation.recommendation} ${wanaka.miniVacation.pushback}`,
            items: wanaka.miniVacation.rankedOptions.map(
              (option) =>
                `${option.rank}. ${option.title}: ${option.tradeoff}`,
            ),
            links: [
              {
                title: "Department of Conservation · Wānaka area",
                url: "https://www.doc.govt.nz/parks-and-recreation/places-to-go/otago/places/wanaka-area/",
              },
              {
                title: "Aoraki / Mount Cook National Park",
                url: "https://www.doc.govt.nz/parks-and-recreation/places-to-go/canterbury/places/aoraki-mount-cook-national-park/",
              },
              {
                title: "Milford Sound",
                url: "https://www.newzealand.com/us/milford-sound/",
              },
            ],
          },
        ],
        panels: [
          {
            eyebrow: "Arrival",
            title: "Use the overnight itinerary if the schedule permits",
            description: `${wanaka.arrival.plan} ${wanaka.arrival.fallback}`,
          },
          {
            eyebrow: "Late spring",
            title: "Long evenings make the Work & School model worthwhile",
            description: `${wanaka.season.summary} ${wanaka.season.planningRange}`,
            items: [
              "Daylight lasts well into the evening, which is the main reason this base remains rewarding.",
              ...wanaka.season.notes.slice(1),
            ],
          },
        ],
        bookFirst: [
          "Twenty-night Wānaka house with a separate workspace and verified broadband",
          "Hong Kong → Auckland and Auckland → Queenstown itinerary",
          "Queenstown rental car sized for luggage and the Wānaka transfer",
          "Flexible Aoraki or Te Anau backup only if the family wants a two-night excursion",
        ],
        planningNotes: [
          "Keep major outdoor plans flexible until the short-range forecast and track conditions are clear.",
          wanaka.arrival.fallback,
        ],
        links: wanaka.links,
      }}
    />
  );
}
