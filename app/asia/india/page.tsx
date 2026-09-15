import type { Metadata } from "next";
import india from "../../../data/india.json";
import LocationPlanPage from "../../trips/location-plan-page";

export const metadata: Metadata = {
  title: "India",
  description:
    "The selected three-week India plan: Dehradun family Diwali and Work & School, a Delhi–Agra–Jaipur vacation, then a Bangalore Work & School week.",
};

export default function IndiaPage() {
  return (
    <LocationPlanPage
      current="asia"
      asiaCurrent="india"
      source="data/india.json"
      plan={{
        eyebrow: "Asia · family base, then a bounded vacation",
        title: "India",
        dates: "Oct 24–Nov 13, 2027",
        facts: [
          "21 nights",
          "Dehradun family week",
          "Golden Triangle vacation",
          "Bangalore Work & School week",
        ],
        summary: india.summary,
        photos: [
          {
            src: "/images/asia/dehradun-forest-research-institute.jpg",
            alt: "The Forest Research Institute building and lawns in Dehradun",
            caption: "Forest Research Institute, Dehradun",
            credit: "Sneha G Gupta / Wikimedia Commons · CC BY-SA 4.0",
            source:
              "https://commons.wikimedia.org/wiki/File:Forest_research_institute,_Dehra_dun.jpg",
          },
          {
            src: "/images/asia/agra-taj-mahal.jpg",
            alt: "The Taj Mahal and its reflecting pool in Agra",
            caption: "Taj Mahal, Agra",
            credit: "Dhirad / Wikimedia Commons · CC BY-SA 3.0",
            source:
              "https://commons.wikimedia.org/wiki/File:Taj_Mahal_in_March_2004.jpg",
          },
          {
            src: "/images/asia/bangalore-vidhana-soudha.jpg",
            alt: "Vidhana Soudha, the Karnataka legislature building in Bangalore",
            caption: "Vidhana Soudha, Bangalore",
            credit: "AjayTorvi / Wikimedia Commons · CC BY-SA 4.0",
            source:
              "https://commons.wikimedia.org/wiki/File:Vidhan_Soudha_-_Bangalore.jpg",
          },
        ],
        rhythmTitle: "Family week, vacation week, Bangalore week",
        rhythmSummary:
          "Keep Dehradun through Diwali, spend one week on a bounded north-India vacation, then run a full Work & School week from Bangalore. The shape only works if the Golden Triangle stays three cities and Bangalore stays a base rather than more tourism.",
        mobileRhythmLayout: "overview-cards",
        rhythm: [
          {
            label: "Arrive Dehradun",
            mapLabel: "Arrive",
            dates: "Sun, Oct 24",
            detail: "Onward from Delhi, family house, groceries, internet and work rooms.",
            days: 1,
            tone: "arrival",
          },
          {
            label: "Work & School · Dehradun",
            mapLabel: "Dehradun",
            dates: "Oct 25–28",
            detail: "Protected work and school around Kate's birthday on Tuesday.",
            days: 4,
            tone: "work",
            highlights: [
              {
                title: "Forest Research Institute",
                timing: "Half-day campus and museums",
                description:
                  "Use the colonial campus and forestry museums as place-based science without leaving Dehradun.",
                url: "https://fri.icfre.gov.in/",
              },
              {
                title: "Mindrolling Monastery",
                timing: "Quiet afternoon in Clement Town",
                description:
                  "Visit the Tibetan Buddhist campus as a local cultural outing, not a mountain day.",
                url: "https://www.mindrolling.org/",
              },
              {
                title: "Robber's Cave",
                timing: "Cool-weather half-day",
                description:
                  "A short drive for a river cave walk when the family wants an outdoor Dehradun outing.",
                url: "https://nndehradun.uk.gov.in/places-centres/guchhupani/",
              },
            ],
          },
          {
            label: "Diwali with family",
            mapLabel: "Diwali",
            dates: "Oct 29–31",
            detail: "Lakshmi Puja Friday; remain with family through Sunday.",
            days: 3,
            tone: "family",
            featureLink: {
              title: "See Diwali plan",
              href: "#diwali",
            },
          },
          {
            label: "Delhi, Agra and Jaipur",
            mapLabel: "Vacation",
            dates: "Nov 1–7",
            detail: "Bounded Golden Triangle; Taj on Thursday because Friday is closed.",
            days: 7,
            tone: "vacation",
            featureLink: {
              title: "See vacation plan",
              href: "#golden-triangle",
            },
          },
          {
            label: "Work & School · Bangalore",
            mapLabel: "Bangalore",
            dates: "Nov 8–12",
            detail: "Full week from one apartment before the Hong Kong handoff.",
            days: 5,
            tone: "work",
            highlights: [
              {
                title: "Cubbon Park",
                timing: "School break or late afternoon",
                description:
                  "Use the central park as ordinary Bangalore life next to the museums and Vidhana Soudha.",
                url: "https://bengaluruurban.nic.in/en/tourist-place/cubbon-park/",
              },
              {
                title: "Visvesvaraya Industrial and Technological Museum",
                timing: "Indoor school-day outing",
                description:
                  "A substantial science museum beside Cubbon Park when the family wants a learning afternoon.",
                url: "https://www.vismuseum.gov.in/",
              },
              {
                title: "Lalbagh Botanical Garden",
                timing: "Forecast-led outdoor outing",
                description:
                  "Keep this for a drier Bangalore afternoon rather than pairing it with another major stop.",
                url: "https://karnatakatourism.org/en/attractions/lalbagh-botanical-garden",
              },
              {
                title: "National Gallery of Modern Art",
                timing: "Lower-energy indoor option",
                description:
                  "Use the Bangalore gallery when rain or a recovery day makes a park outing a poor fit.",
                url: "https://ngmaindia.gov.in/ngma_bangaluru.asp",
              },
            ],
          },
          {
            label: "Pack for Hong Kong",
            mapLabel: "Pack",
            dates: "Sat, Nov 13",
            detail: "Easy final day before the Sunday flight.",
            days: 1,
            tone: "travel",
          },
        ],
        basePanel: {
          id: "work-rhythm",
          eyebrow: "Two Work & School bases",
          title: "Work & School from Dehradun and Bangalore",
          headerNote: "US Eastern → 7:00 p.m.–2:30 a.m. local",
          description:
            "Treat professional work and academic subjects as the fixed weekday commitments in Dehradun and again in Bangalore. The Golden Triangle week is vacation. Linked activities are optional place-based learning, not a requirement to program every day.",
          items: [
            "Two bases — Only Dehradun and Bangalore need a full workspace, internet, laundry and homeschool setup.",
            "Family first — Protect Diwali and the Dehradun household rhythm before adding local outings.",
            "North-India lens — Use FRI, Mindrolling and the Mughal sites to study ecology, Buddhism and empire without turning every day into a circuit.",
            "Bangalore reset — Use Cubbon Park, VITM and Lalbagh as compact weekday ideas after the moving vacation week.",
          ],
        },
        stayTitle: india.base.recommendation,
        stayDescription: india.base.reason,
        stayChecks: india.base.requirements,
        featurePlans: [
          {
            id: "diwali",
            eyebrow: "October 29–31 · family time",
            title: "Diwali in Dehradun",
            description: india.diwali.recommendation,
            items: india.diwali.preferredPlan,
          },
          {
            id: "golden-triangle",
            eyebrow: "November 1–7 · dedicated vacation",
            title: "Delhi, Agra and Jaipur",
            description: `${india.goldenTriangle.recommendation} ${india.goldenTriangle.alternative}`,
            items: india.goldenTriangle.preferredPlan,
            links: [india.links[2], india.links[3], india.links[4]],
          },
        ],
        panels: [
          {
            eyebrow: "November conditions",
            title: "Dry north, milder Bangalore, bad Delhi air",
            description: `${india.season.summary} Historical November means are about 78°F / 53°F in Dehradun, 83°F / 55°F in Delhi and 81°F / 65°F in Bangalore, with Bangalore carrying most of the month's rain.`,
            items: india.season.notes,
          },
          {
            eyebrow: "Vacation constraint",
            title: "Do not treat post-Diwali Delhi as automatic outdoor time",
            description: india.airQuality.reason,
            items: india.airQuality.revisitIf,
          },
          {
            eyebrow: "Deliberate exclusion",
            title: "Nag Tibba is a separate decision",
            description: india.trekDecision.reason,
            items: india.trekDecision.revisitIf,
          },
        ],
        bookFirst: india.bookFirst,
        planningNotes: india.planningNotes,
        links: india.links,
      }}
    />
  );
}
