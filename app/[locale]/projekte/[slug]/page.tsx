import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { loadContent } from "@/lib/content";
import { routing } from "@/i18n/routing";

interface Fakt {
  label: string;
  wert: string;
}

interface Projekt {
  slug: string;
  name: string;
  kurz: string;
  beschreibung: string;
  details?: string;
  status: string;
  kategorie: string;
  fakten?: Fakt[];
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const data = loadContent<{ projekte: Projekt[] }>("projekte", locale);
    for (const p of data.projekte) {
      params.push({ locale, slug: p.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = loadContent<{ projekte: Projekt[] }>("projekte", locale as "de" | "en");
  const projekt = data.projekte.find((p) => p.slug === slug);
  if (!projekt) return {};
  return { title: projekt.name, description: projekt.kurz };
}

export default async function ProjektDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projekte");
  const data = loadContent<{ projekte: Projekt[] }>("projekte", locale as "de" | "en");
  const projekt = data.projekte.find((p) => p.slug === slug);

  if (!projekt) notFound();

  return (
    <>
      <section className="bg-gradient-to-br from-primary via-primary/90 to-accent px-6 py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10">
            <Link href={`/${locale}/projekte`}>
              <ArrowLeft className="h-4 w-4" />
              {t("alleProjekte")}
            </Link>
          </Button>
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
              {projekt.kategorie}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
              {projekt.status}
            </span>
          </div>
          <h1 className="text-4xl font-bold md:text-5xl">{projekt.name}</h1>
          <p className="mt-4 text-lg text-primary-foreground/80">{projekt.kurz}</p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>{projekt.beschreibung}</p>
              {projekt.details && <p>{projekt.details}</p>}
            </div>

            {projekt.fakten && projekt.fakten.length > 0 && (
              <Card className="h-fit">
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("kerndaten")}
                  </h3>
                  <dl className="space-y-3">
                    {projekt.fakten.map((fakt) => (
                      <div key={fakt.label}>
                        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                          {fakt.label}
                        </dt>
                        <dd className="text-sm font-medium">{fakt.wert}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
