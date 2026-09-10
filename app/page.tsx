import { Hero } from "@/components/sections/Hero";
import { TrustSection } from "@/components/sections/TrustSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { Stats } from "@/components/sections/Stats";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { FoundersPreview } from "@/components/sections/FoundersPreview";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { FAQSection } from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSection />
      <ServicesOverview />
      <Stats />
      <FeaturedWork />
      <Process />
      <WhyUs />
      <FoundersPreview />
      <InsightsPreview />
      <FAQSection />
    </>
  );
}
