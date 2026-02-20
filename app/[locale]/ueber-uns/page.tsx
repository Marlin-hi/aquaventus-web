import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TeamCard from "@/components/TeamCard";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Phone, Building2, Handshake } from "lucide-react";
import { loadContent, loadSharedContent } from "@/lib/content";

interface VorstandMitglied {
  name: string;
  rolle: string;
  organisation: string;
  beschreibung: string;
}

interface GeschaeftsstellePerson {
  name: string;
  rolle: string;
  email: string | null;
  telefon: string | null;
}

interface Mitglied {
  name: string;
  url?: string;
}

interface Partner {
  name: string;
  url?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ueberUns" });
  return { title: t("title"), description: t("description") };
}

export default async function UeberUnsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ueberUns");
  const vorstandData = loadContent<{ vorstand: VorstandMitglied[] }>("vorstand", locale as "de" | "en");
  const geschaeftsstelleData = loadContent<{ geschaeftsstelle: GeschaeftsstellePerson[]; adresse: string }>("geschaeftsstelle", locale as "de" | "en");
  const mitgliederData = loadSharedContent<{ mitglieder: Mitglied[] }>("mitglieder");
  const partnerData = loadSharedContent<{ partner: Partner[] }>("partner");

  return (
    <>
      <Hero titel={t("heroTitel")} untertitel={t("heroUntertitel")} />

      {/* Mission */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">{t("missionTitel")}</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>{t("missionText1")}</p>
            <p>{t("missionText2")}</p>
          </div>
        </div>
      </section>

      {/* Vorstand */}
      <section className="bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-3xl font-bold">{t("vorstandTitel")}</h2>
          <p className="mb-12 text-muted-foreground">{t("vorstandText")}</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vorstandData.vorstand.map((person) => (
              <TeamCard key={person.name} {...person} />
            ))}
          </div>
        </div>
      </section>

      {/* Geschäftsstelle */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-3xl font-bold">{t("geschaeftsstelleTitel")}</h2>
          <p className="mb-12 text-muted-foreground">{geschaeftsstelleData.adresse}</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {geschaeftsstelleData.geschaeftsstelle.map((person) => (
              <Card key={person.name} className="h-full">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{person.name}</h3>
                  <p className="text-sm font-medium text-primary">{person.rolle}</p>
                  {person.email && (
                    <a href={`mailto:${person.email}`} className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary">
                      <Mail className="h-3 w-3" />
                      {person.email}
                    </a>
                  )}
                  {person.telefon && (
                    <a href={`tel:${person.telefon}`} className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary">
                      <Phone className="h-3 w-3" />
                      {person.telefon}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mitglieder */}
      <section className="bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-3xl font-bold">{t("mitgliederTitel")}</h2>
          <p className="mb-12 text-lg text-muted-foreground">{t("mitgliederText")}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mitgliederData.mitglieder.map((m) => (
              <div key={m.name} className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2.5 text-sm">
                <Building2 className="h-4 w-4 shrink-0 text-primary/60" />
                <span className="truncate">{m.name}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">{t("mitgliederHinweis")}</p>
        </div>
      </section>

      {/* Partner */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-3xl font-bold">{t("partnerTitel")}</h2>
          <p className="mb-12 text-muted-foreground">{t("partnerText")}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {partnerData.partner.map((p) => (
              <div key={p.name} className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
                <Handshake className="h-5 w-5 shrink-0 text-primary/60" />
                <span className="text-sm font-medium">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
