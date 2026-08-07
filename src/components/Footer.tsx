import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Section";
import { business, fullAddress } from "@/content/site";
import { primaryCities } from "@/content/cities";
import type { Dictionary } from "@/content/en";
import { localePath, type Lang } from "@/lib/i18n";

export function Footer({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const courses = [
    { href: "/teen-driving-classes", label: dict.nav.teens },
    { href: "/adult-drivers-education", label: dict.nav.adults },
    { href: "/road-tests", label: dict.nav.roadTests },
    { href: "/defensive-driving", label: dict.nav.defensive },
    { href: "/find-your-course", label: dict.quiz.hero.title },
  ];

  const company = [
    { href: "/about-us", label: dict.nav.about },
    { href: "/meet-the-team", label: dict.team.hero.title },
    { href: "/reviews", label: dict.reviews.hero.title },
    { href: "/careers", label: dict.careers.hero.title },
    { href: "/instructors", label: dict.nav.instructors },
    { href: "/online-payments", label: dict.nav.payments },
  ];

  return (
    <footer className="bg-navy-950 text-white/70">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href={localePath("/", lang)} aria-label={business.name} className="inline-block">
              <Logo className="h-9 w-auto" primary="#ffffff" secondary="#9cc1e5" />
            </Link>
            <p className="mt-6 font-display text-xl text-white">{dict.footer.tagline}</p>
            <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed">{dict.footer.blurb}</p>

            <div className="mt-6 flex gap-3">
              <SocialLink href={business.social.facebook} label="Facebook">
                <path d="M14 8.5h2.5V5.2h-2.9c-2.6 0-4.1 1.6-4.1 4.2v2H7v3.3h2.5V22h3.4v-7.3h2.6l.4-3.3h-3v-1.6c0-.9.3-1.3 1.1-1.3Z" />
              </SocialLink>
              <SocialLink href={business.social.google} label="Google">
                <path d="M21.6 12.2c0-.7-.06-1.2-.18-1.8H12v3.3h5.5c-.11.9-.71 2.3-2.05 3.2l-.02.12 2.98 2.3.2.02c1.9-1.7 2.99-4.3 2.99-7.14Z" />
                <path d="M12 22c2.7 0 4.97-.9 6.62-2.4l-3.16-2.44c-.84.6-1.98 1-3.46 1-2.64 0-4.88-1.7-5.68-4.1l-.12.01-3.1 2.4-.04.11C4.8 19.8 8.13 22 12 22Z" />
                <path d="M6.32 14.06a6.1 6.1 0 0 1 0-4.12l-.01-.14-3.14-2.43-.1.05a10 10 0 0 0 0 9.16l3.25-2.52Z" />
                <path d="M12 5.84c1.87 0 3.13.8 3.85 1.47l2.81-2.74C16.96 3 14.7 2 12 2 8.13 2 4.8 4.2 3.07 7.42l3.24 2.52C7.12 7.54 9.36 5.84 12 5.84Z" />
              </SocialLink>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <FooterColumn title={dict.footer.coursesTitle}>
              {courses.map((l) => (
                <FooterLink key={l.href} href={localePath(l.href, lang)}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title={dict.footer.companyTitle}>
              {company.map((l) => (
                <FooterLink key={l.href} href={localePath(l.href, lang)}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title={dict.footer.contactTitle}>
              <li>
                <a
                  href={business.phoneHref}
                  className="text-white transition-colors hover:text-sky-300"
                >
                  {business.phone}
                </a>
              </li>
              <li>
                <a href={business.phoneAltHref} className="transition-colors hover:text-white">
                  {business.phoneAlt}
                </a>
              </li>
              <li className="pt-2">
                <address className="not-italic leading-relaxed">{fullAddress}</address>
              </li>
              {/* FooterLink renders its own <li>; wrapping it in another one
                  produced invalid nested list items, which the HTML parser
                  flattens into siblings and React then fails to hydrate. */}
              <FooterLink href={localePath("/contact-us", lang)} className="pt-2">
                {dict.nav.contact}
              </FooterLink>
              <FooterLink href={localePath("/approved-road-test-locations", lang)}>
                {dict.nav.locations}
              </FooterLink>
            </FooterColumn>
          </div>
        </div>

        {/* Service areas — real internal links, which is what makes the city
            pages discoverable to search engines. */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
            {dict.footer.areasTitle}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {primaryCities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={localePath(`/service-areas/${city.slug}`, lang)}
                  className="text-sm transition-colors hover:text-white"
                >
                  {city.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={localePath("/approved-road-test-locations", lang)}
                className="text-sm text-sky-300 transition-colors hover:text-white"
              >
                {dict.common.viewAll} →
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. {dict.footer.rightsReserved}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href={localePath("/privacy", lang)} className="transition-colors hover:text-white">
              {dict.footer.privacy}
            </Link>
            <p>
              {dict.footer.poweredBy}{" "}
              <a
                href={business.agency.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white underline decoration-sky-400/50 underline-offset-4 transition-colors hover:text-sky-300 hover:decoration-sky-300"
              >
                {business.agency.name}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">{title}</p>
      <ul className="mt-4 space-y-2.5 text-[0.9375rem]">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li className={className}>
      <Link href={href} className="transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-white/15 transition-all hover:border-white/40 hover:bg-white/10"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4.5">
        {children}
      </svg>
    </a>
  );
}
