"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCalmMotion } from "@/lib/useCalmMotion";

/**
 * Wraps a control so it leans toward the cursor.
 *
 * Pointer-type aware: the effect only engages for a fine pointer (a mouse), so
 * it never fires on touch, where there is no hover state and the transform
 * would just make taps feel imprecise.
 */
export function MagneticButton({
  children,
  strength = 0.28,
  className = "",
}: {
  children: ReactNode;
  /** Fraction of the cursor's offset the element follows. Keep it subtle. */
  strength?: number;
  className?: string;
}) {
  const calm = useCalmMotion();
  const ref = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  if (calm) return <span className={className}>{children}</span>;

  const onMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}
