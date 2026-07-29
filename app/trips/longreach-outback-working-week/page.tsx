import type { Metadata } from "next";
import queensland from "../../../data/queensland.json";
import QueenslandWorkingWeek from "../queensland-working-week";

export const metadata: Metadata = {
  title: "Longreach Outback Working Week",
  description:
    "The six-night Longreach work, homeschool, aviation, heritage, and outback plan.",
};

export default function LongreachOutbackWorkingWeekPage() {
  return <QueenslandWorkingWeek trip={queensland.longreach} />;
}
