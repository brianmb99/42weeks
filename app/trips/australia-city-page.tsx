import type { AustraliaCity } from "../../data/australia-pages";
import LocationPlanPage from "./location-plan-page";

export default function AustraliaCityPage({ city }: { city: AustraliaCity }) {
  return (
    <LocationPlanPage
      current="australia"
      australiaCurrent={city.slug}
      source="data/australia-pages.ts"
      plan={{
        eyebrow: city.eyebrow,
        title: city.title,
        dates: city.dates,
        facts: city.facts,
        summary: city.summary,
        photos: city.photos,
        rhythmTitle: city.rhythmTitle,
        rhythmSummary: city.rhythmSummary,
        rhythm: city.rhythm,
        stayTitle: city.stayTitle,
        stayDescription: city.stayDescription,
        stayChecks: city.stayChecks,
        activities: city.ideas,
        planningNotes: city.planningNotes,
      }}
    />
  );
}
