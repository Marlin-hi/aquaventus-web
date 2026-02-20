"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const COLOR_THEMES = ["nordsee", "wasserstoff", "tiefstrom", "windkraft", "arktis"] as const;
export type ColorTheme = (typeof COLOR_THEMES)[number];

const ColorThemeContext = createContext<{
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}>({ colorTheme: "nordsee", setColorTheme: () => {} });

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("nordsee");

  useEffect(() => {
    const saved = localStorage.getItem("color-theme") as ColorTheme | null;
    if (saved && COLOR_THEMES.includes(saved)) {
      setColorThemeState(saved);
      if (saved !== "nordsee") {
        document.documentElement.setAttribute("data-theme", saved);
      }
    }
  }, []);

  const setColorTheme = (newTheme: ColorTheme) => {
    setColorThemeState(newTheme);
    if (newTheme === "nordsee") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("color-theme");
    } else {
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("color-theme", newTheme);
    }
  };

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  return useContext(ColorThemeContext);
}
