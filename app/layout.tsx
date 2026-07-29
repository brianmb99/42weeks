import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://forty-two-weeks-trip-planner.brianbulthuis.chatgpt.site",
  ),
  title: {
    default: "42 Weeks",
    template: "%s · 42 Weeks",
  },
  description:
    "A living family sabbatical plan for Australia, Asia, the Alps, and Copenhagen.",
  openGraph: {
    title: "42 Weeks",
    description:
      "The broad route and working plan for a family sabbatical from September 2027 through June 2028.",
    type: "website",
    siteName: "42 Weeks",
    images: [
      {
        url: "/og.png",
        width: 1734,
        height: 907,
        alt: "42 Weeks: September 2027 through June 2028",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "42 Weeks",
    description:
      "The broad route and working plan for a family sabbatical from September 2027 through June 2028.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
