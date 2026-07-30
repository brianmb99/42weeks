export type KayakPhoto = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  source: string;
};

export type KayakOption = {
  slug: string;
  rank: number;
  stableRouteNumber: number;
  mapSrc: string;
  mapAlt: string;
  shortTitle: string;
  title: string;
  eyebrow: string;
  route: string;
  bestWhen: string;
  distanceSummary: string;
  distanceType: string;
  camps: string;
  reefVerdict: string;
  recommendation: string;
  cost: string;
  photos: KayakPhoto[];
  days: Array<{
    label: string;
    title: string;
    description: string;
    bullets: string[];
  }>;
  distances: Array<{
    segment: string;
    distance: string;
    type: string;
  }>;
  campFacts: Array<{
    name: string;
    facts: string[];
  }>;
  weatherGates: string[];
  bailout: string[];
  questions: string[];
  links: Array<{
    title: string;
    url: string;
  }>;
};

const parks = "https://parks.qld.gov.au/parks/whitsunday-islands/camping";

export const kayakOptions: KayakOption[] = [
  {
    slug: "hook-island-reef",
    rank: 3,
    stableRouteNumber: 1,
    mapSrc: "/images/whitsundays/kayak-routes/route-1-hook-island-reef-v2.png",
    mapAlt: "Conceptual map of the Hook Island route from Crayfish Beach to Maureen’s Cove",
    shortTitle: "Crayfish–Maureen’s Cove",
    title: "Crayfish Beach → Maureen’s Cove",
    eyebrow: "Map route 1 · reef-integrated alternate",
    route:
      "Scamper to Crayfish Beach → reef-heavy northern Hook Island paddle → Maureen’s Cove → Scamper pickup",
    bestWhen:
      "The family deliberately wants reef snorkeling inside the expedition, northern Hook has a genuinely calm forecast, and Salty Dog approves the tide, landing, rescue, and navigation plan.",
    distanceSummary: "5–7 miles transfer, plus optional unloaded paddles",
    distanceType: "Provisional planning range—confirm locally",
    camps: "Crayfish Beach · Maureen’s Cove",
    reefVerdict:
      "Its primary advantage is optional shore snorkeling after camp is established at Crayfish or Maureen’s Cove. Manta Ray Bay and Butterfly Bay are scenic waypoints or possible regroup locations—not scheduled snorkeling stops during the loaded paddle.",
    recommendation:
      "Third under the current separate-snorkeling plan. It rises to first only when reef snorkeling is an intentional expedition objective and northern Hook is genuinely calm.",
    cost: "About A$2,100–A$2,360",
    photos: [
      {
        src: "/images/whitsundays/islands-aerial.jpg",
        alt: "Aerial view of a sheltered bay and green islands in the Whitsundays",
        caption: "Whitsundays water and island terrain",
        credit: "Richard Lin / Unsplash",
        source:
          "https://unsplash.com/photos/an-aerial-view-of-a-body-of-water-surrounded-by-land-HPgMyVHnanw",
      },
      {
        src: "/images/whitsundays/reef-aerial.jpg",
        alt: "Aerial view of blue water and Great Barrier Reef formations",
        caption: "Great Barrier Reef from above",
        credit: "Lorenzo Angeli / Unsplash",
        source:
          "https://unsplash.com/photos/an-aerial-view-of-the-great-barrier-reef-giCtF3YtEtc",
      },
      {
        src: "/images/whitsundays/coral-aerial.jpg",
        alt: "Aerial view of live coral patterns beneath clear ocean water",
        caption: "Live coral on the Great Barrier Reef",
        credit: "GeoNadir / Unsplash",
        source:
          "https://unsplash.com/photos/an-aerial-view-of-a-coral-reef-in-the-ocean-eQZAqg-4sQQ",
      },
    ],
    days: [
      {
        label: "Day 1",
        title: "Brief, transfer and camp at Crayfish",
        description:
          "Complete the Shute Harbour briefing, load two decked doubles onto Scamper and establish camp. Consider an easy shore snorkel only after camp is secure and only if tide, visibility, energy and daylight cooperate.",
        bullets: [
          "Rig the boats exactly as they will be paddled loaded.",
          "Confirm child fit, spray decks, tow systems, pumps and communications.",
          "Inspect the next morning’s route across the reef flat.",
        ],
      },
      {
        label: "Day 2",
        title: "Northern Hook camp-transfer paddle",
        description:
          "Paddle early from Crayfish around the operator-approved coastal line. Do not schedule a loaded-paddle snorkel stop at Manta Ray Bay or Butterfly Bay.",
        bullets: [
          "Reassess before committing around Pinnacle Point.",
          "Treat Manta Ray Bay and Butterfly Bay as scenic waypoints or operator-approved regroup locations.",
          "Reach Maureen’s Cove with enough water over the reef approach.",
        ],
      },
      {
        label: "Day 3",
        title: "Maureen’s Cove morning and pickup",
        description:
          "Use the tide-driven pickup time as the constraint. Consider an easy camp-based shore snorkel, make a short unloaded paddle, or retain the morning as weather margin.",
        bullets: [
          "Do not land at seasonally closed Steens Beach in October.",
          "Pack early enough that the Scamper pickup is never rushed.",
          "Return to the mainland for the next day’s flight to Outback Queensland.",
        ],
      },
    ],
    distances: [
      {
        segment: "Crayfish → Maureen’s Cove coastal route",
        distance: "5–7 miles",
        type: "Provisional planning range—confirm locally",
      },
      {
        segment: "Optional camp-based paddles",
        distance: "Variable",
        type: "Operator-approved, conditions dependent",
      },
    ],
    campFacts: [
      {
        name: "Crayfish Beach",
        facts: [
          "Maximum 12 people; composting toilet only",
          "No mobile reception",
          "Mid-to-high-tide shallow-craft landing",
          "Extensive fringing reef just offshore from camp",
        ],
      },
      {
        name: "Maureen’s Cove",
        facts: [
          "Maximum 24 people; toilet and picnic tables",
          "No mobile reception",
          "Sheltered from south-easterlies, exposed to strong northerlies",
          "Fringing reef on both sides of the cove",
        ],
      },
    ],
    weatherGates: [
      "Light winds, low swell, good visibility and no squall or thunderstorm risk",
      "No material wind-against-tide problem around the exposed points",
      "A workable mid-to-high-tide launch and landing sequence",
      "Explicit Salty Dog approval of the route for the family and loaded tandems",
    ],
    bailout: [
      "Before Pinnacle Point: return to Crayfish.",
      "After committing north: use the sheltered bay named in the local briefing; do not assume an immediate pickup.",
      "If northerlies build: reconsider Maureen’s Cove despite its south-easterly shelter.",
      "If the coast is unsuitable before launch: base-camp at Crayfish or switch routes before Scamper departs.",
    ],
    questions: [
      "Exact approved chart line and useful landing beaches",
      "Children’s participation and adult solo-control expectations",
      "Actual wind, swell and tide limits",
      "Whether camp-based shore snorkeling is worthwhile in the expected tide and visibility",
      "Scamper’s October 2027 drop and pickup sequence",
    ],
    links: [
      {
        title: "Crayfish Beach",
        url: `${parks}/crayfish-beach-hook-island`,
      },
      {
        title: "Maureen’s Cove",
        url: `${parks}/maureens-cove-hook-island`,
      },
      {
        title: "Steens seasonal closure",
        url: `${parks}/steens-beach-hook-island`,
      },
      {
        title: "Whitsundays public moorings map",
        url: "https://elibrary.gbrmpa.gov.au/jspui/retrieve/c44bbc38-d911-46b7-9f95-38c26a2b02af/2024-11-Public-Moorings-Map-Whitsundays.pdf",
      },
    ],
  },
  {
    slug: "whitehaven-henning-paddle",
    rank: 1,
    stableRouteNumber: 2,
    mapSrc: "/images/whitsundays/kayak-routes/route-2-whitehaven-henning-paddle-bay.png",
    mapAlt: "Conceptual map of the Whitehaven, Henning and Paddle Bay kayak route",
    shortTitle: "Whitehaven–Henning–Paddle Bay",
    title: "Whitehaven → Henning → Paddle Bay",
    eyebrow: "Preferred paddling expedition · map route 2",
    route:
      "Scamper to South Whitehaven → Henning Island camp → Paddle Bay pickup on South Molle",
    bestWhen:
      "The family and operators support one serious 12–14 mile day and Scamper’s tide-driven schedule permits a useful Paddle Bay pickup.",
    distanceSummary: "Approximately 18–20 miles total",
    distanceType: "Official route-planner distances",
    camps: "South Whitehaven · Northern Spit, Henning",
    reefVerdict:
      "Keep the important snorkeling on the separate boat-based outer-reef day. This expedition should focus on paddling, Whitehaven, two camps, planned shore breaks and the three-island journey.",
    recommendation:
      "Current first choice, provided Salty Dog approves the loaded 12–14 mile day and Scamper can provide a useful Paddle Bay pickup.",
    cost: "About A$1,750–A$2,000",
    photos: [
      {
        src: "/images/whitsundays/whitehaven-beach.jpg",
        alt: "White sand, blue water and green headlands at Whitehaven Beach",
        caption: "Whitehaven Beach",
        credit: "Zhimai Zhang / Unsplash",
        source:
          "https://unsplash.com/photos/land-in-a-body-of-water-during-daytime-2vl2xFZyiJo",
      },
      {
        src: "/images/whitsundays/hill-inlet.jpg",
        alt: "Turquoise water, sand and forested hills at Hill Inlet",
        caption: "Hill Inlet, Whitsunday Island",
        credit: "N Storey / Unsplash",
        source:
          "https://unsplash.com/photos/body-of-water-near-mountain-during-daytime-4xLVht2hAgM",
      },
      {
        src: "/images/whitsundays/whitehaven-sailboat.jpg",
        alt: "Family sailboat anchored near Whitehaven Beach",
        caption: "Among the Whitsunday Islands",
        credit: "Florian de Graaf / Unsplash",
        source:
          "https://unsplash.com/photos/white-sail-boat-on-sea-during-daytime-9HgJG4CS-_E",
      },
    ],
    days: [
      {
        label: "Day 1",
        title: "South Whitehaven camp",
        description:
          "Scamper drops the family at an all-tide landing. Establish camp, complete the loaded-boat check and enjoy Whitehaven after most day boats leave.",
        bullets: [
          "Walk the ¾-mile Solway circuit.",
          "Do not confuse South Whitehaven with Hill Inlet at the beach’s northern end.",
          "Keep the optional Hill Inlet paddle out of the committed plan.",
        ],
      },
      {
        label: "Day 2",
        title: "Whitehaven to Henning",
        description:
          "A serious 12–14 mile family day via Solway Passage, Chance Bay and a second operator-selected southern cove before the Henning crossing.",
        bullets: [
          "Time Solway Passage for wind and current.",
          "Use Chance as the first planned shore break if access is workable.",
          "Cross the Hamilton/Fitzalan traffic area as a tight two-boat group.",
        ],
      },
      {
        label: "Day 3",
        title: "Henning to Paddle Bay",
        description:
          "Paddle roughly 5½ miles to South Molle only if the pickup time leaves a credible morning. Otherwise arrange pickup from Henning.",
        bullets: [
          "Northern Spit gives all-tide access and mobile reception.",
          "Paddle Bay itself needs a useful mid-to-high tide.",
          "A short South Molle walk is a bonus, not a scheduling assumption.",
        ],
      },
    ],
    distances: [
      {
        segment: "Whitehaven → Henning",
        distance: "Approximately 14 miles",
        type: "Official Ngaro Sea Trail route-planner distance",
      },
      {
        segment: "Henning → Paddle Bay",
        distance: "Approximately 5½ miles",
        type: "Official Ngaro Sea Trail route-planner distance",
      },
    ],
    campFacts: [
      {
        name: "South Whitehaven",
        facts: [
          "All-tide landing; maximum 36 people",
          "Hybrid toilets and a communal sheltered table",
          "No drinking water or mobile reception",
          "Iconic scenery, but weaker snorkeling than Hook Island",
        ],
      },
      {
        name: "Northern Spit, Henning",
        facts: [
          "Maximum 18 people; toilet and picnic tables",
          "All-tide landing and generally usable mobile reception",
          "Hamilton Island remains visible",
          "Wind, current and commercial traffic still matter",
        ],
      },
    ],
    weatherGates: [
      "A safe Solway Passage tide and wind combination",
      "Family readiness for a serious 12–14 mile loaded day with two planned shore breaks",
      "A clearly identified second rest/bailout beach",
      "A useful Paddle Bay tide and Scamper pickup time",
    ],
    bailout: [
      "Chance Bay can become the overnight stop if the route must shorten.",
      "Use the second operator-selected southern cove for the final go/no-go decision.",
      "Do not treat Hamilton Island resort facilities as a casual landing.",
      "Delete the Paddle Bay leg and collect from Henning if timing is poor.",
    ],
    questions: [
      "Is 12–14 miles realistic for these loaded tandems and children?",
      "Which second shore break works in the expected wind direction?",
      "Can Scamper collect from Paddle Bay late enough to make Day 3 worthwhile?",
      "Can the Wednesday Hardy Reef day and Thursday departure both be confirmed?",
    ],
    links: [
      {
        title: "Whitehaven Beach camping",
        url: `${parks}/whitehaven-beach-whitsunday-island`,
      },
      {
        title: "Northern Spit, Henning",
        url: `${parks}/northern-spit-henning-island`,
      },
      {
        title: "Paddle Bay",
        url: "https://parks.qld.gov.au/parks/molle-islands/camping/paddle-bay",
      },
      {
        title: "Official Ngaro Sea Trail map",
        url: "https://parks.qld.gov.au/__data/assets/pdf_file/0022/162652/wnst-map.pdf",
      },
    ],
  },
  {
    slug: "whitehaven-chance-henning",
    rank: 2,
    stableRouteNumber: 3,
    mapSrc: "/images/whitsundays/kayak-routes/route-3-whitehaven-chance-henning.png",
    mapAlt: "Conceptual map of the Whitehaven, Chance Bay and Henning kayak route",
    shortTitle: "Whitehaven–Chance–Henning",
    title: "Whitehaven → Chance → Henning",
    eyebrow: "Balanced fallback · map route 3",
    route:
      "Scamper to South Whitehaven → Chance Bay camp → Henning Island pickup",
    bestWhen:
      "The family wants more even transfer stages, more camp time, a clearer bailout and less dependence on a final Paddle Bay pickup.",
    distanceSummary: "Approximately 14–18 miles total",
    distanceType: "Official distance plus account-derived planning range",
    camps: "South Whitehaven · Chance Bay",
    reefVerdict:
      "Keep the important snorkeling on the separate boat-based outer-reef day. Any swim or exploratory snorkel at Chance is optional and should not shape the route timing.",
    recommendation:
      "Current second choice: the operationally simpler fallback when the long Route 2 day or Paddle Bay pickup is unattractive.",
    cost: "About A$1,820–A$2,070",
    photos: [
      {
        src: "/images/whitsundays/hill-inlet-aerial.jpg",
        alt: "Aerial view of Hill Inlet and Whitehaven Beach",
        caption: "Hill Inlet and Whitehaven Beach",
        credit: "Lochie Riordan / Unsplash",
        source:
          "https://unsplash.com/photos/aerial-view-of-lake-and-mountains-during-daytime-OaOzYu0ygco",
      },
      {
        src: "/images/whitsundays/whitehaven-lookout.jpg",
        alt: "Whitehaven Beach and turquoise water viewed from a lookout",
        caption: "Whitehaven from above",
        credit: "Romain Terpreau / Unsplash",
        source:
          "https://unsplash.com/photos/brown-wooden-fence-near-body-of-water-during-daytime-fRISxkaIVcY",
      },
      {
        src: "/images/whitsundays/whitehaven-small-boat.jpg",
        alt: "Small white boat pulled onto Whitehaven Beach",
        caption: "A small-craft landing at Whitehaven",
        credit: "Zhimai Zhang / Unsplash",
        source:
          "https://unsplash.com/photos/white-raft-on-shore-1dKibmL4Klg",
      },
    ],
    days: [
      {
        label: "Day 1",
        title: "South Whitehaven camp",
        description:
          "Use the all-tide landing, establish camp and enjoy the beach and Solway walk. The optional Hill Inlet return paddle stays optional.",
        bullets: [
          "Complete the loaded-boat check.",
          "Protect time for Whitehaven after the day boats leave.",
          "Do not add an 11–12½ mile Hill Inlet round trip unless every timing variable is unusually favorable.",
        ],
      },
      {
        label: "Day 2",
        title: "Whitehaven to Chance Bay",
        description:
          "An approximately 5-mile transfer through Solway Passage, leaving substantial time for camp, snorkeling, the walking track and child-led exploration.",
        bullets: [
          "Approach Chance around the useful tide level.",
          "Use protected southern coves as optional micro-stops.",
          "If conditions deteriorate, Chance is already a credible endpoint.",
        ],
      },
      {
        label: "Day 3",
        title: "Chance Bay to Henning",
        description:
          "Plan 9–13 miles with two deliberate stops before the final traffic-and-current crossing to Henning’s all-tide Northern Spit.",
        bullets: [
          "Stop first near Turtle Bay or another approved southern cove.",
          "Make the second stop the honest pre-crossing decision point.",
          "Finish at Henning for a simpler pickup with mobile reception.",
        ],
      },
    ],
    distances: [
      {
        segment: "Whitehaven → Chance Bay",
        distance: "Approximately 5 miles",
        type: "Planning distance from route brief",
      },
      {
        segment: "Chance Bay → Henning",
        distance: "Approximately 9 miles",
        type: "Official route-planner distance",
      },
      {
        segment: "Chance Bay → Henning with detours",
        distance: "Up to approximately 13 miles",
        type: "Account-derived planning range—confirm locally",
      },
    ],
    campFacts: [
      {
        name: "South Whitehaven",
        facts: [
          "All-tide landing and iconic beach setting",
          "No drinking water or mobile reception",
          "Solway walk and beach time",
          "Weaker snorkeling than Hook Island",
        ],
      },
      {
        name: "Chance Bay",
        facts: [
          "Four sites; maximum 12 people",
          "Toilet, picnic tables and timber tent platforms",
          "No mobile reception",
          "Good snorkeling and frequent turtle sightings",
        ],
      },
    ],
    weatherGates: [
      "Safe Solway Passage timing",
      "A workable Chance Bay landing—especially in south-easterlies",
      "Two approved stop beaches on the final day",
      "A clear current and traffic plan for the Henning crossing",
    ],
    bailout: [
      "Chance is both a destination and a natural shortening point.",
      "The southern-cove stops create two real reassessment opportunities.",
      "Stay at the agreed bailout site rather than forcing a late crossing.",
      "Use Henning’s all-tide landing and mobile reception for pickup.",
    ],
    questions: [
      "Which southern Whitsunday coves are suitable in the forecast wind?",
      "Is Chance access workable at the required time?",
      "Should the family plan around the 9-mile figure or a longer real-world day?",
      "Can the Wednesday Hardy Reef day and Thursday departure both be confirmed?",
    ],
    links: [
      {
        title: "Whitehaven Beach camping",
        url: `${parks}/whitehaven-beach-whitsunday-island`,
      },
      {
        title: "Chance Bay",
        url: `${parks}/chance-bay-whitsunday-island`,
      },
      {
        title: "Northern Spit, Henning",
        url: `${parks}/northern-spit-henning-island`,
      },
      {
        title: "Official Ngaro Sea Trail map",
        url: "https://parks.qld.gov.au/__data/assets/pdf_file/0022/162652/wnst-map.pdf",
      },
    ],
  },
];

