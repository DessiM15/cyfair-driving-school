"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/Logo";
import { CallButton } from "@/components/ui/Button";
import { business } from "@/content/site";
import type { Dictionary } from "@/content/en";
import { localePath, stripLocale, type Lang } from "@/lib/i18n";
import { useCalmMotion } from "@/lib/useCalmMotion";

export function Header({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const pathname = usePathname();
  const route = stripLocale(pathname);
  const isHome = route === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const reduced = useCalmMotion();

  // Solid header as soon as the hero starts leaving the viewport.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change.
  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Dismiss the "More" dropdown on outside click or Escape.
  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  const overlay = isHome && !scrolled && !menuOpen;

  const primaryLinks = [
    { href: "/teen-driving-classes", label: dict.nav.teens },
    { href: "/adult-drivers-education", label: dict.nav.adults },
    { href: "/road-tests", label: dict.nav.roadTests },
    { href: "/defensive-driving", label: dict.nav.defensive },
    // Payments is promoted out of the "More" menu — people looking to pay
    // shouldn't have to hunt through a dropdown for it.
    { href: "/online-payments", label: dict.nav.paymentsShort },
  ];

  const moreLinks = [
    { href: "/approved-road-test-locations", label: dict.nav.locations },
    { href: "/instructors", label: dict.nav.instructors },
    { href: "/find-your-course", label: dict.quiz.hero.title },
    { href: "/road-test-checklist", label: dict.checklist.hero.title },
    { href: "/about-us", label: dict.nav.about },
    { href: "/contact-us", label: dict.nav.contact },
  ];

  /**
   * Clicking the logo always returns to the top of the homepage hero — even when
   * the visitor is already on the homepage, where the router would otherwise do
   * nothing and leave them mid-page.
   */
  const onLogoClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    }
  };

  const otherLang: Lang = lang === "en" ? "es" : "en";
  const otherHref = localePath(route, otherLang);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-navy-800 focus:shadow-lift"
      >
        {dict.nav.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          overlay
            ? "bg-transparent py-5"
            : "bg-paper/85 backdrop-blur-xl border-b border-sand-dark/50 py-3 shadow-[0_1px_20px_-12px_rgb(20_32_58/0.30)]"
        }`}
      >
        <div className="container-page flex items-center justify-between gap-4">
          <Link
            href={localePath("/", lang)}
            onClick={onLogoClick}
            aria-label={business.name}
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            {/* The wordmark is ~5.6:1, so h-8 renders ~180px wide — enough to
                push the language toggle and menu trigger past a 390px viewport.
                Step it down on the smallest screens. */}
            <Logo
              className="h-6 w-auto sm:h-8 md:h-9"
              primary={overlay ? "#ffffff" : "#25459a"}
              secondary={overlay ? "rgba(255,255,255,0.82)" : "#4585c5"}
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {primaryLinks.map((link) => {
              const active = route === link.href;
              return (
                <Link
                  key={link.href}
                  href={localePath(link.href, lang)}
                  className={`rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors ${
                    overlay
                      ? "text-white/90 hover:bg-white/12 hover:text-white"
                      : active
                        ? "bg-navy-50 text-navy-800"
                        : "text-ink-soft hover:bg-navy-50 hover:text-navy-800"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors ${
                  overlay
                    ? "text-white/90 hover:bg-white/12 hover:text-white"
                    : "text-ink-soft hover:bg-navy-50 hover:text-navy-800"
                }`}
              >
                {dict.nav.more}
                <ChevronDown className={`size-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={reduced ? undefined : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-sand-dark/60 bg-white p-2 shadow-lift"
                  >
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={localePath(link.href, lang)}
                        className="block rounded-xl px-3.5 py-2.5 text-[0.9375rem] text-ink-soft transition-colors hover:bg-navy-50 hover:text-navy-800"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle href={otherHref} label={dict.otherLangName} overlay={overlay} lang={otherLang} />

            {/* Wrapped rather than given `hidden` directly: CallButton's base
                class sets `inline-flex`, which competes with `hidden` in the
                same Tailwind layer and wins — leaving the button visible on
                mobile and pushing the menu trigger off-screen. */}
            <span className="hidden sm:block">
              <CallButton
                phone={business.phone}
                phoneHref={business.phoneHref}
                variant={overlay ? "light" : "primary"}
                size="sm"
              />
            </span>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label={dict.nav.openMenu}
              className={`rounded-full p-2.5 transition-colors lg:hidden ${
                overlay ? "text-white hover:bg-white/12" : "text-navy-800 hover:bg-navy-50"
              }`}
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        lang={lang}
        dict={dict}
        links={[...primaryLinks, ...moreLinks]}
        otherHref={otherHref}
        otherLabel={dict.otherLangName}
        otherLang={otherLang}
      />
    </>
  );
}

function LanguageToggle({
  href,
  label,
  overlay,
  lang,
}: {
  href: string;
  label: string;
  overlay: boolean;
  lang: Lang;
}) {
  return (
    <Link
      href={href}
      hrefLang={lang}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-2 text-[0.8125rem] font-medium transition-all ${
        overlay
          ? "border-white/40 text-white hover:border-white hover:bg-white/12"
          : "border-sand-dark text-ink-soft hover:border-navy-300 hover:bg-navy-50 hover:text-navy-800"
      }`}
    >
      <GlobeIcon className="size-3.5" />
      {label}
    </Link>
  );
}

function MobileMenu({
  open,
  onClose,
  lang,
  dict,
  links,
  otherHref,
  otherLabel,
  otherLang,
}: {
  open: boolean;
  onClose: () => void;
  lang: Lang;
  dict: Dictionary;
  links: { href: string; label: string }[];
  otherHref: string;
  otherLabel: string;
  otherLang: Lang;
}) {
  const reduced = useCalmMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-navy-950/40 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={reduced ? undefined : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduced ? undefined : { x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-y-0 right-0 z-[70] flex w-[min(22rem,88vw)] flex-col bg-paper shadow-lift lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-sand-dark/60 px-5 py-4">
              <Logo className="h-8 w-auto" />
              <button
                onClick={onClose}
                aria-label={dict.nav.close}
                className="rounded-full p-2 text-navy-800 transition-colors hover:bg-navy-50"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={localePath(link.href, lang)}
                  onClick={onClose}
                  className="block rounded-xl px-4 py-3 text-[1.0625rem] text-ink-soft transition-colors hover:bg-navy-50 hover:text-navy-800"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="space-y-3 border-t border-sand-dark/60 p-5">
              <Link
                href={otherHref}
                hrefLang={otherLang}
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-full border border-sand-dark px-5 py-3 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:border-navy-300 hover:bg-navy-50"
              >
                <GlobeIcon className="size-4" />
                {otherLabel}
              </Link>
              <CallButton
                phone={business.phone}
                phoneHref={business.phoneHref}
                variant="primary"
                size="md"
                className="w-full"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---- icons ---- */

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
