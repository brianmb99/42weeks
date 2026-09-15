import type { LocationPagePlan } from "./location-page-types";

export type AsiaLocationSlug = "hong-kong";

export const asiaStops = [
  {
    title: "India",
    mapLabel: "India",
    dates: "Oct 24–Nov 13",
    days: 21,
    color: "#a95f27",
    mode: "Family, vacation and work",
    description:
      "Week one is Dehradun family time through Diwali with a Work & School routine. Week two is a bounded Delhi–Agra–Jaipur vacation. Week three is a Bangalore Work & School base before Hong Kong.",
    href: "/asia/india",
    image: "/images/asia/dehradun-forest-research-institute.jpg",
    alt: "The Forest Research Institute building and lawns in Dehradun",
  },
  {
    title: "Hong Kong",
    mapLabel: "Hong Kong",
    dates: "Nov 14–27",
    days: 14,
    color: "#d68b43",
    mode: "Two-week office stay",
    description:
      "Live near the office for two weeks: a full Work & School week, a complete weekend, Thanksgiving, and a Saturday-night flight to New Zealand.",
    href: "/asia/hong-kong",
    image: "/images/asia/hong-kong-peak.jpg",
    alt: "Victoria Harbour and Hong Kong's skyline viewed from Victoria Peak",
  },
] as const;

