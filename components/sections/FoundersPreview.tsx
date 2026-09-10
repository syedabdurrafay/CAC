import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { FounderCard } from "@/components/team/FounderCard";
import { team } from "@/lib/team";

export function FoundersPreview() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            title="Built and run by four founders."
            description="No account layer between you and the people making decisions on your engagement."
          />
          <ButtonLink href="/team" variant="secondary" className="shrink-0">
            Meet the team
          </ButtonLink>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal key={member.slug} delay={i * 0.06}>
              <FounderCard member={member} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
