import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "hud-label inline-flex items-center rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-fg-soft",
        className
      )}
    >
      {children}
    </span>
  );
}
