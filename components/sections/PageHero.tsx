import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative border-b border-line py-16 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <Container>
        {eyebrow && (
          <p className="hud-label flex items-center gap-2 text-accent">
            <span className="h-px w-8 bg-accent" />
            {eyebrow}
          </p>
        )}
        <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-soft">{description}</p>
        )}
      </Container>
    </section>
  );
}
