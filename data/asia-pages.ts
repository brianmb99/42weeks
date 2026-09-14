import type { LocationPagePlan } from "./location-page-types";

export type AsiaLocationSlug = "singapore" | "hong-kong";

export const asiaLocationPages: Record<AsiaLocationSlug, LocationPagePlan> = {
  singapore: {
    eyebrow: "Asia · bounded office week",
    title: "Singapore",
    dates: "Nov 14–20, 2027",
    facts: ["7 nights", "Office Mon–Fri", "Protected family Saturday"],
    summary:
      "Use Singapore as a bounded work-and-homeschool week: arrive Sunday, work Monday through Friday from a central serviced apartment, explore one compact district each afternoon or evening, and protect Saturday for one substantial family outing. November rain rewards flexible plans with indoor fallbacks.",
    photos: [
      {
        src: "/images/asia/singapore-gardens-bay.jpg",
        alt: "Gardens by the Bay and Marina Bay Sands at dusk in Singapore",
        caption: "Gardens by the Bay at dusk",
        credit: "Nicolas Lannuzel / Wikimedia Commons · CC BY-SA 2.0",
        source:
          "https://commons.wikimedia.org/wiki/File:Gardens_by_the_Bay_and_Marina_Bay_Sands,_Singapore,_at_dusk_-_20120928.jpg",
      },
      {
        src: "/images/asia/singapore-cloud-forest.jpg",
        alt: "Lush tropical planting inside the Cloud Forest conservatory",
        caption: "Cloud Forest",
        credit: "Pierrick Lemaret / Wikimedia Commons · CC BY 3.0",
        source:
          "https://commons.wikimedia.org/wiki/File:Cloud_Forest,_Gardens_by_the_Bay_(215599369).jpg",
      },
      {
        src: "/images/asia/singapore-botanic-gardens.jpg",
        alt: "A shaded path beneath planted arches in Singapore's National Orchid Garden",
        caption: "National Orchid Garden",
        credit: "Basile Morin / Wikimedia Commons · CC BY-SA 4.0",
        source:
          "https://commons.wikimedia.org/wiki/File:Alley_lined_with_vegetated_arches_at_the_National_Orchid_Garden_of_Singapore.jpg",
      },
    ],
    rhythmTitle: "One office week, one real family day",
    rhythmSummary:
      "The compact city makes weekday outings realistic, but the plan should not pretend office days are vacation. Saturday carries the only substantial family program before Sunday travel.",
    rhythm: [
      {
        label: "Arrive and establish",
        dates: "Sun, Nov 14",
        detail: "India flight, groceries, transit and workspace test.",
        days: 1,
        tone: "arrival",
      },
      {
        label: "Office + homeschool",
        dates: "Nov 15–19",
        detail: "Bounded weekdays with one compact outing at a time.",
        days: 5,
        tone: "work",
      },
      {
        label: "Family Saturday",
        dates: "Sat, Nov 20",
        detail: "Choose one major day; do not stack three attractions.",
        days: 1,
        tone: "family",
      },
    ],
    stayTitle: "Robertson Quay or River Valley",
    stayDescription:
      "Default to an apartment-style property within an easy walk of Fort Canning or Great World MRT. It offers groceries, riverside space and central access without feeling like a business district. City Hall or Bugis is the transit-first fallback; the final office location should still be allowed to change the answer.",
    stayChecks: [
      "A serviced apartment rather than one standard hotel room",
      "A closable work area plus two genuine work and school surfaces",
      "Verified fixed broadband, laundry and a usable kitchenette",
      "Sheltered walking access to MRT and groceries",
      "A commute test against the actual office before booking",
    ],
    activities: [
      {
        title: "Gardens by the Bay",
        timing: "Late afternoon into one evening",
        description:
          "Use the cooled conservatories during the hottest or wettest part of the afternoon, then stay for Garden Rhapsody if the family still has energy. Do not pair this with another major attraction.",
        links: [
          {
            title: "Opening hours",
            url: "https://www.gardensbythebay.com.sg/en/plan-your-visit/opening-hours.html",
          },
          {
            title: "Garden Rhapsody",
            url: "https://www.gardensbythebay.com.sg/en/things-to-do/calendar-of-events/garden-rhapsody.html",
          },
        ],
      },
      {
        title: "Hawker dinner + one neighborhood",
        timing: "Several low-friction evenings",
        description:
          "Let food create the route: choose one hawker center and the surrounding district rather than crossing the city for a checklist. Chinatown, Kampong Glam, Little India and Katong are separate evenings.",
      },
      {
        title: "Central Public Library + Bugis",
        timing: "School reset or wet afternoon",
        description:
          "Use the Children's Biodiversity Library and public study space as working-week infrastructure, then add a short Bugis or Kampong Glam dinner walk.",
        links: [
          {
            title: "Central Public Library",
            url: "https://www.nlb.gov.sg/main/about-us/press-room-and-publications/media-releases/2024/Central-Public-Library-Reopens-with-a-Kaleidoscope-of-Collections-and-Experiences-for-Everyone",
          },
        ],
      },
      {
        title: "Singapore Botanic Gardens",
        timing: "Dry afternoon; not Monday for Jacob Ballas",
        description:
          "Keep this forecast-led and start late enough to avoid the worst heat. Use Jacob Ballas Children's Garden only after confirming its day and program hours.",
        links: [
          {
            title: "Visitor information",
            url: "https://sbg.nparks.gov.sg/visit/general-info/",
          },
        ],
      },
      {
        title: "Asian Civilisations Museum + river",
        timing: "Friday evening candidate",
        description:
          "Pair a focused museum visit with the Singapore River. Current Friday late hours make this especially useful, but recheck the 2027 calendar.",
        links: [
          {
            title: "Asian Civilisations Museum",
            url: "https://www.acm.nhb.gov.sg/visit/admissions",
          },
        ],
      },
      {
        title: "Mandai family day",
        timing: "Protected Saturday",
        description:
          "Choose one daytime park, preferably Bird Paradise, then decide whether Night Safari still fits after dinner. Do not attempt the zoo, Bird Paradise and Night Safari in one day.",
        links: [
          {
            title: "Bird Paradise",
            url: "https://www.mandai.com/en/bird-paradise.html",
          },
          {
            title: "Night Safari",
            url: "https://www.mandai.com/en/night-safari.html",
          },
        ],
      },
    ],
    panels: [
      {
        id: "work-rhythm",
        eyebrow: "November 15–19",
        title: "Keep the office commitment bounded",
        description:
          "Five office days are acceptable here because the stop is explicitly for work, the commute is short and the family retains Saturday. Do not let office dinners consume every evening.",
        items: [
          "Confirm the office location before choosing the apartment.",
          "Keep homeschool stable in the apartment or library rather than touring all day.",
          "Use only one later evening before another demanding work morning.",
        ],
      },
      {
        eyebrow: "November conditions",
        title: "Hot, humid and frequently stormy",
        description:
          "Historical November conditions are roughly 76–88°F with rain on many days and frequent lightning. Outdoor plans need timing flexibility, compact rain gear and an indoor substitute.",
        items: [
          "Put longer outdoor time earlier or later in the day.",
          "Treat severe afternoon lightning as a real constraint.",
          "Do not prepay for an outdoor-only weekday schedule.",
        ],
      },
      {
        eyebrow: "Place-based learning",
        title: "Homeschool hooks",
        items: [
          "Tropical biodiversity, rainfall, lightning and urban heat",
          "Food cultures, migration and the history behind hawker centers",
          "Port geography, land reclamation and high-density city planning",
          "Public transit mapping and the tradeoffs of car-light urban life",
        ],
      },
      {
        eyebrow: "Saturday judgment",
        title: "One substantial family day is enough",
        description:
          "Mandai is the leading family choice. Singapore Oceanarium and a short Sentosa visit are the persistent-rain fallback; neither needs to become a second itinerary layered onto the first.",
      },
    ],
    bookFirst: [
      "Seven-night serviced apartment with verified work setup",
      "India → Singapore and Sunday Singapore → Hong Kong flights",
      "Saturday Mandai plan after checking 2027 hours and timed entry",
    ],
    planningNotes: [
      "The office address can overturn the neighborhood recommendation; test the real commute.",
      "Recheck 2027 attraction hours and maintenance closures before buying tickets.",
      "Keep the Saturday plan singular and weather-flexible.",
    ],
    links: [
      {
        title: "Singapore climate",
        url: "https://www.weather.gov.sg/climate-climate-of-singapore/",
      },
      {
        title: "LTA rail map",
        url: "https://lta.gov.sg/content/ltaweb/en/public-transport/mrt-and-lrt-trains/train-system-map.html",
      },
      {
        title: "Singapore Oceanarium",
        url: "https://www.sentosa.com.sg/en/things-to-do/attractions/singapore-oceanarium",
      },
    ],
  },
  "hong-kong": {
    eyebrow: "Asia · Thanksgiving office stay",
    title: "Hong Kong",
    dates: "Nov 21–27, 2027",
    facts: ["6 nights + departure day", "Three core office days", "Thanksgiving"],
    summary:
      "Use Monday through Wednesday as the core office-and-homeschool block, Thanksgiving Thursday as the principal family day, and Friday as a light local-hours workday followed by an evening outing. Preserve Saturday for a compact city day before the overnight flight.",
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
    rhythmTitle: "Use the U.S. holiday instead of fighting it",
    rhythmSummary:
      "Three full office days are enough for this stop. Thanksgiving creates the best family day; Friday's U.S. early close occurs late at night in Hong Kong and should not be mistaken for a free local afternoon.",
    rhythm: [
      {
        label: "Arrive and orient",
        dates: "Sun, Nov 21",
        detail: "Singapore flight, MTR, groceries and workspace.",
        days: 1,
        tone: "arrival",
      },
      {
        label: "Core office days",
        dates: "Nov 22–24",
        detail: "Three full office and homeschool days.",
        days: 3,
        tone: "work",
      },
      {
        label: "Thanksgiving",
        dates: "Thu, Nov 25",
        detail: "Principal family day; hike or cultural fallback.",
        days: 1,
        tone: "family",
      },
      {
        label: "Light local work",
        dates: "Fri, Nov 26",
        detail: "Asynchronous anchor block, then a city evening.",
        days: 1,
        tone: "work",
      },
      {
        label: "City + overnight flight",
        dates: "Sat, Nov 27",
        detail: "Keep luggage central; finish four hours before departure.",
        days: 1,
        tone: "travel",
      },
    ],
    stayTitle: "Western Wan Chai or the Admiralty edge",
    stayDescription:
      "Default to a serviced apartment within a five-to-ten-minute walk of MTR. Admiralty connects four lines; Wan Chai adds the tram, harbour ferry, food and more practical apartment inventory. If the office is in Kowloon, Tsim Sha Tsui or Jordan becomes the better answer.",
    stayChecks: [
      "Test the real commute to the office before booking",
      "Serviced apartment or connected rooms with a closable work area",
      "Two genuine work and school surfaces plus verified broadband",
      "Laundry and easy MTR access without a steep final walk",
      "Saturday luggage storage and simple Airport Express transfer",
    ],
    activities: [
      {
        title: "The Peak",
        timing: "Forecast-led late afternoon through dusk",
        description:
          "Choose the clearest weekday and let the view determine the timing. The tram runs into the evening under current schedules, so this does not need to consume Thanksgiving.",
        links: [
          {
            title: "Peak Tram",
            url: "https://www.thepeak.com.hk/en/the-peak-experience/the-peak-tram",
          },
        ],
      },
      {
        title: "Star Ferry + Tsim Sha Tsui promenade",
        timing: "One efficient harbour evening",
        description:
          "Use the ferry as the experience, walk the promenade and stay for the 8 p.m. light show only if the family wants it. This is the strongest low-friction first evening.",
        links: [
          {
            title: "Star Ferry",
            url: "https://www.starferry.com.hk/en/service",
          },
          {
            title: "Tsim Sha Tsui promenade",
            url: "https://www.discoverhongkong.com/eng/attractions/top-things-to-see-and-do-around-tsim-sha-tsui-promenade.html",
          },
        ],
      },
      {
        title: "Tai Kwun + Central",
        timing: "One weekday afternoon and dinner",
        description:
          "Use the heritage and arts compound before exhibitions close, then continue through Central for dinner. Keep the route compact rather than adding another district.",
        links: [
          {
            title: "Tai Kwun visitor information",
            url: "https://app.taikwun.hk/en/visit/visiting_information",
          },
        ],
      },
      {
        title: "Dragon's Back to Big Wave Bay",
        timing: "Thanksgiving if dry",
        description:
          "This roughly five-mile, four-hour moderate hike is the leading active-family plan. Use West Kowloon museums as the honest rain, visibility or energy fallback.",
        links: [
          {
            title: "Dragon's Back guide",
            url: "https://www.discoverhongkong.com/eng/place-to-go/travel-guide-dragon-s-back.html",
          },
        ],
      },
      {
        title: "M+ and West Kowloon",
        timing: "Friday evening or weather fallback",
        description:
          "Current Friday late opening makes M+ especially useful after a light local-hours workday. Recheck the 2027 calendar before relying on it.",
        links: [
          {
            title: "M+ visitor information",
            url: "https://www.mplus.org.hk/en/plan-your-visit/",
          },
        ],
      },
      {
        title: "Compact departure Saturday",
        timing: "Before the overnight flight",
        description:
          "Leave luggage at the hotel and use the harbourfront, Star Ferry, Hong Kong Museum of Art or West Kowloon. Do not schedule Disneyland, Lantau, an island or a long hike.",
      },
    ],
    panels: [
      {
        id: "work-rhythm",
        eyebrow: "November 22–26",
        title: "Three office days, then use the holiday shape",
        description:
          "Five office days would squander this particular week. Monday through Wednesday plus a Friday anchor block is the better default unless a specific office obligation proves otherwise.",
        items: [
          "Keep Monday through Wednesday as the visible office commitment.",
          "Use local daytime Friday for asynchronous work, not a fourth full office day by default.",
          "Avoid live U.S. coverage Friday night if preserving Saturday matters.",
        ],
      },
      {
        eyebrow: "U.S. market calendar",
        title: "Friday's early close is 2 a.m. Saturday locally",
        description:
          "The NYSE is closed Thanksgiving Thursday and closes at 1 p.m. Eastern Friday. In Hong Kong, that Friday session is approximately 10:30 p.m.–2 a.m.; the early close does not create a local Friday afternoon.",
        items: [
          "Prefer asynchronous or Hong Kong-hour work Friday.",
          "Treat any live Friday-night coverage as a conscious trade against Saturday.",
        ],
      },
      {
        eyebrow: "November conditions",
        title: "Usually mild and comparatively dry",
        description:
          "Historical November conditions are roughly 69–76°F with much less rain than summer. Carry a light layer and retain a museum fallback; a late tropical system remains possible.",
      },
      {
        eyebrow: "Place-based learning",
        title: "Homeschool hooks",
        items: [
          "Harbour geography, ferries and the role of Victoria Harbour",
          "Colonial history, the 1997 handover and present-day Hong Kong",
          "Density, vertical transport, housing and public-space tradeoffs",
          "Subtropical ecology on Dragon's Back and the contrast with the city",
        ],
      },
    ],
    bookFirst: [
      "Six-night serviced apartment matched to the actual office",
      "Sunday Singapore → Hong Kong flight",
      "Saturday-night Hong Kong → Auckland itinerary",
      "Only the timed attractions that remain important after the forecast firms",
    ],
    planningNotes: [
      "Confirm the actual office location before selecting Hong Kong Island over Kowloon.",
      "Do not use Friday's late-night U.S. session by default; it would erode Saturday.",
      "Stop Saturday sightseeing at least four hours before the overnight flight.",
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
