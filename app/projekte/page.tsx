import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import projekteData from "@/content/data/projekte.json";

export const metadata: Metadata = {
  title: "Projekte",
  description: "Die Projekte von AquaVentus — von der Pipeline-Infrastruktur bis zur Fachkräfteausbildung.",
};

export default function ProjektePage() {
  return (
    <>
      <Hero
        titel="Unsere Projekte"
        untertitel="Entlang der gesamten Wertschöpfungskette: Erzeugung, Transport, Logistik und Wissenstransfer für Offshore-Wasserstoff."
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projekteData.projekte.map((projekt) => (
              <ProjectCard key={projekt.slug} {...projekt} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
