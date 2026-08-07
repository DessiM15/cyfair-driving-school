import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CallButton } from "@/components/ui/Button";
import { Card, Figure } from "@/components/ui/Bits";

import { business } from "@/content/site";
import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/defensive-driving",
    title: dict.defensive.metaTitle,
    description: dict.defensive.metaDescription,
    image: "/images/texas-highway.jpg",
  });
}

export default async function DefensivePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);
  const t = dict.defensive;

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image="texas-highway"
        breadcrumbs={[{ label: dict.nav.home, href: "/" }, { label: dict.nav.defensive }]}
      >
        <CallButton phone={business.phone} phoneHref={business.phoneHref} variant="primary" size="lg" />
      </PageHero>

      <Section tone="paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="prose-body text-lg">
                {t.body.map((p) => (
                  <Reveal key={p.slice(0, 30)}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={0.1} direction="left" className="lg:col-span-6">
              <Figure slot="traffic-lights" lang={lang} sizes="(min-width: 1024px) 46vw, 100vw" />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeading title={t.reasons.title} className="mb-12" />
          <RevealGroup className="grid gap-6 md:grid-cols-3">
            {t.reasons.items.map((item) => (
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
        title={t.cta.title}
        body={t.cta.body}
        image="texas-open-road"
      />

      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: dict.nav.home, route: "/" },
          { name: dict.nav.defensive, route: "/defensive-driving" },
        ])}
      />
    </>
  );
}
