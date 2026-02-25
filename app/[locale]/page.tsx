import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import NewsSlider from "@/components/NewsSlider";
import StatsSection from "@/components/StatsSection";
import LeitmotiveSection from "@/components/LeitmotiveSection";
import ProjektePreview from "@/components/ProjektePreview";
import MembershipSection from "@/components/MembershipSection";
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
  bild: string;
  kategorie: string;
}

interface Stat {
  zahl: string;
  label: string;
}

interface Vorteil {
  titel: string;
  beschreibung: string;
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
  const sliderData = loadContent<{ slides: { titel: string; text: string; tag: string; datum?: string; bild: string; link: string; linkText: string }[] }>("slider", locale as "de" | "en");
  const statsData = loadContent<{ stats: Stat[] }>("stats", locale as "de" | "en");
  const projekteData = loadContent<{ projekte: Projekt[] }>("projekte", locale as "de" | "en");
  const mitgliedschaftData = loadContent<{ vorteile: Vorteil[] }>("mitgliedschaft", locale as "de" | "en");

  return (
    <>
      <NewsSlider slides={sliderData.slides} locale={locale} />

      <StatsSection stats={statsData.stats} />

      <LeitmotiveSection
        titel={t("leitmotiveTitel")}
        untertitel={t("leitmotiveText")}
        leitmotive={leitmotiveData.leitmotive}
      />

      <ProjektePreview
        titel={t("projekteTitel")}
        untertitel={t("projekteText")}
        projekte={projekteData.projekte}
        ctaText={t("alleProjekte")}
        ctaHref={`/${locale}/projekte`}
        locale={locale}
      />

      <MembershipSection
        titel={t("mitgliederTitel")}
        text={t("mitgliederText")}
        vorteile={mitgliedschaftData.vorteile}
        ctaText={t("mitgliedWerden")}
        ctaHref={`/${locale}/kontakt`}
      />
    </>
  );
}
