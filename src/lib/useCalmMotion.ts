"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Hydration-safe reduced-motion preference.
 *
 * `useReducedMotion()` cannot know the user's preference during server
 * rendering, so it reports `false` on the server and the real value on the
 * client. Any component that changes what it *renders* based on that value —
 * a conditional block, a different element, an `initial` style — therefore
 * produces a client tree that doesn't match the server HTML, and React bails
 * out of hydration (error #418).
 *
 * This returns `false` during SSR *and* the first client render, so both trees
 * agree, then flips to the real preference once mounted. Visitors who prefer
 * reduced motion get a settled, static page a frame later instead of a
 * hydration failure.
 */
export function useCalmMotion(): boolean {
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && Boolean(prefers);
}
