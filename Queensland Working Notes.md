# 42 Weeks — Queensland Working Notes

> Supporting brief for the 2027–28 family sabbatical. Implemented in the primary calendar and two dedicated trip pages on July 29, 2026. `data/trip-plan.json` remains authoritative for dates.
>
> Last researched: July 29, 2026. Flight schedules, attraction calendars, prices, Starlink terms, and marine conditions must be rechecked for October 2027.

## Decision summary

Replace the current concept of spending October 11–24 in Brisbane with two six-night Queensland bases:

1. **Hamilton Island, Sunday, October 10 through Saturday, October 16**
2. **Longreach, Sunday, October 17 through Saturday, October 23**

Use Brisbane only for airport connection nights on October 16 and October 23.

At each principal base:

- Brian works three full days.
- The children homeschool on those same mornings.
- The family reunites for substantial afternoon and evening activities.
- Brian takes Thursday and Friday as vacation.
- Full-day, weather-dependent or logistically involved excursions go on the vacation days.

This produces:

- 6 nights on Hamilton Island
- 6 nights in Longreach
- 2 Brisbane airport nights
- 6 full workdays
- 4 vacation days
- 14 Queensland nights before the October 24 India flight

The concept depends on early-shift work rather than U.S. market hours. A working target is **4:30 a.m.–12:30 p.m. AEST**, with family lunch around 12:30 and activities from approximately 1:30 onward. Exact hours can flex around tours and calls.

## Why this structure is preferred

- The family actually lives in two distinctive Queensland environments rather than commuting to them from Brisbane.
- Hamilton Island supports low-friction afternoon recreation: beach, pools, watersports, wildlife, walking, buggy exploration, and sunsets.
- Longreach is a real town with groceries, services, museums, restaurants, a pool, airport access, and outback experiences. It is a more credible work base than a remote station.
- Three work/homeschool days followed by two vacation days creates a repeatable weekly rhythm.
- Starlink reduces dependence on accommodation Wi-Fi, while existing Wi-Fi and mobile coverage remain essential backups.
- Brisbane is only an airport connection between Hamilton Island and Longreach; the single Brisbane overnight remains October 23 before the India flight.
- India still begins on Sunday, October 24, preserving arrival before Diwali on Friday, October 29.

## Calendar implementation specification

### Existing entries to replace or reinterpret

The current primary calendar contains:

- `travel-melbourne-brisbane` on October 10
- `location-brisbane` from October 11 through October 24
- `travel-brisbane-india` on October 24

Replace the first two with the entries below. Retain the October 24 India travel date, but change its context to reflect the Brisbane airport overnight following Longreach.

### Proposed location and travel entries

