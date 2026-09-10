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
        "inline-flex items-center rounded-[var(--radius-sm)] border border-ink/15 px-3 py-1 text-xs font-medium text-ink-soft",
        className
      )}
    >
      {children}
    </span>
  );
}
