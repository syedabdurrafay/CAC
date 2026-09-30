import Image from "next/image";
import { LinkedInIcon } from "@/components/ui/SocialIcons";
import type { TeamMember } from "@/types";

export function FounderCard({ member }: { member: TeamMember }) {
  return (
    <div className="overflow-hidden hud rounded-[var(--radius-md)] border border-line bg-surface">
      <div className="relative aspect-[4/5] overflow-hidden border-b border-line bg-surface-2">
        <Image
          src={member.photo}
          alt={`Portrait of ${member.name}`}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-medium text-fg">
              {member.name}
            </h3>
            <p className="text-sm text-fg-soft/60">{member.role}</p>
          </div>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="mt-1 text-fg-soft/50 transition-colors hover:text-accent"
            >
              <LinkedInIcon />
            </a>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-fg-soft/75">
          {member.bio}
        </p>
      </div>
    </div>
  );
}
