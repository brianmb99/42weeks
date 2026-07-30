import type { Metadata } from "next";
import queensland from "../../../data/queensland.json";
import QueenslandWorkingWeek from "../queensland-working-week";

export const metadata: Metadata = {
  title: "Whitsundays: Work, Reef & Sea Kayak",
  description:
    "The Hamilton Island work base, Great Barrier Reef priority, and three family sea-kayak expedition options for the Whitsundays.",
};

export default function HamiltonIslandWorkingWeekPage() {
  return <QueenslandWorkingWeek trip={queensland.hamiltonIsland} />;
}
