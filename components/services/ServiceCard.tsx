import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col justify-between rounded-[var(--radius-md)] border border-line bg-white p-6 transition-colors hover:border-ink/40"
    >
      <div>
        <h3 className="font-display text-lg font-medium text-ink">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft/75">
          {service.shortDescription}
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
        Learn more
        <ArrowUpRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
