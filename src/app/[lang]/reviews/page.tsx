import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Testimonials } from "@/components/Testimonials";
import { ButtonLink } from "@/components/ui/Button";

import { business } from "@/content/site";
import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/reviews",
    title: dict.reviews.metaTitle,
    description: dict.reviews.metaDescription,
    image: "/images/teen-positive.jpg",
  });
}

export default async function ReviewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);
  const t = dict.reviews;

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image="teen-positive"
        breadcrumbs={[
          { label: dict.nav.home, href: "/" },
          { label: dict.nav.about, href: "/about-us" },
          { label: t.hero.title },
        ]}
      >
        <ButtonLink href={business.social.google} external size="lg">
          {dict.common.viewAll}
        </ButtonLink>
      </PageHero>

      <Testimonials dict={dict} tone="paper" showHeading={false} />

      <CtaBand lang={lang} dict={dict} title={t.cta.title} body={t.cta.body} image="keys-milestone" />

      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: dict.nav.home, route: "/" },
          { name: dict.nav.about, route: "/about-us" },
          { name: t.hero.title, route: "/reviews" },
        ])}
      />
    </>
  );
}
