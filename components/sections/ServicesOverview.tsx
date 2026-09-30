import Link from "next/link";
import { ArrowUpRight, Search, Target, Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { serviceCategories, getServicesByCategory } from "@/lib/services";
import type { ServiceCategory } from "@/types";

const icons: Record<ServiceCategory, React.ComponentType<{ size?: number; className?: string }>> = {
  "Earned Media": Search,
  "Paid Media": Target,
  "Owned Media": Layers,
};

export function ServicesOverview() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Everything you need to grow online."
          description="One team across the three media types that actually move revenue — coordinated instead of siloed."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {serviceCategories.map((category, i) => {
            const Icon = icons[category.name];
            const catServices = getServicesByCategory(category.name);
            return (
              <Reveal key={category.name} delay={i * 0.08}>
                <div className="flex h-full flex-col hud rounded-[var(--radius-md)] border border-line bg-surface p-7">
                  <Icon size={22} className="text-accent" />
                  <h3 className="font-display mt-5 text-xl font-medium text-fg">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-soft/75">
                    {category.description}
                  </p>

                  <ul className="mt-6 flex-1 space-y-2 border-t border-line pt-6">
                    {catServices.slice(0, 5).map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-sm text-fg-soft transition-colors hover:text-accent"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/services"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
                  >
                    View all services
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
