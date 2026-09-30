import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { projects, getProjectBySlug } from "@/lib/projects";
import { getServiceBySlug } from "@/lib/services";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const usedServices = project.servicesUsed
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <section className="border-b border-line py-16 md:py-20">
        <Container>
          {project.isPlaceholder && (
            <p className="mb-4 inline-block rounded-[var(--radius-sm)] border border-accent bg-accent-dim px-3 py-1 text-xs font-medium text-accent">
              Placeholder case study — pending real client data
            </p>
          )}
          <p className="text-sm font-medium text-accent">{project.industry}</p>
          <h1 className="font-display mt-3 max-w-2xl text-balance text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-soft/80">
            {project.summary}
          </p>
        </Container>
      </section>

      <section className="border-b border-line">
        <div className="relative aspect-[16/7] w-full bg-surface-2">
          <Image
            src={project.image}
            alt={`${project.name} case study cover`}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-medium text-fg">
              The challenge
            </h2>
            <p className="mt-3 leading-relaxed text-fg-soft/80">
              {project.challenge}
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-medium text-fg">
              The approach
            </h2>
            <p className="mt-3 leading-relaxed text-fg-soft/80">
              {project.solutionText}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-medium text-fg">Results</h2>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            {project.results.map((result) => (
              <div key={result.label}>
                <p className="font-display text-3xl font-medium text-fg">
                  {result.value}
                </p>
                <p className="mt-1 text-sm text-fg-soft/60">{result.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-medium text-fg">
            Services used
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {usedServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-[var(--radius-sm)] border border-line bg-surface px-4 py-2 text-sm font-medium text-fg hover:border-accent/60 hover:text-accent"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-display max-w-xl text-balance text-3xl font-medium leading-tight text-fg sm:text-4xl">
            Want results like this for your brand?
          </h2>
          <ButtonLink href="/contact" className="shrink-0">
            Start a project
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
