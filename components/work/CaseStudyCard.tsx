import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

export function CaseStudyCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block overflow-hidden rounded-[var(--radius-md)] border border-line bg-white"
    >
      <div className="relative aspect-[3/2] overflow-hidden border-b border-line bg-paper-dim">
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <p className="text-xs font-medium text-ink-soft/50">{project.industry}</p>
        <h3 className="font-display mt-2 text-xl font-medium text-ink">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft/75">
          {project.summary}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
          Read the case study
          <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
