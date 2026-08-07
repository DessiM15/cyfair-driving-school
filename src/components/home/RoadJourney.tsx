"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Section";
import type { Dictionary } from "@/content/en";
import { localePath, type Lang } from "@/lib/i18n";
import { useCalmMotion } from "@/lib/useCalmMotion";

/**
 * "Your road to a license" — the signature section.
 *
 * On large screens the section pins while you scroll: a road draws itself
 * across the viewport, a car advances along it, and each step's copy swaps in
 * as the car reaches its marker. The scroll distance is what drives it, so the
 * visitor stays in control the whole time — nothing is on a timer.
 *
 * On small screens, and for anyone who prefers reduced motion, it degrades to a
 * plain vertical timeline. Pinned scroll on a phone is usually more annoying
 * than impressive, and it would fight the browser chrome.
 */

const VIEW_W = 1200;
const VIEW_H = 320;

/** A gentle S-curve so the road reads as a journey rather than a progress bar. */
const ROAD_D = `M 40 232 C 210 232 210 96 380 96 S 550 232 720 232 S 890 96 1060 96 L 1160 96`;

export function RoadJourney({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const t = dict.home.journey;
  const steps = t.steps;
  const calm = useCalmMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [active, setActive] = useState(0);
  const [markers, setMarkers] = useState<{ x: number; y: number }[]>([]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Ease the raw scroll progress into the travelled portion of the road. The
  // small head/tail padding keeps the car from sitting exactly on the end caps.
  const travelled = useTransform(scrollYProgress, [0, 1], [0.02, 0.98]);

  const carX = useMotionValue(0);
  const carY = useMotionValue(0);
  const carAngle = useMotionValue(0);

  // Place a marker for each step along the path, once the path is measured.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const points = steps.map((_, i) => {
      const at = steps.length === 1 ? 0.5 : 0.02 + (i / (steps.length - 1)) * 0.96;
      const p = path.getPointAtLength(at * total);
      return { x: p.x, y: p.y };
    });
    setMarkers(points);
  }, [steps]);

  // Drive the car from scroll position. Motion values are updated directly so
  // this doesn't re-render on every frame; only `active` changes state.
  useMotionValueEvent(travelled, "change", (value) => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const at = Math.min(Math.max(value, 0), 1) * total;
    const p = path.getPointAtLength(at);
    const ahead = path.getPointAtLength(Math.min(at + 12, total));

    carX.set(p.x);
    carY.set(p.y);
    carAngle.set((Math.atan2(ahead.y - p.y, ahead.x - p.x) * 180) / Math.PI);

    const index = Math.min(steps.length - 1, Math.floor(value * steps.length));
    setActive((prev) => (prev === index ? prev : index));
  });

  const drawn = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  /* ---------------- reduced motion / small screens: plain timeline -------- */
  if (calm) {
    return <StaticTimeline lang={lang} dict={dict} />;
  }

  return (
    <>
      {/* Pinned experience — large screens only */}
      <section
        ref={sectionRef}
        className="relative hidden lg:block"
        style={{ height: `${steps.length * 62}vh` }}
        aria-label={t.title}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-navy-950">
          {/* Ambient wash */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(69,133,197,0.22),transparent_60%)]"
          />

          <Container className="relative w-full">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow text-sky-300">{t.eyebrow}</p>
              <h2 className="display-2 mt-4 text-white">{t.title}</h2>
              <p className="mt-4 text-white/65">{t.subtitle}</p>
            </div>

            {/* The road */}
            <div className="relative mt-14">
              <svg
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                className="w-full overflow-visible"
                aria-hidden="true"
              >
                {/* Base asphalt — full path, dim */}
                <path
                  ref={pathRef}
                  d={ROAD_D}
                  fill="none"
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="34"
                  strokeLinecap="round"
                />
                {/* Travelled asphalt, drawn by scroll */}
                <motion.path
                  d={ROAD_D}
                  fill="none"
                  stroke="rgba(255,255,255,0.20)"
                  strokeWidth="34"
                  strokeLinecap="round"
                  style={{ pathLength: drawn }}
                />
                {/* Lane marking */}
                <motion.path
                  d={ROAD_D}
                  fill="none"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="3"
                  strokeDasharray="16 22"
                  strokeLinecap="round"
                  style={{ pathLength: drawn }}
                />

                {/* Step markers */}
                {markers.map((m, i) => {
                  const reached = i <= active;
                  return (
                    <g key={steps[i].n}>
                      {reached && (
                        <circle cx={m.x} cy={m.y} r={26} fill="#4585c5" fillOpacity={0.18} />
                      )}
                      <circle
                        cx={m.x}
                        cy={m.y}
                        r={13}
                        fill={reached ? "#4585c5" : "#0d1738"}
                        stroke={reached ? "#ffffff" : "rgba(255,255,255,0.35)"}
                        strokeWidth="2.5"
                        style={{ transition: "fill 350ms ease, stroke 350ms ease" }}
                      />
                      <text
                        x={m.x}
                        y={m.y - 32}
                        textAnchor="middle"
                        className="font-sans text-[13px] font-semibold"
                        fill={reached ? "#ffffff" : "rgba(255,255,255,0.45)"}
                        style={{ transition: "fill 350ms ease" }}
                      >
                        {steps[i].title}
                      </text>
                    </g>
                  );
                })}

                {/* The car */}
                <motion.g style={{ x: carX, y: carY }}>
                  <motion.g style={{ rotate: carAngle }}>
                    <g transform="scale(1.45)">
                      <CarMark />
                    </g>
                  </motion.g>
                </motion.g>
              </svg>
            </div>

            {/* Active step copy */}
            <div className="relative mx-auto mt-10 h-36 max-w-xl text-center">
              {steps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={false}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    y: i === active ? 0 : 14,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                  aria-hidden={i !== active}
                >
                  <p className="font-display text-5xl font-semibold text-sky-300/40">{step.n}</p>
                  <h3 className="mt-1 font-display text-2xl text-white">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/70">{step.body}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-white/45">
              {t.note}{" "}
              <Link
                href={localePath("/adult-drivers-education", lang)}
                className="text-sky-300 underline decoration-sky-300/40 underline-offset-4 hover:decoration-sky-300"
              >
                {t.noteLink}
              </Link>
            </p>
          </Container>
        </div>
      </section>

      {/* Small screens get the timeline instead of a pinned section */}
      <div className="lg:hidden">
        <StaticTimeline lang={lang} dict={dict} />
      </div>
    </>
  );
}

