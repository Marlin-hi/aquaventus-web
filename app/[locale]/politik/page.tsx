import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ScrollText } from "lucide-react";
import { loadContent } from "@/lib/content";

interface Stellungnahme {
  datum: string;
  titel: string;
}

interface PolicyPaper {
  datum: string;
  titel: string;
}

function formatDatum(datum: string, locale: string) {
  const dateLocale = locale === "de" ? "de-DE" : "en-GB";
  if (datum.length === 7) {
    return new Date(datum + "-01").toLocaleDateString(dateLocale, {
      month: "long",
      year: "numeric",
    });
  }
  return new Date(datum).toLocaleDateString(dateLocale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "politik" });
  return { title: t("title"), description: t("description") };
}

export default async function PolitikPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("politik");
  const stellungnahmenData = loadContent<{ stellungnahmen: Stellungnahme[] }>("stellungnahmen", locale as "de" | "en");
  const policyPapersData = loadContent<{ policyPapers: PolicyPaper[] }>("policy-papers", locale as "de" | "en");

  return (
    <>
      <Hero titel={t("heroTitel")} untertitel={t("heroUntertitel")} />

      {/* Stellungnahmen */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <ScrollText className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-bold">{t("stellungnahmen")}</h2>
          </div>
          <div className="space-y-3">
            {stellungnahmenData.stellungnahmen.map((item) => (
              <Card key={item.datum + item.titel}>
                <CardContent className="flex items-start gap-4 py-4">
                  <span className="shrink-0 text-sm text-muted-foreground min-w-[5.5rem]">
                    {formatDatum(item.datum, locale)}
                  </span>
                  <span className="font-medium">{item.titel}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Papers */}
      <section className="bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <FileText className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-bold">{t("policyPapers")}</h2>
          </div>
          <div className="space-y-3">
            {policyPapersData.policyPapers.map((item) => (
              <Card key={item.datum + item.titel}>
                <CardContent className="flex items-start gap-4 py-4">
                  <span className="shrink-0 text-sm text-muted-foreground min-w-[5.5rem]">
                    {formatDatum(item.datum, locale)}
                  </span>
                  <span className="font-medium">{item.titel}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
