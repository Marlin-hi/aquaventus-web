import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import pressemeldungenData from "@/content/data/pressemeldungen.json";

export const metadata: Metadata = {
  title: "News & Presse",
  description:
    "Aktuelle Pressemeldungen und Neuigkeiten von AquaVentus.",
};

export default function NewsPage() {
  return (
    <>
      <Hero
        titel="News & Presse"
        untertitel="Aktuelle Meldungen, Stellungnahmen und Neuigkeiten aus der Offshore-Wasserstoffwirtschaft."
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-3">
            {pressemeldungenData.pressemeldungen.map((item) => (
              <Card key={item.datum + item.titel}>
                <CardContent className="flex items-start gap-4 py-4">
                  <span className="shrink-0 text-sm text-muted-foreground min-w-[5.5rem]">
                    {new Date(item.datum).toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
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
