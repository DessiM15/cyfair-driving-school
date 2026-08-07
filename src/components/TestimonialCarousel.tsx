"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { business } from "@/content/site";
import type { Dictionary } from "@/content/en";
import { useCalmMotion } from "@/lib/useCalmMotion";

/**
 * Draggable, auto-advancing testimonial carousel.
 *
 * Reviews are attributed to real people, so they get initials avatars rather
 * than stock portraits — pairing a real reviewer with a stranger's face would
 * misrepresent an actual person.
 *
 * Autoplay pauses on hover, on focus within, and whenever the tab is hidden,
 * and never starts at all under reduced motion.
 */
export function TestimonialCarousel({ dict }: { dict: Dictionary }) {
  const items = dict.testimonials;
  const calm = useCalmMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex(((next % items.length) + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    if (calm || paused || items.length < 2) return;
    timer.current = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % items.length);
    }, 6000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [calm, paused, items.length]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  const current = items[index];

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={dict.home.testimonials.title}
    >
      <div className="relative min-h-[19rem] sm:min-h-[16rem]">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.figure
            key={index}
            custom={direction}
            variants={calm ? undefined : variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag={calm ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(index + 1, 1);
              else if (info.offset.x > 70) go(index - 1, -1);
            }}
            className="absolute inset-0 flex cursor-grab flex-col justify-center rounded-[--radius-card] border border-sand-dark/60 bg-white p-8 shadow-soft active:cursor-grabbing md:p-10"
          >
            <Stars />
            <blockquote className="mt-5">
              <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
                “{current.quote}”
              </p>
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy-100 font-display text-sm font-semibold text-navy-800"
              >
                {initials(current.name)}
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{current.name}</span>
                <span className="block text-xs text-muted">via {current.source}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-7 flex items-center justify-center gap-5">
        <Arrow direction="prev" onClick={() => go(index - 1, -1)} label="Previous review" />

        <div className="flex gap-2">
          {items.map((item, i) => (
            <button
              key={item.name}
              onClick={() => go(i, i > index ? 1 : -1)}
              aria-label={`Review ${i + 1} of ${items.length}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-navy-700" : "w-2 bg-sand-dark hover:bg-navy-300"
              }`}
            />
          ))}
        </div>

        <Arrow direction="next" onClick={() => go(index + 1, 1)} label="Next review" />
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        <a
          href={business.social.google}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-navy-300 underline-offset-4 transition-colors hover:text-navy-700"
        >
          {dict.common.viewAll} →
        </a>
      </p>
    </div>
  );
}

function Arrow({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-sand-dark text-navy-700 transition-all hover:border-navy-400 hover:bg-navy-50"
    >
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
        <path
          d={direction === "prev" ? "M12.5 4 6.5 10l6 6" : "M7.5 4l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4 fill-amber-signal" aria-hidden="true">
          <path d="M10 1.5 12.4 7l6 .5-4.6 4 1.4 5.9L10 14.3 4.8 17.4 6.2 11.5 1.6 7.5l6-.5L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}
