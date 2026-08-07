import Link from "next/link";
import { Container, Section } from "@/components/ui/Section";
import { ButtonLink, CallButton } from "@/components/ui/Button";
import { business } from "@/content/site";
import { en } from "@/content/en";
import { localePath } from "@/lib/i18n";

/**
 * Not-found is rendered outside the dynamic-params context, so it cannot read
 * the active locale. It falls back to English and offers routes in both
 * languages rather than guessing wrong.
 */
export default function NotFound() {
  const dict = en;
  const links = [
    { href: "/", label: dict.nav.home },
    { href: "/teen-driving-classes", label: dict.nav.teens },
    { href: "/adult-drivers-education", label: dict.nav.adults },
    { href: "/road-tests", label: dict.nav.roadTests },
    { href: "/contact-us", label: dict.nav.contact },
  ];

  return (
    <Section tone="cream" className="pt-32 md:pt-40">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-7xl font-semibold text-navy-200">404</p>
          <h1 className="display-2 mt-4">{dict.notFound.title}</h1>
          <p className="prose-body mt-5">{dict.notFound.body}</p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" size="lg">
              {dict.notFound.home}
            </ButtonLink>
            <CallButton phone={business.phone} phoneHref={business.phoneHref} size="lg" />
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-sand-dark/60 pt-8 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ink-soft underline decoration-sand-dark underline-offset-4 transition-colors hover:text-navy-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={localePath("/", "es")}
                hrefLang="es"
                className="text-navy-700 underline decoration-navy-300 underline-offset-4"
              >
                Español
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
