import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export function TrustSection() {
  // Duplicate the list so the loop is seamless
  const items = [...siteConfig.industriesServed, ...siteConfig.industriesServed];

  return (
    <section
      aria-labelledby="trust-heading"
      className="border-b border-line py-14 md:py-16"
    >
      <Container>
        <p
          id="trust-heading"
          className="hud-label text-center text-fg-soft"
        >
          Trusted across industries
        </p>
      </Container>

      <div className="marquee-mask mt-8 overflow-hidden">
        <ul className="animate-marquee flex w-max gap-4">
          {items.map((industry, i) => (
            <li
              key={`${industry}-${i}`}
              aria-hidden={i >= siteConfig.industriesServed.length}
              className="
                flex shrink-0 items-center justify-center
                rounded-full border border-line-bright bg-surface/60
                px-6 py-3 text-sm font-medium text-fg-soft
                whitespace-nowrap
              "
            >
              {industry}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}