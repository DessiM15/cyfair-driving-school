"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { business } from "@/content/site";
import type { Dictionary } from "@/content/en";
import { findAnswer } from "@/lib/chat";
import { localePath, type Lang } from "@/lib/i18n";
import { useCalmMotion } from "@/lib/useCalmMotion";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
  link?: { href: string; label: string };
};

/**
 * On-site assistant.
 *
 * Answers come from the site's own knowledge base via keyword/intent matching —
 * no network call, no API key, nothing invented. When confidence is too low it
 * says so and offers to take the visitor's details instead of guessing.
 *
 * Lead capture is demo-only: it validates and confirms, but deliberately does
 * not transmit anywhere. Wiring it up later means posting `lead` to an API route.
 */
export function ChatWidget({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const t = dict.chatbot;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [mode, setMode] = useState<"chat" | "lead" | "done">("chat");
  const [lead, setLead] = useState({ name: "", phone: "" });
  const [leadError, setLeadError] = useState<string | null>(null);
  const [unseen, setUnseen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const seq = useRef(0);
  const reduced = useCalmMotion();
  const titleId = useId();

  const nextId = () => `m${++seq.current}`;

  // Seed the greeting the first time the panel opens.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: nextId(), role: "bot", text: t.greeting }]);
    }
    if (open) {
      setUnseen(false);
      window.setTimeout(() => inputRef.current?.focus(), 350);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Reset the conversation when the visitor switches language.
  useEffect(() => {
    setMessages([]);
    setMode("chat");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [messages, typing, reduced]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { id: nextId(), role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    // A short pause reads as considered rather than canned.
    window.setTimeout(() => {
      const match = findAnswer(trimmed, lang);
      setTyping(false);

      if (!match) {
        setMessages((prev) => [...prev, { id: nextId(), role: "bot", text: t.fallback }]);
        return;
      }

      const { entry, city } = match;
      const link = city
        ? {
            href: localePath(`/service-areas/${city.slug}`, lang),
            label: city.name,
          }
        : entry.href && entry.linkLabel
          ? { href: localePath(entry.href, lang), label: entry.linkLabel[lang] }
          : undefined;

      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "bot", text: entry.answer[lang], link },
      ]);
    }, 520);
  };

  const submitLead = (e: FormEvent) => {
    e.preventDefault();
    if (!lead.name.trim()) return setLeadError(dict.contact.form.errorRequired);
    if (lead.phone.replace(/\D/g, "").length < 10) return setLeadError(dict.contact.form.errorPhone);
    setLeadError(null);
    setMode("done");
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={t.launcherLabel}
        aria-expanded={open}
        initial={reduced ? undefined : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-5 right-5 z-[80] flex size-14 items-center justify-center rounded-full bg-navy-700 text-white shadow-lift transition-colors hover:bg-navy-800 md:bottom-7 md:right-7"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={reduced ? undefined : { opacity: 0, rotate: -35, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, rotate: 35, scale: 0.7 }}
            transition={{ duration: 0.18 }}
          >
            {open ? <CloseIcon className="size-6" /> : <ChatIcon className="size-6" />}
          </motion.span>
        </AnimatePresence>
        {unseen && !open && (
          <span className="absolute right-0 top-0 size-3.5 rounded-full border-2 border-white bg-amber-signal" />
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
            initial={reduced ? undefined : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[79] flex max-h-[min(34rem,calc(100dvh-8rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.5rem] border border-sand-dark/70 bg-paper shadow-lift md:bottom-28 md:right-7"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-sand-dark/60 bg-white px-5 py-4">
              <div className="flex items-center gap-3">
                {/* The full wordmark is unreadable at avatar size, so the badge
                    uses the car glyph from the logo on its own. */}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-700">
                  <CarGlyph className="size-5 text-white" />
                </span>
                <div>
                  <p id={titleId} className="text-[0.9375rem] font-semibold text-ink">
                    {t.title}
                  </p>
                  <p className="text-xs text-muted">{t.subtitle}</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-sand px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-ink-soft">
                {t.demoBadge}
              </span>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={reduced ? undefined : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.9375rem] leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-navy-700 text-white"
                        : "rounded-bl-md border border-sand-dark/50 bg-white text-ink-soft"
                    }`}
                  >
                    <p>{m.text}</p>
                    {m.link && (
                      <Link
                        href={m.link.href}
                        onClick={() => setOpen(false)}
                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-navy-700 underline decoration-navy-300 underline-offset-4 transition-colors hover:text-navy-800"
                      >
                        {m.link.label} →
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-sand-dark/50 bg-white px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={reduced ? undefined : { opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                        className="size-1.5 rounded-full bg-navy-400"
                      />
                    ))}
                    <span className="sr-only">{t.typing}</span>
                  </div>
                </div>
              )}

              {/* Suggestions — shown until the visitor has asked something */}
              {mode === "chat" && messages.length <= 1 && !typing && (
                <div className="pt-1">
                  <p className="px-1 pb-2 text-xs font-medium uppercase tracking-wider text-muted">
                    {t.suggestionsLabel}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t.suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => ask(s)}
                        className="rounded-full border border-navy-200 bg-white px-3 py-1.5 text-[0.8125rem] text-navy-800 transition-colors hover:border-navy-400 hover:bg-navy-50"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Lead capture */}
              {mode === "lead" && (
                <form
                  onSubmit={submitLead}
                  className="rounded-2xl border border-navy-200 bg-white p-4"
                >
                  <p className="text-[0.9375rem] text-ink-soft">{t.leadPrompt}</p>
                  <div className="mt-3 space-y-2">
                    <input
                      value={lead.name}
                      onChange={(e) => setLead((v) => ({ ...v, name: e.target.value }))}
                      placeholder={t.leadName}
                      autoComplete="name"
                      className="w-full rounded-xl border border-sand-dark bg-paper px-3.5 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-navy-400"
                    />
                    <input
                      value={lead.phone}
                      onChange={(e) => setLead((v) => ({ ...v, phone: e.target.value }))}
                      placeholder={t.leadPhone}
                      type="tel"
                      autoComplete="tel"
                      className="w-full rounded-xl border border-sand-dark bg-paper px-3.5 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-navy-400"
                    />
                  </div>
                  {leadError && <p className="mt-2 text-sm text-red-600">{leadError}</p>}
                  <button
                    type="submit"
                    className="mt-3 w-full rounded-full bg-navy-700 px-4 py-2.5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-navy-800"
                  >
                    {t.leadSubmit}
                  </button>
                </form>
              )}

              {mode === "done" && (
                <div className="rounded-2xl border border-navy-200 bg-navy-50 p-4 text-[0.9375rem] text-ink-soft">
                  {t.leadSuccess}
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-sand-dark/60 bg-white px-4 py-3">
              {mode === "chat" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    ask(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t.placeholder}
                    aria-label={t.placeholder}
                    className="flex-1 rounded-full border border-sand-dark bg-paper px-4 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-navy-400"
                  />
                  <button
                    type="submit"
                    aria-label={t.send}
                    disabled={!input.trim()}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-700 text-white transition-colors hover:bg-navy-800 disabled:opacity-40"
                  >
                    <SendIcon className="size-4" />
                  </button>
                </form>
              )}

              <div className="mt-2.5 flex items-center justify-between gap-3 text-xs">
                {mode === "chat" ? (
                  <button
                    onClick={() => setMode("lead")}
                    className="font-medium text-navy-700 underline decoration-navy-300 underline-offset-4 transition-colors hover:text-navy-800"
                  >
                    {t.leadCta}
                  </button>
                ) : (
                  <span />
                )}
                <a href={business.phoneHref} className="text-muted transition-colors hover:text-navy-700">
                  {t.callInstead}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Simplified car mark, echoing the glyph in the logo. */
function CarGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3.6 13.2 5 9.1a2.2 2.2 0 0 1 2.1-1.5h9.8A2.2 2.2 0 0 1 19 9.1l1.4 4.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.6 13.2h16.8v3.6a1 1 0 0 1-1 1h-1.4a1 1 0 0 1-1-1v-.7H7v.7a1 1 0 0 1-1 1H4.6a1 1 0 0 1-1-1v-3.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M20 12a8 8 0 0 1-8 8H5.5L4 21.5V12a8 8 0 1 1 16 0Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M8.5 11h7M8.5 14.5h4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M4 12 20 4l-8 16-2.2-6.2L4 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
