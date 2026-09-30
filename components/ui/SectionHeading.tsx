import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  eyebrow?: string;
}

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
  eyebrow,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="hud-label mb-4 flex items-center gap-2 text-accent">
          <span className="h-px w-8 bg-accent" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-balance text-3xl font-medium leading-[1.1] tracking-tight text-fg sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-fg-soft sm:text-lg">{description}</p>
      )}
    </div>
  );
}
