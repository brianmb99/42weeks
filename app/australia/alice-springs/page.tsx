import type { Metadata } from "next";
import alice from "../../../data/alice-springs.json";
import WorkingBasePage from "../../trips/working-base-page";

export const metadata: Metadata = {
  title: "Alice Springs",
  description:
    "The selected two-week Alice Springs work base, Red Centre weekend and practical family plan.",
};

export default function AliceSpringsPage() {
  return (
    <WorkingBasePage
      current="australia"
      australiaCurrent="alice-springs"
      eyebrow="Red Centre · selected outback base"
      title={alice.title}
      facts={[
        "Sep 12–25, 2027",
        "14 nights",
        "Two full work weeks",
        "Complete outback weekend",
      ]}
      summary={alice.summary}
      baseTitle={alice.base.recommendation}
      baseReason={alice.base.reason}
      requirements={alice.base.requirements}
      sections={[
        {
          eyebrow: "September conditions",
          title: "Warm dry days, cool desert nights",
          paragraphs: [
            `${alice.season.summary} Historical means are approximately 82°F by day, 51°F overnight and one-third of an inch of rain for the month.`,
          ],
          items: alice.season.notes,
        },
        {
          id: "work-rhythm",
          eyebrow: "September 13–24",
          title: "Two ordinary work and homeschool weeks",
          items: alice.workRhythm.localPlan,
        },
        {
          eyebrow: "After work",
          title: "Use the town; do not save everything for the weekend",
          items: alice.workdayAfternoons.map(
            (item) => `${item.title}: ${item.note}`,
          ),
        },
        {
          id: "weekend",
          eyebrow: "September 18–19",
          title: "Keep the house and use the full Red Centre weekend",
          paragraphs: [
            alice.middleWeekend.recommendation,
            alice.middleWeekend.alternative,
          ],
          items: alice.middleWeekend.preferredPlan,
        },
        {
          eyebrow: "Deliberate exclusion",
          title: "Uluru is a separate vacation decision",
          paragraphs: [alice.uluruDecision.reason],
          items: alice.uluruDecision.revisitIf,
        },
      ]}
      cautions={[
        ...alice.season.notes,
        "Verify park access, road conditions and 2027 flight days before booking.",
        "Do not rely on late-night U.S. overlap every evening before driving days.",
      ]}
      homeschool={alice.homeschool}
      bookFirst={alice.bookFirst}
      links={alice.links}
      source="data/alice-springs.json"
    />
  );
}
