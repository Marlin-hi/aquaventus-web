import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ContentCard from "@/components/ContentCard";
import { loadContent } from "@/lib/content";

interface Pressemeldung {
  datum: string;
  titel: string;
  inhalt?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return { title: t("title"), description: t("description") };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const data = loadContent<{ pressemeldungen: Pressemeldung[] }>("pressemeldungen", locale as "de" | "en");
  const dateLocale = locale === "de" ? "de-DE" : "en-GB";

  return (
    <>
      <Hero titel={t("heroTitel")} untertitel={t("heroUntertitel")} />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-3">
            {data.pressemeldungen.map((item) => (
              <ContentCard
                key={item.datum + item.titel}
                datum={item.datum}
                datumFormatted={new Date(item.datum).toLocaleDateString(dateLocale, {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
                titel={item.titel}
                inhalt={item.inhalt}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
