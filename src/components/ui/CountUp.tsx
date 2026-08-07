"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useCalmMotion } from "@/lib/useCalmMotion";

/**
 * Counts up to `value` when scrolled into view.
 *
 * Years are rendered verbatim — animating "2014" from zero looks like a glitch
 * rather than a flourish, so `isYear` short-circuits the animation.
 */
export function CountUp({
  value,
  suffix = "",
  isYear = false,
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  isYear?: boolean;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useCalmMotion();
  const [display, setDisplay] = useState(isYear || reduced ? value : 0);

  useEffect(() => {
    if (!inView || isYear || reduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, gentle settle
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, isYear, reduced]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
