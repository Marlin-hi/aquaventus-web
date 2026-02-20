import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TeamCard from "@/components/TeamCard";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Phone, Building2, Handshake } from "lucide-react";
import vorstandData from "@/content/data/vorstand.json";
import geschaeftsstelleData from "@/content/data/geschaeftsstelle.json";
import mitgliederData from "@/content/data/mitglieder.json";
import partnerData from "@/content/data/partner.json";

export const metadata: Metadata = {
  title: "Über uns",
  description: "AquaVentus Förderverein e.V. — Vorstand, Geschäftsstelle, Mitglieder und Partner.",
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
            Wahlperiode: 2 Jahre.
          </p>
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
          <h2 className="mb-4 text-3xl font-bold">Geschäftsstelle</h2>
          <p className="mb-12 text-muted-foreground">
            {geschaeftsstelleData.adresse}
          </p>
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
                    <a
                      href={`mailto:${person.email}`}
                      className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
                    >
                      <Mail className="h-3 w-3" />
                      {person.email}
                    </a>
                  )}
                  {person.telefon && (
                    <a
                      href={`tel:${person.telefon}`}
                      className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
                    >
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
          <h2 className="mb-4 text-3xl font-bold">Unsere Mitglieder</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Über 100 Unternehmen, Forschungseinrichtungen und Organisationen sind Teil
            von AquaVentus — von globalen Energiekonzernen bis zu spezialisierten
            Technologieanbietern.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mitgliederData.mitglieder.map((m) => (
              <div
                key={m.name}
                className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2.5 text-sm"
              >
                <Building2 className="h-4 w-4 shrink-0 text-primary/60" />
                <span className="truncate">{m.name}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Dargestellt sind die öffentlich gelisteten Mitglieder. Die vollständige Liste
            umfasst über 100 Organisationen.
          </p>
        </div>
      </section>

      {/* Partner */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-3xl font-bold">Partnerorganisationen</h2>
          <p className="mb-12 text-muted-foreground">
            AquaVentus arbeitet eng mit führenden Branchenverbänden und Netzwerken zusammen.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {partnerData.partner.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3"
              >
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
