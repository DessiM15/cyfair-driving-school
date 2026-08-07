"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon } from "@/components/ui/Bits";
import { business, pricing } from "@/content/site";
import type { Dictionary } from "@/content/en";
import { useCalmMotion } from "@/lib/useCalmMotion";

type AgeKey = "16to17" | "18to24" | "25plus";
type VehicleKey = "school" | "personal";

/**
 * Interactive readiness checklist.
 *
 * The requirement lists are the same ones published on the road tests page —
 * this just makes them tickable, and adds the vehicle requirements only when the
 * visitor says they're bringing their own car.
 */
export function RoadTestChecklist({ dict }: { dict: Dictionary }) {
  const t = dict.checklist;
  const [age, setAge] = useState<AgeKey>("16to17");
  const [vehicle, setVehicle] = useState<VehicleKey>("school");
  const [ticked, setTicked] = useState<Set<string>>(new Set());
  const reduced = useCalmMotion();

  const ageIndex: Record<AgeKey, number> = { "16to17": 0, "18to24": 1, "25plus": 2 };

  const items = useMemo(() => {
    const base = dict.roadTests.requirements.groups[ageIndex[age]].items.map((text) => ({
      id: `age-${age}-${text.slice(0, 20)}`,
      text,
    }));

    const vehicleItems =
      vehicle === "personal"
        ? dict.roadTests.vehicles.personal.items.map((text) => ({
            id: `veh-${text.slice(0, 20)}`,
            text,
          }))
        : [];

    return [...base, ...vehicleItems];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [age, vehicle, dict]);

  // Anything ticked for a previous configuration is no longer relevant.
  const relevantTicked = items.filter((i) => ticked.has(i.id)).length;
  const allDone = items.length > 0 && relevantTicked === items.length;
  const pct = items.length === 0 ? 0 : Math.round((relevantTicked / items.length) * 100);

  const toggle = (id: string) =>
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const reset = () => setTicked(new Set());

  const changeAge = (value: AgeKey) => {
    setAge(value);
    setTicked(new Set());
  };
  const changeVehicle = (value: VehicleKey) => {
    setVehicle(value);
    setTicked(new Set());
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Selectors */}
      <div className="no-print space-y-7 rounded-[--radius-card] border border-sand-dark/60 bg-white p-7 shadow-soft">
        <div>
          <p className="mb-3 font-medium text-ink">{t.pickAge}</p>
          <div className="flex flex-wrap gap-2.5">
            {t.ageGroups.map((group) => (
              <Choice
                key={group.value}
                active={age === group.value}
                onClick={() => changeAge(group.value as AgeKey)}
              >
                {group.label}
              </Choice>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 font-medium text-ink">{t.vehicleTitle}</p>
          <div className="flex flex-wrap gap-2.5">
            {t.vehicleOptions.map((option) => (
              <Choice
                key={option.value}
                active={vehicle === option.value}
                onClick={() => changeVehicle(option.value as VehicleKey)}
              >
                {option.label}
              </Choice>
            ))}
          </div>
          {vehicle === "school" && (
            <p className="mt-3 text-sm text-muted">{t.schoolVehicleNote}</p>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="mt-8 flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-sand">
          <motion.div
            className="h-full rounded-full bg-navy-700"
            animate={{ width: `${pct}%` }}
            transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className="text-sm font-medium text-ink-soft">
          {relevantTicked}/{items.length} {t.progressLabel}
        </span>
      </div>

      {/* Items */}
      <ul className="mt-6 space-y-3">
        {items.map((item) => {
          const isTicked = ticked.has(item.id);
          return (
            <li key={item.id}>
              <button
                onClick={() => toggle(item.id)}
                aria-pressed={isTicked}
                className={`flex w-full items-start gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
                  isTicked
                    ? "border-navy-300 bg-navy-50"
                    : "border-sand-dark bg-white hover:border-navy-200 hover:shadow-soft"
                }`}
              >
                <span
                  className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                    isTicked ? "border-navy-700 bg-navy-700 text-white" : "border-sand-dark text-transparent"
                  }`}
                >
                  <CheckIcon className="size-3.5" />
                </span>
                <span className={isTicked ? "text-ink-soft line-through decoration-navy-300" : "text-ink-soft"}>
                  {item.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Outcome */}
      <AnimatePresence mode="wait">
        <motion.div
          key={allDone ? "done" : "pending"}
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`mt-8 rounded-[--radius-card] border p-7 ${
            allDone ? "border-navy-300 bg-navy-50" : "border-sand-dark bg-cream"
          }`}
        >
          <h3 className="font-display text-xl text-ink">
            {allDone ? t.allSetTitle : t.notReadyTitle}
          </h3>
          <p className="prose-body mt-2 text-base">{allDone ? t.allSetBody : t.notReadyBody}</p>

          {allDone && (
            <a
              href={business.phoneHref}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy-700 px-6 py-3 text-[0.9375rem] font-medium text-white transition-colors hover:bg-navy-800"
            >
              {dict.common.bookRoadTest} · ${pricing.roadTest.price}
            </a>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="no-print mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <button onClick={reset} className="text-muted underline underline-offset-4 hover:text-navy-700">
          {t.resetLabel}
        </button>
        <button
          onClick={() => window.print()}
          className="text-muted underline underline-offset-4 hover:text-navy-700"
        >
          {t.printLabel}
        </button>
      </div>
    </div>
  );
}

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-5 py-2.5 text-[0.9375rem] font-medium transition-all ${
        active
          ? "border-navy-700 bg-navy-700 text-white"
          : "border-sand-dark bg-white text-ink-soft hover:border-navy-300 hover:bg-navy-50"
      }`}
    >
      {children}
    </button>
  );
}
