import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Zap, Shield, TrendingUp, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import projekteData from "@/content/data/projekte.json";
import leitmotiveData from "@/content/data/leitmotive.json";

const iconMap: Record<string, React.ReactNode> = {
  Leaf: <Leaf className="h-8 w-8" />,
  Zap: <Zap className="h-8 w-8" />,
  Shield: <Shield className="h-8 w-8" />,
  TrendingUp: <TrendingUp className="h-8 w-8" />,
  BarChart3: <BarChart3 className="h-8 w-8" />,
};

export default function HomePage() {
  return (
    <>
      <Hero
        titel="Grüner Wasserstoff von der Nordsee"
        untertitel="AquaVentus vereint über 100 Akteure aus Industrie, Forschung und Politik. Gemeinsam bauen wir die Offshore-Wasserstoffproduktion auf — für 10 GW Erzeugungskapazität bis 2035."
        ctaText="Unsere Projekte"
        ctaHref="/projekte"
      />

      {/* Leitmotive */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">Unsere Leitmotive</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Fünf Ziele treiben uns an — von der Klimapolitik bis zur wirtschaftlichen Wertschöpfung.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {leitmotiveData.leitmotive.map((motiv) => (
              <Card key={motiv.titel} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {iconMap[motiv.icon]}
                  </div>
                  <h3 className="mb-2 font-semibold">{motiv.titel}</h3>
                  <p className="text-sm text-muted-foreground">{motiv.beschreibung}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projekte Preview */}
      <section className="bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Projekte</h2>
              <p className="mt-2 text-muted-foreground">
                Von der Pipeline bis zur Fachkräfteausbildung — unsere Vorhaben im Überblick.
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden gap-2 md:flex">
              <Link href="/projekte">
                Alle Projekte
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projekteData.projekte.slice(0, 3).map((projekt) => (
              <ProjectCard key={projekt.slug} {...projekt} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/projekte">
                Alle Projekte
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mitglieder CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Über 100 Mitglieder</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Von der Energiewirtschaft über Forschungsinstitute bis zu politischen
            Akteuren — AquaVentus verbindet die gesamte Wertschöpfungskette.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/kontakt">
                Mitglied werden
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/ueber-uns">Mehr erfahren</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
