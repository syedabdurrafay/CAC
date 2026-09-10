import type { Project } from "@/types";

/**
 * ============================================================
 * WORK / CASE STUDIES
 * ============================================================
 * All projects below are clearly-marked placeholders
 * (`isPlaceholder: true`) since no real client case studies
 * were supplied. Replace with real, approved client work
 * before launch — do not publish placeholder results as real.
 *
 * TO ADD A CASE STUDY:
 *  1. Copy an object below and update every field.
 *  2. Add an image to /public/images/work/.
 *  3. Set isPlaceholder to false once the data is real.
 * ============================================================
 */

export const projects: Project[] = [
  {
    slug: "sample-saas-growth-program",
    name: "Sample: B2B SaaS Growth Program",
    client: "Client name pending",
    industry: "SaaS & Technology",
    summary:
      "Placeholder case study illustrating a combined SEO, paid search, and CRO engagement for a B2B SaaS company.",
    challenge:
      "This is placeholder copy describing a hypothetical client's challenge — for example, flat organic growth and a costly paid acquisition channel. Replace with the real challenge once a client case study is approved for publication.",
    solutionText:
      "Placeholder copy describing the approach taken — for example, a rebuilt technical SEO foundation paired with restructured paid search campaigns and a conversion testing program. Replace with real project detail.",
    servicesUsed: ["seo", "ppc", "cro"],
    results: [
      { label: "Metric to confirm", value: "—" },
      { label: "Metric to confirm", value: "—" },
    ],
    image: "/images/work/placeholder-1.svg",
    isPlaceholder: true,
  },
  {
    slug: "sample-ecommerce-relaunch",
    name: "Sample: E-commerce Website Relaunch",
    client: "Client name pending",
    industry: "E-commerce & Retail",
    summary:
      "Placeholder case study illustrating a website redesign and lifecycle marketing engagement for a direct-to-consumer brand.",
    challenge:
      "Placeholder copy describing a hypothetical challenge — for example, an outdated site with poor mobile conversion. Replace with real project detail once approved.",
    solutionText:
      "Placeholder copy describing the approach — for example, a full site rebuild alongside a new email and SMS lifecycle program. Replace with real project detail.",
    servicesUsed: ["website-design", "website-development", "lifecycle-marketing"],
    results: [
      { label: "Metric to confirm", value: "—" },
      { label: "Metric to confirm", value: "—" },
    ],
    image: "/images/work/placeholder-2.svg",
    isPlaceholder: true,
  },
  {
    slug: "sample-local-services-expansion",
    name: "Sample: Local Services Multi-Location Expansion",
    client: "Client name pending",
    industry: "Professional Services",
    summary:
      "Placeholder case study illustrating a local SEO and paid social program supporting a multi-location expansion.",
    challenge:
      "Placeholder copy describing a hypothetical challenge — for example, inconsistent visibility across new locations. Replace with real project detail once approved.",
    solutionText:
      "Placeholder copy describing the approach — for example, standardized local listings, location pages, and geo-targeted paid social. Replace with real project detail.",
    servicesUsed: ["local-seo", "paid-social", "reporting-dashboards"],
    results: [
      { label: "Metric to confirm", value: "—" },
      { label: "Metric to confirm", value: "—" },
    ],
    image: "/images/work/placeholder-3.svg",
    isPlaceholder: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
