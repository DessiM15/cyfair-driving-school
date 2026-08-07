import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import type { Dictionary } from "@/content/en";

/**
 * Section wrapper for the real reviews from the school's Google Business
 * profile. The carousel itself lives in TestimonialCarousel; this just supplies
 * the heading and background tone so every page presents reviews identically.
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

        <TestimonialCarousel dict={dict} />
      </Container>
    </Section>
  );
}
