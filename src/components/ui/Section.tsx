import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container-page ${className}`}>{children}</div>;
}

type Tone = "paper" | "cream" | "navy" | "sand";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  cream: "bg-cream text-ink",
  sand: "bg-sand text-ink",
  navy: "bg-navy-900 text-white",
};

export function Section({
  children,
  tone = "paper",
  className = "",
  id,
  spacing = "normal",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  spacing?: "tight" | "normal" | "loose";
}) {
  const pad =
    spacing === "tight" ? "py-14 md:py-20" : spacing === "loose" ? "py-24 md:py-36" : "py-20 md:py-28";
  return (
    <section id={id} className={`${tones[tone]} ${pad} ${className}`}>
      {children}
    </section>
  );
}

/**
 * Standard section heading block. Keeping this in one place is what stops the
 * eyebrow/title/subtitle rhythm drifting across ~90 pages.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "items-start";
  const titleColor = tone === "light" ? "text-white" : "text-ink";
  const subColor = tone === "light" ? "text-white/70" : "text-muted";
  const eyebrowColor = tone === "light" ? "text-sky-300" : "text-navy-700";

  return (
    <Reveal className={`flex flex-col ${alignCls} ${align === "center" ? "max-w-2xl" : "max-w-3xl"} ${className}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${eyebrowColor}`}>{eyebrow}</p>}
      <h2 className={`display-2 ${titleColor}`}>{title}</h2>
      {subtitle && <p className={`prose-body mt-5 ${subColor}`}>{subtitle}</p>}
    </Reveal>
  );
}
