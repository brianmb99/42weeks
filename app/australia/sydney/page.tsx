import type { Metadata } from "next";
import { australiaCities } from "../../../data/australia-pages";
import AustraliaCityPage from "../../trips/australia-city-page";

export const metadata: Metadata = {
  title: "Sydney",
  description:
    "A two-week Sydney beach work base with Manly and Coogee lodging options, an Opera House evening and a complete city weekend.",
};

export default function SydneyPage() {
  return <AustraliaCityPage city={australiaCities.sydney} />;
}
