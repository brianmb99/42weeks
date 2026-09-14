import type { Metadata } from "next";
import { asiaLocationPages } from "../../../data/asia-pages";
import LocationPlanPage from "../../trips/location-plan-page";

const singapore = asiaLocationPages.singapore;

export const metadata: Metadata = {
  title: "Singapore",
  description:
    "The seven-night Singapore office week, family base, weather-flexible activity list and protected Saturday plan.",
};

export default function SingaporePage() {
  return (
    <LocationPlanPage
      current="asia"
      asiaCurrent="singapore"
      plan={singapore}
      source="data/asia-pages.ts"
    />
  );
}
