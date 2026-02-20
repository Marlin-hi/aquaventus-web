import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ScrollText } from "lucide-react";
import stellungnahmenData from "@/content/data/stellungnahmen.json";
import policyPapersData from "@/content/data/policy-papers.json";

export const metadata: Metadata = {
  title: "Politik",
  description:
    "Stellungnahmen und Policy Papers von AquaVentus zu regulatorischen und energiepolitischen Themen.",
};

function formatDatum(datum: string) {
  if (datum.length === 7) {
    // "2025-08" format
    return new Date(datum + "-01").toLocaleDateString("de-DE", {
      month: "long",
      year: "numeric",
    });
  }
  return new Date(datum).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function PolitikPage() {
  return (
    <>
      <Hero
        titel="Politik"
        untertitel="AquaVentus bringt die Perspektive der Offshore-Wasserstoffwirtschaft in politische Prozesse ein — mit Stellungnahmen, Policy Papers und Dialogformaten."
      />

      {/* Stellungnahmen */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <ScrollText className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-bold">Stellungnahmen</h2>
          </div>
          <div className="space-y-3">
            {stellungnahmenData.stellungnahmen.map((item) => (
              <Card key={item.datum + item.titel}>
                <CardContent className="flex items-start gap-4 py-4">
                  <span className="shrink-0 text-sm text-muted-foreground min-w-[5.5rem]">
                    {formatDatum(item.datum)}
                  </span>
                  <span className="font-medium">{item.titel}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Papers */}
      <section className="bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <FileText className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-bold">Policy Papers</h2>
          </div>
          <div className="space-y-3">
            {policyPapersData.policyPapers.map((item) => (
              <Card key={item.datum + item.titel}>
                <CardContent className="flex items-start gap-4 py-4">
                  <span className="shrink-0 text-sm text-muted-foreground min-w-[5.5rem]">
                    {formatDatum(item.datum)}
                  </span>
                  <span className="font-medium">{item.titel}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
