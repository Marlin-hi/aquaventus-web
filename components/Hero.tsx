import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  titel: string;
  untertitel: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function Hero({ titel, untertitel, ctaText, ctaHref }: HeroProps) {
  return (
    <section className="hero-section relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent px-6 py-24 text-primary-foreground md:py-32">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/20" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          {titel}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
          {untertitel}
        </p>
        {ctaText && ctaHref && (
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href={ctaHref}>
                {ctaText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
