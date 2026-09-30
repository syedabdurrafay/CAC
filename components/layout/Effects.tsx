"use client";

import { useEffect, useRef } from "react";

/**
 * Global ambient effects:
 *  - a slim neon scroll-progress bar at the very top
 *  - a soft cyan light that follows the pointer (desktop only)
 * Both are decorative, pointer-events:none and respect reduced motion.
 */
export function Effects() {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    function onScroll() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    }
    function onMove(e: PointerEvent) {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${e.clientX - 260}px, ${e.clientY - 260}px, 0)`;
        glowRef.current.style.opacity = "1";
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!reduce && fine) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={barRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[90] h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-accent-deep via-accent to-accent-bright shadow-[0_0_12px_rgba(25,211,232,0.8)]"
      />
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 h-[520px] w-[520px] rounded-full opacity-0 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, rgba(25,211,232,0.10), transparent 60%)",
        }}
      />
    </>
  );
}
