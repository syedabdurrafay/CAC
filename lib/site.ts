/**
 * ============================================================
 * SITE CONFIGURATION
 * ============================================================
 * This is the single place to edit agency-wide information:
 * name, tagline, contact details, social links, and headline
 * statistics used across the homepage.
 *
 * Everything here is plain data — change a value and the whole
 * site updates automatically.
 * ============================================================
 */

export const siteConfig = {
  name: "Northfield",
  legalName: "Northfield Digital Ltd.",
  tagline: "Growth engineering for ambitious brands",
  description:
    "Northfield is a digital growth agency. We combine search, paid media, and product-grade websites into one system that turns attention into revenue.",
  url: "https://www.northfield.agency", // TODO: replace with live domain
  founded: 2021,

  // TODO: replace with real contact details before launch
  contact: {
    email: "hello@northfield.agency",
    phone: "+1 (555) 010-2044",
    addressLine1: "148 Lafayette Street, Suite 4B",
    addressLine2: "New York, NY 10013",
  },

  // TODO: replace with real, live social profiles
  socials: {
    linkedin: "https://www.linkedin.com/company/northfield-agency",
    instagram: "https://www.instagram.com/northfield.agency",
    x: "https://x.com/northfieldhq",
  },

  // Headline stats shown on the homepage trust section.
  // TODO: replace with verified, real figures before launch.
  stats: [
    { value: "4", label: "Founding partners" },
    { value: "3", label: "Media disciplines under one roof" },
    { value: "2021", label: "Founded" },
    { value: "100%", label: "Senior-led delivery" },
  ],

  // Industries the agency is positioned to serve — used in the
  // trust section as an honest substitute for client logos until
  // real, approved client logos are available.
  industriesServed: [
    "SaaS & Technology",
    "E-commerce & Retail",
    "Professional Services",
    "Healthcare & Wellness",
    "Real Estate",
    "Hospitality",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
