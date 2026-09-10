import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { insights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes from the Northfield team on search, paid media, and owned media performance.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes on what's actually working."
        description="Practical write-ups from the team — not recycled predictions."
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {insights.map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-md)] border border-line bg-paper-dim">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 text-xs font-medium text-ink-soft/50">
                  {post.category} in {post.readTime}
                </p>
                <h2 className="font-display mt-2 text-lg font-medium leading-snug text-ink">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft/75">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
