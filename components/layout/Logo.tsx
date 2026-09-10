import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className="font-display flex items-center gap-2 text-lg font-semibold tracking-tight"
      aria-label={`${siteConfig.name} — home`}
    >
      <span
        className={
          inverse
            ? "flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-paper text-ink"
            : "flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-ink text-paper"
        }
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
        </svg>
      </span>
      <span className={inverse ? "text-paper" : "text-ink"}>{siteConfig.name}</span>
    </Link>
  );
}
