import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { FounderCard } from "@/components/team/FounderCard";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the founders behind Northfield.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="The people behind the work."
        description="Four founders, one accountable team — no account layer between you and the people making decisions."
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <FounderCard key={member.slug} member={member} />
            ))}
          </div>
        </Container>
      </section>
      <section className="border-t border-line py-16 md:py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-display max-w-xl text-balance text-3xl font-medium leading-tight text-ink sm:text-4xl">
            Want to work with us directly?
          </h2>
          <ButtonLink href="/contact" className="shrink-0">
            Get in touch
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
