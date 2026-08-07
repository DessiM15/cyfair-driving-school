import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink, CallButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Bits";

import { business } from "@/content/site";
import { getDictionary, isLang, localePath, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/careers",
    title: dict.careers.metaTitle,
    description: dict.careers.metaDescription,
    image: "/images/lesson-discuss.jpg",
  });
}

export default async function CareersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);
  const t = dict.careers;

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image="lesson-discuss"
        breadcrumbs={[{ label: dict.nav.home, href: "/" }, { label: t.hero.title }]}
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
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="prose-body text-lg">{t.body}</p>
            </Reveal>
          </div>

          <SectionHeading title={dict.instructors.offerings.title} className="mb-10 mt-16" />
          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {dict.instructors.offerings.items.map((item) => (
              <RevealItem key={item.title}>
                <Card title={item.title} body={item.body} className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand
        lang={lang}
        dict={dict}
        title={dict.instructors.cta.title}
        body={dict.instructors.cta.body}
        image="lesson-passenger"
      />

      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: dict.nav.home, route: "/" },
          { name: t.hero.title, route: "/careers" },
        ])}
      />
    </>
  );
}
