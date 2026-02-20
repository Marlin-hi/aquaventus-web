import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface TeamCardProps {
  name: string;
  rolle: string;
  organisation: string;
  beschreibung: string;
}

export default function TeamCard({ name, rolle, organisation, beschreibung }: TeamCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <User className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm font-medium text-primary">{rolle}</p>
        <p className="text-xs text-muted-foreground">{organisation}</p>
        <p className="mt-3 text-sm text-muted-foreground">{beschreibung}</p>
      </CardContent>
    </Card>
  );
}