| Proposed ID | Type | Start | End | Title | Location | Context / calendar copy | Proposed page |
|---|---|---:|---:|---|---|---|---|
| `travel-melbourne-hamilton-island` | travel | 2027-10-10 |  | Fly Melbourne → Hamilton Island | Hamilton Island | Fly from Melbourne to Hamilton Island, directly if the 2027 schedule permits; otherwise connect through Brisbane. Settle into a family holiday home and test all work connections. | `/trips/hamilton-island-working-week` |
| `location-hamilton-island` | location | 2027-10-10 | 2027-10-16 | Hamilton Island | Hamilton Island | Seven-night Whitsundays living week: three work/homeschool mornings, two full vacation days, and a final Saturday on Hamilton Island. | `/trips/hamilton-island-working-week` |
| `event-hamilton-work-block` | event | 2027-10-11 | 2027-10-13 | Work & homeschool — Hamilton Island | Hamilton Island | Brian works approximately 4:30 a.m.–12:30 p.m.; children homeschool during the morning; family activities begin after lunch. | `/trips/hamilton-island-working-week#work-days` |
| `event-hamilton-vacation-block` | event | 2027-10-14 | 2027-10-15 | Hamilton Island vacation days | Hamilton Island | Reserve the two full days for Whitehaven Beach and Great Barrier Reef excursions; swap days according to marine weather and operator advice. | `/trips/hamilton-island-working-week#vacation-days` |
| `travel-hamilton-island-longreach` | travel | 2027-10-17 |  | Fly Hamilton Island → Brisbane → Longreach | Longreach | Use Sunday morning on Hamilton Island if timing allows, then connect through Brisbane without an overnight. Confirm this against the 2027 flight schedule. | `/trips/hamilton-island-working-week#departure` |
| `location-longreach` | location | 2027-10-17 | 2027-10-22 | Longreach | Longreach | Six-night outback living week: three work/homeschool mornings, afternoon and sunset experiences, and two full vacation days. | `/trips/longreach-outback-working-week` |
| `event-longreach-work-block` | event | 2027-10-18 | 2027-10-20 | Work & homeschool — Longreach | Longreach | Brian works approximately 4:30 a.m.–12:30 p.m.; children homeschool during the morning; use afternoons and evenings for town, heritage, swimming, station, and sunset activities. | `/trips/longreach-outback-working-week#work-days` |
| `event-longreach-vacation-block` | event | 2027-10-21 | 2027-10-22 | Longreach outback vacation days | Longreach | Use the two full days for the major Longreach museums and either a Winton dinosaur day or the best available station/stagecoach program. | `/trips/longreach-outback-working-week#vacation-days` |
| `travel-longreach-brisbane` | travel | 2027-10-23 |  | Fly Longreach → Brisbane | Brisbane Airport | Return to Brisbane and sleep at or beside the airport before the India flight. Do not plan a fragile same-day international connection from Longreach. | `/trips/longreach-outback-working-week#departure` |
| `location-brisbane-airport-oct-23` | location | 2027-10-23 | 2027-10-23 | Brisbane Airport | Brisbane Airport | One-night connection stay before India. |  |
| `travel-brisbane-india` | travel | 2027-10-24 |  | Fly Brisbane → India | India | Depart after the Brisbane airport buffer night; preserve arrival by October 26 or 27 and a buffer before Diwali. |  |
| `location-in-transit-india` | location | 2027-10-24 | 2027-10-24 | In transit | In transit | Overnight travel toward India; exact routing remains to be confirmed. |  |

### Calendar display guidance

- Location bars should emphasize Hamilton Island and Longreach, not Brisbane.
- On the simplified left rail, label the Longreach / October 23 Brisbane connection sequence **Outback**. Brisbane on October 17 is an airport connection within the Hamilton Island → Longreach travel day, not an overnight location.
- The two work blocks and two vacation blocks should be visually distinguishable.
- The calendar card for each location should link to its dedicated page.
- Do not present any flight as nonstop or any attraction as operating until the 2027 timetable is published.
- The location dates are inclusive calendar dates and mean where the family expects to sleep at the end of that date.
- A named multi-stop route may stand in for its individual overnight stops; overnight flights use an explicit `In transit` location.
- Hamilton Island has seven nights, including Saturday, before the Sunday connection to Longreach. Longreach remains a six-night base.

---

# Dedicated page brief: Hamilton Island working week

## Page metadata

- **Proposed route:** `/trips/hamilton-island-working-week`
- **Eyebrow:** Whitsundays · Queensland
- **Title:** Hamilton Island Working Week
- **Dates:** October 10–16, 2027
- **Stay:** 6 nights
- **Workdays:** Monday–Wednesday, October 11–13
- **Vacation days:** Thursday–Friday, October 14–15
- **Departure:** Saturday, October 16 to Brisbane Airport

## Hero summary

Live on Hamilton Island for six nights rather than treating the Whitsundays as a rushed excursion from Brisbane. The first half of the stay follows an early work-and-homeschool rhythm, leaving afternoons open for beaches, watersports, wildlife, walking trails, and island life. Thursday and Friday become full vacation days for the two experiences that justify the trip: Whitehaven Beach and the outer Great Barrier Reef.

Hamilton Island is one of the Whitsunday Islands, so “Hamilton Island” and “the Whitsundays” are not competing destinations. Hamilton is the practical family base within the broader Whitsundays: it has its own airport, groceries, restaurants, family accommodation, resort facilities, and direct access to marine excursions.

## Base and accommodation recommendation

Book a **two- or preferably three-bedroom Hamilton Island Holiday Home**, not a conventional single hotel room.

Required:

- A real door between Brian's workspace and sleeping/living areas
- Air conditioning in the workspace
- Kitchen and laundry
- Table or desk capable of supporting a laptop and portable monitor
- Existing property Wi-Fi as a backup
- Good mobile reception at the exact unit
- A private, permitted outdoor location with a broad view of the sky for Starlink
- Outdoor power strategy or a safe way to route the Starlink cable without creating a trip or weather hazard
- Golf buggy included or reserved
- Enough separation for early work without waking the family

