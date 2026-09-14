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
          "Keeping one house for fourteen nights is what makes a credible weekday routine possible. Core work and school stay protected; local afternoons become place-based learning, while the complete middle weekend carries the remote driving.",
        workLabel: "Work & School",
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
            detail: "Core morning blocks, then flexible local learning.",
            days: 5,
            tone: "work",
            highlights: [
              {
                title: "Telegraph Station",
                activityId: "telegraph-station",
              },
              {
                title: "Olive Pink + Anzac Hill",
                activityId: "olive-pink-anzac-hill",
              },
              {
                title: "Araluen Cultural Precinct",
                activityId: "araluen-cultural-precinct",
              },
            ],
          },
          {
            label: "Red Centre weekend",
            dates: "Sep 18–19",
            detail: "Tjoritja first; adjust the second day to conditions.",
            days: 2,
            tone: "family",
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
                activityId: "alice-springs-desert-park",
              },
              {
                title: "RFDS + School of the Air",
                activityId: "rfds-school-of-the-air",
              },
              {
                title: "Ordinary Alice Springs life",
                activityId: "ordinary-alice-springs-life",
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
        stayTitle: alice.base.recommendation,
        stayDescription: alice.base.reason,
        stayChecks: alice.base.requirements,
        activities: [
          {
            id: "tjoritja-weekend",
            title: "Tjoritja / West MacDonnell Ranges",
            timing: "Complete middle weekend · Sep 18–19",
            description:
              "Use Saturday for a realistic westward line such as Simpsons Gap, Standley Chasm and one farther gorge. Choose Sunday from a second West MacDonnell focus, East MacDonnell country or a slower recovery day; do not try to collect every stop.",
            links: [alice.links[2]],
          },
          {
            id: "alice-springs-desert-park",
            title: alice.workdayAfternoons[0].title,
            timing: "Substantial half-day or lighter Work & School day",
            description: alice.workdayAfternoons[0].note,
            links: [alice.links[3]],
          },
          {
            id: "telegraph-station",
            title: alice.workdayAfternoons[1].title,
            timing: "Easy East Side afternoon",
            description: alice.workdayAfternoons[1].note,
          },
          {
            id: "rfds-school-of-the-air",
            title: "Royal Flying Doctor Service + School of the Air",
            timing: "One program-led afternoon",
            description:
              "Pair two of the clearest windows into the logistics of remote Australian life. Use published tour times rather than assuming both can be dropped into any afternoon.",
          },
          {
            id: "araluen-cultural-precinct",
            title: alice.workdayAfternoons[2].title,
            timing: "Heat, wind or recovery-day option",
            description: alice.workdayAfternoons[2].note,
          },
          {
            id: "olive-pink-anzac-hill",
            title: "Olive Pink Botanic Garden + Anzac Hill",
            timing: "Short outing or sunset",
            description:
              "Use these as flexible local ecology and orientation stops, not as substitutes for the complete outback weekend.",
          },
          {
            id: "ordinary-alice-springs-life",
            title: "Ordinary Alice Springs life",
            timing: "Leave several afternoons unbooked",
            description: alice.workdayAfternoons[5].note,
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
            id: "work-rhythm",
            eyebrow: "September 13–24",
            title: "Weekday rhythm",
            description:
              "Keep core professional work and school in a predictable morning block, then use selected afternoons for place-based learning without programming every day.",
            items: [
              "Work — Use a substantial local-morning block for deep work while the children complete core schoolwork.",
              "School — Protect reading, writing and math before treating an outing as the day's learning.",
              "Place-based learning — Use the Telegraph Station, Araluen Cultural Precinct and Olive Pink Botanic Garden as flexible school-day options.",
              "Longer learning day — Put Desert Park or the Royal Flying Doctor Service and School of the Air on a lighter day and follow their published program times.",
              "U.S. overlap — When live overlap is needed, 6–10 a.m. New York maps to approximately 7:30–11:30 p.m. in Alice Springs; do not schedule it every night.",
            ],
          },
          {
            id: "weekend",
            eyebrow: "September 18–19",
            title: "Keep the house for the Red Centre weekend",
            description: `${alice.middleWeekend.recommendation} ${alice.middleWeekend.alternative}`,
            items: alice.middleWeekend.preferredPlan,
          },
          {
            eyebrow: "Deliberate exclusion",
            title: "Uluru is a separate vacation decision",
            description: alice.uluruDecision.reason,
            items: alice.uluruDecision.revisitIf,
          },
          {
            eyebrow: "Place-based learning",
            title: "Homeschool hooks",
            items: alice.homeschool,
          },
        ],
        bookFirst: alice.bookFirst,
        planningNotes: [
          "Verify park access, road conditions and 2027 flight days before booking.",
          "Carry water on every excursion and do not improvise remote drives from a dry-weather average.",
          "Do not rely on late-night U.S. overlap every evening before driving days.",
        ],
        links: alice.links,
      }}
    />
  );
}
