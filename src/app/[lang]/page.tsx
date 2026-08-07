import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Hero } from "@/components/home/Hero";
import { RoadJourney } from "@/components/home/RoadJourney";
import { CourseCard } from "@/components/home/CourseCard";
import { MaskFigure } from "@/components/motion/MaskFigure";
import { RoadDivider } from "@/components/motion/RoadDivider";
import { Testimonials } from "@/components/Testimonials";
import { CoverageMap } from "@/components/CoverageMap";
import { CtaBand } from "@/components/CtaBand";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";

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

            {/* Offset image pair. The two photographs wipe open and drift at
                different rates, which is what gives the block real depth
                rather than looking like two boxes side by side. */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="pt-10 md:pt-16">
                  <MaskFigure
                    slot="teen-with-parent"
                    lang={lang}
                    ratio="aspect-[3/4]"
                    sizes="(min-width: 1024px) 28vw, 45vw"
                    parallax={26}
                  />
                </div>
                <MaskFigure
                  slot="lesson-coaching"
                  lang={lang}
                  ratio="aspect-[3/4]"
                  sizes="(min-width: 1024px) 28vw, 45vw"
                  delay={0.12}
                  parallax={-18}
                />
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
          <RoadDivider className="mb-16" />
          <SectionHeading
            eyebrow={dict.home.courses.eyebrow}
            title={dict.home.courses.title}
            subtitle={dict.home.courses.subtitle}
            className="mb-14"
          />

          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {dict.home.courses.items.map((course) => (
              <RevealItem key={course.key}>
                <CourseCard
                  href={localePath(course.href, lang)}
                  name={course.name}
                  age={course.age}
                  summary={course.summary}
                  image={course.image}
                  lang={lang}
                  cta={dict.common.learnMore}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---- Signature moment: the road to a license ---- */}
      <RoadJourney lang={lang} dict={dict} />

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
            <div className="lg:col-span-5">
              <MaskFigure
                slot="class-diverse"
                lang={lang}
                ratio="aspect-[4/5]"
                sizes="(min-width: 1024px) 38vw, 100vw"
                parallax={22}
              />
            </div>

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
