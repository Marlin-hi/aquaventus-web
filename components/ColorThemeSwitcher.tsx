"use client";

import { useState, useRef, useEffect } from "react";
import { Palette } from "lucide-react";
import { useColorTheme, COLOR_THEMES, type ColorTheme } from "./ColorThemeProvider";
import { useTranslations } from "next-intl";

const THEME_COLORS: Record<ColorTheme, { light: string; dark: string }> = {
  nordsee:     { light: "oklch(0.45 0.17 245)", dark: "oklch(0.72 0.15 195)" },
  wasserstoff: { light: "oklch(0.45 0.15 155)", dark: "oklch(0.72 0.15 155)" },
  tiefstrom:   { light: "oklch(0.42 0.17 270)", dark: "oklch(0.70 0.15 270)" },
  windkraft:   { light: "oklch(0.52 0.14 65)",  dark: "oklch(0.75 0.14 65)" },
  arktis:      { light: "oklch(0.42 0.10 220)", dark: "oklch(0.72 0.08 210)" },
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
        <div className="absolute right-0 top-full mt-2 flex gap-2 rounded-lg border border-border/50 bg-popover/95 backdrop-blur-md p-2.5 shadow-lg">
          {COLOR_THEMES.map((theme) => (
            <button
              key={theme}
              onClick={() => { setColorTheme(theme); setOpen(false); }}
              className="group relative flex flex-col items-center gap-1"
              title={t(theme)}
            >
              <span
                className={`block h-6 w-6 rounded-full border-2 transition-all ${
                  colorTheme === theme
                    ? "border-foreground scale-110"
                    : "border-transparent hover:scale-110"
                }`}
                style={{
                  background: `linear-gradient(135deg, ${THEME_COLORS[theme].light} 50%, ${THEME_COLORS[theme].dark} 50%)`,
                }}
              />
              <span className="text-[10px] text-muted-foreground leading-none">
                {t(theme)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
