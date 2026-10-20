---
name: search-resubmit
description: Tell the user which lunatracker.app URLs to resubmit to Google Search Console and Bing Webmaster Tools, and what to check for Brave, after site changes are pushed. Use after committing or pushing changes to generated pages, sitemap.xml, robots.txt or llms.txt; when a page is added, removed or renamed; when titles, descriptions, article copy or structured data change; or when the user asks "do I need to update Search Console / Bing / Brave", "resubmit", "reindex", or "request indexing".
---

# Search engine resubmit reminder

lunatracker.app is a static GitHub Pages site behind Cloudflare. Search engines recrawl it on their own, but a manual nudge gets changed titles, descriptions and new pages picked up in days instead of weeks. This skill decides whether a nudge is worth it and gives the user an exact checklist.

## 1. Decide whether it's needed

Look at what changed since the last push (or in the commit just made):

```
git diff --name-only HEAD~1 HEAD
```

Use a wider range (`<last-reminded-commit>..HEAD`) if several commits went out together.

**Resubmit when any of these changed:**
- A page was added, removed or renamed (new `.html` file, or one deleted)
- `<title>`, meta description, H1, or main copy of a page
- JSON-LD / structured data
- `sitemap.xml` URL list (not just `<lastmod>` dates), `robots.txt`, or the canonical domain setup
- `llms.txt` content (Bing only matters a little here; mention it, don't push it)

**Skip (say so in one line) when only these changed:**
- `styles.css`, `site.js`, images, `CSS_VERSION`
- `_build/` sources with no change to the generated HTML
- `sitemap.xml` `<lastmod>` dates alone (the build rewrites them every run)
- Typo-level copy fixes

If skipping, tell the user: "No search console updates needed for this change." and stop.

## 2. Work out the URLs

Map changed generated files to live URLs: `index.html` → `https://lunatracker.app/`, everything else → `https://lunatracker.app/<path>`. Ignore `404.html`. To see whether a page's title or description actually changed, diff the `<title>` and `name="description"` lines rather than the whole file.

Order the list by importance: new pages first, then Learn articles and the Question Box, then home/features/parents/learn, then privacy/terms.

Check the changes are live before the user submits (GitHub Pages takes a minute or two):

```
curl -s https://lunatracker.app/<path> | grep -o '<title>[^<]*'
```

## 3. Give the checklist

Print the URLs once as a plain list the user can copy, then the per-engine steps below. Keep it short; only include engines with something to do.

### Google Search Console (search.google.com/search-console)
- **Sitemap**: only if pages were added or removed. Sitemaps → enter `https://lunatracker.app/sitemap.xml` (the property is a Domain property, so it needs the full URL) → Submit. A "Couldn't fetch" / "could not be read" status right after submitting is normal and clears on its own; don't delete and resubmit.
- **Request indexing**: paste each URL into the URL Inspection bar at the top → Request indexing. About 10 requests a day; requesting the same URL twice doesn't help. Spread longer lists over several days, most important first.
- **Removed pages**: nothing to request. They drop out after Google sees the 404. Use Removals only if something must disappear urgently.

### Bing Webmaster Tools (bing.com/webmasters)
Bing's index also feeds DuckDuckGo, Copilot and parts of ChatGPT search, so it's worth the extra minute.
- **Sitemap**: only if pages were added or removed. Sitemaps → Submit sitemap → `https://lunatracker.app/sitemap.xml`.
- **URL Submission**: left menu → URL Submission → paste the URLs, one per line (it accepts a batch). The daily quota is shown on that page.
- If the site isn't set up in Bing yet: Bing can import the site and sitemap straight from Google Search Console (Add site → Import from GSC).

### Brave Search
Brave runs its own index (it also powers search for Claude and some other AI assistants), but it has no webmaster console or URL submission tool. It discovers pages by crawling, so there's nothing to submit. Just confirm `robots.txt` still allows crawling and lists the sitemap. If the user has heard Brave added a submission tool, check before saying it doesn't exist and update this skill.

## 4. Afterwards

Remind the user: new titles usually show in Google within a few days to two weeks; URL Inspection → "View crawled page" shows what Google has stored once it recrawls.
