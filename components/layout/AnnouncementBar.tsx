import { Container } from "@/components/ui/Container";

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-paper">
      <Container className="flex h-9 items-center justify-center">
        <p className="text-center text-xs font-medium tracking-tight">
          Now booking Q1 strategy calls —{" "}
          <a href="/contact" className="underline underline-offset-2 hover:text-current-dim">
            find a time
          </a>
        </p>
      </Container>
    </div>
  );
}
