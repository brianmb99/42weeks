import type { Metadata } from "next";
import alice from "../../../data/alice-springs.json";
import LocationPlanPage from "../../trips/location-plan-page";

export const metadata: Metadata = {
  title: "Alice Springs",
  description:
    "The selected two-week Alice Springs Work & School base, Red Centre weekend and practical family plan.",
};

export default function AliceSpringsPage() {
  return (
    <LocationPlanPage
      current="australia"
      australiaCurrent="alice-springs"
      source="data/alice-springs.json"
      plan={{
        eyebrow: "Red Centre · selected outback base",
        title: "Alice Springs",
        dates: "Sep 12–25, 2027",
        facts: [
          "14 nights",
          "Two full Work & School weeks",
          "Complete outback weekend",
        ],
        summary: alice.summary,
        photos: [
          {
            src: "/images/outback/aerial-road.jpg",
            alt: "Aerial view of a red dirt road crossing the Australian Outback",
            caption: "The scale of the Australian Outback",
            credit: "Mark Direen / Pexels",
            source:
              "https://www.pexels.com/photo/aerial-view-of-the-rugged-australian-outback-32915492/",
          },
          {
            src: "/images/outback/red-shed.jpg",
            alt: "Remote red shed in a vast dry Australian landscape",
            caption: "Big sky and working landscape",
            credit: "Francesco Ungaro / Pexels",
            source:
              "https://www.pexels.com/photo/dirt-road-through-the-outback-in-australia-20534219/",
          },
          {
            src: "/images/outback/red-earth.jpg",
            alt: "Red soil and sparse vegetation beneath a blue Outback sky",
            caption: "Red earth, scrub and open sky",
            credit: "Mark Direen / Pexels",
            source:
              "https://www.pexels.com/photo/vast-australian-outback-landscape-under-blue-sky-32915389/",
          },
        ],
        rhythmTitle: "Two Work & School weeks, one real outback weekend",
        rhythmSummary:
          "Keeping one house for fourteen nights is what makes a credible weekday routine possible. Core work and school stay protected; short local outings become place-based learning, while the complete middle weekend carries the remote driving.",
        rhythm: [
          {
            label: "Arrive and set up",
            dates: "Sun, Sep 12",
            detail: "Flight, car, groceries, internet and work rooms.",
            days: 1,
            tone: "arrival",
          },
          {
            label: "Work & School · week one",
            dates: "Sep 13–17",
            detail: "Protected work and school, with flexible local learning.",
            days: 5,
            tone: "work",
            highlights: [
              {
                title: "Alice Springs Telegraph Station",
                timing: "Easy local half-day",
                description:
                  "Close to East Side and useful for telegraph history, museum interpretation and nearby trails.",
                url: "https://alicespringstelegraphstation.com.au/plan-your-visit/",
              },
              {
                title: "Olive Pink Botanic Garden",
                timing: "Short ecology outing",
                description:
                  "Use a self-guided walk to study Central Australian plants without consuming the whole afternoon.",
                url: "https://opbg.com.au/visit/",
              },
              {
                title: "Araluen Cultural Precinct",
                timing: "Heat, wind or recovery-day option",
                description:
                  "Use the galleries and cultural collections when an indoor, lower-energy school-day outing is useful.",
                url: "https://araluenartscentre.nt.gov.au/more/araluen-cultural-precinct",
              },
              {
                title: "Anzac Hill",
                timing: "Short sunset outing",
                description:
                  "Use the lookout for town orientation and interpretive context rather than treating it as a major excursion.",
                url: "https://northernterritory.com/alice-springs-and-surrounds/see-and-do/anzac-hill-memorial",
              },
            ],
          },
          {
            label: "Red Centre weekend",
            dates: "Sep 18–19",
            detail: "Tjoritja first; adjust the second day to conditions.",
            days: 2,
            tone: "family",
            featureLink: {
              title: "See weekend plan",
              href: "#red-centre-weekend",
            },
          },
          {
            label: "Work & School · week two",
            dates: "Sep 20–24",
            detail: "Return to the routine and fill the local gaps.",
            days: 5,
            tone: "work",
            highlights: [
              {
                title: "Alice Springs Desert Park",
                timing: "Lighter Work & School day",
                description:
                  "Allow a substantial half-day and choose programs deliberately instead of squeezing the park into a spare hour.",
                url: "https://alicespringsdesertpark.com.au/",
              },
              {
                title: "Royal Flying Doctor Service",
                timing: "Program-led afternoon",
                description:
                  "Use the museum to understand how medical care reaches isolated communities across the outback.",
                url: "https://www.rfdsalicesprings.com.au/",
              },
              {
                title: "School of the Air",
                timing: "Weekday learning visit",
                description:
                  "Connect the family’s own remote schooling with how education works across enormous outback distances.",
                url: "https://www.schooloftheair.net.au/the-experience/",
              },
            ],
          },
          {
            label: "Pack locally",
            dates: "Sat, Sep 25",
            detail: "Easy final day before Sunday travel.",
            days: 1,
            tone: "family",
          },
        ],
        basePanel: {
          id: "work-rhythm",
          eyebrow: "Weekday base",
          title: "Work & School from Alice Springs",
          headerNote: "US Eastern → 10:30 p.m.–6:30 a.m. local",
          description:
            "Treat professional work and academic subjects as the fixed weekday commitments. The linked activities are optional place-based learning, not a requirement to program every day.",
          items: [
            "Core rhythm — Complete deep work, reading, writing and math before treating an outing as the day's learning.",
            "Culture and history — Use Telegraph Station and Araluen to examine telegraphy, settlement and Central Australian art with appropriate Arrernte context.",
            "Remote systems — Connect the Royal Flying Doctor Service and School of the Air to medicine, education and distance.",
            "Desert lens — Study ecology, water, geology and adaptation at Desert Park and Olive Pink Botanic Garden.",
          ],
        },
        stayTitle: alice.base.recommendation,
        stayDescription: alice.base.reason,
        stayChecks: alice.base.requirements,
        featurePlans: [
          {
            id: "red-centre-weekend",
            eyebrow: "September 18–19 · dedicated trip",
            title: "Red Centre weekend",
            description: `${alice.middleWeekend.recommendation} ${alice.middleWeekend.alternative}`,
            items: alice.middleWeekend.preferredPlan,
            links: [alice.links[2]],
          },
        ],
        panels: [
          {
            eyebrow: "September conditions",
            title: "Warm dry days, cool desert nights",
            description: `${alice.season.summary} Historical means are approximately 82°F by day, 51°F overnight and one-third of an inch of rain for the month.`,
            items: alice.season.notes,
          },
          {
            eyebrow: "Deliberate exclusion",
            title: "Uluru is a separate vacation decision",
            description: alice.uluruDecision.reason,
            items: alice.uluruDecision.revisitIf,
          },
        ],
        bookFirst: alice.bookFirst,
        planningNotes: [
          "Verify park access, road conditions and 2027 flight days before booking.",
          "Carry water on every excursion and do not improvise remote drives from a dry-weather average.",
        ],
        links: alice.links,
      }}
    />
  );
}
