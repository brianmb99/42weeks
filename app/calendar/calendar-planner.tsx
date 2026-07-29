"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DataSet } from "vis-data";
import {
  Timeline,
  type DataGroup,
  type DataItem,
  type TimelineOptions,
} from "vis-timeline";
import tripPlan from "../../data/trip-plan.json";

const DAY = 24 * 60 * 60 * 1000;
const TRIP_START = new Date(`${tripPlan.trip.start}T00:00:00`);
const TRIP_END = addDays(tripPlan.trip.end, 1);

type Segment = {
  id: string;
  name: string;
  start: string;
  end: string;
  days: number;
  color: string;
};

type Anchor = {
  id: string;
  name: string;
  date: string;
  note: string;
};

type SelectedDetail = {
  title: string;
  date: string;
  note: string;
};

const segments: Segment[] = tripPlan.segments;
const anchors: Anchor[] = tripPlan.anchors;
const considerations = tripPlan.considerations;

function addDays(value: string, days: number) {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date;
}

function formatDate(value: Date | string) {
  const date = typeof value === "string" ? new Date(`${value}T00:00:00`) : value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatShortDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(value);
}

function inclusiveDateRange(start: string, end: string) {
  return `${formatDate(start)} – ${formatDate(end)}`;
}

function timelineItems(): DataItem[] {
  return [
    ...segments.map((segment) => ({
      id: `segment-${segment.id}`,
      group: "route",
      start: new Date(`${segment.start}T00:00:00`),
      end: addDays(segment.end, 1),
      type: "range" as const,
      content: `<span>${segment.name}</span>`,
      title: `${segment.name}: ${inclusiveDateRange(segment.start, segment.end)}`,
      className: "route-item",
      style: `--segment-color:${segment.color}`,
    })),
    ...anchors.map((anchor) => ({
      id: `anchor-${anchor.id}`,
      group: "anchors",
      start: new Date(`${anchor.date}T12:00:00`),
      type: "point" as const,
      content: `<span>${anchor.name}</span>`,
      title: `${anchor.name}: ${formatDate(anchor.date)}`,
      className: "anchor-item",
    })),
    {
      id: "schedule-prompt",
      group: "schedule",
      start: TRIP_START,
      type: "box",
      content: "Zoom to 6 weeks or less to show workdays and weekends",
      className: "schedule-prompt",
    },
  ];
}

function scheduleItems(start: Date, end: Date): DataItem[] {
  const first = new Date(Math.max(TRIP_START.getTime(), start.getTime()));
  first.setHours(0, 0, 0, 0);
  const last = new Date(Math.min(TRIP_END.getTime(), end.getTime()));
  last.setHours(0, 0, 0, 0);
  const items: DataItem[] = [];

  for (const day = new Date(first); day < last; day.setDate(day.getDate() + 1)) {
    const next = new Date(day);
    next.setDate(next.getDate() + 1);
    const iso = day.toISOString().slice(0, 10);
    const weekend = day.getDay() === 0 || day.getDay() === 6;
    const christmas = iso === "2027-12-25";
    const label = christmas ? "Holiday" : weekend ? "Weekend" : "Work?";

    items.push({
      id: `schedule-${iso}`,
      group: "schedule",
      start: new Date(day),
      end: next,
      type: "range",
      content: `<span>${label}</span>`,
      title: `${formatDate(new Date(day))}: ${label}`,
      className: christmas
        ? "schedule-day schedule-holiday"
        : weekend
          ? "schedule-day schedule-weekend"
          : "schedule-day schedule-work",
    });
  }

  return items;
}

function detailForItem(id: string): SelectedDetail | null {
  if (id.startsWith("segment-")) {
    const segment = segments.find((candidate) => `segment-${candidate.id}` === id);
    return segment
      ? {
          title: segment.name,
          date: inclusiveDateRange(segment.start, segment.end),
          note: `${segment.days} days`,
        }
      : null;
  }

  if (id.startsWith("anchor-")) {
    const anchor = anchors.find((candidate) => `anchor-${candidate.id}` === id);
    return anchor
      ? { title: anchor.name, date: formatDate(anchor.date), note: anchor.note }
      : null;
  }

  return null;
}

