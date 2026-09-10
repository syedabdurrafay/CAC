import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCategoryBlock } from "@/components/services/ServiceCategoryBlock";
import { Container } from "@/components/ui/Container";
import { serviceCategories, getServicesByCategory } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Earned, paid, and owned media services engineered as one coordinated growth system — SEO, PPC, paid social, content, web development, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Three media types. One coordinated system."
        description="Every service below is designed to work alongside the others — not as a menu of disconnected line items."
      />
      <section className="py-16 md:py-20">
        <Container>
          {serviceCategories.map((category) => (
            <ServiceCategoryBlock
              key={category.name}
              category={category.name}
              description={category.description}
              services={getServicesByCategory(category.name)}
            />
          ))}
        </Container>
      </section>
    </>
  );
}
