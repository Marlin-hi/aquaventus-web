"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LayoutDashboard, UserCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/mitglieder", labelKey: "dashboard" as const, icon: LayoutDashboard },
  { href: "/mitglieder/profil", labelKey: "profile" as const, icon: UserCircle },
  { href: "/mitglieder/verzeichnis", labelKey: "directory" as const, icon: Users },
];

export default function MemberSubNav() {
  const t = useTranslations("member");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 border-b border-border/50">
      {navItems.map(({ href, labelKey, icon: Icon }) => {
        const localePath = `/${locale}${href}`;
        const isActive = pathname === localePath;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            )}
          >
            <Icon className="h-4 w-4" />
            {t(labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
