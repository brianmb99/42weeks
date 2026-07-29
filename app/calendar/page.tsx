import type { Metadata } from "next";
import "./calendar.css";
import CalendarPlanner from "./calendar-planner";

export const metadata: Metadata = {
  title: "Working calendar",
  description: "The day-by-day working calendar for the 42 Weeks trip.",
};

export default function CalendarPage() {
  return <CalendarPlanner />;
}
