import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { siteConfig } from "@/lib/site";

export function Stats() {
  return (
    <section className="relative border-b border-line bg-surface/40 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {siteConfig.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="border-l border-accent/40 pl-5">
                <p className="text-neon font-display text-4xl font-medium tracking-tight sm:text-5xl">
                  {stat.value}
                </p>
                <p className="hud-label mt-3 text-fg-soft">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
