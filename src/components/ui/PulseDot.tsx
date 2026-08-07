"use client";

import { motion } from "motion/react";
import { useCalmMotion } from "@/lib/useCalmMotion";

/** Small "live" indicator for the enrollment strip. Static under reduced motion. */
export function PulseDot() {
  const calm = useCalmMotion();

  return (
    <span aria-hidden="true" className="relative flex size-2.5 shrink-0">
      {!calm && (
        <motion.span
          className="absolute inset-0 rounded-full bg-sky-400"
          animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="relative size-2.5 rounded-full bg-sky-400" />
    </span>
  );
}
