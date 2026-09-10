import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { FounderCard } from "@/components/team/FounderCard";
import { team } from "@/lib/team";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Northfield is a digital growth agency built around one idea: marketing should be run like engineering.",
};

const values = [
  {
    title: "Clarity over cleverness",
    description:
      "If a strategy takes twenty minutes to explain, it's usually wrong. We favor plans a client can repeat back to their own team.",
  },
  {
    title: "Data before opinion",
    description:
      "We form a point of view after looking at the numbers, not before. Instinct sets the hypothesis; data decides the outcome.",
  },
  {
    title: "Ownership, not lock-in",
    description:
      "Every account, asset, and line of code we touch belongs to the client. Retention has to be earned by results.",
  },
  {
    title: "Senior hands on the work",
    description:
      `Small enough that the people scoping ${siteConfig.name}'s engagements are the people doing the work.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Marketing, run like engineering."
        description={siteConfig.description}
      />

      <section className="border-b border-line py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-ink">
              How we think about the work
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft/80">
              Most agencies specialize in one channel and hand you off between
              vendors for the rest. {siteConfig.name} was built around the
              opposite idea — that search, paid, and owned media only compound
              when one accountable team is running all three against the same
              plan.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-2xl font-medium text-ink">
              How we work
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft/80">
              Every engagement starts with the same question: how does this
              business actually make money? From there we build a plan tied
              to specific outcomes, ship work on a fixed cadence, and adjust
              based on what the data says — not what the calendar says.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-medium text-ink">
            What we believe
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.06}>
                <div className="border-t border-ink/15 pt-4">
                  <h3 className="font-display text-lg font-medium text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft/75">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-medium text-ink">
            Founders
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <FounderCard key={member.slug} member={member} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-display max-w-xl text-balance text-3xl font-medium leading-tight text-ink sm:text-4xl">
            Want to know if we&apos;re the right fit?
          </h2>
          <ButtonLink href="/contact" className="shrink-0">
            Talk to our team
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
