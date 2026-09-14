import type { LocationRhythmSegment } from "./location-page-types";

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
  photos: AustraliaPhoto[];
  ideas: AustraliaIdea[];
  planningNotes: string[];
};

export const australiaStops = [
  {
    title: "Melbourne",
    dates: "Aug 23–28",
    mode: "Landing and work launch",
    description:
      "Recover from the weekend flight, establish the first work and homeschool rhythm, and target any available men's AFL match at the MCG.",
    href: "/australia/melbourne",
    image: "/images/australia/melbourne-skyline.jpg",
    alt: "Melbourne skyline from Southbank",
  },
  {
    title: "Newtown, Geelong",
    dates: "Aug 29–Sep 4",
    mode: "Family-history work week",
    description:
      "Live in the neighborhood for a full week, work and homeschool normally, and preserve afternoons, evenings and Saturday for remembered places and Queenscliff.",
    href: "/australia/geelong",
    image: "/images/australia/geelong-waterfront.jpg",
    alt: "Geelong waterfront and Corio Bay",
  },
  {
    title: "Great Ocean Road Loop",
    dates: "Sep 5–11",
    mode: "Vacation",
    description:
      "Seven early-spring days through the Surf Coast, Otways, Shipwreck Coast, Gariwerd and Sovereign Hill; Labor Day plus four vacation weekdays.",
    href: "/trips/great-southern-touring-route",
    image: "/images/victoria/twelve-apostles.jpg",
    alt: "The Twelve Apostles on Victoria's Great Ocean Road",
  },
  {
    title: "Alice Springs",
    dates: "Sep 12–25",
    mode: "Two-week outback work base",
    description:
      "Live and work in the Red Centre for two weeks, using the complete middle weekend for Tjoritja and ordinary afternoons for Alice Springs.",
    href: "/australia/alice-springs",
    image: "/images/outback/aerial-road.jpg",
    alt: "A road crossing the red landscape of inland Australia",
  },
  {
    title: "Sydney",
    dates: "Sep 26–Oct 9",
    mode: "Two-week beach work base",
    description:
      "Work from a real neighborhood near the beach, preserve a complete middle weekend, and reserve one evening for the Sydney Opera House.",
    href: "/australia/sydney",
    image: "/images/australia/sydney-opera-house.jpg",
    alt: "Sydney Opera House and Harbour Bridge from the water",
  },
  {
    title: "Whitsundays",
    dates: "Oct 10–16",
    mode: "Work, reef and expedition",
    description:
      "Two dependable workdays, a dedicated Hardy Reef day and a weather-dependent three-day family sea-kayak expedition.",
    href: "/trips/hamilton-island-working-week",
    image: "/images/whitsundays/hamilton-marina.jpg",
    alt: "Hamilton Island marina and the Whitsunday Islands",
  },
  {
    title: "Brisbane",
    dates: "Oct 17–22",
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
    eyebrow: "Australia · family-history work base",
    dates: "Aug 29–Sep 4, 2027",
    facts: ["7 nights", "Work Mon–Fri", "Newtown preferred"],
    summary:
      "This is a week of ordinary life in the place Brian grew up, not a gateway stop. Move from Melbourne on Sunday, establish a dependable work and homeschool setup in Newtown, and leave enough unscheduled time for remembered places, follow-up visits and family stories.",
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
      "The point is to live here long enough for family-history time to emerge around a normal week, not to compress remembered places into a Melbourne day trip.",
    rhythm: [
      {
        label: "Move and settle",
        dates: "Sun, Aug 29",
        detail: "Melbourne to Newtown; groceries and work setup.",
        days: 1,
        tone: "arrival",
      },
      {
        label: "Newtown work week",
        dates: "Aug 30–Sep 3",
        detail: "Work and school first; family places in the afternoons.",
        days: 5,
        tone: "work",
      },
      {
        label: "Local Saturday",
        dates: "Sat, Sep 4",
        detail: "Return visits, Queenscliff, or an MCG match if needed.",
        days: 1,
        tone: "family",
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
      "Move from Melbourne on Sunday, August 29 and protect the Monday-through-Friday routine.",
      "Do not prebook every evening; family-history time needs room for remembered places and spontaneous follow-up.",
      "If the selected MCG match falls September 3–5, make one purposeful trip to Melbourne rather than moving the base.",
      "Choose the Great Ocean Road rental-car handoff together with the Newtown lodging.",
    ],
  },
  melbourne: {
    slug: "melbourne",
    title: "Melbourne",
    eyebrow: "Australia · landing and work launch",
    dates: "Aug 23–28, 2027",
    facts: ["6 nights", "Soft work launch", "MCG priority"],
    summary:
      "Melbourne absorbs the long-haul landing, the first work and homeschool setup, and the best early opportunity for an MCG match. Keep the first days light, build output through the week, and avoid turning recovery into an ambitious sightseeing schedule.",
    stayTitle: "Inner Melbourne with an easy MCG trip",
    stayDescription:
      "Prioritize a separate work room, groceries, laundry and straightforward transit to the MCG. Richmond, South Yarra, East Melbourne or the CBD can work; the exact match date should influence the final choice.",
    stayChecks: [
      "Walkable access to the central city and a straightforward airport transfer",
      "Enough room to absorb jet lag without disrupting work and school zones",
      "A St Kilda evening plan that includes travel and dinner",
      "A simple Sunday move to Newtown after the final home-and-away weekend",
    ],
    rhythmTitle: "Land softly, then build the routine",
    rhythmSummary:
      "Melbourne is the buffer between the long-haul flight and the first normal week. Keep Monday genuinely light, increase work through Friday, and reserve the weekend edge for the best available MCG match.",
    rhythm: [
      {
        label: "Land and recover",
        dates: "Mon, Aug 23",
        detail: "Apartment, groceries, sleep and only essential work.",
        days: 1,
        tone: "arrival",
      },
      {
        label: "Soft work launch",
        dates: "Aug 24–27",
        detail: "Four-hour anchors first, then normal output.",
        days: 4,
        tone: "work",
      },
      {
        label: "MCG / city window",
        dates: "Sat, Aug 28",
        detail: "Use the fixture first; keep a flexible city fallback.",
        days: 1,
        tone: "family",
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
        timing: "One match · target Aug 27–Sep 5",
        description:
          "This is a specific trip objective, not a generic Melbourne possibility: buy tickets for any available men's AFL match at the MCG. Prefer the final home-and-away weekend while based in Melbourne; if the better fixture is the following weekend, make one purposeful trip from Newtown instead of changing the route.",
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
          "Use the gardens and Shrine precinct as the calmer Sunday option before collecting luggage and heading to the airport.",
      },
    ],
    planningNotes: [
      "Target any men's AFL match at the MCG; do not organize the trip around Grand Final access.",
      "If the best match falls after the August 29 move, travel from Newtown for that one scheduled event.",
      "The St Kilda penguin sessions are free but ticketed and capacity-limited.",
      "Keep arrival Monday light and use four-hour anchor blocks Tuesday and Wednesday before increasing output.",
    ],
  },
  sydney: {
    slug: "sydney",
    title: "Sydney",
    eyebrow: "Australia · two-week beach work base",
    dates: "Sep 26–Oct 9, 2027",
    facts: ["14 nights", "Two work weeks", "Complete middle weekend"],
    summary:
      "Sydney should feel different from Melbourne: live beside the water, protect two normal work and homeschool weeks, use the beach almost every day, and reserve the complete October 2–3 weekend for the harbour, coast or a major cultural experience.",
    stayTitle: "Shortlist Manly first, Coogee second",
    stayDescription:
      "Manly offers the clearest beach-at-the-door version and a memorable harbour ferry into the city. Coogee offers a calmer eastern-suburbs neighborhood and immediate access to ocean pools and the coastal walk. Do not default to the CBD if the goal is to live near a beach.",
    stayChecks: [
      "No more than a few minutes' walk to a swimmable beach",
      "A real work room, excellent internet and quiet weekday mornings",
      "Groceries, casual food and outdoor space usable without a car",
      "A credible evening return after the Sydney Opera House",
    ],
    rhythmTitle: "Two real work weeks beside the water",
    rhythmSummary:
      "The long stay makes ordinary beach afternoons possible and preserves one complete weekend without asking the family to work around another move.",
    rhythm: [
      {
        label: "Arrive and settle",
        dates: "Sun, Sep 26",
        detail: "Alice Springs flight, groceries and beach orientation.",
        days: 1,
        tone: "arrival",
      },
      {
        label: "Work week one",
        dates: "Sep 27–Oct 1",
        detail: "Normal work and school; beach afternoons.",
        days: 5,
        tone: "work",
      },
      {
        label: "Full Sydney weekend",
        dates: "Oct 2–3",
        detail: "Harbour, coast, zoo or one major family plan.",
        days: 2,
        tone: "family",
      },
      {
        label: "Work week two",
        dates: "Oct 4–8",
        detail: "Normal routine plus one Opera House evening.",
        days: 5,
        tone: "work",
      },
      {
        label: "Local Saturday",
        dates: "Sat, Oct 9",
        detail: "Keep the last day nearby before Sunday travel.",
        days: 1,
        tone: "family",
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
      "Daylight saving begins October 3 and moves the New York overlap one hour later locally.",
      "Keep Sunday, October 10 for the flight to Hamilton Island.",
    ],
  },
};
