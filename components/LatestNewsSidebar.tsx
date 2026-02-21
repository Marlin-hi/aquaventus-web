import { loadContent } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Newspaper } from "lucide-react";

interface Pressemeldung {
  datum: string;
  titel: string;
  inhalt?: string;
}

interface LatestNewsSidebarProps {
  locale: string;
  title: string;
  allNewsLabel: string;
}

export default function LatestNewsSidebar({ locale, title, allNewsLabel }: LatestNewsSidebarProps) {
  const data = loadContent<{ pressemeldungen: Pressemeldung[] }>(
    "pressemeldungen",
    locale as "de" | "en"
  );
  const latest = data.pressemeldungen.slice(0, 5);
  const dateLocale = locale === "de" ? "de-DE" : "en-GB";

  return (
    <Card className="backdrop-blur-xl backdrop-saturate-150">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Newspaper className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {latest.map((item) => (
          <div key={item.datum + item.titel} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
            <p className="text-xs text-muted-foreground">
              {new Date(item.datum).toLocaleDateString(dateLocale, {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-sm font-medium leading-snug mt-1">{item.titel}</p>
          </div>
        ))}
        <Link href="/news" className="text-sm text-primary hover:underline">
          {allNewsLabel} →
        </Link>
      </CardContent>
    </Card>
  );
}
