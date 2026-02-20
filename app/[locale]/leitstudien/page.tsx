import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import StudyCard from "@/components/StudyCard";
import { loadContent } from "@/lib/content";

interface Studie {
  titel: string;
  datum: string;
  datumLabel: string;
  quelle: string;
  beschreibung: string;
  pdf?: string;
  pdfEn?: string;
  pdfDe?: string;
  bild?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "leitstudien" });
  return { title: t("title"), description: t("description") };
}

export default async function LeitstudienPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("leitstudien");
  const data = loadContent<{ leitstudien: Studie[] }>("leitstudien", locale as "de" | "en");

  return (
    <>
      <Hero titel={t("heroTitel")} untertitel={t("heroUntertitel")} />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {data.leitstudien.map((studie) => (
              <StudyCard key={studie.datum + studie.quelle} {...studie} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
