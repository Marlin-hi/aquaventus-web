import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Projekt {
  slug: string;
  name: string;
  kurz: string;
  bild: string;
  kategorie: string;
}

interface ProjektePreviewProps {
  titel: string;
  untertitel: string;
  projekte: Projekt[];
  ctaText: string;
  ctaHref: string;
  locale: string;
}

export default function ProjektePreview({ titel, untertitel, projekte, ctaText, ctaHref, locale }: ProjektePreviewProps) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">{titel}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{untertitel}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projekte.slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/${locale}/projekte/${p.slug}`}>
              <Card className="group h-full overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.bild}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {p.kategorie}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.kurz}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href={ctaHref}>
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
