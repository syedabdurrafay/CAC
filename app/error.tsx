"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center py-16">
      <Container className="text-center">
        <p className="font-display text-sm font-medium text-accent">Error</p>
        <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-fg sm:text-5xl">
          Something went wrong.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-fg-soft/75">
          We hit an unexpected error loading this page. You can try again, or
          head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </Container>
    </section>
  );
}
