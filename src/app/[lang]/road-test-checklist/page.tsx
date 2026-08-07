import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RoadTestChecklist } from "@/components/RoadTestChecklist";
import { CtaBand } from "@/components/CtaBand";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, faqSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/road-test-checklist",
    title: dict.checklist.metaTitle,
    description: dict.checklist.metaDescription,
    image: "/images/road-sign.jpg",
  });
}

export default async function ChecklistPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);

  // Each age group becomes an FAQ entry — this page targets "what do I need for
  // my Texas road test", which is a high-intent search with real volume.
  const faqs = dict.roadTests.requirements.groups.map((group) => ({
    q: `${dict.checklist.hero.title} — ${group.age}`,
    a: group.items.join(". ") + ".",
  }));

  return (
    <>
      <Section tone="cream" className="pt-32 md:pt-40" spacing="tight">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-4">{dict.checklist.hero.eyebrow}</p>
            <h1 className="display-2">{dict.checklist.hero.title}</h1>
            <p className="prose-body mt-5 text-lg">{dict.checklist.hero.subtitle}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <RoadTestChecklist dict={dict} />
        </Container>
      </Section>

      <CtaBand
        lang={lang}
        dict={dict}
        title={dict.roadTests.cta.title}
        body={dict.roadTests.cta.body}
        image="car-parked"
      />

      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema(lang, [
            { name: dict.nav.home, route: "/" },
            { name: dict.nav.roadTests, route: "/road-tests" },
            { name: dict.checklist.hero.title, route: "/road-test-checklist" },
          ]),
        ]}
      />
    </>
  );
}
