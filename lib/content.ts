type Locale = "de" | "en";

export function loadContent<T>(file: string, locale: Locale): T {
  try {
    return require(`@/content/data/${locale}/${file}.json`) as T;
  } catch {
    // Fallback to German if English file doesn't exist
    return require(`@/content/data/de/${file}.json`) as T;
  }
}

export function loadSharedContent<T>(file: string): T {
  return require(`@/content/data/shared/${file}.json`) as T;
}
