# RoveTech — Digital Growth Agency Website

A production-ready marketing website for RoveTech, a digital growth agency
founded by Syed Rafay, Ammar Nadeem, Ubaid Ur Rehman, and Hamza Khan.

Built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

---

## RoveTech brand & theme

- **Logo files:** `public/brand/` (`logo-mark.png`, `logo-wordmark.png`, `logo-full.png`, favicon and app icons). Social preview image: `public/images/og/og-default.png`.
- **Colors:** all theme colors live in `app/globals.css` under `@theme` (void `#03070b`, surface, accent cyan `#19d3e8`, etc.). Change them there and the whole site follows.
- **Effects:** HUD grid + aurora background (`.world`), glass cards (`.hud`), neon text (`.text-neon`), scroll bar and cursor glow (`components/layout/Effects.tsx`).
- **Placeholders to replace before launch:** domain, email, phone, address, social links (`lib/site.ts`), team bios, case-study images.

## 1. Tech stack

- **Next.js 16** (App Router, Server Components by default)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-based theme config, see `app/globals.css`)
- **Framer Motion** for animation
- **Lucide React** for icons
- **next/image** and **next/font** for optimized assets and typography

No database, CMS, or state management library is used — all content lives in
plain TypeScript files under `lib/`.

---

## 2. Folder structure

```
app/
  layout.tsx              Root layout — fonts, metadata, nav/footer shell
  page.tsx                Homepage
  globals.css             Design tokens + Tailwind entry point
  sitemap.ts               Generates /sitemap.xml
  robots.ts                Generates /robots.txt
  not-found.tsx            Custom 404
  error.tsx                Global error boundary
  loading.tsx              Global loading state
  services/page.tsx        Services overview
  services/[slug]/page.tsx Service detail (dynamic, static generation)
  work/page.tsx             Work / case studies overview
  work/[slug]/page.tsx      Case study detail (dynamic)
  about/page.tsx
  team/page.tsx
  contact/page.tsx
  insights/page.tsx
  insights/[slug]/page.tsx  Blog post detail (dynamic)
  privacy/page.tsx
  terms/page.tsx
  api/contact/route.ts      Contact form submission endpoint

components/
  layout/       Navbar, MobileMenu, Footer, Logo, AnnouncementBar, AnalyticsScripts
  sections/     Homepage + interior page sections (Hero, Process, FAQ, etc.)
  services/     ServiceCard, ServiceCategoryBlock
  work/         CaseStudyCard
  team/         FounderCard
  forms/        ContactForm
  ui/           Button, Container, SectionHeading, Accordion, Badge
  animations/   Reveal (scroll-triggered motion wrapper)

lib/
  site.ts           Agency name, contact info, socials, homepage stats
  navigation.ts     Nav links (desktop + footer)
  services.ts       All services — the source of truth for /services/*
  projects.ts       Case studies — the source of truth for /work/*
  team.ts           Founders — the source of truth for /team and homepage
  insights.ts       Blog posts — the source of truth for /insights/*
  structured-data.ts  JSON-LD schema helpers
  analytics.ts      Reads analytics IDs from environment variables
  utils.ts          `cn()` class-merging helper

types/
  index.ts          Shared TypeScript interfaces

public/
  images/           Placeholder SVGs for team, work, insights, OG image
```

---

## 3. Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

### Production build

```bash
npm run build
npm start
```

The build must complete with zero TypeScript and ESLint errors before
deploying.

---

## 4. Content editing guide

You should never need to touch component/page code to update business
content. Everything editable lives in `lib/`.

### Add or edit a service

1. Open `lib/services.ts`.
2. Copy an existing object in the `services` array, or edit one directly.
3. Set a unique `slug` — this becomes the URL: `/services/your-slug`.
4. Fill in every field (`shortDescription`, `benefits`, `process`, `faqs`, etc).
5. Save. The service automatically appears in the mega menu, the `/services`
   page, and gets its own detail page — no route file needed.

### Add or edit a founder / team member

1. Open `lib/team.ts`.
2. Add a photo to `public/images/team/` (any image format works).
3. Copy an object in the `team` array, update the fields, and point `photo`
   at your new image.
