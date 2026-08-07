import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { Dictionary } from "@/content/en";
import { business } from "@/content/site";

/**
 * Real reviews from the school's Google Business profile.
 *
 * Note: these are attributed to real people, so they get initials avatars rather
 * than stock portraits. Pairing a real reviewer's name with a stock photo of a
 * stranger would misrepresent an actual person.
 */
export function Testimonials({
  dict,
  tone = "cream",
  showHeading = true,
}: {
  dict: Dictionary;
  tone?: "cream" | "paper";
  showHeading?: boolean;
}) {
  return (
    <Section tone={tone}>
      <Container>
        {showHeading && (
          <SectionHeading
            eyebrow={dict.home.testimonials.eyebrow}
            title={dict.home.testimonials.title}
            subtitle={dict.home.testimonials.subtitle}
            align="center"
            className="mb-14"
          />
        )}

        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {dict.testimonials.map((t) => (
            <RevealItem
              key={t.name}
              className="flex flex-col rounded-[--radius-card] border border-sand-dark/60 bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift"
            >
              <Stars />
              <blockquote className="mt-5 flex-1">
                <p className="text-[1.0625rem] leading-relaxed text-ink-soft">“{t.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-sand-dark/50 pt-5">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-100 font-display text-sm font-semibold text-navy-800"
                >
                  {initials(t.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{t.name}</span>
                  <span className="block text-xs text-muted">via {t.source}</span>
                </span>
              </figcaption>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-10 text-center text-sm text-muted">
          <a
            href={business.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-navy-300 underline-offset-4 transition-colors hover:text-navy-700"
          >
            {dict.common.viewAll} →
          </a>
        </p>
      </Container>
    </Section>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4 fill-amber-signal" aria-hidden="true">
          <path d="M10 1.5 12.4 7l6 .5-4.6 4 1.4 5.9L10 14.3 4.8 17.4 6.2 11.5 1.6 7.5l6-.5L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}
