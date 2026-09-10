"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/lib/navigation";
import { serviceCategories, getServicesByCategory } from "@/lib/services";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [servicesExpanded, setServicesExpanded] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-paper md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-16 items-center justify-between px-6">
            <Logo inverse />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col px-6 pb-10 pt-4">
            {mainNav.map((item) =>
              item.label === "Services" ? (
                <div key={item.href} className="border-b border-white/10 py-4">
                  <button
                    className="flex w-full items-center justify-between text-2xl font-medium"
                    onClick={() => setServicesExpanded((v) => !v)}
                    aria-expanded={servicesExpanded}
                  >
                    {item.label}
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-200 ${servicesExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {servicesExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-5 pb-2 pt-4">
                          {serviceCategories.map((cat) => (
                            <div key={cat.name}>
                              <p className="mb-2 text-xs font-medium text-paper/40">
                                {cat.name}
                              </p>
                              <ul className="space-y-2">
                                {getServicesByCategory(cat.name).map((service) => (
                                  <li key={service.slug}>
                                    <Link
                                      href={`/services/${service.slug}`}
                                      className="text-sm text-paper/80"
                                      onClick={onClose}
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
                  onClick={onClose}
                  className="border-b border-white/10 py-4 text-2xl font-medium"
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="mt-8">
              <ButtonLink href="/contact" variant="inverse" onClick={onClose} className="w-full">
                Let&apos;s Talk
              </ButtonLink>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
