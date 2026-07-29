import type { Metadata } from "next";
import queensland from "../../../data/queensland.json";
import QueenslandWorkingWeek from "../queensland-working-week";

export const metadata: Metadata = {
  title: "Hamilton Island: Work & Play",
  description:
    "The six-night Hamilton Island work, homeschool, Whitehaven Beach, and Great Barrier Reef plan.",
};

export default function HamiltonIslandWorkingWeekPage() {
  return <QueenslandWorkingWeek trip={queensland.hamiltonIsland} />;
}
