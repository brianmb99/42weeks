import type { Metadata } from "next";
import { getKayakOption } from "../../../../data/whitsundays-kayaking";
import WhitsundaysKayakOption from "../../whitsundays-kayak-option";

const option = getKayakOption("whitehaven-chance-henning");

export const metadata: Metadata = {
  title: `${option.shortTitle} | Whitsundays`,
  description:
    "The modular three-day family sea-kayak route from Whitehaven through Chance Bay to Henning Island.",
};

export default function WhitehavenChanceHenningPage() {
  return <WhitsundaysKayakOption option={option} />;
}
