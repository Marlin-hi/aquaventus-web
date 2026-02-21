import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "login" });
  return { title: t("title") };
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-6 py-20">
      <LoginForm />
    </section>
  );
}
