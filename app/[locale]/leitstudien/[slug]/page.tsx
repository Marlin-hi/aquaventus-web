import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, FileText, Calendar, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { loadContent } from "@/lib/content";
import { routing } from "@/i18n/routing";
import fs from "fs";
import path from "path";

interface Studie {
  slug: string;
  titel: string;
  datum: string;
  datumLabel: string;
  quelle: string;
  beschreibung: string;
  pdf?: string;
  pdfEn?: string;
  pdfDe?: string;
  bild?: string;
}

interface ContentBlock {
  type: "heading" | "paragraph" | "figure" | "list" | "keypoint";
  level?: number;
  text?: string;
  items?: string[];
  src?: string;
  caption?: string;
  alt?: string;
  nummer?: number;
  titel?: string;
}

interface StudienContent {
  meta: {
    titel: string;
    untertitel: string;
    datum: string;
    autoren: string[];
    quelle: string;
    seiten: number;
  };
  content: ContentBlock[];
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

function loadStudyContent(slug: string, locale: string): StudienContent | null {
  try {
    const filePath = path.join(
      process.cwd(),
      "content",
      "data",
      locale,
      "studien",
      `${slug}.json`
    );
    if (!fs.existsSync(filePath)) {
      // Fallback to German
      const dePath = path.join(
        process.cwd(),
        "content",
        "data",
        "de",
        "studien",
        `${slug}.json`
      );
      if (!fs.existsSync(dePath)) return null;
      return JSON.parse(fs.readFileSync(dePath, "utf-8"));
    }
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const data = loadContent<{ leitstudien: Studie[] }>(
      "leitstudien",
      locale
    );
    for (const s of data.leitstudien) {
      if (s.slug) {
        params.push({ locale, slug: s.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = loadContent<{ leitstudien: Studie[] }>(
    "leitstudien",
    locale as "de" | "en"
  );
  const studie = data.leitstudien.find((s) => s.slug === slug);
  if (!studie) return {};
  return { title: studie.titel, description: studie.beschreibung };
}

function renderMarkdownBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            if (block.level === 1) {
              return (
                <h2
                  key={i}
                  className="mt-12 text-2xl font-bold text-foreground first:mt-0 md:text-3xl"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.level === 2) {
              return (
                <h3
                  key={i}
                  className="mt-8 text-xl font-semibold text-foreground md:text-2xl"
                >
                  {block.text}
                </h3>
              );
            }
            return (
              <h4
                key={i}
                className="mt-6 text-lg font-semibold text-foreground"
              >
                {block.text}
              </h4>
            );

          case "paragraph":
            return (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {renderMarkdownBold(block.text || "")}
              </p>
            );

          case "figure":
            return (
              <figure key={i} className="my-8">
                <div className="overflow-hidden rounded-lg border border-border/50">
                  <Image
                    src={block.src || ""}
                    alt={block.alt || block.caption || ""}
                    width={1654}
                    height={2035}
                    className="w-full"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-center text-sm italic text-muted-foreground/80">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "list":
            return (
              <ul key={i} className="ml-4 space-y-2">
                {block.items?.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{renderMarkdownBold(item)}</span>
                  </li>
                ))}
              </ul>
            );

          case "keypoint":
            return (
              <Card key={i} className="my-6 border-primary/20">
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {block.nummer}
                    </span>
                    <h4 className="text-base font-semibold text-foreground">
                      {block.titel}
                    </h4>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {renderMarkdownBold(block.text || "")}
                  </p>
                </CardContent>
              </Card>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default async function StudieDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("leitstudien");

  const data = loadContent<{ leitstudien: Studie[] }>(
    "leitstudien",
    locale as "de" | "en"
  );
  const studie = data.leitstudien.find((s) => s.slug === slug);
  if (!studie) notFound();

  const studyContent = loadStudyContent(slug, locale);
  if (!studyContent) notFound();

  const altPdf = studie.pdfEn || studie.pdfDe;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-accent px-6 py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="mb-6 gap-2 text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground"
          >
            <Link href={`/${locale}/leitstudien`}>
              <ArrowLeft className="h-4 w-4" />
              {t("alleLeitstudien")}
            </Link>
          </Button>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
              {studie.datumLabel}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
              {studyContent.meta.quelle}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
              {studyContent.meta.seiten} {t("seiten")}
            </span>
          </div>

          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            {studyContent.meta.titel}
          </h1>
          <p className="mt-3 text-lg text-primary-foreground/80">
            {studyContent.meta.untertitel}
          </p>
        </div>
      </section>

      {/* Meta info + PDF downloads */}
      <section className="border-b px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{studyContent.meta.datum}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>{studyContent.meta.autoren.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>{studyContent.meta.quelle}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {studie.pdf && (
              <a
                href={studie.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                <Download className="h-4 w-4" />
                PDF
              </a>
            )}
            {altPdf && (
              <a
                href={altPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/80"
              >
                <Download className="h-4 w-4" />
                {studie.pdfEn ? "English" : "Deutsch"}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Cover image */}
      {studie.bild && (
        <section className="px-6 pt-12">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl">
            <Image
              src={studie.bild}
              alt={studie.titel}
              width={1200}
              height={750}
              className="w-full object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <ContentRenderer blocks={studyContent.content} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t px-6 py-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
          <FileText className="h-8 w-8 text-primary" />
          <p className="text-lg font-medium">
            {t("vollePDFLesen")}
          </p>
          <div className="flex flex-wrap gap-3">
            {studie.pdf && (
              <a
                href={studie.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Download className="h-4 w-4" />
                {t("pdfHerunterladen")}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
