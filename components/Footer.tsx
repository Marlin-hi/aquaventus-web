import Link from "next/link";
import { Waves } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-primary">
              <Waves className="h-6 w-6" />
              <span>AquaVentus</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Grüner Wasserstoff aus Offshore-Windenergie.
              <br />
              10 GW Erzeugungskapazität bis 2035.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Navigation</h3>
            <div className="flex flex-col gap-2">
              <Link href="/projekte" className="text-sm text-muted-foreground hover:text-primary">Projekte</Link>
              <Link href="/ueber-uns" className="text-sm text-muted-foreground hover:text-primary">Über uns</Link>
              <Link href="/kontakt" className="text-sm text-muted-foreground hover:text-primary">Kontakt</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Kontakt</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>AquaVentus Förderverein e.V.</span>
              <span>Helgoland, Deutschland</span>
              <a href="mailto:info@aquaventus.org" className="hover:text-primary">
                info@aquaventus.org
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} AquaVentus Förderverein e.V. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
