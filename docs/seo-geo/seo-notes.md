# SEO notes — PDF Kombinierer

Classic organic search notes (Google/Bing blue links + rich results). Complements [geo-notes.md](./geo-notes.md) (AI citation / assistants).

**Last updated:** 2026-10-13 (first pass)  
**Live URL:** https://combinepdf.makertechnologies.at/  
**Honest ceiling:** On-page SEO alone will not guarantee #1 for competitive queries like “PDF mergen” / “merge PDF online”. This pass aims for best-in-class on-page + crawl hygiene; rankings still need authority, links, CWV, and query demand.

---

## Target queries (DE + EN)

| Intent cluster | Example queries |
|----------------|-----------------|
| Combine (DE) | PDF kombinieren, PDF zusammenfügen, PDF verbinden, mehrere PDFs zu einem |
| Merge (DE/EN) | PDF mergen, PDF mergen online, merge PDF, merge PDF online, combine PDF |
| Privacy differentiator | PDF ohne Upload, lokal PDF verbinden, PDF zusammenfügen ohne Upload, DSGVO PDF mergen |
| Brand | PDF Kombinierer, Michael Macher PDF |

Primary locale signal: **German** (`lang="de"`, DE trust copy). English remains on tool chrome and EN alternateNames in schema.

---

## Audit (before → after this pass)

### Before

| Area | State |
|------|--------|
| `<title>` | Decent brand + “ohne Upload”, weak verb keywords (kombinieren/mergen) |
| Meta description | Good privacy story; light on “kombinieren / mergen” phrasing |
| `html lang` | `en` despite DE trust/meta |
| Canonical / hreflang | Missing |
| Open Graph / Twitter | Missing |
| `og:image` | Missing |
| robots.txt / sitemap | Missing |
| JSON-LD | Missing |
| On-page H2 / FAQ | Missing (only H1 + trust strip) |
| Semantic how-to | Implicit in UI only |

### After (shipped)

| Surface | Change |
|---------|--------|
| `index.html` | Keyword-aware title + description; `lang="de"`; robots; author; theme-color; canonical; hreflang `de` + `x-default`; full OG + Twitter |
| `public/og-image.png` | 1200×630 share image |
| `public/robots.txt` | Allow all + sitemap pointer (+ llms comments for GEO) |
| `public/sitemap.xml` | Homepage URL |
| `src/seo/structuredData.json` | WebApplication + WebSite + FAQPage (injected at build) |
| `vite.config.ts` | Inject LD+JSON with **sha256** in `script-src` — keeps `connect-src 'none'`, no `unsafe-inline` |
| On-page (`GeoFaq` + `geoContent.ts`) | H2, how-to steps, expanded FAQ aligned with schema (shared with GEO) |
| Trust hero | Natural “kombinieren / zusammenfügen / mergen / lokal” phrasing |

**Constraints honored:** no uploads / no analytics scripts; CSP connect-src none; no OSI “open source” claim; PolyForm NC stated in FAQ.

**Coordination with GEO WIP:** Did not fork a second FAQ UI. SEO intents were merged into `geoContent.ts` / `GeoFaq` so one visible FAQ backs FAQPage JSON-LD. See `geo-notes.md` for llms.txt surfaces.

---

## Technical notes

1. **SPA crawlability:** Google generally executes JS; other crawlers may not. Critical meta + JSON-LD are in the HTML shell after build. Visible FAQ still mounts via React — static HTML FAQ in the initial document remains backlog (also on GEO list).
2. **hreflang:** Single URL; only `de` + `x-default`. Do **not** invent `/en` until a real alternate exists.
3. **JSON-LD ↔ FAQ sync:** `src/seo/structuredData.json` FAQ entries must match `GEO_FAQ` in `src/lib/geoContent.ts`. Manual for now — automate later.
4. **Keywords meta:** Intentionally omitted (ignored by Google; clutter).
5. **Sitemap lastmod:** Bump when material public copy/meta changes.

---

## Remaining backlog

### P0 / P1 — crawl & rich results

- [ ] **Prerender or static FAQ/how-to HTML** in the initial document (or SSG) for non-JS crawlers
- [ ] **Search Console** property for `combinepdf.makertechnologies.at` + submit sitemap
- [ ] Validate rich results (FAQ / WebApplication) after deploy
- [ ] Automate sync: `geoContent.ts` → `src/seo/structuredData.json` (+ llms FAQ) via build script
- [ ] Optional: `SoftwareApplication` additionalType / `sameAs` once author entity URLs are stable

### P2 — content & intent coverage

- [ ] Lightweight **EN secondary paragraph** under FAQ (keep DE primary) for “merge PDF online / no upload”
- [ ] Internal links only if multi-page static content appears (privacy explainer / how-to) — do not force a blog
- [ ] Monitor SERP features for DE merge queries; adjust title/description CTR without stuffing
- [ ] Apple touch icon / web manifest (minor UX + brand in some surfaces)

### P3 — off-page (not on-page, but needed for competitive queries)

- [ ] Earn links / mentions from privacy, maker, or DACH productivity contexts (no link schemes)
- [ ] Consistent NAP/author citations (michaelmacher.com, imprint, GitHub)
- [ ] Core Web Vitals check on production (LCP with fonts; keep client-only merge off critical path)

### Explicit non-goals

- Third-party SEO/analytics tags (breaks privacy model + CSP)
- Fake `AggregateRating` / review schema
- Separate doorway pages per keyword
- Claiming #1 rankings or certifications

---

## Quick QA checklist

1. Production HTML has title, description, canonical, OG tags, and injected LD+JSON  
2. CSP still has `connect-src 'none'`; LD+JSON allowed only via sha256  
3. `/robots.txt` and `/sitemap.xml` and `/og-image.png` return 200  
4. Visible FAQ questions match FAQPage `mainEntity`  
5. No “Open Source” / “DSGVO-zertifiziert” in user-facing or schema copy  
6. PolyForm NC / encrypted-PDF limits still stated  
