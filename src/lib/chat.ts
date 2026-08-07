import { knowledge, STOPWORDS, type Entry } from "@/content/knowledge";
import { cities } from "@/content/cities";
import type { Lang } from "./i18n";

/** Lower-case, strip accents and punctuation so "¿Dónde están?" matches "donde estan". */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s$]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(input: string, lang: Lang): string[] {
  const stop = new Set(STOPWORDS[lang]);
  return normalize(input)
    .split(" ")
    .filter((t) => t.length > 1 && !stop.has(t));
}

export type Match = {
  entry: Entry;
  score: number;
  /** Set when the question named one of our service-area cities. */
  city?: { name: string; slug: string };
};

/**
 * Scores the question against every knowledge entry and returns the best match
 * above a confidence floor, or null.
 *
 * Phrase hits are weighted far above single-token hits so that "how much is a
 * road test" resolves to pricing rather than to any entry mentioning "road".
 *
 * To move this to a real Claude API call later, replace the body of this
 * function with a request that passes `knowledge` as context — the widget only
 * depends on the returned shape.
 */
export function findAnswer(question: string, lang: Lang): Match | null {
  const normalized = normalize(question);
  const tokens = tokenize(question, lang);
  if (tokens.length === 0) return null;

  const tokenSet = new Set(tokens);
  let best: Match | null = null;

  for (const entry of knowledge) {
    let score = 0;

    for (const keyword of entry.keywords[lang]) {
      const key = normalize(keyword);
      if (!key) continue;

      if (key.includes(" ")) {
        // Multi-word keyword: a full phrase hit is a strong signal.
        if (normalized.includes(key)) score += 10 + key.split(" ").length;
      } else if (tokenSet.has(key)) {
        score += 4;
      } else if (key.length > 4) {
        // Tolerate simple plurals and light typos on longer words.
        for (const token of tokens) {
          if (token.startsWith(key) || key.startsWith(token)) {
            if (Math.abs(token.length - key.length) <= 2) {
              score += 2.5;
              break;
            }
          }
        }
      }
    }

    if (score > (best?.score ?? 0)) best = { entry, score };
  }

  // A named city is a strong intent signal in its own right.
  const city = cities.find((c) => normalized.includes(normalize(c.name)));
  if (city) {
    const areas = knowledge.find((e) => e.id === "areas");
    if (areas && (!best || best.score < 12)) {
      return { entry: areas, score: 12, city: { name: city.name, slug: city.slug } };
    }
    if (best) best.city = { name: city.name, slug: city.slug };
  }

  return best && best.score >= 4 ? best : null;
}
