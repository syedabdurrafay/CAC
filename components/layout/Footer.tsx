import Link from "next/link";
import { LinkedInIcon, InstagramIcon, XIcon } from "@/components/ui/SocialIcons";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { siteConfig } from "@/lib/site";
import { footerNav } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <div className="border-b border-white/10 pb-16 md:pb-20">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <h2 className="font-display max-w-xl text-balance text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Ready to build what&apos;s next?
            </h2>
            <ButtonLink href="/contact" variant="inverse" className="shrink-0">
              Start a conversation
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 pt-16 md:grid-cols-5">
          <div className="col-span-2">
            <Logo inverse />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={siteConfig.socials.linkedin}
                aria-label="Northfield on LinkedIn"
                className="text-paper/60 transition-colors hover:text-paper"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </a>
              <a
                href={siteConfig.socials.instagram}
                aria-label="Northfield on Instagram"
                className="text-paper/60 transition-colors hover:text-paper"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </a>
              <a
                href={siteConfig.socials.x}
                aria-label="Northfield on X"
                className="text-paper/60 transition-colors hover:text-paper"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium text-paper/40">Company</p>
            <ul className="space-y-3">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-paper/70 hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium text-paper/40">Resources</p>
            <ul className="space-y-3">
              {footerNav.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-paper/70 hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium text-paper/40">Contact</p>
            <ul className="space-y-3 text-sm text-paper/70">
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-paper">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-paper">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="text-paper/50">
                {siteConfig.contact.addressLine1}
                <br />
                {siteConfig.contact.addressLine2}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-paper/70">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-paper/70">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
