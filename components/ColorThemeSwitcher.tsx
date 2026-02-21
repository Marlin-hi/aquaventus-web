"use client";

import { useState, useRef, useEffect } from "react";
import { Palette } from "lucide-react";
import { useColorTheme, COLOR_THEMES, type ColorTheme } from "./ColorThemeProvider";
import { useTranslations } from "next-intl";

const THEME_COLORS: Record<ColorTheme, { light: string; dark: string }> = {
  nordsee:      { light: "oklch(0.45 0.17 245)", dark: "oklch(0.72 0.15 195)" },
  brandung:     { light: "oklch(0.55 0.15 235)", dark: "oklch(0.80 0.12 195)" },
  tiefsee:      { light: "oklch(0.35 0.19 250)", dark: "oklch(0.60 0.17 205)" },
  kuestennebel: { light: "oklch(0.50 0.08 225)", dark: "oklch(0.68 0.07 195)" },
  polarlicht:   { light: "oklch(0.43 0.20 255)", dark: "oklch(0.72 0.18 215)" },
  maschine:     { light: "oklch(0.38 0.08 230)", dark: "oklch(0.68 0.10 220)" },
  koralle:      { light: "oklch(0.55 0.18 20)",  dark: "oklch(0.72 0.16 15)" },
  bernstein:    { light: "oklch(0.55 0.15 55)",  dark: "oklch(0.74 0.14 45)" },
  morgenroete:  { light: "oklch(0.52 0.17 30)",  dark: "oklch(0.72 0.15 25)" },
  mondlicht:    { light: "oklch(0.50 0.06 250)", dark: "oklch(0.72 0.06 245)" },
  gletscher:    { light: "oklch(0.52 0.14 205)", dark: "oklch(0.74 0.13 200)" },
  kristall:     { light: "oklch(0.48 0.04 230)", dark: "oklch(0.70 0.04 225)" },
  jade:         { light: "oklch(0.48 0.14 160)", dark: "oklch(0.70 0.14 155)" },
  moos:         { light: "oklch(0.45 0.11 130)", dark: "oklch(0.68 0.12 125)" },
  ozeanflamme:  { light: "oklch(0.45 0.16 210)", dark: "oklch(0.65 0.16 30)" },
  amethyst:     { light: "oklch(0.42 0.18 280)", dark: "oklch(0.72 0.14 55)" },
  korallriff:   { light: "oklch(0.55 0.17 15)",  dark: "oklch(0.65 0.14 185)" },
  rosegold:     { light: "oklch(0.55 0.15 340)", dark: "oklch(0.68 0.13 165)" },
  neon:         { light: "oklch(0.52 0.20 320)", dark: "oklch(0.70 0.16 190)" },
  synthwave:    { light: "oklch(0.50 0.20 335)", dark: "oklch(0.65 0.18 240)" },
  phosphor:     { light: "oklch(0.55 0.16 100)", dark: "oklch(0.60 0.18 280)" },
  lagune:       { light: "oklch(0.48 0.15 210)", dark: "oklch(0.65 0.16 150)" },
};

export default function ColorThemeSwitcher() {
  const { colorTheme, setColorTheme } = useColorTheme();
  const t = useTranslations("themes");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label={t("label")}
      >
        <Palette className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 flex flex-wrap rounded-xl border border-border/50 bg-popover/95 backdrop-blur-md p-3 shadow-lg"
          style={{ width: 308, gap: 10 }}
        >
          {COLOR_THEMES.map((theme) => (
            <button
              key={theme}
              onClick={() => { setColorTheme(theme); setOpen(false); }}
              title={t(theme)}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: colorTheme === theme ? "2.5px solid var(--foreground)" : "2.5px solid transparent",
                background: `linear-gradient(135deg, ${THEME_COLORS[theme].light} 50%, ${THEME_COLORS[theme].dark} 50%)`,
                transform: colorTheme === theme ? "scale(1.12)" : undefined,
                transition: "transform 150ms, border-color 150ms",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { if (colorTheme !== theme) e.currentTarget.style.transform = "scale(1.08)"; }}
              onMouseLeave={(e) => { if (colorTheme !== theme) e.currentTarget.style.transform = ""; }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
