import Link from "next/link";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[var(--radius-sm)] px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:opacity-50 disabled:pointer-events-none [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]";

const variants = {
  primary:
    "bg-accent text-void hover:bg-accent-bright hover:shadow-[0_0_30px_rgba(25,211,232,0.55)]",
  secondary:
    "border border-accent/40 bg-accent/5 text-fg hover:border-accent hover:bg-accent/15 hover:shadow-[0_0_24px_rgba(25,211,232,0.25)]",
  inverse:
    "bg-accent text-void hover:bg-accent-bright hover:shadow-[0_0_30px_rgba(25,211,232,0.55)]",
  ghost: "text-fg hover:text-accent",
};

type Variant = keyof typeof variants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
}

export function ButtonLink({
  href,
  className,
  variant = "primary",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}
