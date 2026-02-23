import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import NewsSlider from "@/components/NewsSlider";
import ProjectCard from "@/components/ProjectCard";
import LeitmotiveSection from "@/components/LeitmotiveSection";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loadContent } from "@/lib/content";

interface Leitmotiv {
  titel: string;
  beschreibung: string;
  icon: string;
  bild: string;
}

interface Projekt {
  slug: string;
  name: string;
  kurz: string;
  status: string;
  kategorie: string;
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const leitmotiveData = loadContent<{ leitmotive: Leitmotiv[] }>("leitmotive", locale as "de" | "en");
  const projekteData = loadContent<{ projekte: Projekt[] }>("projekte", locale as "de" | "en");
  const sliderData = loadContent<{ slides: { titel: string; text: string; tag: string; datum?: string; bild: string; link: string; linkText: string }[] }>("slider", locale as "de" | "en");

  return (
    <>
      <NewsSlider slides={sliderData.slides} locale={locale} />

      <Hero
        titel={t("heroTitel")}
        untertitel={t("heroUntertitel")}
        ctaText={t("heroCta")}
        ctaHref={`/${locale}/projekte`}
      />

      {/* Leitmotive */}
      <LeitmotiveSection
        titel={t("leitmotiveTitel")}
        untertitel={t("leitmotiveText")}
        leitmotive={leitmotiveData.leitmotive}
      />

      {/* Projekte Preview */}
      <section className="bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">{t("projekteTitel")}</h2>
              <p className="mt-2 text-muted-foreground">{t("projekteText")}</p>
            </div>
            <Button asChild variant="ghost" className="hidden gap-2 md:flex">
              <Link href={`/${locale}/projekte`}>
                {t("alleProjekte")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projekteData.projekte.slice(0, 3).map((projekt) => (
              <ProjectCard key={projekt.slug} locale={locale} {...projekt} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" className="gap-2">
              <Link href={`/${locale}/projekte`}>
                {t("alleProjekte")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mitglieder CTA */}
      <section className="px-6 py-20 bg-white/60 dark:bg-white/5 backdrop-blur-sm border-y border-border/20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">{t("mitgliederTitel")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("mitgliederText")}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href={`/${locale}/kontakt`}>
                {t("mitgliedWerden")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/${locale}/ueber-uns`}>{t("mehrErfahren")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
