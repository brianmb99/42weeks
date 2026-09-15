import type { Metadata } from "next";
import { australiaCities } from "../../../data/australia-pages";
import AustraliaCityPage from "../../trips/australia-city-page";

export const metadata: Metadata = {
  title: "Melbourne",
  description:
    "The optional early Melbourne hotel nights and last-round MCG window, not the selected Australia opening.",
};

export default function MelbournePage() {
  return <AustraliaCityPage city={australiaCities.melbourne} />;
}
