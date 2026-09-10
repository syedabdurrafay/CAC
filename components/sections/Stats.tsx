import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export function Stats() {
  return (
    <section className="border-b border-line bg-ink py-16 text-paper md:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-paper/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
