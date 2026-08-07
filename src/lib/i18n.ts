import { en, type Dictionary } from "@/content/en";
import { es } from "@/content/es";

export const LANGS = ["en", "es"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

const DICTS: Record<Lang, Dictionary> = { en, es };

export function getDictionary(lang: Lang): Dictionary {
  return DICTS[lang] ?? en;
}

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/**
 * Build an href for the given locale.
 *
 * English lives at the root so the legacy site's URLs (and their search
 * rankings) are preserved exactly; Spanish is namespaced under /es.
 *
 *   localePath("/road-tests", "en") -> "/road-tests"
 *   localePath("/road-tests", "es") -> "/es/road-tests"
 *   localePath("/",           "es") -> "/es"
 */
export function localePath(path: string, lang: Lang): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return clean === "" ? "/" : clean;
  return `/es${clean}`;
}

/**
 * Strip the locale prefix from a pathname, returning the canonical route.
 *
 * This must handle BOTH prefixes, not just `/es`. The middleware rewrites
 * English requests from `/privacy` to `/en/privacy`, so during server rendering
 * `usePathname()` reports the internal `/en/...` path while the browser reports
 * `/privacy`. Stripping only `/es` made the two disagree, which produced a
 * broken language-toggle href (`/es/en/privacy`) and failed hydration on every
 * page. Stripping either prefix makes server and client agree.
 */
export function stripLocale(pathname: string): string {
  for (const lang of LANGS) {
    if (pathname === `/${lang}`) return "/";
    if (pathname.startsWith(`/${lang}/`)) return pathname.slice(lang.length + 1);
  }
  return pathname;
}

export const HTML_LANG: Record<Lang, string> = { en: "en-US", es: "es-US" };

/** OpenGraph locale codes. */
export const OG_LOCALE: Record<Lang, string> = { en: "en_US", es: "es_US" };
