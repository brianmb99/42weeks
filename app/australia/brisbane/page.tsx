import type { Metadata } from "next";
import queensland from "../../../data/queensland.json";
import LocationPlanPage from "../../trips/location-plan-page";

const brisbane = queensland.brisbane;

export const metadata: Metadata = {
  title: "Brisbane",
  description:
    "The selected six-night Brisbane Work & School, recovery and India repacking base.",
};

export default function BrisbanePage() {
  return (
    <LocationPlanPage
      current="australia"
      australiaCurrent="brisbane"
      source="data/queensland.json"
      plan={{
        eyebrow: brisbane.eyebrow,
        title: "Brisbane",
        dates: "Oct 17–22, 2027",
        facts: [
          "6 nights",
          "Full Work & School week",
          "Weekend departure",
        ],
        summary:
          "Use Brisbane as a dependable final Australian Work & School base after the Whitsundays. This is not another sightseeing sprint: the priorities are stable commitments, laundry, recovery and deliberate packing for India.",
        photos: [
          {
            src: "/images/australia/brisbane-skyline.jpg",
            alt: "Brisbane skyline and Story Bridge above the Brisbane River",
            caption: "Brisbane and the Story Bridge",
            credit: "Kgbo / Wikimedia Commons · CC BY-SA 3.0",
            source:
              "https://commons.wikimedia.org/wiki/File:Story_Bridge,_Brisbane_CBD_Skyline_July_2014._01.JPG",
          },
          {
            src: "/images/australia/brisbane-citycat.jpg",
            alt: "A CityCat ferry at New Farm on the Brisbane River",
            caption: "CityCat from New Farm",
            credit: "John Robert McPherson / Wikimedia Commons · CC BY-SA 4.0",
            source:
              "https://commons.wikimedia.org/wiki/File:New_Farm_ferry_terminal_and_CityCat_Kuluwin_Brunswick_St_New_Farm_P1000280.jpg",
          },
          {
            src: "/images/australia/brisbane-new-farm.jpg",
            alt: "Paths through New Farm Park leading toward the ferry terminal",
            caption: "New Farm Park",
            credit: "John Robert McPherson / Wikimedia Commons · CC BY-SA 4.0",
            source:
              "https://commons.wikimedia.org/wiki/File:New_Farm_Ferry_Terminal_access_paths_New_Farm_Park_New_Farm_P1260769.jpg",
          },
        ],
        rhythmTitle: "A deliberately uneventful handoff week",
        rhythmSummary:
          "Brisbane earns its place by restoring dependable output and absorbing laundry, recovery and packing. City time should fit around that job, not turn this into a final Australian sprint.",
        rhythm: [
          {
            label: "Fly and establish",
            mapLabel: "Arrive",
            dates: "Sun, Oct 17",
            detail: "Proserpine flight, groceries and full workspace test.",
            days: 1,
            tone: "arrival",
          },
          {
            label: "Work & School week",
            mapLabel: "Week",
            dates: "Oct 18–22",
            detail: "Protected commitments, gradual packing and easy outings.",
            days: 5,
            tone: "work",
            highlights: [
              {
                title: "New Farm Park",
                timing: "Lowest-friction local outing",
                description:
                  "Use nearby green space and river paths without creating another logistics project.",
                url: "https://visit.brisbane.qld.au/things-to-do/inner-city/natural-attractions/new-farm-park-9442",
              },
              {
                title: "CityCat",
                timing: "River transport and city experience",
                description:
                  "Use the ferry for an easy introduction to Brisbane’s river geography and neighborhoods.",
                url: "https://www.brisbane.qld.gov.au/transport-and-parking/public-transport/citycats-and-ferries",
              },
              {
                title: "South Bank Parklands",
                timing: "Longer local outing",
                description:
                  "Choose the riverfront, parklands, dinner or a swim according to weather and energy.",
                url: "https://visit.brisbane.qld.au/things-to-do/inner-city/arts-and-culture/south-bank-parklands-1ff5",
              },
              {
                title: "Queensland Museum",
                timing: "Storm, heat or recovery option",
                description:
                  "Keep one strong indoor learning option ready without prebooking a dense museum day.",
                url: "https://www.museum.qld.gov.au/kurilpa/plan-your-visit/",
              },
            ],
          },
          {
            label: "Begin India trip",
            mapLabel: "India",
            dates: "Sat, Oct 23",
            detail: "Protected weekend itinerary; arrive Sunday.",
            days: 1,
            tone: "travel",
          },
        ],
        basePanel: {
          id: "work-rhythm",
          eyebrow: "Reset week",
          title: "Work & School from Brisbane",
          headerNote: "US Eastern → 11 p.m.–7 a.m. local",
          description:
            "Use Brisbane as the dependable output and recovery base after the Whitsundays. Optional city time remains low-friction and secondary.",
          items: [
            "Stable setup — Keep separate professional and school surfaces with verified internet and mobile backup.",
            "River city — Use CityCat and South Bank to examine transport, flooding and city design around the Brisbane River.",
            "Subtropical capital — Compare Brisbane with the coast, reef and inland Australia already visited.",
            "Transition skills — Use packing, laundry, budgeting and route mapping as practical preparation for India.",
          ],
        },
        stayTitle: brisbane.base.recommendation,
        stayDescription: brisbane.base.reason,
        stayChecks: brisbane.base.requirements,
        panels: [
          {
            eyebrow: "October conditions",
            title: "Warm, mostly pleasant, with storm risk building",
            items: [
              brisbane.cautions[0],
              "Choose a property with air conditioning and a nearby indoor fallback.",
              "Keep the India packing system inside the apartment, not spread across multiple day trips.",
            ],
          },
          {
            eyebrow: brisbane.departure.date,
            title: brisbane.departure.title,
            items: brisbane.departure.items,
          },
        ],
        bookFirst: brisbane.bookFirst,
        planningNotes: brisbane.cautions,
        links: brisbane.links,
      }}
    />
  );
}
