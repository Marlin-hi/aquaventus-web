"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  titel: string;
  text: string;
  tag: string;
  datum?: string;
  bild: string;
  link: string;
  linkText: string;
}

interface NewsSliderProps {
  slides: Slide[];
  locale: string;
}

export default function NewsSlider({ slides, locale }: NewsSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number, dir?: "left" | "right") => {
      if (isTransitioning || index === current) return;
      setDirection(dir ?? (index > current ? "right" : "left"));
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    },
    [current, isTransitioning]
  );

  const next = useCallback(() => {
    const nextIndex = (current + 1) % slides.length;
    goTo(nextIndex, "right");
  }, [current, slides.length, goTo]);

  const prev = useCallback(() => {
    const prevIndex = (current - 1 + slides.length) % slides.length;
    goTo(prevIndex, "left");
  }, [current, slides.length, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Aktuelle Themen"
    >
      {/* Slide */}
      <div className="relative h-[420px] sm:h-[480px] md:h-[540px]">
        {/* Background image */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src={slide.bild}
            alt=""
            fill
            className="object-cover"
            priority={current === 0}
            sizes="100vw"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div
          className={`relative z-10 flex h-full items-end pb-16 sm:pb-20 md:items-center md:pb-0 transition-all duration-500 ${
            isTransitioning
              ? direction === "right"
                ? "translate-x-8 opacity-0"
                : "-translate-x-8 opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="max-w-2xl">
              {/* Tag + Date */}
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                  {slide.tag}
                </span>
                {slide.datum && (
                  <span className="text-sm text-white/60">{slide.datum}</span>
                )}
              </div>

              {/* Title */}
              <h2 className="mb-4 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                {slide.titel}
              </h2>

              {/* Text */}
              <p className="mb-6 max-w-xl text-base text-white/80 sm:text-lg">
                {slide.text}
              </p>

              {/* CTA */}
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="gap-2"
              >
                <Link href={`/${locale}${slide.link}`}>
                  {slide.linkText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white md:left-5 md:p-3"
          aria-label="Vorheriger Slide"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white md:right-5 md:p-3"
          aria-label="Nächster Slide"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>

      {/* Dots + Progress */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`group relative h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
          >
            {/* Auto-progress indicator on active dot */}
            {i === current && !isPaused && (
              <span
                className="absolute inset-0 rounded-full bg-white/50 origin-left animate-[progress_6s_linear]"
                key={`progress-${current}`}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
