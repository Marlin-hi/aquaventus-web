import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { loadContent } from "@/lib/content";

interface Bild {
  src: string;
  alt: string;
}

interface Abschnitt {
  titel: string;
  text: string;
}

interface AquaSummitData {
  intro: string;
  abschnitte: Abschnitt[];
  bilder: Bild[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aquasummit" });
  return { title: t("title"), description: t("description") };
}

export default async function AquaSummitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aquasummit");
  const data = loadContent<AquaSummitData>("aquasummit", locale as "de" | "en");

  // Hero-Bild (erstes Bild = Venue-Übersicht)
  const heroBild = data.bilder[0];
  // Highlight-Bilder für die obere Galerie (Bilder 2-6)
  const highlights = data.bilder.slice(1, 7);
  // Restliche Bilder für die große Galerie
  const galerie = data.bilder.slice(7);

  return (
    <>
      <Hero
        titel={t("heroTitel")}
        untertitel={t("heroUntertitel")}
      />

      {/* Hero-Bild */}
      <section className="px-6 pb-8 pt-12">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl">
          <Image
            src={heroBild.src}
            alt={heroBild.alt}
            width={1400}
            height={600}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </section>

      {/* Intro + Abschnitte */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <p className="mb-12 text-center text-lg text-muted-foreground">
            {data.intro}
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {data.abschnitte.map((abschnitt) => (
              <div key={abschnitt.titel}>
                <h2 className="mb-3 text-xl font-bold">{abschnitt.titel}</h2>
                <p className="text-muted-foreground">{abschnitt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight-Bilder */}
      <section className="px-6 py-8">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((bild) => (
            <div key={bild.src} className="overflow-hidden rounded-xl">
              <Image
                src={bild.src}
                alt={bild.alt}
                width={600}
                height={400}
                className="aspect-[3/2] h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Galerie */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold">{t("galerieTitel")}</h2>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galerie.map((bild) => (
              <div key={bild.src} className="mb-4 break-inside-avoid overflow-hidden rounded-xl">
                <Image
                  src={bild.src}
                  alt={bild.alt}
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Button asChild size="lg" className="gap-2">
            <Link href={`/${locale}/kontakt`}>
              {t("mitgliedCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
