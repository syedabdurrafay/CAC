import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "We learn how the business actually makes money before proposing anything.",
  },
  {
    number: "02",
    title: "Strategize",
    description: "We build a growth plan tied to specific, measurable outcomes.",
  },
  {
    number: "03",
    title: "Build",
    description: "Campaigns, websites, content, and systems get built against that plan.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Everything ships in a controlled release, checked before it goes live.",
  },
  {
    number: "05",
    title: "Optimize",
    description: "We read the data weekly and adjust — not just report on it monthly.",
  },
  {
    number: "06",
    title: "Grow",
    description: "Budget and effort concentrate on what's proven to return.",
  },
];

export function Process() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <Container>
        <SectionHeading
          title="A process built to compound, not just report."
          description="Six stages, one accountable team — from first conversation to the point where growth is repeatable."
        />

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.05}>
              <div className="border-t border-ink/15 pt-5">
                <span className="font-display text-sm text-ink-soft/50">
                  {step.number}
                </span>
                <h3 className="font-display mt-2 text-xl font-medium text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft/75">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
