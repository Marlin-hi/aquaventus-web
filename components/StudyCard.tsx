import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface StudyCardProps {
  titel: string;
  datumLabel: string;
  quelle: string;
  beschreibung: string;
  slug?: string;
  locale?: string;
  pdf?: string;
  pdfEn?: string;
  pdfDe?: string;
  bild?: string;
  pdfLabel?: string;
  pdfAltLabel?: string;
  lesenLabel?: string;
}

export default function StudyCard({
  titel,
  datumLabel,
  quelle,
  beschreibung,
  slug,
  locale,
  pdf,
  pdfEn,
  pdfDe,
  bild,
  pdfLabel = "PDF",
  pdfAltLabel,
  lesenLabel = "Lesen",
}: StudyCardProps) {
  const altPdf = pdfEn || pdfDe;

  return (
    <Card className="h-full transition-all hover:shadow-lg hover:border-primary/30">
      {bild && (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-lg">
          <Image
            src={bild}
            alt={titel}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <CardHeader>
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {datumLabel}
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {quelle}
          </span>
        </div>
        <CardTitle className="flex items-start gap-3 text-lg">
          <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span>{titel}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{beschreibung}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {slug && locale && (
            <Link
              href={`/${locale}/leitstudien/${slug}`}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <BookOpen className="h-3.5 w-3.5" />
              {lesenLabel}
            </Link>
          )}
          {pdf && (
            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <Download className="h-3.5 w-3.5" />
              {pdfLabel}
            </a>
          )}
          {altPdf && (
            <a
              href={altPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80"
            >
              <Download className="h-3.5 w-3.5" />
              {pdfAltLabel || (pdfEn ? "English" : "Deutsch")}
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
