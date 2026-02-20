import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { loadContent } from "@/lib/content";

interface Projekt {
  slug: string;
  name: string;
  kurz: string;
  status: string;
  kategorie: string;
  bild?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projekte" });
  return { title: t("title"), description: t("description") };
}

export default async function ProjektePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projekte");
  const projekteData = loadContent<{ projekte: Projekt[] }>("projekte", locale as "de" | "en");

  return (
    <>
      <Hero titel={t("heroTitel")} untertitel={t("heroUntertitel")} />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projekteData.projekte.map((projekt) => (
              <ProjectCard key={projekt.slug} locale={locale} {...projekt} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
