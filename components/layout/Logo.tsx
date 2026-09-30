import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

/**
 * RoveTech logo lockup: symbol + wordmark (both transparent PNGs in
 * /public/brand). `size` controls the height of the symbol.
 */
export function Logo({ size = 36 }: { size?: number; inverse?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label={`${siteConfig.name} — home`}
    >
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={606}
        height={413}
        priority
        style={{ height: size, width: "auto" }}
        className="drop-shadow-[0_0_10px_rgba(25,211,232,0.45)] transition-transform duration-300 group-hover:scale-105"
      />
      <Image
        src="/brand/logo-wordmark.png"
        alt={siteConfig.name}
        width={1079}
        height={116}
        priority
        style={{ height: size * 0.36, width: "auto" }}
      />
    </Link>
  );
}
