import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/ContactForm";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Figure } from "@/components/ui/Bits";

import { business, fullAddress } from "@/content/site";
import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, JsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/contact-us",
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);
  const t = dict.contact;

  return (
    <>
      <Section tone="cream" className="pt-32 md:pt-40" spacing="tight">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4">{t.hero.eyebrow}</p>
            <h1 className="display-2">{t.hero.title}</h1>
            <p className="prose-body mt-5 text-lg">{t.hero.subtitle}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="h-96 rounded-[--radius-card] border border-sand-dark/60 bg-white" />}>
                <ContactForm dict={dict} />
              </Suspense>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.08}>
                <div className="rounded-[--radius-card] border border-navy-200 bg-navy-50 p-8">
                  <h2 className="font-display text-xl text-ink">{t.details.title}</h2>

                  <div className="mt-6 space-y-6 text-[0.9375rem]">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        {t.details.callTitle}
                      </p>
                      <a
                        href={business.phoneHref}
                        className="mt-1.5 block font-display text-2xl text-navy-700 hover:underline"
                      >
                        {business.phone}
                      </a>
                      <a href={business.phoneAltHref} className="mt-1 block text-ink-soft hover:underline">
                        {business.phoneAlt}
                      </a>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        {t.details.visitTitle}
                      </p>
                      <address className="mt-1.5 not-italic leading-relaxed text-ink-soft">{fullAddress}</address>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm font-medium text-navy-700 underline decoration-navy-300 underline-offset-4"
                      >
                        Google Maps →
                      </a>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        {t.details.followTitle}
                      </p>
                      <div className="mt-2 flex gap-4">
                        <a
                          href={business.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-navy-700 underline decoration-navy-300 underline-offset-4"
                        >
                          Facebook
                        </a>
                        <a
                          href={business.social.google}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-navy-700 underline decoration-navy-300 underline-offset-4"
                        >
                          Google
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-6">
                  <Figure slot="detail-wheel-a" lang={lang} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 38vw, 100vw" />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: dict.nav.home, route: "/" },
          { name: dict.nav.contact, route: "/contact-us" },
        ])}
      />
    </>
  );
}
