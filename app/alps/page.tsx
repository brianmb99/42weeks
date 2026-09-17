import type { Metadata } from "next";
import alps from "../../data/alps.json";
import type {
  LocationFeaturePlan,
  LocationProgramLead,
} from "../../data/location-page-types";
import LocationPlanPage from "../trips/location-plan-page";

export const metadata: Metadata = {
  title: "The Alps",
  description:
    "The winter Work & School base: eighty-five nights in one Alpine town chosen by the U12 ski program, still inside a ninety-day cap.",
};

const programs = alps.programs as LocationProgramLead[];

function leadsWithStatus(status: LocationProgramLead["status"]) {
  return programs.filter((program) => program.status === status);
}

function leadItem(program: LocationProgramLead) {
  return `${program.name} · ${program.location}. ${program.currentRead} ${program.contactActivity} People: ${program.people}. Next: ${program.nextStep}`;
}

function leadLinks(group: LocationProgramLead[]) {
  return group.map((program) => ({
    title: program.name,
    url: program.url,
  }));
}

const strong = leadsWithStatus("strong option");
const featured =
  strong.find((program) => program.name.startsWith("Apex")) ?? strong[0];

if (!featured) {
  throw new Error("Alps data is missing a strong-option ski program.");
}
const otherStrong = strong.filter((program) => program.name !== featured.name);
const awaiting = leadsWithStatus("awaiting reply");
const possible = leadsWithStatus("possible");
const closed = leadsWithStatus("not a fit");

function strongPlan(
  program: LocationProgramLead,
  id: string,
): LocationFeaturePlan {
  return {
    id,
    eyebrow: `Strong option · updated ${alps.lastUpdated}`,
    title: program.name,
    description: `Allie and Charlie as U12 racers during January–March 2028. ${program.location}. ${program.currentRead}`,
    items: [
      program.contactActivity,
      `People: ${program.people}.`,
      `Next: ${program.nextStep}`,
    ],
    links: leadLinks([program]),
  };
}

