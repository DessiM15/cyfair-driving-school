"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useCalmMotion } from "@/lib/useCalmMotion";

/**
 * Cross-route fade.
 *
 * Deliberately opacity-only. Animating a transform here would make this element
 * a containing block for its descendants, which breaks `position: fixed` and
 * complicates the pinned journey section — a fade gets the same "this is an
 * app, not a page load" feel with none of that risk.
 *
 * There is no exit animation: the App Router swaps content before an exit could
 * play, so attempting one produces a flash rather than a transition.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const calm = useCalmMotion();

  if (calm) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
