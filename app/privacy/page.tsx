import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
};

const sections = [
  {
    title: "1. Information we collect",
    body: `We collect information you provide directly to us, such as when you submit our contact form — including your name, email address, phone number, company, and project details. We also collect standard technical information such as browser type and pages visited, via analytics tools if and when they are enabled.`,
  },
  {
    title: "2. How we use your information",
    body: `We use the information we collect to respond to inquiries, provide our services, improve this website, and — where you've agreed to it — send relevant updates. We do not sell personal information to third parties.`,
  },
  {
    title: "3. Cookies and analytics",
    body: `This site may use cookies and similar technologies for analytics once tracking tools (such as Google Analytics or Meta Pixel) are configured. You can control cookies through your browser settings.`,
  },
  {
    title: "4. Data sharing",
    body: `We may share information with service providers who help us operate this website and deliver our services (for example, email delivery or analytics providers), under obligations to protect your data.`,
  },
  {
    title: "5. Data retention",
    body: `We retain personal information for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law.`,
  },
  {
    title: "6. Your rights",
    body: `Depending on your location, you may have the right to access, correct, or delete your personal information. To make a request, contact us using the details below.`,
  },
  {
    title: "7. Contact",
    body: `Questions about this policy can be sent to ${siteConfig.contact.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Placeholder legal content — replace with a policy reviewed by qualified counsel before this site goes live."
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl space-y-10">
            <p className="text-sm text-fg-soft/60">Last updated: January 1, 2026</p>
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-medium text-fg">
                  {section.title}
                </h2>
                <p className="mt-3 leading-relaxed text-fg-soft/80">{section.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
