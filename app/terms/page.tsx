import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern use of the ${siteConfig.name} website.`,
};

const sections = [
  {
    title: "1. Acceptance of terms",
    body: `By accessing this website, you agree to be bound by these terms. If you do not agree, please do not use this site.`,
  },
  {
    title: "2. Use of this website",
    body: `This website is provided for informational purposes about ${siteConfig.legalName}'s services. You agree not to misuse the site, attempt unauthorized access, or use it in a way that could damage or impair it.`,
  },
  {
    title: "3. Intellectual property",
    body: `All content on this website — including text, graphics, logos, and code — is the property of ${siteConfig.legalName} unless otherwise noted, and may not be reproduced without permission.`,
  },
  {
    title: "4. No warranty",
    body: `This website is provided "as is" without warranties of any kind, express or implied. We do not guarantee the site will be uninterrupted, secure, or error-free.`,
  },
  {
    title: "5. Limitation of liability",
    body: `To the fullest extent permitted by law, ${siteConfig.legalName} is not liable for any indirect, incidental, or consequential damages arising from use of this website.`,
  },
  {
    title: "6. Changes to these terms",
    body: `We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.`,
  },
  {
    title: "7. Contact",
    body: `Questions about these terms can be sent to ${siteConfig.contact.email}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="Placeholder legal content — replace with terms reviewed by qualified counsel before this site goes live."
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
