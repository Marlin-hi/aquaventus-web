"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Waves, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadContent } from "@/lib/content";
import SearchDialog from "@/components/SearchDialog";

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
  const [mobileOpen, setMobileOpen] = useState(false);
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
          <Waves className="h-7 w-7" />
          <span>AquaVentus</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
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

          <Button asChild size="sm">
            <Link href={navigationData.cta.href}>
              {navigationData.cta.label}
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
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
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t("menuLabel")}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-background px-6 py-4 md:hidden">
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
