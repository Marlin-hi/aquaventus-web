import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ActivityTimeline from "@/components/ActivityTimeline";

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
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">{t("dashboard")}</h1>
        <p className="mb-8 text-muted-foreground">{t("description")}</p>
        <ActivityTimeline />
      </div>
    </section>
  );
}
