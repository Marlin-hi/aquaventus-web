import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  name: string;
  kurz: string;
  status: string;
  kategorie: string;
  locale: string;
  bild?: string;
}

export default function ProjectCard({ slug, name, kurz, status, kategorie, locale, bild }: ProjectCardProps) {
  return (
    <Link href={`/${locale}/projekte/${slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/30">
        {bild && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={bild}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {kategorie}
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {status}
            </span>
          </div>
          <CardTitle className="flex items-center gap-2 text-lg">
            {name}
            <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{kurz}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
