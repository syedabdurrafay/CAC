"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Particle formation                                                */
/*  Builds target points that trace an ascending "growth curve" with  */
/*  an arrowhead tip, plus an ambient constellation of network nodes. */
/*  Particles scatter randomly on mount, then settle into this shape. */
/* ------------------------------------------------------------------ */

type Target = { x: number; y: number; z: number; isNode: boolean };

function buildParticleTargets(width: number, height: number): Target[] {
  const points: Target[] = [];

  // 1. Primary ascending curve (the "growth line")
  const curveSteps = 46;
  for (let i = 0; i <= curveSteps; i++) {
    const t = i / curveSteps;
    const x = width * 0.08 + t * width * 0.78;
    const ease = 1 - Math.pow(1 - t, 2.2); // ease-out ascent
    const y = height * 0.82 - ease * height * 0.62;
    points.push({ x, y, z: 0.9, isNode: false });
  }

  // 2. Arrowhead at the tip of the curve
  const tipX = width * 0.86;
  const tipY = height * 0.2;
  const wingLen = Math.min(width, height) * 0.055;
  for (let i = 0; i <= 6; i++) {
    const t = i / 6;
    points.push({
      x: tipX - wingLen * 0.9 * t,
      y: tipY + wingLen * 1.5 * t,
      z: 1,
      isNode: false,
    });
    points.push({
      x: tipX - wingLen * 0.15 * t,
      y: tipY + wingLen * 0.35 * t,
      z: 1,
      isNode: false,
    });
  }

  // 3. Ambient network nodes scattered across the field
  const nodeCount = 34;
  for (let i = 0; i < nodeCount; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: 0.25 + Math.random() * 0.45,
      isNode: true,
    });
  }

  return points;
}

