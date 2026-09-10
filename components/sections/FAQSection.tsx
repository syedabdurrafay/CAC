import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

const faqs = [
  {
    question: "What size of business do you work with?",
    answer:
      "Most of our clients are past the founder-does-everything stage but not yet running an internal marketing team large enough to cover search, paid, and owned media in-house. If that's not you, we'll tell you honestly on the first call.",
  },
  {
    question: "Do you require long-term contracts?",
    answer:
      "We ask for an initial engagement long enough to see real results — typically a quarter — but we don't lock clients into multi-year terms. Retention is earned month to month after that.",
  },
  {
    question: "Can you work alongside our internal marketing team?",
    answer:
      "Yes. We regularly plug into existing teams as the specialist capacity they're missing, rather than replacing them outright.",
  },
  {
    question: "How do you report on results?",
    answer:
      "You get a live dashboard built around your actual business metrics, plus a monthly working session to go through what changed and why — not a static deck.",
  },
  {
    question: "What does getting started look like?",
    answer:
      "A short discovery call, followed by a proposal scoped to your goals and budget. If it's a fit, we typically start within two to three weeks.",
  },
];

export function FAQSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading title="Questions we hear often." />
        <div className="mt-10">
          <Accordion items={faqs} />
        </div>
      </Container>
    </section>
  );
}
