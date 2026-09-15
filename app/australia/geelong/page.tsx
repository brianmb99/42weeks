import type { Metadata } from "next";
import { australiaCities } from "../../../data/australia-pages";
import AustraliaCityPage from "../../trips/australia-city-page";

export const metadata: Metadata = {
  title: "Geelong",
  description:
    "The Newtown Work & School week, Monday landing, MCG trip from Geelong, and family-history time.",
};

export default function GeelongPage() {
  return <AustraliaCityPage city={australiaCities.geelong} />;
}
