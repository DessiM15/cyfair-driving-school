"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ButtonLink, Button } from "@/components/ui/Button";
import { business } from "@/content/site";
import type { Dictionary } from "@/content/en";
import { localePath, type Lang } from "@/lib/i18n";
import { useCalmMotion } from "@/lib/useCalmMotion";

type Answers = Record<string, string>;
type ResultKey = keyof Dictionary["quiz"]["results"];

/**
 * Routes a visitor to the right course in three questions.
 *
 * The mapping mirrors Texas rules as they are stated on the site: under-18s need
 * the full teen course, 18–24 take the adult course, and 25+ are exempt from
 * driver education so usually only need the road test.
 */
function resolve(answers: Answers): ResultKey {
  const { age, permit, goal } = answers;

  if (goal === "ticket") return "defensive";
  if (goal === "roadtest") return "roadTest";

  // Goal is a full licence.
  if (permit === "licensed") return "roadTest";
  if (age === "under18") return "teen";
  if (age === "18to24") return "adult";
  return "adultExempt";
}

export function CourseQuiz({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const t = dict.quiz;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const reduced = useCalmMotion();

  const total = t.questions.length;
  const done = step >= total;
  const result = done ? t.results[resolve(answers)] : null;

  const choose = (id: string, value: string) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    window.setTimeout(() => setStep((s) => s + 1), reduced ? 0 : 180);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const progress = done ? 100 : (step / total) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted">
          <span>
            {done ? t.resultTitle : `${dict.common.step} ${step + 1} ${dict.common.of} ${total}`}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-sand">
          <motion.div
            className="h-full rounded-full bg-navy-700"
            animate={{ width: `${progress}%` }}
            transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={`q-${step}`}
            initial={reduced ? undefined : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="display-3 text-ink">{t.questions[step].question}</h2>

            <div className="mt-8 space-y-3">
              {t.questions[step].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => choose(t.questions[step].id, option.value)}
                  className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-sand-dark bg-white px-6 py-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-400 hover:shadow-soft"
                >
                  <span className="text-lg text-ink">{option.label}</span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-sand-dark text-navy-400 transition-colors group-hover:border-navy-500 group-hover:bg-navy-500 group-hover:text-white">
                    →
                  </span>
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="mt-7 text-sm text-muted underline underline-offset-4 transition-colors hover:text-navy-700"
              >
                ← {dict.common.back}
              </button>
            )}
          </motion.div>
        ) : (
          result && (
            <motion.div
              key="result"
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[--radius-card] border border-navy-200 bg-white p-8 shadow-lift md:p-10"
            >
              <p className="eyebrow">{t.resultTitle}</p>
              <h2 className="display-3 mt-4 text-ink">{result.name}</h2>
              <p className="prose-body mt-4 text-base">{result.why}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {/* Carries the recommendation through to the form so the visitor
                    doesn't answer the same question twice. */}
                <ButtonLink
                  href={`${localePath("/contact-us", lang)}?course=${encodeURIComponent(courseParam(result.name, dict))}`}
                  size="lg"
                >
                  {t.resultCta}
                </ButtonLink>
                <a
                  href={business.phoneHref}
                  className="inline-flex items-center justify-center rounded-full border border-sand-dark bg-white px-8 py-4 text-base font-medium text-navy-800 transition-all hover:border-navy-300 hover:bg-navy-50"
                >
                  {t.resultCallCta}
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-sand-dark/60 pt-6 text-sm">
                <Link
                  href={localePath(result.href, lang)}
                  className="font-medium text-navy-700 underline decoration-navy-300 underline-offset-4"
                >
                  {dict.common.readMore} →
                </Link>
                <Button variant="ghost" size="sm" onClick={restart} className="px-0 hover:bg-transparent">
                  {t.restart}
                </Button>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Maps a recommendation onto one of the contact form's course options so the
 * prefill matches an actual <option> value.
 */
function courseParam(resultName: string, dict: Dictionary): string {
  const options = dict.contact.form.courseOptions;
  const match = options.find((o) => o.toLowerCase().includes(resultName.toLowerCase().split(" ")[0]));
  return match ?? options[0];
}
