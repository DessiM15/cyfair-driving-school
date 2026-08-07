"use client";

import { useEffect } from "react";

/**
 * Guarantees a refresh always lands at the top of the page.
 *
 * Browsers restore the previous scroll offset on reload, which drops a returning
 * visitor into the middle of a section with no context. We take over scroll
 * restoration and reset to the top on load — unless the URL carries a hash, in
 * which case the anchor target is what the visitor actually asked for.
 *
 * `pageshow` covers the back/forward cache, where a restored page does not fire
 * a fresh mount and would otherwise keep its old offset.
 */
export function ScrollManager() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted && !window.location.hash) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
}
