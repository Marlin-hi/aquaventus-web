"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun, LogIn, User, LogOut, Shield } from "lucide-react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { loadContent } from "@/lib/content";
import SearchDialog from "@/components/SearchDialog";
import ColorThemeSwitcher from "@/components/ColorThemeSwitcher";

interface NavItem {
  label: string;
  href: string;
}

interface NavData {
  hauptmenu: NavItem[];
  cta: NavItem;
}

export default function Navigation() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("nav");
  const tMember = useTranslations("member");
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const navigationData = loadContent<NavData>("navigation", locale as "de" | "en");

  const isActive = (href: string) => {
    const localePath = `/${locale}${href}`;
    return pathname === localePath || (href !== "/" && pathname.startsWith(localePath));
  };

  const switchLocale = (newLocale: "de" | "en") => {
    // Remove current locale prefix from pathname to get the route
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.replace(pathWithoutLocale, { locale: newLocale });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Image src="/images/logo/aquaventus-logo-rund.png" alt="AquaVentus" width={32} height={32} className="h-8 w-8" />
          <span>AquaVentus</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-4 lg:flex">
          {navigationData.hauptmenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <SearchDialog />

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={t("themeToggle")}
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Color Theme Switcher */}
          <ColorThemeSwitcher />

          {/* Language Switcher */}
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => switchLocale("de")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                locale === "de" ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              DE
            </button>
            <span className="text-muted-foreground/50">|</span>
            <button
              onClick={() => switchLocale("en")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                locale === "en" ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>

          {session?.user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-full border border-border/50 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                <User className="h-4 w-4" />
                <span className="max-w-[100px] truncate">{session.user.name}</span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-background p-1 shadow-lg">
                  <Link
                    href="/mitglieder"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                  >
                    <User className="h-4 w-4" />
                    {tMember("dashboard")}
                  </Link>
                  {(session.user as { role?: string }).role === "ADMIN" && (
                    <Link
                      href="/admin/einladungen"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                    >
                      <Shield className="h-4 w-4" />
                      {tMember("title")}
                    </Link>
                  )}
                  <button
                    onClick={() => { signOut(); setUserMenuOpen(false); }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    {tMember("logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button asChild size="sm" variant="outline">
              <Link href="/login">
                {t("memberArea")}
              </Link>
            </Button>
          )}

          <Button asChild size="sm">
            <Link href={navigationData.cta.href}>
              {navigationData.cta.label}
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Theme Toggle Mobile */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={t("themeToggle")}
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          {/* Color Theme Switcher Mobile */}
          <ColorThemeSwitcher />
          {/* Language Switcher Mobile */}
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => switchLocale("de")}
              className={locale === "de" ? "font-bold text-primary" : "text-muted-foreground"}
            >
              DE
            </button>
            <span className="text-muted-foreground/50">|</span>
            <button
              onClick={() => switchLocale("en")}
              className={locale === "en" ? "font-bold text-primary" : "text-muted-foreground"}
            >
              EN
            </button>
          </div>
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t("menuLabel")}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-background px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navigationData.hauptmenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {session?.user ? (
              <>
                <Link
                  href="/mitglieder"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <User className="h-4 w-4" />
                  {tMember("dashboard")}
                </Link>
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="flex items-center gap-2 text-sm font-medium text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  {tMember("logout")}
                </button>
              </>
            ) : (
              <Button asChild size="sm" className="w-fit" variant="outline">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  {t("memberArea")}
                </Link>
              </Button>
            )}
            <Button asChild size="sm" className="w-fit">
              <Link href={navigationData.cta.href} onClick={() => setMobileOpen(false)}>
                {navigationData.cta.label}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
