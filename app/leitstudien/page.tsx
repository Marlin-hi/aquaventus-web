import type { Metadata } from "next";
import Hero from "@/components/Hero";
import StudyCard from "@/components/StudyCard";
import leitstudienData from "@/content/data/leitstudien.json";

export const metadata: Metadata = {
  title: "Leitstudien",
  description: "Wissenschaftliche Studien zur Offshore-Wasserstoffproduktion — von Systemkosten bis Transportkonzepte.",
};

export default function LeitstudienPage() {
  return (
    <>
      <Hero
        titel="Leitstudien"
        untertitel="Wissenschaftliche Grundlagen und Analysen zur Offshore-Wasserstoffproduktion — unabhängig erstellt, öffentlich zugänglich."
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {leitstudienData.leitstudien.map((studie) => (
              <StudyCard key={studie.datum} {...studie} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
