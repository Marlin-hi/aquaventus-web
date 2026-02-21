import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import MemberSubNav from "@/components/MemberSubNav";
import MemberDirectory from "@/components/MemberDirectory";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "member" });
  return { title: t("directory") };
}

export default async function VerzeichnisPage({
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
        <h1 className="mb-2 text-3xl font-bold">{t("directory")}</h1>
        <p className="mb-6 text-muted-foreground">{t("directoryDescription")}</p>

        <MemberSubNav />

        <div className="mt-8">
          <MemberDirectory />
        </div>
      </div>
    </section>
  );
}
