"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { buildSearchIndex, type SearchItem } from "@/lib/search-index";

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("search");

  const searchIndex = useMemo(
    () => buildSearchIndex(locale as "de" | "en"),
    [locale]
  );

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: ["title", "snippet", "category"],
        threshold: 0.3,
        includeMatches: true,
      }),
    [searchIndex]
  );

  const results = query.length > 1 ? fuse.search(query).slice(0, 8) : [];

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router]
  );

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        aria-label={t("label")}
      >
        <Search className="h-4 w-4" />
        <span className="hidden lg:inline text-xs text-muted-foreground/60">
          {t("shortcut")}
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-[20%] translate-y-0 p-0 gap-0 max-w-lg">
          <DialogTitle className="sr-only">{t("label")}</DialogTitle>
          <div className="flex items-center gap-3 border-b px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("placeholder")}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {results.length > 0 && (
            <div className="max-h-[300px] overflow-y-auto p-2">
              {results.map(({ item }) => (
                <button
                  key={item.href + item.title}
                  onClick={() => handleSelect(item.href)}
                  className="flex w-full flex-col gap-0.5 rounded-md px-3 py-2 text-left hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                      {item.category}
                    </span>
                    <span className="text-sm font-medium truncate">
                      {item.title}
                    </span>
                  </div>
                  {item.snippet && (
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {item.snippet}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {query.length > 1 && results.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              {t("noResults")}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
