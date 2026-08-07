import Image from "next/image";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, PhoneIcon } from "@/components/ui/Button";
import { images, imageAlt, type ImageSlot } from "@/content/images";
import { business } from "@/content/site";
import type { Dictionary } from "@/content/en";
import { localePath, type Lang } from "@/lib/i18n";

/** The closing call-to-action used at the end of every page. */
export function CtaBand({
  lang,
  dict,
  title,
  body,
  image = "texas-highway",
  primaryHref = "/contact-us",
  primaryLabel,
}: {
  lang: Lang;
  dict: Dictionary;
  title: string;
  body: string;
  image?: ImageSlot;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 md:py-28">
      <Image
        src={images[image].src}
        alt={imageAlt(image, lang)}
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/60" />

      <Container className="relative">
        <Reveal className="max-w-2xl">
          <h2 className="display-2 text-white">{title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">{body}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={localePath(primaryHref, lang)} variant="light" size="lg">
              {primaryLabel ?? dict.common.requestClassTime}
            </ButtonLink>
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/55 px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:border-white hover:bg-white/12"
            >
              <PhoneIcon className="size-4" />
              {business.phone}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
