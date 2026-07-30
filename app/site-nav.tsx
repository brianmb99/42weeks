import { sitePath } from "../lib/site-path";

type NavPage = "home" | "calendar" | "australia";
export type AustraliaNavPage =
  | "overview"
  | "geelong"
  | "great-ocean-road"
  | "melbourne"
  | "sydney"
  | "whitsundays"
  | "outback";

const navItems: Array<{ id: NavPage; label: string; href: string }> = [
  { id: "home", label: "Home", href: "/" },
  { id: "calendar", label: "Calendar", href: "/calendar" },
  { id: "australia", label: "Australia", href: "/australia" },
];

const australiaNavItems: Array<{
  id: AustraliaNavPage;
  label: string;
  href: string;
}> = [
  { id: "overview", label: "Overview", href: "/australia" },
  { id: "geelong", label: "Geelong", href: "/australia/geelong" },
  {
    id: "great-ocean-road",
    label: "Great Ocean Road",
    href: "/trips/great-southern-touring-route",
  },
  { id: "melbourne", label: "Melbourne", href: "/australia/melbourne" },
  { id: "sydney", label: "Sydney", href: "/australia/sydney" },
  {
    id: "whitsundays",
    label: "Whitsundays",
    href: "/trips/hamilton-island-working-week",
  },
  {
    id: "outback",
    label: "Outback",
    href: "/trips/longreach-outback-working-week",
  },
];

export default function SiteNav({
  current,
  australiaCurrent,
}: {
  current: NavPage;
  australiaCurrent?: AustraliaNavPage;
}) {
  const showAustraliaNav = current === "australia";

  return (
    <nav
      className={`site-nav${showAustraliaNav ? " has-secondary" : ""}`}
      aria-label="Primary"
    >
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
      {showAustraliaNav && (
        <div className="site-subnav" aria-label="Australia">
          <div className="site-subnav-inner">
            {australiaNavItems.map((item) => (
              <a
                href={sitePath(item.href)}
                aria-current={
                  item.id === australiaCurrent ? "page" : undefined
                }
                key={item.id}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
