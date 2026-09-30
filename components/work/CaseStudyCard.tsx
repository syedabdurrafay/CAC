import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

export function CaseStudyCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block overflow-hidden hud rounded-[var(--radius-md)] border border-line bg-surface"
    >
      <div className="relative aspect-[3/2] overflow-hidden border-b border-line bg-surface-2">
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <p className="text-xs font-medium text-fg-soft/50">{project.industry}</p>
        <h3 className="font-display mt-2 text-xl font-medium text-fg">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-soft/75">
          {project.summary}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
          Read the case study
          <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
