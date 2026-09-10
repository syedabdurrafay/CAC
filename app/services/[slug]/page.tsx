import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/animations/Reveal";
import { services, getServiceBySlug } from "@/lib/services";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} — ${siteConfig.name}`,
      description: service.shortDescription,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = service.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd(service.title, service.shortDescription, service.slug)
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Services", url: `${siteConfig.url}/services` },
              { name: service.title, url: `${siteConfig.url}/services/${service.slug}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="border-b border-line py-16 md:py-24">
        <Container>
          <p className="text-sm font-medium text-current">{service.category}</p>
          <div className="mt-3 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h1 className="font-display max-w-2xl text-balance text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {service.title}
            </h1>
            {service.heroStat && (
              <div className="shrink-0 border-l border-line pl-6">
                <p className="font-display text-3xl font-medium text-ink">
                  {service.heroStat.value}
                </p>
                <p className="text-sm text-ink-soft/60">{service.heroStat.label}</p>
              </div>
            )}
          </div>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft/80">
            {service.description}
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact">Talk to our team</ButtonLink>
          </div>
        </Container>
      </section>

      {/* Problem / Solution */}
      <section className="border-b border-line py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-ink">
              The problem
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft/80">
              {service.problem}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-2xl font-medium text-ink">
              Our approach
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft/80">
              {service.solution}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Benefits & Deliverables */}
      <section className="border-b border-line py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-medium text-ink">
              What you get
            </h2>
            <ul className="mt-5 space-y-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-ink-soft/85">
                  <Check size={18} className="mt-0.5 shrink-0 text-current" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-medium text-ink">
              Deliverables
            </h2>
            <ul className="mt-5 space-y-3">
              {service.deliverables.map((item) => (
                <li key={item} className="border-b border-line pb-3 text-ink-soft/85 last:border-b-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-medium text-ink">
            How we run it
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <div key={step.title} className="border-t border-ink/15 pt-4">
                <span className="text-sm text-ink-soft/50">0{i + 1}</span>
                <h3 className="font-display mt-1 text-lg font-medium text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft/75">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-medium text-ink">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <Accordion items={service.faqs} />
          </div>
        </Container>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="border-b border-line py-16 md:py-20">
          <Container>
            <h2 className="font-display text-2xl font-medium text-ink">
              Related services
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="group flex items-center justify-between rounded-[var(--radius-md)] border border-line bg-white px-5 py-4"
                >
                  <span className="text-sm font-medium text-ink">{r.title}</span>
                  <ArrowUpRight
                    size={16}
                    className="text-ink-soft/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-display max-w-xl text-balance text-3xl font-medium leading-tight text-ink sm:text-4xl">
            Ready to talk about {service.title.toLowerCase()}?
          </h2>
          <ButtonLink href="/contact" className="shrink-0">
            Book a strategy call
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
