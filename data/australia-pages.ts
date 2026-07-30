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
  photos: AustraliaPhoto[];
  ideas: AustraliaIdea[];
  planningNotes: string[];
};

export const australiaStops = [
  {
    title: "Geelong",
    dates: "Sep 19–24",
    mode: "Work week",
    description:
      "Recover from the long flight, settle into Newtown, work and homeschool, and use the evenings for the Barwon River, Balyang Sanctuary and Queenscliff.",
    href: "/australia/geelong",
    image: "/images/australia/geelong-waterfront.jpg",
    alt: "Geelong waterfront and Corio Bay",
  },
  {
    title: "Great Ocean Road Loop",
    dates: "Sep 25–Oct 1",
    mode: "Vacation",
    description:
      "Seven days through the surf coast, Otways, Shipwreck Coast, Gariwerd and Sovereign Hill, with only three lodging bases.",
    href: "/trips/great-southern-touring-route",
    image: "/images/victoria/twelve-apostles.jpg",
    alt: "The Twelve Apostles on Victoria's Great Ocean Road",
  },
  {
    title: "Melbourne",
    dates: "Oct 1–3",
    mode: "City weekend",
    description:
      "A compact Melbourne stop for laneways, the river and a ticketed sunset session with the Little Penguins at St Kilda Pier.",
    href: "/australia/melbourne",
    image: "/images/australia/melbourne-skyline.jpg",
    alt: "Melbourne skyline from Southbank",
  },
  {
    title: "Sydney",
    dates: "Oct 3–9",
    mode: "Beach work week",
    description:
      "Work from a real neighborhood near the beach, keep afternoons coastal, and reserve one evening for the Sydney Opera House.",
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
    title: "Outback",
    dates: "Oct 17–22",
    mode: "Play, with some work",
    description:
      "Longreach and Winton for aviation, dinosaurs, stock-route history and wide-open Queensland landscapes.",
    href: "/trips/longreach-outback-working-week",
    image: "/images/outback/aerial-road.jpg",
    alt: "An outback road crossing red Queensland country",
  },
] as const;

