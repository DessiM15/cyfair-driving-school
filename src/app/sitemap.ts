import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { cities } from "@/content/cities";
import { localePath, LANGS } from "@/lib/i18n";

/**
 * Every route in both languages, with reciprocal hreflang alternates so Google
 * treats the English and Spanish versions as one page in two languages rather
 * than as duplicates competing with each other.
 */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/teen-driving-classes", priority: 0.9, changeFrequency: "weekly" },
  { path: "/adult-drivers-education", priority: 0.9, changeFrequency: "weekly" },
  { path: "/road-tests", priority: 0.9, changeFrequency: "weekly" },
  { path: "/defensive-driving", priority: 0.8, changeFrequency: "monthly" },
  { path: "/road-test-checklist", priority: 0.8, changeFrequency: "monthly" },
  { path: "/find-your-course", priority: 0.7, changeFrequency: "monthly" },
  { path: "/approved-road-test-locations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/instructors", priority: 0.6, changeFrequency: "monthly" },
  { path: "/online-payments", priority: 0.5, changeFrequency: "yearly" },
  { path: "/about-us", priority: 0.6, changeFrequency: "monthly" },
  { path: "/meet-the-team", priority: 0.5, changeFrequency: "monthly" },
  { path: "/reviews", priority: 0.6, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact-us", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  ...cities.map((city) => ({
    path: `/service-areas/${city.slug}`,
    priority: city.tier === "primary" ? 0.7 : 0.5,
    changeFrequency: "monthly" as const,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) =>
    LANGS.map((lang) => ({
      url: `${SITE_URL}${localePath(route.path, lang)}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          "en-US": `${SITE_URL}${localePath(route.path, "en")}`,
          "es-US": `${SITE_URL}${localePath(route.path, "es")}`,
        },
      },
    })),
  );
}
