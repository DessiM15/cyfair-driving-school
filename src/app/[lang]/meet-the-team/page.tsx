import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Figure, Notice } from "@/components/ui/Bits";
import { CallButton } from "@/components/ui/Button";

import { business } from "@/content/site";
import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/meet-the-team",
    title: dict.team.metaTitle,
    description: dict.team.metaDescription,
    image: "/images/lesson-coaching.jpg",
  });
}

export default async function TeamPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);
  const t = dict.team;

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image="lesson-coaching"
        breadcrumbs={[
          { label: dict.nav.home, href: "/" },
          { label: dict.nav.about, href: "/about-us" },
          { label: t.hero.title },
        ]}
      />

      <Section tone="paper">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="prose-body text-lg">{t.body}</p>
            </Reveal>

            {/*
              No invented instructor profiles. Using stock portraits with made-up
              names next to a real school would misrepresent actual staff, so the
              page is honest about what is still to come.
            */}
            <Reveal delay={0.1}>
              <div className="mt-10">
                <Notice>{t.placeholderNotice}</Notice>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8">
                <CallButton phone={business.phone} phoneHref={business.phoneHref} variant="primary" size="lg" />
              </div>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Reveal>
              <Figure slot="lesson-discuss" lang={lang} sizes="(min-width: 768px) 30vw, 100vw" />
            </Reveal>
            <Reveal delay={0.08}>
              <Figure slot="class-teacher" lang={lang} sizes="(min-width: 768px) 30vw, 100vw" />
            </Reveal>
            <Reveal delay={0.16}>
              <Figure slot="lesson-pair" lang={lang} sizes="(min-width: 768px) 30vw, 100vw" />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand lang={lang} dict={dict} title={dict.home.cta.title} body={dict.home.cta.body} image="detail-wheel-c" />

      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: dict.nav.home, route: "/" },
          { name: dict.nav.about, route: "/about-us" },
          { name: t.hero.title, route: "/meet-the-team" },
        ])}
      />
    </>
  );
}