/** Small top-down car, drawn around the origin so it can sit on the path. */
function CarMark() {
  return (
    <g transform="translate(-17 -9)">
      <rect x="0" y="0" width="34" height="18" rx="6" fill="#ffffff" />
      <rect x="6" y="2.5" width="13" height="13" rx="3" fill="#25459a" />
      <rect x="21" y="4" width="8" height="10" rx="2.5" fill="#4585c5" />
      <circle cx="8" cy="18" r="2.6" fill="#14203a" />
      <circle cx="26" cy="18" r="2.6" fill="#14203a" />
      <circle cx="8" cy="0" r="2.6" fill="#14203a" />
      <circle cx="26" cy="0" r="2.6" fill="#14203a" />
    </g>
  );
}

/**
 * Vertical timeline fallback. Same content, same order, no pinning — used on
 * small screens and whenever reduced motion is requested.
 */
function StaticTimeline({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const t = dict.home.journey;

  return (
    <section className="bg-navy-950 py-20 md:py-28" aria-label={t.title}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-sky-300">{t.eyebrow}</p>
          <h2 className="display-2 mt-4 text-white">{t.title}</h2>
          <p className="mt-4 text-white/65">{t.subtitle}</p>
        </div>

        <ol className="mx-auto mt-14 max-w-2xl">
          {t.steps.map((step, i) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              {/* Lane-marking connector */}
              {i < t.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[1.4375rem] top-12 bottom-2 w-0.5 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.45)_0_8px,transparent_8px_18px)]"
                />
              )}
              <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white/25 bg-navy-900 font-display text-sm font-semibold text-sky-300">
                {step.n}
              </span>
              <div className="pt-1.5">
                <h3 className="font-display text-xl text-white">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-white/70">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <p className="mx-auto mt-10 max-w-2xl text-sm text-white/45">
          {t.note}{" "}
          <Link
            href={localePath("/adult-drivers-education", lang)}
            className="text-sky-300 underline decoration-sky-300/40 underline-offset-4"
          >
            {t.noteLink}
          </Link>
        </p>
      </Container>
    </section>
  );
}
