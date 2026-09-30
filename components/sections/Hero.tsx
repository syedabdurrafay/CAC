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
import Image from "next/image";
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
  const rafRef = useRef<number | undefined>(undefined);
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

    // Assign to non-null local constants so TS narrowing persists inside closures
    const canvasEl: HTMLCanvasElement = canvas;
    const sectionEl: HTMLElement = section;
    const ctx2d: CanvasRenderingContext2D = ctx;

    let width = 0;
    let height = 0;
    let frame = 0;

    function resize() {
      const rect = sectionEl.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvasEl.width = width * dpr;
      canvasEl.height = height * dpr;
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(width, height);
    }

    resize();
    window.addEventListener("resize", resize);

    function onPointerMove(e: PointerEvent) {
      const rect = sectionEl.getBoundingClientRect();
      pointerRef.current.x = (e.clientX - rect.left) / rect.width - 0.5;
      pointerRef.current.y = (e.clientY - rect.top) / rect.height - 0.5;
    }
    sectionEl.addEventListener("pointermove", onPointerMove);

    function tick() {
      frame++;
      ctx2d.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const px = pointerRef.current.x;
      const py = pointerRef.current.y;

      // constellation links, drawn behind the particles
      ctx2d.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 90;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.3 * Math.min(a.z, b.z);
            if (alpha > 0.005) {
              ctx2d.strokeStyle = `rgba(25,211,232,${alpha})`;
              ctx2d.beginPath();
              ctx2d.moveTo(a.x, a.y);
              ctx2d.lineTo(b.x, b.y);
              ctx2d.stroke();
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

        ctx2d.beginPath();
        ctx2d.fillStyle = `rgba(25,211,232,${alpha})`;
        ctx2d.arc(drawX, drawY, p.r, 0, Math.PI * 2);
        ctx2d.fill();

        if (!p.isNode) {
          // soft glow on the growth-curve particles
          ctx2d.beginPath();
          ctx2d.fillStyle = `rgba(17,17,17,${alpha * 0.12})`;
          ctx2d.arc(drawX, drawY, p.r * 3.2, 0, Math.PI * 2);
          ctx2d.fill();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      window.removeEventListener("resize", resize);
      sectionEl.removeEventListener("pointermove", onPointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [initParticles, shouldReduceMotion]);

  const ease = [0.16, 1, 0.3, 1] as const;
  const fade = (delay: number) => ({
    initial: shouldReduceMotion ? undefined : { opacity: 0, y: 20 },
    animate: shouldReduceMotion ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Particle field: ascending growth curve + network constellation */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-50 md:opacity-80"
        aria-hidden="true"
      />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-14 py-16 md:grid-cols-12 md:gap-8 md:py-24 lg:py-32">
        <div className="md:col-span-7">
          <motion.p
            {...fade(0)}
            className="hud-label inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-accent"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            RoveTech // Systems online
          </motion.p>

          <motion.h1
            {...fade(0.08)}
            className="font-display mt-7 text-balance text-5xl font-medium leading-[0.98] tracking-tight text-fg sm:text-6xl md:text-7xl"
          >
            Marketing that behaves like <span className="text-neon">engineering.</span>
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="mt-6 max-w-lg text-lg leading-relaxed text-fg-soft"
          >
            RoveTech builds the search, paid, and owned media systems that
            take a brand from unknown to unavoidable — measured in revenue,
            not impressions.
          </motion.p>

          <motion.div {...fade(0.24)} className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact">Start a project</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Explore our services
              <ArrowUpRight size={16} />
            </ButtonLink>
          </motion.div>

          <motion.dl
            {...fade(0.32)}
            className="hud-label mt-14 grid max-w-md grid-cols-3 gap-6 text-fg-soft"
          >
            {[
              ["Uptime", "99.99%"],
              ["Signal", "Real-time"],
              ["Mode", "Autonomous"],
            ].map(([k, v]) => (
              <div key={k} className="border-l border-accent/40 pl-3">
                <dt className="text-fg-soft/60">{k}</dt>
                <dd className="mt-1 text-accent">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative md:col-span-5" style={{ perspective: 1200 }}>
          {/* Orbit rings + floating brand symbol */}
          <div className="pointer-events-none absolute -right-4 -top-36 z-20 hidden h-44 w-44 items-center justify-center sm:flex">
            <svg className="animate-spin-slow absolute inset-0" viewBox="0 0 200 200" fill="none" aria-hidden="true">
              <circle cx="100" cy="100" r="96" stroke="rgba(25,211,232,0.35)" strokeDasharray="2 8" />
              <circle cx="100" cy="4" r="3.5" fill="#19d3e8" />
            </svg>
            <svg className="animate-spin-rev absolute inset-3" viewBox="0 0 200 200" fill="none" aria-hidden="true">
              <circle cx="100" cy="100" r="96" stroke="rgba(127,234,242,0.25)" />
              <circle cx="196" cy="100" r="3" fill="#7feaf2" />
            </svg>
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={606}
              height={413}
              className="animate-float relative w-24 drop-shadow-[0_0_18px_rgba(25,211,232,0.7)]"
            />
          </div>

          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            style={{
              rotateX: shouldReduceMotion ? 0 : rotateX,
              rotateY: shouldReduceMotion ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            className="hud flex h-full min-h-[340px] flex-col justify-between rounded-[var(--radius-md)] border border-line-bright p-6 shadow-[0_0_60px_-20px_rgba(25,211,232,0.35)]"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[var(--radius-md)]" aria-hidden="true">
              <span className="scanline" />
            </div>
            <div className="flex items-center justify-between" style={{ transform: "translateZ(30px)" }}>
              <span className="hud-label text-fg-soft">Trailing 90 days · blended</span>
              <span className="hud-label flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-accent">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  animate={shouldReduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
                Live
              </span>
            </div>

            <div className="relative mt-8 flex-1" style={{ transform: "translateZ(20px)" }}>
              <svg
                viewBox="0 0 520 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                role="img"
                aria-label="Chart showing blended marketing performance trending upward over the trailing 90 days"
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#19d3e8" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#19d3e8" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0a6f86" />
                    <stop offset="100%" stopColor="#7feaf2" />
                  </linearGradient>
                </defs>

                {[
                  { y: 40, label: "$400k" },
                  { y: 100, label: "$300k" },
                  { y: 160, label: "$200k" },
                  { y: 220, label: "$100k" },
                ].map((g, i) => (
                  <g key={g.label}>
                    <motion.line
                      x1="40" y1={g.y} x2="480" y2={g.y}
                      stroke="rgba(25,211,232,0.18)" strokeDasharray="3 6" strokeWidth="1"
                      initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                      animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    />
                    <text x="30" y={g.y + 4} fill="#5f8797" fontFamily="monospace" fontSize="10" textAnchor="end">
                      {g.label}
                    </text>
                  </g>
                ))}

                <motion.path
                  d="M50 200 C 120 180, 180 130, 250 110 C 320 90, 390 60, 470 45 L 470 220 L 50 220 Z"
                  fill="url(#chartGradient)"
                  initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                />
                <motion.path
                  d="M50 200 C 120 180, 180 130, 250 110 C 320 90, 390 60, 470 45"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  style={{ filter: "drop-shadow(0 0 6px rgba(25,211,232,0.8))" }}
                  initial={shouldReduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
                  animate={shouldReduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.4, delay: 0.7, ease }}
                />
                <motion.circle
                  cx="470" cy="45" r="5" fill="#7feaf2"
                  initial={shouldReduceMotion ? undefined : { scale: 0, opacity: 0 }}
                  animate={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 2.1, ease }}
                />
                <motion.circle
                  cx="470" cy="45" r="9" stroke="#19d3e8" strokeOpacity="0.5" strokeWidth="2" fill="none"
                  initial={shouldReduceMotion ? undefined : { scale: 0.6, opacity: 0 }}
                  animate={shouldReduceMotion ? undefined : { scale: [0.6, 1.8, 0.6], opacity: [0, 0.6, 0] }}
                  transition={{ duration: 2, delay: 2.3, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </div>

            <div
              className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6"
              style={{ transform: "translateZ(30px)" }}
            >
              <div>
                <p className="text-neon font-display text-2xl font-medium">3</p>
                <p className="hud-label mt-1 text-fg-soft/70">Media disciplines</p>
              </div>
              <div>
                <p className="text-neon font-display text-2xl font-medium">1</p>
                <p className="hud-label mt-1 text-fg-soft/70">Point of contact</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
