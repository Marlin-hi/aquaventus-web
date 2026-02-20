import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface StudyCardProps {
  titel: string;
  datumLabel: string;
  quelle: string;
  beschreibung: string;
}

export default function StudyCard({ titel, datumLabel, quelle, beschreibung }: StudyCardProps) {
  return (
    <Card className="h-full transition-all hover:shadow-lg hover:border-primary/30">
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
      </CardContent>
    </Card>
  );
}
