import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink, CallButton } from "@/components/ui/Button";
import { CheckList, Figure, CheckIcon } from "@/components/ui/Bits";

import { business, pricing, roadTestSites } from "@/content/site";
import { getDictionary, isLang, localePath, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/road-tests",
    title: dict.roadTests.metaTitle,
    description: dict.roadTests.metaDescription,
    image: "/images/car-white.jpg",
  });
}

export default async function RoadTestsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);
  const t = dict.roadTests;

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image="car-white"
        breadcrumbs={[{ label: dict.nav.home, href: "/" }, { label: dict.nav.roadTests }]}
      >
        <div className="flex flex-wrap gap-3">
          <CallButton
            phone={business.phone}
            phoneHref={business.phoneHref}
            label={dict.common.bookRoadTest}
            variant="primary"
            size="lg"
          />
          <ButtonLink href={localePath("/road-test-checklist", lang)} variant="secondary" size="lg">
            {t.checklistTeaser.cta}
          </ButtonLink>
        </div>
      </PageHero>

      {/* Price + locations */}
      <Section tone="paper" spacing="tight">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div className="flex h-full flex-col justify-center rounded-[--radius-card] border border-navy-200 bg-gradient-to-br from-navy-700 to-navy-900 p-9 text-white shadow-lift">
                <p className="text-sm uppercase tracking-[0.14em] text-sky-300">{t.price.label}</p>
                <p className="mt-4 font-display text-6xl font-semibold">
                  ${t.price.amount}
                  <span className="ml-2 align-middle text-base font-normal text-white/60">USD</span>
                </p>
                <p className="mt-3 text-white/75">{t.price.note}</p>
              </div>
            </Reveal>

            <RevealGroup className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
              {roadTestSites.map((site) => (
                <RevealItem
                  key={site}
                  className="flex flex-col justify-between rounded-[--radius-card] border border-sand-dark/60 bg-white p-7 shadow-soft"
                >
                  <div>
                    <span className="flex size-10 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                      <PinIcon className="size-5" />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink">{site}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted">{dict.common.dpsAuthorized}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* Vehicles */}
      <Section tone="cream">
        <Container>
          <SectionHeading title={t.vehicles.title} className="mb-12" />
          <div className="grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Figure slot="car-parked" lang={lang} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 30vw, 100vw" />
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-4">
              <div className="h-full rounded-[--radius-card] border border-navy-200 bg-white p-7 shadow-soft">
                <span className="inline-flex items-center gap-2 rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-800">
                  <CheckIcon className="size-3" />
                  {dict.common.included}
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">{t.vehicles.school.title}</h3>
                <p className="prose-body mt-3 text-base">{t.vehicles.school.body}</p>
              </div>
            </Reveal>

            <Reveal delay={0.14} className="lg:col-span-4">
              <div className="h-full rounded-[--radius-card] border border-sand-dark/60 bg-white p-7 shadow-soft">
                <span className="inline-flex items-center gap-2 rounded-full bg-sand px-3 py-1 text-xs font-semibold text-ink-soft">
                  {dict.common.required}
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">{t.vehicles.personal.title}</h3>
                <CheckList items={t.vehicles.personal.items} className="mt-4" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Requirements by age */}
      <Section tone="paper">
        <Container>
          <SectionHeading title={t.requirements.title} subtitle={t.requirements.subtitle} className="mb-12" />

          <RevealGroup className="grid gap-6 lg:grid-cols-3">
            {t.requirements.groups.map((group, i) => (
              <RevealItem
                key={group.age}
                className="rounded-[--radius-card] border border-sand-dark/60 bg-white p-7 shadow-soft"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl font-semibold text-navy-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl text-ink">{group.age}</h3>
                </div>
                <CheckList items={group.items} className="mt-6" />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-start gap-5 rounded-[--radius-card] border border-navy-200/70 bg-navy-50 p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-display text-xl text-ink">{t.checklistTeaser.title}</h3>
                <p className="prose-body mt-2 text-base">{t.checklistTeaser.body}</p>
              </div>
              <ButtonLink href={localePath("/road-test-checklist", lang)} className="shrink-0">
                {t.checklistTeaser.cta}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand lang={lang} dict={dict} title={t.cta.title} body={t.cta.body} image="road-sign" />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: dict.home.courses.items[2].name,
            description: dict.roadTests.metaDescription,
            offers: {
              "@type": "Offer",
              price: pricing.roadTest.price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            provider: { "@id": "https://www.cyfairdrivingschool.com/#organization" },
          },
          breadcrumbSchema(lang, [
            { name: dict.nav.home, route: "/" },
            { name: dict.nav.roadTests, route: "/road-tests" },
          ]),
        ]}
      />
    </>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