Ask the property manager in writing:

1. May a guest temporarily place a Starlink Mini on the terrace, lawn, or another private outdoor area?
2. Which available unit has the clearest unobstructed sky?
3. Is the assigned unit guaranteed, rather than substituted within a category?
4. What are the measured Wi-Fi download, upload, latency, and reliability?
5. Which mobile carriers work best at that exact unit?
6. Is there a dining table or desk near a closable room?

Official starting points:

- [Hamilton Island accommodation overview](https://www.hamiltonisland.com.au/hotels-and-holiday-homes)
- [Hamilton Island family hub](https://www.hamiltonisland.com.au/family-hub)
- [Hamilton Island airport and current direct-flight gateways](https://www.hamiltonisland.com.au/community-and-development/transport/airport)

## Working-day rhythm

### Monday–Wednesday, October 11–13

Suggested default:

- **4:15 a.m.** Brian wakes and starts work setup
- **4:30 a.m.–12:30 p.m.** Eight-hour work block
- **8:30–11:30 a.m.** Children's structured homeschool block
- **12:30–1:30 p.m.** Lunch and transition
- **1:30–5:30 p.m.** Family activity
- **Evening** Dinner, sunset, reading, or an easy resort activity
- **8:30 p.m.** Begin quiet wind-down so the early work schedule remains sustainable

The purpose of the early shift is not U.S. market coverage. It is to finish serious work while the family completes school and still preserve a large shared part of the day.

### Good workday-afternoon options

Choose one anchor plus unstructured beach or pool time. Do not prebook every afternoon.

- Catseye Beach swimming and beach sports
- Kayak or stand-up paddleboard hire
- Hamilton Island Wildlife
- Mini golf, bowling/arcade, or an art activity
- Buggy exploration and scenic stops
- A short section of the island walking-trail network
- Resort pool and family downtime
- Sunset paddle or sunset cruise if times and children's energy fit
- Passage Peak only if temperature, fitness, daylight, and trail conditions make it sensible; it is a challenging walk, not an automatic after-work stroll

Information:

- [Official family activities](https://www.hamiltonisland.com.au/things-to-do/activities-for-kids-and-family)
- [Official island activities directory](https://www.hamiltonisland.com.au/things-to-do/all-tours-and-activities)
- [Hamilton Island bushwalking guide](https://www.hamiltonisland.com.au/blog/ultimate-guide-to-hamilton-islands-bushwalking-trails)
- [Official walking-trail map](https://www.hamiltonisland.com.au/HamiltonIsland/media/PDF-Files/Activities/Walking-Trail-Map.pdf)

## Vacation-day anchors

### Thursday, October 14 — Whitehaven Beach and Whitsunday Islands

Preferred concept:

- Select a full-day sail/snorkel trip or a strong half-day Whitehaven trip paired with a relaxed island afternoon.
- Prioritize Whitehaven Beach and, if the chosen operator includes it, a Hill Inlet viewpoint.
- Avoid combining a scenic flight, Whitehaven landing, multiple snorkel stops, and a rushed return merely to maximize the checklist.
- Confirm children's minimum ages, swimming expectations, seasickness precautions, included stinger suits, footwear, shade, food, and cancellation policy.

Starting point:

- [Hamilton Island tours and activities, including Whitehaven options](https://www.hamiltonisland.com.au/things-to-do/all-tours-and-activities)

### Friday, October 15 — Outer Great Barrier Reef

Preferred concept:

- Reserve a full day for an outer-reef trip with snorkeling and reef interpretation.
- Choose an operator and vessel appropriate for the children rather than the most aggressive dive-oriented itinerary.
- Ask where the operator expects to visit, how much time is actually spent in the water, whether flotation devices and prescription masks are available, and what happens in marginal weather.
- Treat this as weather-dependent. Whitehaven and reef days may be swapped.

Starting points:

- [Hamilton Island Great Barrier Reef and Whitsundays activity directory](https://www.hamiltonisland.com.au/things-to-do)
- [Official family activities page, including Reefworld and reef-trip examples](https://www.hamiltonisland.com.au/things-to-do/activities-for-kids-and-family)

## Arrival and departure

### Sunday, October 10

- Fly Melbourne to Hamilton Island directly if the 2027 schedule permits.
- If no sensible nonstop exists, connect through Brisbane.
- Keep the arrival day deliberately light.
- Buy groceries, learn the buggy and shuttle system, inspect the Starlink location, test the corporate VPN, test a real video call, and establish the school/work zones.
- Do not schedule a paid marine excursion on arrival day.

### Saturday, October 16

- Preserve an easy final morning.
- Fly Hamilton Island to Brisbane.
- Stay at or beside Brisbane Airport.
- Do not attempt to connect onward to Longreach unless the published 2027 schedule provides a genuinely comfortable protected connection.

Current route context, not a 2027 promise:

- Hamilton Island currently receives direct service from Melbourne and Brisbane.
- [Hamilton Island Airport](https://www.hamiltonisland.com.au/community-and-development/transport/airport)

## Weather and water safety

October is generally warm and popular, but it is also the beginning of the commonly described marine-stinger season.

- Use full stinger suits when recommended by operators or local authorities.
- Follow current beach, lifeguard, and tour-operator advice.
- Do not interpret “shoulder season” as zero stinger risk.
- Protect reef days with a weather-aware cancellation or rebooking policy.
- Avoid putting the Starlink dish where salt spray, children, resort traffic, or a buggy could damage it.

Information:

- [Hamilton Island weather](https://www.hamiltonisland.com.au/destination/weather)
- [Whitsundays visitor FAQ: seasons, stingers, connectivity, and airports](https://www.tourismwhitsundays.com.au/plan/visitor-information/faqs)

## Homeschool hooks

The location can supply material for:

- Coral anatomy, symbiosis, bleaching, and reef resilience
- Great Barrier Reef geography and marine-park management
- Tides, navigation, wind, and weather
- Island ecology and invasive-species management
- Marine food webs and animal adaptation
- Ngaro and Gia connections to sea country
- Tourism, conservation, and the economics of a resort island
- Field journaling, species sketches, mapping, and trip-cost mathematics

Keep formal school to approximately three morning hours. Use the reef and island experiences as place-based science and geography rather than adding a second academic day afterward.

## Hamilton booking priorities

1. Holiday home with a separate work room and written Starlink permission
2. Melbourne → Hamilton Island flight
3. Hamilton Island → Brisbane flight
4. Whitehaven excursion
5. Outer-reef excursion
6. Brisbane airport hotel for October 16
7. Buggy if not included
8. Travel insurance covering marine-tour weather disruption

---

# Dedicated page brief: Longreach outback working week

## Page metadata

- **Proposed route:** `/trips/longreach-outback-working-week`
- **Eyebrow:** Outback Queensland
- **Title:** Longreach Outback Working Week
- **Dates:** October 17–23, 2027
- **Stay:** 6 nights
- **Workdays:** Monday–Wednesday, October 18–20
- **Vacation days:** Thursday–Friday, October 21–22
- **Departure:** Saturday, October 23 to Brisbane Airport

## Hero summary

Spend six nights living in a functioning outback town rather than attempting a high-speed road loop. Longreach combines red-dirt landscape and station culture with the practical infrastructure required for work and homeschool: an airport, groceries, family accommodation, museums, restaurants, a public pool, tour operators, and existing internet.

The first three mornings are for work and homeschool; afternoons and evenings introduce the family to the town, the Thomson River, nearby Ilfracombe, station life, and outback sunsets. Two vacation days hold the major museums and the best available full-day experience. Winton is an option, not an obligation.

## Why Longreach

- Direct air link with Brisbane in current schedules
- Qantas Founders Museum
- Australian Stockman's Hall of Fame
- Established outback tour operators
- Sunset river and station experiences
- Family accommodation and food supplies
- A public swimming pool in a hot part of the year
- Approximately 180 km / 1 hour 45 minutes from Winton under ordinary conditions
- More reliable work logistics than a remote station, while still providing access to station experiences

Information:

- [Longreach destination overview](https://www.outbackqueensland.com.au/town/longreach/)
- [Queensland's family-oriented four-day Longreach itinerary](https://www.queensland.com/au/en/plan-your-holiday/itineraries/4-day-longreach-itinerary-families)
- [Longreach visitor information and seasonal warning](https://experiencelongreach.com.au/contact/)

## Base and accommodation recommendation

### Leading option: Saltbush Retreat

Prefer a **two-bedroom house or two-bedroom cabin**, not separate studio huts.

Why it leads:

- Self-contained kitchen
- Family configuration
- Existing Wi-Fi
- Pool
- Laundry/business facilities listed
- Verandah and outdoor space
- Very close to the Qantas Founders Museum and Stockman's Hall of Fame
- Outback character without sacrificing town infrastructure

Starting points:

- [Saltbush Retreat overview](https://www.outbackqueensland.com.au/accommodation/saltbush-retreat/)
- [Saltbush two-bedroom cabins and house](https://saltbushretreat.com.au/accommodation/outback-cabins/)

### Practical backup: Longreach Motor Inn

The renovated two-bedroom family room is less atmospheric but advertises unlimited high-speed Wi-Fi and provides a useful fallback if Saltbush cannot guarantee workspace or Starlink placement.

- [Longreach Motor Inn family room](https://www.longreachmotorinn.com.au/rooms/2-bedroom-family-room-queen-4-single-new.html)
- [Longreach Motor Inn facilities](https://www.longreachmotorinn.com.au/facilities.html)

### Lodging requirements

- Two bedrooms minimum
- Quiet, air-conditioned work area
- Table or desk for laptop and portable monitor
- Kitchen or strong kitchenette
- Existing high-speed Wi-Fi
- Mobile signal from at least one carrier
- Written permission for temporary Starlink setup
- Unobstructed outdoor sky view
- Safe cable path and weather protection for power connections
- Pool strongly preferred because late October can be hot
- Car parking

Avoid using a remote station as the work base unless it independently confirms:

- Reliable mains or generator power for the full work block
- A permitted and unobstructed Starlink setup
- Air-conditioned workspace
- Safe road access in all expected conditions
- A fallback communication method

Remote-station visits remain excellent afternoon or vacation-day activities.

## Transport

### Sunday, October 17

- Fly Brisbane to Longreach.
- Collect a reserved rental car.
- Buy groceries before shops close.
- Check in, identify the Starlink location, test the corporate VPN, and run a real video-call test.
- Take a short sunset drive or walk only if arrival time and energy permit.

### Saturday, October 23

- Fly Longreach to Brisbane.
- Stay at or beside Brisbane Airport.
- Fly to India on Sunday, October 24.
- Do not attempt Longreach → Brisbane → India on one ticketing day unless a future schedule provides a very large protected margin. The current concept intentionally includes the Brisbane buffer night.

Current route context, not a 2027 promise:

- Longreach currently has Brisbane service.
- [Longreach Airport flight information](https://www.longreachairport.com.au/fly/Flight-Schedules)

## Work and homeschool rhythm

### Monday–Wednesday, October 18–20

Suggested default:

- **4:15 a.m.** Brian wakes and starts work setup
- **4:30 a.m.–12:30 p.m.** Eight-hour work block
- **8:30–11:30 a.m.** Children's structured homeschool block
- **12:30–1:30 p.m.** Lunch and transition
- **1:30 onward** One afternoon or sunset experience

Late October is warmer and some attractions shorten their hours. The working-day plan should therefore emphasize activities that genuinely fit after lunch rather than pretending every museum remains available all afternoon.

### Candidate workday afternoons and evenings

Assign these only after 2027 operating dates and times are published:

- Australian Stockman's Hall of Fame galleries, if afternoon hours permit
- Starlight's Cruise Experience, currently described as a late-afternoon/evening program in the April–October season
- A station sunset experience
- Ilfracombe Machinery Mile and dinner at the historic pub
- Longreach town heritage walk
- Longreach Memorial Pool
- Qantas Luminescent Longreach evening show, if operating
- Sunset and stargazing outside town from a safe, locally recommended location
- Low-key grocery, laundry, pool, and recovery time when the heat or early starts catch up with the family

Information:

- [Starlight's Cruise Experience](https://www.outbackpioneers.com.au/experiences/starlights-cruise-experience/)
- [Longreach sport and recreation, including pool information](https://experiencelongreach.com.au/services/sport-recreation/)
- [Australian Stockman's Hall of Fame](https://stockmanshalloffame.com.au/)

## Vacation-day anchors

The exact order should follow the published 2027 attraction calendar. Current operations show meaningful seasonal changes around early and late October, so the page must not promise a live show or tour that has not been confirmed.

### Thursday, October 21 — Longreach aviation and outback heritage

Preferred anchors:

1. Qantas Founders Museum with a prebooked aircraft/Airpark tour
2. Australian Stockman's Hall of Fame galleries and cinematic experience

These may need to be split across Thursday and a workday afternoon because both are substantial. Current Qantas summer-season hours are shorter after early October, making an early vacation-day visit the safer planning assumption.

Information:

- [Qantas Founders Museum](https://www.qfom.com.au/)
- [Qantas Founders Museum sample itineraries](https://www.qfom.com.au/itineraries)
- [Australian Stockman's Hall of Fame visitor information](https://stockmanshalloffame.com.au/contact/)

### Friday, October 22 — choose one defining outback day

#### Option A: Winton dinosaur day

- Drive approximately 180 km each way under normal conditions.
- Prioritize the Australian Age of Dinosaurs and one Winton-town stop.
- Start early, carry water, and avoid adding every attraction.
- Confirm road conditions, vehicle terms, tour times, and heat.

This is best if dinosaurs and geology are a major family interest.

Starting point:

- [Australian Age of Dinosaurs](https://www.australianageofdinosaurs.com/)

#### Option B: Longreach station and pioneer day

- Choose the strongest available combination of a station visit, stagecoach experience, river cruise, or rail experience.
- This avoids 360 km of driving and may provide a more coherent outback-cultural day.
- Prefer experiences with substantive interpretation over a sequence of shows.

Starting points:

- [Outback Pioneers experiences](https://www.outbackpioneers.com.au/)
- [Longreach tour operators](https://experiencelongreach.com.au/longreach-tour-companies/)

### Recommendation

Hold Friday as **“Winton or best operating outback experience”** until the 2027 schedules appear. Do not make Winton mandatory merely because it fits on a map.

## Seasonal caution

October 17–23 sits near the shoulder between Longreach's peak and hotter seasons.

- The Longreach visitor center describes April–October as the preferred period but warns that temperatures increase from mid-October.
- Some museums remain open but use shorter summer hours.
- Some live shows have recently ended in early October even when general marketing says “April–October.”
- The Starlight cruise currently advertises Monday–Saturday operation during the April–October season, but its exact final 2027 date must be checked.
- Bookings are essential for museums and tours.

The dedicated page should label attractions as:

- **Anchor:** likely to operate, but verify 2027 hours
- **Seasonal candidate:** do not promise until confirmed
- **Optional:** use only if weather, energy, and timing support it

## Homeschool hooks

Longreach can support:

- Early Australian aviation and the founding of Qantas
- Aircraft design, lift, navigation, and route planning
- Pastoralism, wool, cattle, and water management
- The history and changing representation of stockmen and women
- Iningai history and continuing connection to Country
- Distance education and communications across sparsely populated regions
- Climate, drought, artesian water, and adaptation
- Fossils, geology, and deep time if Winton is chosen
- Latitude, night-sky observation, and the Southern Cross
- Distance, fuel, travel-time, and scale calculations

The children should not be expected to complete a full conventional school day and then treat every museum as additional work. Use field notes, mapping, a short daily reflection, and one deeper project across the week.

## Longreach booking priorities

1. Brisbane → Longreach and Longreach → Brisbane flights
2. Six-night family accommodation with written Starlink permission
3. Rental car
4. Brisbane airport hotel for October 23
5. Qantas Founders Museum and aircraft tour
6. Australian Stockman's Hall of Fame
7. Best available sunset/river/station experience
8. Winton tour slot if Option A is chosen

---

# Starlink and work implementation

## Intended hardware

The **Starlink Mini** is the most practical version for this trip because it is compact and integrates the router.

Current published specifications:

- Approximately 1.53 kg with kickstand and 15 m cable
- Approximately 25–40 W average power use
- 12–48 V, 60 W input rating
- A 100 W, 20 V/5 A USB-C PD source is required when using Starlink's USB-C-to-barrel accessory
- IP67 environmental rating with the correct cable installed
- 110-degree field of view

Official references:

- [Starlink Mini specification sheet](https://www.starlink.com/public-files/specification_sheet_mini.pdf)
- [Starlink Mini setup guide](https://www.starlink.com/public-files/installation_guide_mini_kit.pdf)
- [Starlink obstruction guidance](https://starlink.com/pr/support/article/bcbf0078-be81-d345-4bce-ebbcfa196f56)

## “Work anywhere” limitations

Starlink substantially expands the viable lodging set, but it does not literally work anywhere.

It still needs:

- A broad, unobstructed view of the sky
- Permission to place the dish outside
- Reliable power
- A safe cable route
- Protection from vehicles, children, foot traffic, salt spray, animals, and theft
- A plan for heat and severe weather
- A country and service plan in which use is authorized

Trees, roofs, covered balconies, walls, and poles can create brief interruptions that are especially visible on VPN sessions and video calls.

## Plan and legal caveats

Under current Starlink materials:

- Roam plans are intended for international travel and currently describe use outside the home country for up to 60 days per trip.
- Current consumer Roam terms say the plan is not permitted for business or enterprise use.
- Roam performance is deprioritized relative to some fixed or priority services and is not guaranteed.
- International authorization and service rules vary by country.

Therefore:

1. Do not assume a U.S. consumer Roam plan will be a compliant year-long global work solution.
2. Confirm the correct Starlink plan for employer work, potentially a Priority product, shortly before purchase.
3. Confirm employer approval for Starlink, corporate VPN behavior, data handling, and any static-IP requirement.
4. Recheck each destination country on Starlink's availability map.
5. Recheck all terms in 2027; current plan names, data allowances, international limits, and business restrictions may change.

Official references:

- [International Roam guidance](https://starlink.com/au/support/article/0dd1c2c0-7bae-8c8f-43d4-9a64eb66662f)
- [Current service-plan descriptions](https://starlink.com/legal/documents/DOC-DF-1916-61526-56)
- [Current Australia terms](https://starlink.com/legal/documents/DOC-1029-53044-64)

## Redundant connectivity standard

For every work base, require three layers:

1. Starlink
2. Accommodation Wi-Fi
3. Mobile hotspot

Before the first real workday:

- Run the Starlink obstruction scan.
- Leave the dish online long enough to expose recurring obstructions.
- Test the corporate VPN.
- Test authentication tools.
- Hold a video call.
- Upload and download representative work files.
- Confirm a fallback workspace if the family needs the primary room.
- Verify that an accommodation staff member is reachable during Brian's 4:30 a.m. start, or accept that no on-site help will be available then.

Carry:

- Mini and protective travel case
- Original power supply and cable
- Approved USB-C power cable/accessory if used
- 100 W USB-C PD power bank or power station that complies with airline limits when carried
- Plug adapters
- Portable monitor
- Extension lead approved for the destination
- Cable cover or another safe temporary routing solution
- Mobile hotspot/eSIMs from more than one network where practical

Airline battery limits and carry-on rules must be checked for every carrier. Do not put a lithium power bank in checked luggage.

---

# Decisions and checks still required

## Flights

- Confirm Melbourne → Hamilton Island on October 10, 2027.
- Confirm Hamilton Island → Brisbane on October 16.
- Confirm Brisbane → Longreach on October 17.
- Confirm Longreach → Brisbane on October 23.
- Confirm Brisbane → India on October 24.
- Prefer protected, sensible timings over nominally possible tight connections.

## Hamilton Island

- Choose exact holiday home.
- Obtain written Starlink permission.
- Verify workspace, Wi-Fi, mobile signal, and unobstructed sky.
- Choose Whitehaven and reef operators after reviewing 2027 schedules and child requirements.
- Confirm stinger-suit provision and tour weather policies.

## Longreach

- Choose Saltbush unit or practical backup.
- Obtain written Starlink permission.
- Confirm rental car supply and terms.
- Confirm exact late-October 2027 operating dates for:
  - Qantas Founders Museum tours
  - Stockman's Hall galleries, cinematic experience, and live show
  - Starlight's Cruise
  - Stagecoach and station experiences
  - Luminescent Longreach
  - Winton attractions
- Decide Winton versus a second Longreach-based outback day.

## Work

- Confirm employer approval for Australia and satellite internet.
- Confirm the appropriate Starlink plan for business work.
- Test all equipment and VPNs before departure.
- Determine whether 4:30 a.m.–12:30 p.m. is sustainable or whether a later split day is preferable.

## Calendar/page implementation

- [x] Update `data/trip-plan.json` and make this itinerary the new date authority.
- [x] Create the Hamilton Island and Longreach location definitions and colors.
- [x] Add the two dedicated page routes.
- [x] Link the relevant calendar event entries to their pages.
- [x] Update the main website overview to replace the generic Brisbane base.
- [x] Add validation tests for the new calendar titles, dates, links, and dedicated page rendering.

## Final planning principle

Protect the two-base rhythm. If flights or seasonal closures require changes, remove an activity before adding another lodging move. The value of this plan is not maximizing Queensland coverage; it is allowing the family to work, learn, and live for a week in two radically different Queensland environments.
