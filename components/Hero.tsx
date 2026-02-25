import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  titel: string;
  untertitel: string;
  ctaText?: string;
  ctaHref?: string;
  badge?: string;
  image?: string;
}

export default function Hero({ titel, untertitel, ctaText, ctaHref, badge, image }: HeroProps) {
  const hasImage = !!image;

  return (
    <section
      className={`relative overflow-hidden ${hasImage ? "hero-with-image min-h-[85vh]" : "hero-section"} flex items-center justify-center px-6 py-24 md:py-32`}
      style={hasImage ? { backgroundImage: `url(${image})` } : undefined}
    >
      {/* Fallback decorative elements when no image */}
      {!hasImage && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/20" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10" />
        </div>
      )}

      <div className="relative mx-auto max-w-[780px] text-center">
        {badge && (
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-foreground/85 dark:text-white/85">
            <span className="hero-badge-dot h-2 w-2 rounded-full bg-accent" />
            {badge}
          </div>
        )}

        <h1 className="hero-title text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          {titel}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {untertitel}
        </p>

        {ctaText && ctaHref && (
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg" className="gap-2 rounded-xl px-8 py-6 text-base">
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
