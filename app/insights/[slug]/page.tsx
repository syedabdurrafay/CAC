import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { insights, getInsightBySlug } from "@/lib/insights";
import { articleJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd(post.title, post.excerpt, post.date, post.slug)
          ),
        }}
      />
      <article>
        <section className="border-b border-line py-16 md:py-20">
          <Container>
            <p className="text-sm font-medium text-current">
              {post.category} in {post.readTime}
            </p>
            <h1 className="font-display mt-3 max-w-3xl text-balance text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-ink-soft/60">{formattedDate}</p>
          </Container>
        </section>

        <section className="border-b border-line">
          <div className="relative aspect-[16/7] w-full bg-paper-dim">
            <Image src={post.image} alt="" fill unoptimized className="object-cover" />
          </div>
        </section>

        <section className="py-16 md:py-20">
          <Container>
            <div className="mx-auto max-w-2xl space-y-6">
              {post.body.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-ink-soft/85">
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <h2 className="font-display max-w-xl text-balance text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Want a plan built for your business?
            </h2>
            <ButtonLink href="/contact" className="shrink-0">
              Start a project
            </ButtonLink>
          </Container>
        </section>
      </article>
    </>
  );
}
