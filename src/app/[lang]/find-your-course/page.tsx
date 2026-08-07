import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseQuiz } from "@/components/CourseQuiz";
import { CtaBand } from "@/components/CtaBand";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/find-your-course",
    title: dict.quiz.metaTitle,
    description: dict.quiz.metaDescription,
  });
}

export default async function QuizPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);

  return (
    <>
      <Section tone="cream" className="pt-32 md:pt-40" spacing="tight">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-4">{dict.quiz.hero.eyebrow}</p>
            <h1 className="display-2">{dict.quiz.hero.title}</h1>
            <p className="prose-body mt-5 text-lg">{dict.quiz.hero.subtitle}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <CourseQuiz lang={lang} dict={dict} />
        </Container>
      </Section>

      <CtaBand
        lang={lang}
        dict={dict}
        title={dict.home.cta.title}
        body={dict.home.cta.body}
        image="teen-city"
      />

      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: dict.nav.home, route: "/" },
          { name: dict.quiz.hero.title, route: "/find-your-course" },
        ])}
      />
    </>
  );
}
