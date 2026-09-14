import type { Metadata } from "next";
import { asiaLocationPages } from "../../../data/asia-pages";
import LocationPlanPage from "../../trips/location-plan-page";

const hongKong = asiaLocationPages["hong-kong"];

export const metadata: Metadata = {
  title: "Hong Kong",
  description:
    "The six-night Hong Kong Thanksgiving office stay, family-day plan, practical base and Saturday departure rhythm.",
};

export default function HongKongPage() {
  return (
    <LocationPlanPage
      current="asia"
      asiaCurrent="hong-kong"
      plan={hongKong}
      source="data/asia-pages.ts"
    />
  );
}
