import Image from "next/image";
import { images, imageAlt, type ImageSlot } from "@/content/images";
import type { Lang } from "@/lib/i18n";

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Bulleted list with brand check marks — used across every course page. */
export function CheckList({
  items,
  className = "",
  tone = "dark",
}: {
  items: readonly string[];
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <ul className={`space-y-3.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3.5">
          <span
            className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
              tone === "light" ? "bg-sky-300/20 text-sky-300" : "bg-navy-100 text-navy-700"
            }`}
          >
            <CheckIcon className="size-3" />
          </span>
          <span className={tone === "light" ? "text-white/80" : "text-ink-soft"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** A framed photograph with consistent radius, shadow and colour placeholder. */
export function Figure({
  slot,
  lang,
  ratio = "aspect-[4/3]",
  className = "",
  sizes = "(min-width: 1024px) 46vw, 100vw",
  priority = false,
}: {
  slot: ImageSlot;
  lang: Lang;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const img = images[slot];
  return (
    <figure className={`relative ${ratio} overflow-hidden rounded-[--radius-card] shadow-lift ${className}`}>
      <Image
        src={img.src}
        alt={imageAlt(slot, lang)}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ backgroundColor: img.color }}
      />
    </figure>
  );
}

/** Stat / fact tile used on the course pages. */
export function FactTile({
  value,
  unit,
  label,
}: {
  value: number | string;
  unit?: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-sand-dark/60 bg-white p-6 text-center shadow-soft">
      <p className="font-display text-4xl font-semibold text-navy-700">
        {value}
        {unit && <span className="ml-1 text-lg text-muted">{unit}</span>}
      </p>
      <p className="mt-2 text-sm leading-snug text-ink-soft">{label}</p>
    </div>
  );
}

export function Card({
  title,
  body,
  className = "",
}: {
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={`rounded-[--radius-card] border border-sand-dark/60 bg-white p-7 shadow-soft ${className}`}>
      <h3 className="font-display text-xl text-ink">{title}</h3>
      <p className="prose-body mt-3 text-base">{body}</p>
    </div>
  );
}

/** Callout for notices that must not be mistaken for marketing copy. */
export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-2xl border border-sand-dark bg-cream px-5 py-4 text-sm leading-relaxed text-ink-soft">
      {children}
    </p>
  );
}
