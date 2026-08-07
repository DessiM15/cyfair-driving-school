import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Notice } from "@/components/ui/Bits";

import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/privacy",
    title: dict.privacy.metaTitle,
    description: dict.privacy.metaDescription,
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);
  const t = dict.privacy;

  return (
    <>
      <Section tone="cream" className="pt-32 md:pt-40" spacing="tight">
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <p className="eyebrow mb-4">{t.hero.eyebrow}</p>
            <h1 className="display-2">{t.hero.title}</h1>
            <p className="prose-body mt-5 text-lg">{t.hero.subtitle}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Notice>{t.placeholderNotice}</Notice>
            </Reveal>

            <div className="mt-12 space-y-10">
              {t.sections.map((section, i) => (
                <Reveal key={section.title} delay={i * 0.05}>
                  <h2 className="font-display text-2xl text-ink">{section.title}</h2>
                  <p className="prose-body mt-3">{section.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: dict.nav.home, route: "/" },
          { name: t.hero.title, route: "/privacy" },
        ])}
      />
    </>
  );
}
