import type { Metadata } from "next";
import { australiaCities } from "../../../data/australia-pages";
import AustraliaCityPage from "../../trips/australia-city-page";

export const metadata: Metadata = {
  title: "Geelong",
  description:
    "The Newtown work week, Balyang Sanctuary, Queenscliff evening and local Geelong ideas.",
};

export default function GeelongPage() {
  return <AustraliaCityPage city={australiaCities.geelong} />;
}
