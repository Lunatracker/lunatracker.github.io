# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page site for **Luna**, a period tracker app for teens. Hosted on GitHub Pages at `lunatracker.app` (see `CNAME`).

## Development

Every `.html` page is **generated**. Edit the sources in `_build/`, then run:
```
node _build/build.mjs
```
No dependencies. Commit the generated HTML; GitHub Pages ignores `_build/` (underscore folder). Don't hand-edit generated pages; changes get overwritten.

Preview with any static server (the Reproductive System diagram's click detection needs http, not file://):
```
python -m http.server 8080
```

## Architecture

- **`_build/content.mjs`**: all copy that isn't layout: Learn articles, Question Box, home FAQ, store links, app color tokens. Articles and questions are copied from the Luna app (`C:/dev/Luna/apps/mobile/app/screens/Learn`); keep them in sync by hand. Don't edit the app from here.
- **`_build/build.mjs`**: page templates (shared nav/footer) and page bodies for home, features, parents, learn hub, articles, questions, privacy, terms; also writes `sitemap.xml`. Bump `CSS_VERSION` to cache-bust `styles.css` and `site.js`.
- **`_build/content/privacy.html`, `terms.html`**: legal page bodies.
- **`_build/icons.json`**: Material Design Icons SVG paths (same icon set the app uses).
- Pages: `index.html`, `features.html`, `parents.html`, `learn.html` (hub), `learn/<slug>.html` (7 articles), `questions.html` (Question Box, with search), `privacy.html`, `terms.html`.
- JSON-LD: home has `MobileApplication` + `FAQPage` (generated from `homeFaq`, so it always matches the visible FAQ); articles have `Article`; learn hub has `ItemList`.
- **`styles.css`**: all styles. **`site.js`**: mobile menu, scroll reveal, Question Box search, and the two interactives (reproductive-system diagram, menstrual-cycle stepper).
- **`images/`**: screenshots, store badges, app icon; `images/learn/` and `images/symptoms/` are illustrations copied from the app's assets.
- **`assets/`**: legacy HTML5 UP template, unused except `assets/webfonts/BRLNSDB.TTF` (the "Luna" wordmark font).

## Styling Notes

Follows the app's "Learn look" (`design.md` in the app repo): beige ground `#fff0db`, bright hero cards with lopsided corners (36/16) plus dot-and-arc decoration, white tiles, one app color token per surface. Tokens are in `:root` in `styles.css`; accents are passed per element as `--accent`. Titles on colored cards are always white (`tone-light`).

Fonts: **Assistant** (the app's font, Google Fonts), **Caveat** (handwritten accents), **Berlin Sans FB Demi** (wordmark, local).

Breakpoints: `1000px`, `860px` (nav collapses, grids stack), `768px`, `480px`, `406px`.

Copy rule: Luna is no longer free; never say "free" about the app. Luna+ is the subscription (backup, photo backgrounds, stickers, covers a linked child's backup). Don't state prices.

## App Store Links

- iOS: `https://apps.apple.com/us/app/luna-period-tracker-for-teens/id1607897488`
- Android: `https://play.google.com/store/apps/details?id=com.evolutus.luna`
