import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Map, ExternalLink } from "lucide-react";
import ActivityTimeline from "@/components/ActivityTimeline";
import LatestNewsSidebar from "@/components/LatestNewsSidebar";
import MemberSubNav from "@/components/MemberSubNav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "member" });
  return { title: t("title") };
}

export default async function MitgliederPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("member");

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">{t("dashboard")}</h1>
        <p className="mb-6 text-muted-foreground">{t("description")}</p>

        <MemberSubNav />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr]">
          <div>
            <ActivityTimeline />
          </div>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Map className="h-4 w-4" />
                  {t("hydroAtlasTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">{t("hydroAtlasText")}</p>
                <a
                  href="https://hydro-atlas.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  {t("hydroAtlasLink")} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </CardContent>
            </Card>

            <LatestNewsSidebar
              locale={locale}
              title={t("latestNews")}
              allNewsLabel={t("allNews")}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
