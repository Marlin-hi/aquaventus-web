import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import InvitationManager from "@/components/InvitationManager";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return { title: t("title") };
}

export default async function AdminInvitationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">{t("title")}</h1>
        <h2 className="mb-8 text-lg text-muted-foreground">{t("invitations")}</h2>
        <InvitationManager />
      </div>
    </section>
  );
}
