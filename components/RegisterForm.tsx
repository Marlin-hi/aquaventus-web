"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { UserPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function RegisterForm() {
  const t = useTranslations("register");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const inviteEmail = searchParams.get("email") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState(inviteEmail);
  const [organization, setOrganization] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError(t("passwordMismatch"));
      return;
    }

    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, name, email, password, organization }),
    });

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => router.push(`/${locale}/login`), 2000);
    } else {
      const data = await res.json();
      setError(data.error === "Invalid or expired invitation" ? t("invalidToken") : data.error);
    }

    setLoading(false);
  };

  if (!token) {
    return (
      <div className="mx-auto w-full max-w-md text-center">
        <p className="text-destructive">{t("invalidToken")}</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto w-full max-w-md text-center">
        <p className="text-sm text-green-600 dark:text-green-400">{t("success")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8 flex flex-col items-center">
        <Image
          src="/images/logo/aquaventus-logo-rund.png"
          alt="AquaVentus"
          width={96}
          height={96}
          className="mb-4 h-24 w-24"
        />
        <h1 className="text-2xl font-bold text-primary">Aqua<span className="text-brand-ventus">Ventus</span></h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">{t("name")}</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            placeholder={t("namePlaceholder")} required />
        </div>

        <div>
          <label htmlFor="org" className="mb-1.5 block text-sm font-medium">{t("organization")}</label>
          <input type="text" id="org" value={organization} onChange={(e) => setOrganization(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            placeholder={t("organizationPlaceholder")} />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">{t("email")}</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            required readOnly={!!inviteEmail} />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium">{t("password")}</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            placeholder={t("passwordPlaceholder")} required minLength={8} />
        </div>

        <div>
          <label htmlFor="passwordConfirm" className="mb-1.5 block text-sm font-medium">{t("passwordConfirm")}</label>
          <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            placeholder={t("passwordConfirmPlaceholder")} required minLength={8} />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
          {t("submit")}
        </Button>
      </form>
    </div>
  );
}
