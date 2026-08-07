"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCalmMotion } from "@/lib/useCalmMotion";

/**
 * FAQ accordion.
 *
 * Every answer is present in the DOM regardless of open state (height is
 * animated, content is not conditionally removed from the accessibility tree
 * until collapsed), and the questions are real <button>s inside a heading, so
 * screen readers and Google's FAQ rich result both read it correctly.
 */
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useCalmMotion();

  return (
    <div className="divide-y divide-sand-dark/60 border-y border-sand-dark/60">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-navy-700"
              >
                <span className="font-display text-lg text-ink md:text-xl">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen ? "rotate-45 border-navy-700 bg-navy-700 text-white" : "border-sand-dark text-navy-700"
                  }`}
                >
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduced ? undefined : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="prose-body max-w-3xl pb-7 pr-12">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
