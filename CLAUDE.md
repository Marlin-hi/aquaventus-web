# AquaVentus Webseite

Prototyp-Webseite für den AquaVentus Förderverein e.V. — grüner Wasserstoff aus Offshore-Windenergie.

**Live:** http://187.77.65.131 (kein Domain-Name, nur IP)

## Tech-Stack

- **Framework:** Next.js 16 (App Router, SSG)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS v4 (kein tailwind.config — alles in `globals.css` via `@theme inline {}`)
- **UI-Komponenten:** shadcn/ui (Radix-basiert, `data-slot` Attribute)
- **i18n:** next-intl (DE default, EN), Middleware-basiertes Routing (`/de/...`, `/en/...`)
- **Suche:** Fuse.js (client-side Fuzzy Search)
- **Theming:** next-themes (Light/Dark) + eigenes ColorTheme-System (5 Farbwelten)
- **Icons:** lucide-react

## Seiten

| Route | Inhalt |
|-------|--------|
| `/` | Startseite: Hero, Leitmotive, Projekte-Vorschau, Mitglieder |
| `/projekte` | Projektübersicht (Cards) |
| `/projekte/[slug]` | Projektdetail (dynamisch aus JSON) |
| `/leitstudien` | Wissenschaftliche Studien |
| `/politik` | Stellungnahmen + Policy Papers |
| `/news` | Pressemeldungen |
| `/mitgliedschaft` | Vorteile, Arbeitsgruppen, CTA |
| `/ueber-uns` | Mission, Vorstand, Geschäftsstelle, Mitglieder, Partner |
| `/kontakt` | Kontaktformular + Adresse |

Alle Routen sind locale-prefixed: `/de/projekte`, `/en/projekte` etc.

## Dateistruktur

```
app/
  globals.css              — Alle Farben, Themes, Glassmorphism, Firefly-CSS
  layout.tsx               — Root-Layout (Metadata-Viewport)
  [locale]/
    layout.tsx             — Locale-Layout (Fonts, ThemeProvider, Navigation, Footer)
    page.tsx               — Startseite
    projekte/page.tsx      — Projektübersicht
    projekte/[slug]/page.tsx — Projektdetail
    ...                    — Weitere Seiten

components/
  Navigation.tsx           — Sticky Header, Desktop/Mobile, Search, Theme-Toggle, Color-Switcher, Language-Switcher
  Footer.tsx               — Footer mit Links + Kontakt
  Hero.tsx                 — Hero-Banner (Props: titel, untertitel, ctaText, ctaHref)
  ProjectCard.tsx          — Projekt-Card
  StudyCard.tsx            — Studien-Card
  TeamCard.tsx             — Vorstand/Geschäftsstelle-Card
  SearchDialog.tsx         — Ctrl+K Suchfenster (Fuse.js)
  ThemeProvider.tsx         — Wrapper: next-themes + ColorThemeProvider
  ColorThemeProvider.tsx   — Context für Farbthema (localStorage, data-theme Attribut)
  ColorThemeSwitcher.tsx   — UI: 5 farbige Kreise in Popover
  Fireflies.tsx            — CSS-Partikel-Animation (nur Dark Mode, theme-aware Hues)
  ui/                      — shadcn/ui Basis-Komponenten (button, card, dialog, navigation-menu)

content/
  data/de/                 — Deutsche Inhalts-JSONs (projekte, vorstand, leitstudien, ...)
  data/en/                 — Englische Inhalts-JSONs (gleiche Struktur)
  data/shared/             — Sprachunabhängig (mitglieder.json, partner.json)

messages/
  de.json                  — next-intl UI-Strings (Deutsch)
  en.json                  — next-intl UI-Strings (Englisch)

i18n/
  routing.ts               — Locale-Konfiguration (de, en)
  navigation.ts            — Typisierte Navigation-Helpers
  request.ts               — Server-seitige Locale-Auflösung

lib/
  content.ts               — loadContent<T>(file, locale) / loadSharedContent<T>(file)
  search-index.ts          — buildSearchIndex(locale) — aggregiert alle Inhalte für Fuse.js
  utils.ts                 — cn() (clsx + tailwind-merge)
```

## Content-Architektur

Inhalt lebt in **JSON-Dateien** unter `content/data/`, nicht in Markdown oder CMS.