export const asiaLocationPages: Record<AsiaLocationSlug, LocationPagePlan> = {
  "hong-kong": {
    eyebrow: "Asia · two-week office stay",
    title: "Hong Kong",
    dates: "Nov 14–27, 2027",
    facts: ["13 nights + departure day", "Two office weeks", "Thanksgiving"],
    summary:
      "Fly Sunday from Bangalore and live in Hong Kong for two weeks. Use the existing office rather than a work room in the apartment, run a normal Work & School week, protect Saturday–Sunday as the family weekend, then use Thanksgiving as the principal family day before the Saturday-night flight to New Zealand.",
    photos: [
      {
        src: "/images/asia/hong-kong-peak.jpg",
        alt: "Victoria Harbour and Hong Kong's skyline viewed from Victoria Peak",
        caption: "Victoria Harbour from the Peak",
        credit: "Dllu / Wikimedia Commons · CC BY-SA 4.0",
        source:
          "https://commons.wikimedia.org/wiki/File:Panorama_of_Hong_Kong_Harbour_from_The_Peak_dllu.jpg",
      },
      {
        src: "/images/asia/hong-kong-star-ferry.jpg",
        alt: "A green and white Star Ferry crossing Victoria Harbour",
        caption: "Star Ferry",
        credit: "Alexkom000 / Wikimedia Commons · CC BY 4.0",
        source:
          "https://commons.wikimedia.org/wiki/File:2024-12-27_A_Star_Ferry_crosses_Victoria_Harbour_1.jpg",
      },
      {
        src: "/images/asia/hong-kong-dragons-back.jpg",
        alt: "The green ridge of Dragon's Back above Hong Kong's coast",
        caption: "Dragon's Back",
        credit: "Bjørn Christian Tørrissen / Wikimedia Commons · CC BY-SA 4.0",
        source:
          "https://commons.wikimedia.org/wiki/File:Dragons-Back-Northwards.jpg",
      },
    ],
    rhythmTitle: "A full week, then a real weekend, then Thanksgiving",
    rhythmSummary:
      "The extra week exists so Hong Kong can be lived in, not sampled. Week one is ordinary office-and-school life. November 20–21 is the family weekend. Thanksgiving week stays compact because of the holiday and the overnight flight.",
    rhythm: [
      {
        label: "Arrive and establish",
        mapLabel: "Arrive",
        dates: "Sun, Nov 14",
        detail: "Bangalore flight, MTR, groceries and school setup.",
        days: 1,
        tone: "arrival",
      },
      {
        label: "Work & School · week one",
        mapLabel: "Week one",
        dates: "Nov 15–19",
        detail: "Full office week with one compact outing at a time.",
        days: 5,
        tone: "work",
        highlights: [
          {
            title: "The Peak",
            timing: "Clearest late afternoon",
            description:
              "Let visibility determine the day and use the tram and harbour view as one coherent outing.",
            url: "https://www.thepeak.com.hk/en/the-peak-experience/the-peak-tram",
          },
          {
            title: "Star Ferry",
            timing: "Low-friction harbour outing",
            description:
              "Use the ferry as both transport and an efficient introduction to Victoria Harbour.",
            url: "https://www.starferry.com.hk/en/service",
          },
          {
            title: "Tai Kwun",
            timing: "Culture and dinner outing",
            description:
              "Use the heritage and arts compound before continuing through Central without adding another district.",
            url: "https://www.taikwun.hk/en/visit/visiting_information",
          },
          {
            title: "Hong Kong Central Library",
            timing: "School reset or wet afternoon",
            description:
              "Use the children’s collection and study space as practical Work & School infrastructure near Admiralty.",
            url: "https://www.hkpl.gov.hk/en/locations/hong-kong-central-library/index.html",
          },
        ],
      },
      {
        label: "Family weekend",
        mapLabel: "Weekend",
        dates: "Nov 20–21",
        detail: "One island day and one slower city day.",
        days: 2,
        tone: "family",
        featureLink: {
          title: "See weekend plan",
          href: "#hong-kong-weekend",
        },
      },
      {
        label: "Work & School · office days",
        mapLabel: "Office",
        dates: "Nov 22–24",
        detail: "Three full office and school days.",
        days: 3,
        tone: "work",
        highlights: [
          {
            title: "Tsim Sha Tsui Promenade",
            timing: "Harbour evening",
            description:
              "Walk the promenade and add the light show only if the family wants to stay.",
            url: "https://www.discoverhongkong.com/eng/attractions/top-things-to-see-and-do-around-tsim-sha-tsui-promenade.html",
          },
          {
            title: "Hong Kong Park",
            timing: "School break near Admiralty",
            description:
              "Use the park, playground and conservatory as a short outing that does not cross the harbour.",
            url: "https://www.lcsd.gov.hk/en/parks/hkp/index.html",
          },
          {
            title: "Hong Kong Tramways",
            timing: "Low-friction neighborhood ride",
            description:
              "Use the tram as ordinary Wan Chai or Happy Valley transport rather than a separate outing.",
            url: "https://www.hktramways.com/en/",
          },
        ],
      },
      {
        label: "Thanksgiving",
        mapLabel: "Thanks.",
        dates: "Thu, Nov 25",
        detail: "Principal family day; hike or cultural fallback.",
        days: 1,
        tone: "family",
        featureLink: {
          title: "See Thanksgiving plan",
          href: "#hong-kong-thanksgiving",
        },
      },
      {
        label: "Work & School · Friday",
        mapLabel: "Friday",
        dates: "Fri, Nov 26",
        detail: "Bounded commitments, then a city evening.",
        days: 1,
        tone: "work",
      },
      {
        label: "City + overnight flight",
        mapLabel: "Fly",
        dates: "Sat, Nov 27",
        detail: "Keep luggage central; finish four hours before departure.",
        days: 1,
        tone: "travel",
        featureLink: {
          title: "See departure plan",
          href: "#hong-kong-departure-day",
        },
      },
    ],
    basePanel: {
      id: "work-rhythm",
      eyebrow: "Two-week office stay",
      title: "Work & School from Hong Kong",
      headerNote: "US Eastern → 10 p.m.–6 a.m. local",
      description:
        "Use the Hong Kong office for professional work and keep academic work visible at the apartment. Linked activities are optional place-based learning, not a requirement to program every day.",
      items: [
        "Office — Work from the existing office; choose the apartment for the commute and family life, not for a home workspace.",
        "Harbour geography — Use ferries and viewpoints to understand Victoria Harbour’s role in the city.",
        "History — Examine colonial rule, the 1997 handover and present-day Hong Kong with appropriate nuance.",
        "Urban form — Compare density, vertical transport, housing and public-space tradeoffs.",
      ],
    },
    featurePlans: [
      {
        id: "hong-kong-weekend",
        eyebrow: "November 20–21 · dedicated family weekend",
        title: "Cheung Chau weekend",
        description:
          "Use one day for an outlying-island outing and keep the other slower. Cheung Chau is the leading Saturday plan: a ferry, a car-free island, walking or cycling, and a beach. Sunday should stay in the neighborhood rather than adding Lantau or another timed attraction.",
        items: [
          "Take the Central ferry to Cheung Chau and treat the island as the whole Saturday, not a stop before another destination.",
          "Keep Sunday local: groceries, a playground, a tram ride or an unprogrammed harbour walk.",
          "If the forecast is wet, swap Saturday to M+ and West Kowloon rather than forcing the island.",
        ],
        links: [
          {
            title: "Cheung Chau",
            url: "https://www.discoverhongkong.com/eng/explore/great-outdoor/outlying-islands.html",
          },
          {
            title: "M+ visitor information",
            url: "https://www.mplus.org.hk/en/plan-your-visit/",
          },
        ],
      },
      {
        id: "hong-kong-thanksgiving",
        eyebrow: "November 25 · dedicated family day",
        title: "Thanksgiving in Hong Kong",
        description:
          "Use the U.S. holiday for the strongest full family day. Dragon’s Back is the leading active plan when conditions cooperate; M+ and West Kowloon are the honest weather or energy fallback.",
        items: [
          "Choose Dragon’s Back only with a dry forecast, acceptable visibility and enough family energy for the full route.",
          "Use M+ as a substantial alternative, not merely something squeezed in after a failed hike.",
          "Keep the evening flexible rather than layering another major attraction onto the day.",
        ],
        links: [
          {
            title: "Dragon’s Back",
            url: "https://www.discoverhongkong.com/eng/place-to-go/travel-guide-dragon-s-back.html",
          },
          {
            title: "M+ visitor information",
            url: "https://www.mplus.org.hk/en/plan-your-visit/",
          },
        ],
      },
      {
        id: "hong-kong-departure-day",
        eyebrow: "November 27 · overnight flight",
        title: "Compact departure Saturday",
        description:
          "Leave luggage at the apartment and choose one central cultural or harbour plan. Do not schedule Disneyland, Lantau, an island or a long hike before the overnight flight.",
        items: [
          "Keep the outing close to reliable transport and confirmed luggage storage.",
          "Use the Hong Kong Museum of Art or a short harbourfront route as the leading options.",
          "Finish sightseeing with a generous airport-transfer margin.",
        ],
        links: [
          {
            title: "Hong Kong Museum of Art",
            url: "https://hk.art.museum/en/web/ma/visit/opening-hours-and-admission.html",
          },
          {
            title: "Airport Express timetable",
            url: "https://www.mtr.com.hk/en/customer/services/timetable_index.html",
          },
        ],
      },
    ],
    stayTitle: "Western Wan Chai or the Admiralty edge",
    stayDescription:
      "Default to a serviced apartment within a five-to-ten-minute walk of MTR. Admiralty connects four lines; Wan Chai adds the tram, harbour ferry, food and more practical apartment inventory. The office removes the need for a closable work room at home, but the commute still decides Island versus Kowloon. If the office is in Kowloon, Tsim Sha Tsui or Jordan becomes the better answer.",
    stayChecks: [
      "Test the real commute to the office before booking",
      "Serviced apartment with a usable kitchenette and laundry",
      "Two genuine school surfaces plus verified broadband",
      "Easy MTR access without a steep final walk",
      "Saturday luggage storage and simple Airport Express transfer",
    ],
    panels: [
      {
        eyebrow: "November conditions",
        title: "Usually mild and comparatively dry",
        description:
          "Historical November conditions are roughly 69–76°F with much less rain than summer. Carry a light layer and retain a museum fallback; a late tropical system remains possible.",
      },
    ],
    bookFirst: [
      "Thirteen-night serviced apartment matched to the office commute",
      "Sunday Bangalore → Hong Kong flight",
      "Saturday-night Hong Kong → Auckland itinerary",
      "Only the timed attractions that remain important after the forecast firms",
    ],
    planningNotes: [
      "Confirm the actual office location before selecting Hong Kong Island over Kowloon.",
      "The apartment does not need a work room; it does need school surfaces, laundry and a kitchenette.",
      "Stop Saturday sightseeing at least four hours before the overnight flight.",
      "Do not add Disneyland, Lantau or a second island weekend to this stay.",
    ],
    links: [
      {
        title: "Hong Kong Observatory climate normals",
        url: "https://www.hko.gov.hk/en/cis/normal/1991_2020/normals.htm",
      },
      {
        title: "MTR system map",
        url: "https://www.mtr.com.hk/en/customer/services/system_map.html",
      },
      {
        title: "Airport Express timetable",
        url: "https://www.mtr.com.hk/en/customer/services/timetable_index.html",
      },
      {
        title: "NYSE hours and calendar",
        url: "https://www.nyse.com/trade/hours-calendars",
      },
    ],
  },
};
