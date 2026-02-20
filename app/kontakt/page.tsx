import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Nehmen Sie Kontakt mit AquaVentus auf — für Mitgliedschaft, Kooperationen oder Presseanfragen.",
};

export default function KontaktPage() {
  return (
    <>
      <Hero
        titel="Kontakt"
        untertitel="Interesse an einer Mitgliedschaft, Fragen zu unseren Projekten oder Presseanfragen? Wir freuen uns auf Ihre Nachricht."
      />

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {/* Kontaktformular */}
          <div>
            <h2 className="mb-6 text-2xl font-bold">Schreiben Sie uns</h2>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                    placeholder="Ihr Name"
                  />
                </div>
                <div>
                  <label htmlFor="organisation" className="mb-1.5 block text-sm font-medium">
                    Organisation
                  </label>
                  <input
                    type="text"
                    id="organisation"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                    placeholder="Ihre Organisation"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  placeholder="ihre@email.de"
                />
              </div>
              <div>
                <label htmlFor="betreff" className="mb-1.5 block text-sm font-medium">
                  Betreff
                </label>
                <select
                  id="betreff"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                >
                  <option value="">Bitte wählen</option>
                  <option value="mitgliedschaft">Mitgliedschaft</option>
                  <option value="kooperation">Kooperation</option>
                  <option value="presse">Presseanfrage</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </div>
              <div>
                <label htmlFor="nachricht" className="mb-1.5 block text-sm font-medium">
                  Nachricht
                </label>
                <textarea
                  id="nachricht"
                  rows={5}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  placeholder="Ihre Nachricht..."
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Nachricht senden
              </button>
            </form>
          </div>

          {/* Kontakt-Info */}
          <div className="space-y-6">
            <h2 className="mb-6 text-2xl font-bold">Kontaktdaten</h2>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-5 w-5 text-primary" />
                  Adresse
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                AquaVentus Förderverein e.V.<br />
                Lung Wai 28<br />
                27498 Helgoland<br />
                Deutschland
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Mail className="h-5 w-5 text-primary" />
                  E-Mail
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
                  Web
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="https://aquaventus.org" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                  aquaventus.org
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
