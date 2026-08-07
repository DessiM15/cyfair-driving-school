import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink, CallButton } from "@/components/ui/Button";
import { CheckList, Figure, FactTile } from "@/components/ui/Bits";

import { business } from "@/content/site";
import { getDictionary, isLang, localePath, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, courseSchema, faqSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/teen-driving-classes",
    title: dict.teen.metaTitle,
    description: dict.teen.metaDescription,
    image: "/images/teen-focused.jpg",
  });
}

export default async function TeenPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);
  const t = dict.teen;

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image="teen-focused"
        breadcrumbs={[{ label: dict.nav.home, href: "/" }, { label: dict.nav.teens }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={localePath("/contact-us", lang)} size="lg">
            {dict.common.enrollToday}
          </ButtonLink>
          <CallButton phone={business.phone} phoneHref={business.phoneHref} size="lg" />
        </div>
      </PageHero>

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

              <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3">
                {t.what.breakdown.map((b) => (
                  <RevealItem key={b.label}>
                    <FactTile value={b.value} unit={b.unit} label={b.label} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <Reveal delay={0.1} direction="left" className="lg:col-span-5">
              <Figure slot="teen-learning" lang={lang} ratio="aspect-[3/4]" sizes="(min-width: 1024px) 38vw, 100vw" />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* When + advantages */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Figure slot="class-lecture" lang={lang} sizes="(min-width: 1024px) 38vw, 100vw" />
            </Reveal>

            <div className="lg:col-span-7">
              <SectionHeading title={t.when.title} />
              <Reveal delay={0.08}>
                <p className="prose-body mt-5">{t.when.body}</p>
              </Reveal>

              <Reveal delay={0.14}>
                <h3 className="mt-12 font-display text-2xl text-ink">{t.advantages.title}</h3>
                <CheckList items={t.advantages.items} className="mt-6" />
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-10 rounded-[--radius-card] border border-navy-200/70 bg-white p-7 shadow-soft">
                  <h3 className="font-display text-xl text-ink">{t.parentTaught.title}</h3>
                  <p className="prose-body mt-3 text-base">{t.parentTaught.body}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Online option */}
      <Section tone="paper" spacing="tight">
        <Container>
          <Reveal className="overflow-hidden rounded-[--radius-card] border border-sand-dark/60 bg-gradient-to-br from-navy-700 to-navy-900 p-9 shadow-lift md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-sky-300">
                  {dict.home.online.eyebrow}
                </p>
                <h2 className="display-3 mt-4 text-white">{dict.home.online.title}</h2>
                <p className="mt-4 max-w-xl leading-relaxed text-white/70">{dict.home.online.body}</p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <ButtonLink href={business.onlineCoursePartner.url} external variant="light" size="lg">
                  {dict.home.online.cta}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="cream">
        <Container>
          <SectionHeading title={t.faqTitle} align="center" className="mb-12" />
          <div className="mx-auto max-w-4xl">
            <Faq items={t.faqs} />
          </div>
        </Container>
      </Section>

      <CtaBand
        lang={lang}
        dict={dict}
        title={t.cta.title}
        body={t.cta.body}
        image="teen-with-parent"
        primaryLabel={dict.common.enrollToday}
      />

      <JsonLd
        data={[
          courseSchema({ name: dict.home.courses.items[0].name, description: dict.teen.metaDescription, lang }),
          faqSchema(t.faqs),
          breadcrumbSchema(lang, [
            { name: dict.nav.home, route: "/" },
            { name: dict.nav.teens, route: "/teen-driving-classes" },
          ]),
        ]}
      />
    </>
  );
}
