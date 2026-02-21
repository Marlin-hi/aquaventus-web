"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Loader2, User, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Member {
  id: string;
  name: string;
  organization: string | null;
  role: string;
  avatar: string | null;
  createdAt: string;
}

export default function MemberDirectory() {
  const t = useTranslations("member");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <Card key={member.id} className="h-full">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="truncate font-medium">{member.name}</h3>
                  {member.role === "ADMIN" && (
                    <Shield className="h-3.5 w-3.5 shrink-0 text-primary" aria-label="Admin" />
                  )}
                </div>
                {member.organization && (
                  <p className="truncate text-sm text-muted-foreground">{member.organization}</p>
                )}
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t("memberSince")}{" "}
                  {new Date(member.createdAt).toLocaleDateString("de-DE", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
