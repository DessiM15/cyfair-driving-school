/**
 * Upcoming class dates.
 *
 * EMPTY BY DESIGN. No dates have been supplied by the school, and inventing a
 * "next class starts Tuesday" would be a fabricated claim on a live site.
 *
 * While this list is empty the announcement strip falls back to a fact the
 * school actually publishes — that a new teen class generally begins every two
 * weeks — which is true today and still creates urgency.
 *
 * TO GO LIVE WITH REAL DATES: add ISO dates below, newest last. The strip will
 * automatically switch to naming the next one that is still in the future.
 *
 *   export const upcomingTeenClasses = ["2026-08-19", "2026-09-02"];
 *
 * Note: pages are statically generated, so the "next" date is resolved at build
 * time. Redeploy (or add a revalidate) when dates roll over.
 */
export const upcomingTeenClasses: string[] = [];

/** The next class date still in the future, or null if none is known. */
export function nextClassDate(now: Date = new Date()): Date | null {
  const future = upcomingTeenClasses
    .map((iso) => new Date(`${iso}T00:00:00`))
    .filter((date) => !Number.isNaN(date.valueOf()) && date >= now)
    .sort((a, b) => a.valueOf() - b.valueOf());

  return future[0] ?? null;
}

/** Formats a class date for display, e.g. "Tuesday, August 19". */
export function formatClassDate(date: Date, lang: "en" | "es"): string {
  return new Intl.DateTimeFormat(lang === "es" ? "es-US" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  }).format(date);
}
