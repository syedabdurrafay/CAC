import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engagements across earned, paid, and owned media — challenge, approach, and outcome for each.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Selected engagements."
        description="A look at how strategy turns into shipped work. Case studies below are marked where they use placeholder data."
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <CaseStudyCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
