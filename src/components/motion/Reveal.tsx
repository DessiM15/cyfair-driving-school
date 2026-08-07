"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { useCalmMotion } from "@/lib/useCalmMotion";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in seconds, for sequencing items within a section. */
  delay?: number;
  /** Distance travelled, in px. Smaller feels calmer. */
  distance?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
  once?: boolean;
};

/**
 * Scroll-triggered entrance. Deliberately restrained: a short travel and a soft
 * ease, so sections settle into place rather than fly in.
 *
 * When the visitor prefers reduced motion we render the content plainly — no
 * transform, no opacity animation, no layout shift.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 24,
  direction = "up",
  className,
  as = "div",
  once = true,
}: RevealProps) {
  const reduced = useCalmMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  // Written out rather than built from a computed key, which would widen the
  // object to an index signature and clash with `transition`.
  const offset =
    direction === "left"
      ? { x: distance }
      : direction === "right"
        ? { x: -distance }
        : direction === "down"
          ? { y: -distance }
          : { y: distance };

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </Component>
  );
}

/**
 * Reveals children in sequence. Use for card grids and lists where a single
 * shared stagger reads better than hand-tuned per-item delays.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  const reduced = useCalmMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Component>
  );
}

/** A single item inside a <RevealGroup>. */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduced = useCalmMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </Component>
  );
}
