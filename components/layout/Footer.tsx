import Link from "next/link";
import { LinkedInIcon, InstagramIcon, XIcon } from "@/components/ui/SocialIcons";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { siteConfig } from "@/lib/site";
import { footerNav } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-void/70 text-fg backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <Container className="relative py-20 md:py-28">
        <div className="border-b border-line pb-16 md:pb-20">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <h2 className="font-display max-w-xl text-balance text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Ready to build what&apos;s <span className="text-neon">next</span>?
            </h2>
            <ButtonLink href="/contact" variant="primary" className="shrink-0">
              Start a conversation
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 pt-16 md:grid-cols-5">
          <div className="col-span-2">
            <Logo size={44} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-soft">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={siteConfig.socials.linkedin}
                aria-label="RoveTech on LinkedIn"
                className="text-fg-soft transition-colors hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </a>
              <a
                href={siteConfig.socials.instagram}
                aria-label="RoveTech on Instagram"
                className="text-fg-soft transition-colors hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </a>
              <a
                href={siteConfig.socials.x}
                aria-label="RoveTech on X"
                className="text-fg-soft transition-colors hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 hud-label text-accent/80">Company</p>
            <ul className="space-y-3">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-fg-soft transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 hud-label text-accent/80">Resources</p>
            <ul className="space-y-3">
              {footerNav.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-fg-soft transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 hud-label text-accent/80">Contact</p>
            <ul className="space-y-3 text-sm text-fg-soft">
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-accent">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.contact.phone}`} className="transition-colors hover:text-accent">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="text-fg-soft/70">
                {siteConfig.contact.addressLine1}
                <br />
                {siteConfig.contact.addressLine2}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 hud-label text-fg-soft/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
