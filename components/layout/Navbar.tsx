"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { mainNav } from "@/lib/navigation";
import { serviceCategories, getServicesByCategory } from "@/lib/services";

export function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-line bg-void/60 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Logo size={38} />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {mainNav.map((item) =>
            item.label === "Services" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-sm font-medium text-fg-soft transition-colors hover:text-accent"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-4"
                    >
                      <div className="grid grid-cols-3 gap-8 rounded-[var(--radius-md)] border border-line-bright bg-surface/95 p-8 shadow-[0_30px_80px_-20px_rgba(25,211,232,0.25)] backdrop-blur-xl">
                        {serviceCategories.map((cat) => (
                          <div key={cat.name}>
                            <p className="hud-label mb-3 text-accent/80">
                              {cat.name}
                            </p>
                            <ul className="space-y-2.5">
                              {getServicesByCategory(cat.name).map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    className="text-sm text-fg-soft transition-colors hover:text-accent"
                                    onClick={() => setServicesOpen(false)}
                                  >
                                    {service.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-fg-soft transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/contact" variant="primary">
            Let&apos;s Talk
          </ButtonLink>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </Container>
    </header>
    {/* Rendered outside <header>: its backdrop-filter would otherwise trap the fixed overlay */}
    <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
