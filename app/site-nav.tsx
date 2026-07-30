import { sitePath } from "../lib/site-path";

type NavPage = "home" | "calendar" | "great-ocean-road" | "hamilton" | "outback";

const navItems: Array<{ id: NavPage; label: string; href: string }> = [
  { id: "home", label: "Home", href: "/" },
  { id: "calendar", label: "Calendar", href: "/calendar" },
  {
    id: "great-ocean-road",
    label: "Great Ocean Road",
    href: "/trips/great-southern-touring-route",
  },
  {
    id: "hamilton",
    label: "Whitsundays",
    href: "/trips/hamilton-island-working-week",
  },
  {
    id: "outback",
    label: "Outback",
    href: "/trips/longreach-outback-working-week",
  },
];

export default function SiteNav({ current }: { current: NavPage }) {
  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="site-nav-inner">
        <a className="site-nav-brand" href={sitePath("/")}>
          <strong>42</strong> Weeks
        </a>
        <div className="site-nav-links">
          {navItems.map((item) => (
            <a
              href={sitePath(item.href)}
              aria-current={item.id === current ? "page" : undefined}
              key={item.id}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
