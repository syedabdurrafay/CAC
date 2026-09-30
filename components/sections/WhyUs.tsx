import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";

const reasons = [
  {
    title: "One team, three disciplines",
    description:
      "Earned, paid, and owned media are usually split across separate vendors who don't talk to each other. We run all three as one coordinated system.",
  },
  {
    title: "Senior-led delivery",
    description:
      "The people who scope your engagement are the people who work on it — not a rotating account team you rebuild trust with every quarter.",
  },
  {
    title: "You own everything",
    description:
      "Ad accounts, analytics, code, and creative files belong to you. Nothing about our engagement locks you in.",
  },
  {
    title: "Reporting you can trust",
    description:
      "We fix tracking before we report on it. Every number in your dashboard is one we'd defend in a room.",
  },
];

export function WhyUs() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Why teams choose RoveTech."
          description="A smaller list of reasons than most agencies give you — because we'd rather be specific than exhaustive."
        />

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.06}>
              <div>
                <h3 className="font-display text-xl font-medium text-fg">
                  {reason.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-soft/75">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
