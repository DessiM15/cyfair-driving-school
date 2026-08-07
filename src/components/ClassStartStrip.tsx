import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { PulseDot } from "@/components/ui/PulseDot";
import { business, teenCourse } from "@/content/site";
import { formatClassDate, nextClassDate } from "@/content/schedule";
import type { Dictionary } from "@/content/en";
import { localePath, type Lang } from "@/lib/i18n";

/**
 * Enrollment urgency strip.
 *
 * Names a specific date when the school has supplied one; otherwise falls back
 * to the cadence the school already publishes ("a new class generally begins
 * every two weeks"). Both messages are true — nothing here is invented to
 * manufacture pressure.
 */
export function ClassStartStrip({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const t = dict.schedule;
  const next = nextClassDate();

  const message = next
    ? t.nextClass.replace("{date}", formatClassDate(next, lang))
    : t.everyWeeks.replace("{weeks}", String(teenCourse.newClassEveryWeeks));

  return (
    <aside className="border-y border-navy-800/40 bg-navy-900 text-white">
      <Container className="flex flex-col items-center justify-center gap-x-6 gap-y-3 py-3.5 sm:flex-row">
        <p className="flex items-center gap-3 text-center text-[0.9375rem]">
          <PulseDot />
          <span className="font-medium">{message}</span>
        </p>

        <span className="flex items-center gap-4 text-sm">
          <Link
            href={localePath("/contact-us", lang)}
            className="rounded-full bg-white px-4 py-1.5 font-medium text-navy-800 transition-colors hover:bg-sky-100"
          >
            {t.cta}
          </Link>
          <a
            href={business.phoneHref}
            className="whitespace-nowrap text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
          >
            {business.phone}
          </a>
        </span>
      </Container>
    </aside>
  );
}
