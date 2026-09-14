import type { Metadata } from "next";
import queensland from "../../../data/queensland.json";
import WorkingBasePage from "../../trips/working-base-page";

const brisbane = queensland.brisbane;

export const metadata: Metadata = {
  title: "Brisbane",
  description:
    "The selected six-night Brisbane work, recovery, laundry and India repacking base.",
};

export default function BrisbanePage() {
  return (
    <WorkingBasePage
      current="australia"
      australiaCurrent="brisbane"
      eyebrow={brisbane.eyebrow}
      title={brisbane.title}
      facts={[
        "Oct 17–22, 2027",
        "6 nights",
        "Full Monday–Friday output",
        "Weekend departure",
      ]}
      summary={brisbane.summary}
      baseTitle={brisbane.base.recommendation}
      baseReason={brisbane.base.reason}
      requirements={brisbane.base.requirements}
      sections={[
        {
          eyebrow: brisbane.arrival.date,
          title: brisbane.arrival.title,
          items: brisbane.arrival.items,
        },
        {
          id: "work-rhythm",
          eyebrow: "October 18–22",
          title: "Protect the full work and homeschool week",
          paragraphs: [
            "This week earns its place by restoring dependable output after the reef and kayak block. Keep optional city time to low-friction afternoons.",
          ],
          items: brisbane.workAfternoons,
        },
        {
          eyebrow: brisbane.departure.date,
          title: brisbane.departure.title,
          items: brisbane.departure.items,
        },
      ]}
      cautions={brisbane.cautions}
      homeschool={brisbane.homeschool}
      bookFirst={brisbane.bookFirst}
      links={brisbane.links}
      source="data/queensland.json"
    />
  );
}
