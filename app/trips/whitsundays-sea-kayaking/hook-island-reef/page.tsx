import type { Metadata } from "next";
import { getKayakOption } from "../../../../data/whitsundays-kayaking";
import WhitsundaysKayakOption from "../../whitsundays-kayak-option";

const option = getKayakOption("hook-island-reef");

export const metadata: Metadata = {
  title: `${option.shortTitle} | Whitsundays`,
  description:
    "The reef-first three-day family sea-kayak option from Crayfish Beach to Maureen’s Cove on Hook Island.",
};

export default function HookIslandReefPage() {
  return <WhitsundaysKayakOption option={option} />;
}
