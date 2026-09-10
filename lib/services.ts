import type { Service, ServiceCategory } from "@/types";

/**
 * ============================================================
 * SERVICES
 * ============================================================
 * Every service listed here automatically gets:
 *  - a card on the homepage / services overview
 *  - its own page at /services/[slug]
 *
 * TO ADD A NEW SERVICE:
 *  1. Copy an existing object below.
 *  2. Change the `slug` (used in the URL) and every field.
 *  3. Save the file — the page is generated automatically.
 * ============================================================
 */

const categoryProcess: Record<ServiceCategory, Service["process"]> = {
  "Earned Media": [
    {
      title: "Audit & benchmark",
      description:
        "We assess current visibility, technical health, and competitive position to find the highest-leverage opportunities.",
    },
    {
      title: "Strategy & roadmap",
      description:
        "We build a prioritized plan tied to specific rankings, coverage, or visibility targets — not vague activity.",
    },
    {
      title: "Execution",
      description:
        "Our team implements the technical, content, and outreach work required, on a fixed cadence.",
    },
    {
      title: "Measure & compound",
      description:
        "We track rankings, traffic, and share of voice monthly, and reinvest in what is proven to work.",
    },
  ],
  "Paid Media": [
    {
      title: "Account & audience audit",
      description:
        "We review historical performance, tracking accuracy, and audience data before spending a dollar.",
    },
    {
      title: "Campaign architecture",
      description:
        "We structure campaigns around your margins and sales cycle, not platform defaults.",
    },
    {
      title: "Launch & optimize",
      description:
        "Campaigns go live with clear testing plans; we optimize toward cost-per-acquisition weekly.",
    },
    {
      title: "Scale what works",
      description:
        "Budget shifts toward winning audiences, creative, and channels as data accumulates.",
    },
  ],
  "Owned Media": [
    {
      title: "Discovery",
      description:
        "We learn how your business actually makes money before we design or write anything.",
    },
    {
      title: "Design & build",
      description:
        "We design and build the asset — site, content system, or campaign — against clear success metrics.",
    },
    {
      title: "Launch",
      description:
        "We ship in a controlled release, with QA across devices, browsers, and edge cases.",
    },
    {
      title: "Optimize",
      description:
        "We monitor behavior post-launch and iterate based on real user data, not assumptions.",
    },
  ],
};

const categoryFaqs: Record<ServiceCategory, Service["faqs"]> = {
  "Earned Media": [
    {
      question: "How long until we see results?",
      answer:
        "Earned media compounds. Most clients see meaningful movement within 90–120 days, with results continuing to build well beyond that as authority accumulates.",
    },
    {
      question: "Do you guarantee rankings?",
      answer:
        "No agency can honestly guarantee a specific ranking position — search algorithms are outside anyone's control. We commit to the work, the cadence, and transparent reporting on what that work produces.",
    },
  ],
  "Paid Media": [
    {
      question: "What's the minimum budget you work with?",
      answer:
        "It depends on the channel and your market's cost-per-click, but we'll tell you honestly during a strategy call if your budget is enough to generate statistically meaningful data.",
    },
    {
      question: "Who owns the ad accounts?",
      answer:
        "You do. We build and manage campaigns inside accounts you own, so there is never a lock-in risk if we part ways.",
    },
  ],
  "Owned Media": [
    {
      question: "Do we own everything you build?",
      answer:
        "Yes. Source files, designs, and content are yours outright once the engagement is complete or invoices are settled.",
    },
    {
      question: "Can you work with our existing team?",
      answer:
        "Regularly. We can lead the project end-to-end or plug into your internal team as the specialist capacity you're missing.",
    },
  ],
};

