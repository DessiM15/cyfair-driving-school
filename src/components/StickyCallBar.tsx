"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { business } from "@/content/site";
import type { Dictionary } from "@/content/en";
import { localePath, type Lang } from "@/lib/i18n";
import { useCalmMotion } from "@/lib/useCalmMotion";

/**
 * Mobile-only call bar that slides up once the hero is out of the way.
 *
 * Most of this site's traffic is a parent on a phone. Without this they have to
 * scroll back to the top to find the number, which is exactly the moment leads
 * get lost. Sits above the chat launcher's reserved space so the two never
 * overlap.
 */
export function StickyCallBar({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const [visible, setVisible] = useState(false);
  const calm = useCalmMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={calm ? undefined : { y: "120%" }}
          animate={{ y: 0 }}
          exit={calm ? undefined : { y: "120%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[75] border-t border-sand-dark/70 bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-lg sm:hidden"
        >
          {/* Right padding keeps clear of the floating chat launcher. Sizes are
              tuned so "832-632-8855" never wraps at 360px. */}
          <div className="flex items-center gap-2 pr-[4.25rem]">
            <a
              href={business.phoneHref}
              className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-navy-700 px-3 py-3 text-sm font-medium text-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
                <path d="M6.6 2.5a1.5 1.5 0 0 1 1.4.9l1.2 2.8a1.5 1.5 0 0 1-.35 1.7l-1.1 1a12.6 12.6 0 0 0 5.35 5.35l1-1.1a1.5 1.5 0 0 1 1.7-.35l2.8 1.2a1.5 1.5 0 0 1 .9 1.4v2.3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 2.5 4.7a2 2 0 0 1 2-2.2h2.1Z" />
              </svg>
              {business.phone}
            </a>
            <Link
              href={localePath("/contact-us", lang)}
              className="flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-navy-300 bg-white px-3.5 py-3 text-sm font-medium text-navy-800"
            >
              {dict.common.enrollShort}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
