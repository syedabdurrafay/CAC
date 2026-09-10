import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { insights } from "@/lib/insights";

export function InsightsPreview() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            title="Insights."
            description="Notes from the team on what's actually moving performance across search, paid, and owned media."
          />
          <ButtonLink href="/insights" variant="secondary" className="shrink-0">
            Read all insights
          </ButtonLink>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {insights.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link href={`/insights/${post.slug}`} className="group block">
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
                <h3 className="font-display mt-2 text-lg font-medium leading-snug text-ink">
                  {post.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
