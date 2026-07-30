import type { Metadata } from "next";
import { australiaCities } from "../../../data/australia-pages";
import AustraliaCityPage from "../../trips/australia-city-page";

export const metadata: Metadata = {
  title: "Melbourne",
  description:
    "A compact Melbourne weekend with St Kilda Pier's Little Penguins, laneways, the river and one cultural anchor.",
};

export default function MelbournePage() {
  return <AustraliaCityPage city={australiaCities.melbourne} />;
}
