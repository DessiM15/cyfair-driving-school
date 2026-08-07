"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { images, imageAlt, type ImageSlot } from "@/content/images";
import { useCalmMotion } from "@/lib/useCalmMotion";
import type { Lang } from "@/lib/i18n";

/**
 * Course card with a hover preview.
 *
 * On hover the photograph zooms behind a darkening scrim and a call-to-action
 * pill rises over it, so the card previews its destination instead of just
 * sitting there. Touch devices never fire hover, so they get the resting state
 * — which is why the "learn more" affordance stays visible in the body rather
 * than living only inside the hover treatment.
 */
export function CourseCard({
  href,
  name,
  age,
  summary,
  image,
  lang,
  cta,
}: {
  href: string;
  name: string;
  age: string;
  summary: string;
  image: ImageSlot;
  lang: Lang;
  cta: string;
}) {
  const [hovered, setHovered] = useState(false);
  const calm = useCalmMotion();
  const img = images[image];

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group flex h-full flex-col overflow-hidden rounded-[--radius-card] border border-sand-dark/60 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered && !calm ? 1.07 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={img.src}
            alt={imageAlt(image, lang)}
            fill
            sizes="(min-width: 768px) 46vw, 100vw"
            className="object-cover"
            style={{ backgroundColor: img.color }}
          />
        </motion.div>

        {/* Scrim + CTA pill, revealed on hover */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/15 to-transparent"
          initial={false}
          animate={{ opacity: hovered && !calm ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-800 shadow-lift"
          initial={false}
          animate={{
            opacity: hovered && !calm ? 1 : 0,
            y: hovered && !calm ? 0 : 14,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {cta}
          <ArrowRight className="size-3.5" />
        </motion.span>

        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-xs font-semibold text-navy-800 backdrop-blur-sm">
          {age}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-2xl text-ink">
          <span className="bg-gradient-to-r from-navy-500 to-navy-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
            {name}
          </span>
        </h3>
        <p className="prose-body mt-3 flex-1 text-base">{summary}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-navy-700">
          {cta}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
