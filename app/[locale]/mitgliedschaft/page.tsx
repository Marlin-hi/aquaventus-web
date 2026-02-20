import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Rocket,
  FolderOpen,
  UsersRound,
  Newspaper,
  MonitorSmartphone,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { loadContent } from "@/lib/content";

interface Vorteil {
  titel: string;
  beschreibung: string;
}

interface Arbeitsgruppe {
  name: string;
  thema: string;
}

interface MitgliedschaftData {
  vorteile: Vorteil[];
  arbeitsgruppen: Arbeitsgruppe[];
  aquaSummit: { beschreibung: string };
}

const iconMap: Record<string, React.ReactNode> = {
  Netzwerk: <Users className="h-6 w-6" />,
  Network: <Users className="h-6 w-6" />,
  "Do-Tank statt Think-Tank": <Rocket className="h-6 w-6" />,
  "Do-Tank not Think-Tank": <Rocket className="h-6 w-6" />,
  Projekte: <FolderOpen className="h-6 w-6" />,
  Projects: <FolderOpen className="h-6 w-6" />,
  Arbeitsgruppen: <UsersRound className="h-6 w-6" />,
  "Working Groups": <UsersRound className="h-6 w-6" />,
  AquaNews: <Newspaper className="h-6 w-6" />,
  "Member Portal": <MonitorSmartphone className="h-6 w-6" />,
  Mitgestalten: <Lightbulb className="h-6 w-6" />,
  "Co-Create": <Lightbulb className="h-6 w-6" />,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "mitgliedschaft" });
  return { title: t("title"), description: t("description") };
}

export default async function MitgliedschaftPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("mitgliedschaft");
  const data = loadContent<MitgliedschaftData>("mitgliedschaft", locale as "de" | "en");

  return (
    <>
      <Hero
        titel={t("heroTitel")}
        untertitel={t("heroUntertitel")}
        ctaText={t("heroCta")}
        ctaHref={`/${locale}/kontakt`}
      />

      {/* Vorteile */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">{t("warumTitel")}</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            {t("warumText")}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.vorteile.map((v) => (
              <Card key={v.titel}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {iconMap[v.titel] ?? <Sparkles className="h-6 w-6" />}
                  </div>
                  <h3 className="mb-2 font-semibold">{v.titel}</h3>
                  <p className="text-sm text-muted-foreground">{v.beschreibung}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Arbeitsgruppen */}
      <section className="bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold">{t("arbeitsgruppenTitel")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.arbeitsgruppen.map((ag) => (
              <Card key={ag.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{ag.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{ag.thema}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AquaSummit */}
      <section className="px-6 py-20">
        <Link href={`/${locale}/aquasummit`} className="mx-auto block max-w-4xl text-center group">
          <Sparkles className="mx-auto mb-4 h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
          <h2 className="mb-4 text-3xl font-bold group-hover:text-primary transition-colors duration-300">AquaSummit</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {data.aquaSummit.beschreibung}
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="gap-2">
              <span>
                {t("aquaSummitMehr")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </Link>
      </section>
    </>
  );
}
