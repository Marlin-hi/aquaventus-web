"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  datum: string;
  datumFormatted: string;
  titel: string;
  inhalt?: string;
}

export default function ContentCard({ datumFormatted, titel, inhalt }: ContentCardProps) {
  const [open, setOpen] = useState(false);
  const hasContent = inhalt && inhalt.trim().length > 0;

  return (
    <Card
      className={cn(
        "transition-colors",
        hasContent && "cursor-pointer hover:border-primary/40"
      )}
      onClick={() => hasContent && setOpen((o) => !o)}
    >
      <CardContent className="py-4">
        <div className="flex items-start gap-4">
          <span className="shrink-0 text-sm text-muted-foreground min-w-[5.5rem]">
            {datumFormatted}
          </span>
          <span className="font-medium flex-1">{titel}</span>
          {hasContent && (
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 mt-1",
                open && "rotate-180"
              )}
            />
          )}
        </div>
        {open && hasContent && (
          <div className="mt-4 ml-[5.5rem] pl-4 border-l-2 border-primary/20 text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
            {inhalt}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
