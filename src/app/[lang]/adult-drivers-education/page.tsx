import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { ClassStartStrip } from "@/components/ClassStartStrip";
import { CtaBand } from "@/components/CtaBand";
import { Testimonials } from "@/components/Testimonials";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink, CallButton } from "@/components/ui/Button";
import { CheckList, Figure, FactTile } from "@/components/ui/Bits";

import { adultCourse, business } from "@/content/site";
import { getDictionary, isLang, localePath, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, courseSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/adult-drivers-education",
    title: dict.adult.metaTitle,
    description: dict.adult.metaDescription,
    image: "/images/adult-woman-smile.jpg",
  });
}

export default async function AdultPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);
  const t = dict.adult;

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image="adult-woman-smile"
        breadcrumbs={[{ label: dict.nav.home, href: "/" }, { label: dict.nav.adults }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={localePath("/contact-us", lang)} size="lg">
            {dict.common.enrollToday}
          </ButtonLink>
          <CallButton phone={business.phone} phoneHref={business.phoneHref} size="lg" />
        </div>
      </PageHero>

      <ClassStartStrip lang={lang} dict={dict} />

      {/* Spanish banner — this is a genuine differentiator for this market, so it
          gets real prominence rather than a footnote. */}
      <Section tone="navy" spacing="tight">
        <Container>
          <Reveal className="flex flex-col items-center gap-4 text-center">
            <span className="rounded-full bg-sky-300/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">
              English &amp; Español
            </span>
            <p className="font-display text-2xl text-white md:text-3xl">{t.spanishBanner}</p>
            <p className="text-white/60">{t.spanishBannerNote}</p>
          </Reveal>
        </Container>
      </Section>

      {/* What is the course */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading eyebrow={dict.common.tdlrApproved} title={t.what.title} />
              <Reveal delay={0.08}>
                <div className="prose-body mt-7">
                  {t.what.body.map((p) => (
                    <p key={p.slice(0, 30)}>{p}</p>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.14}>
                <CheckList items={t.what.features} className="mt-8" />
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.1} direction="left">
                <Figure slot="adult-focused" lang={lang} ratio="aspect-[3/4]" sizes="(min-width: 1024px) 38vw, 100vw" />
              </Reveal>
              <RevealGroup className="mt-6 grid grid-cols-2 gap-4">
                <RevealItem>
                  <FactTile value={adultCourse.hours} unit="hrs" label={dict.common.tdlrApproved} />
                </RevealItem>
                <RevealItem>
                  <FactTile value={`${adultCourse.minimumAge}+`} label={t.hero.eyebrow} />
                </RevealItem>
              </RevealGroup>
            </div>
          </div>
        </Container>
      </Section>

      {/* When + road test */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <Figure slot="class-teacher" lang={lang} sizes="(min-width: 1024px) 46vw, 100vw" />
            </Reveal>
            <div className="lg:col-span-6">
              <SectionHeading title={t.when.title} />
              <Reveal delay={0.08}>
                <p className="prose-body mt-5">{t.when.body}</p>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-10 rounded-[--radius-card] border border-navy-200/70 bg-white p-7 shadow-soft">
                  <h3 className="font-display text-xl text-ink">{t.roadTest.title}</h3>
                  <p className="prose-body mt-3 text-base">{t.roadTest.body}</p>
                  <ButtonLink
                    href={localePath("/road-tests", lang)}
                    variant="secondary"
                    size="sm"
                    className="mt-5"
                  >
                    {t.roadTest.cta}
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Testimonials dict={dict} tone="paper" />

      <CtaBand
        lang={lang}
        dict={dict}
        title={t.cta.title}
        body={t.cta.body}
        image="adult-man-city"
        primaryLabel={dict.common.enrollToday}
      />

      <JsonLd
        data={[
          courseSchema({ name: dict.home.courses.items[1].name, description: dict.adult.metaDescription, lang }),
          breadcrumbSchema(lang, [
            { name: dict.nav.home, route: "/" },
            { name: dict.nav.adults, route: "/adult-drivers-education" },
          ]),
        ]}
      />
    </>
  );
}
