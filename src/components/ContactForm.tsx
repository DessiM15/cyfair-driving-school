"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Bits";
import type { Dictionary } from "@/content/en";
import { useCalmMotion } from "@/lib/useCalmMotion";

type Errors = Partial<Record<"name" | "phone" | "email", string>>;

/**
 * Request-a-class-time form.
 *
 * DEMO BEHAVIOUR: this validates fully and shows a real success state, but does
 * not transmit anywhere — there is no endpoint and no data leaves the browser.
 * The notice above the form says so plainly, so nobody believes a message was
 * delivered when it wasn't.
 *
 * To make it live: POST `payload` to an API route in `submit()` below.
 */
export function ContactForm({ dict }: { dict: Dictionary }) {
  const f = dict.contact.form;
  const searchParams = useSearchParams();
  const reduced = useCalmMotion();

  // The course finder links here with ?course=… so the visitor doesn't re-answer.
  const preselected = searchParams.get("course") ?? "";
  const initialCourse = f.courseOptions.includes(preselected) ? preselected : f.courseOptions[0];

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    course: initialCourse,
    location: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "submitting" | "done">("idle");

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key as keyof Errors]) setErrors((e2) => ({ ...e2, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = f.errorRequired;
    if (values.phone.replace(/\D/g, "").length < 10) next.phone = f.errorPhone;
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) next.email = f.errorEmail;
    return next;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setState("submitting");
    // Demo only — no network request is made.
    window.setTimeout(() => setState("done"), 700);
  };

  if (state === "done") {
    return (
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[--radius-card] border border-navy-200 bg-navy-50 p-9 text-center"
      >
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-navy-700 text-white">
          <CheckIcon className="size-6" />
        </span>
        <h3 className="mt-5 font-display text-2xl text-ink">{f.successTitle}</h3>
        <p className="prose-body mx-auto mt-3 max-w-md text-base">{f.successBody}</p>
        <Button
          variant="secondary"
          className="mt-7"
          onClick={() => {
            setValues({ name: "", phone: "", email: "", course: f.courseOptions[0], location: "", message: "" });
            setState("idle");
          }}
        >
          {f.sendAnother}
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-[--radius-card] border border-sand-dark/60 bg-white p-7 shadow-soft md:p-9">
      <p className="mb-7 rounded-xl border border-sand-dark bg-cream px-4 py-3 text-sm text-ink-soft">
        {f.demoNotice}
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.name} error={errors.name} required>
          <input
            value={values.name}
            onChange={set("name")}
            placeholder={f.namePlaceholder}
            autoComplete="name"
            className={inputCls(!!errors.name)}
          />
        </Field>

        <Field label={f.phone} error={errors.phone} required>
          <input
            value={values.phone}
            onChange={set("phone")}
            placeholder={f.phonePlaceholder}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={inputCls(!!errors.phone)}
          />
        </Field>

        <Field label={f.email} error={errors.email}>
          <input
            value={values.email}
            onChange={set("email")}
            placeholder={f.emailPlaceholder}
            type="email"
            autoComplete="email"
            inputMode="email"
            className={inputCls(!!errors.email)}
          />
        </Field>

        <Field label={f.location}>
          <input
            value={values.location}
            onChange={set("location")}
            placeholder={f.locationPlaceholder}
            autoComplete="address-level2"
            className={inputCls(false)}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label={f.course}>
            <select value={values.course} onChange={set("course")} className={inputCls(false)}>
              {f.courseOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label={f.message}>
            <textarea
              value={values.message}
              onChange={set("message")}
              placeholder={f.messagePlaceholder}
              rows={4}
              className={`${inputCls(false)} resize-y`}
            />
          </Field>
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" disabled={state === "submitting"}>
        {state === "submitting" ? f.submitting : f.submit}
      </Button>
    </form>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-xl border bg-paper px-4 py-3 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-navy-500 ${
    hasError ? "border-red-400" : "border-sand-dark"
  }`;
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink-soft">
        {label}
        {required && <span className="ml-1 text-navy-500">*</span>}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 block text-sm text-red-600"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}
