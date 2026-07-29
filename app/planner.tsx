"use client";

import {
  type CSSProperties,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Stop = {
  id: string;
  name: string;
  shortName: string;
  eyebrow: string;
  window: string;
  startLabel: string;
  startISO: string;
  endISO: string;
  days: number;
  color: string;
  purpose: string;
  highlights: string[];
  questions: string[];
  resources?: {
    title: string;
    detail: string;
    href?: string;
  }[];
};

type Note = {
  id: string;
  placeId: string;
  text: string;
  createdAt: string;
};

const stops: Stop[] = [
  {
    id: "melbourne",
    name: "Melbourne",
    shortName: "MEL",
    eyebrow: "Victoria · Australia",
    window: "Sep 9–Oct 3, 2027",
    startLabel: "Sep 9",
    startISO: "2027-09-09",
    endISO: "2027-10-03",
    days: 25,
    color: "#d3523e",
    purpose: "Land softly, live in a neighborhood, and make footy the opening ritual.",
    highlights: ["AFL Grand Final", "MCG", "Neighborhood life"],
    questions: ["Which neighborhood balances MCG access and daily life?", "How do we approach finals tickets?"],
  },
  {
    id: "brisbane",
    name: "Brisbane area",
    shortName: "BNE",
    eyebrow: "Queensland · Australia",
    window: "Oct 4–26, 2027",
    startLabel: "Oct 4",
    startISO: "2027-10-04",
    endISO: "2027-10-26",
    days: 23,
    color: "#e49b39",
    purpose: "Trade city spring for warmth, water, and a stable Queensland base.",
    highlights: ["Brisbane vs. Gold Coast", "Whitsundays option", "Outdoor rhythm"],
    questions: ["Brisbane, Gold Coast, or another base?", "Is Hamilton Island worth a short side trip?"],
  },
  {
    id: "india",
    name: "India",
    shortName: "IND",
    eyebrow: "Delhi · Dehradun · beyond",
    window: "Oct 27–Nov 9, 2027",
    startLabel: "Oct 27",
    startISO: "2027-10-27",
    endISO: "2027-11-09",
    days: 14,
    color: "#bd5f8b",
    purpose: "Arrive for Diwali, spend meaningful family time, and choose a deliberately selective route.",
    highlights: ["Diwali", "Dehradun family", "Taj Mahal", "Short Himalayan trek"],
    questions: ["How much time should be protected for family?", "Can a trek and Agra fit without turning the leg into a sprint?"],
  },
  {
    id: "singapore",
    name: "Singapore",
    shortName: "SIN",
    eyebrow: "Singapore",
    window: "Nov 10–23, 2027",
    startLabel: "Nov 10",
    startISO: "2027-11-10",
    endISO: "2027-11-23",
    days: 14,
    color: "#258c82",
    purpose: "Use a compact, easy-to-navigate city as a reset and learning-rich base.",
    highlights: ["Food culture", "Gardens", "Easy transit"],
    questions: ["Which neighborhood feels residential?", "What local programs could give the children some routine?"],
  },
  {
    id: "hong-kong",
    name: "Hong Kong",
    shortName: "HKG",
    eyebrow: "Hong Kong",
    window: "Nov 24–Dec 7, 2027",
    startLabel: "Nov 24",
    startISO: "2027-11-24",
    endISO: "2027-12-07",
    days: 14,
    color: "#2d6e9f",
    purpose: "Pair dense city life with hiking, ferries, and strong work-hour overlap.",
    highlights: ["Harbor life", "Country parks", "Work overlap"],
    questions: ["Hong Kong Island, Kowloon, or an outlying base?", "How much living space is enough for two weeks?"],
  },
  {
    id: "japan",
    name: "Japan",
    shortName: "JPN",
    eyebrow: "Tokyo · Kyoto",
    window: "Dec 8–16, 2027",
    startLabel: "Dec 8",
    startISO: "2027-12-08",
    endISO: "2027-12-16",
    days: 9,
    color: "#9b4e62",
    purpose: "Use nine days for an independent Japan trip before returning to New Hampshire for one week.",
    highlights: ["Tokyo", "Kyoto", "Winter illuminations", "Late autumn color"],
    questions: ["How should the nine days divide between Tokyo and Kyoto?", "Fly from Osaka or return to Tokyo before heading to New Hampshire?"],
  },
  {
    id: "new-hampshire",
    name: "New Hampshire",
    shortName: "NH",
    eyebrow: "Hanover · USA",
    window: "Dec 17–23, 2027",
    startLabel: "Dec 17",
    startISO: "2027-12-17",
    endISO: "2027-12-23",
    days: 7,
    color: "#7c88a8",
    purpose: "A one-week home reset for family, mail, winter gear, and a familiar bed.",
    highlights: ["Family reset", "Gear swap", "Home check"],
    questions: ["What needs to be staged at home before the trip begins?", "How do we make the December 23 transfer to Snowbird easy?"],
  },
  {
    id: "snowbird",
    name: "Snowbird",
    shortName: "SB",
    eyebrow: "Utah · USA",
    window: "Dec 24–31, 2027",
    startLabel: "Dec 24",
    startISO: "2027-12-24",
    endISO: "2027-12-31",
    days: 8,
    color: "#667b9b",
    purpose: "Shift into winter mode with a compact family ski week before Europe.",
    highlights: ["Christmas week", "Ski legs", "Family tradition"],
    questions: ["Ship skis, fly with them, or rent for this week?", "What travel plan works on December 24?"],
  },
  {
    id: "alps",
    name: "The Alps",
    shortName: "Alps",
    eyebrow: "Base to be chosen",
    window: "Jan 1–Mar 30, 2028",
    startLabel: "Jan 1",
    startISO: "2028-01-01",
    endISO: "2028-03-30",
    days: 90,
    color: "#3c6380",
    purpose: "Build an ordinary winter life around serious children’s skiing and dependable work.",
    highlights: ["U12 training", "One mountain", "Town life", "Reliable workspace"],
    questions: ["Which base wins on training, community, snow, and value?", "What immigration sequence actually works?"],
  },
  {
    id: "copenhagen",
    name: "Copenhagen",
    shortName: "CPH",
    eyebrow: "Denmark",
    window: "Mar 31–Jun 28, 2028",
    startLabel: "Mar 31",
    startISO: "2028-03-31",
    endISO: "2028-06-28",
    days: 90,
    color: "#2f7c65",
    purpose: "Settle into Danish spring with bikes, ordinary routines, and room for regional exploration.",
    highlights: ["Neighborhood life", "Youth sports", "Bikes", "Nordic spring"],
    questions: ["Which neighborhood best supports family rhythm?", "What travel is lawful after the first Schengen period?"],
    resources: [
      {
        title: "Paris and the Eiffel Tower",
        detail: "Spring 2028 side trip · must do · dates TBD",
      },
      {
        title: "Berlin",
        detail: "Spring 2028 side trip · likely · dates TBD",
      },
      {
        title: "Italy",
        detail: "Keep on the list, but it may deserve a separate trip",
      },
      {
        title: "Portugal’s Algarve & Alentejo Family Multi-Adventure",
        detail: "May 2028 candidate · 6 days · best for ages 9+ · 2028 schedule TBD",
        href: "https://www.backroads.com/trips/MPGIF/portugals-algarve-alentejo-family-multi-adventure-tour",
      },
      {
        title: "Basque Country Family Multi-Adventure",
        detail: "May 2028 candidate · 6 days · best for ages 8+ · 2028 schedule TBD",
        href: "https://www.backroads.com/trips/MBIIF/basque-country-family-multi-adventure-tour",
      },
      {
        title: "Alps hiking trip",
        detail: "Spring 2028 side-trip idea · route and dates TBD",
      },
      {
        title: "Normandy and World War history trip",
        detail: "Spring 2028 side-trip idea · itinerary and dates TBD",
      },
    ],
  },
];

const keyDates = [
  {
    iso: "2027-09-10",
    date: "SEP 10–11, 2027",
    title: "AFL semifinals · estimated",
    detail: "Arrive September 9. This is an estimate based on the 2026 Grand Final date and the usual week-two finals cadence.",
    stop: "melbourne",
    href: "https://resources.afl.com.au/afl/document/2026/04/24/9dbb254f-eb90-4b55-9a09-f7a39a4d7210/2026-AFL-Grand-Final-Ticketing-Scheme-12032026-.pdf",
  },
  {
    iso: "2027-09-25",
    date: "SEP 25, 2027",
    title: "AFL Grand Final",
    detail: "Working date: Saturday at the MCG. The 2:30 pm AEST start is confirmed; final calendar date is still pending.",
    stop: "melbourne",
    href: "https://www.afl.com.au/news/1486947/afl-locks-in-toyota-afl-grand-final-start-time-for-next-two-years-230pm-aest",
  },
  {
    iso: "2027-10-29",
    date: "OCT 29, 2027",
    title: "Diwali",
    detail: "Friday · principal Lakshmi Puja date. The working plan arrives in India on October 27.",
    stop: "india",
    href: "https://www.drikpanchang.com/hindu-festivals/diwali/diwali.html",
  },
  {
    iso: "2027-12-25",
    date: "DEC 25, 2027",
    title: "Christmas",
    detail: "Snowbird stay runs Friday, December 24 through Friday, December 31.",
    stop: "snowbird",
  },
  {
    iso: "2028-03-31",
    date: "MAR 31, 2028",
    title: "Copenhagen arrival",
    detail: "The working handoff after exactly 90 days in the Alps.",
    stop: "copenhagen",
  },
];

const starterNotes: Note[] = [
  {
    id: "starter-1",
    placeId: "alps",
    text: "Compare Alpine bases on U12 training, ordinary town life, snow reliability, workspace, and value—not prestige.",
    createdAt: "Planning baseline",
  },
  {
    id: "starter-2",
    placeId: "india",
    text: "Protect the family visit and keep the route selective. Dehradun, a short trek, and Agra may already be enough.",
    createdAt: "Planning baseline",
  },
];

function stopStyle(stop: Stop) {
  return {
    "--stop-color": stop.color,
    "--stop-days": stop.days,
  } as CSSProperties;
}

type ZoomLevel = "trip" | "six-weeks" | "two-weeks";

const DAY_MS = 86_400_000;
const TRIP_START = "2027-09-09";
const TRIP_END = "2028-06-28";
const zoomOrder: ZoomLevel[] = ["trip", "six-weeks", "two-weeks"];
const zoomDays: Record<ZoomLevel, number> = {
  trip: 294,
  "six-weeks": 42,
  "two-weeks": 14,
};

function parseISO(value: string) {
  return new Date(`${value}T00:00:00Z`);
}

function toISO(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(value: string, days: number) {
  const date = parseISO(value);
  date.setUTCDate(date.getUTCDate() + days);
  return toISO(date);
}

function dayDifference(start: string, end: string) {
  return Math.round((parseISO(end).getTime() - parseISO(start).getTime()) / DAY_MS);
}

function formatAxisDate(value: string, includeYear = false) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(includeYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  }).format(parseISO(value));
}

