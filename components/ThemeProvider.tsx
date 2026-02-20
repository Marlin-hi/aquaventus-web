"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ColorThemeProvider } from "./ColorThemeProvider";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ColorThemeProvider>{children}</ColorThemeProvider>
    </NextThemesProvider>
  );
}