- `loadContent<T>("projekte", "de")` → lädt `content/data/de/projekte.json`
- `loadSharedContent<T>("mitglieder")` → lädt `content/data/shared/mitglieder.json`
- Fallback: wenn EN-Datei fehlt, wird DE geladen
- Alle Seiten sind statisch generiert (SSG via `generateStaticParams`)

### UI-Strings vs. Content

- **`messages/de.json` / `en.json`**: UI-Strings (Titel, Labels, Buttons, Placeholders)
  - Zugriff: `useTranslations("namespace")` (Client) oder `getTranslations()` (Server)
  - Namespaces: `home`, `projekte`, `nav`, `footer`, `themes`, `search`, etc.
- **`content/data/`**: Strukturierte Inhalte (Projekte, Vorstand, Studien, etc.)
  - Zugriff: `loadContent<Type>("filename", locale)`

## Theming-System

### Light / Dark Mode

- `next-themes` mit `attribute="class"` auf `<html>`
- `defaultTheme="system"`, `enableSystem`
- Toggle: Moon/Sun Icon in Navigation
- CSS: `:root` (Light) und `.dark` (Dark) in `globals.css`

### 5 Farbwelten (Color Themes)

Wechsel über das **Palette-Icon** in der Navigation (neben dem Moon/Sun Toggle). Öffnet ein Panel mit 5 farbigen Kreisen.

| Theme | CSS-Selector | Charakter | Hues |
|-------|-------------|-----------|------|
| Nordsee | _(default, kein Attribut)_ | Blau/Türkis | 245/200 |
| Wasserstoff | `data-theme="wasserstoff"` | Smaragdgrün | 155/185 |
| Tiefstrom | `data-theme="tiefstrom"` | Indigo/Violett | 270/310 |
| Windkraft | `data-theme="windkraft"` | Amber/Gold | 65/35 |
| Arktis | `data-theme="arktis"` | Stahlblau/Frost | 220/195 |

**Architektur:**
- `data-theme` Attribut auf `<html>`, gespeichert in `localStorage("color-theme")`
- Anti-Flash-Script im `<head>` setzt Attribut vor Paint
- Alle Farben leiten sich von `--theme-hue` und `--theme-accent-hue` ab
- Glassmorphism, Ambient-Gradients und Hero-Gradient sind parametrisiert — passen sich automatisch an
- Fireflies nutzen per-Theme Hue-Paletten (`THEME_HUES` in `Fireflies.tsx`)
- Neues Theme hinzufügen: CSS-Block in `globals.css` + Eintrag in `ColorThemeProvider.tsx` + Hues in `Fireflies.tsx` + Labels in `messages/*.json`

### Glassmorphism

- Beide Modi: semi-transparente Cards (`--card: oklch(... / 70%)`), `backdrop-filter: blur()`, subtile Borders
- Dark Mode: stärkerer Blur, türkis/theme-farbener Glow auf Borders + Shadows
- Targets: `[data-slot="card"]`, `[data-slot="dialog-content"]`
- Background-Elemente für den Glass-Effekt: Ambient-Gradient-Blobs via `.fireflies::before`

### Fireflies (Dark Mode)

- CSS-only Partikel-Animation, nur in Dark Mode sichtbar
- 4 Schwärme, 70 Flies total
- 3 Drift-Keyframes (driftA/B/C) für Schwarm-Bewegung
- Per-Fly: Flutter-Jitter + Glow-Pulsing
- Depth-System: `--depth` steuert Größe, Blur, Glow-Intensität
- `@media (prefers-reduced-motion: reduce)` → statisch

## Server & Deployment

| | |
|---|---|
| **Server** | 187.77.65.131 (Hydro-Server, NICHT 187.77.66.133) |
| **SSH** | `ssh root@187.77.65.131` |
| **App-Pfad** | `/home/aquaventus-web/` |
| **Port** | 3001 (Next.js) |
| **Process Manager** | PM2 (`pm2 restart aquaventus-web`) |
| **Reverse Proxy** | nginx (Port 80 → 3001) |
| **Deploy-Script** | `deploy.sh` (git pull, npm ci, build, pm2 restart) |

### Manuelles Deployment

```bash
ssh root@187.77.65.131 "cd /home/aquaventus-web && git pull && npm ci && npx next build && pm2 restart aquaventus-web"
```