export const rankedKayakOptions = [...kayakOptions].sort(
  (left, right) => left.rank - right.rank,
);

export const sharedKayakPlanning = {
  source: "Whitsundays Sea Kayak Expedition Options.md",
  party: "Two adults and two children under 12",
  boats: "Two decked double sea kayaks; one adult and one child in each",
  water: "At least 16 gallons / about 133 pounds for four people over three days",
  operators: [
    {
      title: "Salty Dog sea-kayak hire",
      url: "https://www.saltydog.com.au/hire-and-rentals/",
    },
    {
      title: "Scamper camp transfers",
      url: "https://www.whitsundaycamping.com.au/camp-locations/",
    },
    {
      title: "Scamper departure schedule",
      url: "https://www.whitsundaycamping.com.au/scheduled-departures/",
    },
    {
      title: "Queensland Parks camping permits",
      url: "https://book.parks.qld.gov.au/",
    },
  ],
  safety: [
    "Every paddler must attend Salty Dog’s Shute Harbour briefing.",
    "The adults must be proficient in loaded-tandem open-water rescue and navigation.",
    "Carry PLB, satellite messaging or phone, marine VHF, waterproof Telstra phones, charts and compasses.",
    "Do not buy permits until Salty Dog and Scamper confirm the same route, direction, dates and tide windows.",
  ],
  mapQualification:
    "This is a conceptual itinerary overlay, not a navigation chart. Final routing around coral, shoals, tide gates, landing hazards, currents, and vessel traffic must come from Salty Dog’s charts and briefing.",
  snorkelingDecision: {
    title: "Separate the serious snorkeling from the kayak expedition",
    summary:
      "Move from Hamilton Island to the mainland on Tuesday evening, optionally work about 4:30–7:00 a.m. Wednesday before a dedicated boat-based outer-reef day, then begin the Thursday–Saturday kayak expedition after the Shute Harbour briefing.",
    reasons: [
      "The kayak routes can focus on paddling, beaches, walks, primitive camps and tide-driven transfers.",
      "The family’s only major reef experience no longer depends on the narrower weather window for northern Hook.",
      "Loaded kayaks do not need to be left drifting or managed by one adult while the other adult-child pair snorkels.",
    ],
  },
  reefTour: {
    title: "Cruise Whitsundays Great Barrier Reef Full Day Adventure",
    url: "https://www.cruisewhitsundays.com/experiences/great-barrier-reef-full-day-adventure/",
    note:
      "Current 2026 planning proxy: Port of Airlie 8:00 a.m.–6:10 p.m., with about four hours at Hardy Reef, snorkeling gear and stinger suits included. Recheck the October 2027 schedule and child participation before booking.",
  },
  hamiltonReefTour: {
    title: "Explore Bait Reef full-day snorkel",
    url: "https://www.hamiltonisland.com.au/great-barrier-reef/explore-dive-or-snorkel",
    note:
      "A strong alternative if the trip remains Hamilton-based: the current schedule is about 8:00 a.m.–4:00 p.m., with two Bait Reef snorkel sites and at least 3.5 hours on location. It complicates the mainland briefing and transfer sequence.",
  },
  bookingSequence: [
    "Ask Salty Dog for preliminary approval of the family, two loaded decked doubles and all three route concepts.",
    "Ask Scamper which camp pairs and pickup points are serviceable on the candidate dates, including kayak carriage and tide constraints.",
    "Hold or book the matching Scamper transfer.",
    "Book the matching Queensland Parks permits immediately.",
    "Secure the exact two double kayaks and the Shute Harbour briefing slot.",
    "Confirm that every reservation uses the same direction, dates, camp sequence and pickup point.",
  ],
  bookingTiming: [
    "Contact Salty Dog and Scamper now; ask when their October 2027 schedules open.",
    "Start checking Queensland Parks at 12 months, around October 10, 2026.",
    "Treat November 10, 2026—the 11-month mark—as the latest likely permit-release point under the Whitsundays-specific guidance.",
    "Chance Bay is the likely capacity bottleneck; on the July 30, 2026 comparison check it had space for only two more people while the other route camps still had room for four.",
  ],
  weatherStrategy: [
    "Book one coherent primary route and ask both operators which fallback they can support.",
    "Do not wait for the seven-day forecast before reserving camps; the useful forecast arrives far too late.",
    "At the final forecast check, switch only to a backup that has operator support, matching transfer logistics and real permit availability.",
    "Northern Hook requires both a deliberately reef-oriented trip and a genuinely calm forecast; calm weather alone does not make it the preferred route.",
  ],
  planningLinks: [
    {
      title: "Salty Dog contact",
      url: "https://www.saltydog.com.au/contact/",
    },
    {
      title: "Salty Dog policies",
      url: "https://www.saltydog.com.au/policies/",
    },
    {
      title: "Scamper equipment and kayak carriage",
      url: "https://www.whitsundaycamping.com.au/equipment/",
    },
    {
      title: "Scamper terms",
      url: "https://www.whitsundaycamping.com.au/terms-conditions/",
    },
    {
      title: "Queensland camping bookings",
      url: "https://parks.qld.gov.au/camping/bookings",
    },
    {
      title: "Whitsundays maps and resources",
      url: "https://parks.qld.gov.au/parks/whitsunday-islands/maps-resources",
    },
    {
      title: "Mackay Coastal Waters forecast",
      url: "https://www.bom.gov.au/qld/forecasts/mackay-coast.shtml",
    },
    {
      title: "Queensland Parks alerts",
      url: "https://parks.qld.gov.au/park-alerts",
    },
    {
      title: "Whitsunday Group zoning map",
      url: "https://elibrary.gbrmpa.gov.au/jspui/retrieve/4fa6bf02-9ceb-499b-b34a-42f4004cfd01/WEB_Map%2010A%20_Merge.pdf",
    },
  ],
};

export function getKayakOption(slug: string) {
  const option = kayakOptions.find((item) => item.slug === slug);
  if (!option) throw new Error(`Unknown Whitsundays kayak option: ${slug}`);
  return option;
}
