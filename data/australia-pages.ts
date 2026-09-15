import type {
  LocationFeaturePlan,
  LocationPanel,
  LocationRhythmSegment,
} from "./location-page-types";

export type AustraliaPhoto = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  source: string;
};

export type AustraliaIdea = {
  title: string;
  timing: string;
  description: string;
  links?: Array<{ title: string; url: string }>;
};

export type AustraliaCity = {
  slug: "geelong" | "melbourne" | "sydney";
  title: string;
  eyebrow: string;
  dates: string;
  facts: string[];
  summary: string;
  stayTitle: string;
  stayDescription: string;
  stayChecks: string[];
  rhythmTitle: string;
  rhythmSummary: string;
  rhythm: LocationRhythmSegment[];
  basePanel: LocationPanel;
  featurePlans?: LocationFeaturePlan[];
  photos: AustraliaPhoto[];
  ideas: AustraliaIdea[];
  planningNotes: string[];
};

export const australiaStops = [
  {
    title: "Newtown, Geelong",
    barLabel: "Geelong",
    mapLabel: "Geelong",
    dates: "Aug 30–Sep 4",
    days: 6,
    color: "#397ca6",
    mode: "Family-history Work & School week",
    description:
      "Land in Melbourne Monday, continue to Newtown the same day, live in the neighborhood, and make one MCG trip from here.",
    href: "/australia/geelong",
    image: "/images/australia/geelong-waterfront.jpg",
    alt: "Geelong waterfront and Corio Bay",
  },
  {
    title: "Great Ocean Road Loop",
    barLabel: "Great Ocean Road",
    mapLabel: "Ocean Rd",
    dates: "Sep 5–11",
    days: 7,
    color: "#5592b7",
    mode: "Vacation",
    description:
      "Seven early-spring days through the Surf Coast, Otways, Shipwreck Coast, Gariwerd and Sovereign Hill; Labor Day plus four vacation weekdays.",
    href: "/trips/great-southern-touring-route",
    image: "/images/victoria/twelve-apostles.jpg",
    alt: "The Twelve Apostles on Victoria's Great Ocean Road",
  },
  {
    title: "Alice Springs",
    barLabel: "Alice Springs",
    mapLabel: "Alice",
    dates: "Sep 12–25",
    days: 14,
    color: "#b87345",
    mode: "Two-week outback work base",
    description:
      "Live and work in the Red Centre for two weeks, using the complete middle weekend for Tjoritja and ordinary afternoons for Alice Springs.",
    href: "/australia/alice-springs",
    image: "/images/outback/aerial-road.jpg",
    alt: "A road crossing the red landscape of inland Australia",
  },
  {
    title: "Sydney",
    mapLabel: "Sydney",
    dates: "Sep 26–Oct 9",
    days: 14,
    color: "#5f91b7",
    mode: "Two-week beach work base",
    description:
      "Work from a real neighborhood near the beach, preserve a complete middle weekend, and reserve one evening for the Sydney Opera House.",
    href: "/australia/sydney",
    image: "/images/australia/sydney-opera-house.jpg",
    alt: "Sydney Opera House and Harbour Bridge from the water",
  },
  {
    title: "Whitsundays",
    barLabel: "Whitsundays",
    mapLabel: "Whitsundays",
    dates: "Oct 10–16",
    days: 7,
    color: "#4f9eb3",
    mode: "Work, reef and expedition",
    description:
      "Two dependable workdays, a dedicated Hardy Reef day and a weather-dependent three-day family sea-kayak expedition.",
    href: "/trips/hamilton-island-working-week",
    image: "/images/whitsundays/hamilton-marina.jpg",
    alt: "Hamilton Island marina and the Whitsunday Islands",
  },
  {
    title: "Brisbane",
    barLabel: "Brisbane",
    mapLabel: "Brisbane",
    dates: "Oct 17–22",
    days: 6,
    color: "#4f7fa2",
    mode: "Work and repacking base",
    description:
      "Finish Australia with one dependable work week, laundry and deliberate packing before the weekend flight to India.",
    href: "/australia/brisbane",
    image: "/images/australia/brisbane-skyline.jpg",
    alt: "Brisbane skyline and Story Bridge above the Brisbane River",
  },
] as const;

