import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Globe, Instagram, Linkedin } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kontakt" });
  return { title: t("title"), description: t("description") };
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("kontakt");

  return (
    <>
      <Hero titel={t("heroTitel")} untertitel={t("heroUntertitel")} />

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {/* Kontaktformular */}
          <div>
            <h2 className="mb-6 text-2xl font-bold">{t("formTitel")}</h2>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                    {t("labelName")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                    placeholder={t("placeholderName")}
                  />
                </div>
                <div>
                  <label htmlFor="organisation" className="mb-1.5 block text-sm font-medium">
                    {t("labelOrg")}
                  </label>
                  <input
                    type="text"
                    id="organisation"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                    placeholder={t("placeholderOrg")}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  {t("labelEmail")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  placeholder={t("placeholderEmail")}
                />
              </div>
              <div>
                <label htmlFor="betreff" className="mb-1.5 block text-sm font-medium">
                  {t("labelBetreff")}
                </label>
                <select
                  id="betreff"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                >
                  <option value="">{t("betreffBitte")}</option>
                  <option value="mitgliedschaft">{t("betreffMitgliedschaft")}</option>
                  <option value="kooperation">{t("betreffKooperation")}</option>
                  <option value="presse">{t("betreffPresse")}</option>
                  <option value="sonstiges">{t("betreffSonstiges")}</option>
                </select>
              </div>
              <div>
                <label htmlFor="nachricht" className="mb-1.5 block text-sm font-medium">
                  {t("labelNachricht")}
                </label>
                <textarea
                  id="nachricht"
                  rows={5}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  placeholder={t("placeholderNachricht")}
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("senden")}
              </button>
            </form>
          </div>

          {/* Kontakt-Info */}
          <div className="space-y-6">
            <h2 className="mb-6 text-2xl font-bold">{t("kontaktdaten")}</h2>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-5 w-5 text-primary" />
                  {t("adresse")}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <span className="text-primary">Aqua</span><span className="text-brand-ventus">Ventus</span> Förderverein e.V.<br />
                Lung Wai 28<br />
                27498 Helgoland<br />
                Deutschland
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Mail className="h-5 w-5 text-primary" />
                  {t("labelEmail")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:info@aquaventus.org" className="text-sm text-primary hover:underline">
                  info@aquaventus.org
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Globe className="h-5 w-5 text-primary" />
                  {t("web")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="https://aquaventus.org" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                  aquaventus.org
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  {t("social")}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/aquaventus-f%C3%B6rderverein"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/aquaventus_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Instagram className="h-5 w-5" />
                  Instagram
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
