import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project and a member of our team will reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your project."
        description="Share a few details below and we'll come back with next steps — usually within one business day."
      />
      <section className="py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-display text-xl font-medium text-fg">
              Other ways to reach us
            </h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium text-fg">Email</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm text-fg-soft/75 hover:text-accent"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium text-fg">Phone</p>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-sm text-fg-soft/75 hover:text-accent"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium text-fg">Office</p>
                  <p className="text-sm text-fg-soft/75">
                    {siteConfig.contact.addressLine1}
                    <br />
                    {siteConfig.contact.addressLine2}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="md:col-span-8">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