export const australiaCities: Record<AustraliaCity["slug"], AustraliaCity> = {
  geelong: {
    slug: "geelong",
    title: "Geelong",
    eyebrow: "Australia · first Work & School base and family-history stay",
    dates: "Aug 30–Sep 4, 2027",
    facts: ["6 nights", "Land Monday Aug 30", "Newtown preferred"],
    summary:
      "This is the first real Australia stay, not a gateway stop after a Melbourne rental. Land Monday, continue to Newtown the same day, protect Tuesday through Friday, and use Saturday for a wildcard MCG match or local family-history time.",
    stayTitle: "Newtown, near the Barwon River",
    stayDescription:
      "Prioritize an actual work room, strong internet, laundry and parking over waterfront views. A Newtown base puts Balyang Sanctuary and the Barwon River close by while keeping central Geelong and the Bellarine Peninsula practical.",
    stayChecks: [
      "A closed-door workspace and a second quiet homeschool surface",
      "Verified broadband, not merely a listing that says Wi-Fi",
      "Laundry and parking for the post-flight week and road-trip handoff",
      "Easy access to groceries and the Barwon River paths",
    ],
    rhythmTitle: "One ordinary week in Newtown",
    rhythmSummary:
      "Land Monday and live here long enough for family-history time to emerge around a normal week. The MCG match is one planned trip from Newtown, not a reason to rent in Melbourne.",
    rhythm: [
      {
        label: "Land and settle",
        mapLabel: "Land",
        dates: "Mon, Aug 30",
        detail: "Melbourne arrival, same-day transfer to Newtown, groceries and work setup.",
        days: 1,
        tone: "arrival",
      },
      {
        label: "Newtown Work & School week",
        mapLabel: "Week",
        dates: "Aug 31–Sep 3",
        detail: "Protected commitments with flexible family-history time.",
        days: 4,
        tone: "work",
        highlights: [
          {
            title: "Balyang Sanctuary",
            timing: "Easy neighborhood nature outing",
            description:
              "Walk the lake and Barwon River paths from Newtown for birds, ecology and ordinary local time.",
            url: "https://www.geelongcity.vic.gov.au/services/parks-and-outdoor-spaces/parks-and-reserves/balyang-sanctuary",
          },
          {
            title: "Geelong Waterfront",
            timing: "Low-effort local outing",
            description:
              "Use Eastern Beach and the waterfront when the family wants water, space and no complicated logistics.",
            url: "https://www.geelongcity.vic.gov.au/services/parks-and-outdoor-spaces/parks-and-reserves/eastern-beach-reserve",
          },
          {
            title: "Geelong Library",
            timing: "School reset or rainy day",
            description:
              "Use the Dome for reading, study space and the regional heritage collection.",
            url: "https://www.grlc.vic.gov.au/glhc",
          },
          {
            title: "Geelong Botanic Gardens",
            timing: "Flexible ecology outing",
            description:
              "Use the gardens for a compact local walk and plant study without turning it into an excursion day.",
            url: "https://app.geelongcity.vic.gov.au/gbg/",
          },
        ],
        featureLink: {
          title: "See family-history plan",
          href: "#geelong-family-history",
        },
      },
      {
        label: "Local Saturday",
        mapLabel: "Sat",
        dates: "Sat, Sep 4",
        detail: "Prefer a wildcard MCG match from Newtown; Queenscliff if no Victorian game.",
        days: 1,
        tone: "family",
        featureLink: {
          title: "See MCG plan",
          href: "#afl-at-the-mcg",
        },
      },
    ],
    basePanel: {
      id: "work-rhythm",
      eyebrow: "Weekday base",
      title: "Work & School from Geelong",
      headerNote: "US Eastern → 11 p.m.–7 a.m. local",
      description:
        "Keep professional work and academic subjects protected while leaving enough unscheduled time for remembered places and follow-up family stories.",
      items: [
        "Family history — Revisit Newtown gradually rather than compressing childhood places into one tour.",
        "Local ecology — Use Balyang Sanctuary, the Barwon River and the Botanic Gardens for place-based science.",
        "Regional history — Use the library’s heritage collection to add records and context to family memories.",
        "Port geography — Compare Corio Bay, the waterfront and Queenscliff’s relationship to Port Phillip.",
      ],
    },
    featurePlans: [
      {
        id: "geelong-family-history",
        eyebrow: "Personal anchor · keep flexible",
        title: "Newtown and Queenscliff family-history time",
        description:
          "The reason to stay in Geelong is access to specific personal places, not generic sightseeing. Keep the exact route open until family memories identify the right homes, parks, schools and follow-up stops.",
        items: [
          "Use weekday gaps for nearby Newtown places so a brief memory or question can lead to a return visit.",
          "Give Queenscliff a purposeful half-day or early evening because it connects directly to where Brian’s father worked.",
          "Do not substitute a Melbourne day trip; the value comes from having enough time for small, specific visits.",
        ],
        links: [
          {
            title: "Queenscliff visitor information",
            url: "https://www.visitgeelongbellarine.com.au/queenscliff-point-lonsdale/queenscliff",
          },
        ],
      },
      {
        id: "afl-at-the-mcg",
        eyebrow: "Fixture-led trip priority",
        title: "AFL at the MCG",
        description:
          "Buy tickets for any available men’s AFL match at the MCG. The selected plan is a wildcard or early-finals game from Newtown, likely Friday September 3 or Saturday September 4. Geelong to the MCG is about a 70-minute V/Line trip, not a second lodging move.",
        items: [
          "Use the actual 2027 fixture before locking the match date. Home-and-away concludes 30 August; wildcard finals start the first week of September; the Grand Final is Saturday 2 October and is not the objective.",
          "An MCG wildcard is likely if Victorian clubs finish 7–10, but it is not guaranteed. A Cats wildcard at GMHBA would be even better. Keep a Queenscliff or family-history Saturday if no suitable Melbourne game appears.",
          "Leaving Thursday August 26 or Friday 27 remains an option for one or two Melbourne hotel nights and a last-round game on or around August 30. That inbound is not the selected stay.",
        ],
        links: [
          {
            title: "MCG events",
            url: "https://www.mcg.org.au/events",
          },
          {
            title: "AFL fixtures",
            url: "https://www.afl.com.au/fixture",
          },
        ],
      },
    ],
    photos: [
      {
        src: "/images/australia/geelong-waterfront.jpg",
        alt: "Geelong waterfront beside Corio Bay",
        caption: "Geelong waterfront",
        credit: "DXR / Wikimedia Commons",
        source:
          "https://commons.wikimedia.org/wiki/File:Geelong_Waterfront,_east_view_20230218_1.jpg",
      },
      {
        src: "/images/australia/geelong-queenscliff-pier.jpg",
        alt: "Queenscliff Pier extending into Port Phillip Bay",
        caption: "Queenscliff evening",
        credit: "Paul Carmona / Wikimedia Commons",
        source:
          "https://commons.wikimedia.org/wiki/File:Queenscliff_Pier_(60266396).jpeg",
      },
      {
        src: "/images/australia/geelong-balyang-sanctuary.jpg",
        alt: "Lake, trees and water birds at Balyang Sanctuary in Newtown",
        caption: "Balyang Sanctuary",
        credit: "Marcus Wong / Wikimedia Commons",
        source:
          "https://commons.wikimedia.org/wiki/File:Balyang-sanctuary-geelong-lake.jpg",
      },
    ],
    ideas: [
      {
        title: "Balyang Sanctuary",
        timing: "Easy after-work nature outing",
        description:
          "Walk the lake and a piece of the Barwon River path from the Newtown base. Look for black swans, pelicans, coots, moorhens, ducks and cormorants; this should feel like normal neighborhood life, not an excursion day.",
        links: [
          {
            title: "City of Greater Geelong visitor information",
            url: "https://www.geelongcity.vic.gov.au/services/parks-and-outdoor-spaces/parks-and-reserves/balyang-sanctuary",
          },
        ],
      },
      {
        title: "Queenscliff",
        timing: "One early evening",
        description:
          "Leave as soon as work ends, walk the pier and historic center, eat near the water and return to Geelong that night. Keep the plan simple enough that it still works on a weekday.",
        links: [
          {
            title: "Visit Geelong & The Bellarine · Queenscliff",
            url: "https://www.visitgeelongbellarine.com.au/queenscliff-point-lonsdale/queenscliff",
          },
        ],
      },
      {
        title: "Waterfront and Eastern Beach",
        timing: "Low-effort local evening",
        description:
          "Use the promenade, sea baths, Cunningham Pier, carousel precinct and an uncomplicated dinner as the default evening when nobody wants another drive.",
      },
      {
        title: "Geelong Library & Heritage Centre",
        timing: "Homeschool base or rainy afternoon",
        description:
          "Use the Dome as a real public-library stop rather than just sightseeing. It has a dedicated children and youth floor, study space and the regional heritage collection, making it useful for schoolwork, reading and a change of scene.",
        links: [
          {
            title: "Geelong Regional Libraries · The Dome",
            url: "https://www.grlc.vic.gov.au/locate/geelong-library-heritage-centre-dome",
          },
        ],
      },
      {
        title: "Barwon River and local Geelong",
        timing: "Flexible afternoons",
        description:
          "Add short river walks, the Geelong Botanic Gardens, Buckley Falls or central Geelong only when work, school and jet lag leave room.",
      },
    ],
    planningNotes: [
      "Land in Melbourne Monday, August 30 and continue to Newtown the same day. Monday is landing, not a Work & School day.",
      "Leaving Thursday, August 26 or Friday 27 remains an option for one or two Melbourne hotel nights and a last-round game on or around August 30. That inbound is not the selected stay.",
      "Do not prebook every evening; family-history time needs room for remembered places and spontaneous follow-up.",
      "The selected MCG window is the wildcard weekend from Newtown, likely Friday September 3 or Saturday September 4.",
      "Choose the Great Ocean Road rental-car handoff together with the Newtown lodging.",
    ],
  },
  melbourne: {
    slug: "melbourne",
    title: "Melbourne",
    eyebrow: "Australia · optional inbound, not the selected stay",
    dates: "Aug 28–30 if leaving Thursday",
    facts: ["Optional inbound", "1–2 hotel nights", "Last-round Aug 30"],
    summary:
      "The selected plan lands Monday, August 30 and continues to Newtown the same day. Use this page only if you leave a few days earlier for one or two hotel nights and a last-round home-and-away game on or around August 30.",
    stayTitle: "A hotel near the MCG, not a rental",
    stayDescription:
      "Do not take a Melbourne apartment for this window. One or two hotel nights near Southern Cross or the MCG are enough; the Work & School base is Newtown.",
    stayChecks: [
      "Easy airport transfer and a straightforward trip to the MCG",
      "Luggage storage if the match ends close to the Geelong train",
      "A St Kilda evening plan only if energy remains after landing",
      "A same-day or next-morning move to Newtown after the match",
    ],
    rhythmTitle: "Hotel nights, then the last-round window",
    rhythmSummary:
      "This is a recovery-and-match inbound, not a Work & School launch. Keep city plans easy to cancel and continue to Newtown as soon as the match is done.",
    rhythm: [
      {
        label: "Land and recover",
        mapLabel: "Land",
        dates: "Sat, Aug 28",
        detail: "Hotel, groceries if needed, sleep. No rental setup.",
        days: 1,
        tone: "arrival",
      },
      {
        label: "Easy city day",
        mapLabel: "City",
        dates: "Sun, Aug 29",
        detail: "One loose outing if energy allows; keep the evening free.",
        days: 1,
        tone: "family",
        highlights: [
          {
            title: "St Kilda Little Penguins",
            timing: "One clear evening",
            description:
              "Use a ticketed post-sunset session and preserve the no-flash wildlife rules.",
            url: "https://www.parks.vic.gov.au/places-to-see/parks/st-kilda-pier-and-breakwater/attractions/little-penguins",
          },
          {
            title: "Laneways & Arcades",
            timing: "Flexible city walk",
            description:
              "Use one loose central route through the lanes and arcades rather than chasing a city checklist.",
            url: "https://whatson.melbourne.vic.gov.au/things-to-do/walks/arcades-and-lanes",
          },
          {
            title: "NGV International",
            timing: "Weather-dependent cultural stop",
            description:
              "Choose a focused gallery visit when an indoor, low-logistics outing suits the day.",
            url: "https://www.ngv.vic.gov.au/plan-your-visit/visitor-guide-ngv-international/",
          },
          {
            title: "Royal Botanic Gardens",
            timing: "Calmer recovery outing",
            description:
              "Use the gardens and Shrine precinct for open space close to central Melbourne.",
            url: "https://www.rbg.vic.gov.au/melbourne-gardens/",
          },
        ],
      },
      {
        label: "Last-round / Newtown",
        mapLabel: "MCG",
        dates: "Mon, Aug 30",
        detail: "Use the fixture first, then continue to Newtown.",
        days: 1,
        tone: "family",
        featureLink: {
          title: "See last-round MCG plan",
          href: "#afl-at-the-mcg",
        },
      },
    ],
    basePanel: {
      id: "inbound-window",
      eyebrow: "Optional inbound",
      title: "Hotel nights before Newtown",
      description:
        "Take this window only if a last-round game on or around August 30 is worth leaving New Hampshire a few days early. The selected stay still begins in Newtown.",
      items: [
        "Timing — Leave Thursday, August 26 or Friday 27 so Saturday landing is not the match day.",
        "Lodging — Hotel nights only; do not rent a Melbourne work base for two days.",
        "Match day — August 30 is a Monday in 2027. Confirm whether last-round includes that date or the preceding weekend.",
        "Handoff — Continue to Newtown after the match so the family-history week still starts on time.",
      ],
    },
    featurePlans: [
      {
        id: "afl-at-the-mcg",
        eyebrow: "Optional last-round window",
        title: "AFL at the MCG",
        description:
          "This page exists for a last-round home-and-away match on or around August 30. The selected AFL plan is a wildcard or early-finals MCG game from Newtown the following weekend. Do not organize the trip around Grand Final access.",
        items: [
          "The AFL has the 2027 home-and-away season concluding 30 August; the exact fixture is unpublished.",
          "Choose seats and transit for a family match-day experience, not merely the cheapest entry.",
          "If no suitable last-round MCG match appears, keep the selected Saturday, August 28 departure and go straight to Newtown.",
        ],
        links: [
          {
            title: "MCG events",
            url: "https://www.mcg.org.au/events",
          },
          {
            title: "AFL fixtures",
            url: "https://www.afl.com.au/fixture",
          },
        ],
      },
    ],
    photos: [
      {
        src: "/images/australia/melbourne-skyline.jpg",
        alt: "Melbourne skyline beside the Yarra River",
        caption: "Melbourne from Southbank",
        credit: "Caroline Jones / Wikimedia Commons",
        source:
          "https://commons.wikimedia.org/wiki/File:Melbourne_skyline_from_South_Bank_(24093068545).jpg",
      },
      {
        src: "/images/australia/melbourne-little-penguin.jpg",
        alt: "A Little Penguin on the rocks at St Kilda Breakwater",
        caption: "Little Penguin at St Kilda",
        credit: "Mikeybear / Wikimedia Commons",
        source:
          "https://commons.wikimedia.org/wiki/File:20091121_Little_Penguin_on_rock_at_St_Kilda_Breakwater_(left_side_view).jpg",
      },
      {
        src: "/images/australia/melbourne-afl-mcg.jpg",
        alt: "Australian rules football players fly for a mark during the 2005 AFL Grand Final at the MCG",
        caption: "AFL at the MCG",
        credit: "Jimmy Harris / Wikimedia Commons · CC BY 2.0",
        source:
          "https://commons.wikimedia.org/wiki/File:Players_fly_for_the_mark,_2005_AFL_Grand_Final.jpg",
      },
    ],
    ideas: [
      {
        title: "AFL at the MCG",
        timing: "Optional last-round · on or around Aug 30",
        description:
          "Use this inbound only if a last-round home-and-away match is worth leaving a few days early. The selected AFL plan is a wildcard or early-finals game from Newtown.",
        links: [
          {
            title: "AFL fixtures",
            url: "https://www.afl.com.au/fixture",
          },
          {
            title: "MCG events",
            url: "https://www.mcg.org.au/whats-on/events-calendar",
          },
        ],
      },
      {
        title: "Little Penguins at St Kilda Pier",
        timing: "One clear evening",
        description:
          "Book one of the free, ticketed evening sessions when August 2027 reservations open. The penguins return after sunset; build in the tram ride, dinner and the no-flash wildlife rules.",
        links: [
          {
            title: "Parks Victoria · Little Penguins",
            url: "https://www.parks.vic.gov.au/places-to-see/parks/st-kilda-pier-and-breakwater/attractions/little-penguins",
          },
        ],
      },
      {
        title: "Laneways, arcades and the river",
        timing: "Flexible afternoon",
        description:
          "Use a loose walking line through the central laneways and arcades, Federation Square, the Yarra and Southbank. Stop when the family has had enough city rather than chasing a checklist.",
      },
      {
        title: "Choose one cultural anchor",
        timing: "Weather-dependent afternoon",
        description:
          "Pick the National Gallery of Victoria, Melbourne Museum or Queen Victoria Market according to the weather and current exhibitions.",
      },
      {
        title: "Royal Botanic Gardens",
        timing: "Recovery-day option",
        description:
          "Use the gardens and Shrine precinct as the calmer Sunday option before the match and the move to Newtown.",
      },
    ],
    planningNotes: [
      "This page is not the selected Australia opening. The live route lands Monday, August 30 and continues to Newtown.",
      "Leave Thursday, August 26 or Friday 27 only if a last-round game on or around August 30 is worth the weekday departure.",
      "The St Kilda penguin sessions are free but ticketed and capacity-limited.",
    ],
  },
  sydney: {
    slug: "sydney",
    title: "Sydney",
    eyebrow: "Australia · two-week beach Work & School base",
    dates: "Sep 26–Oct 9, 2027",
    facts: ["14 nights", "Two Work & School weeks", "Complete middle weekend"],
    summary:
      "Sydney should feel different from Melbourne: live beside the water, protect two normal Work & School weeks, use the beach almost every day, and reserve the complete October 2–3 weekend for the harbour, coast or a major cultural experience.",
    stayTitle: "Shortlist Manly first, Coogee second",
    stayDescription:
      "Manly offers the clearest beach-at-the-door version and a memorable harbour ferry into the city. Coogee offers a calmer eastern-suburbs neighborhood and immediate access to ocean pools and the coastal walk. Do not default to the CBD if the goal is to live near a beach.",
    stayChecks: [
      "No more than a few minutes' walk to a swimmable beach",
      "A real work room, excellent internet and quiet weekday mornings",
      "Groceries, casual food and outdoor space usable without a car",
      "A credible evening return after the Sydney Opera House",
    ],
    rhythmTitle: "Two real Work & School weeks beside the water",
    rhythmSummary:
      "The long stay makes ordinary beach outings possible and preserves one complete weekend without another lodging move.",
    rhythm: [
      {
        label: "Arrive and settle",
        mapLabel: "Arrive",
        dates: "Sun, Sep 26",
        detail: "Alice Springs flight, groceries and beach orientation.",
        days: 1,
        tone: "arrival",
      },
      {
        label: "Work & School · week one",
        mapLabel: "Week one",
        dates: "Sep 27–Oct 1",
        detail: "Protected commitments with easy access to the water.",
        days: 5,
        tone: "work",
        highlights: [
          {
            title: "Manly Beach",
            timing: "Low-friction beach time",
            description:
              "Use the beach as ordinary neighborhood life rather than a scheduled excursion.",
            url: "https://www.northernbeaches.nsw.gov.au/things-to-do/recreation-area/manly-beach",
          },
          {
            title: "Manly Ferry",
            timing: "Harbour transport and outing",
            description:
              "Use the ferry as both practical transport and one of Sydney’s strongest harbour experiences.",
            url: "https://transportnsw.info/routes/details/sydney-ferries/f1/090F1",
          },
        ],
      },
      {
        label: "Full Sydney weekend",
        mapLabel: "Weekend",
        dates: "Oct 2–3",
        detail: "Harbour, coast, zoo or one major family plan.",
        days: 2,
        tone: "family",
        featureLink: {
          title: "See weekend plan",
          href: "#full-sydney-weekend",
        },
      },
      {
        label: "Work & School · week two",
        mapLabel: "Week two",
        dates: "Oct 4–8",
        detail: "Normal routine plus one Opera House evening.",
        days: 5,
        tone: "work",
        highlights: [
          {
            title: "Coogee Beach",
            timing: "Beach or ocean-pool outing",
            description:
              "Use Coogee for a calmer eastern-suburbs beach day with immediate coastal access.",
            url: "https://www.randwick.nsw.gov.au/facilities-and-recreation/beaches-and-coast/beaches/coogee-beach",
          },
          {
            title: "Royal Botanic Garden",
            timing: "Harbour-side ecology outing",
            description:
              "Pair a focused garden visit with Circular Quay when the city and weather align.",
            url: "https://www.botanicgardens.org.au/royal-botanic-garden-sydney/plan-your-visit",
          },
        ],
        featureLink: {
          title: "See Opera House plan",
          href: "#sydney-opera-house",
        },
      },
      {
        label: "Local Saturday",
        mapLabel: "Sat",
        dates: "Sat, Oct 9",
        detail: "Keep the last day nearby before Sunday travel.",
        days: 1,
        tone: "family",
      },
    ],
    basePanel: {
      id: "work-rhythm",
      eyebrow: "Two-week beach base",
      title: "Work & School from Sydney",
      headerNote:
        "US Eastern → 11 p.m.–7 a.m. local; midnight–8 a.m. from Oct 3",
      description:
        "The two-week stay supports normal professional and academic commitments while making beach, ferry and coastal time available without another lodging move.",
      items: [
        "Everyday water — Use the nearest beach, ocean pool or shoreline walk without turning it into a formal excursion.",
        "Harbour geography — Connect ferries, headlands, Port Jackson and the city’s development around the water.",
        "Coastal ecology — Compare surf beaches, ocean pools, sandstone cliffs and marine conditions.",
        "Performing arts — Use the Opera House evening to explore architecture, production and live performance.",
      ],
    },
    featurePlans: [
      {
        id: "sydney-opera-house",
        eyebrow: "One weekday evening",
        title: "Sydney Opera House",
        description:
          "Prefer a full staged Opera Australia production if the 2027 season cooperates. Otherwise choose another family-appropriate performance and make the harbour arrival part of the evening.",
        items: [
          "Check the 2027 calendars before treating a specific production as available.",
          "Choose the performance first, then confirm the return trip to the beach base.",
          "Do not add another major attraction to the same evening.",
        ],
        links: [
          {
            title: "Opera Australia · Sydney",
            url: "https://opera.org.au/sydney/",
          },
          {
            title: "Sydney Opera House · Opera",
            url: "https://www.sydneyoperahouse.com/opera",
          },
        ],
      },
      {
        id: "full-sydney-weekend",
        eyebrow: "October 2–3 · dedicated trip",
        title: "Full Sydney weekend",
        description:
          "Use the complete non-work weekend for one coherent harbour or coast plan rather than trying to collect every major Sydney attraction.",
        items: [
          "Choose a realistic section of the Bondi-to-Coogee coastal walk according to weather and family energy.",
          "Use Taronga Zoo as the leading full-day family alternative when the harbour setting and wildlife program justify it.",
          "Keep one half-day slower so the second Work & School week does not begin depleted.",
        ],
        links: [
          {
            title: "Bondi-to-Coogee coastal walkway",
            url: "https://www.randwick.nsw.gov.au/facilities-and-recreation/explore-randwick-city/coastal-walkway",
          },
          {
            title: "Taronga Zoo Sydney",
            url: "https://www.taronga.org.au/sydney-zoo",
          },
        ],
      },
    ],
    photos: [
      {
        src: "/images/australia/sydney-opera-house.jpg",
        alt: "Sydney Opera House and Harbour Bridge viewed from the water",
        caption: "Sydney Opera House and Harbour Bridge",
        credit: "Charles J. Sharp / Wikimedia Commons",
        source:
          "https://commons.wikimedia.org/wiki/File:Sydney_Opera_House_and_Sydney_Harbour_Bridge.jpg",
      },
      {
        src: "/images/australia/sydney-manly-beach.jpg",
        alt: "Sand, surf and Norfolk Island pines at Manly Beach",
        caption: "Manly Beach",
        credit: "Coekon / Wikimedia Commons",
        source:
          "https://commons.wikimedia.org/wiki/File:Manly_Beach,_Manly,_New_South_Wales.jpg",
      },
      {
        src: "/images/australia/sydney-coogee-beach.jpg",
        alt: "Coogee Beach and its oceanfront neighborhood in Sydney",
        caption: "Coogee Beach",
        credit: "Dinkum / Wikimedia Commons",
        source:
          "https://commons.wikimedia.org/wiki/File:Coogee_beach_Sydney.JPG",
      },
    ],
    ideas: [
      {
        title: "Live at the beach",
        timing: "Every workday afternoon",
        description:
          "Make swimming, sand, an ocean-pool visit or a short coastal walk the default after-work activity. The point of the location choice is that beach time requires almost no planning.",
        links: [
          {
            title: "Sydney.com · Manly Beach",
            url: "https://www.sydney.com/destinations/sydney/sydney-north/manly/attractions/manly-beach",
          },
          {
            title: "Sydney.com · Coogee Beach",
            url: "https://www.sydney.com/uk/destinations/sydney/sydney-east/coogee/attractions/coogee-beach",
          },
        ],
      },
      {
        title: "Sydney Opera House",
        timing: "One weekday evening",
        description:
          "Prefer a full staged Opera Australia production if the 2027 season cooperates. Otherwise use another family-appropriate performance in the Joan Sutherland Theatre and make the harbour arrival part of the evening.",
        links: [
          {
            title: "Opera Australia · Sydney",
            url: "https://opera.org.au/sydney/",
          },
          {
            title: "Sydney Opera House · Opera",
            url: "https://www.sydneyoperahouse.com/opera",
          },
        ],
      },
      {
        title: "Harbour ferry and Circular Quay",
        timing: "Afternoon or Opera House evening",
        description:
          "If staying in Manly, the ferry is useful transportation and one of the week's best sightseeing experiences. Pair it with Circular Quay, the Rocks or the Botanic Garden.",
      },
      {
        title: "Full Sydney weekend",
        timing: "October 2–3",
        description:
          "Use the complete non-work weekend for the harbour, a chosen section of the 3.7-mile Bondi-to-Coogee walk, Taronga Zoo or whichever major experiences the weekday evenings did not cover.",
      },
    ],
    planningNotes: [
      "Compare Manly and Coogee rentals on workspace and internet before comparing views.",
      "Recheck the 2027 Opera Australia and Sydney Opera House calendars when published.",
      "Keep Sunday, October 10 for the flight to Hamilton Island.",
    ],
  },
};
