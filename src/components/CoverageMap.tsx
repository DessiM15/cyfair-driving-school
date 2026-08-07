"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { cities } from "@/content/cities";
import { roadTestSites } from "@/content/site";
import { localePath, type Lang } from "@/lib/i18n";
import { useCalmMotion } from "@/lib/useCalmMotion";

/**
 * An abstract coverage map of the greater Houston service area.
 *
 * Deliberately not a real tile map: no third-party script, no API key, no
 * layout shift, and it stays on-brand. City positions are derived from their
 * real coordinates, so the shape of the region is honest even though the
 * rendering is stylised.
 */
export function CoverageMap({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useCalmMotion();

  // Bounding box across all served cities, with padding.
  const lats = cities.map((c) => c.lat);
  const lngs = cities.map((c) => c.lng);
  const minLat = Math.min(...lats) - 0.06;
  const maxLat = Math.max(...lats) + 0.06;
  const minLng = Math.min(...lngs) - 0.06;
  const maxLng = Math.max(...lngs) + 0.06;

  const W = 800;
  const H = 560;

  const project = (lat: number, lng: number) => ({
    x: ((lng - minLng) / (maxLng - minLng)) * W,
    // Latitude increases northward, SVG y increases downward.
    y: H - ((lat - minLat) / (maxLat - minLat)) * H,
  });

  const shown = compact ? cities.filter((c) => c.tier === "primary") : cities;

  return (
    <div className="relative w-full overflow-hidden rounded-[--radius-card] border border-sand-dark/70 bg-gradient-to-br from-navy-50 via-white to-sky-100/50">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Service area map">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4585c5" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#4585c5" stopOpacity="0" />
          </radialGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0v40" fill="none" stroke="#25459a" strokeOpacity="0.06" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width={W} height={H} fill="url(#grid)" />
        <ellipse cx={W / 2} cy={H / 2} rx={W * 0.42} ry={H * 0.42} fill="url(#glow)" />

        {/* Connective lines from each road-test site outward give the map a sense
            of a network rather than scattered dots. */}
        {shown.map((city, i) => {
          const p = project(city.lat, city.lng);
          const center = project(29.8637, -95.6402);
          return (
            <motion.line
              key={`line-${city.slug}`}
              x1={center.x}
              y1={center.y}
              x2={p.x}
              y2={p.y}
              stroke="#4585c5"
              strokeOpacity={hovered === city.slug ? 0.5 : 0.14}
              strokeWidth={hovered === city.slug ? 1.6 : 1}
              initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.02, ease: "easeOut" }}
            />
          );
        })}

        {shown.map((city, i) => {
          const p = project(city.lat, city.lng);
          const isPrimary = city.tier === "primary";
          const active = hovered === city.slug;
          const r = isPrimary ? 8 : 5;

          return (
            <motion.g
              key={city.slug}
              initial={reduced ? undefined : { opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.025, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(city.slug)}
              onMouseLeave={() => setHovered(null)}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            >
              {active && <circle cx={p.x} cy={p.y} r={r + 9} fill="#4585c5" fillOpacity="0.18" />}
              <circle
                cx={p.x}
                cy={p.y}
                r={r}
                fill={isPrimary ? "#25459a" : "#4585c5"}
                stroke="#fff"
                strokeWidth="2"
              />
              {(isPrimary || active) && (
                <text
                  x={p.x}
                  y={p.y - r - 8}
                  textAnchor="middle"
                  className="fill-navy-900 font-sans text-[13px] font-semibold"
                >
                  {city.name}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-4 left-4 flex flex-wrap gap-x-5 gap-y-2 rounded-xl bg-white/85 px-4 py-2.5 text-xs backdrop-blur-sm">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-navy-700" />
          <span className="text-ink-soft">Primary areas</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-sky-500" />
          <span className="text-ink-soft">Also served</span>
        </span>
      </div>

      {!compact && (
        <div className="pointer-events-none absolute right-4 top-4 rounded-xl bg-white/85 px-4 py-2.5 text-xs backdrop-blur-sm">
          <p className="font-semibold text-navy-800">Road tests</p>
          <p className="mt-0.5 text-ink-soft">{roadTestSites.join(" · ")}</p>
        </div>
      )}

      <span className="sr-only">
        <ul>
          {cities.map((c) => (
            <li key={c.slug}>
              <Link href={localePath(`/service-areas/${c.slug}`, lang)}>{c.name}, Texas</Link>
            </li>
          ))}
        </ul>
      </span>
    </div>
  );
}
