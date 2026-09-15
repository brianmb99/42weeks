import type { Metadata } from "next";
import { asiaLocationPages } from "../../../data/asia-pages";
import LocationPlanPage from "../../trips/location-plan-page";

const hongKong = asiaLocationPages["hong-kong"];

export const metadata: Metadata = {
  title: "Hong Kong",
  description:
    "The two-week Hong Kong office stay: a full Work & School week, a complete weekend, Thanksgiving and a Saturday-night departure to New Zealand.",
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
