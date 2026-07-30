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
    rank: 1,
    shortTitle: "Hook Island reef route",
    title: "Crayfish Beach → Maureen’s Cove",
    eyebrow: "Option 1 · reef-first",
    route:
      "Scamper to Crayfish Beach → reef-heavy northern Hook Island paddle → Maureen’s Cove → Scamper pickup",
    bestWhen:
      "The northern Hook forecast is genuinely calm and settled and Salty Dog approves the tide, landing, rescue, and navigation plan.",
    distanceSummary: "8–12km transfer, plus optional unloaded paddles",
    distanceType: "Provisional planning range—confirm locally",
    camps: "Crayfish Beach · Maureen’s Cove",
    reefVerdict:
      "The only three-day option that can credibly satisfy the trip’s reef-snorkeling priority without adding another day. Plan substantial water time at Crayfish, Manta Ray Bay, and/or Maureen’s Cove—not merely quick swim stops.",
    recommendation:
      "Working first choice, but only inside a truly favorable weather window. If the forecast is mediocre, it stops being first choice.",
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
        title: "Brief, transfer, camp and snorkel at Crayfish",
        description:
          "Complete the Shute Harbour briefing, load two decked doubles onto Scamper, establish camp, then use the best slack-water window for the first serious reef session.",
        bullets: [
          "Rig the boats exactly as they will be paddled loaded.",
          "Confirm child fit, spray decks, tow systems, pumps and communications.",
          "Inspect the next morning’s route across the reef flat.",
        ],
      },
      {
        label: "Day 2",
        title: "Northern Hook reef day",
        description:
          "Paddle early from Crayfish around the approved coastal line, using Manta Ray Bay as the principal snorkel stop if conditions and vessel traffic allow.",
        bullets: [
          "Reassess before committing around Pinnacle Point.",
          "Treat Butterfly Bay as an optional second reef or regroup stop.",
          "Reach Maureen’s Cove with enough water over the reef approach.",
        ],
      },
      {
        label: "Day 3",
        title: "Maureen’s Cove morning and pickup",
        description:
          "Use the tide-driven pickup time as the constraint. Snorkel the cove, make a short unloaded paddle, or retain the morning as weather margin.",
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
        distance: "8–12km",
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
          "Extensive fringing reef metres from camp",
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
      "Whether this route’s reef time meets our high-quality snorkeling standard",
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
    rank: 2,
    shortTitle: "Three-island traverse",
    title: "Whitehaven → Henning → Paddle Bay",
    eyebrow: "Option 2 · expedition shape",
    route:
      "Scamper to South Whitehaven → Henning Island camp → Paddle Bay pickup on South Molle",
    bestWhen:
      "The family and operators support one serious 20–23km day and Scamper’s tide-driven schedule permits a useful Paddle Bay pickup.",
    distanceSummary: "Approximately 29–32km total",
    distanceType: "Official route-planner distances",
    camps: "South Whitehaven · Northern Spit, Henning",
    reefVerdict:
      "Excellent variety and expedition shape, but Whitehaven and Henning do not replace a dedicated high-quality reef day. Pair this route with Bait Reef or choose the Hook Island option.",
    recommendation:
      "Best broad traverse if the family wants three islands and can handle the long middle day. Its final leg is only worthwhile if pickup timing works.",
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
          "Walk the 1.2km Solway circuit.",
          "Do not confuse South Whitehaven with Hill Inlet at the beach’s northern end.",
          "Keep the optional Hill Inlet paddle out of the committed plan.",
        ],
      },
      {
        label: "Day 2",
        title: "Whitehaven to Henning",
        description:
          "A serious 20–23km family day via Solway Passage, Chance Bay and a second operator-selected southern cove before the Henning crossing.",
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
          "Paddle roughly 9km to South Molle only if the pickup time leaves a credible morning. Otherwise arrange pickup from Henning.",
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
        distance: "Approximately 23km",
        type: "Official Ngaro Sea Trail route-planner distance",
      },
      {
        segment: "Henning → Paddle Bay",
        distance: "Approximately 9km",
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
      "Family readiness for a 20–23km loaded day with two real shore breaks",
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
      "Is 20–23km realistic for these loaded tandems and children?",
      "Which second shore break works in the expected wind direction?",
      "Can Scamper collect from Paddle Bay late enough to make Day 3 worthwhile?",
      "What separate day preserves guaranteed high-quality reef snorkeling?",
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
    rank: 3,
    shortTitle: "Modular southern route",
    title: "Whitehaven → Chance → Henning",
    eyebrow: "Option 3 · more modular",
    route:
      "Scamper to South Whitehaven → Chance Bay camp → Henning Island pickup",
    bestWhen:
      "The family wants more even transfer stages, more camp time, a clearer bailout and less dependence on a final Paddle Bay pickup.",
    distanceSummary: "Approximately 23–29km total",
    distanceType: "Official distance plus account-derived planning range",
    camps: "South Whitehaven · Chance Bay",
    reefVerdict:
      "Chance offers useful snorkeling and turtle potential, but this remains less reef-heavy than Hook Island. Keep a dedicated outer-reef plan if reef quality is non-negotiable.",
    recommendation:
      "Operationally the most modular. It gives up the elegant three-island overnight sequence in exchange for better pacing and a real midpoint camp.",
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
          "Do not add 18–20km to Hill Inlet unless every timing variable is unusually favorable.",
        ],
      },
      {
        label: "Day 2",
        title: "Whitehaven to Chance Bay",
        description:
          "An approximately 8km transfer through Solway Passage, leaving substantial time for camp, snorkeling, the walking track and child-led exploration.",
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
          "Plan 15–21km with two deliberate stops before the final traffic-and-current crossing to Henning’s all-tide Northern Spit.",
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
        distance: "Approximately 8km",
        type: "Planning distance from route brief",
      },
      {
        segment: "Chance Bay → Henning",
        distance: "Approximately 15km",
        type: "Official route-planner distance",
      },
      {
        segment: "Chance Bay → Henning with detours",
        distance: "Up to approximately 21km",
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
      "Should the family plan around the 15km figure or a longer real-world day?",
      "How will a separate outer-reef day fit if this option wins?",
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

export const sharedKayakPlanning = {
  source: "Whitsundays Sea Kayak Expedition Options.md",
  party: "Two adults and two children under 12",
  boats: "Two decked double sea kayaks; one adult and one child in each",
  water: "At least 60 litres / 60kg for four people over three days",
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
  reefTour: {
    title: "Explore Bait Reef full-day snorkel",
    url: "https://www.hamiltonisland.com.au/great-barrier-reef/explore-dive-or-snorkel",
    note:
      "The current Hamilton Island tour runs about 8 a.m.–4 p.m., visits two Bait Reef snorkel locations and spends at least 3.5 hours on site. Recheck the 2027 schedule.",
  },
};

export function getKayakOption(slug: string) {
  const option = kayakOptions.find((item) => item.slug === slug);
  if (!option) throw new Error(`Unknown Whitsundays kayak option: ${slug}`);
  return option;
}
