import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { projects } from "@/lib/projects";

export function FeaturedWork() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            title="Selected work."
            description="A look at how the three media types come together on real engagements."
          />
          <ButtonLink href="/work" variant="secondary" className="shrink-0">
            View all work
          </ButtonLink>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <CaseStudyCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
