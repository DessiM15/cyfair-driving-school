import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CallButton } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Bits";

import { business, paymentMethods } from "@/content/site";
import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/online-payments",
    title: dict.payments.metaTitle,
    description: dict.payments.metaDescription,
    image: "/images/keys-milestone.jpg",
  });
}

export default async function PaymentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);
  const t = dict.payments;

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image="keys-milestone"
        breadcrumbs={[{ label: dict.nav.home, href: "/" }, { label: dict.nav.payments }]}
      >
        <CallButton phone={business.phone} phoneHref={business.phoneHref} variant="primary" size="lg" />
      </PageHero>

      <Section tone="paper">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="prose-body text-lg">{t.body}</p>
            </Reveal>

            <SectionHeading title={t.methodsTitle} className="mb-8 mt-14" />

            <RevealGroup className="grid gap-3 sm:grid-cols-2">
              {paymentMethods.map((method) => (
                <RevealItem
                  key={method}
                  className="flex items-center gap-3 rounded-2xl border border-sand-dark/60 bg-white px-5 py-4 shadow-soft"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-navy-100 text-navy-700">
                    <CardIcon className="size-4.5" />
                  </span>
                  <span className="font-medium text-ink">{method}</span>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <div className="mt-10">
                <Notice>{t.note}</Notice>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        lang={lang}
        dict={dict}
        title={dict.home.cta.title}
        body={dict.home.cta.body}
        image="detail-wheel-b"
      />

      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: dict.nav.home, route: "/" },
          { name: dict.nav.payments, route: "/online-payments" },
        ])}
      />
    </>
  );
}

function CardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2.5 9.5h19" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
