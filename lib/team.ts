import type { TeamMember } from "@/types";

/**
 * ============================================================
 * TEAM / FOUNDERS
 * ============================================================
 * TO ADD A FOUNDER OR TEAM MEMBER:
 *  1. Copy an object below and update every field.
 *  2. Add a photo to /public/images/team/ and point `photo` at it.
 *  3. Save — they appear on /team and the homepage automatically.
 *
 * Bios below are placeholders. Replace with real, approved
 * biographical copy before launch.
 * ============================================================
 */

export const team: TeamMember[] = [
  {
    slug: "syed-rafay",
    name: "Syed Rafay",
    role: "Co-Founder", // TODO: confirm exact title
    bio: "Co-founder of RoveTech. Bio to be finalized — replace this placeholder with a short, real professional summary.",
    photo: "/images/team/placeholder-1.svg",
    isPlaceholder: true,
  },
  {
    slug: "ammar-nadeem",
    name: "Ammar Nadeem",
    role: "Co-Founder",
    bio: "Co-founder of RoveTech. Bio to be finalized — replace this placeholder with a short, real professional summary.",
    photo: "/images/team/placeholder-2.svg",
    isPlaceholder: true,
  },
  {
    slug: "ubaid-ur-rehman",
    name: "Ubaid Ur Rehman",
    role: "Co-Founder",
    bio: "Co-founder of RoveTech. Bio to be finalized — replace this placeholder with a short, real professional summary.",
    photo: "/images/team/placeholder-3.svg",
    isPlaceholder: true,
  },
  {
    slug: "hamza-khan",
    name: "Hamza Khan",
    role: "Co-Founder",
    bio: "Co-founder of RoveTech. Bio to be finalized — replace this placeholder with a short, real professional summary.",
    photo: "/images/team/placeholder-4.svg",
    isPlaceholder: true,
  },
];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return team.find((member) => member.slug === slug);
}
