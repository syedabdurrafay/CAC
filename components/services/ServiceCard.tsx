import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col justify-between hud rounded-[var(--radius-md)] border border-line bg-surface p-6"
    >
      <div>
        <h3 className="font-display text-lg font-medium text-fg">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-soft/75">
          {service.shortDescription}
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
        Learn more
        <ArrowUpRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
