"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { images, imageAlt, type ImageSlot } from "@/content/images";
import { useCalmMotion } from "@/lib/useCalmMotion";
import type { Lang } from "@/lib/i18n";

/**
 * Photograph that wipes open on scroll, with the image itself drifting slightly
 * slower than the frame.
 *
 * Two things are happening: the frame's clip-path opens from the bottom, and
 * the image inside starts scaled up and settles back. Together they read as a
 * camera reveal rather than a fade — the clearest "this was art-directed"
 * signal available for not much code.
 */
export function MaskFigure({
  slot,
  lang,
  ratio = "aspect-[4/3]",
  className = "",
  sizes = "(min-width: 1024px) 46vw, 100vw",
  priority = false,
  delay = 0,
  /** Vertical drift in px as the section passes. 0 disables parallax. */
  parallax = 0,
}: {
  slot: ImageSlot;
  lang: Lang;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  delay?: number;
  parallax?: number;
}) {
  const calm = useCalmMotion();
  const ref = useRef<HTMLDivElement>(null);
  const img = images[slot];

  /**
   * Visibility is tracked with a hand-rolled IntersectionObserver rather than
   * motion's `whileInView` / `useInView`. With two of these side by side, one
   * would reliably fail to trigger and stay clipped to zero height — i.e. an
   * invisible photograph. Owning the observer makes the behaviour explicit, and
   * the fallback below guarantees the image is shown even if it never fires.
   */
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is unavailable, show the image rather than hide it.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -70px 0px", threshold: 0.01 },
    );

    observer.observe(el);

    // Safety net: an image that is in the document but never reported as
    // intersecting must still become visible.
    const failsafe = window.setTimeout(() => setInView(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  const frame = `relative ${ratio} overflow-hidden rounded-[--radius-card] shadow-lift ${className}`;

  if (calm) {
    return (
      <figure className={frame}>
        <Image
          src={img.src}
          alt={imageAlt(slot, lang)}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ backgroundColor: img.color }}
        />
      </figure>
    );
  }

  return (
    <motion.figure
      ref={ref}
      data-inview={inView ? "true" : "false"}
      className={frame}
      style={parallax ? { y } : undefined}
      // `animate` is always a defined object whose value flips, rather than
      // toggling between undefined and an object — motion does not reliably
      // pick up that transition, which left figures stuck fully clipped.
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      animate={{ clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.18 }}
        animate={{ scale: inView ? 1 : 1.18 }}
        transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={img.src}
          alt={imageAlt(slot, lang)}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ backgroundColor: img.color }}
        />
      </motion.div>
    </motion.figure>
  );
}
