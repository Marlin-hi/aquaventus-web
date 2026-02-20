export interface SearchItem {
  title: string;
  snippet: string;
  href: string;
  category: string;
}

type Locale = "de" | "en";

export function buildSearchIndex(locale: Locale): SearchItem[] {
  const items: SearchItem[] = [];

  const categoryLabels = {
    de: {
      projekt: "Projekt",
      studie: "Studie",
      stellungnahme: "Stellungnahme",
      policyPaper: "Policy Paper",
      pressemeldung: "Presse",
      vorstand: "Vorstand",
      geschaeftsstelle: "Geschäftsstelle",
      mitgliedschaft: "Mitgliedschaft",
    },
    en: {
      projekt: "Project",
      studie: "Study",
      stellungnahme: "Statement",
      policyPaper: "Policy Paper",
      pressemeldung: "Press",
      vorstand: "Board",
      geschaeftsstelle: "Office",
      mitgliedschaft: "Membership",
    },
  };

  const cat = categoryLabels[locale];

  try {
    const projekte = require(`@/content/data/${locale}/projekte.json`);
    for (const p of projekte.projekte) {
      items.push({
        title: p.name,
        snippet: p.kurz,
        href: `/${locale}/projekte/${p.slug}`,
        category: cat.projekt,
      });
    }
  } catch {}

  try {
    const leitstudien = require(`@/content/data/${locale}/leitstudien.json`);
    for (const s of leitstudien.leitstudien) {
      items.push({
        title: s.titel,
        snippet: s.beschreibung,
        href: `/${locale}/leitstudien`,
        category: cat.studie,
      });
    }
  } catch {}

  try {
    const stellungnahmen = require(`@/content/data/${locale}/stellungnahmen.json`);
    for (const s of stellungnahmen.stellungnahmen) {
      items.push({
        title: s.titel,
        snippet: "",
        href: `/${locale}/politik`,
        category: cat.stellungnahme,
      });
    }
  } catch {}

  try {
    const policyPapers = require(`@/content/data/${locale}/policy-papers.json`);
    for (const p of policyPapers.policyPapers) {
      items.push({
        title: p.titel,
        snippet: "",
        href: `/${locale}/politik`,
        category: cat.policyPaper,
      });
    }
  } catch {}

  try {
    const pressemeldungen = require(`@/content/data/${locale}/pressemeldungen.json`);
    for (const p of pressemeldungen.pressemeldungen) {
      items.push({
        title: p.titel,
        snippet: "",
        href: `/${locale}/news`,
        category: cat.pressemeldung,
      });
    }
  } catch {}

  try {
    const vorstand = require(`@/content/data/${locale}/vorstand.json`);
    for (const v of vorstand.vorstand) {
      items.push({
        title: v.name,
        snippet: `${v.rolle} — ${v.organisation}`,
        href: `/${locale}/ueber-uns`,
        category: cat.vorstand,
      });
    }
  } catch {}

  try {
    const geschaeftsstelle = require(`@/content/data/${locale}/geschaeftsstelle.json`);
    for (const g of geschaeftsstelle.geschaeftsstelle) {
      items.push({
        title: g.name,
        snippet: g.rolle,
        href: `/${locale}/ueber-uns`,
        category: cat.geschaeftsstelle,
      });
    }
  } catch {}

  try {
    const mitgliedschaft = require(`@/content/data/${locale}/mitgliedschaft.json`);
    for (const v of mitgliedschaft.vorteile) {
      items.push({
        title: v.titel,
        snippet: v.beschreibung,
        href: `/${locale}/mitgliedschaft`,
        category: cat.mitgliedschaft,
      });
    }
  } catch {}

  return items;
}
