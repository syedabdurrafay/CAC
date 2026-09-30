import { ServiceCard } from "@/components/services/ServiceCard";
import type { Service, ServiceCategory } from "@/types";

export function ServiceCategoryBlock({
  category,
  description,
  services,
}: {
  category: ServiceCategory;
  description: string;
  services: Service[];
}) {
  return (
    <div className="border-t border-fg/15 py-14 first:border-t-0 first:pt-0">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="font-display text-2xl font-medium text-fg sm:text-3xl">
            {category}
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-soft/75">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-8">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
