import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-16">
      <Container className="text-center">
        <p className="font-display text-sm font-medium text-current">404</p>
        <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-soft/75">
          The page you&apos;re looking for may have been moved or never existed.
          Head back home, or explore our services.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            View services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
