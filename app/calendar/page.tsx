import type { Metadata } from "next";
import "vis-timeline/styles/vis-timeline-graph2d.css";
import "./calendar.css";
import CalendarPlanner from "./calendar-planner";

export const metadata: Metadata = {
  title: "Calendar prototype",
  description: "A zoomable calendar for planning the 42 Weeks trip.",
};

export default function CalendarPage() {
  return <CalendarPlanner />;
}
