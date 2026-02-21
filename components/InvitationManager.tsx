"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Send, Loader2, Check, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Invitation {
  id: string;
  email: string;
  token: string;
  role: string;
  expiresAt: string;
  usedAt: string | null;
  createdAt: string;
}

export default function InvitationManager() {
  const t = useTranslations("admin");
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch("/api/admin/invitations")
      .then((res) => res.json())
      .then((data) => setInvitations(Array.isArray(data) ? data : []));
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    setSent(false);

    const res = await fetch("/api/admin/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), role }),
    });

    if (res.ok) {
      const inv = await res.json();
      setInvitations((prev) => [inv, ...prev]);
      setEmail("");
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }

    setLoading(false);
  };

  const getStatus = (inv: Invitation) => {
    if (inv.usedAt) return "used";
    if (new Date(inv.expiresAt) < new Date()) return "expired";
    return "pending";
  };

  const getRegistrationLink = (inv: Invitation) => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    return `${base}/de/registrieren?token=${inv.token}&email=${encodeURIComponent(inv.email)}`;
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSend} className="rounded-lg border border-border/50 bg-card p-4 space-y-4">
        <h3 className="font-medium">{t("newInvitation")}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">{t("email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{t("role")}</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            >
              <option value="MEMBER">Member</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" size="sm" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            {t("send")}
          </Button>
          {sent && <span className="text-sm text-green-600 dark:text-green-400">{t("sent")}</span>}
        </div>
      </form>

      <div className="space-y-3">
        {invitations.map((inv) => {
          const status = getStatus(inv);
          return (
            <div key={inv.id} className="rounded-lg border border-border/50 bg-card p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{inv.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {inv.role} · {new Date(inv.createdAt).toLocaleDateString("de-DE")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {status === "pending" && (
                    <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                      <Clock className="h-3.5 w-3.5" /> {t("pending")}
                    </span>
                  )}
                  {status === "used" && (
                    <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                      <Check className="h-3.5 w-3.5" /> {t("used")}
                    </span>
                  )}
                  {status === "expired" && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <XCircle className="h-3.5 w-3.5" /> {t("expired")}
                    </span>
                  )}
                </div>
              </div>
              {status === "pending" && (
                <div className="mt-2">
                  <input
                    readOnly
                    value={getRegistrationLink(inv)}
                    className="w-full rounded border border-input bg-muted/50 px-3 py-1.5 text-xs font-mono text-muted-foreground"
                    onClick={(e) => {
                      (e.target as HTMLInputElement).select();
                      navigator.clipboard.writeText(getRegistrationLink(inv));
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
