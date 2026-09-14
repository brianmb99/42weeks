import type { Metadata } from "next";
import wanaka from "../../../data/wanaka.json";
import WorkingBasePage from "../../trips/working-base-page";

export const metadata: Metadata = {
  title: "Wānaka",
  description:
    "The selected twenty-night Wānaka working base, early-shift rhythm and forecast-led four-day mini-vacation.",
};

function dateRangeLabel(value: string) {
  const [start, end] = value.split("/");
  const format = (date: string, includeMonth = true) =>
    new Intl.DateTimeFormat("en-US", {
      ...(includeMonth ? { month: "short" } : {}),
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  return `${format(start)}–${format(end, !sameMonth)}`;
}

export default function WanakaPage() {
  return (
    <WorkingBasePage
      current="new-zealand"
      eyebrow="New Zealand · late-spring working base"
      title={wanaka.title}
      facts={[
        "Nov 28–Dec 17, 2027",
        "20 nights",
        "Two full work weeks",
        "Two vacation weekdays",
      ]}
      summary={wanaka.summary}
      baseTitle={wanaka.base.recommendation}
      baseReason={wanaka.base.reason}
      requirements={wanaka.base.requirements}
      sections={[
        {
          eyebrow: "Late spring",
          title: "Long evenings make the work model worthwhile",
          paragraphs: [wanaka.season.summary, wanaka.season.planningRange],
          items: wanaka.season.notes,
        },
        {
          eyebrow: "Arrival",
          title: "Use the overnight flight; protect the first real workday",
          paragraphs: [wanaka.arrival.plan, wanaka.arrival.fallback],
        },
        {
          id: "work-rhythm",
          eyebrow: "November 29–December 17",
          title: "Early full weeks around three anchor days",
          items: wanaka.workRhythm.map(
            (block) =>
              `${dateRangeLabel(block.dates)} — ${block.mode}: ${block.plan}`,
          ),
        },
        {
          eyebrow: "Ordinary afternoons",
          title: "The base works without a road trip",
          items: wanaka.ordinaryAfternoons,
        },
        {
          eyebrow: "Complete weekends",
          title: "One larger outing plus recovery",
          items: wanaka.weekends.map(
            (weekend) => `${dateRangeLabel(weekend.dates)}: ${weekend.plan}`,
          ),
        },
        {
          id: "mini-vacation",
          eyebrow: "December 9–12",
          title: "Choose the four-day plan from the forecast",
          paragraphs: [
            wanaka.miniVacation.recommendation,
            wanaka.miniVacation.pushback,
          ],
          items: wanaka.miniVacation.rankedOptions.map(
            (option) =>
              `${option.rank}. ${option.title}: ${option.tradeoff}`,
          ),
        },
      ]}
      cautions={wanaka.season.notes}
      homeschool={wanaka.homeschool}
      bookFirst={wanaka.bookFirst}
      links={wanaka.links}
      source="data/wanaka.json"
    />
  );
}
