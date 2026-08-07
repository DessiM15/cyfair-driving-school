import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Testimonials } from "@/components/Testimonials";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CheckList, Figure, Card } from "@/components/ui/Bits";
import { CountUp } from "@/components/ui/CountUp";

import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/about-us",
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
    image: "/images/class-diverse.jpg",
  });
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);
  const t = dict.about;

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image="class-diverse"
        breadcrumbs={[{ label: dict.nav.home, href: "/" }, { label: dict.nav.about }]}
      />

      <Section tone="paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading title={t.story.title} />
              <Reveal delay={0.08}>
                <div className="prose-body mt-7 text-lg">
                  {t.story.body.map((p) => (
                    <p key={p.slice(0, 30)}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <Reveal className="pt-8 md:pt-12">
                  <Figure slot="class-helping" lang={lang} ratio="aspect-[3/4]" sizes="28vw" />
                </Reveal>
                <Reveal delay={0.12}>
                  <Figure slot="teen-driver-woman" lang={lang} ratio="aspect-[3/4]" sizes="28vw" />
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="navy" spacing="tight">
        <Container>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {dict.home.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="text-center lg:text-left">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-5xl font-semibold text-sky-300">
                      <CountUp value={stat.value} suffix={stat.suffix} isYear={stat.isYear} />
                    </span>
                    <span className="mt-3 block text-sm text-white/65">{stat.label}</span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading title={t.services.title} />
              <Reveal delay={0.08}>
                <CheckList items={t.services.items} className="mt-8" />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <SectionHeading title={t.values.title} className="mb-8" />
              <RevealGroup className="grid gap-5 sm:grid-cols-1">
                {t.values.items.map((v) => (
                  <RevealItem key={v.title}>
                    <Card title={v.title} body={v.body} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </Section>

      <Testimonials dict={dict} tone="cream" />

      <CtaBand
        lang={lang}
        dict={dict}
        title={dict.home.cta.title}
        body={dict.home.cta.body}
        image="houston-heights"
      />

      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: dict.nav.home, route: "/" },
          { name: dict.nav.about, route: "/about-us" },
        ])}
      />
    </>
  );
}
