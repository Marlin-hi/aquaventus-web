import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Rocket,
  FolderOpen,
  UsersRound,
  Newspaper,
  MonitorSmartphone,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import mitgliedschaftData from "@/content/data/mitgliedschaft.json";

export const metadata: Metadata = {
  title: "Mitgliedschaft",
  description:
    "Warum Mitglied bei AquaVentus werden? Netzwerk, Projekte, Arbeitsgruppen und exklusive Formate.",
};

const iconMap: Record<string, React.ReactNode> = {
  Netzwerk: <Users className="h-6 w-6" />,
  "Do-Tank statt Think-Tank": <Rocket className="h-6 w-6" />,
  Projekte: <FolderOpen className="h-6 w-6" />,
  Arbeitsgruppen: <UsersRound className="h-6 w-6" />,
  AquaNews: <Newspaper className="h-6 w-6" />,
  "Member Portal": <MonitorSmartphone className="h-6 w-6" />,
  Mitgestalten: <Lightbulb className="h-6 w-6" />,
};

export default function MitgliedschaftPage() {
  return (
    <>
      <Hero
        titel="Mitgliedschaft"
        untertitel="AquaVentus ist ein Do-Tank: Wer Mitglied wird, gestaltet die Offshore-Wasserstoffwirtschaft aktiv mit — in Projekten, Arbeitsgruppen und auf exklusiven Formaten."
        ctaText="Mitglied werden"
        ctaHref="/kontakt"
      />

      {/* Vorteile */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">
            Warum Mitglied werden?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Sieben gute Gründe, Teil von AquaVentus zu werden.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mitgliedschaftData.vorteile.map((v) => (
              <Card key={v.titel}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {iconMap[v.titel] ?? <Sparkles className="h-6 w-6" />}
                  </div>
                  <h3 className="mb-2 font-semibold">{v.titel}</h3>
                  <p className="text-sm text-muted-foreground">
                    {v.beschreibung}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Arbeitsgruppen */}
      <section className="bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Arbeitsgruppen
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {mitgliedschaftData.arbeitsgruppen.map((ag) => (
              <Card key={ag.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{ag.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{ag.thema}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AquaSummit */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <Sparkles className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h2 className="mb-4 text-3xl font-bold">AquaSummit</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {mitgliedschaftData.aquaSummit.beschreibung}
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="gap-2">
              <Link href="/kontakt">
                Jetzt Mitglied werden
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
