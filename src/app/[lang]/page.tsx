import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Hero } from "@/components/home/Hero";
import { Testimonials } from "@/components/Testimonials";
import { CoverageMap } from "@/components/CoverageMap";
import { CtaBand } from "@/components/CtaBand";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";

import { images, imageAlt } from "@/content/images";
import { business } from "@/content/site";
import { getDictionary, isLang, localePath, type Lang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    route: "/",
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
  });
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict} />

      {/* ---- Editorial intro with layered imagery ---- */}
      <Section tone="paper" spacing="loose">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow mb-5">{dict.home.intro.eyebrow}</p>
                <h2 className="display-2">{dict.home.intro.title}</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="prose-body mt-7">
                  {dict.home.intro.body.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-9">
                  <ButtonLink href={localePath("/about-us", lang)} variant="secondary">
                    {dict.common.learnMore}
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            {/* Offset image pair — the asymmetry is what gives the section depth */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <Reveal className="pt-10 md:pt-16">
                  <figure className="relative aspect-[3/4] overflow-hidden rounded-[--radius-card] shadow-lift">
                    <Image
                      src={images["teen-with-parent"].src}
                      alt={imageAlt("teen-with-parent", lang)}
                      fill
                      sizes="(min-width: 1024px) 28vw, 45vw"
                      className="object-cover"
                      style={{ backgroundColor: images["teen-with-parent"].color }}
                    />
                  </figure>
                </Reveal>
                <Reveal delay={0.12}>
                  <figure className="relative aspect-[3/4] overflow-hidden rounded-[--radius-card] shadow-lift">
                    <Image
                      src={images["lesson-coaching"].src}
                      alt={imageAlt("lesson-coaching", lang)}
                      fill
                      sizes="(min-width: 1024px) 28vw, 45vw"
                      className="object-cover"
                      style={{ backgroundColor: images["lesson-coaching"].color }}
                    />
                  </figure>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Stats ---- */}
      <Section tone="navy" spacing="tight">
        <Container>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {dict.home.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="text-center lg:text-left">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-5xl font-semibold text-sky-300 md:text-6xl">
                      <CountUp value={stat.value} suffix={stat.suffix} isYear={stat.isYear} />
                    </span>
                    <span className="mt-3 block text-sm leading-snug text-white/65">{stat.label}</span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ---- Courses ---- */}
      <Section tone="paper" id="courses">
        <Container>
          <SectionHeading
            eyebrow={dict.home.courses.eyebrow}
            title={dict.home.courses.title}
            subtitle={dict.home.courses.subtitle}
            className="mb-14"
          />

          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {dict.home.courses.items.map((course) => (
              <RevealItem key={course.key}>
                <Link
                  href={localePath(course.href, lang)}
                  className="group flex h-full flex-col overflow-hidden rounded-[--radius-card] border border-sand-dark/60 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={images[course.image].src}
                      alt={imageAlt(course.image, lang)}
                      fill
                      sizes="(min-width: 768px) 46vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      style={{ backgroundColor: images[course.image].color }}
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-xs font-semibold text-navy-800 backdrop-blur-sm">
                      {course.age}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-2xl text-ink">{course.name}</h3>
                    <p className="prose-body mt-3 flex-1 text-base">{course.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-navy-700">
                      {dict.common.learnMore}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---- Course finder teaser ---- */}
      <Section tone="cream" spacing="tight">
        <Container>
          <Reveal className="overflow-hidden rounded-[--radius-card] border border-navy-200/60 bg-gradient-to-br from-navy-700 to-navy-900 shadow-lift">
            <div className="grid items-center gap-8 p-9 md:grid-cols-12 md:p-12">
              <div className="md:col-span-8">
                <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-sky-300">
                  {dict.home.quizTeaser.eyebrow}
                </p>
                <h2 className="display-3 mt-4 text-white">{dict.home.quizTeaser.title}</h2>
                <p className="mt-4 max-w-xl leading-relaxed text-white/70">{dict.home.quizTeaser.body}</p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <ButtonLink href={localePath("/find-your-course", lang)} variant="light" size="lg">
                  {dict.home.quizTeaser.cta}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---- Why us ---- */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <figure className="relative aspect-[4/5] overflow-hidden rounded-[--radius-card] shadow-lift">
                <Image
                  src={images["class-diverse"].src}
                  alt={imageAlt("class-diverse", lang)}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                  style={{ backgroundColor: images["class-diverse"].color }}
                />
              </figure>
            </Reveal>

            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow={dict.home.why.eyebrow}
                title={dict.home.why.title}
                className="mb-10"
              />
              <RevealGroup className="space-y-8">
                {dict.home.why.items.map((item, i) => (
                  <RevealItem key={item.title}>
                    <div className="flex gap-5">
                      <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-100 font-display text-sm font-semibold text-navy-800">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-xl text-ink">{item.title}</h3>
                        <p className="prose-body mt-2 text-base">{item.body}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Online course ---- */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow={dict.home.online.eyebrow}
                title={dict.home.online.title}
                subtitle={dict.home.online.body}
              />
              <Reveal delay={0.14}>
                <div className="mt-8">
                  <ButtonLink
                    href={business.onlineCoursePartner.url}
                    external
                    variant="primary"
                    size="lg"
                  >
                    {dict.home.online.cta}
                  </ButtonLink>
                  <p className="mt-3 text-sm text-muted">{business.onlineCoursePartner.name}</p>
                </div>
              </Reveal>
            </div>

            <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {dict.home.online.features.map((f) => (
                <RevealItem
                  key={f.title}
                  className="rounded-2xl border border-sand-dark/60 bg-white p-6 shadow-soft"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy-700">{f.title}</p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{f.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      <Testimonials dict={dict} tone="paper" />

      {/* ---- Service areas ---- */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow={dict.home.areas.eyebrow}
                title={dict.home.areas.title}
                subtitle={dict.home.areas.body}
              />
              <Reveal delay={0.14}>
                <div className="mt-8">
                  <ButtonLink
                    href={localePath("/approved-road-test-locations", lang)}
                    variant="secondary"
                  >
                    {dict.home.areas.cta}
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-8">
              <CoverageMap lang={lang} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        lang={lang}
        dict={dict}
        title={dict.home.cta.title}
        body={dict.home.cta.body}
        image="houston-heights"
      />
    </>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
