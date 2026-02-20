import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TeamCard from "@/components/TeamCard";
import vorstandData from "@/content/data/vorstand.json";

export const metadata: Metadata = {
  title: "Über uns",
  description: "AquaVentus Förderverein e.V. — Vorstand, Mitglieder und unsere Mission.",
};

export default function UeberUnsPage() {
  return (
    <>
      <Hero
        titel="Wer wir sind"
        untertitel="AquaVentus ist ein Zusammenschluss von über 100 Akteuren aus Industrie, Forschung und Politik — vereint durch die Vision einer klimaneutralen Energieversorgung durch Offshore-Wasserstoff."
      />

      {/* Mission */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">Unsere Mission</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Der AquaVentus Förderverein e.V. wurde mit dem Ziel gegründet, die Erzeugung von
              grünem Wasserstoff aus Offshore-Windenergie voranzutreiben. Bis 2035 sollen
              Erzeugungskapazitäten von bis zu 10 GW in der Nordsee entstehen.
            </p>
            <p>
              Unsere Mitglieder decken die gesamte Wertschöpfungskette ab: von der
              Elektrolyse-Technologie über die Pipeline-Infrastruktur bis zum Endverbraucher.
              Gemeinsam schaffen wir die technologischen, regulatorischen und wirtschaftlichen
              Voraussetzungen für eine skalierbare Offshore-Wasserstoffwirtschaft.
            </p>
          </div>
        </div>
      </section>

      {/* Vorstand */}
      <section className="bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-3xl font-bold">Vorstand</h2>
          <p className="mb-12 text-muted-foreground">
            Die Leitung des Vereins liegt bei einem ehrenamtlichen Vorstand.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vorstandData.vorstand.map((person) => (
              <TeamCard key={person.name} {...person} />
            ))}
          </div>
        </div>
      </section>

      {/* Mitglieder */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Unsere Mitglieder</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Über 100 Unternehmen, Forschungseinrichtungen und Organisationen sind Teil
            von AquaVentus — von globalen Energiekonzernen bis zu spezialisierten
            Technologieanbietern.
          </p>
          <div className="rounded-xl border border-dashed border-border bg-muted/20 px-8 py-16 text-muted-foreground">
            Mitglieder-Übersicht wird noch ergänzt.
          </div>
        </div>
      </section>
    </>
  );
}