export const services: Service[] = [
  // ---------------- EARNED MEDIA ----------------
  {
    slug: "seo",
    title: "Search Engine Optimization",
    category: "Earned Media",
    shortDescription:
      "Structural, technical, and content work that earns durable organic visibility.",
    description:
      "We treat SEO as an engineering discipline, not a checklist. Our team fixes the technical foundation, builds topical authority with content that actually answers what people search for, and earns the links and mentions that signal trust to search engines.",
    heroStat: { value: "3–6 mo", label: "typical time to first compounding gains" },
    problem:
      "Most sites lose visibility to slow pages, thin content, and a site structure that search engines and buyers both struggle to navigate.",
    solution:
      "We rebuild the technical foundation, map content to real search intent, and earn authority through legitimate outreach and digital PR — so rankings hold even as algorithms change.",
    benefits: [
      "Higher-intent organic traffic that converts",
      "Reduced dependency on paid acquisition over time",
      "A technical foundation that supports every other channel",
      "Content that ranks and actually serves the reader",
    ],
    deliverables: [
      "Technical SEO audit and fix log",
      "Keyword and topical map",
      "Monthly content briefs and publishing",
      "Link building and digital PR pipeline",
      "Monthly ranking and traffic reporting",
    ],
    process: categoryProcess["Earned Media"],
    faqs: categoryFaqs["Earned Media"],
    relatedSlugs: ["geo", "local-seo", "content-marketing"],
  },
  {
    slug: "geo",
    title: "Generative Engine Optimization",
    category: "Earned Media",
    shortDescription:
      "Positioning your brand to be cited and recommended by AI answer engines.",
    description:
      "As more searches resolve inside AI assistants and answer engines, being the cited source matters as much as ranking on a results page. We structure content, data, and authority signals so language models are more likely to surface and cite your brand accurately.",
    problem:
      "AI answer engines summarize the web on a user's behalf, and brands with unclear structure or weak authority are simply left out of the answer.",
    solution:
      "We structure content for machine readability, strengthen the third-party validation these systems rely on, and monitor how your brand is represented across major assistants.",
    benefits: [
      "Increased visibility inside AI-generated answers",
      "Content structured for both humans and machine summarization",
      "Early positioning in a fast-shifting discovery channel",
      "Ongoing monitoring of brand representation in AI answers",
    ],
    deliverables: [
      "AI visibility audit across major assistants",
      "Structured content and schema recommendations",
      "Authority-building roadmap",
      "Quarterly AI citation reporting",
    ],
    process: categoryProcess["Earned Media"],
    faqs: categoryFaqs["Earned Media"],
    relatedSlugs: ["seo", "digital-pr", "content-marketing"],
  },
  {
    slug: "local-seo",
    title: "Local SEO",
    category: "Earned Media",
    shortDescription: "Winning the map pack and local search results that drive foot traffic and calls.",
    description:
      "For multi-location and service-area businesses, local search is often the highest-intent channel available. We optimize listings, reviews, and location pages so you show up when nearby customers are ready to buy.",
    problem:
      "Inconsistent listings, thin location pages, and an unmanaged review process quietly cost local businesses their most valuable searches.",
    solution:
      "We standardize listings across every directory that matters, build location pages that actually rank, and put a real system behind review generation.",
    benefits: [
      "Higher map pack visibility across all locations",
      "More phone calls and direction requests",
      "A managed, compounding review profile",
      "Consistent brand data across every directory",
    ],
    deliverables: [
      "Listing audit and cleanup across directories",
      "Location page builds",
      "Review generation system",
      "Local ranking dashboard by location",
    ],
    process: categoryProcess["Earned Media"],
    faqs: categoryFaqs["Earned Media"],
    relatedSlugs: ["seo", "digital-pr", "website-design"],
  },
  {
    slug: "digital-pr",
    title: "Digital PR",
    category: "Earned Media",
    shortDescription: "Earned coverage and links from publications your customers already trust.",
    description:
      "We pitch original data, expert commentary, and newsworthy angles to journalists and publications, earning the kind of coverage and links that paid placements can't replicate.",
    problem:
      "Backlinks and brand mentions bought outright rarely hold up, and most outreach gets ignored because it isn't actually newsworthy.",
    solution:
      "We build campaigns around genuinely interesting data and expertise, then pitch them to the right journalists with a real news hook.",
    benefits: [
      "Authoritative backlinks from real publications",
      "Brand mentions that build third-party credibility",
      "Referral traffic from high-trust sources",
      "Stronger positioning for future outreach",
    ],
    deliverables: [
      "Campaign concepting and data storytelling",
      "Media list and journalist outreach",
      "Coverage tracking and reporting",
      "Executive commentary placement",
    ],
    process: categoryProcess["Earned Media"],
    faqs: categoryFaqs["Earned Media"],
    relatedSlugs: ["seo", "influencer-marketing", "geo"],
  },
  {
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    category: "Earned Media",
    shortDescription: "Creator partnerships that build trust faster than a brand can build it alone.",
    description:
      "We identify and manage creator partnerships aligned to your actual audience, negotiating terms and briefs that protect your brand while giving creators room to make content that performs.",
    problem:
      "Influencer spend is frequently wasted on reach that doesn't match the buyer, with no clear way to measure what it actually returned.",
    solution:
      "We vet creators against audience fit, not follower count, and set up tracking so every partnership can be measured against a real outcome.",
    benefits: [
      "Access to audiences that trust the creator's voice",
      "Content assets you can repurpose across channels",
      "Clear performance tracking per partnership",
      "Reduced risk through vetted, briefed creators",
    ],
    deliverables: [
      "Creator research and vetting",
      "Partnership negotiation and briefing",
      "Campaign coordination and QA",
      "Performance reporting by creator",
    ],
    process: categoryProcess["Earned Media"],
    faqs: categoryFaqs["Earned Media"],
    relatedSlugs: ["organic-social", "digital-pr", "paid-social"],
  },
  {
    slug: "organic-social",
    title: "Organic Social Media Management",
    category: "Earned Media",
    shortDescription: "Consistent, on-brand social presence that builds community, not just posts.",
    description:
      "We plan, create, and manage a social presence built around what your audience actually engages with, rather than a generic content calendar.",
    problem:
      "Inconsistent posting and content that isn't built for the platform quietly erodes brand trust and audience growth.",
    solution:
      "We build a content system tailored to each platform's format and your audience's behavior, and manage it on a consistent, sustainable cadence.",
    benefits: [
      "A consistent, recognizable brand presence",
      "Community growth that supports every other channel",
      "A content library you can repurpose",
      "Faster response to trends and conversation",
    ],
    deliverables: [
      "Platform strategy and content pillars",
      "Monthly content calendar and creation",
      "Community management",
      "Monthly performance reporting",
    ],
    process: categoryProcess["Earned Media"],
    faqs: categoryFaqs["Earned Media"],
    relatedSlugs: ["influencer-marketing", "paid-social", "media-design"],
  },

  // ---------------- PAID MEDIA ----------------
  {
    slug: "ppc",
    title: "Pay-Per-Click Advertising",
    category: "Paid Media",
    shortDescription: "Search campaigns engineered around cost-per-acquisition, not clicks.",
    description:
      "We build and manage search campaigns structured around your actual margins and sales cycle, with tracking accurate enough to trust the numbers we report.",
    heroStat: { value: "Weekly", label: "optimization cadence" },
    problem:
      "Poorly structured accounts waste budget on the wrong queries, and inaccurate tracking makes every reported result unreliable.",
    solution:
      "We rebuild campaign structure around intent and margin, fix tracking at the source, and optimize continuously against cost-per-acquisition.",
    benefits: [
      "Spend concentrated on queries that convert",
      "Accurate, auditable conversion tracking",
      "Transparent reporting tied to revenue, not vanity metrics",
      "Full ownership of your ad accounts and data",
    ],
    deliverables: [
      "Account audit and rebuild",
      "Campaign structure and bid strategy",
      "Ongoing optimization and testing",
      "Weekly performance dashboard",
    ],
    process: categoryProcess["Paid Media"],
    faqs: categoryFaqs["Paid Media"],
    relatedSlugs: ["display-advertising", "retargeting", "programmatic-advertising"],
  },
  {
    slug: "display-advertising",
    title: "Display Advertising",
    category: "Paid Media",
    shortDescription: "Visual campaigns built for awareness and demand generation, measured honestly.",
    description:
      "We design and place display campaigns across premium networks, built to move upper-funnel awareness metrics that eventually show up in demand.",
    problem:
      "Display is frequently bought without a clear objective, making it impossible to know whether it moved anything that matters.",
    solution:
      "We tie every display campaign to a specific funnel objective and measurement plan before a single impression is bought.",
    benefits: [
      "Brand visibility in premium, brand-safe placements",
      "Creative built and tested for the format",
      "Clear attribution to downstream conversions",
      "Frequency and placement control to protect brand quality",
    ],
    deliverables: [
      "Placement and network strategy",
      "Creative production and testing",
      "Brand-safety and viewability controls",
      "Upper-funnel performance reporting",
    ],
    process: categoryProcess["Paid Media"],
    faqs: categoryFaqs["Paid Media"],
    relatedSlugs: ["programmatic-advertising", "retargeting", "media-design"],
  },
  {
    slug: "paid-social",
    title: "Paid Social Media Advertising",
    category: "Paid Media",
    shortDescription: "Platform-native campaigns across Meta, TikTok, LinkedIn, and Pinterest.",
    description:
      "We build paid social campaigns designed for the platform's native format and audience behavior, with creative testing built into every cycle.",
    problem:
      "Repurposed creative and static targeting cause paid social costs to climb while performance flattens.",
    solution:
      "We run structured creative testing every cycle and refine audiences based on real purchase data, not platform defaults.",
    benefits: [
      "Lower cost-per-result through continuous creative testing",
      "Audience targeting grounded in real customer data",
      "Platform-native creative built to perform, not just look good",
      "Clear, honest reporting on what's working",
    ],
    deliverables: [
      "Platform and audience strategy",
      "Creative testing roadmap and production",
      "Campaign management and optimization",
      "Weekly performance reporting",
    ],
    process: categoryProcess["Paid Media"],
    faqs: categoryFaqs["Paid Media"],
    relatedSlugs: ["retargeting", "organic-social", "media-design"],
  },
  {
    slug: "retargeting",
    title: "Retargeting / Remarketing",
    category: "Paid Media",
    shortDescription: "Recovering the highest-intent visitors who didn't convert the first time.",
    description:
      "We build sequenced retargeting campaigns across search, social, and display to bring back visitors who showed intent but left before converting.",
    problem:
      "Most site visitors never convert on the first visit, and without a retargeting system that traffic is simply lost.",
    solution:
      "We segment visitors by behavior and build sequenced messaging that meets each segment where they left off.",
    benefits: [
      "Recovered revenue from warm, high-intent traffic",
      "Lower blended cost-per-acquisition",
      "Sequenced messaging instead of repetitive ads",
      "Frequency capping that protects brand experience",
    ],
    deliverables: [
      "Audience segmentation strategy",
      "Sequenced creative and messaging",
      "Cross-platform campaign setup",
      "Ongoing optimization and reporting",
    ],
    process: categoryProcess["Paid Media"],
    faqs: categoryFaqs["Paid Media"],
    relatedSlugs: ["ppc", "paid-social", "display-advertising"],
  },
  {
    slug: "affiliate-marketing",
    title: "Affiliate Marketing",
    category: "Paid Media",
    shortDescription: "Performance-based partnerships that only cost you when they convert.",
    description:
      "We build and manage affiliate programs — recruiting partners, structuring commissions, and monitoring for compliance — so growth stays performance-based.",
    problem:
      "Unmanaged affiliate programs attract low-quality partners and are vulnerable to fraud that quietly erodes margin.",
    solution:
      "We recruit vetted partners, structure fair commission tiers, and monitor traffic quality on an ongoing basis.",
    benefits: [
      "Growth channel with performance-based cost structure",
      "Vetted partner network aligned to your brand",
      "Ongoing fraud and compliance monitoring",
      "Clear reporting by partner and channel",
    ],
    deliverables: [
      "Program structure and commission strategy",
      "Partner recruitment and onboarding",
      "Compliance and fraud monitoring",
      "Monthly partner performance reporting",
    ],
    process: categoryProcess["Paid Media"],
    faqs: categoryFaqs["Paid Media"],
    relatedSlugs: ["ppc", "programmatic-advertising", "media-buying"],
  },
  {
    slug: "programmatic-advertising",
    title: "Programmatic Advertising",
    category: "Paid Media",
    shortDescription: "Automated, data-driven media buying across premium ad exchanges.",
    description:
      "We plan and manage programmatic campaigns across major demand-side platforms, using first-party and contextual data to reach the right audience at the right price.",
    problem:
      "Without disciplined targeting and inventory controls, programmatic budgets can burn quickly on low-quality inventory.",
    solution:
      "We apply strict inventory and brand-safety controls while using first-party data to keep spend concentrated on quality placements.",
    benefits: [
      "Efficient reach across premium exchanges",
      "Data-driven targeting beyond platform defaults",
      "Strong brand-safety and fraud controls",
      "Transparent reporting on spend and placement quality",
    ],
    deliverables: [
      "DSP strategy and setup",
      "Audience and inventory targeting",
      "Brand-safety configuration",
      "Ongoing optimization and reporting",
    ],
    process: categoryProcess["Paid Media"],
    faqs: categoryFaqs["Paid Media"],
    relatedSlugs: ["display-advertising", "media-buying", "retargeting"],
  },
  {
    slug: "media-buying",
    title: "Media Buying",
    category: "Paid Media",
    shortDescription: "Cross-channel budget strategy and negotiation across paid media.",
    description:
      "We plan, negotiate, and manage media budgets across channels, so spend is allocated to the mix that actually produces results — not the channel that's easiest to buy.",
    problem:
      "Without a cross-channel view, budget often gets allocated by habit rather than by what's actually driving return.",
    solution:
      "We build a unified media plan across channels, negotiate rates directly with publishers where possible, and reallocate budget based on blended performance.",
    benefits: [
      "A single, cross-channel view of media performance",
      "Negotiated rates and terms with key publishers",
      "Budget allocated to the channels that perform",
      "Consolidated reporting across every channel",
    ],
    deliverables: [
      "Cross-channel media plan",
      "Publisher negotiation and buying",
      "Budget pacing and reallocation",
      "Consolidated performance reporting",
    ],
    process: categoryProcess["Paid Media"],
    faqs: categoryFaqs["Paid Media"],
    relatedSlugs: ["programmatic-advertising", "ppc", "display-advertising"],
  },

  // ---------------- OWNED MEDIA ----------------
  {
    slug: "media-design",
    title: "Media Design & Creation",
    category: "Owned Media",
    shortDescription: "Static and motion creative built to perform across every channel.",
    description:
      "Our design team produces the static and motion assets that power your campaigns — built for the platform they'll run on, not repurposed from somewhere else.",
    problem:
      "Generic, repurposed creative underperforms and makes every other channel more expensive to run.",
    solution:
      "We design creative natively for each placement and test systematically, rather than producing one asset and hoping it works everywhere.",
    benefits: [
      "Creative built for the platform it runs on",
      "A consistent visual system across channels",
      "Faster creative turnaround for testing",
      "A reusable asset library over time",
    ],
    deliverables: [
      "Visual system and templates",
      "Channel-specific static and motion creative",
      "Creative testing variants",
      "Organized, reusable asset library",
    ],
    process: categoryProcess["Owned Media"],
    faqs: categoryFaqs["Owned Media"],
    relatedSlugs: ["video-production", "paid-social", "content-marketing"],
  },
  {
    slug: "video-production",
    title: "Video Production",
    category: "Owned Media",
    shortDescription: "Brand, product, and campaign video built for how people actually watch.",
    description:
      "From concept to final cut, we produce video built for the platform and the audience — short-form social, longer brand films, and everything in between.",
    problem:
      "Video that isn't planned for how and where it will be watched underperforms regardless of production quality.",
    solution:
      "We plan format, length, and pacing around the platform first, then bring production quality to match the brand.",
    benefits: [
      "Video built for its actual distribution channel",
      "A consistent visual and narrative style",
      "Reusable footage for multiple edits",
      "Clear performance tracking post-launch",
    ],
    deliverables: [
      "Concept and script development",
      "Production and direction",
      "Editing and post-production",
      "Platform-specific edits and cutdowns",
    ],
    process: categoryProcess["Owned Media"],
    faqs: categoryFaqs["Owned Media"],
    relatedSlugs: ["media-design", "content-marketing", "organic-social"],
  },
  {
    slug: "content-marketing",
    title: "Content Marketing",
    category: "Owned Media",
    shortDescription: "Editorial and resource content that earns trust and organic visibility.",
    description:
      "We plan and produce content built around real search and buyer intent, structured to earn organic visibility and move readers toward a decision.",
    problem:
      "Content produced without a clear intent or distribution plan rarely gets found and rarely moves the reader anywhere.",
    solution:
      "We map content to specific stages of the buyer journey and build distribution into the plan from day one.",
    benefits: [
      "Content that earns organic search visibility",
      "Assets that support sales conversations",
      "A consistent editorial voice across formats",
      "A compounding library of owned assets",
    ],
    deliverables: [
      "Content strategy and editorial calendar",
      "Research, writing, and editing",
      "On-page optimization",
      "Distribution and repurposing plan",
    ],
    process: categoryProcess["Owned Media"],
    faqs: categoryFaqs["Owned Media"],
    relatedSlugs: ["seo", "geo", "media-design"],
  },
  {
    slug: "website-design",
    title: "Website Design",
    category: "Owned Media",
    shortDescription: "Interfaces designed to explain, build trust, and convert.",
    description:
      "We design websites and product interfaces around clarity and conversion first, working from real content and user behavior rather than generic templates.",
    problem:
      "Most sites are built to look impressive in a design review, not to actually guide a real visitor toward a decision.",
    solution:
      "We design around the visitor's actual questions and the business's real content, testing structure before a single pixel is polished.",
    benefits: [
      "A site visitors can navigate without thinking",
      "A design system that scales as you grow",
      "A clear path from landing page to conversion",
      "Full ownership of your design files",
    ],
    deliverables: [
      "UX research and sitemap",
      "Wireframes and visual design",
      "Responsive design system",
      "Handoff-ready design files",
    ],
    process: categoryProcess["Owned Media"],
    faqs: categoryFaqs["Owned Media"],
    relatedSlugs: ["website-development", "cro", "media-design"],
  },
  {
    slug: "website-development",
    title: "Website Development",
    category: "Owned Media",
    shortDescription: "Fast, accessible, production-grade builds on modern web architecture.",
    description:
      "We build performant, accessible websites on modern frameworks, engineered for speed and search visibility from the first commit.",
    problem:
      "Slow, poorly structured sites cost businesses both search visibility and conversions, regardless of how good the design looks.",
    solution:
      "We build on modern, well-supported architecture with performance and accessibility treated as requirements, not afterthoughts.",
    benefits: [
      "Fast load times that support both SEO and conversion",
      "Accessible, standards-compliant code",
      "A codebase your team can maintain long-term",
      "Clean integration with analytics and marketing tools",
    ],
    deliverables: [
      "Technical architecture and setup",
      "Front-end and back-end development",
      "QA across browsers and devices",
      "Deployment and documentation",
    ],
    process: categoryProcess["Owned Media"],
    faqs: categoryFaqs["Owned Media"],
    relatedSlugs: ["website-design", "cro", "advanced-analytics"],
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    category: "Owned Media",
    shortDescription: "Lifecycle and campaign email that keeps your best channel healthy.",
    description:
      "We design, write, and manage email programs — from lifecycle automation to campaign sends — treating your list as one of your most valuable owned assets.",
    problem:
      "Unsegmented, infrequent, or poorly deliverable email quietly loses one of the highest-return channels a business owns.",
    solution:
      "We segment your list by real behavior, protect deliverability, and build automation around each stage of the customer relationship.",
    benefits: [
      "Higher open and click-through rates through segmentation",
      "Protected sender reputation and deliverability",
      "Automated flows that run without manual work",
      "Clear attribution to revenue by campaign",
    ],
    deliverables: [
      "List segmentation and deliverability audit",
      "Lifecycle automation build",
      "Campaign calendar and copywriting",
      "Monthly performance reporting",
    ],
    process: categoryProcess["Owned Media"],
    faqs: categoryFaqs["Owned Media"],
    relatedSlugs: ["lifecycle-marketing", "sms-marketing", "cro"],
  },
  {
    slug: "sms-marketing",
    title: "SMS Marketing",
    category: "Owned Media",
    shortDescription: "Direct, high-attention messaging used sparingly and effectively.",
    description:
      "We build compliant SMS programs for time-sensitive offers and updates — a channel with the highest attention rate of any owned asset, used deliberately.",
    problem:
      "SMS is easy to overuse, and lists quickly opt out when every message feels like a sale.",
    solution:
      "We build a message cadence and segmentation strategy that respects the channel, keeping opt-outs low and engagement high.",
    benefits: [
      "Near-immediate visibility for time-sensitive messages",
      "Compliant opt-in and opt-out management",
      "Higher engagement through disciplined cadence",
      "Clear attribution to conversions",
    ],
    deliverables: [
      "Compliance and opt-in setup",
      "Segmentation and cadence strategy",
      "Campaign copywriting and scheduling",
      "Monthly performance reporting",
    ],
    process: categoryProcess["Owned Media"],
    faqs: categoryFaqs["Owned Media"],
    relatedSlugs: ["email-marketing", "lifecycle-marketing", "cro"],
  },
  {
    slug: "lifecycle-marketing",
    title: "Lifecycle Marketing",
    category: "Owned Media",
    shortDescription: "Coordinated messaging across the full customer journey, not just acquisition.",
    description:
      "We map and build the messaging that carries a customer from first purchase through renewal and referral, coordinated across email, SMS, and in-product touchpoints.",
    problem:
      "Most marketing budget goes to acquisition while the existing customer relationship — the cheapest revenue available — is left on autopilot.",
    solution:
      "We map the full customer journey and build coordinated, triggered messaging at each meaningful stage.",
    benefits: [
      "Higher customer lifetime value",
      "Reduced churn through proactive messaging",
      "Coordinated messaging across every channel",
      "Clear reporting on retention and repeat revenue",
    ],
    deliverables: [
      "Customer journey mapping",
      "Cross-channel automation build",
      "Segmentation and trigger strategy",
      "Monthly retention reporting",
    ],
    process: categoryProcess["Owned Media"],
    faqs: categoryFaqs["Owned Media"],
    relatedSlugs: ["email-marketing", "sms-marketing", "advanced-analytics"],
  },
  {
    slug: "cro",
    title: "Conversion Rate Optimization",
    category: "Owned Media",
    shortDescription: "Structured testing that turns existing traffic into more revenue.",
    description:
      "We run structured, hypothesis-driven testing on your highest-traffic pages, so you get more from the visitors you already have before spending more to get new ones.",
    problem:
      "Most sites lose a significant share of qualified traffic to friction, unclear messaging, or an unclear next step.",
    solution:
      "We identify friction through real user behavior, prioritize by potential impact, and test changes in a controlled, measurable way.",
    benefits: [
      "More revenue from existing traffic",
      "Lower blended cost of acquisition",
      "A test-and-learn culture built on real data",
      "Clear documentation of what works and why",
    ],
    deliverables: [
      "Behavioral audit and heuristic review",
      "Prioritized testing roadmap",
      "Test design and implementation",
      "Monthly results and insights reporting",
    ],
    process: categoryProcess["Owned Media"],
    faqs: categoryFaqs["Owned Media"],
    relatedSlugs: ["website-development", "advanced-analytics", "reporting-dashboards"],
  },
  {
    slug: "advanced-analytics",
    title: "Advanced Data Analytics",
    category: "Owned Media",
    shortDescription: "Clean, trustworthy measurement across every channel you run.",
    description:
      "We build the tracking and analytics foundation that makes every other channel measurable — clean events, accurate attribution, and a single source of truth.",
    problem:
      "Without accurate tracking, every other marketing decision is a guess dressed up as a data point.",
    solution:
      "We audit and rebuild tracking at the source, then connect it to reporting that reflects what actually happened.",
    benefits: [
      "Trustworthy data behind every marketing decision",
      "A single source of truth across channels",
      "Faster identification of what's actually working",
      "Reduced wasted spend from bad attribution",
    ],
    deliverables: [
      "Tracking and tagging audit",
      "Analytics and attribution setup",
      "Custom reporting build",
      "Ongoing data QA",
    ],
    process: categoryProcess["Owned Media"],
    faqs: categoryFaqs["Owned Media"],
    relatedSlugs: ["reporting-dashboards", "cro", "website-development"],
  },
  {
    slug: "reporting-dashboards",
    title: "Reporting Dashboards",
    category: "Owned Media",
    shortDescription: "Live, centralized reporting that replaces manual spreadsheets.",
    description:
      "We build centralized dashboards that pull every channel into one live view, so performance conversations start from agreed facts instead of competing exports.",
    problem:
      "Manually assembled reporting is slow, error-prone, and often out of date by the time it reaches decision-makers.",
    solution:
      "We connect your channels to a live dashboard built around the metrics that actually drive your business decisions.",
    benefits: [
      "One live view across every marketing channel",
      "Faster, more confident decision-making",
      "Less time spent assembling manual reports",
      "Dashboards built around your business, not a template",
    ],
    deliverables: [
      "Metrics and KPI framework",
      "Dashboard design and build",
      "Data source integration",
      "Team onboarding and documentation",
    ],
    process: categoryProcess["Owned Media"],
    faqs: categoryFaqs["Owned Media"],
    relatedSlugs: ["advanced-analytics", "cro", "website-development"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((service) => service.category === category);
}

export const serviceCategories: {
  name: ServiceCategory;
  description: string;
}[] = [
  {
    name: "Earned Media",
    description:
      "We help your brand earn visibility, authority, and organic attention that doesn't disappear when the budget stops.",
  },
  {
    name: "Paid Media",
    description:
      "We put your message in front of the right audience with campaigns measured against real cost-per-acquisition.",
  },
  {
    name: "Owned Media",
    description:
      "We build the digital assets and experiences your brand controls outright — sites, content, and lifecycle systems.",
  },
];
