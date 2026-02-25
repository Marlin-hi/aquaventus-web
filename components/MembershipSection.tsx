import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Network, Rocket, Users, Lightbulb } from "lucide-react";

interface Vorteil {
  titel: string;
  beschreibung: string;
}

interface MembershipSectionProps {
  titel: string;
  text: string;
  vorteile: Vorteil[];
  ctaText: string;
  ctaHref: string;
}

const ICONS = [Network, Rocket, Users, Lightbulb];

export default function MembershipSection({ titel, text, vorteile, ctaText, ctaHref }: MembershipSectionProps) {
  return (
    <section className="px-6 py-20 bg-white/60 dark:bg-white/5 backdrop-blur-sm border-y border-border/20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">{titel}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{text}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {vorteile.slice(0, 4).map((v, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Card key={v.titel}>
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{v.titel}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{v.beschreibung}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" className="gap-2">
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
