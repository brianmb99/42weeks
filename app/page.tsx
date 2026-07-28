import type { Metadata } from "next";
import { Planner } from "./planner";

export const metadata: Metadata = {
  title: "42 Weeks — Family sabbatical planner",
  description:
    "A living map for one family’s 2027–28 journey across Australia, Asia, the Alps, and Copenhagen.",
};

export default function Home() {
  return <Planner />;
}
