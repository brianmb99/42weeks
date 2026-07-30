import type { Metadata } from "next";
import { getKayakOption } from "../../../../data/whitsundays-kayaking";
import WhitsundaysKayakOption from "../../whitsundays-kayak-option";

const option = getKayakOption("whitehaven-henning-paddle");

export const metadata: Metadata = {
  title: `${option.shortTitle} | Whitsundays`,
  description:
    "The three-day family sea-kayak traverse from Whitehaven Beach through Henning Island to Paddle Bay.",
};

export default function WhitehavenHenningPaddlePage() {
  return <WhitsundaysKayakOption option={option} />;
}