4. Save. They appear on `/team`, `/about`, and the homepage automatically.

### Add or edit a case study

1. Open `lib/projects.ts`.
2. Add an image to `public/images/work/`.
3. Copy an object in the `projects` array and fill in every field. Set
   `isPlaceholder: false` once the data is real, approved client information
   (this removes the "placeholder" badge shown on the case study page).
4. Save. It appears on `/work` and gets its own page at `/work/your-slug`.

### Add or edit a blog post ("Insight")

1. Open `lib/insights.ts`.
2. Add an image to `public/images/insights/`.
3. Copy an object in the `insights` array. `body` is an array of paragraphs,
   rendered in order — add or remove strings as needed.
4. Save. It appears on `/insights` and gets its own page.

### Change agency name, logo, contact info, or social links

- **Name, tagline, description, stats, industries:** `lib/site.ts`
- **Contact email/phone/address:** `lib/site.ts` → `siteConfig.contact`
- **Social links:** `lib/site.ts` → `siteConfig.socials`
- **Logo:** `components/layout/Logo.tsx` (currently an inline SVG mark plus
  the agency name — replace the `<svg>` with your own mark, or swap in an
  `<Image>` pointing at a file in `public/images/`)

### Change colors, fonts, or spacing

All design tokens live at the top of `app/globals.css` under `:root`:

```css
--color-ink: #14151a;      /* primary text / dark backgrounds */
--color-paper: #f6f5f1;    /* light background */
--color-current: #3644ff;  /* accent color, used sparingly */
```

Fonts are loaded via `next/font/google` in `app/layout.tsx` (currently
Space Grotesk for display type, Inter for body text). Swap the imported
font or adjust weights there.

### Change SEO metadata

- **Site-wide defaults:** `app/layout.tsx` → the `metadata` export.
- **Per-page metadata:** each `page.tsx` exports its own `metadata` object
  (or `generateMetadata()` for dynamic routes).
- **Sitemap / robots:** generated automatically from `lib/services.ts`,
  `lib/projects.ts`, and `lib/insights.ts` — no manual editing needed.

---

## 5. Connecting the contact form to a real email provider

The form at `/contact` posts to `app/api/contact/route.ts`, which validates
and sanitizes input but does not send email out of the box — submissions are
currently logged server-side so you can verify the flow in development.

To connect a provider:

1. Pick a provider: [Resend](https://resend.com), [Formspree](https://formspree.io),
   or [HubSpot Forms](https://developers.hubspot.com/docs/api/marketing/forms).
2. Add the relevant API key(s) to `.env.local` (see `.env.example`).
3. Implement the send call inside `deliverSubmission()` in
   `app/api/contact/route.ts` — an example using Resend is commented in that
   file already.

No API keys are ever exposed to the browser; the route runs server-side only.

---

## 6. Analytics

Analytics scripts are provider-gated by environment variable — nothing loads
unless you set an ID. See `.env.example` for the full list
(`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GTM_ID`,
`NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ID`).

The `<AnalyticsScripts />` component (`components/layout/AnalyticsScripts.tsx`)
is already included in `app/layout.tsx` — it simply renders nothing until you
add IDs to your environment.

---

## 7. Deploying to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. In Vercel, "Add New Project" → import the repository. Framework preset
   `Next.js` is detected automatically — no configuration needed.
3. Add any environment variables from `.env.example` you're using
   (Project Settings → Environment Variables).
4. Deploy. Every push to your main branch redeploys automatically.
5. Connect your domain under Project Settings → Domains, and update
   `NEXT_PUBLIC_SITE_URL` (and `siteConfig.url` in `lib/site.ts`) to match.

---

## 8. What's marked as a placeholder

Per the original brief, nothing here fabricates real client results, logos,
or biographical details. The following are clearly marked and should be
replaced with real, approved content before launch:

- Founder bios and photos (`lib/team.ts`) — real photos and bios needed
- Case studies (`lib/projects.ts`) — flagged `isPlaceholder: true`, real
  metrics needed
- Contact details, social links, domain (`lib/site.ts`) — replace with live
  values
- Legal copy (`app/privacy/page.tsx`, `app/terms/page.tsx`) — needs review
  by qualified counsel
