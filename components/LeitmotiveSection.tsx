"use client";

import { useState } from "react";
import Image from "next/image";

interface Leitmotiv {
  titel: string;
  beschreibung: string;
  bild: string;
}

export default function LeitmotiveSection({
  titel,
  untertitel,
  leitmotive,
}: {
  titel: string;
  untertitel: string;
  leitmotive: Leitmotiv[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-20 bg-white/60 dark:bg-white/5 backdrop-blur-sm border-y border-border/20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold">{titel}</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          {untertitel}
        </p>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {leitmotive.map((motiv, i) => (
            <button
              key={motiv.titel}
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              <div className="relative mb-3 h-28 w-full sm:h-32">
                <Image
                  src={motiv.bild}
                  alt={motiv.titel}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                />
              </div>
              <h3 className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                {motiv.titel}
              </h3>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{
                  gridTemplateRows: openIndex === i ? "1fr" : "0fr",
                }}
              >
                <div className="overflow-hidden">
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {motiv.beschreibung}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
