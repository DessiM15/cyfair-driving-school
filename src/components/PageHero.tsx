import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { images, imageAlt, type ImageSlot } from "@/content/images";
import { localePath, type Lang } from "@/lib/i18n";

/**
 * Interior page hero.
 *
 * Light by default: warm paper background, navy type, and the photograph held in
 * a rounded panel rather than bleeding behind the text. Keeps every page after
 * the homepage firmly on the light side while still leading with imagery.
 */
export function PageHero({
  lang,
  eyebrow,
  title,
  subtitle,
  image,
  breadcrumbs,
  children,
}: {
  lang: Lang;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: ImageSlot;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  const img = images[image];

  return (
    <section className="relative overflow-hidden bg-cream pt-28 pb-16 md:pt-36 md:pb-20">
      {/* Soft brand wash behind the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-sky-200/30 blur-3xl"
      />

      <Container className="relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              {breadcrumbs.map((crumb, i) => (
                <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link
                      href={localePath(crumb.href, lang)}
                      className="transition-colors hover:text-navy-700"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink-soft">{crumb.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && <span aria-hidden="true">/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            {eyebrow && (
              <Reveal>
                <p className="eyebrow mb-5">{eyebrow}</p>
              </Reveal>
            )}
            <Reveal delay={0.06}>
              <h1 className="display-2 text-ink">{title}</h1>
            </Reveal>
            {subtitle && (
              <Reveal delay={0.12}>
                <p className="prose-body mt-6 max-w-xl text-lg">{subtitle}</p>
              </Reveal>
            )}
            {children && (
              <Reveal delay={0.18}>
                <div className="mt-9">{children}</div>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1} direction="left" className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[--radius-card] shadow-lift">
              <Image
                src={img.src}
                alt={imageAlt(image, lang)}
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
                style={{ backgroundColor: img.color }}
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
