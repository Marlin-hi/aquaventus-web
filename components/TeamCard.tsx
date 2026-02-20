import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import Image from "next/image";

interface TeamCardProps {
  name: string;
  rolle: string;
  organisation?: string;
  beschreibung?: string;
  bild?: string;
}

export default function TeamCard({ name, rolle, organisation, beschreibung, bild }: TeamCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="mb-4 h-16 w-16 overflow-hidden rounded-full bg-primary/10">
          {bild ? (
            <Image src={bild} alt={name} width={64} height={64} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm font-medium text-primary">{rolle}</p>
        {organisation && <p className="text-xs text-muted-foreground">{organisation}</p>}
        {beschreibung && <p className="mt-3 text-sm text-muted-foreground">{beschreibung}</p>}
      </CardContent>
    </Card>
  );
}
