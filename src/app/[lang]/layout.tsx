import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollManager } from "@/components/ScrollManager";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PageTransition } from "@/components/PageTransition";
import { StickyCallBar } from "@/components/StickyCallBar";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { getDictionary, isLang, LANGS, HTML_LANG, type Lang } from "@/lib/i18n";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/seo";
import { SITE_URL, business } from "@/content/site";

/**
 * Fraunces carries the headlines — a warm serif reads as an established
 * institution rather than a startup, which is the right note for parents.
 * Inter handles everything functional.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#25459a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: business.name,
    template: `%s | ${business.name}`,
  },
  applicationName: business.name,
  authors: [{ name: business.agency.name, url: business.agency.url }],
  formatDetection: { telephone: true },
};

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const dict = getDictionary(lang);

  return (
    <html lang={HTML_LANG[lang]} className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        <ScrollManager />
        <ScrollProgress />
        <Header lang={lang} dict={dict} />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer lang={lang} dict={dict} />
        <StickyCallBar lang={lang} dict={dict} />
        <ChatWidget lang={lang} dict={dict} />
        <JsonLd data={[organizationSchema(lang), websiteSchema(lang)]} />
      </body>
    </html>
  );
}