function clampWindowStart(value: string, days: number) {
  const latestStart = addDays(TRIP_END, -(days - 1));
  if (value < TRIP_START) return TRIP_START;
  if (value > latestStart) return latestStart;
  return value;
}

export function Planner() {
  const [activeStopId, setActiveStopId] = useState("melbourne");
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>("trip");
  const [focusDate, setFocusDate] = useState(TRIP_START);
  const [notes, setNotes] = useState<Note[]>(starterNotes);
  const [noteText, setNoteText] = useState("");
  const [notePlace, setNotePlace] = useState("general");
  const [notesReady, setNotesReady] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState(
    "Try: “What should we decide first?” or “What makes an Alpine base work for us?”",
  );
  const noteInputRef = useRef<HTMLTextAreaElement>(null);

  const activeStop = useMemo(
    () => stops.find((stop) => stop.id === activeStopId) ?? stops[0],
    [activeStopId],
  );
  const activeKeyDates = useMemo(
    () => keyDates.filter((item) => item.stop === activeStopId),
    [activeStopId],
  );
  const viewDays = zoomDays[zoomLevel];
  const viewStart =
    zoomLevel === "trip"
      ? TRIP_START
      : clampWindowStart(focusDate, viewDays);
  const viewEnd = addDays(viewStart, viewDays - 1);
  const visibleStops = stops.filter(
    (stop) => stop.endISO >= viewStart && stop.startISO <= viewEnd,
  );
  const visibleKeyDates = keyDates.filter(
    (item) => item.iso >= viewStart && item.iso <= viewEnd,
  );
  const visibleDays =
    zoomLevel === "two-weeks"
      ? Array.from({ length: viewDays }, (_, index) =>
          addDays(viewStart, index),
        )
      : [];
  const axisTicks =
    zoomLevel === "trip"
      ? [
          { date: "2027-09-09", label: "SEP ’27" },
          { date: "2027-10-01", label: "OCT" },
          { date: "2027-11-01", label: "NOV" },
          { date: "2027-12-01", label: "DEC" },
          { date: "2028-01-01", label: "JAN ’28" },
          { date: "2028-02-01", label: "FEB" },
          { date: "2028-03-01", label: "MAR" },
          { date: "2028-04-01", label: "APR" },
          { date: "2028-05-01", label: "MAY" },
          { date: "2028-06-01", label: "JUN" },
        ]
      : zoomLevel === "six-weeks"
        ? Array.from({ length: 6 }, (_, index) => {
            const date = addDays(viewStart, index * 7);
            return {
              date,
              label: formatAxisDate(date, index === 0),
            };
          })
        : [];
  const zoomLabel =
    zoomLevel === "trip"
      ? "Full trip"
      : zoomLevel === "six-weeks"
        ? "Six weeks"
        : "Two weeks";
  const canMovePrevious = viewStart > TRIP_START;
  const canMoveNext = viewEnd < TRIP_END;

  useEffect(() => {
    const saved = window.localStorage.getItem("42-weeks-draft-notes");
    if (saved) {
      try {
        setNotes(JSON.parse(saved) as Note[]);
      } catch {
        setNotes(starterNotes);
      }
    }
    setNotesReady(true);
  }, []);

  useEffect(() => {
    if (notesReady) {
      window.localStorage.setItem("42-weeks-draft-notes", JSON.stringify(notes));
    }
  }, [notes, notesReady]);

  function selectStop(id: string) {
    setActiveStopId(id);
    document.getElementById("destination-detail")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function zoomToStop(id: string) {
    const stop = stops.find((item) => item.id === id);
    if (!stop) return;
    setActiveStopId(id);
    setFocusDate(stop.startISO);
    if (zoomLevel === "trip") {
      setZoomLevel("six-weeks");
    }
  }

  function changeZoom(direction: -1 | 1) {
    const currentIndex = zoomOrder.indexOf(zoomLevel);
    const nextIndex = Math.min(
      zoomOrder.length - 1,
      Math.max(0, currentIndex + direction),
    );
    const nextZoom = zoomOrder[nextIndex];
    if (nextZoom === zoomLevel) return;
    if (zoomLevel === "trip" && nextZoom !== "trip") {
      setFocusDate(activeStop.startISO);
    }
    setZoomLevel(nextZoom);
  }

  function moveTimelineWindow(direction: -1 | 1) {
    const nextStart = clampWindowStart(
      addDays(viewStart, direction * viewDays),
      viewDays,
    );
    setFocusDate(nextStart);
    const nextStop = stops.find(
      (stop) => stop.startISO <= nextStart && stop.endISO >= nextStart,
    );
    if (nextStop) setActiveStopId(nextStop.id);
  }

  function focusNote() {
    document.getElementById("notes")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => noteInputRef.current?.focus(), 450);
  }

  function addNote(event: FormEvent) {
    event.preventDefault();
    const clean = noteText.trim();
    if (!clean) return;
    setNotes((current) => [
      {
        id: `${Date.now()}`,
        placeId: notePlace,
        text: clean,
        createdAt: new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date()),
      },
      ...current,
    ]);
    setNoteText("");
  }

  function removeNote(id: string) {
    setNotes((current) => current.filter((note) => note.id !== id));
  }

  function exportNotes() {
    const body = notes
      .map((note) => {
        const place =
          stops.find((stop) => stop.id === note.placeId)?.name ?? "General";
        return `## ${place}\n\n${note.text}\n\n_${note.createdAt}_`;
      })
      .join("\n\n---\n\n");
    const blob = new Blob([`# 42 Weeks — planning notes\n\n${body}\n`], {
      type: "text/markdown",
    });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = "42-weeks-notes.md";
    anchor.click();
    URL.revokeObjectURL(href);
  }

  function askPlan(event: FormEvent) {
    event.preventDefault();
    const question = prompt.trim().toLowerCase();
    if (!question) return;

    if (question.includes("first") || question.includes("priority")) {
      setAnswer(
        "Start with the decisions that constrain everything else: the exact departure week, the Alpine shortlist, and the December 24 transfer to Snowbird. Housing and flight choices flow from those.",
      );
    } else if (
      question.includes("alp") ||
      question.includes("ski") ||
      question.includes("winter")
    ) {
      setAnswer(
        "The Alpine base needs to win on the children’s recurring ski program, a walkable real town, dependable snow, a quiet work room, and a legal three-month stay. A famous name is useful only if it serves that daily life.",
      );
    } else if (
      question.includes("india") ||
      question.includes("diwali") ||
      question.includes("dehradun")
    ) {
      setAnswer(
        "India is currently the tightest two-week chapter. Protect Diwali and Dehradun first; then test whether a short trek and Agra can fit without creating a moving itinerary.",
      );
    } else if (
      question.includes("australia") ||
      question.includes("melbourne") ||
      question.includes("brisbane")
    ) {
      setAnswer(
        "Make Melbourne immovable around the Grand Final, then let Queensland flex. The main choice is whether Brisbane or the Gold Coast gives the better combination of neighborhood life, water, and easy family routines.",
      );
    } else if (
      question.includes("copenhagen") ||
      question.includes("denmark") ||
      question.includes("schengen")
    ) {
      setAnswer(
        "Copenhagen works best as a true spring home, but the entry sequence matters. Treat the Denmark bilateral-waiver theory and any travel beyond Denmark as a legal question to verify before booking.",
      );
    } else {
      setAnswer(
        "That belongs in the decision log. Turn it into a note, tag the relevant destination, and ask: what would make this decision irreversible, and by what date do we actually need to decide?",
      );
    }
    setPrompt("");
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="42 Weeks home">
          <span className="brand-number">42 Weeks</span>
          <span className="brand-word">Trip planner</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#journey">Journey</a>
          <a href="#destinations">Places</a>
          <a href="#notes">Notes</a>
        </nav>
        <button className="button button-dark header-action" onClick={focusNote}>
          <span aria-hidden="true">＋</span> Add a note
        </button>
      </header>

      <section className="page-intro section-shell" id="top">
        <div className="page-title-row">
          <div>
            <p className="eyebrow">Trip planning workspace · 2027–28</p>
            <h1>42 Weeks</h1>
            <p className="intro-copy">
              Current route, key dates, open decisions, and working notes.
            </p>
          </div>
          <span className="draft-label">Working draft · July 2026</span>
        </div>
        <div className="summary-grid">
          <div>
            <span>Planning window</span>
            <strong>Sep 9, 2027–Jun 30, 2028</strong>
          </div>
          <div>
            <span>Departure</span>
            <strong>Sep 9, 2027</strong>
          </div>
          <div>
            <span>Return</span>
            <strong>End of Jun 2028</strong>
          </div>
          <div>
            <span>Long bases</span>
            <strong>Alps + Copenhagen</strong>
          </div>
        </div>
        <div className="route-summary">
          <span>Current route</span>
          <p>
            Hanover → Melbourne → Brisbane area → India → Singapore → Hong
            Kong → Japan → New Hampshire → Snowbird → Alps → Copenhagen
          </p>
        </div>
      </section>

      <section className="journey section-shell" id="journey">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Overview</p>
            <h2>Trip timeline</h2>
          </div>
          <p className="section-note">
            Zoom from the full route into six-week and two-week windows. The
            closest view begins to show speculative workdays and weekends.
          </p>
        </div>

        <div className="timeline-zoom-toolbar">
          <div className="zoom-control" aria-label="Timeline zoom">
            <button
              type="button"
              onClick={() => changeZoom(-1)}
              disabled={zoomLevel === "trip"}
              aria-label="Zoom timeline out"
            >
              −
            </button>
            <span>
              <small>Scale</small>
              <strong>{zoomLabel}</strong>
            </span>
            <button
              type="button"
              onClick={() => changeZoom(1)}
              disabled={zoomLevel === "two-weeks"}
              aria-label="Zoom timeline in"
            >
              +
            </button>
          </div>

          {zoomLevel !== "trip" ? (
            <div className="window-control" aria-label="Timeline window">
              <button
                type="button"
                onClick={() => moveTimelineWindow(-1)}
                disabled={!canMovePrevious}
              >
                ← Earlier
              </button>
              <span>
                {formatAxisDate(viewStart, true)}–{formatAxisDate(viewEnd, true)}
              </span>
              <button
                type="button"
                onClick={() => moveTimelineWindow(1)}
                disabled={!canMoveNext}
              >
                Later →
              </button>
            </div>
          ) : (
            <p>Click a location to zoom into it.</p>
          )}
        </div>

        <div
          className={`zoom-timeline zoom-${zoomLevel}`}
          aria-label={`${zoomLabel} trip timeline, ${formatAxisDate(viewStart, true)} through ${formatAxisDate(viewEnd, true)}`}
        >
          {axisTicks.length ? (
            <div className="zoom-axis" aria-hidden="true">
              {axisTicks.map((tick) => (
                <span
                  key={tick.date}
                  style={{
                    left: `${(dayDifference(viewStart, tick.date) / viewDays) * 100}%`,
                  }}
                >
                  {tick.label}
                </span>
              ))}
            </div>
          ) : null}

          <div className="location-lane">
            {visibleStops.map((stop) => {
              const clippedStart =
                stop.startISO < viewStart ? viewStart : stop.startISO;
              const clippedEnd = stop.endISO > viewEnd ? viewEnd : stop.endISO;
              const left =
                (dayDifference(viewStart, clippedStart) / viewDays) * 100;
              const width =
                ((dayDifference(clippedStart, clippedEnd) + 1) / viewDays) *
                100;
              return (
                <button
                  className={`zoom-location ${activeStopId === stop.id ? "active" : ""}`}
                  key={stop.id}
                  style={
                    {
                      "--stop-color": stop.color,
                      left: `${left}%`,
                      width: `${width}%`,
                    } as CSSProperties
                  }
                  onClick={() => zoomToStop(stop.id)}
                  aria-label={`${stop.name}, ${stop.window}, ${stop.days} days`}
                  title={`${stop.name}: ${stop.window} (${stop.days} days)`}
                >
                  <strong>
                    {zoomLevel === "trip" ? stop.shortName : stop.name}
                  </strong>
                  <span>
                    {zoomLevel === "trip" ? stop.startLabel : stop.window}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="anchor-lane" aria-label="Key anchor dates">
            {visibleKeyDates.map((item, index) => (
              <button
                className={`anchor-marker offset-${index % 2}`}
                key={item.title}
                style={{
                  left: `${Math.max(
                    1.5,
                    Math.min(
                      98.5,
                      ((dayDifference(viewStart, item.iso) + 0.5) /
                        viewDays) *
                        100,
                    ),
                  )}%`,
                }}
                onClick={() => {
                  setActiveStopId(item.stop);
                  setFocusDate(item.iso);
                }}
                title={`${item.title}: ${item.date}`}
              >
                <i />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.date}</small>
                </span>
              </button>
            ))}
          </div>

          {zoomLevel === "two-weeks" ? (
            <div
              className="day-grid"
              style={{ "--visible-days": viewDays } as CSSProperties}
              aria-label="Speculative work and non-work days"
            >
              {visibleDays.map((day) => {
                const date = parseISO(day);
                const weekday = date.getUTCDay();
                const isWeekend = weekday === 0 || weekday === 6;
                const anchor = keyDates.find((item) => item.iso === day);
                const dayStop = stops.find(
                  (stop) => stop.startISO <= day && stop.endISO >= day,
                );
                const status =
                  anchor?.title === "Christmas"
                    ? "Holiday"
                    : isWeekend
                      ? "Weekend"
                      : "Work?";
                return (
                  <div
                    className={`day-cell ${isWeekend ? "weekend" : "weekday"} ${status === "Holiday" ? "holiday" : ""}`}
                    key={day}
                    title={`${formatAxisDate(day, true)} · ${status}${dayStop ? ` · ${dayStop.name}` : ""}`}
                  >
                    <time>
                      <span>
                        {new Intl.DateTimeFormat("en-US", {
                          weekday: "short",
                          timeZone: "UTC",
                        }).format(date)}
                      </span>
                      <strong>{date.getUTCDate()}</strong>
                    </time>
                    <small>{status}</small>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {zoomLevel === "two-weeks" ? (
          <div className="workday-legend">
            <span><i className="work" /> Weekday · speculative work</span>
            <span><i className="weekend" /> Weekend</span>
            <span><i className="holiday" /> Holiday</span>
          </div>
        ) : null}

        {zoomLevel === "trip" ? (
          <div
            className="itinerary-table"
            role="table"
            aria-label="Exact itinerary dates"
          >
            <div className="itinerary-row itinerary-header" role="row">
              <span role="columnheader">Stop</span>
              <span role="columnheader">Exact dates</span>
              <span role="columnheader">Duration</span>
            </div>
            {stops.map((stop) => (
              <button
                className="itinerary-row"
                role="row"
                key={stop.id}
                onClick={() => zoomToStop(stop.id)}
              >
                <span role="cell">
                  <i style={{ background: stop.color }} />
                  {stop.name}
                </span>
                <span role="cell">{stop.window}</span>
                <span role="cell">
                  {stop.days} {stop.days === 1 ? "day" : "days"}
                </span>
              </button>
            ))}
          </div>
        ) : activeStop.resources?.length ? (
          <div className="unplaced-trips">
            <div>
              <span>Unscheduled ideas in {activeStop.name}</span>
              <small>Drag-and-date comes later; these are waiting to be placed.</small>
            </div>
            <div>
              {activeStop.resources.map((resource) =>
                resource.href ? (
                  <a
                    href={resource.href}
                    key={resource.title}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {resource.title} ↗
                  </a>
                ) : (
                  <span key={resource.title}>{resource.title}</span>
                ),
              )}
            </div>
          </div>
        ) : null}
      </section>

      <section className="dates section-shell">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Calendar</p>
            <h2>Key dates</h2>
          </div>
        </div>
        <div className="date-grid">
          {keyDates.map((item) => (
            <article className="date-card" key={item.title}>
              <button onClick={() => selectStop(item.stop)}>
                <span className="date-label">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <span className="date-action">Open chapter ↗</span>
              </button>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer">
                  Source
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="destinations section-shell" id="destinations">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Planning detail</p>
            <h2>Destinations</h2>
          </div>
          <p className="section-note">
            Current purpose, important elements, and unresolved questions for
            each stop.
          </p>
        </div>

        <div className="place-picker" role="list" aria-label="Choose a destination">
          {stops.map((stop) => (
            <button
              role="listitem"
              key={stop.id}
              onClick={() => setActiveStopId(stop.id)}
              className={activeStopId === stop.id ? "active" : ""}
              style={stopStyle(stop)}
            >
              <span className="place-dot" />
              {stop.name}
            </button>
          ))}
        </div>

        <article
          className="destination-detail"
          id="destination-detail"
          style={stopStyle(activeStop)}
        >
          <div className="destination-top">
            <div>
              <p className="eyebrow">{activeStop.eyebrow}</p>
              <h3>{activeStop.name}</h3>
            </div>
            <div className="destination-meta">
              <span>{activeStop.window}</span>
              <span>{activeStop.days} days</span>
            </div>
          </div>

          <p className="destination-purpose">{activeStop.purpose}</p>

          {activeKeyDates.length ? (
            <div className="segment-key-dates">
              <h4>Key dates in this segment</h4>
              <div>
                {activeKeyDates.map((item) => (
                  <article key={item.title}>
                    <time>{item.date}</time>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer">
                        Source ↗
                      </a>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {activeStop.resources?.length ? (
            <div className="trip-ideas">
              <div className="trip-ideas-heading">
                <h4>Saved trip ideas</h4>
                <p>Using the 2026–27 schedule as a planning proxy. Confirm 2028 dates when released.</p>
              </div>
              <div className="trip-idea-list">
                {activeStop.resources.map((resource) =>
                  resource.href ? (
                    <a
                      className="trip-idea"
                      href={resource.href}
                      key={resource.title}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>
                        <strong>{resource.title}</strong>
                        <small>{resource.detail}</small>
                      </span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <div className="trip-idea" key={resource.title}>
                      <span>
                        <strong>{resource.title}</strong>
                        <small>{resource.detail}</small>
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          ) : null}

          <div className="destination-columns">
            <div>
              <h4>What belongs here</h4>
              <ul className="highlight-list">
                {activeStop.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Questions to resolve</h4>
              <ol className="question-list">
                {activeStop.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ol>
            </div>
          </div>

          <button
            className="button button-light"
            onClick={() => {
              setNotePlace(activeStop.id);
              focusNote();
            }}
          >
            Add a {activeStop.name} note
          </button>
        </article>
      </section>

      <section className="workspace section-shell" id="notes">
        <div className="section-heading workspace-heading">
          <div>
            <p className="eyebrow">Working area</p>
            <h2>Notes</h2>
          </div>
          <p className="section-note">
            Notes are stored in this browser. Export them as Markdown for a
            durable copy.
          </p>
        </div>

        <div className="workspace-grid">
          <div className="notes-panel">
            <form onSubmit={addNote} className="note-form">
              <textarea
                ref={noteInputRef}
                value={noteText}
                onChange={(event) => setNoteText(event.target.value)}
                placeholder="A place, a question, something someone mentioned…"
                aria-label="New planning note"
              />
              <div className="note-form-actions">
                <label>
                  File under
                  <select
                    value={notePlace}
                    onChange={(event) => setNotePlace(event.target.value)}
                  >
                    <option value="general">General</option>
                    {stops.map((stop) => (
                      <option value={stop.id} key={stop.id}>
                        {stop.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button className="button button-accent" type="submit">
                  Save draft
                </button>
              </div>
            </form>

            <div className="notes-toolbar">
              <span>{notes.length} notes on the table</span>
              <button onClick={exportNotes}>Export .md ↓</button>
            </div>

            <div className="note-list">
              {notes.map((note) => {
                const place =
                  stops.find((stop) => stop.id === note.placeId)?.name ??
                  "General";
                return (
                  <article className="note-card" key={note.id}>
                    <div>
                      <span>{place}</span>
                      <time>{note.createdAt}</time>
                    </div>
                    <p>{note.text}</p>
                    {!note.id.startsWith("starter") ? (
                      <button
                        className="remove-note"
                        onClick={() => removeNote(note.id)}
                        aria-label={`Remove note: ${note.text}`}
                      >
                        Remove
                      </button>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="prompt-panel">
            <p className="eyebrow">Prototype</p>
            <h3>Planning assistant</h3>
            <p className="prompt-answer">{answer}</p>
            <form onSubmit={askPlan}>
              <input
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Ask about a place or priority…"
                aria-label="Ask the plan"
              />
              <button type="submit" aria-label="Submit planning question">
                →
              </button>
            </form>
            <p className="prompt-fineprint">
              This prototype returns guidance from the plan already on the
              page. It is not connected to an AI service.
            </p>
          </aside>
        </div>
      </section>

      <footer>
        <strong>42 Weeks</strong>
        <p>Family sabbatical planning workspace</p>
        <a href="#top">Back to the top ↑</a>
      </footer>
    </main>
  );
}