### Wichtig

- Code muss auf `master` gepusht sein, bevor Deploy funktioniert (Server macht `git pull`)
- `npm ci` (nicht `npm install`) — reproduzierbare Builds
- Build braucht TypeScript (kein `--production` bei npm ci)
- PM2 ist global installiert (`pm2`, nicht `npx pm2`)
- Kein HTTPS/SSL konfiguriert — nur HTTP auf Port 80

## Konventionen

- **Farben:** OKLCH-Farbraum, CSS Custom Properties, parametrisiert über `--theme-hue`
- **Tailwind v4:** Kein `tailwind.config.ts` — Konfiguration in `globals.css` via `@theme inline {}`
- **shadcn/ui:** Komponenten in `components/ui/`, Styling über `data-slot` Attribute
- **Neue Seite:** `app/[locale]/routenname/page.tsx` + Content-JSON in `content/data/de/` + `en/` + UI-Strings in `messages/*.json`
- **Neue Komponente:** In `components/`, Client Components mit `"use client"` Direktive
- **Neuer Content:** JSON in `content/data/{locale}/`, Typ-Interface inline oder in der Page-Datei

## Parallelarbeit

Mehrere Claude-Code-Tabs können gleichzeitig am Repo arbeiten. Koordination über `_arbeit.md` + Git Worktrees.

### Session-Start

1. Tab-ID generieren: `tab-` + 4 zufällige Hex-Zeichen (z.B. `tab-b7e1`)
2. `git pull --rebase` im Hauptverzeichnis (`C:\Users\hmk\aquaventus-web`)
3. `_arbeit.md` lesen — **gelistete Dateien vermeiden**
4. Eigene Aufgabe + geplante Dateien in `_arbeit.md` eintragen
5. `_arbeit.md` committen und pushen (damit andere Tabs es beim Pull sehen)
6. Worktree erstellen:
   ```bash
   git worktree add ../aquaventus-web-tabs/tab-XXXX -b tab-XXXX/feature-name
   ```

### Während der Arbeit

- **Dateien editieren:** Absolute Pfade zum Worktree nutzen (`C:\Users\hmk\aquaventus-web-tabs\tab-XXXX\...`)
- **Hauptrepo durchsuchen:** Glob/Grep/Read mit Hauptverzeichnis-Pfad (zeigt master-Stand)
- **Regelmäßig committen** im Worktree auf eigenem Branch
- **Build prüfen** vor Merge: `npm run build` im Worktree

### Session beenden

1. Alle Änderungen im Worktree committen
2. Im Hauptverzeichnis:
   ```bash
   git pull --rebase
   git merge tab-XXXX/feature-name
   ```
3. Build prüfen: `npm run build`
4. Push auf remote: `git push`
5. Aufräumen:
   ```bash
   git worktree remove ../aquaventus-web-tabs/tab-XXXX
   git branch -d tab-XXXX/feature-name
   ```
6. Eigenen Eintrag aus `_arbeit.md` entfernen
7. Optional: Deploy auslösen (siehe Server & Deployment)

### Konfliktauflösung

**Selbst auflösen:**
- Verschiedene Dateien → Git merged automatisch
- Gleiche Datei, verschiedene Stellen → Git merged automatisch

**Marlin fragen:**
- Echte Merge-Konflikte (gleiche Zeilen geändert)
- Strukturelle Änderungen (Dateien verschoben, umbenannt, gelöscht)

### Deploy

- Nur ein Tab deployt gleichzeitig
- Erst nach erfolgreichem Build + Push
- Deploy-Befehl: siehe Abschnitt "Server & Deployment" oben

### Wichtig

- Marlin darf immer alles ändern — seine Änderungen haben Vorrang
- Einträge in `_arbeit.md` die älter als 2 Stunden sind, dürfen entfernt werden
- `aquaventus-web-tabs/` liegt in `.gitignore` — wird nicht committed
- Kein `git stash` verwenden — uncommitted changes committen statt stashen

## Referenz-Dateien

- `CONTENT.md` — Gescrapte Inhalte von aquaventus.org (Rohmaterial)
- `nginx-aquaventus.conf` — Nginx-Konfiguration (Referenz, liegt auch auf dem Server)
- `_arbeit.md` — Tab-Koordination für Parallelarbeit
