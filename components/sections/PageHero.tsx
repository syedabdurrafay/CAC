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
    <section className="border-b border-line py-16 md:py-24">
      <Container>
        {eyebrow && (
          <p className="text-sm font-medium text-current">{eyebrow}</p>
        )}
        <h1 className="font-display mt-3 max-w-3xl text-balance text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft/80">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
