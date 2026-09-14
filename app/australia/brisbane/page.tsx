import type { Metadata } from "next";
import queensland from "../../../data/queensland.json";
import LocationPlanPage from "../../trips/location-plan-page";

const brisbane = queensland.brisbane;

export const metadata: Metadata = {
  title: "Brisbane",
  description:
    "The selected six-night Brisbane work, recovery, laundry and India repacking base.",
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
          "Full Monday–Friday output",
          "Weekend departure",
        ],
        summary: brisbane.summary,
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
            dates: "Sun, Oct 17",
            detail: "Proserpine flight, groceries and full workspace test.",
            days: 1,
            tone: "arrival",
          },
          {
            label: "Full work week",
            dates: "Oct 18–22",
            detail: "Work and school first; pack gradually; easy afternoons.",
            days: 5,
            tone: "work",
          },
          {
            label: "Begin India trip",
            dates: "Sat, Oct 23",
            detail: "Protected weekend itinerary; arrive Sunday.",
            days: 1,
            tone: "travel",
          },
        ],
        stayTitle: brisbane.base.recommendation,
        stayDescription: brisbane.base.reason,
        stayChecks: brisbane.base.requirements,
        activities: [
          {
            title: "New Farm Park + riverwalk",
            timing: "Default after-work outing",
            description:
              "Walk straight from a New Farm base into open space and along the river. It is the right scale for a tired afternoon and does not create another logistics project.",
            links: [brisbane.links[0]],
          },
          {
            title: "CityCat + South Bank",
            timing: "One longer afternoon or evening",
            description:
              "Use the ferry as both transportation and the city experience, then choose the riverfront, parklands, dinner or a swim at South Bank according to energy.",
            links: [brisbane.links[2]],
          },
          {
            title: "Queensland Museum or GOMA",
            timing: "Storm, heat or recovery-day option",
            description:
              "Keep one indoor cultural option ready, but do not prebook a dense museum program during the week whose primary purpose is work and reset.",
          },
          {
            title: "West End",
            timing: "One neighborhood dinner",
            description:
              "Use West End for food, a market if timing happens to align, or a change of neighborhood. It is an alternative base, not a daily cross-city obligation.",
            links: [brisbane.links[1]],
          },
          {
            title: "Laundry, pool and packing",
            timing: "Several deliberately unprogrammed afternoons",
            description:
              "These are core activities here. Pack for India during the week, recover from the kayak expedition, and avoid manufacturing sightseeing because Brisbane appears on the route.",
          },
        ],
        panels: [
          {
            id: "work-rhythm",
            eyebrow: "October 18–22",
            title: "Protect full work and homeschool output",
            description:
              "This week is the dependable output block after the reef and sea-kayak trip. Optional city time stays low-friction and secondary.",
            items: [
              "Use the same serious local-morning work block every weekday.",
              "Keep a second stable surface for homeschool rather than improvising around the apartment.",
              "Pack and do laundry incrementally so Friday remains a normal workday.",
            ],
          },
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
            eyebrow: "Place-based learning",
            title: "Homeschool hooks",
            items: brisbane.homeschool,
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
