"use client";

import { motion } from "motion/react";
import { useCalmMotion } from "@/lib/useCalmMotion";

/**
 * Word-by-word mask reveal.
 *
 * Each word sits in an overflow-hidden box and slides up from beneath it, so
 * the line appears to be uncovered rather than faded in. That single detail is
 * most of the difference between "nice" and "art-directed".
 *
 * The whole string is exposed to assistive tech via aria-label and the animated
 * words are hidden, so a screen reader reads one clean sentence instead of a
 * stream of disconnected words.
 */
export function KineticText({
  text,
  className = "",
  delay = 0,
  stagger = 0.075,
  trigger = "mount",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** "mount" for above-the-fold copy, "inView" for anything further down. */
  trigger?: "mount" | "inView";
}) {
  const calm = useCalmMotion();
  const words = text.split(" ");

  if (calm) return <span className={className}>{text}</span>;

  const animateProps =
    trigger === "mount"
      ? { animate: { y: "0%" } }
      : { whileInView: { y: "0%" }, viewport: { once: true, margin: "-60px" } };

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          // Slight vertical padding stops descenders (g, y, p) being clipped.
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            {...animateProps}
            transition={{
              duration: 0.95,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
