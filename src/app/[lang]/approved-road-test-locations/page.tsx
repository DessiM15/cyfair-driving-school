import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { CoverageMap } from "@/components/CoverageMap";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CallButton } from "@/components/ui/Button";

import { business, fullAddress, roadTestSites } from "@/content/site";
import { cities } from "@/content/cities";
import { getDictionary, isLang, localePath, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/approved-road-test-locations",
    title: dict.locations.metaTitle,
    description: dict.locations.metaDescription,
    image: "/images/houston-heights.jpg",
  });
}

export default async function LocationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);
  const t = dict.locations;

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image="houston-heights"
        breadcrumbs={[{ label: dict.nav.home, href: "/" }, { label: dict.nav.locations }]}
      >
        <CallButton
          phone={business.phone}
          phoneHref={business.phoneHref}
          label={dict.common.bookRoadTest}
          variant="primary"
          size="lg"
        />
      </PageHero>

      {/* Office + test sites */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <div className="h-full rounded-[--radius-card] border border-navy-200 bg-navy-50 p-8">
                <p className="eyebrow">{t.officeTitle}</p>
                <address className="mt-4 font-display text-xl not-italic leading-relaxed text-ink">
                  {fullAddress}
                </address>
                <div className="mt-6 space-y-2 text-[0.9375rem]">
                  <a href={business.phoneHref} className="block font-medium text-navy-700 hover:underline">
                    {business.phone}
                  </a>
                  <a href={business.phoneAltHref} className="block text-ink-soft hover:underline">
                    {business.phoneAlt}
                  </a>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy-700 underline decoration-navy-300 underline-offset-4"
                >
                  Google Maps →
                </a>
              </div>
            </Reveal>

            <div className="lg:col-span-8">
              <SectionHeading title={t.testSitesTitle} subtitle={t.testSitesBody} className="mb-8" />
              <RevealGroup className="grid gap-4 sm:grid-cols-3">
                {roadTestSites.map((site) => (
                  <RevealItem
                    key={site}
                    className="rounded-[--radius-card] border border-sand-dark/60 bg-white p-6 shadow-soft"
                  >
                    <h3 className="font-display text-lg text-ink">{site}</h3>
                    <p className="mt-2 text-sm text-muted">{dict.common.dpsAuthorized}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map + full city list */}
      <Section tone="cream">
        <Container>
          <SectionHeading title={t.serviceAreaTitle} subtitle={t.serviceAreaBody} className="mb-12" />

          <Reveal>
            <CoverageMap lang={lang} />
          </Reveal>

          <RevealGroup className="mt-12 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((city) => (
              <RevealItem key={city.slug}>
                <Link
                  href={localePath(`/service-areas/${city.slug}`, lang)}
                  className="group flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-white"
                >
                  <span className="text-[0.9375rem] text-ink-soft group-hover:text-navy-800">
                    {city.name}
                  </span>
                  <span className="text-navy-400 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand
        lang={lang}
        dict={dict}
        title={dict.home.cta.title}
        body={dict.home.cta.body}
        image="suburb-homes"
      />

      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: dict.nav.home, route: "/" },
          { name: dict.nav.locations, route: "/approved-road-test-locations" },
        ])}
      />
    </>
  );
}
