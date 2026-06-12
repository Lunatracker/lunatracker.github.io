# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static landing page for **Luna**, a period tracker app for teens. Hosted on GitHub Pages at `lunatracker.app` (see `CNAME`). The site is a single HTML page with no build system.

## Development

No build step — open `index.html` directly in a browser. Changes to `styles.css` are live immediately on reload.

To preview locally with live reload, any static file server works:
```
npx serve .
# or
python -m http.server 8080
```

## Architecture

- **`index.html`** — single page: Hero → Features (alternating rows) → Promise band → About → FAQ → Footer. The head carries JSON-LD structured data (`MobileApplication` + `FAQPage`); the FAQ schema must be kept in sync with the visible FAQ text.
- **`robots.txt` / `sitemap.xml`** — SEO support files; sitemap has the single canonical URL `https://lunatracker.app/`
- **`styles.css`** — all custom styles; this is the active stylesheet linked from `index.html`
- **`images/`** — app screenshots (`phone.png`, `screen.jpg`), store badges (`appstore.png`, `playstore.png`), feature images (`pic01–05.jpg`), app icon (`splash-icon.png`, `base.png`)
- **`assets/`** — legacy HTML5 UP "Fractal" template files (Sass, jQuery, FontAwesome). These are **not used** by the current site and can be ignored.

## Styling Notes

Custom CSS properties are defined in `:root` in `styles.css`. The color palette centers on purple (`--primary: #5e60ce`) with pink accents.

Fonts:
- **Outfit** (body/UI) — loaded from Google Fonts
- **Caveat** (handwritten accents like `.handwritten-note`, `.feature-note`) — Google Fonts
- **Berlin Sans FB** (`.text-logo` "Luna" wordmark) — local webfont at `assets/webfonts/BRLNSDB.TTF`

Responsive breakpoints: `768px` (tablet) and `480px` / `406px` (mobile). The hero switches from a side-by-side layout (text left, phone right) to stacked column on mobile.

## App Store Links

- iOS: `https://apps.apple.com/us/app/luna-period-tracker-for-teens/id1607897488`
- Android: `https://play.google.com/store/apps/details?id=com.evolutus.luna`
