import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Testimonials } from "@/components/Testimonials";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink, CallButton } from "@/components/ui/Button";
import { CheckList, Figure } from "@/components/ui/Bits";

import { cities, getCity } from "@/content/cities";
import { business } from "@/content/site";
import type { ImageSlot } from "@/content/images";
import { getDictionary, isLang, localePath, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, serviceAreaSchema, JsonLd } from "@/lib/seo";

/**
 * Rotating hero imagery so 28 city pages don't all open with the same photo —
 * indexed by position in the city list, so each city keeps a stable image.
 */
const HERO_ROTATION: ImageSlot[] = [
  "suburb-quiet",
  "houston-heights",
  "suburb-homes",
  "texas-highway",
  "suburb-flag",
  "traffic-lights",
  "texas-open-road",
  "road-sign",
];

const BODY_ROTATION: ImageSlot[] = [
  "teen-focused",
  "adult-woman-smile",
  "lesson-coaching",
  "class-diverse",
  "car-white",
  "detail-wheel-a",
  "teen-learning",
  "adult-man-city",
];

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; city: string }>;
}): Promise<Metadata> {
  const { lang: raw, city: slug } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  const city = getCity(slug);
  if (!city) return {};

  return buildMetadata({
    lang,
    route: `/service-areas/${city.slug}`,
    title: dict.serviceArea.metaTitlePattern.replace("{city}", city.name),
    description: dict.serviceArea.metaDescriptionPattern.replace(/\{city\}/g, city.name),
  });
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ lang: string; city: string }>;
}) {
  const { lang: raw, city: slug } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const city = getCity(slug);
  if (!city) notFound();

  const dict = getDictionary(lang);
  const t = dict.serviceArea;
  const index = cities.findIndex((c) => c.slug === city.slug);
  const heroImage = HERO_ROTATION[index % HERO_ROTATION.length];
  const bodyImage = BODY_ROTATION[index % BODY_ROTATION.length];

  const fill = (template: string) => template.replace(/\{city\}/g, city.name);
  const nearby = cities.filter((c) => c.slug !== city.slug).slice(0, 12);

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.eyebrow}
        title={fill(t.titlePattern)}
        subtitle={fill(t.subtitlePattern)}
        image={heroImage}
        breadcrumbs={[
          { label: dict.nav.home, href: "/" },
          { label: dict.nav.locations, href: "/approved-road-test-locations" },
          { label: city.name },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={localePath("/contact-us", lang)} size="lg">
            {dict.common.requestClassTime}
          </ButtonLink>
          <CallButton phone={business.phone} phoneHref={business.phoneHref} size="lg" />
        </div>
      </PageHero>

      {/* Nearest test site */}
      <Section tone="paper" spacing="tight">
        <Container>
          <Reveal className="flex flex-col items-start gap-5 rounded-[--radius-card] border border-navy-200 bg-navy-50 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {t.nearestTestSiteLabel}
              </p>
              <p className="mt-2 font-display text-2xl text-ink">{city.nearestTestSite}</p>
            </div>
            <ButtonLink href={localePath("/road-tests", lang)} variant="secondary" className="shrink-0">
              {dict.nav.roadTests}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>

      {/* Services */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading title={fill(t.servicesTitle)} className="mb-8" />
              <RevealGroup className="grid gap-4 sm:grid-cols-2">
                {dict.home.courses.items.map((course) => (
                  <RevealItem key={course.key}>
                    <Link
                      href={localePath(course.href, lang)}
                      className="group flex h-full flex-col rounded-2xl border border-sand-dark/60 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      <h3 className="font-display text-lg text-ink">{course.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{course.summary}</p>
                      <span className="mt-4 text-sm font-medium text-navy-700">
                        {dict.common.learnMore} →
                      </span>
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div className="lg:col-span-5">
              <SectionHeading title={fill(t.whyTitle)} className="mb-6" />
              <Reveal delay={0.08}>
                <CheckList items={dict.home.trustBar.items} />
              </Reveal>
              <Reveal delay={0.14}>
                <div className="mt-8">
                  <Figure
                    slot={bodyImage}
                    lang={lang}
                    ratio="aspect-[4/3]"
                    sizes="(min-width: 1024px) 38vw, 100vw"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Testimonials dict={dict} tone="cream" />

      {/* Nearby areas — internal linking between city pages is what makes this
          cluster work for local SEO rather than being 28 orphan pages. */}
      <Section tone="paper" spacing="tight">
        <Container>
          <SectionHeading title={t.otherAreasTitle} className="mb-8" />
          <RevealGroup className="flex flex-wrap gap-2.5">
            {nearby.map((other) => (
              <RevealItem key={other.slug}>
                <Link
                  href={localePath(`/service-areas/${other.slug}`, lang)}
                  className="inline-block rounded-full border border-sand-dark bg-white px-4 py-2 text-sm text-ink-soft transition-colors hover:border-navy-300 hover:bg-navy-50 hover:text-navy-800"
                >
                  {other.name}
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1}>
            <Link
              href={localePath("/approved-road-test-locations", lang)}
              className="mt-6 inline-block text-sm font-medium text-navy-700 underline decoration-navy-300 underline-offset-4"
            >
              {t.backToAll} →
            </Link>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        lang={lang}
        dict={dict}
        title={fill(t.ctaTitle)}
        body={t.ctaBody}
        image={heroImage}
      />

      <JsonLd
        data={[
          serviceAreaSchema(city.name, lang),
          breadcrumbSchema(lang, [
            { name: dict.nav.home, route: "/" },
            { name: dict.nav.locations, route: "/approved-road-test-locations" },
            { name: city.name, route: `/service-areas/${city.slug}` },
          ]),
        ]}
      />
    </>
  );
}
