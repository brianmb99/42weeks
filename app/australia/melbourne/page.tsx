import type { Metadata } from "next";
import { australiaCities } from "../../../data/australia-pages";
import AustraliaCityPage from "../../trips/australia-city-page";

export const metadata: Metadata = {
  title: "Melbourne",
  description:
    "The six-night Melbourne landing, work-launch and MCG match plan.",
};

export default function MelbournePage() {
  return <AustraliaCityPage city={australiaCities.melbourne} />;
}
