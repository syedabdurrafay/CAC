import type { NavLink } from "@/types";

export const mainNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Work", href: "/work" },
    { label: "Insights", href: "/insights" },
  ] as NavLink[],
  resources: [
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ] as NavLink[],
};
