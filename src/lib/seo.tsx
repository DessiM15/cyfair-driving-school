import type { Metadata } from "next";
import { SITE_URL, business, fullAddress, pricing } from "@/content/site";
import { cities } from "@/content/cities";
import { localePath, OG_LOCALE, type Lang } from "./i18n";

/**
 * Builds page metadata with correct canonical + hreflang wiring.
 *
 * Every page declares both language versions via `alternates.languages`, plus an
 * `x-default`. Without this, the English and Spanish pages look like duplicate
 * content to Google and compete with each other instead of ranking separately.
 */
export function buildMetadata({
  lang,
  route,
  title,
  description,
  image = "/images/hero-poster.jpg",
  noIndex = false,
}: {
  lang: Lang;
  /** Canonical route without locale prefix, e.g. "/road-tests". */
  route: string;
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const canonical = `${SITE_URL}${localePath(route, lang)}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages: {
        "en-US": `${SITE_URL}${localePath(route, "en")}`,
        "es-US": `${SITE_URL}${localePath(route, "es")}`,
        "x-default": `${SITE_URL}${localePath(route, "en")}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: business.name,
      locale: OG_LOCALE[lang],
      url: canonical,
      title,
      description,
      images: [{ url: image, width: 1728, height: 972, alt: business.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const postal = {
  "@type": "PostalAddress",
  streetAddress: `${business.address.street}, ${business.address.suite}`,
  addressLocality: business.address.city,
  addressRegion: business.address.region,
  postalCode: business.address.postalCode,
  addressCountry: business.address.country,
};

/**
 * DrivingSchool is a recognised schema.org type and a subtype of LocalBusiness,
 * which is what makes this eligible for local pack / knowledge panel treatment.
 */
export function organizationSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": ["DrivingSchool", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: business.name,
    url: `${SITE_URL}${localePath("/", lang)}`,
    telephone: business.phone,
    foundingDate: String(business.foundedYear),
    address: postal,
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    image: `${SITE_URL}/images/hero-poster.jpg`,
    priceRange: "$$",
    sameAs: [business.social.facebook],
    areaServed: cities.map((c) => ({
      "@type": "City",
      name: c.name,
      containedInPlace: { "@type": "State", name: "Texas" },
    })),
    availableLanguage: [
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "Spanish", alternateName: "es" },
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Teen Drivers Education" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adult Drivers Education" } },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "DPS Road Test" },
        price: pricing.roadTest.price,
        priceCurrency: "USD",
      },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Defensive Driving" } },
    ],
  };
}

export function websiteSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}${localePath("/", lang)}`,
    name: business.name,
    inLanguage: lang === "es" ? "es-US" : "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(lang: Lang, trail: { name: string; route: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${localePath(item.route, lang)}`,
    })),
  };
}

export function courseSchema({
  name,
  description,
  lang,
}: {
  name: string;
  description: string;
  lang: Lang;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    inLanguage: lang === "es" ? "es-US" : "en-US",
    provider: { "@id": `${SITE_URL}/#organization` },
  };
}

export function serviceAreaSchema(cityName: string, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Driver education",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: cityName, containedInPlace: { "@type": "State", name: "Texas" } },
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: business.phone,
      serviceLocation: { "@type": "Place", address: postal },
    },
    inLanguage: lang === "es" ? "es-US" : "en-US",
  };
}

/** Renders a JSON-LD block. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export { fullAddress };
