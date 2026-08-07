"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ButtonLink, PhoneIcon } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { KineticText } from "@/components/motion/KineticText";
import { heroVideo } from "@/content/images";
import { business } from "@/content/site";
import type { Dictionary } from "@/content/en";
import { localePath, type Lang } from "@/lib/i18n";
import { useCalmMotion } from "@/lib/useCalmMotion";

export function Hero({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const reduced = useCalmMotion();
  const containerRef = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);

  /**
   * The video is opt-in rather than opt-out. We only fetch it once the page has
   * settled, and never when the visitor prefers reduced motion or is on a
   * metered/slow connection — in those cases the poster is the whole hero.
   */
  useEffect(() => {
    if (reduced) return;

    type NetworkInfo = { saveData?: boolean; effectiveType?: string };
    const connection = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /2g/.test(connection.effectiveType)) return;

    const id = window.setTimeout(() => setAllowVideo(true), 400);
    return () => window.clearTimeout(id);
  }, [reduced]);

  // Gentle parallax: the media drifts slower than the page, adding depth without
  // hijacking the scroll.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const stagger = (i: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.15 + i * 0.11, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-950"
    >
      {/* Media layer */}
      <motion.div
        style={reduced ? undefined : { y: mediaY, scale: mediaScale }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={heroVideo.poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        {allowVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={heroVideo.poster}
            onCanPlay={() => setVideoReady(true)}
            aria-hidden="true"
            className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Mobile gets a lighter encode; the browser picks the first match. */}
            <source src={heroVideo.mp4Mobile} type="video/mp4" media="(max-width: 768px)" />
            <source src={heroVideo.mp4} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Scrims. The footage is deliberately pushed well back: an even base wash
          plus a vertical gradient, so the video reads as atmosphere rather than
          competing with the headline. Symmetric now that the text is centred. */}
      <div aria-hidden="true" className="absolute inset-0 bg-navy-950/48" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/25 to-navy-950/60"
      />
      {/* Gentle vignette to keep the eye on the centre. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(13,23,56,0.45)_100%)]"
      />

      {/* Content */}
      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-page relative z-10 py-32 md:py-28"
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            {...stagger(0)}
            className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-sky-300"
          >
            {dict.home.hero.eyebrow}
          </motion.p>

          {/* Words unmask from beneath rather than fading in — the line reads
              as being uncovered, which is most of the hero's character. */}
          <h1 className="mt-6 font-display text-white">
            <span className="display-1 block">
              <KineticText text={dict.home.hero.title} delay={0.28} />
            </span>
            <span className="display-1 block text-sky-300">
              <KineticText text={dict.home.hero.titleAccent} delay={0.46} />
            </span>
          </h1>

          <motion.p
            {...stagger(3)}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl"
          >
            {dict.home.hero.subtitle}
          </motion.p>

          <motion.div
            {...stagger(4)}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton>
              <ButtonLink href={localePath("/contact-us", lang)} variant="light" size="lg">
                {dict.home.hero.primaryCta}
              </ButtonLink>
            </MagneticButton>
            <MagneticButton>
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/55 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/12"
              >
                <PhoneIcon className="size-4" />
                {dict.home.hero.secondaryCta}
              </a>
            </MagneticButton>
          </motion.div>

          {/* Trust chips */}
          <motion.ul
            {...stagger(5)}
            className="mt-12 flex flex-wrap justify-center gap-x-7 gap-y-3"
          >
            {dict.home.trustBar.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/75">
                <CheckIcon className="size-4 shrink-0 text-sky-300" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      {!reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{ opacity: contentOpacity }}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-7 z-10 hidden justify-center md:flex"
        >
          <div className="flex flex-col items-center gap-2.5">
            <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-white/55">
              {dict.home.hero.scrollHint}
            </span>
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="block h-9 w-px bg-gradient-to-b from-white/60 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="m4.5 10.5 3.5 3.5 7.5-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