function programAnchor(program: LocationProgramLead) {
  if (program.name.toLowerCase().includes("silvaplana")) return "silvaplana";
  return program.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

const programPlans: LocationFeaturePlan[] = [
  strongPlan(featured, "ski-programs"),
  ...otherStrong.map((program) => strongPlan(program, programAnchor(program))),
  {
    id: "awaiting-reply",
    eyebrow: "Awaiting reply",
    title: "Val d'Isère and Verbier clubs",
    description:
      "These are live U12 contacts that have not yet produced a placement. They can still choose the town; they are not booked training.",
    items: awaiting.map(leadItem),
    links: leadLinks(awaiting),
  },
  {
    id: "possible-programs",
    eyebrow: "Possible",
    title: "Crans-Montana, Anniviers and camp backups",
    description:
      "Keep these only if a continuous peer-group winter is still possible. Holiday camps are not a substitute for a race team.",
    items: possible.map(leadItem),
    links: leadLinks(possible),
  },
];

export default function AlpsPage() {
  return (
    <LocationPlanPage
      current="alps"
      source="data/alps.json"
      plan={{
        eyebrow: "Europe · winter Work & School base, town still open",
        title: "The Alps",
        dates: "Jan 7–Mar 31, 2028",
        facts: [
          "85 nights",
          "One winter Work & School base",
          "Must stay under 90 days",
        ],
        summary: alps.summary,
        photos: [
          {
            src: "/images/alps/st-moritz-winter.jpg",
            alt: "Snow-covered St. Moritz with the red Bernina railway and frozen water in the foreground",
            caption: "St. Moritz and the Engadin",
            credit: "John Seb Barber / Wikimedia Commons · CC BY 2.0",
            source:
              "https://commons.wikimedia.org/wiki/File:Winter_in_St._Moritz_DSCF3536_(9402066341).jpg",
          },
          {
            src: "/images/alps/val-disere-winter.jpg",
            alt: "Aerial view of Val d'Isère in a snow-filled high Alpine valley",
            caption: "Val d'Isère in winter",
            credit: "Mmaconta / Wikimedia Commons · CC BY-SA 4.0",
            source:
              "https://commons.wikimedia.org/wiki/File:Val_d%27Isere_vue_aerienne.jpg",
          },
          {
            src: "/images/alps/crans-montana-winter.jpg",
            alt: "Sunset light on snow with a ski tip in the foreground at Crans-Montana",
            caption: "End of a ski day in Crans-Montana",
            credit: "Tcutler581 / Wikimedia Commons · CC BY-SA 4.0",
            source: "https://commons.wikimedia.org/wiki/File:Snow_and_Sun.jpg",
          },
        ],
        rhythmTitle: "One winter, still waiting on the town",
        rhythmSummary:
          "The strip is the stay, not a resort list. Eighty-five nights in one house, under a ninety-day cap. The U12 program search below is what chooses the valley.",
        mobileRhythmLayout: "overview-cards",
        rhythm: [
          {
            label: "Arrive and set up",
            mapLabel: "Arrive",
            dates: "Jan 7–9",
            detail: "Friday landing, weekend groceries, internet and ski setup.",
            days: 3,
            tone: "arrival",
          },
          {
            label: "Work & School · January",
            mapLabel: "January",
            dates: "Jan 10–31",
            detail:
              "Protected work and school once a program is real. Allie's birthday is Tuesday, January 18.",
            days: 22,
            tone: "work",
            featureLink: {
              title: "See U12 program search",
              href: "#ski-programs",
            },
            highlights: [
              {
                title: "Apex 2100 Academy",
                timing: "Best-informed live option",
                description:
                  "January–March day-athlete training is likely if U12 does not fill. Five half-days, local French races; apply with ski video. Not an offer yet.",
                url: "https://www.apex2100.org",
              },
              {
                title: "GR Ski Racing Team Silvaplana",
                timing: "Strong Swiss option",
                description:
                  "A continuous January–March placement may work if level is appropriate, with almost-daily training and possible local races.",
                url: "https://stmoritz.gr-mountain.com/ski-club/",
              },
              {
                title: "ACM Ski Team",
                timing: "Possible if the committee agrees",
                description:
                  "They do not normally take non-season athletes. If accepted, Team International would be the pathway and trains mainly in gates.",
                url: "https://www.acm-ski-team.ch/inscription",
              },
              {
                title: "Club des Sports de Val d'Isère",
                timing: "Awaiting reply",
                description:
                  "A serious local U12 club, reached after Pascal Arpin's referral. Cold outreach has gone to Lionel Fayolle.",
                url: "https://www.valsport.org/en/ski-section/",
              },
            ],
          },
          {
            label: "Work & School · February",
            mapLabel: "February",
            dates: "Feb 1–29",
            detail:
              "The long middle: daily training, ordinary town life and protected work. If Tignes wins, budget about two and a half weeks off academy snow in February unless they join the optional Italy camp.",
            days: 29,
            tone: "work",
          },
          {
            label: "Work & School · March",
            mapLabel: "March",
            dates: "Mar 1–30",
            detail:
              "Brian's birthday is Sunday, March 12. Keep the ninety-day cap in view.",
            days: 30,
            tone: "work",
          },
          {
            label: "Pack for Copenhagen",
            mapLabel: "Pack",
            dates: "Fri, Mar 31",
            detail: "Easy final day before the Saturday handoff.",
            days: 1,
            tone: "travel",
          },
        ],
        basePanel: {
          id: "work-rhythm",
          eyebrow: "Winter base",
          title: "Work & School from the Alps",
          headerNote: "US Eastern → 3–11 p.m. local",
          description:
            "Treat professional work and academic subjects as the fixed weekday commitments. Children's ski training is the reason this base exists; it is not a substitute for school, and a famous resort is not a substitute for a real peer group.",
          items: [
            "Program first — Weekday mornings belong to a recurring U12 team once a placement is real.",
            "One mountain — Learn one valley well rather than sampling resorts on weekends.",
            "Ordinary town — Groceries, peers and a bus or lift have to work without a daily car.",
            "Closed-door work — Keep a quiet room, verified broadband and mobile backup for U.S.-hours overlap.",
          ],
        },
        stayTitle: alps.base.recommendation,
        stayDescription: alps.base.reason,
        stayChecks: alps.base.requirements,
        featurePlans: programPlans,
        panels: [
          {
            eyebrow: "January–March conditions",
            title: "Cold, snow and short daylight",
            description: `${alps.season.summary} Val d'Isère January normals are about 31°F by day, 16°F overnight and three inches of precipitation, mostly as snow.`,
            items: alps.season.notes,
          },
          {
            eyebrow: "Closed leads",
            title: "Tignes club, PDS Racing and ESS Verbier are not a fit",
            description:
              "Keep these only as background. They already answered, and the answers do not give Allie and Charlie a consistent U12 peer group for January–March.",
            items: closed.map(leadItem),
          },
        ],
        bookFirst: alps.bookFirst,
        planningNotes: alps.planningNotes,
        links: alps.links,
      }}
    />
  );
}
