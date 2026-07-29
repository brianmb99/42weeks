import type { Metadata } from "next";
import queensland from "../../../data/queensland.json";
import QueenslandWorkingWeek from "../queensland-working-week";

export const metadata: Metadata = {
  title: "Hamilton Island: Work & Play",
  description:
    "The seven-night Hamilton Island work, homeschool, Whitehaven Beach, Great Barrier Reef, and island-Saturday plan.",
};

export default function HamiltonIslandWorkingWeekPage() {
  return <QueenslandWorkingWeek trip={queensland.hamiltonIsland} />;
}
