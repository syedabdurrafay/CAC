import { Container } from "@/components/ui/Container";

export function AnnouncementBar() {
  return (
    <div className="relative border-b border-line bg-void/80">
      <Container className="flex min-h-9 items-center justify-center py-1.5">
        <p className="hud-label flex items-center justify-center gap-2 text-center text-[0.625rem] leading-relaxed tracking-[0.12em] text-fg-soft sm:text-[0.6875rem] sm:tracking-[0.18em]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Now booking Q1 strategy calls —{" "}
          <a href="/contact" className="text-accent underline underline-offset-4 hover:text-accent-bright">
            find a time
          </a>
        </p>
      </Container>
    </div>
  );
}
