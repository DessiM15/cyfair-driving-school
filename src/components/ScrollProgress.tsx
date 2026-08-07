"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useCalmMotion } from "@/lib/useCalmMotion";

/**
 * Reading progress rendered as a road being laid across the top of the page —
 * a solid edge with lane markings inside it, matching the journey section.
 *
 * Hidden entirely under reduced motion: a bar that tracks scroll is exactly the
 * kind of constant movement that setting is meant to suppress.
 */
export function ScrollProgress() {
  const calm = useCalmMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });

  if (calm) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-navy-700/85"
    >
      {/* Fine lane markings inside the bar — present, but not a barber pole. */}
      <div className="size-full bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.7)_0_5px,transparent_5px_15px)] opacity-55" />
    </motion.div>
  );
}