type Particle = {
  x: number;
  y: number;
  z: number;
  isNode: boolean;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  r: number;
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>();
  const pointerRef = useRef({ x: 0, y: 0 });

  // --- 3D tilt on mouse move (card) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    { stiffness: 150, damping: 20 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    { stiffness: 150, damping: 20 }
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  /* ---------------------------------------------------------------- */
  /*  Particle canvas engine                                          */
  /* ---------------------------------------------------------------- */

  const initParticles = useCallback((width: number, height: number) => {
    const targets = buildParticleTargets(width, height);
    particlesRef.current = targets.map((t) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: t.z,
      isNode: t.isNode,
      tx: t.x,
      ty: t.y,
      vx: 0,
      vy: 0,
      r: t.isNode ? 1 + Math.random() * 1.6 : 1.6 + t.z * 1.4,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    if (!canvas || !section) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;

    function resize() {
      const rect = section.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(width, height);
    }

    resize();
    window.addEventListener("resize", resize);

    function onPointerMove(e: PointerEvent) {
      const rect = section.getBoundingClientRect();
      pointerRef.current.x = (e.clientX - rect.left) / rect.width - 0.5;
      pointerRef.current.y = (e.clientY - rect.top) / rect.height - 0.5;
    }
    section.addEventListener("pointermove", onPointerMove);

    function tick() {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const px = pointerRef.current.x;
      const py = pointerRef.current.y;

      // constellation links, drawn behind the particles
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 70;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12 * Math.min(a.z, b.z);
            if (alpha > 0.005) {
              ctx.strokeStyle = `rgba(17,17,17,${alpha})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // update + draw particles
      for (const p of particles) {
        const settleSpeed = shouldReduceMotion ? 1 : 0.045;
        p.vx += (p.tx - p.x) * settleSpeed;
        p.vy += (p.ty - p.y) * settleSpeed;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        const drift = shouldReduceMotion
          ? 0
          : Math.sin(frame * 0.01 + p.tx) * 0.15;

        // depth-based parallax from pointer position
        const parallaxX = px * 14 * p.z;
        const parallaxY = py * 14 * p.z;

        const drawX = p.x + parallaxX;
        const drawY = p.y + drift + parallaxY;

        const alpha = p.isNode ? 0.35 * p.z : 0.85;

        ctx.beginPath();
        ctx.fillStyle = `rgba(17,17,17,${alpha})`;
        ctx.arc(drawX, drawY, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (!p.isNode) {
          // soft glow on the growth-curve particles
          ctx.beginPath();
          ctx.fillStyle = `rgba(17,17,17,${alpha * 0.12})`;
          ctx.arc(drawX, drawY, p.r * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      window.removeEventListener("resize", resize);
      section.removeEventListener("pointermove", onPointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [initParticles, shouldReduceMotion]);

  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Particle field: ascending growth curve + network constellation */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        aria-hidden="true"
      />

      <Container className="relative z-10 grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-24 lg:py-32">
        <div className="md:col-span-7 lg:col-span-7">
          <motion.h1
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-balance text-5xl font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl md:text-7xl"
          >
            Marketing that behaves like engineering.
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft/80"
          >
            Northfield builds the search, paid, and owned media systems that
            take a brand from unknown to unavoidable — measured in revenue,
            not impressions.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="/contact">Start a project</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Explore our services
              <ArrowUpRight size={16} />
            </ButtonLink>
          </motion.div>
        </div>

        <div
          className="relative md:col-span-5 lg:col-span-5"
          style={{ perspective: 1200 }}
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                    y: [0, -6, 0],
                  }
            }
            transition={{
              opacity: { duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            style={{
              rotateX: shouldReduceMotion ? 0 : rotateX,
              rotateY: shouldReduceMotion ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            className="flex h-full min-h-[320px] flex-col justify-between rounded-[var(--radius-md)] border border-line bg-white/95 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"
          >
            <div
              className="flex items-center justify-between"
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="text-xs font-medium text-ink-soft/60">
                Trailing 90 days, blended
              </span>
              <span className="relative flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-current-dim px-2 py-1 text-xs font-medium text-current">
                <motion.span
                  className="relative flex h-1.5 w-1.5"
                  animate={shouldReduceMotion ? undefined : { opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="absolute inline-flex h-full w-full rounded-full bg-current" />
                </motion.span>
                Live
              </span>
            </div>

            {/* Animated line chart */}
            <div
              className="relative mt-8 flex-1"
              style={{ transform: "translateZ(20px)" }}
            >
              <svg
                viewBox="0 0 520 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                role="img"
                aria-label="Chart showing blended marketing performance trending upward over the trailing 90 days"
              >
                {/* Grid lines */}
                {[
                  { y: 40, label: "$400k" },
                  { y: 100, label: "$300k" },
                  { y: 160, label: "$200k" },
                ].map((line, i) => (
                  <motion.line
                    key={line.y}
                    x1="40"
                    y1={line.y}
                    x2="480"
                    y2={line.y}
                    stroke="#E5E7EB"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                    initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                    animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  />
                ))}
                <motion.line
                  x1="40"
                  y1="220"
                  x2="480"
                  y2="220"
                  stroke="#E5E7EB"
                  strokeWidth="1"
                  initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />

                {/* Axis labels */}
                {[
                  { y: 44, label: "$400k" },
                  { y: 104, label: "$300k" },
                  { y: 164, label: "$200k" },
                  { y: 224, label: "$100k" },
                ].map((axis, i) => (
                  <motion.text
                    key={axis.label}
                    x="30"
                    y={axis.y}
                    fill="#9CA3AF"
                    fontFamily="sans-serif"
                    fontSize="10"
                    textAnchor="end"
                    initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                    animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                  >
                    {axis.label}
                  </motion.text>
                ))}

                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#111111" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#111111" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Gradient fill under the curve */}
                <motion.path
                  d="M50 200 C 120 180, 180 130, 250 110 C 320 90, 390 60, 470 45 L 470 220 L 50 220 Z"
                  fill="url(#chartGradient)"
                  initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                />

                {/* Main performance curve, drawn on */}
                <motion.path
                  d="M50 200 C 120 180, 180 130, 250 110 C 320 90, 390 60, 470 45"
                  stroke="#111111"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={shouldReduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
                  animate={shouldReduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Live data node */}
                <motion.circle
                  cx="470"
                  cy="45"
                  r="4"
                  fill="#111111"
                  initial={shouldReduceMotion ? undefined : { scale: 0, opacity: 0 }}
                  animate={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.circle
                  cx="470"
                  cy="45"
                  r="8"
                  stroke="#111111"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  fill="none"
                  initial={shouldReduceMotion ? undefined : { scale: 0.6, opacity: 0 }}
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { scale: [0.6, 1.6, 0.6], opacity: [0, 0.5, 0] }
                  }
                  transition={{
                    duration: 2,
                    delay: 2.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </div>

            <div
              className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6"
              style={{ transform: "translateZ(30px)" }}
            >
              <div>
                <p className="font-display text-2xl font-medium text-ink">3</p>
                <p className="text-xs text-ink-soft/60">Media disciplines, one team</p>
              </div>
              <div>
                <p className="font-display text-2xl font-medium text-ink">1</p>
                <p className="text-xs text-ink-soft/60">Point of contact, always</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}