import type { Metadata } from "next";
import "./calendar.css";
import CalendarPlanner from "./calendar-planner";

export const metadata: Metadata = {
  title: "Working timeline",
  description: "The definitive working timeline for the 42 Weeks trip.",
};

export default function CalendarPage() {
  return <CalendarPlanner />;
}
