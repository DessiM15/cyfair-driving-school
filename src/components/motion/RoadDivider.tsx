"use client";

import { motion } from "motion/react";
import { useCalmMotion } from "@/lib/useCalmMotion";

/**
 * Section divider drawn as a road lane marking.
 *
 * Part of the running motif: the same dashed line appears in the journey
 * section, the timeline connector and the scroll progress bar, so the whole
 * site shares one visual language instead of borrowing generic dividers.
 */
export function RoadDivider({
  tone = "dark",
  className = "",
}: {
  /** "dark" = navy dashes on light backgrounds. "light" = white on navy. */
  tone?: "dark" | "light";
  className?: string;
}) {
  const calm = useCalmMotion();
  const stroke = tone === "light" ? "rgba(255,255,255,0.55)" : "rgba(37,69,154,0.38)";

  return (
    <div className={`pointer-events-none w-full ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 2" preserveAspectRatio="none" className="h-0.5 w-full">
        <motion.line
          x1="0"
          y1="1"
          x2="1200"
          y2="1"
          stroke={stroke}
          strokeWidth="2"
          strokeDasharray="18 24"
          strokeLinecap="round"
          initial={calm ? undefined : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  );
}
