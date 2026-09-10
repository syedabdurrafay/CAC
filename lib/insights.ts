import type { InsightPost } from "@/types";

/**
 * ============================================================
 * INSIGHTS / BLOG
 * ============================================================
 * TO ADD A POST:
 *  1. Copy an object below and update every field.
 *  2. `body` is an array of paragraphs, rendered in order.
 *  3. Save — it appears on /insights and gets its own page.
 * ============================================================
 */

export const insights: InsightPost[] = [
  {
    slug: "signals-that-matter-in-2026",
    title: "The ranking signals actually worth your attention in 2026",
    excerpt:
      "Search keeps adding new surfaces — AI answers, local packs, video. Here's what still moves the needle underneath all of it.",
    category: "SEO",
    date: "2026-01-14",
    readTime: "6 min read",
    image: "/images/insights/placeholder-1.svg",
    body: [
      "Every year brings a new list of ranking factors to chase, and every year the fundamentals matter more than the list. Search engines are, at their core, still trying to answer one question: does this page genuinely serve the person who searched?",
      "Technical health remains table stakes. A site that loads slowly or breaks on mobile is disqualified before content quality even enters the conversation. From there, topical depth and structural clarity — a site that clearly organizes what it knows about a subject — consistently outperforms scattered, one-off content.",
      "The addition of AI-generated answers to search results hasn't changed this equation as much as it's changed the reward. Being cited inside an AI summary now depends on the same signals that always mattered: clear structure, demonstrated expertise, and third-party validation through links and mentions.",
      "The practical takeaway: audit your technical foundation first, build genuine topical authority second, and treat every new search surface as an extension of that same foundation rather than a separate strategy.",
    ],
  },
  {
    slug: "paid-social-creative-testing",
    title: "A simple framework for paid social creative testing",
    excerpt:
      "Most accounts don't have a targeting problem — they have a creative fatigue problem. Here's how we structure tests to fix it.",
    category: "Paid Media",
    date: "2025-11-02",
    readTime: "5 min read",
    image: "/images/insights/placeholder-2.svg",
    body: [
      "When paid social performance declines, the instinct is often to rebuild targeting. In practice, creative fatigue is the more common culprit — the same handful of ads shown to the same audience for too long.",
      "A disciplined testing framework fixes this. Every cycle should test one clear variable at a time: hook, format, or offer. Testing all three simultaneously makes it impossible to know what actually moved the number.",
      "We recommend a simple cadence: four to six new creative concepts per cycle, each isolating a single variable, evaluated after a fixed spend threshold rather than a fixed time window. This keeps decisions grounded in statistical confidence instead of impatience.",
      "The output isn't just better performance — it's a growing library of validated creative principles specific to your audience, which compounds in value over time.",
    ],
  },
  {
    slug: "website-speed-and-conversion",
    title: "Why page speed is a conversion problem before it's an SEO problem",
    excerpt:
      "Search engines reward fast sites because people do. The business case for speed starts with the visitor, not the algorithm.",
    category: "Owned Media",
    date: "2025-09-18",
    readTime: "4 min read",
    image: "/images/insights/placeholder-3.svg",
    body: [
      "Page speed is usually discussed as a ranking factor first and a user experience issue second. That ordering undersells the problem. Every additional second of load time increases the odds a visitor leaves before they see anything at all.",
      "The fix is rarely one silver bullet. It's usually a combination of image optimization, disciplined use of third-party scripts, and choosing rendering strategies that get meaningful content in front of a visitor as fast as possible.",
      "Treat performance budgets the same way you'd treat a design system: a constraint every new feature has to work within, not a cleanup project scheduled for later.",
    ],
  },
];

export function getInsightBySlug(slug: string): InsightPost | undefined {
  return insights.find((post) => post.slug === slug);
}