export default function CalendarPlanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<Timeline | null>(null);
  const itemsRef = useRef<DataSet<DataItem> | null>(null);
  const scheduleIdsRef = useRef<string[]>([]);
  const [visibleRange, setVisibleRange] = useState("Sep 9, 2027 – Jun 28, 2028");
  const [selected, setSelected] = useState<SelectedDetail | null>(null);
  const [scheduleVisible, setScheduleVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const groups = new DataSet<DataGroup>();
    groups.add([
      { id: "route", content: "Locations", order: 1 },
      { id: "anchors", content: "Anchor dates", order: 2 },
      { id: "schedule", content: "Work pattern", order: 3 },
    ]);
    const items = new DataSet<DataItem>(timelineItems());
    itemsRef.current = items;

    const options: TimelineOptions = {
      start: TRIP_START,
      end: TRIP_END,
      min: new Date("2027-09-01T00:00:00"),
      max: new Date("2028-07-07T00:00:00"),
      zoomMin: 7 * DAY,
      zoomMax: 310 * DAY,
      moveable: true,
      zoomable: true,
      selectable: true,
      editable: false,
      showCurrentTime: false,
      stack: false,
      orientation: { axis: "top", item: "top" },
      horizontalScroll: false,
      verticalScroll: false,
      groupHeightMode: "fixed",
      height: "355px",
      margin: { item: { horizontal: 4, vertical: 12 }, axis: 8 },
      groupOrder: "order",
      tooltip: { followMouse: true, overflowMethod: "flip" },
    };

    const timeline = new Timeline(containerRef.current, items, groups, options);
    timelineRef.current = timeline;

    const updateRange = ({ start, end }: { start: Date; end: Date }) => {
      setVisibleRange(`${formatShortDate(start)} – ${formatShortDate(new Date(end.getTime() - DAY))}`);
      const showSchedule = end.getTime() - start.getTime() <= 43 * DAY;
      setScheduleVisible(showSchedule);

      const oldIds = scheduleIdsRef.current;
      if (oldIds.length) items.remove(oldIds);
      scheduleIdsRef.current = [];

      if (showSchedule) {
        if (items.get("schedule-prompt")) items.remove("schedule-prompt");
        const days = scheduleItems(start, end);
        items.add(days);
        scheduleIdsRef.current = days.map((item) => String(item.id));
      } else if (!items.get("schedule-prompt")) {
        items.add({
          id: "schedule-prompt",
          group: "schedule",
          start: start < TRIP_START ? TRIP_START : start,
          type: "box",
          content: "Zoom to 6 weeks or less to show workdays and weekends",
          className: "schedule-prompt",
        });
      }
    };

    timeline.on("rangechanged", updateRange);
    timeline.on("select", ({ items: selectedItems }: { items: Array<string | number> }) => {
      const id = selectedItems.length ? String(selectedItems[0]) : "";
      setSelected(detailForItem(id));
    });
    updateRange(timeline.getWindow());

    return () => {
      timeline.destroy();
      timelineRef.current = null;
      itemsRef.current = null;
    };
  }, []);

  function setSpan(days: number) {
    const timeline = timelineRef.current;
    if (!timeline) return;
    const current = timeline.getWindow();
    const center = (current.start.getTime() + current.end.getTime()) / 2;
    timeline.setWindow(
      new Date(center - (days * DAY) / 2),
      new Date(center + (days * DAY) / 2),
      { animation: { duration: 250, easingFunction: "easeInOutQuad" } },
    );
  }

  function zoom(multiplier: number) {
    const timeline = timelineRef.current;
    if (!timeline) return;
    const current = timeline.getWindow();
    const center = (current.start.getTime() + current.end.getTime()) / 2;
    const halfSpan = ((current.end.getTime() - current.start.getTime()) * multiplier) / 2;
    timeline.setWindow(new Date(center - halfSpan), new Date(center + halfSpan), {
      animation: { duration: 180, easingFunction: "easeInOutQuad" },
    });
  }

  return (
    <main className="calendar-page">
      <header className="calendar-header">
        <div>
          <p className="eyebrow">42 Weeks</p>
          <h1>Calendar prototype</h1>
        </div>
        <Link href="/" className="back-link">
          Back to current planner
        </Link>
      </header>

      <div className="calendar-layout">
        <aside className="considerations-panel">
          <div className="panel-heading">
            <h2>Things under consideration</h2>
            <p>Useful ideas that do not have dates yet.</p>
          </div>
          <div className="consideration-list">
            {considerations.map((item) => (
              <article className="consideration" key={item.title}>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                ) : (
                  <h3>{item.title}</h3>
                )}
                <p>{item.meta}</p>
              </article>
            ))}
          </div>
        </aside>

        <section className="timeline-panel" aria-labelledby="timeline-title">
          <div className="source-note">
            <strong>Definitive working timeline:</strong> <code>data/trip-plan.json</code>
            <span>{tripPlan.datePolicy}</span>
          </div>
          <div className="timeline-heading">
            <div>
              <p className="eyebrow">Working dates</p>
              <h2 id="timeline-title">Trip calendar</h2>
              <p className="timeline-help">Drag to move. Scroll or pinch over the calendar to zoom.</p>
            </div>
            <div className="visible-range" aria-live="polite">
              <span>Visible</span>
              <strong>{visibleRange}</strong>
            </div>
          </div>

          <div className="timeline-controls" aria-label="Timeline controls">
            <div className="control-group">
              <button type="button" onClick={() => timelineRef.current?.fit({ animation: true })}>
                Whole trip
              </button>
              <button type="button" onClick={() => setSpan(90)}>90 days</button>
              <button type="button" onClick={() => setSpan(30)}>30 days</button>
              <button type="button" onClick={() => setSpan(14)}>14 days</button>
            </div>
            <div className="control-group zoom-controls">
              <button type="button" aria-label="Zoom out" onClick={() => zoom(1.45)}>−</button>
              <button type="button" aria-label="Zoom in" onClick={() => zoom(0.68)}>+</button>
            </div>
          </div>

          <div className="timeline-shell">
            <div ref={containerRef} className="timeline-canvas" aria-label="Zoomable trip calendar" />
          </div>

          <div className="timeline-footer">
            <p>
              {scheduleVisible
                ? "Speculative workdays and weekends are now visible."
                : "Zoom to six weeks or less to reveal the speculative work pattern."}
            </p>
            <p>Select a location or anchor for details.</p>
          </div>

          <div className={`selection-detail ${selected ? "has-selection" : ""}`} aria-live="polite">
            {selected ? (
              <>
                <div>
                  <span>Selected</span>
                  <h3>{selected.title}</h3>
                </div>
                <div>
                  <strong>{selected.date}</strong>
                  <p>{selected.note}</p>
                </div>
              </>
            ) : (
              <p>No calendar item selected.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