export const australiaCities: Record<AustraliaCity["slug"], AustraliaCity> = {
  geelong: {
    slug: "geelong",
    title: "Geelong",
    eyebrow: "Australia · first working base",
    dates: "Sep 19–24, 2027",
    facts: ["6 nights", "Work Mon–Fri", "Newtown preferred"],
    summary:
      "This is the landing-and-recovery week. Drive straight from Melbourne Airport to Geelong, establish a dependable work and homeschool setup in Newtown, and keep the interesting pieces deliberately small enough for afternoons and evenings.",
    stayTitle: "Newtown, near the Barwon River",
    stayDescription:
      "Prioritize an actual work room, strong internet, laundry and parking over waterfront views. A Newtown base puts Balyang Sanctuary and the Barwon River close by while keeping central Geelong and the Bellarine Peninsula practical.",
    stayChecks: [
      "A closed-door workspace and a second quiet homeschool surface",
      "Verified broadband, not merely a listing that says Wi-Fi",
      "Laundry and parking for the post-flight week and road-trip handoff",
      "Easy access to groceries and the Barwon River paths",
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
      "Treat September 19 as the arrival-and-settle day after the two-day trip from New Hampshire.",
      "Do not prebook every evening; the first week needs jet-lag margin.",
      "Choose the Great Ocean Road rental-car handoff together with the Newtown lodging.",
    ],
  },
  melbourne: {
    slug: "melbourne",
    title: "Melbourne",
    eyebrow: "Australia · short city weekend",
    dates: "Oct 1–3, 2027",
    facts: ["2 nights", "Arrive late Friday", "Fly to Sydney Sunday evening"],
    summary:
      "Melbourne is intentionally compact in the current plan: arrive after Sovereign Hill on Friday, use Saturday and most of Sunday for the city, then fly to Sydney. Pick two or three strong experiences rather than trying to cover the whole city.",
    stayTitle: "CBD or Southbank for a short stay",
    stayDescription:
      "With only two nights, optimize for walking, trams and an easy airport departure. CBD or Southbank keeps the river, laneways, galleries and market close; take a tram to St Kilda for the penguin evening.",
    stayChecks: [
      "Walkable access to the central city and a straightforward airport transfer",
      "Enough room to reorganize after the road trip",
      "A Saturday-night St Kilda plan that includes travel and dinner",
      "Sunday checkout and luggage storage before the Sydney flight",
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
        src: "/images/australia/melbourne-st-kilda-skyline.jpg",
        alt: "Melbourne skyline viewed across the water from St Kilda Pier",
        caption: "View from St Kilda Pier",
        credit: "Dietmar Rabich / Wikimedia Commons",
        source:
          "https://commons.wikimedia.org/wiki/File:Melbourne_(AU),_View_from_St_Kilda_Pier_--_2019_--_1596.jpg",
      },
    ],
    ideas: [
      {
        title: "Little Penguins at St Kilda Pier",
        timing: "Saturday at sunset · fixed priority",
        description:
          "Book one of the free, ticketed evening sessions when October 2027 reservations open. The penguins return after sunset; build in the tram ride, dinner and the no-flash wildlife rules.",
        links: [
          {
            title: "Parks Victoria · Little Penguins",
            url: "https://www.parks.vic.gov.au/places-to-see/parks/st-kilda-pier-and-breakwater/attractions/little-penguins",
          },
        ],
      },
      {
        title: "Laneways, arcades and the river",
        timing: "Saturday daytime",
        description:
          "Use a loose walking line through the central laneways and arcades, Federation Square, the Yarra and Southbank. Stop when the family has had enough city rather than chasing a checklist.",
      },
      {
        title: "Choose one cultural anchor",
        timing: "Saturday or Sunday",
        description:
          "Pick the National Gallery of Victoria, Melbourne Museum or Queen Victoria Market according to the weather and current exhibitions.",
      },
      {
        title: "Royal Botanic Gardens",
        timing: "Sunday reset",
        description:
          "Use the gardens and Shrine precinct as the calmer Sunday option before collecting luggage and heading to the airport.",
      },
    ],
    planningNotes: [
      "The St Kilda penguin sessions are free but ticketed and capacity-limited.",
      "Confirm the Sunday evening Melbourne-to-Sydney flight before choosing lodging.",
      "Two nights is enough for a strong taste of Melbourne, not a comprehensive visit.",
    ],
  },
  sydney: {
    slug: "sydney",
    title: "Sydney",
    eyebrow: "Australia · beach work week",
    dates: "Oct 3–9, 2027",
    facts: ["7 nights", "Work Mon–Fri", "Beach-base priority"],
    summary:
      "Sydney should feel different from Melbourne: live beside the water, protect a normal work and homeschool week, use the beach almost every day, and make one Opera House evening plus one full Saturday the larger city experiences.",
    stayTitle: "Shortlist Manly first, Coogee second",
    stayDescription:
      "Manly offers the clearest beach-at-the-door version and a memorable harbour ferry into the city. Coogee offers a calmer eastern-suburbs neighborhood and immediate access to ocean pools and the coastal walk. Do not default to the CBD if the goal is to live near a beach.",
    stayChecks: [
      "No more than a few minutes' walk to a swimmable beach",
      "A real work room, excellent internet and quiet weekday mornings",
      "Groceries, casual food and outdoor space usable without a car",
      "A credible evening return after the Sydney Opera House",
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
        title: "Full Sydney Saturday",
        timing: "Saturday, Oct 9",
        description:
          "Use the full non-work day for the harbour, a chosen section of the 3.7-mile Bondi-to-Coogee walk, Taronga Zoo or whichever major experience the weekday evenings did not cover.",
      },
    ],
    planningNotes: [
      "Compare Manly and Coogee rentals on workspace and internet before comparing views.",
      "Recheck the 2027 Opera Australia and Sydney Opera House calendars when published.",
      "Keep Sunday, October 10 for the flight to Hamilton Island.",
    ],
  },
};
