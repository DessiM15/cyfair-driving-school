import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink, CallButton } from "@/components/ui/Button";
import { CheckList, Figure } from "@/components/ui/Bits";

import { business } from "@/content/site";
import { getDictionary, isLang, localePath, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/instructors",
    title: dict.instructors.metaTitle,
    description: dict.instructors.metaDescription,
    image: "/images/lesson-passenger.jpg",
  });
}

export default async function InstructorsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);
  const t = dict.instructors;

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image="lesson-passenger"
        breadcrumbs={[{ label: dict.nav.home, href: "/" }, { label: dict.nav.instructors }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={localePath("/contact-us", lang)} size="lg">
            {dict.common.getStarted}
          </ButtonLink>
          <CallButton phone={business.phone} phoneHref={business.phoneHref} size="lg" />
        </div>
      </PageHero>

      <Section tone="paper">
        <Container>
          <SectionHeading title={t.offerings.title} className="mb-12" />
          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {t.offerings.items.map((item, i) => (
              <RevealItem
                key={item.title}
                className="flex gap-5 rounded-[--radius-card] border border-sand-dark/60 bg-white p-7 shadow-soft"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-100 font-display text-sm font-semibold text-navy-800">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl text-ink">{item.title}</h3>
                  <p className="prose-body mt-2 text-base">{item.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <Figure slot="lesson-discuss" lang={lang} sizes="(min-width: 1024px) 46vw, 100vw" />
            </Reveal>
            <div className="lg:col-span-6">
              <SectionHeading title={t.why.title} />
              <Reveal delay={0.08}>
                <CheckList items={t.why.items} className="mt-8 text-lg" />
              </Reveal>
              <Reveal delay={0.14}>
                <ButtonLink href={localePath("/careers", lang)} variant="secondary" className="mt-9">
                  {dict.careers.hero.title}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand lang={lang} dict={dict} title={t.cta.title} body={t.cta.body} image="lesson-coaching" />

      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: dict.nav.home, route: "/" },
          { name: dict.nav.instructors, route: "/instructors" },
        ])}
      />
    </>
  );
}
